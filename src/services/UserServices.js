import requests from './httpServices';

//const serviceUrl = 'https://coinpos-uat.azurewebsites.net/lineliff/';
const serviceUrl = 'http://localhost:41781/lineliff/';
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
  },
  async fetchCoinposUserLogin(body) {
    try {
      const userJson = await findCoinPOSCustomerAccount(body.companyId,body.registerEmail,body.password);
      
      
      if(userJson != 'null')
      {
        //alert('Fetch not null = ' + userJson);
        const user = JSON.parse(userJson);
        return ({
          //token,
          _id: user._id,
          name: user.name,
          email: user.email,
          address: user.address,
          phone: user.phone,
          image: user.image,
          paramPath: body.paramPath,
          customerId: user.customerId,
          customerName: user.customerName,
          customerTypeId: user.customerTypeId,
          customerType: user.customerType,
          imageUrl: user.imageUrl,
          firstName: user.firstName,
          middleName: user.middleName,
          lastName: user.lastName,
          customerAddressId: user.customerAddressId,
          countrys: user.countrys,
          provinces: user.provinces,
          cities: user.cities,
          districts: user.districts,
          address1: user.address1,
          postalcode: user.postalcode,
          districtId: user.districtId,
          cityId: user.cityId,
          provinceId: user.provinceId,
          countryId: user.countryId,
          country: user.country,
          province: user.province,
          city: user.city,
          district: user.district,
          
  
  
  
  
        });
      } else {
        return null;
        
      }
    } catch (err) {
      return err.message;
      
    }
  },
  async fetchCoinposLineLogin(body) {
    try {
      //alert("Body = " + JSON.stringify(body));
      const userJson = await findCoinPOSCustomerAccountByLineUserId(body.companyId,body.liffId,body.lineUserId, body.linePOSId);//findCoinPOSEmail(req.body.companyId,req.body.email);
  
      //alert('UserJson = ' + userJson )
      if(userJson)
      {
        const user = JSON.parse(userJson);
        //const token = signInToken(user);
        return ({
          //token,
          _id: user._id,
          name: user.name,
          email: user.email,
          address: user.address,
          phone: user.phone,
          image: user.image,
          paramPath: body.paramPath,
          customerId: user.customerId,
          customerName: user.customerName,
          customerTypeId: user.customerTypeId,
          customerType: user.customerType,
          imageUrl: user.imageUrl,
          firstName: user.firstName,
          middleName: user.middleName,
          lastName: user.lastName,
          customerAddressId: user.customerAddressId,
          countrys: user.countrys,
          provinces: user.provinces,
          cities: user.cities,
          districts: user.districts,
          address1: user.address1,
          postalcode: user.postalcode,
          districtId: user.districtId,
          cityId: user.cityId,
          provinceId: user.provinceId,
          countryId: user.countryId,
          country: user.country,
          province: user.province,
          city: user.city,
          district: user.district,
          
  
  
  
  
        });
      } else {
        return 'Invalid user or password!';
        
      }
    } catch (err) {
      return err.message;
      
    }
  },
  async fetchCoinposCheckExpired(body) {
    try
    {
      var productList = null;
      await fetch(serviceUrl + 'CheckCoinposUserExpired', 
      { 
        method:'POST',
        //credentials:"include",
        headers: {'Content-Type': 'application/json','x-security-lock':'0241CCFF2D40AF7AF8A4FC02272C47A30D15DBDFB36E3266D1296212574F328E'},
        body:`{"CompanyId":${body.companyId},"Email":"${body.email}"}`
        }).then(function(response) {
          return response.text();
        }).then(function(data) {

        //var obj = JSON.parse(data);
        //console.log("Obj = " + obj);
        console.log("expired = " + data); // this will be a string
        productList = data;
      });
      
      return productList;
      
    }
    catch (err) {
      return "Error: " + err.message;
      
    }
  },
};


const findCoinPOSCustomerAccount = async(companyId, email, password) => 
{
  try
  {
    var userData = null;
    await fetch(serviceUrl + 'CoinPOSCustomerAccountLogin',//fetch('http://localhost:5002/simple-cors3', 
    { 
      method:'POST',
      //credentials:"include",
      headers: {'Content-Type': 'application/json','x-security-lock':'0241CCFF2D40AF7AF8A4FC02272C47A30D15DBDFB36E3266D1296212574F328E'},
      body:`{"CompanyId":${companyId},"Email":"${email}", "Password":"${password}"}`
      }).then(function(response) {
        return response.text();
      }).then(function(data) {

        userData = data;
    });
    
    return userData;
      
  }
  catch (err) {
    return "Error: " + err.message;
    
  }
};
const findCoinPOSCustomerAccountByLineUserId = async(companyId, liffId, lineUserId,linePOSId) => 
{
  try
  {
    var userData = null;
    await fetch(serviceUrl + 'CoinPOSCustomerAccountByLineUserId',//fetch('http://localhost:5002/simple-cors3', 
    { 
      method:'POST',
      //credentials:"include",
      headers: {'Content-Type': 'application/json','x-security-lock':'0241CCFF2D40AF7AF8A4FC02272C47A30D15DBDFB36E3266D1296212574F328E'},
      body:`{"CompanyId":${companyId},"LiffId":"${liffId}", "LineUserId":"${lineUserId}","LinePOSId":"${linePOSId}"}`
      }).then(function(response) {
        return response.text();
      }).then(function(data) {

        userData = data;
    });
    
    return userData;
      
  }
  catch (err) {
    return "Error: " + err.message;
    
  }
};

const findCoinPOSEmail = async(companyId, email) => 
{
  try
  {
    var productList = null;
    await fetch(serviceUrl + 'GetEmailInCompany',//fetch('http://localhost:5002/simple-cors3', 
    { 
      method:'POST',
      //credentials:"include",
      headers: {'Content-Type': 'application/json','x-security-lock':'0241CCFF2D40AF7AF8A4FC02272C47A30D15DBDFB36E3266D1296212574F328E'},
      body:`{"CompanyId":${companyId},"Email":"${email}"}`
      }).then(function(response) {
        return response.text();
      }).then(function(data) {

      //var obj = JSON.parse(data);
      //console.log("Obj = " + obj);
      console.log(data); // this will be a string
      productList = data;
    });
    
    return productList;
      //res.send(productList);
  }
  catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};
export default UserServices;
