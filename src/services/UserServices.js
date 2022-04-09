import requests from './httpServices';

const serviceUrl = 'https://coinpos-uat.azurewebsites.net/lineliff/';
//const serviceUrl = 'http://localhost:41781/lineliff/';
const UserServices = {
  userLogin(body) {
    return requests.post('/user/login', body);
  },

  verifyEmailAddress(body) {
    return requests.post('/user/verify-email', body);
  },

  userRegister(token, body) {
    return requests.post(`/user/register/${token}`, body);
  },

  signUpWithProvider(body) {
    return requests.post('/user/signup', body);
  },

  forgetPassword(body) {
    return requests.put('/user/forget-password', body);
  },

  resetPassword(body) {
    return requests.put('/user/reset-password', body);
  },

  changePassword(body) {
    return requests.post('/user/change-password', body);
  },

  updateUser(id, body) {
    return requests.put(`/user/${id}`, body);
  },
  async fetchGetLiffURLTemplate()
  {
    try
    {
      //res.send("getLiff URL");
      //return;
      //var template = "";
      var url = serviceUrl + 'GetLiffURLTemplate'
      //res.send("getLiff URL = " + url);
      //return;
      var template = null;
      console.log("getLiff URL")
      await fetch(url,
        { 
          method:'GET',
          //credentials:"include",
          headers: {'Content-Type': 'application/json','x-security-lock':'0241CCFF2D40AF7AF8A4FC02272C47A30D15DBDFB36E3266D1296212574F328E'},
          
        }).then(function(response) {
          return response.text();
        }).then(function(data) {

          console.log(data);
          var obj = data;
          template = obj;
        });
      
      

        return template;
    }
    catch(err) {
      return "Error: " + err.message;
      
    }
  }
};

export default UserServices;
