import requests from './httpServices';
import jwt from 'jsonwebtoken';
const {tokenForVerify } = require('../config/auth');

const serviceUrl = 'https://coinpos-uat.azurewebsites.net/lineliff/';
//const serviceUrl = 'http://localhost:41781/lineliff/';
const JWT_SECRET_FOR_VERIFY = 'lfjfjasjfr09ri09wrilfdjdjgdfgd';
const JWT_SECRET = 'fgdfgdfgdfgfgfdgdfgdfgfgfgtrgrtg5455454y4646hhgdfg';

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
  coinposUserRegister(token, body) {
    return requests.post(`/user/coinpos-register/${token}`, body);
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
  async fetchCoinposGoogleLogin(body) {
    try {
      const userJson = await loginCoinPOSCustomerGoogleAccount(body.companyId,body.name,body.email,body.image);
      
      
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
  verifyCoinPOSEmailAddress(body) {
    alert('run Regis')
    return requests.post('/user/verify-coinpos-email', body);
  },
  async fetchVerifyCoinPOSEmailAddress(body) {
    try
    {
      //alert('fetchVerify')
      //alert('process.env.JWT_SECRET_FOR_VERIFY = ' + JWT_SECRET_FOR_VERIFY)
      const token = tokenForVerify(body);
      //alert('token = ' + token)
      //return;
      var productList = null;
      //await fetch('https://api.coinpos.app/api' + '/user/verify-coinpos-email', 
      //await fetch('http://localhost:5055/api' + '/user/verify-coinpos-email', 
      await fetch(serviceUrl + 'CoinPOSCustomerRegister',
      { 
        method:'POST',
        //credentials:"include",
        headers: {'Content-Type': 'application/json','x-security-lock':'0241CCFF2D40AF7AF8A4FC02272C47A30D15DBDFB36E3266D1296212574F328E'},
        body:`{"companyId":${body.companyId},"locationId":${body.locationId},"name":"${body.name}","email":"${body.email}","password":"${body.password}","companyName":"${body.companyName}","locationEmail":"${body.locationEmail}","dataPath":"${body.dataPath}","token":"${token}"}`
        }).then(function(response) {
          return response.text();
        }).then(function(data) {

        //var obj = JSON.parse(data);
        //console.log("Obj = " + obj);
        //alert("expired = " + data)
        console.log("expired = " + data); // this will be a string
        productList = data;
      });
      
      return productList;
      
    }
    catch (err) {
      //alert("Error: " + err.message);
      return "Error: " + err.message;
      
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
  /* async fetchVerifyCoinPOSEmailAddress(body) {
    const isAdded = await findCoinPOSEmail(body.companyId,body.email);
  
    if (isAdded) {
      return ({
        message: 'This Email already Added!',
      });
    } else {
      
      const token = tokenForVerify(body);
      const body = {
        from: process.env.EMAIL_USER,
        to: `${body.email}`,
        subject: 'Email Activation',
        subject: 'Verify Your Email',
        html: `<h2>Hello ${body.email}</h2>
        <p>Verify your email address to complete the signup and login into your <strong>${body.companyName}</strong> account.</p>

          <p>This link will expire in <strong> 15 minute</strong>.</p>

          <p style="margin-bottom:20px;">Click this link for active your account</p>

          <a href=${process.env.STORE_URL}/user/email-verification/${token} style="background:#22c55e;color:white;border:1px solid #22c55e; padding: 10px 15px; border-radius: 4px; text-decoration:none;">Verify Account</a>

          <p style="margin-top: 35px;">If you did not initiate this request, please contact us immediately at ${body.locationEmail}</p>

          <p style="margin-bottom:0px;">Thank you</p>
          <strong>${body.companyName} Team</strong>
              `,
      };

      const message = 'Please check your email to verify!';
      var msgResult = sendEmail(body, res, message);

      return msgResult;
    }
  }, */
};

/* const sendEmail = (body, message) => {
  const transporter = nodemailer.createTransport({
    host: process.env.HOST,
    service: process.env.SERVICE,
    port: process.env.EMAIL_PORT,
    secure: false,//true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  transporter.verify(function (err, success) {
    if (err) {
      return ({
        message: `Error happen when verify ${err.message}`,
      });
      console.log(err.message);
    } else {
      console.log('Server is ready to take our messages');
    }
  });

  transporter.sendMail(body, (err, data) => {
    if (err) {
      return ({
        message: `Error happen when sending email ${err.message}`,
      });
    } else {
      return ({
        message: message,
      });
    }
  });
} */

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
const loginCoinPOSCustomerGoogleAccount = async(companyId, name, email, imageUrl) => 
{
  try
  {
    var userData = null;
    await fetch(serviceUrl + 'CoinPOSCustomerGoogleAccountLogin',//fetch('http://localhost:5002/simple-cors3', 
    { 
      method:'POST',
      //credentials:"include",
      headers: {'Content-Type': 'application/json','x-security-lock':'0241CCFF2D40AF7AF8A4FC02272C47A30D15DBDFB36E3266D1296212574F328E'},
      body:`{"CompanyId":${companyId}, "DisplayName":"${name}","Email":"${email}", "ImageUrl":"${imageUrl}"}`
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
/* const tokenForVerify = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      companyId: user.companyId
    },
    process.env.JWT_SECRET_FOR_VERIFY,
    { expiresIn: '15m' }
  );
}; */
export default UserServices;
