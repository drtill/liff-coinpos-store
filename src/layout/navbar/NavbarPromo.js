import { Fragment, useState } from 'react';
import Link from 'next/link';
import { Transition, Popover } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/outline';

//internal import
import { pages } from '@utils/data';
import Category from '@component/category/Category';

const NavbarPromo = ({FilterProduct, page, dataPath}) => {

  const [companyCode, setCompanyCode] = useState('');
  const [currentPage,setPage] = useState(page);
  useState(() => 
  {
    if(sessionStorage.getItem('companyCode'))
    {
      var companyCodeData = sessionStorage.getItem('companyCode');
      //alert("CompanyCode = " + companyCodeData); 
      setCompanyCode(companyCodeData);
            
    }

    setPage(page);

  },[])

  const handleDashBoardClick = () =>
    {
      //alert("Footer Update profile click")
      //return;
      var catalogName = '';
      if(sessionStorage.getItem('catalogName'))
      {
            
        catalogName = sessionStorage.getItem('catalogName'); 
      }
      var userLocalJson = localStorage.getItem('userInfo');
      var userLocal = JSON.parse(userLocalJson)
      //alert('catalogName = ' + catalogName);
      var target = 'dashboard';
      //alert('targetPage = ' + target);
      if (userLocal?.email) 
      {
        sessionStorage.setItem('catalogName',catalogName);
        router.push('/' +companyCode + '/user/' + target);
      } 
      else 
      {
        sessionStorage.setItem('targetPage','/' +companyCode + '/user/' + target);
        sessionStorage.setItem('catalogName',catalogName);
        setModalOpen(!modalOpen);
        //router.push('/user/' + targetPage);
      }
    }

    const handleMyOrdersClick = () =>
    {
      //alert("Footer Update profile click")
      //return;
      var catalogName = '';
      if(sessionStorage.getItem('catalogName'))
      {
            
        catalogName = sessionStorage.getItem('catalogName'); 
      }
      var userLocalJson = localStorage.getItem('userInfo');
      var userLocal = JSON.parse(userLocalJson)
      //alert('catalogName = ' + catalogName);
      var target = 'my-orders';
      //alert('targetPage = ' + target);
      if (userLocal?.email) 
      {
        sessionStorage.setItem('catalogName',catalogName);
        router.push('/' +companyCode + '/user/' + target);
      } 
      else 
      {
        sessionStorage.setItem('targetPage','/' +companyCode + '/user/' + target);
        sessionStorage.setItem('catalogName',catalogName);
        setModalOpen(!modalOpen);
        //router.push('/user/' + targetPage);
      }
    }
  return (
    <>
      <div className="hidden lg:block xl:block bg-white border-b">
        <div className="max-w-screen-2xl mx-auto px-3 sm:px-10 h-12 flex justify-between items-center">
          <div className="inline-flex">
            <Popover className="relative">
              <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center md:justify-start md:space-x-10">
                  {
                    currentPage === 'checkout' || currentPage === 'order' || currentPage === 'slug' || currentPage === 'contact-us' || currentPage === 'dashboard'  || currentPage === 'privacy' || currentPage === 'terms'
                    ?
                      <Popover.Group
                        as="nav"
                        className="md:flex space-x-10 items-center"
                      >
                        
                        <Link href={"/" + dataPath}>
                            <a className="font-serif mx-4 py-2 text-sm font-medium hover:text-cyan-600">
                              หน้าแรก
                            </a>
                          </Link>

                        <Link href="/contact-us">
                          <a className="font-serif mx-4 py-2 text-sm font-medium hover:text-cyan-600">
                            ติดต่อเรา
                          </a>
                        </Link>
                        <div onClick={() => handleDashBoardClick()}>
                          <a className="text-gray-600 inline-block w-full hover:text-cyan-500 cursor-pointer">
                          แดชบอร์ด
                          </a>
                        </div>
                        <div onClick={() => handleMyOrdersClick()}>
                          <a className="text-gray-600 inline-block w-full hover:text-cyan-500 cursor-pointer">
                          ใบสั่งขายของฉัน
                          </a>
                        </div>
                        {/* <Link onClick={() => handleDashBoardClick()}>
                          <a className="font-serif mx-4 py-2 text-sm font-medium hover:text-cyan-600">
                            แดชบอร์ด
                          </a>
                        </Link>
                        <Link onClick={() => handleMyOrdersClick()}>
                          <a className="font-serif mx-4 py-2 text-sm font-medium hover:text-cyan-600">
                            ใบสั่งขายของฉัน
                          </a>
                        </Link> */}
                        

                      
                        {/* <Link href="/offer">
                          <a className="relative inline-flex items-center h-6 bg-red-100 font-serif ml-4 py-0 px-2 rounded text-sm font-medium text-red-500 hover:text-cyan-600">
                            ส่วนลด
                            <div className="absolute flex w-2 h-2 left-auto -right-1 -top-1">
                              <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-red-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                            </div>
                          </a>
                        </Link> */}
                      </Popover.Group>
                    :
                      currentPage === 'allproduct'
                      ?
                      <Popover.Group
                      as="nav"
                      className="md:flex space-x-10 items-center"
                    >
                      
                      <Popover className="relative font-serif">
                        <Popover.Button className="group inline-flex items-center py-2 hover:text-cyan-600 focus:outline-none">
                          <span className="font-serif text-sm font-medium">
                            หมวดหมู่สินค้า
                          </span>
                          <ChevronDownIcon
                            className="ml-1 h-3 w-3 group-hover:text-cyan-600"
                            aria-hidden="true"
                          />
                        </Popover.Button>

                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-200"
                          enterFrom="opacity-0 translate-y-1"
                          enterTo="opacity-100 translate-y-0"
                          leave="transition ease-in duration-150"
                          leaveFrom="opacity-100 translate-y-0"
                          leaveTo="opacity-0 translate-y-1"
                        >
                          <Popover.Panel className="absolute z-10 -ml-1 mt-1 transform w-screen max-w-xs c-h-65vh bg-white">
                            <div className="rounded-md shadow-lg ring-1 ring-black ring-opacity-5 overflow-y-scroll flex-grow scrollbar-hide w-full h-full">
                              <Category FilterProduct={FilterProduct} page={currentPage}/>
                            </div>
                          </Popover.Panel>
                        </Transition>
                      </Popover>

                      
                      <Link href="/contact-us">
                        <a className="font-serif mx-4 py-2 text-sm font-medium hover:text-cyan-600">
                          ติดต่อเรา
                        </a>
                      </Link>
                      

                    
                      {/* <Link href="/offer">
                        <a className="relative inline-flex items-center h-6 bg-red-100 font-serif ml-4 py-0 px-2 rounded text-sm font-medium text-red-500 hover:text-cyan-600">
                          ส่วนลด
                          <div className="absolute flex w-2 h-2 left-auto -right-1 -top-1">
                            <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                          </div>
                        </a>
                      </Link> */}
                    </Popover.Group>
                      :
                      <Popover.Group
                        as="nav"
                        className="md:flex space-x-10 items-center"
                      >
                        <Popover className="relative font-serif">
                        <Popover.Button className="group inline-flex items-center py-2 hover:text-cyan-600 focus:outline-none">
                          <span className="font-serif text-sm font-medium">
                            หมวดหมู่สินค้า
                          </span>
                          <ChevronDownIcon
                            className="ml-1 h-3 w-3 group-hover:text-cyan-600"
                            aria-hidden="true"
                          />
                        </Popover.Button>

                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-200"
                          enterFrom="opacity-0 translate-y-1"
                          enterTo="opacity-100 translate-y-0"
                          leave="transition ease-in duration-150"
                          leaveFrom="opacity-100 translate-y-0"
                          leaveTo="opacity-0 translate-y-1"
                        >
                          <Popover.Panel className="absolute z-10 -ml-1 mt-1 transform w-screen max-w-xs c-h-65vh bg-white">
                            <div className="rounded-md shadow-lg ring-1 ring-black ring-opacity-5 overflow-y-scroll flex-grow scrollbar-hide w-full h-full">
                              <Category FilterProduct={FilterProduct} page={currentPage}/>
                            </div>
                          </Popover.Panel>
                        </Transition>
                      </Popover>
                        

                        <Link href={"/" + companyCode + "/allproduct"}>
                          <a className="font-serif mx-4 py-2 text-sm font-medium hover:text-cyan-600">
                            สินค้าทั้งหมด
                          </a>
                        </Link>
                        <Link href="/contact-us">
                          <a className="font-serif mx-4 py-2 text-sm font-medium hover:text-cyan-600">
                            ติดต่อเรา
                          </a>
                        </Link>

                      
                        {/* <Link href="/offer">
                          <a className="relative inline-flex items-center h-6 bg-red-100 font-serif ml-4 py-0 px-2 rounded text-sm font-medium text-red-500 hover:text-cyan-600">
                            ส่วนลด
                            <div className="absolute flex w-2 h-2 left-auto -right-1 -top-1">
                              <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-red-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                            </div>
                          </a>
                        </Link> */}
                      </Popover.Group>

                      
                  }
                  
                </div>
              </div>
            </Popover>
          </div>
          <div className="flex">
            
            <Link href="/privacy-policy">
              <a className="font-serif mx-4 py-2 text-sm font-medium hover:text-cyan-600">
                นโยบายความเป็นส่วนตัว
              </a>
            </Link>
            <Link href="/terms-and-conditions">
              <a className="font-serif mx-4 py-2 text-sm font-medium hover:text-cyan-600">
                ข้อกำหนดและเงื่อนไข
              </a>
            </Link>
            

          </div>
        </div>
      </div>
    </>
  );
};

export default NavbarPromo;
