import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { FiChevronRight } from 'react-icons/fi';
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  RedditIcon,
  RedditShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'react-share';

//internal import
import Layout from '@layout/Layout';
import Tags from '@component/common/Tags';
import Stock from '@component/common/Stock';
import Price from '@component/common/Price';
import Card from '@component/slug-card/Card';
import useAddToCart from '@hooks/useAddToCart';
import Discount from '@component/common/Discount';
import ProductServices from '@services/ProductServices';
import ProductCard from '@component/product/ProductCard';
import { useEffect, useState } from 'react';
import { set } from 'react-hook-form';
import Loading from '@component/preloader/Loading';

import { IoBagAddSharp, IoAdd, IoRemove } from 'react-icons/io5';

import { useCart } from 'react-use-cart';

const ProductScreen = ({params}) => {//({ product, relatedProduct }) => {
  const slug = params.slug;
  const router = useRouter();
  //const { handleAddItem } = useAddToCart();
  const { items, addItem, updateItemQuantity, inCart } = useCart();

  


  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [companyId, setCompanyId] = useState(0);
  const [locationId, setLocationId] = useState(0);
  const [linePOSId, setLinePOSId] = useState('');
  const [lineUserId, setLineUserId] = useState('');
  const [groupId, setGroupId] = useState('');
  const [liffId, setLiffId] = useState('');
  const [pictureUrl, setPictureUrl] = useState('');
  const [customerId, setCustomerId] = useState(0);
  const [customerTypeId, setCustomerTypeId] = useState(0);
  const [promotionId, setPromotionId] = useState(0);

  const [companyCode, setCompanyCode] = useState('');

  const [dataPath, setDataPath] = useState('');
  const [catalogName, setCatalogName] = useState('');
  const [companyLogo, setCompanyLogo] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [locationName, setLocationName] = useState('');
  const [locationAddress1, setLocationAddress1] = useState('');
  const [locationAddress2, setLocationAddress2] = useState('');
  const [locationCity, setLocationCity] = useState('');
  const [locationStateOrProvince, setLocationStateOrProvince] = useState('');
  const [locationCountry, setLocationCountry] = useState('');
  const [locationPostalCode, setLocationPostalCode] = useState('');
  const [locationEmail, setLocationEmail] = useState('');
  const [locationTel, setLocationTel] = useState('');

  
  
  

  useEffect(async () => 
  {
    var dataPathData = '';
    var catalogNameData = '';
    var companyLogoData = '';
    var companyNameData = '';
    var locationNameData = '';
    var locationAddress1Data = '';
    var locationAddress2Data = '';
    var locationCityData = '';
    var locationStateOrProvinceData = '';
    var locationCountryData = '';
    var locationPostalCodeData = '';
    var locationEmailData = '';
    var locationTelData = '';
    var liffIdData = '';
    var linePOSIdData = '';
    var lineUserIdData = '';
    var companyIdData = 0;
    var companyCodeData = '';
    var locationIdData = 0;
    var groupIdData = '';
    var customerIdData = 0;
    var customerTypeIdData = 0;
    var promotionIdData = 0;

    setIsLoading(true);
    if(sessionStorage.getItem('dataPath'))
    {
      dataPathData = sessionStorage.getItem('dataPath'); 
      setDataPath(dataPathData)
        
    }


    if(sessionStorage.getItem('catalogName'))
    {
      catalogNameData = sessionStorage.getItem('catalogName'); 
      setCatalogName(catalogNameData);
            
    }
    if(sessionStorage.getItem('companyLogo'))
    {
      companyLogoData = sessionStorage.getItem('companyLogo'); 
      setCompanyLogo(companyLogoData);
    }
    if(sessionStorage.getItem('companyName'))
    {
      
      companyNameData = sessionStorage.getItem('companyName'); 
      setCompanyName(companyNameData);
    }
    if(sessionStorage.getItem('locationName'))
    {
      locationNameData = sessionStorage.getItem('locationName'); 
      setLocationName(locationNameData);
    }
    if(sessionStorage.getItem('locationAddress1'))
    {
      locationAddress1Data = sessionStorage.getItem('locationAddress1'); 
      setLocationAddress1(locationAddress1Data);
    }
    if(sessionStorage.getItem('locationAddress2'))
    {
      locationAddress2Data = sessionStorage.getItem('locationAddress2'); 
      setLocationAddress2(locationAddress2Data)
    }
    if(sessionStorage.getItem('locationCity'))
    {
      locationCityData = sessionStorage.getItem('locationCity'); 
      setLocationCity(locationCityData);
    }
    if(sessionStorage.getItem('locationStateOrProvince'))
    {
      locationStateOrProvinceData = sessionStorage.getItem('locationStateOrProvince'); 
      setLocationStateOrProvince(locationStateOrProvinceData);
    }
    if(sessionStorage.getItem('locationCountry'))
    {
      locationCountryData = sessionStorage.getItem('locationCountry'); 
      setLocationCountry(locationCountryData);
    }
    if(sessionStorage.getItem('locationPostalCode'))
    {
      locationPostalCodeData = sessionStorage.getItem('locationPostalCode'); 
      setLocationPostalCode(locationPostalCodeData);
    }
    if(sessionStorage.getItem('locationEmail'))
    {
      locationEmailData = sessionStorage.getItem('locationEmail'); 
      setLocationEmail(locationEmailData);
    }
    if(sessionStorage.getItem('locationTel'))
    {
      locationTelData = sessionStorage.getItem('locationTel'); 
      setLocationTel(locationTelData);
    }
        if(sessionStorage.getItem('liffId'))
        {
          
          liffIdData = sessionStorage.getItem('liffId'); 
          //alert("Liff id = " + liffId)
          setLiffId(liffIdData);
        }
        if(sessionStorage.getItem('linePOSId'))
        {
          linePOSIdData = sessionStorage.getItem('linePOSId'); 
          //alert("LinePOS id = " + linePOSId)
          setLinePOSId(linePOSIdData);
        }
        if(sessionStorage.getItem('lineUserId'))
        {
          lineUserIdData = sessionStorage.getItem('lineUserId'); 
          setLineUserId(lineUserIdData);
        }
        if(sessionStorage.getItem('companyId'))
        {
          companyIdData = sessionStorage.getItem('companyId'); 
          setCompanyId(companyIdData);
        }
        if(sessionStorage.getItem('companyCode'))
        {
          companyCodeData = sessionStorage.getItem('companyCode'); 
          setCompanyCode(companyCodeData);
        }
        if(sessionStorage.getItem('locationId'))
        {
          locationIdData = sessionStorage.getItem('locationId'); 
          setLocationId(locationIdData);
        }
        if(sessionStorage.getItem('groupId'))
        {
          groupIdData = sessionStorage.getItem('groupId'); 
          setGroupId(groupIdData);
        }

        if(sessionStorage.getItem('customerId'))
        {
          customerIdData = sessionStorage.getItem('customerId'); 
          //alert('customerId = ' + customerId);
          setCustomerId(customerIdData);       
        }
        if(sessionStorage.getItem('customerTypeId'))
        {
          customerTypeIdData = sessionStorage.getItem('customerTypeId'); 
          //alert('customerId = ' + customerId);
          setCustomerTypeId(customerTypeIdData)
        }

        if(sessionStorage.getItem('promotionId'))
        {
          promotionIdData = sessionStorage.getItem('promotionId'); 
          //alert("LinePOS id = " + linePOSId)
          setPromotionId(promotionIdData);
        }

        //alert("Slug = " + slug);
        const product = await ProductServices.fetchGetProductBySlug(
          {
            liffId:liffIdData === undefined ? "" : liffIdData,
            linePOSId:linePOSIdData === undefined ? "" : linePOSIdData,
            lineUserId:lineUserIdData === undefined ? "" : lineUserIdData,
            groupId:groupIdData === undefined ? "" : groupIdData,
            companyId:companyIdData === undefined ? 0 : companyIdData,
            locationId:locationIdData == undefined ? 0 : locationIdData,
            companyName:companyNameData === undefined ? '' : companyNameData,
            locationName:locationNameData === undefined ? '' : locationNameData,
            companyCode:companyCodeData === undefined ? '' : companyCodeData,
            catalogName:catalogNameData === undefined ? '' : catalogNameData,
            promotionId:promotionIdData === undefined ? 0 : promotionIdData,
            customerId:customerIdData === undefined ? 0 : customerIdData,
            customerTypeId:customerTypeIdData === undefined ? 0 : customerTypeIdData,
            slug:slug === undefined ? '' : slug
          });
        //alert(JSON.stringify(product));
        //alert(product);
        setProduct(product);
        var relatedProductVariants = [];//products.productVariantPresenters;
        if(product !== undefined)
        {
          if(product.relatedProductVariantPresenters !== undefined)
          {
            for(var i = 0;i < product.relatedProductVariantPresenters.length; i++)
            {
              var productItem = {};
              productItem['_id'] = Number(product.relatedProductVariantPresenters[i].ProductVariantId);
              productItem['title'] = product.relatedProductVariantPresenters[i].Name;
              productItem['quantity'] = product.relatedProductVariantPresenters[i].StockLevelDisplay;
              productItem['image'] = product.relatedProductVariantPresenters[i].ImageUrl;
              productItem['unit'] = product.relatedProductVariantPresenters[i].UPC;
              productItem['slug'] = product.relatedProductVariantPresenters[i].UPC;
              productItem['tag'] = product.relatedProductVariantPresenters[i].ProductId;
              productItem['originalPrice'] = product.relatedProductVariantPresenters[i].PriceDisplay;
              productItem['price'] = product.relatedProductVariantPresenters[i].PriceDisplay;
              productItem['type'] = 'W';
              productItem['sku'] = product.relatedProductVariantPresenters[i].SKU;
              productItem['discount'] = 0;
              productItem['description'] = product.relatedProductVariantPresenters[i].Description;
              productItem['currencySign'] = product.currencySign;


              relatedProductVariants.push(productItem);
            }
          }
        }
        setRelatedProduct(relatedProductVariants);

        setIsLoading(false);
  },[])
  //comment this when using getServerSideProps
  //if (router.isFallback) {
    //return <div>Loading...</div>;
  //}

  const checkItemInCart = (_id) => {
    var isInCart = false;
    for(var i = 0;i<items.length;i++)
    {
      var item = items[i];
      
      
      if(item !== null)
      {
        
        if(item.id === _id)
        {
          //alert("match");
          isInCart = true;
        }
        
      }
    }
    
    return isInCart;

  };

  const handleUpdateItem = async(item,_qty, _updateType) =>{
    updateItemQuantity(item.id,_qty);

    //alert("items count = " + items.length);
    if(_qty === 0)
    {
      if(liffId.length > 0)
      {
        removeCoinPOSCartDetail(item,liffId,linePOSId,orderId,pictureUrl);
      }
      
    }
    else
    {
      if(liffId.length > 0)
      {
        updateCoinPOSCartDetail(item, _qty,liffId, lineUserId, linePOSId, groupId, orderId, companyId, locationId, pictureUrl, _updateType)
      }
      
    }
    
  };

  const updateCoinPOSCartDetail = async(req, _qty,_liffId, _lineUserId, _linePOSId, _groupId, _orderId, _companyId, _locationId, _pictureUrl, _updateType) => 
  {
    var liffId = _liffId;
    var lineUserId = _lineUserId;
    var linePOSId = _linePOSId;
    var groupId = _groupId;
    var orderId = _orderId;
    var companyId = _companyId;
    var locationId = _locationId;
    var orderDetailId = 0;
    var quantity = _qty;
    var pvId = req.id;
    var updateType = _updateType;
    var pictureUrl = _pictureUrl;
    var userId = 1;


    const detail = await ProductServices.updateCoinPOSCartDetail({
      orderDetailId,
      userId,
      quantity,
      companyId,
      orderId,
      pvId,
      updateType,
      linePOSId,
      liffId,
      pictureUrl
    })
  };

  const handleAddItem = async (p) => {

    //alert("Add Item")
    
    if(liffId.length > 0) //liff
    {
      //alert("Liff");
      const newItem = {
        ...p,
        id: p._id,
      };
      //alert(p._id)
      addItem(newItem);
      if(liffId.length > 0)
      {
        AddProductToCart(p,liffId, lineUserId, linePOSId, groupId, orderId, companyId, locationId, pictureUrl);
      }
      
    }
    else//WebCatalog
    {
      //alert("Catalog");
      const newItem = {
        ...p,
        id: p._id,
      };
      //alert(p._id)
      addItem(newItem);
    }

    //alert("AddItem")
    if(sessionStorage.getItem('discountRate'))
      {
        
        var discountDetails = [];
        
        if(sessionStorage.getItem('discountDetails'))
        {
          var discountDetailsJson = sessionStorage.getItem('discountDetails'); 
          
          //alert("discountDetailsJson = " + discountDetailsJson);
          discountDetails = JSON.parse(discountDetailsJson) === null ? [] : JSON.parse(discountDetailsJson);
          
        }
        
        var isForAllProduct = true;
        if(sessionStorage.getItem('isForAllProduct'))
        {
          isForAllProduct = sessionStorage.getItem('isForAllProduct'); 
        }

        
        if(isForAllProduct === true)
        {
          //alert("Is For All = " + isForAllProduct);
          var discountRate = sessionStorage.getItem('discountRate'); 
            var discountDetail = {
              id: Number(p._id),
              discount:Number(p.price * discountRate),
              discountRate:Number(discountRate)
            }
            discountDetails.push(discountDetail);
        }
        else
        {
          //alert("Is For All = " + isForAllProduct);

          var isDiscount = false;
          //alert("Check Session");
          if(sessionStorage.getItem('promotionProductIdList'))
          {
            //alert("Found");
            var promotionmProductIdListJson = sessionStorage.getItem('promotionProductIdList');
            //alert("promotionmProductIdList = " + promotionmProductIdListJson);
            var promotionmProductIdList = JSON.parse(promotionmProductIdListJson);
            //alert("Parsed = " + promotionmProductIdList);
            if(promotionmProductIdList !== null)
            {
              for(var i = 0;i<promotionmProductIdList.length;i++)
              {
                //alert("Get Product Id at index = " + i);
                var promotionProductId = promotionmProductIdList[i];
                //alert("p.tag = " + JSON.stringify(p) + " promotionProductId = " + promotionProductId);

                if(Number(promotionProductId) === Number(p.tag))
                {
                  //alert("Discount")
                  isDiscount = true;
                }

              }
            }
            else
            {
              isDiscount = true;
            }
            
          }

          if(isDiscount === true)
          {
            
            var discountRate = sessionStorage.getItem('discountRate'); 
            var discountDetail = {
              id: Number(p._id),
              discount:Number(p.price * discountRate),
              discountRate:Number(discountRate)
            }
            //alert('discountDetails = ' + JSON.stringify(discountDetails))
            discountDetails.push(discountDetail);
          }
          else
          {
            
            var discountRate = sessionStorage.getItem('discountRate'); 
            var discountDetail = {
              id: Number(p._id),
              discount:Number(0),
              discountRate:Number(0)
            }
            discountDetails.push(discountDetail);
          }
        }

        
        
        
        sessionStorage.setItem('discountDetails', JSON.stringify(discountDetails));

      }
    
    
  };
  const AddProductToCart = async(req,_liffId, _lineUserId, _linePOSId, _groupId, _orderId, _companyId, _locationId, _pictureUrl) => 
  {
    var liffId = _liffId;
    var lineUserId = _lineUserId;
    var linePOSId = _linePOSId;
    var groupId = _groupId;
    var orderId = _orderId;
    var companyId = _companyId;
    var locationId = _locationId;
    var pictureUrl = _pictureUrl;

    var pvId = req._id;

    var promotionCode = ''
    if(sessionStorage.getItem('promotionCode'))
    {
      promotionCode = sessionStorage.getItem('promotionCode');
    }
    //alert(promotionCode);
    //alert("liffId = " + liffId + " lineUserId = " + lineUserId + " OrderId = " + orderId)
    const products = await ProductServices.addToCoinPOSCart({
      orderId,
      pvId,
      companyId,locationId,
      lineUserId,
      linePOSId,
      groupId,
      liffId,
      pictureUrl,
      promotionCode
    });
    //alert(products);
};

  return (
    <Layout title={product.title} description={product.description}
    dataPath={dataPath}
      companyName={companyName} locationName={locationName} companyLogo={companyLogo}  
      locationAddress1={locationAddress1} locationAddress2={locationAddress2} locationCity={locationCity}
      locationStateOrProvince={locationStateOrProvince} locationCountry={locationCountry} locationPostalCode={locationPostalCode}
      locationEmail={locationEmail} locationTel={locationTel}>
      <div className="px-0 py-10 lg:py-10">
        {
          isLoading === true
          ?
            <Loading loading={isLoading} ></Loading>
          :
            <div className="mx-auto px-3 lg:px-10 max-w-screen-2xl">
              <div className="flex items-center pb-4">
                <ol className="flex items-center w-full overflow-hidden font-serif">
                  <li className="text-sm pr-1 transition duration-200 ease-in cursor-pointer hover:text-emerald-500 font-semibold">
                    <Link href={"/" + dataPath}>
                      <a>Home</a>
                    </Link>
                  </li>
                  <li className="text-sm mt-[1px]">
                    {' '}
                    <FiChevronRight />{' '}
                  </li>
                  <li className="text-sm pl-1 transition duration-200 ease-in cursor-pointer hover:text-emerald-500 font-semibold ">
                    <Link
                      href={`/search?category=${product.category
                        .toLowerCase()
                        .replace('&', '')
                        .split(' ')
                        .join('-')}`}
                    >
                    
                      <a>{product.category}</a>
                    </Link>
                  </li>
                  <li className="text-sm mt-[1px]">
                    {' '}
                    <FiChevronRight />{' '}
                  </li>
                  <li className="text-sm px-1 transition duration-200 ease-in ">
                    {product.title}
                  </li>
                </ol>
              </div>
              <div className="w-full rounded-lg p-3 lg:p-12 bg-white">
                <div className="flex flex-col xl:flex-row">
                  <div className="flex-shrink-0 xl:pr-10 lg:block w-full mx-auto md:w-6/12 lg:w-5/12 xl:w-4/12">
                    {/* <Discount product={product} slug={true} /> */}
                    {product === null || product === undefined 
                    ?
                      <></>
                    :
                    product.image === null || product.image === undefined || product.image === ''
                    ?
                      <></>
                    :
                      <Image
                        src={product.image}
                        alt={product.title}
                        layout="responsive"
                        width={650}
                        height={650}
                        priority
                      ></Image>
                    }
                    
                  </div>
                  <div className="w-full">
                    <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row">
                      <div className="w-full md:w-7/12 md:pr-4 lg:pr-4 xl:pr-12">
                        <div className="mb-6">
                          <h1 className="leading-7 text-lg md:text-xl lg:text-2xl mb-1 font-semibold font-serif text-gray-800">
                            {product.title}
                          </h1>
                          <p className="uppercase font-serif font-medium text-gray-500 text-sm">
                            SKU :{' '}
                            <span className="font-bold text-gray-600">
                              {product.sku
                                ? product.sku
                                : product._id//.substring(18, 24)
                                }
                            </span>
                          </p>
                        </div>
                        <Price product={product} />
                        <div className="mb-4 md:mb-5 block">
                          <Stock product={product} />
                        </div>
                        <div>
                          <p className="text-sm leading-6 text-gray-500 md:leading-7">
                            {product.description}
                          </p>
                          {/* <button
                            onClick={() => handleAddItem(product)}
                            className="leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold text-center justify-center border-0 border-transparent rounded-md placeholder-white focus-visible:outline-none focus:outline-none bg-emerald-500 text-white px-5 md:px-6 lg:px-8 py-3 md:py-3.5 lg:py-3 mt-6 hover:text-white hover:bg-emerald-600 h-12 text-sm lg:text-base w-full sm:w-auto"
                          >
                            Add to Cart
                          </button> */}
                          {checkItemInCart(product._id) ? (
                            <div>
                              {items.map(
                                (item) =>
                                  item.id === product._id 
                                  ? 
                                  (
                                    <div
                                      key={item.id}
                                      className="w-56 group flex items-center justify-between rounded-md overflow-hidden flex-shrink-0 border h-11 md:h-12 border-gray-300 bg-cyan-500 text-white"
                                    >
                                      <button
                                        onClick={() =>
                                          handleUpdateItem(item, item.quantity - 1,'Dec')
                                        }
                                        className="flex items-center justify-center flex-shrink-0 h-full transition ease-in-out duration-300 focus:outline-none w-8 md:w-12 text-heading border-e border-gray-300 hover:text-gray-500"
                                      >
                                        <span className="text-dark text-base">
                                          <IoRemove />
                                        </span>
                                      </button>
                                      <p className="text-sm text-dark px-1 font-serif font-semibold">
                                        {item.quantity}
                                      </p>
                                      <button
                                        onClick={() =>
                                          handleUpdateItem(item, item.quantity + 1, 'Inc')
                                        }
                                        disabled={product.quantity === item.quantity}
                                        className="flex items-center justify-center flex-shrink-0 h-full transition ease-in-out duration-300 focus:outline-none w-8 md:w-12 text-heading border-e border-gray-300 hover:text-gray-500"
                                      >
                                        <span className="text-dark text-base">
                                          <IoAdd />
                                        </span>
                                      </button>
                                    </div>
                                  )
                                  :
                                  <></>
                                  
                              )}{' '}
                            </div>
                          ) : (
                            <button
                              onClick={() => handleAddItem(product)}
                              className="leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold text-center justify-center border-0 border-transparent rounded-md placeholder-white focus-visible:outline-none focus:outline-none bg-emerald-500 text-white px-5 md:px-6 lg:px-8 py-3 md:py-3.5 lg:py-3 mt-6 hover:text-white hover:bg-emerald-600 h-12 text-sm lg:text-base w-full sm:w-auto"
                            >
                              Add to Cart
                            </button>
                          )}

                          <div className="flex flex-col mt-4">
                            <span className="font-serif font-semibold py-1 text-sm d-block">
                              <span className="text-gray-700">Category:</span>{' '}
                              <span className="text-gray-500">
                                {product.category}
                              </span>
                            </span>
                            {/* <Tags product={product} /> */}
                          </div>

                          {/* social share */}
                          {/* <div className="mt-8">
                            <h3 className="text-base font-semibold mb-1 font-serif">
                              Share your social network
                            </h3>
                            <p className="font-sans text-sm text-gray-500">
                              For get lots of traffic from social network share this
                              product
                            </p>
                            <ul className="flex mt-4">
                              <li className="flex items-center text-center border border-gray-100 rounded-full hover:bg-emerald-500  mr-2 transition ease-in-out duration-500">
                                <FacebookShareButton
                                  url={`https://supermarket-plum.vercel.app/product/${router.query.slug}`}
                                  quote="KachaBazar"
                                >
                                  <FacebookIcon size={32} round />
                                </FacebookShareButton>
                              </li>
                              <li className="flex items-center text-center border border-gray-100 rounded-full hover:bg-emerald-500  mr-2 transition ease-in-out duration-500">
                                <TwitterShareButton
                                  url={`https://supermarket-plum.vercel.app/product/${router.query.slug}`}
                                  quote="KachaBazar"
                                >
                                  <TwitterIcon size={32} round />
                                </TwitterShareButton>
                              </li>
                              <li className="flex items-center text-center border border-gray-100 rounded-full hover:bg-emerald-500  mr-2 transition ease-in-out duration-500">
                                <RedditShareButton
                                  url={`https://supermarket-plum.vercel.app/product/${router.query.slug}`}
                                  quote="KachaBazar"
                                >
                                  <RedditIcon size={32} round />
                                </RedditShareButton>
                              </li>
                              <li className="flex items-center text-center border border-gray-100 rounded-full hover:bg-emerald-500  mr-2 transition ease-in-out duration-500">
                                <WhatsappShareButton
                                  url={`https://supermarket-plum.vercel.app/product/${router.query.slug}`}
                                  quote="KachaBazar"
                                >
                                  <WhatsappIcon size={32} round />
                                </WhatsappShareButton>
                              </li>
                              <li className="flex items-center text-center border border-gray-100 rounded-full hover:bg-emerald-500  mr-2 transition ease-in-out duration-500">
                                <LinkedinShareButton
                                  url={`https://supermarket-plum.vercel.app/product/${router.query.slug}`}
                                  quote="KachaBazar"
                                >
                                  <LinkedinIcon size={32} round />
                                </LinkedinShareButton>
                              </li>
                            </ul>
                          </div> */}
                        </div>
                      </div>
                      <div className="w-full xl:w-5/12 lg:w-6/12 md:w-5/12">
                        <div className="mt-6 md:mt-0 lg:mt-0 bg-gray-50 border border-gray-100 p-4 lg:p-8 rounded-lg">
                          {/* <Card /> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* related products */}
              <div className="pt-10 lg:pt-20 lg:pb-10">
                <h3 className="leading-7 text-lg lg:text-xl mb-3 font-semibold font-serif hover:text-gray-600">
                  Related Products
                </h3>
                <div className="flex">
                  <div className="w-full">
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6 gap-2 md:gap-3 lg:gap-3">
                       {relatedProduct.map((product, i) => (
                        <ProductCard key={i + 1} product={product} />
                      ))
                      //JSON.stringify(relatedProduct)
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
        }
        
      </div>
    </Layout>
  );
};

//you can use getServerSideProps alternative for getStaticProps and getStaticPaths

// export const getServerSideProps = async (context) => {
//   const { slug } = context.params;
//   const products = await ProductServices.getShowingProducts();
//   const product = await ProductServices.getProductBySlug(slug);

//   let relatedProduct= [];
//   if (slug) {
//     const selectProduct = products.find((product) => product.slug === slug);
//     relatedProduct = products.filter(
//       (product) => product.children === selectProduct.children
//     );
//   }

//   return {
//     props: {
//       product,
//       relatedProduct,
//     },
//   };
// };

//use getStaticPaths and getStaticProps when in production this will make faster load data

 /*export const getStaticProps = async (context) => {
  const { slug } = context.params;
   const product = await ProductServices.fetchGetProductBySlug(slug);
  const products = await ProductServices.getShowingProducts();

  let relatedProduct = [];
  if (slug) {
    const selectProduct = products.find((product) => product.slug === slug);
    relatedProduct = products.filter(
      (product) => product.children === selectProduct.children
    );
  } 

  return {
    props: {
      slug:slug
    },
    revalidate: 60,
  };
};*/

export const getServerSideProps = ({ params }) => {
  return {
    props: { params },
  };
};

/*export const getStaticPaths = async () => {
  const products = await ProductServices.getShowingProducts();

  const paths = products.map((product) => ({
    params: { slug: product.slug },
  }));

  return { paths, fallback: true };
}; */

export default ProductScreen;
