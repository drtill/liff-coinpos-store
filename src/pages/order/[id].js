import Cookies from 'js-cookie';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ReactToPrint from 'react-to-print';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { IoCloudDownloadOutline, IoPrintOutline } from 'react-icons/io5';

import {getDatabase, ref,onChildAdded} from "firebase/database";
import { initializeApp } from 'firebase/app';

import {
  IoReturnUpBackOutline,
  IoArrowForward,
  IoBagHandle,
  IoWalletSharp,
  IoLink
} from 'react-icons/io5';
//internal import
import Layout from '@layout/Layout';
import useAsync from '@hooks/useAsync';
import Invoice from '@component/invoice/Invoice';
import Loading from '@component/preloader/Loading';
import OrderServices from '@services/OrderServices';
import UserServices from '@services/UserServices';
import ProductServices from '@services/ProductServices';
import { UserContext } from '@context/UserContext';
import InvoiceForDownload from '@component/invoice/InvoiceForDownload';
import ReceiptForDownload from '@component/receipt/ReceiptForDownload';
import PaymentMethod from './PaymentMethod';
import ShippingTracking from './ShippingTracking';
import Receipt from '@component/receipt/Receipt';


const Order = ({ params }) => {
  const printRef = useRef();
  const orderId = params.id;
  const router = useRouter();
  const {
    state: { userInfo },
  } = useContext(UserContext);

  const { dispatch } = useContext(UserContext);

  const [companyId, setCompanyId] = useState(0);
  const [locationId, setLocationId] = useState(0);
  const [linePOSId, setLinePOSId] = useState('');
  const [lineUserId, setLineUserId] = useState('');
  const [groupId, setGroupId] = useState('');
  const [liffId, setLiffId] = useState('');
  const [pictureUrl, setPictureUrl] = useState('');
  const [dataPath,setDataPath] = useState('')
  const [catalogName,setCatalogName] = useState('')
  const [companyLogo,setCompanyLogo] = useState('')
  const [companyName,setCompanyName] = useState('')

  const [locationName,setLocationName] = useState('')
  const [locationAddress1,setLocationAddress1] = useState('')
  const [locationAddress2,setLocationAddress2] = useState('')
  const [locationCity,setLocationCity] = useState('')
  const [locationStateOrProvince,setLocationStateOrProvince] = useState('')
  const [locationCountry,setLocationCountry] = useState('')
  const [locationPostalCode,setLocationPostalCode] = useState('')
  const [locationEmail,setLocationEmail] = useState('')
  const [locationTel,setLocationTel] = useState('')
  
  const [data,setPayOrder] = useState({});
  const [loading,setLoading] = useState(false);
  //const data = null;
  //const loading = true;
  //alert("Order");
  

  const firebaseConfig = {
    apiKey: "AIzaSyAPSYiGomHxlKF6ehtYwYcxP6CPRsc2c_Y",
    authDomain: "coinpos-b0846.firebaseapp.com",
    databaseURL: "https://coinpos-b0846.firebaseio.com",
    projectId: "coinpos-b0846",
    storageBucket: "coinpos-b0846.appspot.com",
    messagingSenderId: "740573480468",
    appId: "1:740573480468:web:c1d9616c07e7b29a828901"
  };
  
  const app = initializeApp(firebaseConfig);
  
      const [paymentContent, setPaymentContent] = useState([]);
  
      const paymentContentManager = () =>
        {
          var paymentContentData = []
          if(paymentStatusId === 2)//Paid
          {
            if(orderStatusId === 2)//Active
            {
              paymentContentData.push(<><h3 className="text-xl md:text-2xl lg:text-3xl font-bold font-serif mb-3">
                  เราได้รับการชำระเงินเรียบร้อยแล้ว เจ้าหน้าที่ของเราจะรีบดำเนินการส่งสินค้าให้เร็วที่สุด
                  </h3>
                  <p className="text-base opacity-90 leading-7">
                  ขอบคุณที่ใช้บริการ
                  </p></>)
            }
            else if(orderStatusId === 3)//Finalized
            {
              paymentContentData.push(<><h3 className="text-xl md:text-2xl lg:text-3xl font-bold font-serif mb-3">
                  เราได้รับการชำระเงินเรียบร้อยแล้ว เจ้าหน้าที่ของเราจะรีบดำเนินการส่งสินค้าให้เร็วที่สุด
                  </h3>
                  <p className="text-base opacity-90 leading-7">
                  ขอบคุณที่ใช้บริการ
                  </p></>)
            }
            else if(orderStatusId === 4)//Fulfilled
            {
              paymentContentData.push(<><h3 className="text-xl md:text-2xl lg:text-3xl font-bold font-serif mb-3">
                  ดำเนินการจัดส่งแล้ว
                  </h3>
                  <p className="text-base opacity-90 font-bold leading-7">
                  {data.serviceFullDisplay}
                  </p>
                  <p className="text-base opacity-90 leading-7">
                  ขอบคุณที่ใช้บริการ
                  </p>
                  
                  
                  </>)
              if(data.dataTrackings !== null)
              {
                if(data.trackingNumber !== null)
                {
                  paymentContentData.push(
                    <p className="text-base opacity-90 font-bold leading-7">
                    Tracking Number: 
                    <b> {data.trackingNumber} </b>
                    </p>
                  )
                  paymentContentData.push(
                  <Link href={data.trackingUrl}>
                    <a className="mb-3 sm:mb-0 md:mb-0 lg:mb-0 flex items-center justify-center bg-cyan-500 hover:bg-cyan-600 text-white transition-all font-serif text-sm font-semibold h-10 py-2 px-5 rounded-md">
                      Tracking {' '}
                      <span className="text-xl mr-2">
                        <IoLink />
                      </span>
                      
                    </a>
                  </Link>)
                  
                }
                paymentContentData.push(<ShippingTracking data={data}/>);
                
              }
            }
          }
          setPaymentContent(paymentContentData);
        }

    

  /*const { data, loading } = useAsync(() => ProductServices.fetchGetPayOrderById(
    {
      orderId,
      companyId,
      locationId,
      linePOSId,
      lineUserId,
      groupId,
      liffId,
      pictureUrl,
      catalogName

    }));*/

    useEffect(async () => {
      
      setLoading(true);
      //alert('Login 0');
      var companyId = 0;
      if(sessionStorage.getItem('companyId'))
      {
        var companyIdData = Number(sessionStorage.getItem('companyId'));
        setCompanyId(companyIdData);
      }
      if(sessionStorage.getItem('catalogName'))
      {
        var catalogNameData = sessionStorage.getItem('catalogName'); 
        setCatalogName(catalogNameData);
              
      }
      if(sessionStorage.getItem('companyLogo'))
      {
        var companyLogoData = sessionStorage.getItem('companyLogo'); 
        setCompanyLogo(companyLogoData);
      }
      if(sessionStorage.getItem('companyName'))
      {
        
        var companyNameData = sessionStorage.getItem('companyName'); 
        setCompanyName(companyNameData);
      }

      if(sessionStorage.getItem('dataPath'))
      {
        var dataPathData = sessionStorage.getItem('dataPath'); 
        setDataPath(dataPathData);
              
      }
      if(sessionStorage.getItem('locationName'))
      {
        var locationNameData = sessionStorage.getItem('locationName'); 
        setLocationName(locationNameData);
      }
      if(sessionStorage.getItem('locationAddress1'))
      {
        var locationAddress1Data = sessionStorage.getItem('locationAddress1'); 
        setLocationAddress1(locationAddress1Data);
      }
      if(sessionStorage.getItem('locationAddress2'))
      {
        var locationAddress2Data = sessionStorage.getItem('locationAddress2'); 
        setLocationAddress2(locationAddress2Data);
      }
      if(sessionStorage.getItem('locationCity'))
      {
        var locationCityData = sessionStorage.getItem('locationCity'); 
        setLocationCity(locationCityData);
      }
      if(sessionStorage.getItem('locationStateOrProvince'))
      {
        var locationStateOrProvinceData = sessionStorage.getItem('locationStateOrProvince'); 
        setLocationStateOrProvince(locationStateOrProvinceData);
      }
      if(sessionStorage.getItem('locationCountry'))
      {
        var locationCountryData = sessionStorage.getItem('locationCountry'); 
        setLocationCountry(locationCountryData);
      }
      if(sessionStorage.getItem('locationPostalCode'))
      {
        var locationPostalCodeData = sessionStorage.getItem('locationPostalCode'); 
        setLocationPostalCode(locationPostalCodeData);
      }
      if(sessionStorage.getItem('locationEmail'))
      {
        var locationEmailData = sessionStorage.getItem('locationEmail'); 
        setLocationEmail(locationEmailData);
      }
      if(sessionStorage.getItem('locationTel'))
      {
        var locationTelData = sessionStorage.getItem('locationTel'); 
        setLocationTel(locationTelData);
      }
      if(sessionStorage.getItem('liffId'))
      {
          
        var liffIdData = sessionStorage.getItem('liffId'); 
        setLiffId(liffIdData);
      }
      if(sessionStorage.getItem('linePOSId'))
      {
        var linePOSIdData = sessionStorage.getItem('linePOSId'); 
        setLinePOSId(linePOSIdData);
      }
      if(sessionStorage.getItem('lineUserId'))
      {
        var lineUserIdData = sessionStorage.getItem('lineUserId'); 
        setLineUserId(lineUserIdData);
      }
      if(sessionStorage.getItem('locationId'))
      {
        var locationIdData = sessionStorage.getItem('locationId'); 
        setLocationId(locationIdData);
      }
      if(sessionStorage.getItem('groupId'))
      {
        var groupIdData = sessionStorage.getItem('groupId'); 
        setGroupId(groupIdData);
      }
      
      var customerEmailData = '';
      if(sessionStorage.getItem('customerEmail'))
      {
        customerEmailData = sessionStorage.getItem('customerEmail'); 
        
      }
      //alert('Login 1');
      if(Cookies.get('userInfo'))
      {
        Cookies.remove('userInfo');
      } 
      //alert('Login 2');
      var userLocalJson = localStorage.getItem('userInfo');
      Cookies.set('userInfo', userLocalJson);
      //alert('userLocalJson = ' + userLocalJson);
      var userLocal = JSON.parse(userLocalJson)
      try
      {
        //alert('Login 3');
        const expiredDate = await UserServices.fetchCoinposCheckExpired(
          {
            email:customerEmailData,//userLocal.email,
            companyId:companyId
          });
          
        if(expiredDate === false)
        {
          //alert('Login 4');
          dispatch({ type: 'USER_LOGIN', payload: userLocal });


          sessionStorage.setItem('customerFirstName', userLocal.firstName);
          sessionStorage.setItem('customerLastName', userLocal.lastName);
          sessionStorage.setItem('customerEmail', userLocal.email);
          sessionStorage.setItem('customerPhoneNumber', userLocal.phone);

          sessionStorage.setItem('address1', userLocal.address1);
          sessionStorage.setItem('countryId', userLocal.countryId);
          sessionStorage.setItem('provinceId', userLocal.provinceId);
          sessionStorage.setItem('cityId', userLocal.cityId);
          sessionStorage.setItem('districtId', userLocal.districtId);
          sessionStorage.setItem('postalcode', userLocal.postalcode);

          sessionStorage.setItem('countrys', JSON.stringify(userLocal.countrys));
          sessionStorage.setItem('provinces', JSON.stringify(userLocal.provinces));
          sessionStorage.setItem('cities', JSON.stringify(userLocal.cities));
          sessionStorage.setItem('districts', JSON.stringify(userLocal.districts));

          

        }
        else
        {
          //alert('Login 5');
          //alert('Logout');
          dispatch({ type: 'USER_LOGOUT' });
          Cookies.remove('userInfo');
          Cookies.remove('couponInfo');
        }

        var payOrderData = await ProductServices.fetchGetPayOrderById(
          {
            orderId,
            companyId,
            locationId,
            linePOSId,
            lineUserId,
            groupId,
            liffId,
            pictureUrl,
            catalogName
      
          });
          if(payOrderData !== undefined)
          {
            //alert("data = " + JSON.stringify(data));
            setPayOrder(payOrderData);
            setPaymentStatusId(payOrderData.paymentStatusId);
            setOrderStatusId(payOrderData.orderStatusId);
            setcurrencySign(payOrderData.currencySign);

            paymentContentManager();
          }
          
  
        
      }
      catch(e)
      {
        alert("error = " + e.message);
      }
      /*if (!userInfo) {
        router.push('/');
      }*/

      setLoading(false);
      
    }, []);
  
     
    /*const [data, setOrder] = useState();
    const [loading, setLoading] = useState(true);
    var paymentStatusIdData = 1;
    var orderStatusIdData = 1;
    var currencySignData = '';
  useEffect(() => {
    if (!userInfo) {
      router.push('/');
    }

    if (Cookies.get('orderInfo')) {
      alert(Cookies.get('orderInfo'));
      const order = JSON.parse(Cookies.get('orderInfo'));
      
      currencySignData = order.currencySign;
      paymentStatusIdData = order.paymentStatusId;
      orderStatusIdData = order.orderStatusId;
      setOrder(order);
      setLoading(false);
    }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);*/

  var paymentStatusIdData = 1;
  var orderStatusIdData = 1;
  var currencySignData = '';
  const [paymentStatusId, setPaymentStatusId] = useState(paymentStatusIdData);
  const [currencySign, setcurrencySign] = useState(currencySignData);
  const [orderStatusId, setOrderStatusId] = useState(orderStatusIdData);

  //alert(JSON.stringify(data));
  /*if(loading)
  {
    data = JSON.parse(dataJson);
  }*/
  useEffect(() => 
  {
    let dbCon = getDatabase(app);
    let dbRef = ref(dbCon,'UAT/2/PromptPay/Payment/2');

      onChildAdded(dbRef,(snapshot) => {
        const orderNumber = snapshot.val();
        
        if(orderNumber === data.orderNumber)
        {
          //alert(orderNumber);
          setPaymentStatusId(2);//paid
          paymentContentManager();
          //this.setState({paymentStatusId:2,paymentStatus:"Paid"})
              /*this.render();*/
        }
            //var obj = JSON.parse(data)
            //alert(data);
      });

  });
  

    
  
    
  
  return (
    <Layout title="Invoice" description="order confirmation page" dataPath={dataPath} companyName={companyName} locationName={locationName} companyLogo={companyLogo}
      locationAddress1={locationAddress1} locationAddress2={locationAddress2} locationCity={locationCity}
      locationStateOrProvince={locationStateOrProvince} locationCountry={locationCountry} locationPostalCode={locationPostalCode}
      locationEmail={locationEmail} locationTel={locationTel} page='order'>
      {loading ? (
        <Loading loading={loading} />
      ) : (
        <div className="max-w-screen-2xl mx-auto py-10 px-3 sm:px-6">
          <div className="bg-cyan-100 rounded-md mb-5 px-4 py-3">
            <label>
              ขอบคุณที่ใช้บริการ{' '} 
              {/* <span className="font-bold text-cyan-600">{data.name},</span>{' '} */}
              <span className="font-bold text-cyan-600">{data.customerName},</span>{' '}
              
              เราได้รับคำสั่งซื้อของคุณแล้ว !

              
            </label>
          </div>
          <div className="bg-white rounded-lg shadow-sm">
            {
              data.paymentStatusId === 1
              ?
              <>
                <Invoice data={data} printRef={printRef} companyName={companyName} locationAddress1={locationAddress1} locationAddress2={locationAddress2} locationCity={locationCity}
                  locationStateOrProvince={locationStateOrProvince} locationCountry={locationCountry} locationPostalCode={locationPostalCode}
                  locationName={locationName} currencySign={data.currencySign} dataPath={dataPath}/>
                        <div className="bg-white p-8 rounded-b-xl">
                          <div className="flex lg:flex-row md:flex-row sm:flex-row flex-col justify-between">
                            {/* <p>{JSON.stringify(data)}</p>
                            <p>{data.orderNumber}</p> */}
                            <PDFDownloadLink
                              document={<InvoiceForDownload data={data} currencySign={data.currencySign} locationAddress1={locationAddress1} locationAddress2={locationAddress2} locationCity={locationCity}
                              locationStateOrProvince={locationStateOrProvince} locationCountry={locationCountry} locationPostalCode={locationPostalCode}
                              locationName={locationName} companyName={companyName}/>}
                              fileName="Invoice"
                            >
                              {({ blob, url, loading, error }) =>
                                loading ? (
                                  'Loading...'
                                ) : (
                                  <button className="mb-3 sm:mb-0 md:mb-0 lg:mb-0 flex items-center justify-center bg-cyan-500 hover:bg-cyan-600 text-white transition-all font-serif text-sm font-semibold h-10 py-2 px-5 rounded-md">
                                    Download Invoice{' '}
                                    <span className="ml-2 text-base">
                                      <IoCloudDownloadOutline />
                                    </span>
                                  </button>
                                )
                              }
                            </PDFDownloadLink>

                            <ReactToPrint
                              trigger={() => (
                                <button className="mb-3 sm:mb-0 md:mb-0 lg:mb-0 flex items-center justify-center bg-cyan-500 hover:bg-cyan-600 text-white transition-all font-serif text-sm font-semibold h-10 py-2 px-5 rounded-md">
                                  Print Invoice{' '}
                                  <span className="ml-2">
                                    <IoPrintOutline />
                                  </span>
                                </button>
                              )}
                              content={() => printRef.current}
                              documentTitle="Invoice"
                            />
                            
                          </div>
                        </div>
              </>

              :
              <>
                <Receipt data={data} printRef={printRef} companyName={companyName} locationAddress1={locationAddress1} locationAddress2={locationAddress2} locationCity={locationCity}
                  locationStateOrProvince={locationStateOrProvince} locationCountry={locationCountry} locationPostalCode={locationPostalCode}
                  locationName={locationName} currencySign={data.currencySign} dataPath={dataPath}/>
                        <div className="bg-white p-8 rounded-b-xl">
                          <div className="flex lg:flex-row md:flex-row sm:flex-row flex-col justify-between">
                            {/* <p>{JSON.stringify(data)}</p>
                            <p>{data.orderNumber}</p> */}
                            <PDFDownloadLink
                              document={<ReceiptForDownload data={data} currencySign={data.currencySign} locationAddress1={locationAddress1} locationAddress2={locationAddress2} locationCity={locationCity}
                              locationStateOrProvince={locationStateOrProvince} locationCountry={locationCountry} locationPostalCode={locationPostalCode}
                              locationName={locationName} companyName={companyName}/>}
                              fileName="Receipt"
                            >
                              {({ blob, url, loading, error }) =>
                                loading ? (
                                  'Loading...'
                                ) : (
                                  <button className="mb-3 sm:mb-0 md:mb-0 lg:mb-0 flex items-center justify-center bg-cyan-500 hover:bg-cyan-600 text-white transition-all font-serif text-sm font-semibold h-10 py-2 px-5 rounded-md">
                                    Download Receipt{' '}
                                    <span className="ml-2 text-base">
                                      <IoCloudDownloadOutline />
                                    </span>
                                  </button>
                                )
                              }
                            </PDFDownloadLink>

                            <ReactToPrint
                              trigger={() => (
                                <button className="mb-3 sm:mb-0 md:mb-0 lg:mb-0 flex items-center justify-center bg-cyan-500 hover:bg-cyan-600 text-white transition-all font-serif text-sm font-semibold h-10 py-2 px-5 rounded-md">
                                  Print Receipt{' '}
                                  <span className="ml-2">
                                    <IoPrintOutline />
                                  </span>
                                </button>
                              )}
                              content={() => printRef.current}
                              documentTitle="Invoice"
                            />
                            
                          </div>
                        </div>
              
              </>

            }
            
            
            {
              data.paymentStatusId === 1 //UnPaid
              ?
                <PaymentMethod salesOrderId={orderId} lineLiffId={liffId} lineLiffUserId={lineUserId} lineCompanyId={companyId} />
              :
              <div id="downloadApp" className="bg-indigo-50 py-10 lg:py-16 bg-repeat bg-center overflow-hidden">
                <div className="max-w-screen-2xl mx-auto px-4 sm:px-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-2 md:gap-3 lg:gap-3 items-center">
                    <div className="flex-grow hidden lg:flex md:flex md:justify-items-center lg:justify-start">
                      {/* <Image
                        src="/app-download-img-left.png"
                        alt="app download"
                        width={500}
                        height={394}
                        className="block w-auto"
                      /> */}
                    </div>
                    <div className="text-center">
                      {paymentContent}
                      
                              
                      
                    </div>
                    <div className="md:hidden lg:block">
                      <div className="flex-grow hidden lg:flex md:flex lg:justify-end">
                        {/* <Image
                          src="/app-download-img.png"
                          width={500}
                          height={394}
                          alt="app download"
                          className="block w-auto"
                        /> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
                
                
            }
            
          </div>
        </div>
      )}
    </Layout>
  );
};

export const getServerSideProps = ({ params }) => {
  return {
    props: { params },
  };
};

export default dynamic(() => Promise.resolve(Order), { ssr: false });
