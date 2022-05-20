import React, { useContext, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useCart } from 'react-use-cart';
import { FiHome, FiUser, FiShoppingCart, FiAlignLeft } from 'react-icons/fi';
import {BsPersonCircle} from 'react-icons/bs'

import { UserContext } from '@context/UserContext';
import LoginModal from '@component/modal/LoginModal';
import { SidebarContext } from '@context/SidebarContext';
import CategoryDrawer from '@component/drawer/CategoryDrawer';

const MobileFooter = ({companyLogo, companyName, dataPath, RefreshProductList, FilterProduct}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const { toggleCartDrawer, toggleCategoryDrawer } = useContext(SidebarContext);
  const { totalItems } = useCart();
  const {
    state: { userInfo },
  } = useContext(UserContext);

  const [companyFacebook,setCompanyFacebook] = useState('');
  const [companyLine,setCompanyLine] = useState('');
  const [companyCode,setCompanyCode] = useState('');
  useEffect(() => 
  {
    if(sessionStorage.getItem('companyFacebook'))
    {
          
      var companyFacebookData = sessionStorage.getItem('companyFacebook');
      setCompanyFacebook(companyFacebookData);
      //alert(companyFacebook)
    }
    if(sessionStorage.getItem('companyLine'))
    {
          
      var companyLineData = sessionStorage.getItem('companyLine');
      setCompanyLine(companyLineData); 
    }
    if(sessionStorage.getItem('companyCode'))
    {
          
      var companyCodeData = sessionStorage.getItem('companyCode');
      setCompanyCode(companyCodeData); 
    }

  },[])

  return (
    <>
      <LoginModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
      <div className="flex flex-col h-full justify-between align-middle bg-white rounded cursor-pointer overflow-y-scroll flex-grow scrollbar-hide w-full">
        <CategoryDrawer className="w-6 h-6 drop-shadow-xl" companyLogo={companyLogo} companyName={companyName} dataPath={dataPath} FilterProduct={FilterProduct} />
      </div>
      <footer className="lg:hidden fixed z-30 bottom-0 bg-cyan-600 flex items-center justify-between w-full h-16 px-3 sm:px-10">
        <button
          aria-label="Bar"
          onClick={toggleCategoryDrawer}
          className="flex items-center justify-center flex-shrink-0 h-auto relative focus:outline-none"
        >
          <span className="text-xl text-white">
            <FiAlignLeft className="w-6 h-6 drop-shadow-xl" />
          </span>
        </button>
        <Link href={"/" + companyCode + "/" + dataPath}>
          <a className="text-xl text-white" rel="noreferrer" aria-label="Home">
            {' '} 
            <FiHome className="w-6 h-6 drop-shadow-xl" />
          </a>
        </Link>

        <button
          onClick={toggleCartDrawer}
          className="h-9 w-9 relative whitespace-nowrap inline-flex items-center justify-center text-white text-lg"
        >
          <span className="absolute z-10 top-0 right-0 inline-flex items-center justify-center p-1 h-5 w-5 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 bg-red-500 rounded-full">
            {totalItems}
          </span>
          <FiShoppingCart className="w-6 h-6 drop-shadow-xl" />
        </button>
        <button
          aria-label="User"
          type="button"
          className="text-xl text-white indicator justify-center"
        >
          {userInfo?.image ? (
            <Link href={"/" + companyCode + "/user/dashboard"}>
              <a className="relative top-1 w-6 h-6">
                <Image
                  width={29}
                  height={29}
                  src={userInfo.image}
                  alt="user"
                  className="rounded-full"
                />
              </a>
            </Link>
          ) : userInfo?.name ? (
            <Link href={"/" + companyCode + "/user/dashboard"}>
              <a className="leading-none font-bold font-serif block">
                <BsPersonCircle className="w-6 h-6 drop-shadow-xl" />
                      
              </a>
                    
            </Link>
          ) : (
            <span onClick={() => setModalOpen(!modalOpen)}>
              <FiUser className="w-6 h-6 drop-shadow-xl" />
            </span>
          )}
        </button>
      </footer>
    </>
  );
};

export default dynamic(() => Promise.resolve(MobileFooter), { ssr: false });
