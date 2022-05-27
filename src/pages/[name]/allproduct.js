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
const AllProduct = () => {
   
    const {
      couponInfo,
      couponRef,
      setCouponData,
      clearCouponData,
      discountAmount,
      
    } = useCheckoutSubmit();
    
    
    const [modalOpen, setModalOpen] = useState(false);
    
    const router = useRouter();
    const { query } = useRouter();
    
    const [companyId, setCompanyId] = useState(0);
    const [locationId, setLocationId] = useState(0);
    const [orderId, setOrderId] = useState(0);

    const [loading, setLoading] = useState(true);

    
    const [promotionLoading, setPromotionLoading] = useState(true);

    const [productList, setProductList] = useState([]);
    const [pagingIndent, setPaging] = useState([]);
    const [discountDataDetails,setDiscountDetail] = useState('');

    const [catalogPromotionId,setCatalogPromotionId] = useState(0);
    const [promotionCode,setPromotionCode] = useState('');
    const [catalogPromotionName,setCatalogPromotionName] = useState('');
    const [catalogDiscountPercentage,setCatalogDiscountPercentage] = useState(0);
    const [catalogPromotionIsAllProduct,setCatalogPromotionIsAllProduct] = useState(false);
    const [catalogMinimumAmount,setCatalogMinimumAmount] = useState(0);
    const [catalogProductType,setCatalogProductType] = useState('');

    const [isCatalogPromotion,setIsCatalogPromotion] = useState(false);
    
    const [productListHeader, setProductListHeader] = useState('สินค้าทั้งหมด สำหรับการช็อปปิ้งของคุณ');
    const [companyName, setCompanyName] = useState('');
    const [companyCode, setCompanyCode] = useState('');

    const [catalogName, setCatalogName] = useState('');

    const [title, setTitle] = useState('สินค้าทั้งหมด');
    const [description, setDescription] = useState('รายการสินค้า');

    const [dataPath,setDataPath] = useState('');

    const [companyLogo, setCompanyLogo] = useState('');

    const [locationName, setLocationName] = useState('');
  const [locationAddress1, setLocationAddress1] = useState('');
  const [locationAddress2, setLocationAddress2] = useState('');
  const [locationCity, setLocationCity] = useState('');
  const [locationStateOrProvince, setLocationStateOrProvince] = useState('');
  const [locationCountry, setLocationCountry] = useState('');
  const [locationPostalCode, setLocationPostalCode] = useState('');
  const [locationEmail, setLocationEmail] = useState('');
  const [locationTel, setLocationTel] = useState('');

  const [currencySign, setCurrencySign] = useState('');

  const [promotions, setPromotions] = useState([]);
  const [currentPage,setCurrentPage] = useState(0);
  const [countPage,setCountPage] = useState(0);
  const [lineProfileImage, setProfileImage] = useState('');

  

    const { setItems,clearCartMetadata,emptyCart, addItem, items } = useCart();
    
    const { handleSubmit, submitHandler,lineSignInManager, register, errors } =
          useLoginSubmit();
    
    const router1 = useRouter();
    useEffect(async () => {
      //const {query} = this.props.router;
      var q = query.q;
      var p = router.query.p;
      //var c = router.query.c;
      

      //const {category} = query;
      //alert(JSON.stringify(router1.query));
      //alert('q = ' + q);
      //alert('Product = ' + p);
        var companyId = 0;
        var locationId = 0;
        var companyCode = '';
        var catalogName = '';

        var companyName = '';
        var locationName = '';
        if(sessionStorage.getItem('companyId'))
        {
            var lineCompanyIdData = sessionStorage.getItem('companyId');
            companyId = lineCompanyIdData;
            setCompanyId(lineCompanyIdData);
        }
        if(sessionStorage.getItem('locationId'))
        {
          var locationIdData = sessionStorage.getItem('locationId'); 
          locationId = locationIdData;
          setLocationId(locationIdData);
        }
        if(sessionStorage.getItem('companyName'))
        {
        
            var companyNameData = sessionStorage.getItem('companyName'); 
            companyName = companyNameData;
            setCompanyName(companyNameData);
        }
        if(sessionStorage.getItem('locationName'))
        {
            var locationNameData = sessionStorage.getItem('locationName'); 
            locationName = locationNameData;
            setLocationName(locationNameData);
        }
        if(sessionStorage.getItem('companyCode'))
        {
          var companyCodeData = sessionStorage.getItem('companyCode'); 
          companyCode = companyCodeData;
          setCompanyCode(companyCodeData);
        }
        if(sessionStorage.getItem('catalogName'))
        {
            var catalogNameData = sessionStorage.getItem('catalogName'); 
            catalogName = catalogNameData;
            setCatalogName(catalogNameData);      
        }
        if(sessionStorage.getItem('liffOrderId'))
        {
            var liffOrderIdData = sessionStorage.getItem('liffOrderId'); 
            setOrderId(liffOrderIdData);      
        }
        if(sessionStorage.getItem('promotions'))
        {
            var promotionsData = sessionStorage.getItem('promotions'); 
            //alert('promotionsData = ' + promotionsData);
            setPromotions(promotionsData);      
        }
      
        if(sessionStorage.getItem('dataPath'))
        {
            var dataPathData = sessionStorage.getItem('dataPath');
            
            //alert('dataPathData = ' + dataPathData)
            setDataPath(dataPathData);
                
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
        if(sessionStorage.getItem('currencySign'))
        {
            var currencySignData = sessionStorage.getItem('currencySign'); 
            setCurrencySign(currencySignData);
            
        }
        await GetProductData('','','','',0,companyId,locationId,companyName,locationName,companyCode,catalogName,0,9,1,itemPerPage,q,'',p);

        setLoading(false);
        setPromotionLoading(false);
    }, [])

    
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
      if(product === 'all')
      {
        product = '';
        category = '';
        query = '';
      }
      const products = await ProductServices.fetchGetCoinPOSProductService({
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
      
      

      setCurrentPage(products.currentPage);
      setCountPage(products.countPage);
      var currentPage = products.currentPage;
      var countPage = products.countPage;

      var productVariants = [];//products.productVariantPresenters;
      
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
  
      
      

      
      pagingManager(currentPage,countPage);
      
      setProductList(productVariants);

      
      if(category !== undefined)
      {
        setProductListHeader('รายการสินค้า ในหมวดหมู่ "' + category + '"');
      }
      if(product !== undefined)
      {
        setProductListHeader('รายการสินค้า ในกลุ่ม "' + product + '"');
      }
      if(query !== undefined)
      {
        setProductListHeader('รายการสินค้า ค้นหาโดยคำ "' + query + '"');
      }
      else
      {
        setProductListHeader('สินค้าทั้งหมด สำหรับการช็อปปิ้งของคุณ');
      }

    

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
      RefreshProductList("","","","",orderId === undefined ? 0 : orderId,
      companyId,companyCode,
      locationId === undefined ? 0 : locationId ,
      catalogName,
      '','',promotionId,customerTypeId,1,itemPerPage,searchText,'','','query')
    }
    const FilterCategory = async (categoty) => 
    {
      
      //alert("categoty = " + categoty);

      var customerTypeId = sessionStorage.getItem('customerTypeId') ? Number(sessionStorage.getItem('customerTypeId')) : 9;//Default Customer
      var promotionId = sessionStorage.getItem('promotionId') ? Number(sessionStorage.getItem('promotionId')) : 0;
      //alert("promotionId = " + promotionId + ", customerTypeId = " + customerTypeId);
      RefreshProductList("","","","",orderId === undefined ? 0 : orderId,
      companyId,companyCode,
      catalogLocationId === undefined ? 0 : catalogLocationId ,
      catalogName,
      '','',promotionId,customerTypeId,1,itemPerPage,'',categoty,'','category')
    }
    const FilterProduct = async (category,product) => 
    {
      //alert("category = " + category + " product = " + product);
      //return;
      var customerTypeId = sessionStorage.getItem('customerTypeId') ? Number(sessionStorage.getItem('customerTypeId')) : 9;//Default Customer
      var promotionId = sessionStorage.getItem('promotionId') ? Number(sessionStorage.getItem('promotionId')) : 0;
      //alert("promotionId = " + promotionId + ", customerTypeId = " + customerTypeId);
      
      if(category === 0 && product === 0)
      {
        RefreshProductList("","","","",orderId === undefined ? 0 : orderId,
          companyId,companyCode,
          locationId === undefined ? 0 : locationId ,
          catalogName,
          '','',promotionId,customerTypeId,1,itemPerPage,'',category,product,'all')
      }
      else
      {
        RefreshProductList("","","","",orderId === undefined ? 0 : orderId,
          companyId,companyCode,
          locationId === undefined ? 0 : locationId ,
          catalogName,
          '','',promotionId,customerTypeId,1,itemPerPage,'',category,product,'product')
      }
      
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
          indents.push(<button onClick={()=>RefreshProductList("","","","",orderId,companyId,companyCode,locationId,
            catalogName,'','',0,9,startPage-1,30,'','','')} className="hover:text-red-600 text-red-400 text-lg cursor-pointer px-2">
              ย้อนกลับ
            </button>);
        }
        else
        {
          indents.push(
            <button className="text-gray-400 text-lg px-2" disabled>ย้อนกลับ</button>
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
            indents.push(<button onClick={()=>RefreshProductList("","","","",orderId,companyId,companyCode,locationId,
              catalogName,'','',0,9,i,30,'','','')} className="hover:text-red-600 text-red-400 text-lg cursor-pointer px-2">
            {i}
          </button>);
          }
          
        }

        if(endPage > allPage)
        {
          indents.push(<button className="text-gray-400 text-lg px-2" disabled>ถัดไป</button>);
          
        }
        else
        {
          if(endPage === allPage)
          {
            indents.push(<button className="text-gray-400 text-lg px-2" disabled>ถัดไป</button>);
          }
          else
          {
            indents.push(<button onClick={()=>RefreshProductList("","","","",orderId,companyId,companyCode,locationId,
              catalogName,'','',0,9,endPage+1,30,'','','')} className="hover:text-red-600 text-red-400 text-lg cursor-pointer px-2">
            ถัดไป
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
      locationEmail={locationEmail} locationTel={locationTel} page='allproduct'
      RefreshProductList={SearchProduct} 
      FilterProduct={FilterProduct} 
      updateProfileClick={handleUpdateProfileClick}>
        <div className="min-h-screen">
          <StickyCart discountDetails={discountDataDetails} currencySign={currencySign}/>
          

          
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

          {/* popular products */}
          <div className="bg-gray-50 lg:py-16 py-10 mx-auto max-w-screen-2xl px-3 sm:px-10">
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
                          <ProductCard key={product._id} product={product} liffId={""} lineUserId={""} companyCode={companyCode}
                          linePOSId={""} groupId={""} orderId={orderId} companyId={companyId} locationId={locationId} pictureUrl={lineProfileImage}  />
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
            
          </div>

          {/* promotional banner card */}
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
                          กำลังปรับปรุงส่วนลด กรุณารอสักครู่
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                
                :
                  <OfferCard promotions={promotions} selectedPromotion={promotionCode} companyId={companyId} catalogName={catalogName} ApplyPromotionCode={ApplyPromotionCode} CancelPromotionCode={CancelPromotionCode}/>
                
                
                 
                
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


export default AllProduct;