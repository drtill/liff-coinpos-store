import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiPlus, FiMinus } from 'react-icons/fi';

import { ImFacebook, ImGoogle } from 'react-icons/im';
import {BsLine} from 'react-icons/bs'

import Tags from '@component/common/Tags';
import Stock from '@component/common/Stock';
import Price from '@component/common/Price';
import useAddToCart from '@hooks/useAddToCart';
import UnCloseAbleModal from './UnCloseAbleModal';
import Loading from '@component/preloader/Loading';

const NewOrderModal = ({ modalOpen, setModalOpen, createNewOrder, goToOrder, loading }) => {
  //const { handleIncreaseQuantity, setItem, item } = useAddToCart();

  //const [cartQuantity,setCartQuantity] = useState(itemcartQty);
  

  return (
    <UnCloseAbleModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <div className="inline-block w-full max-w-lg p-10 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
        <>
        <div className="text-center mb-6">
            <h2 className="text-3xl font-bold font-serif">อนุมัติตะกร้าสินค้านี้แล้ว</h2>
            <p className="text-sm md:text-base text-gray-500 mt-2 mb-8 sm:mb-10">
            ไม่สามารถแก้ไขตะกร้าสินค้านี้ได้ กรุณาเลือกการดำเนินการต่อไป
            </p>
        </div>
        {
          loading
          ?
            <Loading loading={loading}/>
          :
            <div className="flex justify-between flex-col lg:flex-row">
              <button className="text-sm inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-serif text-center justify-center rounded-md focus:outline-none text-gray-600 bg-gray-100 shadow-sm md:px-2 my-1 sm:my-1 md:my-1 lg:my-0 lg:px-3 py-4 md:py-3.5 lg:py-4 hover:text-white hover:bg-green-600 h-11 md:h-12 w-full mr-2"
                  onClick={() => createNewOrder()}
              >
                  <BsLine /> <span className="ml-2">เปิดตะกร้าใหม่</span>
              </button>

              <button
                        className="text-sm inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-serif text-center justify-center rounded-md focus:outline-none text-gray-600 bg-gray-100 shadow-sm md:px-2 my-1 sm:my-1 md:my-1 lg:my-0 lg:px-3 py-4 md:py-3.5 lg:py-4 hover:text-white hover:bg-red-500 h-11 md:h-12 w-full"
                        onClick={() => goToOrder()}
                        
                      >
                        <ImGoogle /> <span className="ml-2">ดูข้อมูลตะกร้าเดิม</span>
                      </button>
                </div>
        }
        
                
            
        
        </>
      </div>
    </UnCloseAbleModal>
  );
};

export default React.memo(NewOrderModal);
