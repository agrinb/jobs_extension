'use strict';
  


  var user_info = null, user_uid = null, user_email = null;

  function url_domain(url) {
  var    a      = document.createElement('a');
         a.href = url;
  return a.hostname;

  }


  function xhrWithAuth(method, url, interactive, callback) {
    var access_token;

    var retry = true;

    function getToken() {
      console.log(keywords);
      chrome.identity.getAuthToken({ interactive: interactive }, function(token) {
        console.log("token   "+ token);
        if (chrome.runtime.lastError) {
          callback(chrome.runtime.lastError);
          return;
        }

        access_token = token;
        console.log("at "+access_token);
        requestStart();
      });
    }

    function requestStart() {
      var xhr = new XMLHttpRequest();
      xhr.open(method, url);
      xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);
      xhr.onload = requestComplete;
      xhr.send();
    }

    function requestComplete() {
      if (this.status == 401 && retry) {
        retry = false;
        chrome.identity.removeCachedAuthToken({ token: access_token },
                                              getToken);
      } else {
        onUserInfoFetched(null, this.status, this.response);
      }
    }

    getToken();


  }

  function getUserInfo(interactive) {
    console.log("getUserInfo");
    xhrWithAuth('GET',
                'https://www.googleapis.com/plus/v1/people/me',
                interactive,
                onUserInfoFetched);
  }

  function retrieveSourceUrl (){
    if (localStorage.getItem("sourceUrl") !== null || compareTimeSourceUrl()) {
      var sourceUrl = JSON.parse(localStorage.getItem("sourceUrl"))['url'];
      localStorage.setItem("sourceUrl", null)
      return sourceUrl;
    }
  }


  function onUserInfoFetched(error, status, response) {
    console.log('onUserInfoFetched');
    if (!error && status == 200) {
      user_info = JSON.parse(response);
      user_uid = user_info.id;
      user_email = user_info.emails[0]["value"];
      localStorage.setItem("userUID", JSON.stringify({id: user_uid}));
      var userUID = JSON.parse(localStorage.getItem("userUID"));
      userUID = userUID['id']
      console.log(userUID);
      alert(userUID);

      

      $.ajax({
        type: "POST",
        url: "http://localhost:3000/companies",
        //data: {uid: user_uid, keywords: keywords, url: tablink, user_email: user_email },

        data: { uid: user_uid, keywords: keywords, url: retrieveSourceUrl(), name: tablink, job_url: clickedUrl},
        success: function(result){
          console.log(result);
          },
        dataType: "application/json",
        error: function (xhr, ajaxOptions, thrownError) {
          alert(xhr.status);
          alert(thrownError);
        },
      });

    } else {
      //changeState(STATE_START);
    }
  }

  function populateUserInfo(user_info) {
    user_info_div.innerHTML = "Hello " + user_info.displayName;
    fetchImageBytes(user_info);
  }

  function interactiveSignIn() {
    changeState(STATE_ACQUIRING_AUTHTOKEN);

    chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
      if (chrome.runtime.lastError) {
        console.log(chrome.runtime.lastError);
        changeState(STATE_START);
      } else {
        console.log('Token acquired:'+token+
          '. See chrome://identity-internals for details.');
        changeState(STATE_AUTHTOKEN_ACQUIRED);
        console.log(token)
      }
    });
    // @corecode_end getAuthToken
  }

  function revokeToken() {
    user_info_div.innerHTML="";
    chrome.identity.getAuthToken({ 'interactive': false },
      function(current_token) {
        if (!chrome.runtime.lastError) {
          // @corecode_begin removeAndRevokeAuthToken
          // @corecode_begin removeCachedAuthToken
          // Remove the local cached token
          chrome.identity.removeCachedAuthToken({ token: current_token },
            function() {});
          // @corecode_end removeCachedAuthToken

          // Make a request to revoke token in the server
          var xhr = new XMLHttpRequest();
          xhr.open('GET', 'https://accounts.google.com/o/oauth2/revoke?token=' +
                   current_token);
          xhr.send();
          // @corecode_end removeAndRevokeAuthToken

          // Update the user interface accordingly
          changeState(STATE_START);
          console.log('Token revoked and removed from cache. '+
            'Check chrome://identity-internals to confirm.');
        }
    });
  }




