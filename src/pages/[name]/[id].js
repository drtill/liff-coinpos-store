import { useContext,useEffect, useState } from 'react';
import { useCart} from 'react-use-cart';
import { useRouter } from 'next/router'

import { UserContext } from '@context/UserContext';

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

import Loading from '@component/preloader/Loading';

import LoginModal from '@component/modal/LoginModal';
import checkout from '@pages/checkout';

import useLoginSubmit from '@hooks/useLoginSubmit';
//const liffId = process.env.NEXT_PUBLIC_LIFF_ID
const isLiffLogin = true;//process.env.NEXT_PUBLIC_ISLOGIN
var itemPerPage = 30;
const Catalog = ({params,targetPage,companyCode,dataPath,title,description,countPage,currentPage,liffEndpoint,
  groupIdData, liffOrderId, liffCompanyId,liffLocationId,linePOSIdData,liffData,
  products,salesOrder, orderDetails,categories,shippingServices,bankNameAndAccounts,
  currencySign, companyName, locationName,companyLogo,
  catalogCompanyId,catalogName,catalogLocationId,catalogOrderId,catalogLiffId,
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
    
    const { dispatch } = useContext(UserContext);

    const [modalOpen, setModalOpen] = useState(false);
    
    const router = useRouter();
    
    const [companyId, setCompanyId] = useState(catalogCompanyId);
    const [locationId, setLocationId] = useState(catalogLocationId);
    const [orderId, setOrderId] = useState(0);

    const [loading, setLoading] = useState(true);

    const [categoryLoading, setCategoryLoading] = useState(true);
    const [newProductLoading, setNewProductLoading] = useState(true);
    const [recommentProductLoading, setRecommentProductLoading] = useState(true);

    const [promotionLoading, setPromotionLoading] = useState(false);

    //this.setState({liffId:liffData});
    const [productList, setProductList] = useState([]);
    const [newProductList, setNewProductList] = useState([]);
    const [recommentProductList, setRecommentProductList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [lineProfileImage, setProfileImage] = useState('');
    const [lineUserId, setLineUserId] = useState('');
    const [lineLiffUserId, setLineLiffUserId] = useState('');
    const [linePOSId, setLinePOSId] = useState('');
    const [lineUsername, setLineUsername] = useState('');
    const [pagingIndent, setPaging] = useState([]);
    const [companyNameData, setCompanyName] = useState(companyName);
    const [catalogNameData, setCatalogName] = useState(catalogName);

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

    const [catalogPromotionId,setCatalogPromotionId] = useState(0);
    const [promotionCode,setPromotionCode] = useState('');
    const [catalogPromotionName,setCatalogPromotionName] = useState('');
    const [catalogDiscountPercentage,setCatalogDiscountPercentage] = useState(0);
    const [catalogPromotionIsAllProduct,setCatalogPromotionIsAllProduct] = useState(false);
    const [catalogMinimumAmount,setCatalogMinimumAmount] = useState(0);
    const [catalogProductType,setCatalogProductType] = useState('');

    const [isCatalogPromotion,setIsCatalogPromotion] = useState(false);
    
    const [productListHeader, setProductListHeader] = useState('??????????????????????????????????????? ?????????????????????????????????????????????????????????????????????');

    const [sliderImageLoading, setSliderImageLoading] = useState(true);
      
    const [sliderImageList, setSliderImageList] = useState([]);


    const { setItems,clearCartMetadata,emptyCart, addItem, items } = useCart();
    
    const { handleSubmit, submitHandler,lineSignInManager, register, errors } =
          useLoginSubmit();
    
    useEffect(async () => {

      //alert("catalogLiffId = " + catalogLiffId)

      setPromotionLoading(true);
      
      //alert(JSON.stringify(promotions))
      if(Cookies.get('userInfo'))
      {
        Cookies.remove('userInfo');
      } 
      var userLocalJson = localStorage.getItem('userInfo');
      //alert("userLocalJson = " + userLocalJson);
      if(userLocalJson === null)
      {
        //alert('Logout ????');
        var isGetProfile = false;
        if(liffData !== '')
        {
          const liff = (await import('@line/liff')).default
          try 
          {
            await liff.init({ liffId:liffData });
          } 
          catch (error) 
          {
            //alert('liff init error' + error.message)
          }
          if (!liff.isLoggedIn()) 
          {
            if(companyCode)
            {
              var url = liffEndpoint + '/liffId=' + liffData + '?companycode=' + companyCode + '&catalog=' + catalogName;
              liff.login({ redirectUri: url});
            }
            else
            {
              var url = liffEndpoint + '/liffId=' + liffData + '?linePOSId=' + linePOSId + "&groupId=" + groupId + '&orderId=' + liffOrderId + '&companyId=' + liffCompanyId + '&locationId=' + liffLocationId;
              liff.login({ redirectUri: url});
            }
                  
          }
          else
          {
            let getProfile = await liff.getProfile();
            isGetProfile = true;
        
            lineUsername = getProfile.displayName;
                  
            lineLiffUserId = getProfile.userId;
            
            lineProfileImage = getProfile.pictureUrl;
            
            const email = liff.getDecodedIDToken().email;
            
            setLineUsername(lineUsername);
            setLineUserId(lineLiffUserId);
            setLineLiffUserId(lineLiffUserId);
            setProfileImage(lineProfileImage);
        
            sessionStorage.setItem('lineUsername', lineUsername);
            sessionStorage.setItem('lineUserId', lineLiffUserId);
            sessionStorage.setItem('lineProfileImage', lineProfileImage);
        
            var dataUser = {};
            dataUser['image'] = lineProfileImage;
            dataUser['name'] = lineUsername;
            dataUser['email'] = email;
            
            Cookies.set('userInfo', JSON.stringify(dataUser));
            sessionStorage.setItem('userInfo', JSON.stringify(dataUser));
            localStorage.setItem('userInfo', JSON.stringify(dataUser));
            dispatch({ type: 'USER_LOGIN', payload: dataUser });

            userLocalJson = localStorage.getItem('userInfo');
            
            var data = {};
        
            var liffId = liffData;
            var lineUserId = lineLiffUserId;
            var linePOSId = linePOSIdData;

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
              submitHandler(data)
          
            }
          }
        }
        else
        {
          dispatch({ type: 'USER_LOGOUT' });
          Cookies.remove('userInfo');
          Cookies.remove('couponInfo');
        }
        
      }
      else
      {
        //alert('Get userInfo')
        Cookies.set('userInfo', userLocalJson);
        //alert('Get cookie userInfo')
        var userLocal = JSON.parse(userLocalJson)
        //alert('Get parse userInfo')
        try
        {
          const expiredDate = await UserServices.fetchCoinposCheckExpired(
            {
              email:userLocal.email,
              companyId:catalogCompanyId
            });
            //alert('Get expiredDate 0 = ' + expiredDate); 
          sessionStorage.setItem('expiredDate',expiredDate);
          //alert('Get expiredDate 1 = ' + expiredDate); 
          if(expiredDate === 'false')
          {
            //alert('Login ex');
            dispatch({ type: 'USER_LOGIN', payload: userLocal });


            //alert('userLocal.customerId = ' + userLocal.customerId)
            sessionStorage.setItem('customerId', userLocal.customerId); 
            sessionStorage.setItem('customerFirstName', userLocal.firstName);
            sessionStorage.setItem('customerLastName', userLocal.lastName);
            sessionStorage.setItem('customerEmail', userLocal.email);
            sessionStorage.setItem('customerPhoneNumber', userLocal.phone);

            //alert('address1 = '+ userLocal.address1)
            //alert('countryId = '+ userLocal.countryId)
            //alert('countryId = '+ JSON.stringify(userLocal.provinces))

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
            //alert('Logout ex liffData = ' + liffData);
            var isGetProfile = false;
            if(liffData !== '')
            {
              //alert('has liffId');
              const liff = (await import('@line/liff')).default
              try 
              {
                //alert('liff init');
                await liff.init({ liffId:liffData });
              } 
              catch (error) 
              {
                //alert('liff init error' + error.message)
              }
              if (!liff.isLoggedIn()) 
              {
                //alert('no LoggedIn')
                if(companyCode)
                {
                  var url = liffEndpoint + '/' + companyCode + '/liffId=' + liffData + '?companycode=' + companyCode + '&catalog=' + catalogName;
                  //alert('redirect = ' + url);
                  liff.login({ redirectUri: url});
                }
                else
                {
                  var url = liffEndpoint + '/' + companyCode + '/liffId=' + liffData + '?linePOSId=' + linePOSId + "&groupId=" + groupId + '&orderId=' + liffOrderId + '&companyId=' + liffCompanyId + '&locationId=' + liffLocationId;
                  //alert('redirect = ' + url);
                  liff.login({ redirectUri: url});
                }
                      
              }
              else
              {
                //alert('LoggedIn')
                let getProfile = await liff.getProfile();
                isGetProfile = true;
            
                lineUsername = getProfile.displayName;
                      
                lineLiffUserId = getProfile.userId;
                
                lineProfileImage = getProfile.pictureUrl;
                
                const email = liff.getDecodedIDToken().email;
                
                setLineUsername(lineUsername);
                setLineUserId(lineLiffUserId);
                setLineLiffUserId(lineLiffUserId);
                setProfileImage(lineProfileImage);
            
                sessionStorage.setItem('lineUsername', lineUsername);
                sessionStorage.setItem('lineUserId', lineLiffUserId);
                sessionStorage.setItem('lineProfileImage', lineProfileImage);
            
                var dataUser = {};
                dataUser['image'] = lineProfileImage;
                dataUser['name'] = lineUsername;
                dataUser['email'] = email;
                
                Cookies.set('userInfo', JSON.stringify(dataUser));
                sessionStorage.setItem('userInfo', JSON.stringify(dataUser));
                localStorage.setItem('userInfo', JSON.stringify(dataUser));
                dispatch({ type: 'USER_LOGIN', payload: dataUser });

                userLocalJson = localStorage.getItem('userInfo');
                
                var data = {};
            
                var liffId = liffData;
                var lineUserId = lineLiffUserId;
                var linePOSId = linePOSIdData;

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
                  submitHandler(data)
              
                }
              }
            }
            else
            {
              //alert('USER_LOGOUT');
              dispatch({ type: 'USER_LOGOUT' });
              Cookies.remove('userInfo');
              Cookies.remove('couponInfo');
            }
          }

    
          
        }
        catch(e)
        {
          alert("error = " + e.message);
        }
      }
      
      var getPromotionCode = localStorage.getItem('promotionCode')

      if(localStorage.getItem('promotionCode'))
      {
        var discountDetailsJson = sessionStorage.getItem('discountDetails');

        var discountRate = sessionStorage.getItem('discountRate');
        var promotionCode = sessionStorage.getItem('promotionCode');
        var promotionMinimumAmount = sessionStorage.getItem('promotionMinimumAmount');
        var promotionProductIdListJson = sessionStorage.getItem('promotionProductIdList');
        var isForAllProduct = sessionStorage.getItem('isForAllProduct');

        sessionStorage.setItem('discountDetails', discountDetailsJson);
        sessionStorage.setItem('discountRate', discountRate);
        sessionStorage.setItem('promotionCode', promotionCode);
        sessionStorage.setItem('promotionMinimumAmount', promotionMinimumAmount);
        sessionStorage.setItem('promotionProductIdList', promotionProductIdListJson);
        sessionStorage.setItem('isForAllProduct', isForAllProduct);
        setPromotionCode(promotionCode);
      }

      //alert(JSON.stringify(countrys))
      //alert('catalogLiffId Storage = ' + catalogLiffId)
      sessionStorage.setItem('countrys', 'JSON.stringify(countrys)');
      sessionStorage.setItem('countrysJSON', JSON.stringify(countrys));

      sessionStorage.setItem('fromPage','catalog');

      sessionStorage.setItem('dataPath',dataPath);
      
      sessionStorage.setItem('liffOrderId',liffOrderId);
      //alert('JSON.stringify(promotions) = ' + JSON.stringify(promotions))
      sessionStorage.setItem('promotions',JSON.stringify(promotions));

      sessionStorage.setItem('catalogName',catalogName);
      sessionStorage.setItem('companyCode',companyCode);
      sessionStorage.setItem('companyLogo',companyLogo);
      sessionStorage.setItem('companyName',companyNameData);
      sessionStorage.setItem('companyId',catalogCompanyId);

      sessionStorage.setItem('locationId',catalogLocationId);
      sessionStorage.setItem('catalogLiffId',catalogLiffId);

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
      
      sessionStorage.setItem('currencySign', currencySign);
      
      //alert("customerFirstName = " + customerFirstName)
      

      //var userInf =  Cookies.get('userInfo');
      //alert("Cookies = " + userInf);

      //alert("localStorage");
      //var userLocalJson = localStorage.getItem('userInfo');
      //alert("UserLocal = " + userLocal);

      //var userLocal = JSON.parse(userLocalJson);
      //Cookies.set('userInfo', userLocalJson);
      //dispatch({ type: 'USER_LOGIN', payload: userLocal });
      



      //alert("Cookie UserInfo")
      try
      {
        //Cookies.remove('userInfo');
        if(items !== null)
        {
            //alert("Not NULL");
            if(items.length > 0)
            {
                //alert("More 0");
                var orderDetail = items[0];
                //alert(JSON.stringify(orderDetail))
                if(orderDetail !== null)
                {
                    //alert(orderDetail.id)
                    var orderType = orderDetail.type;
                    if(orderType === 'W')
                    {
                        //alert("Catalog");
                    }
                    else
                    {
                        //alert("Liff");
                        emptyCart();
                        sessionStorage.removeItem('discountDetails');
                        sessionStorage.removeItem('discountRate');
                        sessionStorage.removeItem('promotionCode');
                    }
                    //alert(orderDetailId.length)
                    /* var typeOrder = orderDetail.id.slice((orderDetail.id.length - 2), (orderDetail.id.length - 1))
                    //alert(typeOrder)
                    if(orderType = 'W')
                    {
                        //alert("Catalog");
                    }
                    else
                    {
                        //alert("Liff");
                        emptyCart();
                    } */
                }
            }

        }
        
        //alert('catalogLocationId = ' + catalogLocationId)
        //alert('targetPage11 = ' + targetPage)
        if(targetPage.length > 0)
        {
          //alert('Go');
          RedirectPageManager(targetPage,userLocalJson,catalogName);
          
        }
        else
        {
          //alert('GetProduct');
          await GetProductData('','','','',0,catalogCompanyId,catalogLocationId,companyName,locationName,companyCode,catalogName,0,9,1,itemPerPage,'','','');
        }
        

        
          
        setPromotionLoading(false);
        setCategoryLoading(false);
        setNewProductLoading(false);
        //alert('RecommentProductLoading = false')
        setRecommentProductLoading(false);

        setSliderImageLoading(false);

        setLoading(false);
      }
      catch (err) 
      {
        alert("Error: = " + err.message);
      }
      

      
    }, [])

    const RedirectPageManager = (target,userLocalJson,catalogName) =>
    {
      //alert("Redirect")
      var userLocal = JSON.parse(userLocalJson)
      var fullTarget = ''
      if(target === 'update-profile' || target === 'dashboard' || target === 'my-orders' || target === 'recent-order')
      {
        fullTarget = '/user/' + target;
      }
      else if(target === 'checkout')
      {
        fullTarget = '/' + target;
      }
      
      
      if (userLocal?.email) 
      {
        sessionStorage.setItem('catalogName',catalogName);
        router.push(fullTarget);
      } 
      else 
      {
        sessionStorage.setItem('targetPage',fullTarget);
        sessionStorage.setItem('catalogName',catalogName);
        setModalOpen(!modalOpen);
          //router.push('/user/' + targetPage);
      }
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

      if(products.newProductVariantPresenters !== null)
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

      //alert("New Product = " + JSON.stringify(products.recommentProductVariantPresenters))
      if(products.recommentProductVariantPresenters !== null)
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
      if(products.productCategoryPresenters !== null)
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

      pagingManager(currentPage,countPage);
      setCategoryList(productCategories);
      setProductList(productVariants);

      setNewProductList(newProductVariants);
      setRecommentProductList(recommentProductVariants)

      setSliderImageList(sliderImages);
    

}

const CancelPromotionCode = async(promotionCode) =>
{
  var orderId = catalogOrderId;
      
      var companyId = catalogCompanyId;
      var locationId = catalogLocationId;
      var qrPromotion = promotionCode;
      var pictureUrl = '';
      var orderDetails = []


      
      
      //setItems(productDs);
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

    const ApplyPromotionCode = async(promotionCode,discountPercentage, isForAllProduct, minimumAmount, productIdList) =>
    {
      setPromotionLoading(true);
      //alert(sessionStorage.getItem('discountDetails'));
      //if(getPromotionCode !== null)
      //{
      //   localStorage.getItem('promotionCode')
      //}

      var orderDetails = []

      for(var i = 0; i<items.length;i++)
      {
        var itemData = items[i];
        var orderDetail = {
          VariantId:itemData.id,
          Quantity:itemData.quantity,
          ProductVariantLabel:itemData.title,
          UnitPrice:itemData.price,
          ProductId:itemData.slug
        };
         
        orderDetails.push(orderDetail);
      }

      var orderId = catalogOrderId;
      var companyId = catalogCompanyId;
      var locationId = catalogLocationId;
      var qrPromotion = promotionCode;
      var pictureUrl = '';

      
      const promotionJson = await ProductServices.fetchApplyPromotionCode({
        companyId,
        locationId,
        orderId:0,
        qrPromotion,
        lineUserId:'',
        linePOSId:'',
        liffId:'',
        pictureUrl:'',
        catalogName:catalogName,
        orderDetails:JSON.stringify(orderDetails)
      });
      var promotion = JSON.parse(promotionJson);
      
      var salesOrderDetails = promotion.orderDetails;

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

          //alert(JSON.stringify(productDs))
          //alert(JSON.stringify(discountDetails))
          //alert(JSON.stringify(productIdList))
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

          SetPromotionData(promotionCode,promotion.endTime,promotion.minimumAmount,promotion.discountRate, false);
          
          

    }
    const SearchProduct = async (searchText) => 
    {
      //alert("Searching = " + searchText);
      var customerTypeId = sessionStorage.getItem('customerTypeId') ? Number(sessionStorage.getItem('customerTypeId')) : 9;//Default Customer
      var promotionId = sessionStorage.getItem('promotionId') ? Number(sessionStorage.getItem('promotionId')) : 0;
      //alert("promotionId = " + promotionId + ", customerTypeId = " + customerTypeId);
      RefreshProductList("","","","",catalogOrderId === undefined ? 0 : catalogOrderId,
      catalogCompanyId,companyCode,
      catalogLocationId === undefined ? 0 : catalogLocationId ,
      catalogName,
      '','',promotionId,customerTypeId,1,itemPerPage,searchText,'','','query')
    }
    const FilterCategory = async (categoty) => 
    {
      
      //alert("categoty = " + categoty);

      var customerTypeId = sessionStorage.getItem('customerTypeId') ? Number(sessionStorage.getItem('customerTypeId')) : 9;//Default Customer
      var promotionId = sessionStorage.getItem('promotionId') ? Number(sessionStorage.getItem('promotionId')) : 0;
      //alert("promotionId = " + promotionId + ", customerTypeId = " + customerTypeId);
      RefreshProductList("","","","",catalogOrderId === undefined ? 0 : catalogOrderId,
      catalogCompanyId,companyCode,
      catalogLocationId === undefined ? 0 : catalogLocationId ,
      catalogName,
      '','',promotionId,customerTypeId,1,itemPerPage,'',categoty,'','category')
    }
    const FilterProduct = async (category,product) => 
    {
      
      var customerTypeId = sessionStorage.getItem('customerTypeId') ? Number(sessionStorage.getItem('customerTypeId')) : 9;//Default Customer
      var promotionId = sessionStorage.getItem('promotionId') ? Number(sessionStorage.getItem('promotionId')) : 0;
      //alert("promotionId = " + promotionId + ", customerTypeId = " + customerTypeId);
      RefreshProductList("","","","",catalogOrderId === undefined ? 0 : catalogOrderId,
      catalogCompanyId,companyCode,
      catalogLocationId === undefined ? 0 : catalogLocationId ,
      catalogName,
      '','',promotionId,customerTypeId,1,itemPerPage,'',category,product,'product')
    }
    const RefreshProductList = async (liffId, lineUserId, linePOSId, groupId, orderId,companyId,companyCode,locationId,catalogName,companyName, locationName, promotionId,customerTypeId,page,itemPerPage,query,category,product,refreshMode) =>
    {
      setLoading(true);
      
      query = query === undefined ? 'null' : query;
      category = category === undefined ? 'null' : category;
      product = product === undefined ? 'null' : product;
      //alert("page = " + page);
      const products = await ProductServices.fetchRefreshCoinPOSProductService({
        liffId,
        lineUserId,
        linePOSId,
        groupId,
        orderId,
        companyId,
        companyCode,
        locationId,
        companyName,

        locationName,
        catalogName:catalogName,
        promotionId,customerTypeId,page,itemPerPage,query:query,category,product
      });

      
      currentPage = products.currentPage;
      countPage = products.countPage;
      var productVariants = [];//products.productVariantPresenters;
      if(products !== undefined)
      {
        if(products.productVariantPresenters !== undefined)
        {
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
            productItem['type'] = 'W';
            productItem['sku'] = products.productVariantPresenters[i].SKU;
            productItem['discount'] = 0;
            productItem['description'] = products.productVariantPresenters[i].Description;
            productItem['currencySign'] = products.currencySign;


            productVariants.push(productItem);
          }
        }

        if(refreshMode === 'category')
        {
          setProductListHeader('???????????????????????????????????? ?????????????????????????????? "' + products.categoryName + '"');
        }
        else if(refreshMode === 'product')
        {
          setProductListHeader('???????????????????????????????????? ????????????????????? "' + products.productName + '"');
        }
        else if(refreshMode === 'query')
        {
          setProductListHeader('???????????????????????????????????? ?????????????????????????????? "' + query + '"');
        }
        else
        {
          setProductListHeader('??????????????????????????????????????? ?????????????????????????????????????????????????????????????????????');
        }
      }
      
      

      pagingManager();
      setProductList(productVariants);




      setLoading(false);
    }

    const pagingManager = (currentPage,countPage) =>
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
          indents.push(<button onClick={()=>RefreshProductList("","","","",catalogOrderId,catalogCompanyId,companyCode,catalogLocationId,
            catalogName,'','',0,9,startPage-1,30,'','','')} className="hover:text-red-600 text-red-400 text-lg cursor-pointer px-2">
              ????????????????????????
            </button>);
        }
        else
        {
          indents.push(
            <button className="text-gray-400 text-lg px-2" disabled>????????????????????????</button>
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
            indents.push(<button onClick={()=>RefreshProductList("","","","",catalogOrderId,catalogCompanyId,companyCode,catalogLocationId,
              catalogName,'','',0,9,i,30,'','','')} className="hover:text-red-600 text-red-400 text-lg cursor-pointer px-2">
            {i}
          </button>);
          }
          
        }

        if(endPage > allPage)
        {
          indents.push(<button className="text-gray-400 text-lg px-2" disabled>???????????????</button>);
          
        }
        else
        {
          if(endPage === allPage)
          {
            indents.push(<button className="text-gray-400 text-lg px-2" disabled>???????????????</button>);
          }
          else
          {
            indents.push(<button onClick={()=>RefreshProductList("","","","",catalogOrderId,catalogCompanyId,companyCode,catalogLocationId,
              catalogName,'','',0,9,endPage+1,30,'','','')} className="hover:text-red-600 text-red-400 text-lg cursor-pointer px-2">
            ???????????????
          </button>)
          }
          
        }

        setPaging(indents);
    }
    
    const handleUpdateProfileClick = () =>
    {
      //alert("Footer Update profile click")
      //return;
      var userLocalJson = localStorage.getItem('userInfo');
      var userLocal = JSON.parse(userLocalJson)
      //alert('catalogName = ' + catalogName);
      var target = 'update-profile';
      //alert('targetPage = ' + target);
      if (userLocal?.email) 
      {
        sessionStorage.setItem('catalogName',catalogName);
        router.push('/user/' + target);
      } 
      else 
      {
        sessionStorage.setItem('targetPage','/user/' + target);
        sessionStorage.setItem('catalogName',catalogName);
        setModalOpen(!modalOpen);
        //router.push('/user/' + targetPage);
      }
    }




    return (
        <>
        {modalOpen && (
          <LoginModal modalOpen={modalOpen} setModalOpen={setModalOpen} targetPage={targetPage} />
        )}
      <Layout title={title} description={description} dataPath={dataPath} companyName={companyName} locationName={locationName} companyLogo={companyLogo} 
      locationAddress1={locationAddress1} locationAddress2={locationAddress2} locationCity={locationCity}
      locationStateOrProvince={locationStateOrProvince} locationCountry={locationCountry} locationPostalCode={locationPostalCode}
      locationEmail={locationEmail} locationTel={locationTel} page='product'
      RefreshProductList={SearchProduct} 
      FilterProduct={FilterProduct} 
      updateProfileClick={handleUpdateProfileClick}>
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
                  ????????????????????????????????????????????????
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
                          <ProductCard key={product._id} product={product} liffId={""} lineUserId={""} companyCode={companyCode}
                          linePOSId={""} groupId={""} orderId={catalogOrderId} companyId={catalogCompanyId} locationId={catalogLocationId} pictureUrl={lineProfileImage} />
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
                  ?????????????????????????????????
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
                          <ProductCard key={product._id} product={product} liffId={""} lineUserId={""} companyCode={companyCode}
                          linePOSId={""} groupId={""} orderId={catalogOrderId} companyId={catalogCompanyId} locationId={catalogLocationId} pictureUrl={lineProfileImage} />
                        ))}
                      </div>
                    </div>
                  </div>
                )
              }
            
          </div>
          <div className="bg-white">
            <div className="mx-auto py-5 max-w-screen-2xl px-3 sm:px-10">
              {catalogPromotionId === 0 
              ?
                promotionLoading ?
                  <div className="bg-gray-100 lg:py-16 py-10">
                    <div className="mx-auto max-w-screen-2xl px-3 sm:px-10">
                    
                      <div className="mb-10 flex justify-center">
                        <div className="text-center w-full lg:w-2/5">
                          <Loading loading={promotionLoading} />
                          <p className="text-base font-sans text-gray-600 leading-6">
                          ????????????????????????????????????????????????????????? ??????????????????????????????????????????
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                
                :
                  <OfferCard promotions={promotions} selectedPromotion={promotionCode} companyId={catalogCompanyId} catalogName={catalogName} ApplyPromotionCode={ApplyPromotionCode} CancelPromotionCode={CancelPromotionCode}/>
                
                
                 
                
              :
                <div className="bg-orange-100 px-10 py-6 rounded-lg mt-6 lg:block">
                  <Banner promotionName={catalogPromotionName} discountPercentage={catalogDiscountPercentage} promotionIsAllProduct={catalogPromotionIsAllProduct} 
                      minimumAmount={catalogMinimumAmount} currencySign={currencySign} productType={catalogProductType}/>
                </div>
                  /* <div className="bg-orange-100 px-10 py-6 rounded-lg mt-6 hidden lg:block">
                      <Banner promotionName={catalogPromotionName} discountPercentage={catalogDiscountPercentage} promotionIsAllProduct={catalogPromotionIsAllProduct} 
                      minimumAmount={catalogMinimumAmount} currencySign={currencySign} productType={catalogProductType}/>
                    </div> */}
              {/* <div className="flex w-full"> */}
                {/* {dataPath} */}
                
                
                {/* <div className="grid gap-4 mb-8 md:grid-cols-2 xl:grid-cols-2">
                  
                  <OfferCard promotions={promotions} companyId={catalogCompanyId} ApplyPromotionCode={ApplyPromotionCode}/>
                </div> */}
                {/* <div className="flex-shrink-0 xl:pr-6 lg:block w-full lg:w-3/5">
                  <MainCarousel />
                </div> */}
                {/* <div className="w-full lg:flex">
                  <OfferCard promotions={promotions} companyId={catalogCompanyId} ApplyPromotionCode={ApplyPromotionCode}/>
                </div> */}
              {/* </div> */}
              {/* <div className="bg-orange-100 px-10 py-6 rounded-lg mt-6 hidden lg:block">
                <Banner />
              </div> */}
            </div>
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
                    ????????????????????????????????????????????????????????? ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
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

          {/* promotional banner card */}
          {/* <div className="block mx-auto max-w-screen-2xl">
            <div className="mx-auto max-w-screen-2xl px-4 sm:px-10">
              <div className="flex w-full">
                  <div className="flex-shrink-0 xl:pr-6 lg:block w-full lg:w-3/5">
                    <MainCarousel />
                  </div>
                  <div className="w-full hidden lg:flex">
                    <OfferCard />
                  </div>
                </div>
                <div className="bg-orange-100 px-10 py-6 rounded-lg mt-6 hidden lg:block">
                  <Banner />
                </div>
            </div>
          </div> */}
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
                          <ProductCard key={product._id} product={product} liffId={""} lineUserId={""} 
                          linePOSId={""} groupId={""} orderId={catalogOrderId} companyId={catalogCompanyId} locationId={catalogLocationId} pictureUrl={lineProfileImage}  />
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
}

export const getServerSideProps = async ({req, res,params }) => {
    //var coinPOSLiffData = params.id;
    var dataParam = '';
    dataParam = params.id;
    var companyCode = params.name;
    var dataPath = companyCode + "/" + dataParam;
    var coinPOSData = req.url;
    var targetPage = '';

    var liffId = '';
    var liffOrderId = 0;
    var liffCompanyId = 0;
    var liffLocationId = 0;

    console.log('dataParam = ' + dataParam);
    //console.log('req.url = ' + req.url);

    if(coinPOSData.length > 0)
    {
      var parmsData = coinPOSData.split('?');
      if(parmsData.length > 1)
      {
        //const liffQuery = parmsData[1];

        var pathQuery = parmsData[1];
        var pathQueryData = pathQuery.split("&");
        for (var i=0;i<pathQueryData.length;i++)
        {
          var pair = pathQueryData[i].split("=");
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
          if(pathQueryData[0] === 'page')
          {
            targetPage = pathQueryData[1];
          
          }
        }
        
      }
    }


    var catalogName = '';
    if(dataParam.includes('liffId='))
    {
      catalogName = '';
      var liffData = dataParam.split("=");
      if(liffData.length > 1)
      {
        liffId = liffData[1];
      }
    }
    else
    {
      catalogName = dataParam;
    }

    
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

    var lineUserId = "";
    var linePOSId = "";
    var groupId = "";
    var orderId = 0;
    var companyId = 0;
    var locationId = 0;


    var liffEndpoint = await  UserServices.fetchGetLiffURLTemplate();
  
  const products = await ProductServices.fetchGetDefaultDataCompany({
  //const products = await ProductServices.getCoinPOSProductService({
    liffId,
    lineUserId,
    linePOSId,
    groupId,
    orderId,
    companyId,locationId,
    companyName,
    locationName,
    catalogName,
    companyCode,
    promotionId,customerTypeId,page,itemPerPage,query,category,product
  });

  /*var productVariants = [];//products.productVariantPresenters;
  var productCategories = [];

  if(products.productVariantPresenters !== null)
  {
    for(var i = 0;i < products.productVariantPresenters.length; i++)
    {
      var productItem = {};
      productItem['_id'] = Number(products.productVariantPresenters[i].ProductVariantId);
      productItem['title'] = products.productVariantPresenters[i].Name;
      productItem['quantity'] = products.productVariantPresenters[i].StockLevel;
      productItem['image'] = products.productVariantPresenters[i].ImageUrl;
      productItem['unit'] = products.productVariantPresenters[i].UPC;
      productItem['slug'] = products.productVariantPresenters[i].UPC;
      productItem['originalPrice'] = products.productVariantPresenters[i].Price;
      productItem['price'] = products.productVariantPresenters[i].Price;
      productItem['type'] = 'W';
      productItem['sku'] = products.productVariantPresenters[i].SKU;
      productItem['discount'] = 0;
      productItem['description'] = products.productVariantPresenters[i].Description;
      productItem['currencySign'] = products.currencySign;
      


      productVariants.push(productItem);
    }
  }
  

  if(products.productCategoryPresenters !== null)
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
  }*/
  

  /* for(var i = 0;i < products.productCategoryPresenters.length; i++)
  {
    var productItem = {};
    productItem['_id'] = Number(products.productVariantPresenters[i].ProductVariantId);
    productItem['title'] = products.productVariantPresenters[i].Name;
    productItem['quantity'] = products.productVariantPresenters[i].StockLevel;
    productItem['image'] = products.productVariantPresenters[i].ImageUrl;
    productItem['unit'] = products.productVariantPresenters[i].UPC;
    productItem['slug'] = products.productVariantPresenters[i].UPC;
    productItem['originalPrice'] = products.productVariantPresenters[i].Price;
    productItem['price'] = products.productVariantPresenters[i].Price;
    productItem['type'] = '';
    productItem['sku'] = products.productVariantPresenters[i].SKU;
    productItem['discount'] = 0;
    productItem['description'] = products.productVariantPresenters[i].Description;
    productItem['currencySign'] = products.currencySign;
    


    productVariants.push(productItem);
  } */
  
  /*var orderData = {};
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
  }*/

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

  var catalogCompanyId = products.companyId;
  var catalogLocationId = products.locationId;

  var catalogLiffId = products.locationLiff;
  
  //products.locationLiff;

  
  companyName = products.companyName;
  locationName = products.locationName;
  companyCode = products.companyCode;

    return {
      props: { 
        params: dataParam,
        targetPage:targetPage,
        companyCode:companyCode,
        dataPath:dataPath,
        title:title,
        description:description,
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
        catalogCompanyId:catalogCompanyId,
        catalogName:catalogName,
        catalogLocationId:catalogLocationId,
        catalogOrderId:0,

        liffEndpoint:liffEndpoint,
        catalogLiffId:catalogLiffId,

        liffData:liffId,
        linePOSIdData:linePOSId,
        groupIdData:groupId,
        liffOrderId:liffOrderId,
        liffCompanyId:liffCompanyId,
        liffLocationId:liffLocationId,

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


export default Catalog;