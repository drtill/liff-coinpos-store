import Cookies from 'js-cookie';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { IoLockOpenOutline } from 'react-icons/io5';
import { FiCheck, FiRefreshCw, FiShoppingCart, FiTruck } from 'react-icons/fi';

//internal import
import Layout from '@layout/Layout';
import useAsync from '@hooks/useAsync';
import useFilter from '@hooks/useFilter';
import { userSidebar } from '@utils/data';
import Card from '@component/order-card/Card';
import { UserContext } from '@context/UserContext';
import OrderServices from '@services/OrderServices';
import UserServices from '@services/UserServices';
import ProductServices from '@services/ProductServices';
import RecentOrder from '@pages/user/recent-order';

const Dashboard = ({ title, description, children}) => {
  const router = useRouter();
  const {
    dispatch,
    state: { userInfo },
  } = useContext(UserContext);

  
  const [customerId, setCustomerId] = useState(0);
  const [companyId, setCompanyId] = useState(0);
  const [locationId, setLocationId] = useState(0);
  const [linePOSId, setLinePOSId] = useState('');
  const [lineUserId, setLineUserId] = useState('');
  const [groupId, setGroupId] = useState('');
  const [liffId, setLiffId] = useState('');
  const [pictureUrl, setPictureUrl] = useState('');

  const [dataPath, setDataPath] = useState('');

  const [customerEmail, setCustomerEmail] = useState('');
  
  const [catalogName,setCatalogName] = useState('');
  const [companyCode,setCompanyCode] = useState('');
  const [companyLogo,setCompanyLogo] = useState('');
  const [companyName,setCompanyName] = useState('');
  const [locationName,setLocationName] = useState('');

  const [locationAddress1,setLocationAddress1] = useState('');
  const [locationAddress2,setLocationAddress2] = useState('');
  const [locationCity,setLocationCity] = useState('');
  const [locationStateOrProvince,setLocationStateOrProvince] = useState('');
  const [locationCountry,setLocationCountry] = useState('');
  const [locationPostalCode,setLocationPostalCode] = useState('');
  const [locationEmail,setLocationEmail] = useState('');
  const [locationTel,setLocationTel] = useState('');
  
  //const [data, setData] = useState({});

  //const [allOrderCount, setAllOrderCount] = useState(0);
  //const [pendingOrderCount, setPendingOrderCount] = useState(0);
  //const [processingOrderCount, setProcessingOrderCount] = useState(0);
  //const [deliveredOrderCount, setDeliveredOrderCount] = useState(0);

  
  var companyCodeCatalog = '';
  if(sessionStorage.getItem('companyCode'))
  {
    companyCodeCatalog = sessionStorage.getItem('companyCode'); 
  }
  var catalogNameCatalog = '';
  if(sessionStorage.getItem('catalogName'))
  {
    catalogNameCatalog = sessionStorage.getItem('catalogName'); 
  }
  var customerEmailCatalog = '';
  if(sessionStorage.getItem('customerEmail'))
  {
    customerEmailCatalog = sessionStorage.getItem('customerEmail'); 
  }
  
  const { data } = useAsync(() => ProductServices.fetchGetDashboardOrderByUserId(
    {
      companyId,
      liffId,
      lineUserId,
      linePOSId,
      catalogName:catalogNameCatalog,
      companyCode:companyCodeCatalog,
      email:customerEmailCatalog
    }));
  //useAsync(OrderServices.getOrderByUser);
  
  const { allOrderCount, pendingOrderCount, processingOrderCount, deliveredOrderCount } = useFilter(data);





  
  const handleLogOut = async () => {
    dispatch({ type: 'USER_LOGOUT' });
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
    if(!liffData)
    {
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
  };

  useEffect(async() => {
    //alert('Login 0');
    if(sessionStorage.getItem('dataPath'))
    {
      var dataPathData = sessionStorage.getItem('dataPath'); 
      //alert('dataPathData = ' + dataPathData)
      setDataPath(dataPathData);  
    }
    if(sessionStorage.getItem('customerEmail'))
    {
      
      var customerEmailData = sessionStorage.getItem('customerEmail'); 
      setCustomerEmail(customerEmailData);  
    }

    
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
    if(sessionStorage.getItem('companyCode'))
    {
      var companyCodeData = sessionStorage.getItem('companyCode'); 
      //alert('companyCodeData = ' + companyCodeData);
      setCompanyCode(companyCodeData);
            
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

      if(sessionStorage.getItem('customerId'))
      {
        var customerIdData = sessionStorage.getItem('customerId'); 
        setCustomerId(customerIdData);
              
      }

    //alert('Login 1');
    if(Cookies.get('userInfo'))
      {
        Cookies.remove('userInfo');
      } 
      //alert('Login 2');
      var userLocalJson = localStorage.getItem('userInfo');
      Cookies.set('userInfo', userLocalJson);
      var userLocal = JSON.parse(userLocalJson)
      try
      {
        //alert('Login 3');
        const expiredDate = await UserServices.fetchCoinposCheckExpired(
          {
            email:userLocal.email,
            companyId:companyId
          });
        //alert('expiredDate = ' + expiredDate)
        if(expiredDate === 'false')
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

          //alert('countrys = ' + JSON.stringify(userLocal.countrys));
          sessionStorage.setItem('countrys', JSON.stringify(userLocal.countrys));
          sessionStorage.setItem('provinces', JSON.stringify(userLocal.provinces));
          sessionStorage.setItem('cities', JSON.stringify(userLocal.cities));
          sessionStorage.setItem('districts', JSON.stringify(userLocal.districts));
        }
        else
        {
          //alert('Login 5');
          //alert('Logout 5');
          dispatch({ type: 'USER_LOGOUT' });
          Cookies.remove('userInfo');
          Cookies.remove('couponInfo');
        }

  
        
      }
      catch(e)
      {
        alert("error = " + e.message);
      }
    /*if (!userInfo) {
      router.push('/');
      
    }*/
    /*var dashBoardData = ProductServices.fetchGetDashboardOrderByUserId(
      {
        companyId,
        liffId,
        lineUserId,
        linePOSId,
        catalogName:catalogName,
        companyCode:companyCode,
        email:customerEmail
      });
      setData(dashBoardData);*/

      
      //alert("allOrderCount, pendingOrderCount, processingOrderCount, deliveredOrderCount = " + allOrderCountData + ',' + pendingOrderCountData + ',' + processingOrderCountData + ',' + deliveredOrderCountData)
      //setAllOrderCount(allOrderCountData);
      //setPendingOrderCount(pendingOrderCountData);
      //setProcessingOrderCount(processingOrderCountData);
      //setDeliveredOrderCount(deliveredOrderCountData);

  }, []);

  return (
    <Layout
      title={title ? title : 'Dashboard'}
      description={description ? description : 'This is User Dashboard' 
      }
      dataPath={dataPath}
      companyName={companyName} locationName={locationName} companyLogo={companyLogo}  
      locationAddress1={locationAddress1} locationAddress2={locationAddress2} locationCity={locationCity}
      locationStateOrProvince={locationStateOrProvince} locationCountry={locationCountry} locationPostalCode={locationPostalCode}
      locationEmail={locationEmail} locationTel={locationTel} page='dashboard'
    >
      <div className="mx-auto max-w-screen-2xl px-3 sm:px-10">
        <div className="py-10 lg:py-12 flex flex-col lg:flex-row w-full">
          <div className="flex-shrink-0 w-full lg:w-80 mr-7 lg:mr-10  xl:mr-10 ">
            <div className="bg-white p-4 sm:p-5 lg:p-8 rounded-md sticky top-32">
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
          <div className="w-full bg-white mt-4 lg:mt-0 p-4 sm:p-5 lg:p-8 rounded-md overflow-hidden">
            {!children && (
              <div className="overflow-hidden">
                <h2 className="text-xl font-serif font-semibold mb-5">
                  แดชบอร์ด
                </h2>
                <div className="grid gap-4 mb-8 md:grid-cols-2 xl:grid-cols-4">
                  <Card
                    title="ใบสั่งขาย รวม"
                    Icon={FiShoppingCart}
                    quantity={allOrderCount}//{data?.orders?.length}
                    className="text-red-600  bg-red-200"
                  />
                  <Card
                    title="ใบสั่งขาย รอดำเนินการ"
                    Icon={FiRefreshCw}
                    quantity={pendingOrderCount}//{pending.length}
                    className="text-orange-600 bg-orange-200"
                  />
                  <Card
                    title="ใบสั่งขาย กำลังดำเนินการ"
                    Icon={FiTruck}
                    quantity={processingOrderCount}//{processing.length}
                    className="text-indigo-600 bg-indigo-200"
                  />
                  <Card
                    title="ใบสั่งขาย เสร้จสิ้นแล้ว"
                    Icon={FiCheck}
                    quantity={deliveredOrderCount}//{delivered.length}
                    className="text-emerald-600 bg-emerald-200"
                  />
                </div>
                <RecentOrder />
              </div>
            )}
            {children}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(Dashboard), { ssr: false });
