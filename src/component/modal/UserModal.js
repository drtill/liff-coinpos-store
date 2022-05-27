import React, { useContext,useState,useEffect } from 'react';
import Cookies from 'js-cookie';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ImFacebook, ImGoogle } from 'react-icons/im';
import {BsLine} from 'react-icons/bs'
import {BsPersonCircle} from 'react-icons/bs'
import { IoLockOpenOutline } from 'react-icons/io5';

import { userSidebar } from '@utils/data';

import { useForm } from 'react-hook-form';

import Tags from '@component/common/Tags';
import Stock from '@component/common/Stock';
import Price from '@component/common/Price';
import useAddToCart from '@hooks/useAddToCart';
import MainModal from '@component/modal/MainModal';
import Loading from '@component/preloader/Loading';
import Label from '@component/form/Label';
import Uploader from '@component/image-uploader/Uploader';
import EditableCustomerInput from '@component/form/EditableCustomerInput';

import { notifyError, notifySuccess } from '@utils/toast';

import { UserContext } from '@context/UserContext';

const UserModal = ({ userModalOpen, setUserModalOpen, loading}) => {
  
  const [imageUrl, setImageUrl] = useState('');
  const [IsDisableCustomerInfo, setDisableCustomerInfo] = useState(true);

  const [firstName,setCustomerFirstName] = useState('');
  const [lastName,setCustomerLastName] = useState('');
  const [email,setCustomerEmail] = useState('');
  const [phoneNumber,setCustomerPhoneNumber] = useState('');

  const [address1,setCustomerAddress] = useState('');
  const [postalcode, setPostalCode] = useState('');
  const [districtText, setDistrictText] = useState('');
  const [cityText, setCityText] = useState('');
  const [provinceText, setProvinceText] = useState('');
  const [countryText, setCountryText] = useState('');

  const [dataPath, setDataPath] = useState('');

  const [companyCode,setCompanyCode] = useState('');

  const router = useRouter();
  const {
    dispatch,
    state: { userInfo },
  } = useContext(UserContext);

  /* const handleEmailChange = (event) => {  
    setCustomerEmail(event.target.value)
  }
  const handleContactChange = (event) => {  
    setCustomerPhoneNumber(event.target.value)
  }
  const handleFirstNameChange = (event) => {  
    setCustomerFirstName(event.target.value)
  }
  const handleLastNameChange = (event) => {  
    setCustomerLastName(event.target.value)
  } */


  const onSubmit = (data) => {
     

    //SaveCustomerInfo(companyId);

   
 };
 const {
  register,
  handleSubmit,
  setValue,
  formState: { errors },
} = useForm();

const handleLogOut = async () => {
  dispatch({ type: 'USER_LOGOUT' });

  notifySuccess('Logout Success!')
  Cookies.remove('userInfo');
  Cookies.remove('couponInfo');
  localStorage.removeItem('userInfo');

  var liffData = '';
  if(sessionStorage.getItem('catalogLiffId'))
  {
    //alert('Get liffData = ' + sessionStorage.getItem('catalogLiffId'));
    liffData = sessionStorage.getItem('catalogLiffId');
  }
  
  //alert("liffData log out = " + liffData);
  if(liffData)
  {
    //alert("To Liff Logout")
    const liff = (await import('@line/liff')).default
    try {
      //alert("Liff init")
      await liff.init({ liffId:liffData });
    } catch (error) {
      console.error('liff init error', error.message)
    }

    if (liff.isLoggedIn())
    {
      //alert("Liff log out")
      liff.logout();
    }
  }
  
  //alert("dataPath log out = " + dataPath);
  router.push('/' + dataPath);
  setUserModalOpen(false);
};

useEffect(() => 
{

  if(sessionStorage.getItem('dataPath'))
    {
      var dataPathData = sessionStorage.getItem('dataPath'); 
      //alert('dataPathData = ' + dataPathData)
      setDataPath(dataPathData);  
    }
    if(sessionStorage.getItem('companyCode'))
    {
      var companyCodeData = sessionStorage.getItem('companyCode'); 
      //alert('companyCodeData = ' + companyCodeData);
      setCompanyCode(companyCodeData);
            
    }
  if(sessionStorage.getItem('customerFirstName'))
  {
    
    var customerFirstNameData = sessionStorage.getItem('customerFirstName'); 
    setCustomerFirstName(customerFirstNameData);
  }
  if(sessionStorage.getItem('customerLastName'))
  {
    var customerLastNameData = sessionStorage.getItem('customerLastName'); 
    setCustomerLastName(customerLastNameData);
  }
  if(sessionStorage.getItem('customerEmail'))
  {
    var customerEmailData = sessionStorage.getItem('customerEmail'); 
    setCustomerEmail(customerEmailData);
  }
  if(sessionStorage.getItem('customerPhoneNumber'))
  {
    var customerPhoneNumberData = sessionStorage.getItem('customerPhoneNumber');
    setCustomerPhoneNumber(customerPhoneNumberData);
      
  }
  /* if(sessionStorage.getItem('address1'))
  {
    var customerAddress1Data = sessionStorage.getItem('address1'); 
    setCustomerAddress(customerAddress1Data);
      
  }
  if(sessionStorage.getItem('postalcode'))
  {
    var postalCodeData = sessionStorage.getItem('postalcode'); 
    setPostalCode(postalCodeData);
  }
  if(sessionStorage.getItem('city'))
  {
    var cityTextData = sessionStorage.getItem('city'); 
    setCityText(cityTextData);
          
  }
  if(sessionStorage.getItem('district'))
  {
    var districtTextData = sessionStorage.getItem('district'); 
    alert('districtTextData = ' + districtTextData)
    setDistrictText(districtTextData);
  }
  if(sessionStorage.getItem('province'))
  {
    var provinceTextData = sessionStorage.getItem('province'); 
    setProvinceText(provinceTextData);
  }
  if(sessionStorage.getItem('country'))
  {
    var countryTextData = sessionStorage.getItem('country'); 
    setCountryText(countryTextData);
  } */
},[])
  return (
    <MainModal modalOpen={userModalOpen} setModalOpen={setUserModalOpen}>
      <div className="inline-block w-full max-w-3xl p-5 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
        <>
        <div className="mx-auto max-w-screen-2xl">
          <div className="py-5 lg:py-6 flex flex-col lg:flex-row w-full">
            <div className="flex-shrink-0 w-full lg:w-40 mr-7 lg:mr-10  xl:mr-10 self-start">
              <div className="bg-white pt-6 pl-2 pr-2 pb-2 sm:pt-6 sm:pl-2 sm:pr-2 sm:pb-2 lg:pt-6 lg:pl-2 lg:pr-2 lg:pb-2 rounded-md sticky top-32">
                <h2 className="font-semibold font-serif text-base text-gray-700 pb-3">
                  เครื่องมือผู้ใช้
                </h2>
                {userSidebar.map((item) => (
                  <span
                    key={item.title}
                    className="p-2 my-2 flex font-serif items-center rounded-md hover:bg-gray-50 w-full hover:text-emerald-600"
                  >
                    <item.icon
                      className="flex-shrink-0 h-4 w-4"
                      aria-hidden="true"
                    />
                    <Link href={item.href.replace("{companyCode}",companyCode)}>
                      <a className="inline-flex items-center justify-between ml-2 text-sm font-medium w-full hover:text-emerald-600">
                        {item.title}
                      </a>
                    </Link>
                  </span>
                ))}
                <span className="p-2 flex font-serif items-center rounded-md hover:bg-gray-50 w-full hover:text-emerald-600">
                  <span className="mr-2">
                    <IoLockOpenOutline />
                  </span>{' '}
                  <button
                    onClick={handleLogOut}
                    className="inline-flex items-center justify-between text-sm font-medium w-full hover:text-emerald-600"
                  >
                    ออกจากระบบ
                  </button>
                </span>
              </div>
            </div>
            <div className="max-w-screen-2xl">
              {/* <div className="md:grid">
                <div className="md:col-span-1">
                  <div className="px-4 sm:px-0">
                    <h2 className="text-xl font-serif font-semibold mb-5">
                      User Profile
                    </h2>
                  </div>
                </div>
              </div> */}
              <div className="mt-5 md:mt-0 md:col-span-2">
              <div className="bg-white space-y-6">
                <div>
                  {/* <Label label="Photo" />
                  <div className="mt-1 flex items-center">
                    <Uploader imageUrl={imageUrl} setImageUrl={setImageUrl} />
                  </div> */}
                </div>
              </div>

              <div className="mt-10 sm:mt-0">
                <div className="md:grid-cols-6 md:gap-6">
                  <div className="mt-5 md:mt-0 md:col-span-2">
                    <div className="lg:mt-6 mt-4 bg-white">
                      <div className="form-group">
                        <h2 className="font-semibold font-serif text-base text-gray-700 pb-3">
                          ข้อมูลผู้ใช้
                        </h2>
                        <div className="grid grid-cols-6 gap-6">
                          <div className="col-span-6">
                            <div className="mb-3">
                              <Label label="Photo" />
                              {
                                imageUrl || userInfo?.image
                                ?
                                  <Image
                                    width={58}
                                    height={58}
                                    src={imageUrl || userInfo?.image}
                                    alt="user"
                                    className="bg-white rounded-full"
                                  />
                                :
                                <div className='text-slate-600'>
                                  <BsPersonCircle className="w-10 h-10 stroke-gray-900 drop-shadow-xl" />
                                </div>
                                
                              }
                              
                            </div>
                          </div>
                          <div className="col-span-6 sm:col-span-3">
                            <div className="mb-3">
                              <label for="exampleFormControlInput1" style={{color:"dimgray",display:"flex"}} className="form-label">ชื่อต้น</label>
                              <h3 className="py-2 px-4 md:px-5">{firstName}</h3>
                            </div>
                            {/* <EditableCustomerInput register={register}
                            label="First Name" 
                            name="firstName"
                            type="text"
                            placeholder="John"
                            isDisable={IsDisableCustomerInfo}
                              dataValue={firstName}
                              canAutoChange={true}
                            handleDataChange={handleFirstNameChange}
                            /> */}
                            
                          </div>

                          <div className="col-span-6 sm:col-span-3">
                            <div className="mb-3">
                              <label for="exampleFormControlInput1" style={{color:"dimgray",display:"flex"}} className="form-label">ชื่อสกุล</label>
                              <h3 className="py-2 px-4 md:px-5">{lastName}</h3>
                            </div>
                            {/* <EditableCustomerInput register={register}
                            label="Last Name" 
                            name="lastName"
                            type="text"
                            placeholder="Doe"
                            isDisable={IsDisableCustomerInfo}
                              dataValue={lastName}
                              canAutoChange={true}
                            handleDataChange={handleLastNameChange}
                            /> */}
                            
                          </div>

                          <div className="col-span-6 sm:col-span-3">
                            <div className="mb-3">
                              <label for="exampleFormControlInput1" style={{color:"dimgray",display:"flex"}} className="form-label">Email address</label>
                              <h3 className="py-2 px-4 md:px-5">{email}</h3>
                            </div>
                            
                            {/* <EditableCustomerInput register={register}
                            label="Email address"
                            name="email"
                            type="email"
                            placeholder="youremail@gmail.com"
                            isDisable={IsDisableCustomerInfo}
                            dataValue={email}

                            canAutoChange={true}
                            handleDataChange={handleEmailChange}
                            /> */}
                            
                          </div>

                          <div className="col-span-6 sm:col-span-3">
                            <div className="mb-3">
                              <label for="exampleFormControlInput1" style={{color:"dimgray",display:"flex"}} className="form-label">เบอร์ติดต่อ</label>
                              <h3 className="py-2 px-4 md:px-5">{phoneNumber}</h3>
                            </div>
                            {/* <EditableCustomerInput register={register}
                            label="Phone number"
                            name="contact"
                            type="tel"
                            placeholder="+062-6532956"
                            isDisable={IsDisableCustomerInfo}
                            dataValue={phoneNumber}
                            canAutoChange={true}
                            handleDataChange={handleContactChange}
                            /> */}

                            
                          </div>
                        </div>
                        {/* <h2 className="font-semibold font-serif text-base text-gray-700 pb-3">
                          ที่อยู่ขนส่ง
                        </h2>
                        <div className="grid grid-cols-6 gap-6 mb-8">
                          <div className="col-span-6">
                            <div className="mb-3">
                              <label for="exampleFormControlInput1" style={{color:"dimgray",display:"flex"}} className="form-label">บ้านเลขที่ ซอย ถนน</label>
                              <h3 className="py-2 px-4 md:px-5">{address1}</h3>
                            </div>
                          </div>
                          <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                            <div className="mb-3">
                              <label for="exampleFormControlInput1" style={{color:"dimgray",display:"flex"}} className="form-label">แขวง/ตำบล</label>
                              <h3 className="py-2 px-4 md:px-5">{districtText}</h3>
                            </div>
                          </div>
                          <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                            <div className="mb-3">
                              <label for="exampleFormControlInput1" style={{color:"dimgray",display:"flex"}} className="form-label">เขต/อำเภอ</label>
                              <h3 className="py-2 px-4 md:px-5">{cityText}</h3>
                            </div>
                          </div>
                          <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                            <div className="mb-3">
                              <label for="exampleFormControlInput1" style={{color:"dimgray",display:"flex"}} className="form-label">จังหวัด</label>
                              <h3 className="py-2 px-4 md:px-5">{provinceText}</h3>
                            </div>
                          </div>
                          <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                            <div className="mb-3">
                              <label for="exampleFormControlInput1" style={{color:"dimgray",display:"flex"}} className="form-label">รหัสไปรษณีย์</label>
                              <h3 className="py-2 px-4 md:px-5">{postalcode}</h3>
                            </div>
                          </div>
                          <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                            <div className="mb-3">
                              <label for="exampleFormControlInput1" style={{color:"dimgray",display:"flex"}} className="form-label">ประเทศ</label>
                              <h3 className="py-2 px-4 md:px-5">{countryText}</h3>
                            </div>
                          </div>
                        </div> */}
                      </div>

                      
                      
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
              
              
            </div>
            
          </div>
        </div>
        
        
        
                
            
        
        </>
      </div>
    </MainModal>
  );
};

export default React.memo(UserModal);
