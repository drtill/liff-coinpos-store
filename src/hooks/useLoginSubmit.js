import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { GoogleLogin } from 'react-google-login';

//internal import
import UserServices from '@services/UserServices';
import { UserContext } from '@context/UserContext';
import { notifyError, notifySuccess } from '@utils/toast';

const useLoginSubmit = (setModalOpen) => {
  const router = useRouter();
  const { redirect } = router.query;
  const { dispatch } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const submitHandler = async ({
    name,
    email,
    registerEmail,
    verifyEmail,
    password,
    companyId,
    locationId,
    companyName,
    locationEmail,
    liffId,
    lineUserId,
    linePOSId,
    paramPath,
    targetPage,
    catalogName
  }) => {
    //alert("Loading");
    setLoading(true);
    if(liffId && lineUserId && linePOSId)
    {
      alert("Liff Login");
      var userLogin = await UserServices.fetchCoinposLineLogin({
        companyId,
        liffId,
        lineUserId,
        linePOSId,
        paramPath

      });
      if(userLogin !== undefined && userLogin !== null)
      {
            //return;
            //router.push(redirect || '/checkout');
        router.push(redirect || '/' + userLogin.paramPath);
            //router.push(redirect);

        sessionStorage.setItem('customerId', userLogin.customerId);
        sessionStorage.setItem('customerFirstName', userLogin.firstName);
        sessionStorage.setItem('customerLastName', userLogin.lastName);
        sessionStorage.setItem('customerEmail', userLogin.email);
        sessionStorage.setItem('customerPhoneNumber', userLogin.phone);

        sessionStorage.setItem('customerAddressId', userLogin.customerAddressId);


        sessionStorage.setItem('address1', userLogin.address1);
        sessionStorage.setItem('country', userLogin.country);
        sessionStorage.setItem('province', userLogin.province);
        sessionStorage.setItem('city', userLogin.city);
        sessionStorage.setItem('district', userLogin.district);

        sessionStorage.setItem('countryId', userLogin.countryId);
        sessionStorage.setItem('provinceId', userLogin.provinceId);
        sessionStorage.setItem('cityId', userLogin.cityId);
        sessionStorage.setItem('districtId', userLogin.districtId);
        sessionStorage.setItem('postalcode', userLogin.postalcode);

        sessionStorage.setItem('countrys', JSON.stringify(userLogin.countrys));
        sessionStorage.setItem('provinces', JSON.stringify(userLogin.provinces));
        sessionStorage.setItem('cities', JSON.stringify(userLogin.cities));
        sessionStorage.setItem('districts', JSON.stringify(userLogin.districts));


        notifySuccess('Login Success!');
        dispatch({ type: 'USER_LOGIN', payload: userLogin });
        Cookies.set('userInfo', JSON.stringify(userLogin));

        localStorage.setItem('userInfo', JSON.stringify(userLogin));

        
      }
      else
      {
        notifyError('Login fail please check your email or password and try again');
      }
    }
    else if (registerEmail && password) {
      //alert("Email " + registerEmail + " password " + password + " paramPath = " + paramPath );
      //return;
      var userLogin = await UserServices.fetchCoinposUserLogin({
        registerEmail,
        password,
        companyId,
        paramPath

      });
      //if()

      //alert("UserLogin = " + JSON.stringify(userLogin));
      setLoading(false);
      setModalOpen(false);
      if(userLogin !== undefined && userLogin !== null)
      {
        //alert("UserLogin = " + userLogin);
            //return;
            //router.push(redirect || '/checkout');
        if(targetPage.length > 0)
        {
          alert('targetPage = ' + targetPage + ' catalogName = ' + catalogName);
          router.push(targetPage);
        }
        else
        {
          router.push(redirect || '/' + userLogin.paramPath);
        }
          
            //router.push(redirect);

            //alert('customerId = ' + userLogin.customerId)
        sessionStorage.removeItem('targetPage');
        
        sessionStorage.setItem('customerId', userLogin.customerId);
        sessionStorage.setItem('customerFirstName', userLogin.firstName);
        sessionStorage.setItem('customerLastName', userLogin.lastName);
        sessionStorage.setItem('customerEmail', userLogin.email);
        sessionStorage.setItem('customerPhoneNumber', userLogin.phone);

        sessionStorage.setItem('customerAddressId', userLogin.customerAddressId);


        sessionStorage.setItem('address1', userLogin.address1);
        sessionStorage.setItem('country', userLogin.country);
        sessionStorage.setItem('province', userLogin.province);
        sessionStorage.setItem('city', userLogin.city);
        sessionStorage.setItem('district', userLogin.district);

        sessionStorage.setItem('countryId', userLogin.countryId);
        sessionStorage.setItem('provinceId', userLogin.provinceId);
        sessionStorage.setItem('cityId', userLogin.cityId);
        sessionStorage.setItem('districtId', userLogin.districtId);
        sessionStorage.setItem('postalcode', userLogin.postalcode);

        sessionStorage.setItem('countrys', JSON.stringify(userLogin.countrys));
        sessionStorage.setItem('provinces', JSON.stringify(userLogin.provinces));
        sessionStorage.setItem('cities', JSON.stringify(userLogin.cities));
        sessionStorage.setItem('districts', JSON.stringify(userLogin.districts));


        notifySuccess('Login Success!');
        dispatch({ type: 'USER_LOGIN', payload: userLogin });
        Cookies.set('userInfo', JSON.stringify(userLogin));

        localStorage.setItem('userInfo', JSON.stringify(userLogin));
      }
      else
      {
        notifyError('Login fail please check your email or password and try again');
      }
      

        
    }
    if (name && email && password) {
      //alert("Name = " + name + " email = " + email + " password = " + password + " companyId = " + companyId);
      //return;
      var dataPath = '';
      if(sessionStorage.getItem('dataPath'))
      {
        dataPath = sessionStorage.getItem('dataPath'); 
        
              
      }
      UserServices.fetchVerifyCoinPOSEmailAddress({ name, email, password, companyName, locationEmail, companyId, locationId, dataPath })
        .then((res) => {
          //alert('then = ' + res)
          setLoading(false);
          setModalOpen(false);
          if(res.length > 0)
          {
            if(res.includes('Error:'))
            {
              var errorData = res.split(":")
              if(errorData.length > 1)
              {
                notifyError(errorData[1]);
              }
              else
              {
                notifyError(errorData[0]);
              }
              
            
            }
            else
            {
              notifySuccess(res);
            }
          }
          else
          {

          }
          
          
        })
        .catch((err) => {
          setLoading(false);
          alert('catch = ' + JSON.stringify(err));
          
          notifyError(err.response.data.message);
          
        });
    }
    if (verifyEmail) {
      //alert("verifyEmail");
      //UserServices.forgetPassword({ verifyEmail })

      UserServices.forgetCoinPOSCustomerPassword({ email:verifyEmail, companyName:companyName, locationEmail:locationEmail,companyId:companyId })
        .then((res) => {
          setLoading(false);
          notifySuccess(res.message);
          setValue('verifyEmail');
        })
        .catch((err) => {
          setLoading(false);
          notifyError(err ? err.response.data.message : err.message);
        });
    }

    
  };

  const handleGoogleSignIn = async (user) => {
    
    if(!user)
    {
      return;
    }
    if(!user.profileObj)
    {
      return;
    }
    setLoading(true);
    //alert('user google = ' + user.profileObj.name + " Email = " + user.profileObj.email + " imgUrl = " + user.profileObj.imageUrl);

    console.log('user google = ' + JSON.stringify(user));

    //return JSON.stringify(user);
    var companyId = 0;
    if(sessionStorage.getItem('companyId'))
    {
      companyId = sessionStorage.getItem('companyId'); 
      //alert("Google CompanyId = " + companyId);
            
    }
    
    await UserServices.fetchCoinposGoogleLogin({
      companyId:companyId,
      name: user.profileObj.name,
      email: user.profileObj.email,
      image: user.profileObj.imageUrl,
    })
      .then((res) => {
        setModalOpen(false);
        //alert(JSON.stringify(res));

        var userLogin = res;
        sessionStorage.removeItem('targetPage');
        
        sessionStorage.setItem('customerId', userLogin.customerId);
        sessionStorage.setItem('customerFirstName', userLogin.firstName);
        sessionStorage.setItem('customerLastName', userLogin.lastName);
        sessionStorage.setItem('customerEmail', userLogin.email);
        sessionStorage.setItem('customerPhoneNumber', userLogin.phone);

        sessionStorage.setItem('customerAddressId', userLogin.customerAddressId);


        sessionStorage.setItem('address1', userLogin.address1);
        sessionStorage.setItem('country', userLogin.country);
        sessionStorage.setItem('province', userLogin.province);
        sessionStorage.setItem('city', userLogin.city);
        sessionStorage.setItem('district', userLogin.district);

        sessionStorage.setItem('countryId', userLogin.countryId);
        sessionStorage.setItem('provinceId', userLogin.provinceId);
        sessionStorage.setItem('cityId', userLogin.cityId);
        sessionStorage.setItem('districtId', userLogin.districtId);
        sessionStorage.setItem('postalcode', userLogin.postalcode);

        sessionStorage.setItem('countrys', JSON.stringify(userLogin.countrys));
        sessionStorage.setItem('provinces', JSON.stringify(userLogin.provinces));
        sessionStorage.setItem('cities', JSON.stringify(userLogin.cities));
        sessionStorage.setItem('districts', JSON.stringify(userLogin.districts));

        notifySuccess('Login success!');
        //router.push(redirect || '/');
        



        dispatch({ type: 'USER_LOGIN', payload: res });
        Cookies.set('userInfo', JSON.stringify(res));

        localStorage.setItem('userInfo', JSON.stringify(userLogin));
      })

      .catch((err) => {
        notifyError(err.message);
        setModalOpen(false);
      });

      
  };
  const handleLineSignIn = async () => {
    setLoading(true);
    alert("Line SignIn")
    var dataPath = '';
    var companyCode = '';
    var catalogName = '';
      if(sessionStorage.getItem('dataPath'))
      {
        dataPath = sessionStorage.getItem('dataPath'); 
        
              
      }
      if(sessionStorage.getItem('companyCode'))
      {
        companyCode = sessionStorage.getItem('companyCode'); 
        
              
      }
      if(sessionStorage.getItem('catalogName'))
      {
        catalogName = sessionStorage.getItem('catalogName'); 
        
              
      }
      alert("dataPath = " + dataPath + " companyCode = " + companyCode + " catalogName = " + catalogName);

    var liffData = '';
    if(sessionStorage.getItem('catalogLiffId'))
    {
      alert('Get liffData = ' + sessionStorage.getItem('catalogLiffId'));
      liffData = sessionStorage.getItem('catalogLiffId');
    }
    if(sessionStorage.getItem('fromPage') === 'liff')
    {
      alert('from liff');
      const liff = (await import('@line/liff')).default
      try {
        await liff.init({ liffId:liffData });
      } catch (error) {
        console.error('liff init error', error.message)
      }

      if (!liff.isLoggedIn()) {
        
        var url = 'https://d69e-124-120-152-48.ap.ngrok.io' + '/liffId=' + liffData + '?companycode=' + companyCode + '&catalog=' + catalogName;
        alert(url);
        liff.login({ redirectUri: url});
      }
      else
      {
        alert("Logined")
        let getProfile = await liff.getProfile();
        
        alert("GetProfile")
        var lineUsername = getProfile.displayName;
                  
                  
        var lineLiffUserId = getProfile.userId;
                  
        var lineProfileImage = getProfile.pictureUrl;
        const email = liff.getDecodedIDToken().email;
        alert("GetEmail = " + JSON.stringify(email));
        alert("GetProfile = " + lineUsername + " " + lineLiffUserId + " " + lineProfileImage)

        sessionStorage.setItem('lineUsername', lineUsername);
        sessionStorage.setItem('lineUserId', lineLiffUserId);
        sessionStorage.setItem('lineProfileImage', lineProfileImage);
        
        var dataUser = {};
        dataUser['image'] = lineProfileImage;
        dataUser['name'] = lineUsername;
        dataUser['email'] = email;

        
                  //orderData['_id']
                  //Cookies.set('lineUserName', lineUsername);
        Cookies.set('userInfo', JSON.stringify(dataUser));
        sessionStorage.setItem('userInfo', JSON.stringify(dataUser));
        localStorage.setItem('userInfo', JSON.stringify(dataUser));
        dispatch({ type: 'USER_LOGIN', payload: dataUser });
        
                  
      }
      setModalOpen(false);
      return;
    }
    else if(sessionStorage.getItem('fromPage') === 'catalog')
    {
      alert('from catalog');
      router.push(redirect || '/' + 'liffId=' + liffData + '?companycode=' + companyCode + '&catalog=' + catalogName);
    }
    //alert('liffData = ' + liffData);
    

    
    /*var getProfile = null;
    const liff = (await import('@line/liff')).default
    try {
      await liff.init({ liffId:liffData });
    } catch (error) {
      console.error('liff init error', error.message)
    }
    if (!liff.isLoggedIn()) {
      //alert("Will Login")
      //var url = 'https://6e3b-2001-fb1-b1-5dda-19ad-b449-f716-f151.ap.ngrok.io/coinpos/2-MyCustomer';//'https://6e3b-2001-fb1-b1-5dda-19ad-b449-f716-f151.ap.ngrok.io/liffId=1656885294-1ggNNLVX';//'https://6e3b-2001-fb1-b1-5dda-19ad-b449-f716-f151.ap.ngrok.io/' + dataPath;
      var url = 'https://6e3b-2001-fb1-b1-5dda-19ad-b449-f716-f151.ap.ngrok.io' + '/liffId=1656555843-E6WV7arj' + '?catalog=' + dataPath;
      alert(url);
      liff.login({ redirectUri: url});
    }
    else
    {
      alert("Logined")
      getProfile = await liff.getProfile();
      
      alert("GetProfile")
                
    }
    return JSON.stringify(getProfile);*/
    var companyId = 0;
    if(sessionStorage.getItem('companyId'))
    {
      companyId = sessionStorage.getItem('companyId'); 
      alert("Google CompanyId = " + companyId);
            
    }
    UserServices.fetchCoinposGoogleLogin({
      companyId:companyId,
      name: user.profileObj.name,
      email: user.profileObj.email,
      image: user.profileObj.imageUrl,
    })
      .then((res) => {
        setModalOpen(false);
        alert(JSON.stringify(res));
        notifySuccess('Login success!');
        //router.push(redirect || '/');
        



        dispatch({ type: 'USER_LOGIN', payload: res });
        Cookies.set('userInfo', JSON.stringify(res));
      })

      .catch((err) => {
        notifyError(err.message);
        setModalOpen(false);
      });

      setLoading(false);
  };

  return {
    handleSubmit,
    submitHandler,
    handleGoogleSignIn,
    handleLineSignIn,
    register,
    errors,
    GoogleLogin,
    loading,
  };
};

export default useLoginSubmit;
