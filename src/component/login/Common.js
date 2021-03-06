import React, { useState } from 'react';
import { ImFacebook, ImGoogle } from 'react-icons/im';
import {BsLine} from 'react-icons/bs'

//internal import
import Login from '@component/login/Login';
import Register from '@component/login/Register';
import ResetPassword from '@component/login/ResetPassword';
import useLoginSubmit from '@hooks/useLoginSubmit';

import Loading from '@component/preloader/Loading';

const Common = ({ setModalOpen }) => {
  const [showRegister, setShowRegister] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);

  const [loginLoading, setLoginLoading] = useState(false);

  const { handleGoogleSignIn,handleLineSignIn, GoogleLogin, loading } = useLoginSubmit(setModalOpen);

  const handleModal = () => {
    setShowRegister(!showRegister);
    setShowResetPassword(false);
  };

  const handleLoading = (loadingState) => 
  {
    //alert('handleLoading = ' + loadingState);
    setLoginLoading(loadingState)
  }

  return (
    
    <>
        <div className="overflow-hidden bg-white mx-auto">
          

          

            {
              loading
              ?
                <Loading loading={loading} />
              :
              <>
                {showResetPassword ? (
                  <ResetPassword
                    setShowResetPassword={setShowResetPassword}
                    setModalOpen={setModalOpen}
                    setLoginLoading={handleLoading}
                  />
                ) : showRegister ? (
                  <Register
                    setShowResetPassword={setShowResetPassword}
                    setModalOpen={setModalOpen}
                    setLoginLoading={handleLoading}
                  />
                ) : (
                  <Login
                    setShowResetPassword={setShowResetPassword}
                    setModalOpen={setModalOpen}
                    setLoginLoading={handleLoading}
                  />
                )}
                <div className="my-4 after:bg-gray-100 before:bg-gray-100 fo10t-sans text-center font-medium">
                  ????????????
                </div>
                <div className="flex justify-between flex-col lg:flex-row">
                  <button className="text-sm inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-serif text-center justify-center rounded-md focus:outline-none text-gray-600 bg-gray-100 shadow-sm md:px-2 my-1 sm:my-1 md:my-1 lg:my-0 lg:px-3 py-4 md:py-3.5 lg:py-4 hover:text-white hover:bg-green-600 h-11 md:h-12 w-full mr-2"
                  onClick={() => handleLineSignIn()}
                  >
                    <BsLine /> <span className="ml-2">????????????????????????????????????????????? Line</span>
                  </button>

                  <GoogleLogin
                    clientId={`${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`}
                    render={(renderProps) => (
                      <button
                        className="text-sm inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-serif text-center justify-center rounded-md focus:outline-none text-gray-600 bg-gray-100 shadow-sm md:px-2 my-1 sm:my-1 md:my-1 lg:my-0 lg:px-3 py-4 md:py-3.5 lg:py-4 hover:text-white hover:bg-red-500 h-11 md:h-12 w-full"
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                      >
                        <ImGoogle /> <span className="ml-2">????????????????????????????????????????????? Google</span>
                      </button>
                    )}
                    onSuccess={handleGoogleSignIn}
                    onFailure={handleGoogleSignIn}
                    cookiePolicy={'single_host_origin'}
                  />
                </div>
                <div className="text-center text-sm text-gray-900 mt-4">
                  <div className="text-gray-500 mt-2.5">
                    {showRegister ? '??????????????????????????????????????????????????????????????? ?' : '????????????????????????????????????????????????????????? ?'}
                    <button
                      onClick={handleModal}
                      className="text-gray-800 hover:text-cyan-500 font-bold mx-2"
                    >
                      {showRegister ? '?????????????????????????????????' : '???????????????????????????'}
                    </button>
                  </div>
                </div>
              </>
            }
          
        </div>
      </>
    
    
    
  );
};

export default Common;
