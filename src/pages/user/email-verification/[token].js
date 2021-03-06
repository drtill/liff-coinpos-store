import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { IoCheckmarkCircle, IoCloseCircle } from 'react-icons/io5';

//internal import
import { notifySuccess } from '@utils/toast';
import UserServices from '@services/UserServices';
import { UserContext } from '@context/UserContext';
import Loading from '@component/preloader/Loading';

const EmailVerification = ({ params }) => {
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { dispatch } = useContext(UserContext);

  useEffect(async () => {

    
    setLoading(true);
    //alert('params?.token = ' + params?.token)
    const regisRes = await UserServices.fetchCoinposUserRegister(params?.token);
    if(regisRes)
    {
      if(regisRes.isError)
      {
        //alert('error res = ' + res);
        setError(regisRes.message);
      }
      else
      {
        router.push('/' + regisRes.dataPath);
        setLoading(false);
        setSuccess(regisRes.message);
        notifySuccess('Register Success!');
        dispatch({ type: 'USER_LOGIN', payload: regisRes });
        Cookies.set('userInfo', JSON.stringify(regisRes));
      }
      
    }
    else
    {
      //alert("false");
      alert('error res = ' + res);
      setError("ไม่สามารถดึงข้อมูลลงทะเบียนได้ กรุณารอสักครู่และลองใหม่อีกครั้ง");
    }
    /*.then((res) => {
      alert('res = ' + JSON.stringify(res));
      if(res !== undefined)
      {
        //router.push('/');
        //router.push('/catalog/2-MyCustomer');
        router.push('/' + res.dataPath);
        setLoading(false);
        setSuccess(res.message);
        notifySuccess('Register Success!');
        dispatch({ type: 'USER_LOGIN', payload: res });
        Cookies.set('userInfo', JSON.stringify(res));
      }
      else
      {
        alert('error res = ' + res);
        setError(res.message);
      }
      
    })
    .catch((err) => {
      //alert('catch')
      setLoading(false);
      setError(err ? err.message : err.message);
    });*/
      
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      {loading ? (
        <Loading loading={loading} />
      ) : success ? (
        <div className="text-emerald-500">
          <IoCheckmarkCircle className="mx-auto mb-2 text-center text-4xl" />
          <h2 className="text-xl font-medium"> {success} </h2>
        </div>
      ) : (
        <div className="text-red-500">
          <IoCloseCircle className="mx-auto mb-2 text-center text-4xl" />
          <h2 className="text-xl font-medium"> {error} </h2>
        </div>
      )}
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  return {
    props: { params },
  };
};

export default EmailVerification;
