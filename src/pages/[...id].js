import { useContext,useEffect, useState } from 'react';
import { useCart} from 'react-use-cart';
import { useRouter } from 'next/router'

import Cookies from 'js-cookie';

import UserServices from '@services/UserServices';
import OrderServices from '@services/OrderServices';

import Link from 'next/link';
import Image from 'next/image';

import Layout from '@layout/Layout';
import Banner from '@component/banner/Banner';
import CardTwo from '@component/cta-card/CardTwo';
import OfferCard from '@component/offer/OfferCard';
import StickyCart from '@component/cart/StickyCart';
import ProductServices from '@services/ProductServices';
import ProductCard from '@component/product/ProductCard';
import MainCarousel from '@component/carousel/MainCarousel';
import FeatureCategory from '@component/category/FeatureCategory';

import useCheckoutSubmit from '@hooks/useCheckoutSubmit';
import { UserContext } from '@context/UserContext';

import Loading from '@component/preloader/Loading';

import useLoginSubmit from '@hooks/useLoginSubmit';
import NewOrderModal from '@component/modal/NewOrderModal';

import { notifyError, notifySuccess } from '@utils/toast';

const isLiffLogin = true;//process.env.NEXT_PUBLIC_ISLOGIN
var itemPerPage = 30;

const Details = ({params,targetPage,dataPath,title,description, liffEndpoint,liffData,linePOSIdData,companyCode,catalogName,coinPOSLiffData,
    groupIdData, liffOrderId, liffCompanyId,liffLocationId,countPage,currentPage,
    products,salesOrder, orderDetails,categories,shippingServices,bankNameAndAccounts,
    currencySign, companyName, locationName,companyLogo,catalogLiffId,
    customerFirstName,customerLastName,customerEmail, customerPhoneNumber,
    address1,countryId,provinceId,cityId,districtId,postalcode,
    countrys,provinces,cities,districts,
    promotions,
    locationAddress1,locationAddress2,locationCity,locationStateOrProvince,locationCountry,locationPostalCode,
    locationEmail,locationTel,
    companyFacebook,companyLine
    }) => {
        const {
            couponInfo,
            couponRef,
            setCouponData,
            clearCouponData,
            discountAmount,
            
          } = useCheckoutSubmit();
      
          const router = useRouter();
      
          const [liffId, setLiffId] = useState(liffData);
          const [linePOSId, setLinePOSId] = useState(linePOSIdData);
          const [groupId, setGroupId] = useState(groupIdData);
          const [companyId, setCompanyId] = useState(liffCompanyId);
          const [locationId, setLocationId] = useState(liffLocationId);
          const [orderId, setOrderId] = useState(liffOrderId);
      
          const [loading, setLoading] = useState(true);
      
          const [categoryLoading, setCategoryLoading] = useState(true);
          const [newProductLoading, setNewProductLoading] = useState(true);
      
          const [promotionLoading, setPromotionLoading] = useState(false);
          const [newOrderLoading, setNewOrderLoading] = useState(false);
          const [recommentProductLoading, setRecommentProductLoading] = useState(true);
          const [sliderImageLoading, setSliderImageLoading] = useState(true);
      
          const [sliderImageList, setSliderImageList] = useState([]);
          //this.setState({liffId:liffData});
          const [productList, setProductList] = useState([]);
          const [newProductList, setNewProductList] = useState([]);
          const [recommentProductList, setRecommentProductList] = useState([]);
          const [categoryList, setCategoryList] = useState([]);
          const [lineProfileImage, setProfileImage] = useState('');
          const [lineUserId, setLineUserId] = useState('');
          const [lineUsername, setLineUsername] = useState('');
          const [pagingIndent, setPaging] = useState([]);
          const [companyNameData, setCompanyName] = useState(companyName);
      
          const [companyFacebookData, setCompanyFacebook] = useState(companyFacebook);
          const [companyLineData, setCompanyLine] = useState(companyLine);
      
          const [locationNameData, setLocationName] = useState(locationName);
          const [locationAddress1Data, setLocationAddress1] = useState(locationAddress1);
          const [locationAddress2Data, setLocationAddress2] = useState(locationAddress2);
          const [locationCityData, setLocationCity] = useState(locationCity);
          const [locationStateOrProvinceData, setLocationStateOrProvince] = useState(locationStateOrProvince);
          const [locationCountryData, setLocationCountry] = useState(locationCountry);
          const [locationPostalCodeData, setLocationPostalCode] = useState(locationPostalCode);
          const [locationEmailData, setLocationEmail] = useState(locationEmail);
          const [locationTelData, setLocationTel] = useState(locationTel);
      
          const [discountDataDetails,setDiscountDetail] = useState('');
          const [promotionCode,setPromotionCode] = useState('');

          const [categotyJson,setCategotyJson] = useState('');


          const [catalogPromotionId,setCatalogPromotionId] = useState(0);
          const [catalogPromotionName,setCatalogPromotionName] = useState('');
          const [catalogDiscountPercentage,setCatalogDiscountPercentage] = useState(0);
          const [catalogPromotionIsAllProduct,setCatalogPromotionIsAllProduct] = useState(false);
          const [catalogMinimumAmount,setCatalogMinimumAmount] = useState(0);
          const [catalogProductType,setCatalogProductType] = useState('');

          const [newOrderModalOpen, setNewOrderModalOpen] = useState(false);

          const [productListHeader, setProductListHeader] = useState('สินค้าทั้งหมด สำหรับการช็อปปิ้งของคุณ');
      
          const { setItems,clearCartMetadata,emptyCart, addItem, items } = useCart();
          const {dispatch} = useContext(UserContext);
      
          const { handleSubmit, submitHandler,lineSignInManager, register, errors } =
          useLoginSubmit();
          
          useEffect(async () => {
            
            //alert('liffCompanyId = ' + liffCompanyId + " companyCode = " + companyCode);
            if(liffCompanyId === 0)
            {
                  //alert("Liff Data is not found.");
              router.push('/404');
              return;
            }
            var userLocalJson = undefined;
            //var getPromotionCode = localStorage.getItem('promotionCode')
      
            //alert("coinPOSLiffData = " + coinPOSLiffData);
            //alert('Set dataPath = ' + dataPath)
            setPromotionLoading(true);
      
      
            //alert("companyCode = " + companyCode + " catalogName = " + catalogName + " catalogLiffId = " + catalogLiffId);
            sessionStorage.setItem('fromPage','liff');
            
            //alert('JSON.stringify(promotions) = ' + JSON.stringify(promotions))
            sessionStorage.setItem('promotions',JSON.stringify(promotions));
            sessionStorage.setItem('dataPath',dataPath);
            sessionStorage.setItem('catalogName',catalogName);
            sessionStorage.setItem('companyCode',companyCode);
            sessionStorage.setItem('companyLogo',companyLogo);
            sessionStorage.setItem('companyName',companyNameData);
      
            sessionStorage.setItem('companyFacebook',companyFacebookData);
            sessionStorage.setItem('companyLine',companyLineData);
      
      
            sessionStorage.setItem('locationName',locationNameData);
            sessionStorage.setItem('locationAddress1',locationAddress1Data);
            sessionStorage.setItem('locationAddress2',locationAddress2Data);
            sessionStorage.setItem('locationCity',locationCityData);
            sessionStorage.setItem('locationStateOrProvince',locationStateOrProvinceData);
            sessionStorage.setItem('locationCountry',locationCountryData);
            sessionStorage.setItem('locationPostalCode',locationPostalCodeData);
            sessionStorage.setItem('locationEmail',locationEmailData);
            sessionStorage.setItem('locationTel',locationTelData);
      
      
      
      
            sessionStorage.setItem('title', title);
            sessionStorage.setItem('description', description);
      
      
            sessionStorage.setItem('shippings', JSON.stringify(shippingServices));
            sessionStorage.setItem('bankNameAndAccounts', JSON.stringify(bankNameAndAccounts));
            sessionStorage.setItem('categories', JSON.stringify(categories));

            setCategotyJson(JSON.stringify(categories));

            sessionStorage.setItem('currencySign', currencySign);
            sessionStorage.setItem('linePOSId', linePOSIdData);
            sessionStorage.setItem('liffId', liffData);
            
            sessionStorage.setItem('groupId', groupIdData);
            sessionStorage.setItem('companyId', liffCompanyId);
            sessionStorage.setItem('locationId', liffLocationId);
            sessionStorage.setItem('orderId', liffOrderId);

            sessionStorage.setItem('catalogLiffId',catalogLiffId);
      
            //alert('customerFirstName = ' + customerFirstName)
            sessionStorage.setItem('customerFirstName', customerFirstName);
            sessionStorage.setItem('customerLastName', customerLastName);
            sessionStorage.setItem('customerEmail', customerEmail);
            sessionStorage.setItem('customerPhoneNumber', customerPhoneNumber);
      
            sessionStorage.setItem('address1', address1);
            sessionStorage.setItem('countryId', countryId);
            sessionStorage.setItem('provinceId', provinceId);
            sessionStorage.setItem('cityId', cityId);
            sessionStorage.setItem('districtId', districtId);
            sessionStorage.setItem('postalcode', postalcode);
      
            //alert(JSON.stringify(countrys))
            sessionStorage.setItem('countrys', 'JSON.stringify(countrys)');
            sessionStorage.setItem('countrysJSON', JSON.stringify(countrys));
            sessionStorage.setItem('provinces', JSON.stringify(provinces));
            sessionStorage.setItem('cities', JSON.stringify(cities));
            sessionStorage.setItem('districts', JSON.stringify(districts));
      
      
            var isGetProfile = false;
            var lineLiffUserId = '';
            if(coinPOSLiffData.includes('liffId'))
            {
              if(isLiffLogin === true)
              {
                //alert('liffData = ' + coinPOSLiffData)
                if(liffData.length === 0 && !companyCode)
                {
                  //alert("Liff Data is not found.");
                  router.push('/404');
                }
                const liff = (await import('@line/liff')).default
                try {
                  await liff.init({ liffId:liffData });
                } catch (error) {
                  //alert('liff init error' + error.message)
                }
                if (!liff.isLoggedIn()) 
                {
                  //alert("Will Login")
                  //alert("Logined")
                  //liffId=1656555843-E6WV7arj
                  if(companyCode)
                  {
                    var url = liffEndpoint + '/liffId=' + liffData + '?companycode=' + companyCode + '&catalog=' + catalogName;
                    //var url = liffEndpoint + '/liffId=1656555843-E6WV7arj?linePOSId=U5bcb2afaf17c20551ab5afdcfec5c1d3&groupId=C2930285a261eeeb4b095a3219a32a7b7&orderId=4938&companyId=2&locationId=2&process=product'
                    //alert(url);
                    liff.login({ redirectUri: url});
                  }
                  else
                  {
                    var url = liffEndpoint + '/liffId=' + liffData + '?linePOSId=' + linePOSId + "&groupId=" + groupId + '&orderId=' + liffOrderId + '&companyId=' + liffCompanyId + '&locationId=' + liffLocationId;
                    //var url = liffEndpoint + '/liffId=1656555843-E6WV7arj?linePOSId=U5bcb2afaf17c20551ab5afdcfec5c1d3&groupId=C2930285a261eeeb4b095a3219a32a7b7&orderId=4938&companyId=2&locationId=2&process=product'
                    //alert(url);
                    liff.login({ redirectUri: url});
                  }
                  
                }
                else
                {
                  //alert("Logined")
                  let getProfile = await liff.getProfile();
                  isGetProfile = true;
        
                  //alert("GetProfile")
                  lineUsername = getProfile.displayName;
                  
                  
                  lineLiffUserId = getProfile.userId;
                  
                  lineProfileImage = getProfile.pictureUrl;
                  const email = liff.getDecodedIDToken().email;
                  //alert("GetEmail = " + JSON.stringify(email));
                  //alert("GetProfile = " + lineUsername + " " + lineLiffUserId + " " + lineProfileImage)
                  setLineUsername(lineUsername);
                  setLineUserId(lineLiffUserId);
                  setProfileImage(lineProfileImage);
        
                  sessionStorage.setItem('lineUsername', lineUsername);
                  sessionStorage.setItem('lineUserId', lineLiffUserId);
                  sessionStorage.setItem('lineProfileImage', lineProfileImage);
        
                  var dataUser = {};
                  dataUser['image'] = lineProfileImage;
                  dataUser['name'] = lineUsername;
                  dataUser['email'] = email;
                  //dataUser['liffId'] = liffData;
                  //dataUser['lineUserId'] = lineLiffUserId;
                  //dataUser['linePOSId'] = linePOSIdData;



        
                  //orderData['_id']
                  //Cookies.set('lineUserName', lineUsername);
                  Cookies.set('userInfo', JSON.stringify(dataUser));
                  sessionStorage.setItem('userInfo', JSON.stringify(dataUser));
                  localStorage.setItem('userInfo', JSON.stringify(dataUser));
                  dispatch({ type: 'USER_LOGIN', payload: dataUser });

                  userLocalJson = localStorage.getItem('userInfo');
                  //Cookies.set('lineUserId', lineUserId);
                  //Cookies.set('lineProfileImage', lineProfileImage);
                  var data = {};
        
                  var liffId = liffData;
                  var lineUserId = lineLiffUserId;
                  var linePOSId = linePOSIdData;

                  //alert('liffId = ' + liffId + ' lineUserId = ' + lineUserId);
                  if(liffId.length > 0 &&  lineUserId.length > 0)
                  {
                    data["liffId"] = liffId;
                    data["lineUserId"] = lineUserId;
                    data["linePOSId"] = linePOSId;
                    data["email"] = email;
                    data["image"] = lineProfileImage;
                    var companyId = Number(liffCompanyId);
                    var paramPath = dataPath;
                  
                    data["companyId"] = companyId;
                    data["paramPath"] = paramPath;
        
                  
                    //alert('Company code = ' + companyCode);
                    //alert('...Id submit')
                    submitHandler(data)
          
                  }
                }
              }
              else
              {
                //alert("None")
                //Cookies.set('lineUserName', "drtill007");
                //Cookies.set('lineUserId', "Ucc91941c54b99372c3c37dbfce7e3a51");
                //Cookies.set('lineProfileImage', "https://profile.line-scdn.net/0hijMbw1BrNkVwGx1VWnFJEkxeOCgHNTANCC97Il1OPHVYLXZGG3V_dlBObXQJLnERGXx4J1wYOnZZ");
              }
            }
            
        

            //alert("Liff Init = " + lineUserId);
            //alert("companyCode = " + companyCode + " catalogName = " + catalogName + " liffData = " + liffData);
            if(liffData)
            {
              
              //alert('To company and Liff')
              
                router.push('/' + companyCode + '/liffId=' + liffData + '?linePOSId=' + linePOSId + "&groupId=" + groupId + '&orderId=' + liffOrderId + '&companyId=' + liffCompanyId + '&locationId=' + liffLocationId);
                return;
              /*var userLocalJson = localStorage.getItem('userInfo');
                  if(userLocalJson === null)
                  {
                    dispatch({ type: 'USER_LOGOUT' });
                    Cookies.remove('userInfo');
                    Cookies.remove('couponInfo');
                  }
                  else
                  {
                    GetCoinPOSOrder(liffId,lineUserId,linePOSId,groupId,liffOrderId,liffCompanyId,liffLocationId,targetPage, userLocalJson)
                    Cookies.set('userInfo', userLocalJson);

                    var userLocal = JSON.parse(userLocalJson)

                    dispatch({ type: 'USER_LOGIN', payload: userLocal });

                    //alert('userLocal = ' + JSON.stringify(userLocal));

                    sessionStorage.setItem('customerId', userLocal.customerId); 
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

                  var companyId = liffCompanyId;
                  var locationId = liffLocationId;
                  var companyName = '';
                  var locationName = '';
                  
                  if(targetPage.length > 0)
                  {
                    //alert('Go');
                    RedirectPageManager(targetPage,userLocalJson,catalogName);
            
                  }
                  else
                  {
                    await GetProductData('','','','',0,companyId,locationId,companyName,locationName,companyCode,catalogName,0,9,1,itemPerPage,'','','');
                  }

                  
                
                  setPromotionLoading(false);
                  setCategoryLoading(false);
                  setNewProductLoading(false);
                  setLoading(false);*/
            }
            else
            {
              //alert('companyCode = ' + companyCode +  " catalogName = " + catalogName)
              if(companyCode && catalogName)
              {
                //alert('Back To catalog')
                router.push('/' + companyCode + '/' + catalogName);
                return;
              }
              else if(companyCode && !catalogName)
              {
                //alert("Companycode only")
                if(isGetProfile)
                {
                  if(catalogName)
                  {
                    //alert('Back To catalog')
                    router.push('/' + companyCode + '/' + catalogName);
                    return;
                  }
                  else
                  {
                    //alert('Back To default catalog')
                    router.push('/' + companyCode);
                    return;
                  }
                  
                }
                else
                {
                  //alert('Get To Product catalog mode')

                  var userLocalJson = localStorage.getItem('userInfo');
                  if(userLocalJson === null)
                  {
                    dispatch({ type: 'USER_LOGOUT' });
                    Cookies.remove('userInfo');
                    Cookies.remove('couponInfo');
                  }
                  else
                  {
                    Cookies.set('userInfo', userLocalJson);

                    var userLocal = JSON.parse(userLocalJson)

                    dispatch({ type: 'USER_LOGIN', payload: userLocal });

                    //alert('userLocal = ' + JSON.stringify(userLocal));

                    sessionStorage.setItem('customerId', userLocal.customerId); 
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

                  //alert('Redirect or Get Product')
                  var companyId = liffCompanyId;
                  var locationId = liffLocationId;
                  var companyName = '';
                  var locationName = '';
                  
                  if(targetPage.length > 0)
                  {
                    //alert('Redirect')
                    RedirectPageManager(targetPage,userLocalJson,catalogName);
            
                  }
                  else
                  {
                    //alert('Get Product')
                    await GetProductData('','','','',0,companyId,locationId,companyName,locationName,companyCode,catalogName,0,9,1,itemPerPage,'','','');
                  }

                  
                
                  setPromotionLoading(false);
                  setCategoryLoading(false);
                  setNewProductLoading(false);
                  setRecommentProductLoading(false);
                  setSliderImageLoading(false);
                  setLoading(false);
                }
                
              }
              else
              {
                var userLocalJson = localStorage.getItem('userInfo');
                  if(userLocalJson === null)
                  {
                    dispatch({ type: 'USER_LOGOUT' });
                    Cookies.remove('userInfo');
                    Cookies.remove('couponInfo');
                  }
                  else
                  {

                    GetCoinPOSOrder(liffId,lineUserId,linePOSId,groupId,liffOrderId,liffCompanyId,liffLocationId,targetPage,userLocalJson)

                    Cookies.set('userInfo', userLocalJson);

                    var userLocal = JSON.parse(userLocalJson)

                    dispatch({ type: 'USER_LOGIN', payload: userLocal });

                    //alert('userLocal = ' + JSON.stringify(userLocal));

                    sessionStorage.setItem('customerId', userLocal.customerId); 
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
                
                
              }
            }
            

            sessionStorage.setItem('getCompanyData',true)
            
            
      
            
          }, [])
      
          
          const GetCoinPOSOrder = async(liffId,
            lineUserId,
            linePOSId,
            groupId,
            liffOrderId,
            liffCompanyId,
            liffLocationId,targetPage, userLocalJson) =>
          {
              var orderId = liffOrderId;
              var companyId = liffCompanyId;
              var locationId = liffLocationId;
              var companyName = '';
              var locationName = '';
              
              try
              {
                //alert("catalogData = " + catalogData)
                //alert("Get Order");
                const salesOrder = await ProductServices.fetchGetCoinPOSOrder({
                    liffId,
                    lineUserId,
                    linePOSId,
                    groupId,
                    orderId,
                    companyId,locationId,
                    companyName,
                    locationName
                  });
            
                  if(salesOrder.orderStatusId !== 1)
                  {
                    //alert("Goto Order")
                    setNewOrderModalOpen(true);
                    //router.push('/order/' + salesOrder.orderId);
        
                    return ;
                  }
                  
            
                  sessionStorage.setItem('customerTypeId',salesOrder.customerTypeId);
        
                  var salesOrderDetails = salesOrder.orderDetails;
        
                  var promotionCode = salesOrder.promotionCode;
                  
                  const productDs = [];
                  const discountDetails = [];
        
                  
                  if(salesOrderDetails.length > 0)
                  {
                    for(var i = 0;i<salesOrderDetails.length;i++)
                    {
                      var detail = {
                        id: Number(salesOrderDetails[i].productVariantId),
                        slug:salesOrderDetails[i].productId,
                        name: salesOrderDetails[i].upc,
                        title:salesOrderDetails[i].productVariantName,
                        sku: salesOrderDetails[i].sku,
                        quantity:salesOrderDetails[i].quantity,
                        price: salesOrderDetails[i].productVariantPrice,
                        image:salesOrderDetails[i].imageUrl,
                        //key.push(orderDetails[i].upc)
                      }
                      var discountDetail = {
                        id: Number(salesOrderDetails[i].productVariantId),
                        discount:Number(salesOrderDetails[i].discount),
                        discountRate:Number(salesOrderDetails[i].discountRate)
                      }
                      //alert("add");
                      productDs.push(detail);
                      discountDetails.push(discountDetail);
                    }
                  }
                  
                  setItems(productDs);
                  if(promotionCode !== undefined && promotionCode !== null)
                  {
                    sessionStorage.setItem('discountDetails', JSON.stringify(discountDetails));
                    sessionStorage.setItem('promotionCode', promotionCode);
                    SetPromotionData(promotionCode,'',0,discountDetails[0].discountRate, true);
                    setDiscountDetail(JSON.stringify(discountDetails))
                  }
                  
        
                  if(targetPage.length > 0)
                  {
                    //alert('Go');
                    RedirectPageManager(targetPage,userLocalJson,catalogName);
          
                  }
                  else
                  {
                    
                    await GetProductData(liffId,lineUserId,linePOSId,groupId,orderId,companyId,locationId,companyName,locationName,'','',0,salesOrder.customerTypeId,1,itemPerPage,'','','');
                  }
                    
                  //setProductList([]);
                  //alert("Set Product")
                  //pagingManager();
                  //setProductList(products);
        
                  setPromotionLoading(false);
                  setCategoryLoading(false);
                  setNewProductLoading(false);
                  setSliderImageLoading(false);
                  setLoading(false);
        
              }
              catch (err) 
              {
                alert('...Id Error = ' + err.message);
              }
          }
      
          
      const RedirectPageManager = (target,userLocalJson,catalogName) =>
    {
      var userLocal = JSON.parse(userLocalJson)
      var fullTarget = ''
      if(target === 'update-profile' || target === 'dashboard' || target === 'my-orders' || target === 'recent-order')
      {
        fullTarget = '/user/' + target;
        //alert('catalogName = ' + JSON.stringify(userLocal));
        router.push(fullTarget);
      }
      else if(target === 'checkout')
      {
        fullTarget = '/' + target;
        //alert('catalogName = ' + JSON.stringify(userLocal));
        router.push(fullTarget);
      }
      
      //alert('catalogName = ' + catalogName);
      
    }

    const CreateNewOrder = async() =>
    {
      setNewOrderLoading(true);
        
      try
      {
        var userInfoJson = localStorage.getItem('userInfo');
        var userInfo = JSON.parse(userInfoJson);
        var email = userInfo.email;
        var profileImage = userInfo.image;
        const salesOrder = await ProductServices.fetchCreateLiffOrder({
          companyId:liffCompanyId,
          locationId:liffLocationId,
          companyName:companyName,
          locationName:locationName,
          email:email,
          liffId:liffData,
          lineUserId:lineUserId,
          linePOSId:linePOSId,
          groupId:groupId,
          pictureUrl:profileImage
        });

        //alert('salesOrder = ' + salesOrder);
        
        var orderId = salesOrder.orderId;
        var fullTarget = ''
        fullTarget = liffEndpoint + '/liffId=' + liffData + '?linePOSId=' + linePOSId + "&groupId=" + groupId + '&orderId=' + orderId + '&companyId=' + liffCompanyId + '&locationId=' + liffLocationId;
        
        //alert("New Url = " + fullTarget)
        router.push(fullTarget);

        setNewOrderModalOpen(false);
        notifySuccess('Create New Order Success!');

        await GetProductData('','','','',0,liffCompanyId,liffLocationId,companyName,locationName,'','',0,9,1,itemPerPage,'','','');
        
        setPromotionLoading(false);
        setCategoryLoading(false);
        setNewProductLoading(false);
        setLoading(false);
      }
      catch(ex)
      {
        alert("Error: " + ex.message);
      }
      setNewOrderLoading(false);
    }
    const GotoOrder = () =>
    {
      setNewOrderLoading(true);
      try
      {
        var fullTarget = ''
        fullTarget = '/order/' + liffOrderId;
        router.push(fullTarget);
      }
      catch(ex)
      {
        alert("Error: " + ex.message);
      }
      
      setNewOrderLoading(false);
    }
      const GetProductData = async(liffId,
        lineUserId,
        linePOSId,
        groupId,
        orderId,
        companyId,
        locationId,
        companyName,
        locationName,
        companyCode,
        catalogName,
        promotionId,customerTypeId,page,itemPerPage,query,category,product) =>
      {
        //alert('locationId = ' + locationId);
          const products = await ProductServices.fetchGetNewAndRecommentProductService({
            liffId,
            lineUserId,
            linePOSId,
            groupId,
            orderId,
            companyId,
            locationId,
            companyName,
            locationName,
            companyCode,
            catalogName,
            promotionId,customerTypeId,page,itemPerPage,query,category,product
          });
    
          //alert(JSON.stringify(products));
          //alert(JSON.stringify(products.catalogCouponCode));
          if(products.catalogCouponCode !== undefined)
          {
            //alert("Have Promotion")
            setCatalogPromotionId(Number(products.catalogPromotionId));
            setPromotionCode(products.catalogCouponCode);
            setCatalogPromotionName(products.catalogPromotionName);
            setCatalogDiscountPercentage(products.catalogDiscountPercentage)
            setCatalogPromotionIsAllProduct(products.catalogIsAllProduct);
            setCatalogMinimumAmount(products.catalogMinimumAmount);
            setCatalogProductType(products.catalogProductType)
    
            SetPromotionData(products.catalogCouponCode,products.catalogEndTime,products.catalogMinimumAmount,products.catalogDiscountPercentage,true);
          }
          
          sessionStorage.setItem('customerTypeId',products.customerTypeId);
          sessionStorage.setItem('promotionId',products.promotionId);
          
          
    
          currentPage = products.currentPage;
          countPage = products.countPage;
    
          var productVariants = [];//products.productVariantPresenters;
          var productCategories = [];
    
          var newProductVariants = [];
          var recommentProductVariants = [];
    
          var sliderImages = [];

          //alert('slider = ' + products.sliderImages);
          if(products.sliderImages !== undefined)
          {
            for(var i = 0;i < products.sliderImages.length; i++)
            {
              var sliderUrl = {};
              sliderUrl['url'] = products.sliderImages[i];
              sliderImages.push(sliderUrl)
            }
          }
      
          //alert('new Product = ' + products.newProductVariantPresenters);
          if(products.newProductVariantPresenters !== undefined)
          {
            for(var i = 0;i < products.newProductVariantPresenters.length; i++)
            {
              var productItem = {};
              productItem['_id'] = Number(products.newProductVariantPresenters[i].ProductVariantId);
              productItem['title'] = products.newProductVariantPresenters[i].Name;
              productItem['quantity'] = products.newProductVariantPresenters[i].StockLevel;
              productItem['image'] = products.newProductVariantPresenters[i].ImageUrl;
              productItem['unit'] = products.newProductVariantPresenters[i].UPC;
              productItem['slug'] = products.newProductVariantPresenters[i].UPC;
              productItem['upc'] = products.newProductVariantPresenters[i].UPC;
              productItem['productName'] = products.newProductVariantPresenters[i].ProductName;
              productItem['categoryName'] = products.newProductVariantPresenters[i].CategoryName;

              productItem['tag'] = products.newProductVariantPresenters[i].ProductId;
              productItem['originalPrice'] = products.newProductVariantPresenters[i].Price;
              productItem['price'] = products.newProductVariantPresenters[i].Price;
              productItem['type'] = 'W';
              productItem['sku'] = products.newProductVariantPresenters[i].SKU;
              productItem['discount'] = 0;
              productItem['description'] = products.newProductVariantPresenters[i].Description;
              productItem['currencySign'] = products.currencySign;
            
    
    
              newProductVariants.push(productItem);
            }
          }
          //alert('recomment Product = ' + products.recommentProductVariantPresenters);
          if(products.recommentProductVariantPresenters !== undefined)
          {
            for(var i = 0;i < products.recommentProductVariantPresenters.length; i++)
            {
              var productItem = {};
              productItem['_id'] = Number(products.recommentProductVariantPresenters[i].ProductVariantId);
              productItem['title'] = products.recommentProductVariantPresenters[i].Name;
              productItem['quantity'] = products.recommentProductVariantPresenters[i].StockLevel;
              productItem['image'] = products.recommentProductVariantPresenters[i].ImageUrl;
              productItem['unit'] = products.recommentProductVariantPresenters[i].UPC;
              productItem['slug'] = products.recommentProductVariantPresenters[i].UPC;
              productItem['upc'] = products.recommentProductVariantPresenters[i].UPC;
              productItem['productName'] = products.recommentProductVariantPresenters[i].ProductName;
              productItem['categoryName'] = products.recommentProductVariantPresenters[i].CategoryName;

              productItem['tag'] = products.recommentProductVariantPresenters[i].ProductId;
              productItem['originalPrice'] = products.recommentProductVariantPresenters[i].Price;
              productItem['price'] = products.recommentProductVariantPresenters[i].Price;
              productItem['type'] = 'W';
              productItem['sku'] = products.recommentProductVariantPresenters[i].SKU;
              productItem['discount'] = 0;
              productItem['description'] = products.recommentProductVariantPresenters[i].Description;
              productItem['currencySign'] = products.currencySign;
            


              recommentProductVariants.push(productItem);
            }
          }
    
          //alert(JSON.stringify(products.productCategoryPresenters));
          if(products.productCategoryPresenters !== undefined)
          {
            for(var j = 0;j < products.productCategoryPresenters.length; j++)
            {
    
            
              var nests = [];
              for(var k = 0;k < products.productCategoryPresenters[j].Products.length; k++)
              {
                var children = {};
                children['_id'] = Number(products.productCategoryPresenters[j].Products[k].ProductId);
                children['title'] = products.productCategoryPresenters[j].Products[k].Name;
                nests.push(children);
              }
              
    
              
              var productCategory = {};
              productCategory['_id'] = Number(products.productCategoryPresenters[j].CategoryId);
              productCategory['parent'] = products.productCategoryPresenters[j].Name;
              productCategory['icon'] = products.productCategoryPresenters[j].ImageUrl;
              productCategory['children'] = nests;
    
              productCategories.push(productCategory);
    
    
            }
          }
          var orderData = {};
          var orderDetailDatas = [];
          if(products.orderDetails !== null)
          {
            for(var i = 0;i < products.orderDetails.length; i++)
            {
              var orderDetailItem = {};
              orderDetailItem['_id'] = products.orderDetails[i].orderDetailId;
              orderDetailItem['upc'] = products.orderDetails[i].upc;
              orderDetailItem['orderId'] = products.orderDetails[i].orderId;
              orderDetailItem['productVariantId'] = products.orderDetails[i].productVariantId;
              orderDetailItem['productVariantName'] = products.orderDetails[i].productVariantName;
              orderDetailItem['sku'] = products.orderDetails[i].sku;
              orderDetailItem['productVariantPrice'] = products.orderDetails[i].productVariantPrice;
              orderDetailItem['locationId'] = products.orderDetails[i].locationId;
              orderDetailItem['discount'] = products.orderDetails[i].discount;
              orderDetailItem['quantity'] = products.orderDetails[i].quantity;
              orderDetailItem['imageUrl'] = products.orderDetails[i].imageUrl;
              orderDetailItem['lineOrder'] = products.orderDetails[i].lineOrder;
    
              orderDetailDatas.push(orderDetailItem);
    
            }
          }
    
          //alert(JSON.stringify("category Data = " + productCategories))
          sessionStorage.setItem('categories', JSON.stringify(productCategories));
    
          pagingManager();
          setCategoryList(productCategories);
          setProductList(productVariants);
    
          setNewProductList(newProductVariants);
          setRecommentProductList(recommentProductVariants)

          //alert(JSON.stringify(sliderImages));
          setSliderImageList(sliderImages);

    
        
    
    }
      
      const CancelPromotionCode = async(promotionCode) =>
      {
        setPromotionLoading(true);
        var orderId = liffOrderId;
            var companyId = liffCompanyId;
            var locationId = liffLocationId;
            var qrPromotion = promotionCode;
            var pictureUrl = '';
            var orderDetails = []
      
            for(var i = 0; i<items.length;i++)
            {
              var itemData = items[i];
              var orderDetail = {
                VariantId:itemData.id,
                Quantity:itemData.quantity,
                ProductVariantLabel:itemData.title,
                UnitPrice:itemData.price
              };
               
              orderDetails.push(orderDetail);
            }
            const promotionJson = await ProductServices.fetchCancelPromotionCode({
              companyId,
              locationId,
              orderId,
              qrPromotion,
              lineUserId,
              linePOSId,
              liffId,
              pictureUrl,
              catalogName:'',
              orderDetails:JSON.stringify(orderDetails)
            });
            var promotion = JSON.parse(promotionJson);
            var salesOrderDetails = promotion.orderDetails;
      
                const productDs = [];
                const discountDetails = [];
                
                if(salesOrderDetails !== undefined)
                {
                  for(var i = 0;i<salesOrderDetails.length;i++)
                  {
                    
                    var detail = {
                      id: Number(salesOrderDetails[i].productVariantId),
                      slug:salesOrderDetails[i].productId,
                      name: salesOrderDetails[i].upc,
                      title:salesOrderDetails[i].productVariantName,
                      sku: salesOrderDetails[i].sku,
                      quantity:salesOrderDetails[i].quantity,
                      price: salesOrderDetails[i].productVariantPrice,
                      image:salesOrderDetails[i].imageUrl,
                    }
                    var discountDetail = {
                      id: Number(salesOrderDetails[i].productVariantId),
                      discount:Number(salesOrderDetails[i].discount),
                      discountRate:Number(salesOrderDetails[i].discountRate)
                    }
                    productDs.push(detail);
                    discountDetails.push(discountDetail);
                  }
                }
                
            //alert("Apply Promotion2 = " + promotionCode + " " + lineUserId);
            
            setItems(productDs);
                sessionStorage.removeItem('discountDetails')
                sessionStorage.removeItem('discountRate');
                sessionStorage.removeItem('promotionCode');
                sessionStorage.removeItem('promotionMinimumAmount');
                sessionStorage.removeItem('promotionProductIdList');
                sessionStorage.removeItem('isForAllProduct');
      
                setPromotionCode(undefined);
      
                localStorage.removeItem('discountDetails');
                localStorage.removeItem('discountRate');
                localStorage.removeItem('promotionCode');
                localStorage.removeItem('promotionMinimumAmount');
                localStorage.removeItem('promotionProductIdList');
                localStorage.removeItem('isForAllProduct');
      
                setDiscountDetail(undefined)
      
                clearCouponData();
      
                setPromotionLoading(false);
      
                SetPromotionData(promotionCode,promotion.endTime,promotion.minimumAmount,promotion.discountRate,false);
      }
          const ApplyPromotionCode = async(promotionCode,discountPercentage, isForAllProduct, minimumAmount, productIdList) =>
          {
            //return;
            setPromotionLoading(true);
            var orderId = liffOrderId;
            var companyId = liffCompanyId;
            var locationId = liffLocationId;
            var qrPromotion = promotionCode;
            var pictureUrl = '';
            var orderDetails = []
      
            for(var i = 0; i<items.length;i++)
            {
              var itemData = items[i];
              var orderDetail = {
                VariantId:itemData.id,
                Quantity:itemData.quantity,
                ProductVariantLabel:itemData.title,
                UnitPrice:itemData.price
              };
               
              orderDetails.push(orderDetail);
            }
            const promotionJson = await ProductServices.fetchApplyPromotionCode({
              companyId,
              locationId,
              orderId,
              qrPromotion,
              lineUserId,
              linePOSId,
              liffId,
              pictureUrl,
              catalogName:'',
              orderDetails:JSON.stringify(orderDetails)
            });
            var promotion = JSON.parse(promotionJson);
            var salesOrderDetails = promotion.orderDetails;
      
            //alert("promotion = " + JSON.stringify(promotion));
            //alert("SalesOrderDetails = " + JSON.stringify(salesOrderDetails));
                const productDs = [];
                const discountDetails = [];
                
                for(var i = 0;i<salesOrderDetails.length;i++)
                {
                  var detail = {
                    id: Number(salesOrderDetails[i].productVariantId),
                    slug:salesOrderDetails[i].productId,
                    name: salesOrderDetails[i].upc,
                    title:salesOrderDetails[i].productVariantName,
                    sku: salesOrderDetails[i].sku,
                    quantity:salesOrderDetails[i].quantity,
                    price: salesOrderDetails[i].productVariantPrice,
                    image:salesOrderDetails[i].imageUrl,
                  }
                  var discountDetail = {
                    id: Number(salesOrderDetails[i].productVariantId),
                    discount:Number(salesOrderDetails[i].discount),
                    discountRate:Number(salesOrderDetails[i].discountRate)
                  }
                  productDs.push(detail);
                  discountDetails.push(discountDetail);
                }
            //alert("Apply Promotion2 = " + promotionCode + " " + lineUserId);
            //alert(productIdList);
            setItems(productDs);
                sessionStorage.setItem('discountDetails', JSON.stringify(discountDetails));
                sessionStorage.setItem('discountRate', (discountPercentage/100));
                sessionStorage.setItem('promotionCode', promotionCode);
                sessionStorage.setItem('promotionMinimumAmount', minimumAmount);
                sessionStorage.setItem('promotionProductIdList', JSON.stringify(productIdList));
                sessionStorage.setItem('isForAllProduct', isForAllProduct);
      
                setPromotionCode(promotionCode);
      
                localStorage.setItem('discountDetails',JSON.stringify(discountDetails));
                localStorage.setItem('discountRate', (discountPercentage/100));
                localStorage.setItem('promotionCode', promotionCode);
                localStorage.setItem('promotionMinimumAmount', minimumAmount);
                localStorage.setItem('promotionProductIdList', JSON.stringify(productIdList));
                localStorage.setItem('isForAllProduct', isForAllProduct);
      
                setDiscountDetail(JSON.stringify(discountDetails))
                setPromotionLoading(false);
          }
      
          const SetPromotionData = (promotionCode,promotionEndTime,promotionMinimumAmount,promotionDiscountRate, isAuto) =>
            {
              var couponData = [];
              
              var couponDetail = {
                couponCode:promotionCode,
                endTime:promotionEndTime,
                minimumAmount:promotionMinimumAmount,
                discountPercentage:promotionDiscountRate,
            
              };
              couponData.push(couponDetail);
                      
              sessionStorage.setItem('couponInfo', JSON.stringify(couponData));
              setCouponData(promotionCode, couponData, isAuto);
            }
          const SearchProduct = async (searchText) => 
          {
            //alert("Searching = " + searchText);
            RefreshProductList(liffData,lineUserId,linePOSId,groupId,liffOrderId,liffCompanyId,liffLocationId,'','',0,9,1,itemPerPage,searchText,'','','query')
          }
          const FilterCategory = async (categoty) => 
          {
            //alert("categoty = " + categoty);
            RefreshProductList(liffData,lineUserId,linePOSId,groupId,liffOrderId,liffCompanyId,liffLocationId,'','',0,9,1,itemPerPage,'',categoty,'','category')
          }
          const FilterProduct = async (category,product) => 
          {
            //alert("product = " + product);
            RefreshProductList(liffData,lineUserId,linePOSId,groupId,liffOrderId,liffCompanyId,liffLocationId,'','',0,9,1,itemPerPage,'',category,product,'product')
          }
          const RefreshProductList = async (liffId, lineUserId, linePOSId, groupId, orderId,companyId,locationId,companyName, locationName, promotionId,customerTypeId,page,itemPerPage,query,category,product,refreshMode) =>
          {
            setLoading(true);
            //alert("Refresh");
            query = query === undefined ? 'null' : query;
            category = category === undefined ? 'null' : category;
            product = product === undefined ? 'null' : product;
            const products = await ProductServices.fetchRefreshCoinPOSProductService({
              liffId,
              lineUserId,
              linePOSId,
              groupId,
              orderId,
              companyId,
              companyCode:"",
              locationId,
              companyName,
              locationName,
              catalogName:"",
              promotionId,customerTypeId,page,itemPerPage,query,category,product
            });
      
            //alert(products);
            currentPage = products.currentPage;
            countPage = products.countPage;
            
            var productVariants = [];//products.productVariantPresenters;
            for(var i = 0;i < products.productVariantPresenters.length; i++)
            {
              var productItem = {};
              productItem['_id'] = Number(products.productVariantPresenters[i].ProductVariantId);
              productItem['title'] = products.productVariantPresenters[i].Name;
              productItem['quantity'] = products.productVariantPresenters[i].StockLevelDisplay;
              productItem['image'] = products.productVariantPresenters[i].ImageUrl;
              productItem['unit'] = products.productVariantPresenters[i].UPC;
              productItem['slug'] = products.productVariantPresenters[i].UPC;
              productItem['upc'] = products.productVariantPresenters[i].UPC;
              productItem['productName'] = products.productVariantPresenters[i].ProductName;
              productItem['categoryName'] = products.productVariantPresenters[i].CategoryName;

              productItem['tag'] = products.productVariantPresenters[i].ProductId;
              productItem['originalPrice'] = products.productVariantPresenters[i].Price;
              productItem['price'] = products.productVariantPresenters[i].Price;
              productItem['type'] = '';
              productItem['sku'] = products.productVariantPresenters[i].SKU;
              productItem['discount'] = 0;
              productItem['description'] = products.productVariantPresenters[i].Description;
              productItem['currencySign'] = products.currencySign;
      
      
              productVariants.push(productItem);
            }
      
            if(refreshMode === 'category')
            {
              setProductListHeader('รายการสินค้า ในหมวดหมู่ "' + products.categoryName + '"');
            }
            else if(refreshMode === 'product')
            {
              setProductListHeader('รายการสินค้า ในกลุ่ม "' + products.productName + '"');
            }
            else if(refreshMode === 'query')
            {
              setProductListHeader('รายการสินค้า ค้นหาโดยคำ "' + query + '"');
            }
            else
            {
              setProductListHeader('สินค้าทั้งหมด สำหรับการช็อปปิ้งของคุณ');
            }

            pagingManager();
            setProductList(productVariants);
      
      
            setLoading(false);
          }
      
          const pagingManager = () =>
          {
            var allPage = countPage;
            var startPage = 1;
            var endPage = allPage;
            if(currentPage < 3)
            {
              startPage = 1;
            }
            else
            {
              startPage = currentPage - 2;
            }
            if(currentPage + 2 > allPage)
            {
              endPage = allPage;
            }
            else
            {
              if(currentPage < 3)
              {
                endPage = 5;
              }
              else
              {
                endPage = currentPage + 2;
              }
                  
            }
      
            var indents = [];
          
              if(startPage > 1)
              {
                indents.push(<button onClick={()=>RefreshProductList(liffData,lineUserId,linePOSId,groupId,liffOrderId,liffCompanyId,liffLocationId,'','',0,9,startPage-1,30)} className="hover:text-red-600 text-red-400 text-lg cursor-pointer px-2">
                    Previous
                  </button>);
              }
              else
              {
                indents.push(
                  <button className="text-gray-400 text-lg px-2" disabled>Previous</button>
                );
              }
      
              var iPage = 0;
              for (let i = startPage; i <= endPage; i++) {
                if(i === currentPage)
                {
                  indents.push(<button className="text-gray-400 text-lg px-2" disabled>{i}</button>);
                }
                else
                {
                  iPage = i;
                  indents.push(<button onClick={()=>RefreshProductList(liffData,lineUserId,linePOSId,groupId,liffOrderId,liffCompanyId,liffLocationId,'','',0,9,i,30)} className="hover:text-red-600 text-red-400 text-lg cursor-pointer px-2">
                  {i}
                </button>);
                }
                
              }
      
              if(endPage > allPage)
              {
                indents.push(<button className="text-gray-400 text-lg px-2" disabled>Next</button>);
                
              }
              else
              {
                if(endPage === allPage)
                {
                  indents.push(<button className="text-gray-400 text-lg px-2" disabled>Next</button>);
                }
                else
                {
                  indents.push(<button onClick={()=>RefreshProductList(liffData,lineUserId,linePOSId,groupId,liffOrderId,liffCompanyId,liffLocationId,'','',0,9,endPage+1,30)} className="hover:text-red-600 text-red-400 text-lg cursor-pointer px-2">
                  Next
                </button>)
                }
                
              }
      
              setPaging(indents);
          }
          
      

  return (
    <>
      {newOrderModalOpen && (
          <NewOrderModal modalOpen={newOrderModalOpen} setModalOpen={setNewOrderModalOpen} createNewOrder={CreateNewOrder} goToOrder={GotoOrder} loading={newOrderLoading} />
        )}
      <Layout title={title} description={description} dataPath={dataPath} companyName={companyName} locationName={locationName} companyLogo={companyLogo} 
      locationAddress1={locationAddress1} locationAddress2={locationAddress2} locationCity={locationCity}
      locationStateOrProvince={locationStateOrProvince} locationCountry={locationCountry} locationPostalCode={locationPostalCode}
      locationEmail={locationEmail} locationTel={locationTel} 
      RefreshProductList={SearchProduct} FilterProduct={FilterProduct} page='product'>
        <div className="min-h-screen">
          <StickyCart discountDetails={discountDataDetails} currencySign={currencySign}/>
          
          <div className="bg-white">
            <div className="mx-auto max-w-screen-2xl">
              <div className="flex w-full">
                <div className="flex-shrink-0 lg:block w-full">
                  {
                    sliderImageLoading ? 
                    (<Loading loading={sliderImageLoading} />)
                    :
                    (<MainCarousel sliderImages={sliderImageList} />)
                  }
                  
                </div>
                {/* <div className="w-full hidden lg:flex">
                  <OfferCard />
                </div> */}
              </div>
              
            </div>
          </div>


          <div id="newProduct"
            className="bg-gray-50 lg:py-16 py-10 mx-auto max-w-screen-2xl px-3 sm:px-10"
          >
            <div className="mb-10 flex justify-center">
              <div className="text-center w-full lg:w-2/5">
                <h2 className="text-xl lg:text-2xl mb-2 font-serif font-semibold">
                  สินค้าใหม่ล่าสุด
                </h2>
                
              </div>
            </div>
            {
                newProductLoading ? (
                  <Loading loading={newProductLoading} />
                )
                :
                (
                  <div className="flex">
                    <div className="w-full">
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6 gap-2 md:gap-3 lg:gap-3">
                        {newProductList.map((product) => (
                          <ProductCard key={product._id} product={product} liffId={liffData} lineUserId={lineUserId} companyCode={companyCode}
                          linePOSId={linePOSId} groupId={groupId} orderId={liffOrderId} companyId={liffCompanyId} locationId={liffLocationId} pictureUrl={lineProfileImage} />
                        ))}
                      </div>
                    </div>
                  </div>
                )
              }
            
          </div>

          <div id="recommentedProduct"
            className="bg-gray-50 lg:py-16 py-10 mx-auto max-w-screen-2xl px-3 sm:px-10"
          >
            <div className="mb-10 flex justify-center">
              <div className="text-center w-full lg:w-2/5">
                <h2 className="text-xl lg:text-2xl mb-2 font-serif font-semibold">
                  สินค้าแนะนำ
                </h2>
                
              </div>
            </div>
            {
                recommentProductLoading ? (
                  <Loading loading={recommentProductLoading} />
                )
                :
                (
                  <div className="flex">
                    <div className="w-full">
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6 gap-2 md:gap-3 lg:gap-3">
                        {recommentProductList.map((product) => (
                          <ProductCard key={product._id} product={product} liffId={liffData} lineUserId={lineUserId} companyCode={companyCode}
                          linePOSId={linePOSId} groupId={groupId} orderId={liffOrderId} companyId={liffCompanyId} locationId={liffLocationId} pictureUrl={lineProfileImage} />
                        ))}
                      </div>
                    </div>
                  </div>
                )
              }
            
          </div>
          {/* feature category's */}
          {/* <div className="bg-gray-100 lg:py-16 py-10">
            <div className="mx-auto max-w-screen-2xl px-3 sm:px-10">
              <div className="mb-10 flex justify-center">
                <div className="text-center w-full lg:w-2/5">
                  <h2 className="text-xl lg:text-2xl mb-2 font-serif font-semibold">
                    Featured Categories
                  </h2>
                  <p className="text-base font-sans text-gray-600 leading-6">
                    เลือกหมวดหมู่สินค้า เพื่อค้นหาสินค้าที่ตรงใจคุณอย่างรวดเร็ว
                  </p>
                </div>
              </div>
              {
                categoryLoading ? (
                  <Loading loading={categoryLoading} />
                )
                :
                (
                  <FeatureCategory categories={categoryList} FilterCategory={FilterCategory} FilterProduct={FilterProduct}/>
                )
              }
            </div>
          </div> */}

          <div className="bg-white">
            <div className="mx-auto py-5 max-w-screen-2xl px-3 sm:px-10">

              {promotionLoading ?
                      <div className="bg-gray-100 lg:py-16 py-10">
                        <div className="mx-auto max-w-screen-2xl px-3 sm:px-10">
                          
                          <div className="mb-10 flex justify-center">
                            <div className="text-center w-full lg:w-2/5">
                              <Loading loading={promotionLoading} />
                              <p className="text-base font-sans text-gray-600 leading-6">
                                กำลังปรับปรุงส่วนลด กรุณารอสักครู่
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      :
                        <div className="flex w-full">
                          <div className="w-full lg:flex">
                            <OfferCard promotions={promotions} selectedPromotion={promotionCode} companyId={liffCompanyId} ApplyPromotionCode={ApplyPromotionCode} CancelPromotionCode={CancelPromotionCode}/>
                        
                        </div>
                        </div>
                      
                      
                    }   
                    
              
              
            </div>
          </div>
          {/* popular products */}
          {/* <div className="bg-gray-50 lg:py-16 py-10 mx-auto max-w-screen-2xl px-3 sm:px-10">
            <div className="mb-10 flex justify-center">
              <div className="text-center w-full lg:w-2/5">
                <h2 className="text-xl lg:text-2xl mb-2 font-serif font-semibold">
                  {productListHeader}
                </h2>
                
              </div>
            </div>
            {
              loading ? (
                <Loading loading={loading} />
              )
              :
              (
                <>
                  <div className="flex">
                    <div className="w-full">
                      
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6 gap-2 md:gap-3 lg:gap-3">
                        {productList?.map((product) => (
                          <ProductCard key={product._id} product={product} liffId={liffData} lineUserId={lineUserId} 
                          linePOSId={linePOSId} groupId={groupId} orderId={liffOrderId} companyId={liffCompanyId} locationId={liffLocationId} pictureUrl={lineProfileImage}  />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="w-full">
                    <div id="pagingProduct" className=" lg:py-16 bg-repeat bg-center overflow-hidden">
                      <div className="max-w-screen-2xl mx-auto px-4 sm:px-10">
                        <div className="grid grid-cols-1 gap-2 md:gap-3 lg:gap-3 items-center">
                          
                          <div className="text-center">
                            
                            <div className="mt-2">
                              {pagingIndent}
                            </div>
                          </div>
                          
                        </div>
                      </div>
                    </div>
                      
                    </div>
                  </div>
                </>
                
              )    
            }
            
          </div> */}

          {/* promotional banner card */}
          {/* <div className="block mx-auto max-w-screen-2xl">
            <div className="mx-auto max-w-screen-2xl px-4 sm:px-10">
              <div className="lg:p-16 p-6 bg-emerald-500 shadow-sm border rounded-lg">
                <CardTwo />
              </div>
            </div>
          </div> */}

          {/* discounted products */}
          {/* <div
            id="discount"
            className="bg-gray-50 lg:py-16 py-10 mx-auto max-w-screen-2xl px-3 sm:px-10"
          >
            <div className="mb-10 flex justify-center">
              <div className="text-center w-full lg:w-2/5">
                <h2 className="text-xl lg:text-2xl mb-2 font-serif font-semibold">
                  Latest Discounted Products
                </h2>
                <p className="text-base font-sans text-gray-600 leading-6">
                  See Our latest discounted products below. Choose your daily
                  needs from here and get a special discount with free shipping.
                </p>
              </div>
            </div>
            <div className="flex">
              <div className="w-full">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6 gap-2 md:gap-3 lg:gap-3">
                  {discountProducts?.slice(0, 18).map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </Layout>
    </>
  );
};

export const getServerSideProps = async ({req, res,params }) => {
  //const products = await ProductServices.getShowingProducts();
  //const provinces = await ProductServices.fetchGetStateProvince();

  var dataParam = params.id;
    var coinPOSLiffData = req.url.replace('/','');

    var liffCompanyId = 0;
    var liffLocationId = 0;
    var liffPage = "";
    var catalogName = "";
    var companyCode = "";
    var liffCompanyName = "";

    var liffData = '';
    var linePOSId = '';
    var lineUserId = '';
    var groupId = '';
    var liffOrderId = 0;

    var companyName = '';
    var locationName = '';
    const promotionId = 0;

    const customerTypeId = 9;
    var page = 1;
    var itemPerPage = 30;
    const query = '';
    const category = '';
    const product = '';   

    const title = "all-in-one, heavy-duty & modern ecommerce platform";
    const description = "CoinPOS Ecommerce Platform - All-in-one, heavy-duty, cost-effective and modern ecommerce platform for business of all sizes.";


    //coinPOSLiffData = coinPOSLiffData.replaceAll("%3D","=");
    //coinPOSLiffData = coinPOSLiffData.replaceAll("%26","&");
    //coinPOSLiffData = coinPOSLiffData.replaceAll("%3F","?");
    //coinPOSLiffData = coinPOSLiffData.replaceAll("%2F","/");

    console.log('coinPOSLiffData = ' + coinPOSLiffData);
  if(coinPOSLiffData.length > 0)
  {
    if(!coinPOSLiffData.includes('liffId'))
    {
      if(coinPOSLiffData.includes('?'))
      {
        const parms = coinPOSLiffData.split('?');
        if(parms[1].includes('='))
        {
          const parms1 =parms[1].split('=');
          companyCode = parms1[1];
        }
            
      }
      else
      {
        companyCode = coinPOSLiffData
      }
      

      console.log('companyCode = ' + companyCode);
    }
    const parms = coinPOSLiffData.split('?');

    

    if(parms.length > 1)
    {
      const liffQuery = parms[0];
      var liffOrderQuery = parms[1];

      console.log('liffQuery = ' + liffQuery);
      console.log('liffOrderQuery = ' + liffOrderQuery);
      var liffVar = [];
      if(liffQuery.includes("="))
      {
        liffVar = liffQuery.split("=");
      }
      else if(liffOrderQuery.includes("="))
      {
        liffVar = liffOrderQuery.split("=");
      }
      
      console.log('liffVar count = ' + liffVar.length)
      console.log('liffVar[0] = ' + liffVar[0])
      console.log('liffVar[1] = ' + liffVar[1])
      if(liffVar[0] === 'liffId')
      {
        liffData = liffVar[1];
        
      }
      else (liffVar[0] === 'id')
      {
        liffData = liffVar[1];
      }

      var vars = liffOrderQuery.split("&");
      for (var i=0;i<vars.length;i++)
      {
        //console.log('vars = ' + vars[i]);
        var pair = vars[i].split("=");
        if(pair[0] === 'liffId')
        {
          liffData = pair[1];
          
        }
        if(pair[0] === 'linePOSId')
        {
          linePOSId = pair[1];
        }
        if(pair[0] === 'groupId')
        {
          groupId = pair[1];
        }
        if(pair[0] === 'orderId')
        {
          liffOrderId = Number(pair[1]);
        }
        if(pair[0] === 'companyId')
        {
            liffCompanyId = Number(pair[1]);
        }
        if(pair[0] === 'companyName')
        {
            liffCompanyName = pair[1];
        }
        if(pair[0] === 'locationId')
        {
            liffLocationId = Number(pair[1]);
        }
        if(pair[0] === 'page')
        {
            liffPage = pair[1];
        }
        if(pair[0] === 'companycode')
        {
            companyCode = pair[1];
        }
        if(pair[0] === 'catalog')
        {
            catalogName = pair[1];
        }
        if(pair[0] === 'id')
        {
            var idData = pair[1];
            idData = idData.replaceAll("%3D","=");
            var liffs = idData.split("=")
            if(liffs.length > 1)
            {
              liffData = liffs[1];
            }
        }

        if(pair[0] === 'liff.state')
        {
          var param = pair[1];
          param = param.replaceAll("%3D","=");
          param = param.replaceAll("%26","&");
          param = param.replaceAll("%3F","?");
          param = param.replaceAll("%2F","/");
          param = param.replace("?","");
          //console.log('param = ' + param);
          var m_params = param.split("&");
          for (var j=0;j<m_params.length;j++)
          {
            //console.log('m_params[' + j + '] = ' + m_params[j]);
            var paramValue = m_params[j].split("=");
            if(paramValue[0] === 'linePOSId')
            {
              linePOSId = paramValue[1];
            }
            if(paramValue[0] === 'groupId')
            {
              groupId = paramValue[1];
            }
            if(paramValue[0] === 'orderId')
            {
              liffOrderId = Number(paramValue[1]);
            }
            if(paramValue[0] === 'companyId')
            {
              liffCompanyId = Number(paramValue[1]);
            }
            if(paramValue[0] === 'locationId')
            {
              liffLocationId = Number(paramValue[1]);
            }
            if(paramValue[0] === 'page')
            {
              liffPage = paramValue[1];
            }
            if(paramValue[0] === 'companycode')
            {
                companyCode = paramValue[1];
            }
            if(paramValue[0] === 'catalog')
            {
                catalogName = paramValue[1];
            }
          }

        }
      }
    }

  }

  var liffId = liffData;
  var orderId = liffOrderId === null ? 0 : liffOrderId;
  var companyId = liffCompanyId === null ? 0 : liffCompanyId;
  var locationId = liffLocationId === null ? 0 : liffLocationId;
  var dataPath = '';
  
  
  
  var liffEndpoint = await  UserServices.fetchGetLiffURLTemplate();

  //var catalogName = '';
  //var companyCode = '';

  const products = await ProductServices.fetchGetDefaultDataCompany({
    //const products = await ProductServices.getCoinPOSProductService({
      liffId,
      lineUserId,
      linePOSId,
      groupId,
      orderId:orderId ? 0 : orderId,
      companyId,locationId,
      companyName,
      locationName,
      catalogName,
      companyCode,
      promotionId,customerTypeId,page,itemPerPage,query,category,product
    });

  //const popularProducts = products.filter((p) => p.discount === 0);
  //const discountProducts = products.filter((p) => p.discount >= 5);

  if(liffCompanyId === 0)
  {
    liffCompanyId = products.companyId;
  
  }
  if(liffLocationId === 0)
  {
    liffLocationId = products.locationId;
  }
  var promotions = [];
  promotions = products.promotions;
  var shippingServices = products.shippingServices;
  var bankNameAndAccounts = products.bankNameAndAccounts;
  var countPage = products.countPage;
  var currentPage = products.currentPage;
  var currencySign = products.currencySign;
  var customerFirstName = products.firstName;
  var customerLastName = products.lastName;
  var customerEmail = products.email;
  var customerPhoneNumber = products.mobile;

  var address1 = products.address1;
  var countryId = products.countryId;
  var provinceId = products.provinceId;
  var cityId = products.cityId;
  var districtId = products.districtId;
  var postalcode = products.postalcode;
  var countrys = products.countrys;
  var provinces = products.provinces;
  var cities = products.cities;
  var districts = products.districts;

  var companyLogo = products.companyLogoUrl;

  var locationAddress1 = products.locationAddress1;
  var locationAddress2 = products.locationAddress2;
  var locationCity = products.locationCity;
  var locationStateOrProvince = products.locationStateOrProvince;
  var locationCountry = products.locationCountry;
  var locationPostalCode = products.locationPostalCode;
  var locationEmail = products.locationEmail;
  var locationTel = products.locationTel;

  var companyFacebook = products.companyFacebook;
  var companyLine = products.companyLine;

  var catalogLiffId = products.locationLiff;

  companyName = products.companyName;
  locationName = products.locationName;
  companyCode = products.companyCode;


  console.log('compile completed liffId = ' + liffId);
  if(liffId.length > 0)
  {

    if(linePOSId.length > 0 && groupId.length > 0 && liffCompanyId > 0 && liffLocationId > 0)
    {
      dataPath = '/' + companyCode + '/' + 'liffId=' + liffId + '?linePOSId=' + linePOSId + '&groupId=' + groupId + '&orderId=' + liffOrderId + '&companyId=' + liffCompanyId + '&locationId=' + liffLocationId;
    }
    else
    {
      liffData = '';
      dataPath = '/' + companyCode;
    }
    
  }
  else
  {
    dataPath = coinPOSLiffData;
  }
  return {
    props: {
        params: dataParam,
        targetPage:liffPage,
        dataPath:dataPath,
        coinPOSLiffData:coinPOSLiffData,
        catalogName:catalogName,
        companyCode:companyCode,
        title:title,
        description:description,
        liffEndpoint:liffEndpoint,
        liffData:liffData,
        linePOSIdData:linePOSId,
        groupIdData:groupId,
        liffOrderId:liffOrderId,
        liffCompanyId:liffCompanyId,
        liffLocationId:liffLocationId,
        countPage:countPage,
        currentPage:currentPage,
        //products: productVariants,
        //salesOrder:orderData,
        //orderDetails:orderDetailDatas,
        shippingServices:shippingServices,
        bankNameAndAccounts:bankNameAndAccounts,
        currencySign:currencySign,
        companyName:companyName,
        companyLogo:companyLogo,
        companyFacebook:companyFacebook,
        companyLine:companyLine,

        catalogLiffId:catalogLiffId,

        locationName:locationName,
        //categories:productCategories,
        customerFirstName:customerFirstName,
        customerLastName:customerLastName,
        customerEmail:customerEmail,
        customerPhoneNumber:customerPhoneNumber,

        address1:address1,
        countryId:countryId,
        provinceId:provinceId,
        cityId:cityId,
        districtId:districtId,
        postalcode:postalcode,
        countrys:countrys,
        provinces:provinces,
        cities:cities,
        districts:districts,

        promotions:promotions,

        locationAddress1:locationAddress1,
        locationAddress2:locationAddress2,
        locationCity:locationCity,
        locationStateOrProvince:locationStateOrProvince,
        locationCountry:locationCountry,
        locationPostalCode:locationPostalCode,
        locationEmail:locationEmail,
        locationTel:locationTel
    },
    
  };
};

// export const getServerSideProps = async () => {
//   const products = await ProductServices.getShowingProducts();

//   return {
//     props: {
//       products,
//     },
//   };
// };

export default Details;
