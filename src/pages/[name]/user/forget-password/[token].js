import { useRouter } from 'next/router';
import React, { useState, useContext, useRef } from 'react';
import Cookies from 'js-cookie';
import { useForm } from 'react-hook-form';
import { FiLock, FiMail } from 'react-icons/fi';
import { ToastContainer } from 'react-toastify';

//internal import
import Error from '@component/form/Error';
import InputArea from '@component/form/InputArea';
import UserServices from '@services/UserServices';
import { UserContext } from '@context/UserContext';
import { notifyError, notifySuccess } from '@utils/toast';

const ForgetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const { dispatch } = useContext(UserContext);
  const router = useRouter();
  const password = useRef('');
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const [companyId,setCompanyId] = useState(0);
  const [dataPath,setDataPath] = useState('');
  password.current = watch('newPassword');

  const submitHandler = async({ registerEmail, password, newPassword }) => {
    
    setLoading(true);
    if (newPassword) {
      //alert("submit Reset = " + router.query?.token)
      const token = router.query?.token;
      //const { email, companyId,} = jwt.decode(token);
      UserServices.resetCoinPOSCustomerPassword({ newPassword, token: router.query?.token })
        .then((res) => {
          setLoading(false);
          //alert('res = ' + JSON.stringify(res));
          if(res.message.includes("Error:"))
          {
            notifyError(res.message);
          }
          else
          {
            
            setShowLogin(true);
            notifySuccess(res.message);
            setCompanyId(Number(res.companyId));
            setDataPath(res.dataPath);
            setValue('newPassword');
          }
          
          
        })
        .catch((err) => {
          setLoading(false);
          //alert('err = ' + JSON.stringify(err));
          notifyError(err ? err.message : err.message);
        });
    }

    if (registerEmail && password) {

      //alert("Login");
      var companyIdData = 0;
      //alert("Login 2 ");
      if(sessionStorage.getItem('companyId'))
      {
        //alert("Get CompanyId");
        companyIdData = sessionStorage.getItem('companyId'); 
        //alert("CompanyId = " + companyIdData);
          
      }
      else
      {
        companyIdData = companyId;
      }
      

      await UserServices.fetchCoinposUserLogin({
        registerEmail,
        password,
        companyId:companyIdData
      })
        .then((res) => {
          setLoading(false);
          //setModalOpen(false);
          //alert(JSON.stringify(res));
          //return;
          router.push('/' + dataPath);
          //router.push(redirect);

          sessionStorage.setItem('customerFirstName', res.firstName);
          sessionStorage.setItem('customerLastName', res.lastName);
          sessionStorage.setItem('customerEmail', res.email);
          sessionStorage.setItem('customerPhoneNumber', res.phone);

          sessionStorage.setItem('address1', res.address1);
          sessionStorage.setItem('countryId', res.countryId);
          sessionStorage.setItem('provinceId', res.provinceId);
          sessionStorage.setItem('cityId', res.cityId);
          sessionStorage.setItem('districtId', res.districtId);
          sessionStorage.setItem('postalcode', res.postalcode);

          sessionStorage.setItem('countrys', JSON.stringify(res.countrys));
          sessionStorage.setItem('provinces', JSON.stringify(res.provinces));
          sessionStorage.setItem('cities', JSON.stringify(res.cities));
          sessionStorage.setItem('districts', JSON.stringify(res.districts));


          notifySuccess('Login Success!');
          dispatch({ type: 'USER_LOGIN', payload: res });
          Cookies.set('userInfo', JSON.stringify(res));
        })
        .catch((err) => {
          notifyError(err ? err.message : err.message);
          setLoading(false);
        });
      /*UserServices.userLogin({
        registerEmail,
        password,
      })
        .then((res) => {
          setLoading(false);
          router.push('/');
          notifySuccess('Login Success!');
          dispatch({ type: 'USER_LOGIN', payload: res });
          Cookies.set('userInfo', JSON.stringify(res));
        })
        .catch((err) => {
          setLoading(false);
          notifyError(err ? err.response.data.message : err.message);
        });*/
    }
    setLoading(false);
  };

  return (
    <>
      <ToastContainer />
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white rounded-lg shadow max-w-md w-full space-y-8 py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold font-serif">
              {showLogin ? 'เข้าสู่ระบบ' : 'ลืมรหัสผ่าน'}
            </h2>
            <p className="text-sm md:text-base text-gray-500 mt-2 mb-8 sm:mb-10">
              {showLogin
                ? 'เข้าสู่ระบบด้วย Email และ รหัสผ่านใหม่ ของคุณ'
                : 'รีเซ็ทรหัสผ่าน ของคุณ'}
            </p>
          </div>
          <form
            onSubmit={handleSubmit(submitHandler)}
            className="flex flex-col justify-center"
          >
            <div className="grid grid-cols-1 gap-5">
              {showLogin && (
                <>
                  {' '}
                  <div className="form-group">
                    <InputArea
                      register={register}
                      label="Email"
                      name="registerEmail"
                      type="email"
                      placeholder="Email"
                      Icon={FiMail}
                    />
                    <Error errorName={errors.registerEmail} />
                  </div>
                  <div className="form-group">
                    <InputArea
                      register={register}
                      label="Password"
                      name="password"
                      type="password"
                      placeholder="Password"
                      Icon={FiLock}
                    />

                    <Error errorName={errors.password} />
                  </div>
                </>
              )}

              {!showLogin && (
                <>
                  {' '}
                  <div className="form-group">
                    <input
                      name="newPassword"
                      type="password"
                      placeholder="รหัสผ่านใหม่"
                      {...register('newPassword', {
                        required: 'ต้องระบุรหัสผ่าน',
                        minLength: {
                          value: 8,
                          message: 'รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร',
                        },
                      })}
                      className="py-2 px-4 md:px-5 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-gray-100 border-gray-200 focus:outline-none focus:border-cyan-500 h-11 md:h-12"
                    />

                    <Error errorName={errors.newPassword} />
                  </div>
                  <div className="form-group">
                    <input
                      name="confirm_password"
                      type="password"
                      placeholder="ยืนยันรหัสผ่าน"
                      {...register('confirm_password', {
                        validate: (value) =>
                          value === password.current ||
                          'รหัสผ่านไม่ตรงกัน',
                      })}
                      className="py-2 px-4 md:px-5 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-gray-100 border-gray-200 focus:outline-none focus:border-cyan-500 h-11 md:h-12"
                    />

                    <Error errorName={errors.confirm_password} />
                  </div>
                </>
              )}

              <button
                disabled={loading}
                type="submit"
                className="w-full text-center py-3 rounded bg-cyan-500 text-white hover:bg-cyan-600 font-medium text-sm text-white transition-all focus:outline-none my-1"
              >
                {showLogin ? 'เข้าสู่ระบบ' : 'รีเซ็ท รหัสผ่าน'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

// export const getServerSideProps = async ({ params }) => {
//   return {
//     props: { params },
//   };
// };

export default ForgetPassword;
