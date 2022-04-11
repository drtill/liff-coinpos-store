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

const ProductScreen = ({params}) => {//({ product, relatedProduct }) => {
  const slug = params.slug;
  const router = useRouter();
  const { handleAddItem } = useAddToCart();

  


  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState({});
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

        alert("Slug = " + slug);
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
        alert(product);
        setProduct(product);

        setIsLoading(false);
  },[])
  //comment this when using getServerSideProps
  //if (router.isFallback) {
    //return <div>Loading...</div>;
  //}

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
                          <button
                            onClick={() => handleAddItem(product)}
                            className="leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold text-center justify-center border-0 border-transparent rounded-md placeholder-white focus-visible:outline-none focus:outline-none bg-emerald-500 text-white px-5 md:px-6 lg:px-8 py-3 md:py-3.5 lg:py-3 mt-6 hover:text-white hover:bg-emerald-600 h-12 text-sm lg:text-base w-full sm:w-auto"
                          >
                            Add to Cart
                          </button>

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
                          <div className="mt-8">
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
                          </div>
                        </div>
                      </div>
                      <div className="w-full xl:w-5/12 lg:w-6/12 md:w-5/12">
                        <div className="mt-6 md:mt-0 lg:mt-0 bg-gray-50 border border-gray-100 p-4 lg:p-8 rounded-lg">
                          <Card />
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
                      {/* {relatedProduct?.slice(1, 13).map((product, i) => (
                        <ProductCard key={i + 1} product={product} />
                      ))} */}
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
