import { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { IoClose } from 'react-icons/io5';

//internal import
import { pages } from '@utils/data';
import useAsync from '@hooks/useAsync';
import Loading from '@component/preloader/Loading';
import { SidebarContext } from '@context/SidebarContext';
import CategoryServices from '@services/CategoryServices';
import CategoryCard from '@component/category/CategoryCard';

import ProductServices from '@services/ProductServices';

const Category = ({companyLogo, companyName, dataPath,FilterProduct, page}) => {
  const { categoryDrawerOpen, closeCategoryDrawer } =
    useContext(SidebarContext);
  //  const { data, loading, error } = useAsync(() =>
  //   CategoryServices.getShowingCategory()
  // ); 

  const [categories,setCategoryList] = useState([]);
  const [companyCode,setCompanyCode] = useState('');
  const [catalogName,setCatalogName] = useState('');
  const [loading,setLoading] = useState(false); 
  
  var error = '';
  
  

  useEffect(async() => 
  {
    setLoading(true);
    //alert("categotyJson = " + categotyJson);
    if(sessionStorage.getItem('categories'))
    {
      //alert("Get Category");
      var categoriesJson = sessionStorage.getItem('categories'); 
      //alert("Get Category = " + categoriesJson);
      //console.log(categories);
      if(categoriesJson !== undefined && categoriesJson !== 'undefined')
      {
        try
        {
          var categoriesData = JSON.parse(categoriesJson);
          //alert(JSON.stringify(categoriesData));
          setCategoryList(categoriesData);
          
          setLoading(false);
          //alert(JSON.stringify(categoriesData))
        }
        catch(ex)
        {
          //alert("Catagory error : " + ex.message)
          
        }
        
      }
      else
      {
        
        //alert("no Get Category = " + categoriesJson);
        //alert('companyName = ' + companyName)
        
        var companyCodeData = '';
        var catalogNameData = '';
        if(sessionStorage.getItem('companyCode'))
        {
              
          companyCodeData = sessionStorage.getItem('companyCode');
          setCompanyCode(companyCodeData); 
        }

        if(sessionStorage.getItem('catalogName'))
        {
              
          catalogNameData = sessionStorage.getItem('catalogName');
          setCatalogName(catalogNameData); 
        }
        //alert('companyCodeData = ' + companyCodeData);
        //alert('catalogNameData = ' + catalogNameData);

        const productCategorys = await ProductServices.fetchGetProductCategoryService({
          companyCode,
          catalogName
          
        });
        //alert('category = ' + JSON.stringify(productCategorys))
        setLoading(false);
      }
      
    }
    else
    {
      //alert("Not Get Category");
      //alert('companyName = ' + companyName)
        
        var companyCodeData = '';
        var catalogNameData = '';
        if(sessionStorage.getItem('companyCode'))
        {
              
          companyCodeData = sessionStorage.getItem('companyCode');
          setCompanyCode(companyCodeData); 
        }

        if(sessionStorage.getItem('catalogName'))
        {
              
          catalogNameData = sessionStorage.getItem('catalogName');
          setCatalogName(catalogNameData); 
        }
        //alert('companyCodeData = ' + companyCodeData);
        //alert('catalogNameData = ' + catalogNameData);

        const productCategorys = await ProductServices.fetchGetProductCategoryService({
          companyCode:companyCodeData,
          catalogName:catalogNameData
          
        });
        //alert('category = ' + JSON.stringify(productCategorys))

        var productCategories = [];
        if(productCategorys.productCategoryPresenters !== undefined)
          {
            for(var j = 0;j < productCategorys.productCategoryPresenters.length; j++)
            {
    
            
              var nests = [];
              for(var k = 0;k < productCategorys.productCategoryPresenters[j].Products.length; k++)
              {
                var children = {};
                children['_id'] = Number(productCategorys.productCategoryPresenters[j].Products[k].ProductId);
                children['title'] = productCategorys.productCategoryPresenters[j].Products[k].Name;
                nests.push(children);
              }
              
    
              
              var productCategory = {};
              productCategory['_id'] = Number(productCategorys.productCategoryPresenters[j].CategoryId);
              productCategory['parent'] = productCategorys.productCategoryPresenters[j].Name;
              productCategory['icon'] = productCategorys.productCategoryPresenters[j].ImageUrl;
              productCategory['children'] = nests;
    
              productCategories.push(productCategory);
    
    
            }
          }
          sessionStorage.setItem('categories', JSON.stringify(productCategories));
          try
          {
            var categoriesData = productCategories;
            //alert(JSON.stringify(categoriesData));
            setCategoryList(categoriesData);
            
            setLoading(false);
            //alert(JSON.stringify(categoriesData))
          }
          catch(ex)
          {
            //alert("Catagory error : " + ex.message)
            
          }

        setLoading(false);
      setLoading(false);
    }

  },[]);
    

  return (
    <div className="flex flex-col w-full h-full bg-white cursor-pointer scrollbar-hide">
      {categoryDrawerOpen && (
        <div className="w-full flex justify-between items-center h-16 px-6 py-4 bg-cyan-500 text-white border-b border-gray-100">
          <h2 className="font-semibold font-serif text-lg m-0 text-heading flex align-center">
            <Link href={"/" + dataPath}>
              <a className="mr-4 inline-flex">
                {/* <Image
                  width={100}
                  height={38}
                  src="/logo/logo-light.svg"
                  alt="logo"
                /> */}
                <Image
                    width={38}
                    height={38}
                    
                    src={companyLogo === undefined ? 'https://coinpos-uat.azurewebsites.net/img/logo2.png' : companyLogo}
                    alt="logo"
                  />
                  <div className="ml-4 self-center">{companyName}</div>
                {/* <span className="flex" style={"heigth:38px"}>
                  <Image
                    width={38}
                    height={38}
                    
                    src={companyLogo === undefined ? 'https://coinpos-uat.azurewebsites.net/img/logo2.png' : companyLogo}
                    alt="logo"
                  />

                  <div className="relative ml-1 lg:ml-2 xl:ml-2 absolute inset-y-0.5 bottom-0 text-xl lg:text-2xl mt-4 mb-4 font-serif font-semibold text-white">{companyName}</div>
                      
                </span> */}
                
              </a>
            </Link>
          </h2>
          {/* <div className="relative ml-1 lg:ml-2 xl:ml-2 absolute inset-y-0.5 bottom-0 text-xl lg:text-2xl mt-4 mb-4 font-serif font-semibold text-white">{companyName}</div> */}
          <button
            onClick={closeCategoryDrawer}
            className="flex text-xl items-center justify-center w-8 h-8 rounded-full bg-gray-50 text-red-500 p-2 focus:outline-none transition-opacity hover:text-red-600"
            aria-label="close"
          >
            <IoClose />
          </button>
        </div>
      )}
      <div className="overflow-y-scroll scrollbar-hide w-full max-h-full">
        {categoryDrawerOpen && (
          <h2 className="font-semibold font-serif text-lg m-0 text-heading flex align-center border-b px-8 py-3">
            ?????????????????????????????????????????????
          </h2>
        )}
        {error ? (
          <p className="flex justify-center align-middle items-center m-auto text-xl text-red-500">
            <span> {error}</span>
          </p>
        ) : 
        //data.length === 0
        loading
        ?
          <Loading loading={loading} />
        :
        categories.length === 0 
        ? (
          <p className="inline-flex items-center justify-between ml-2 text-sm font-medium w-full hover:text-cyan-600">
            {"??????????????????????????????????????????????????????????????????????????? ??????????????????????????????????????? ????????????????????????????????????????????????????????????"}
          </p>
        ) 
        : 
        (
          <div className="relative grid gap-2 p-6">
            {categories?.map((category) => (
              //categories.map((category) => (
              
                //category._id
                <CategoryCard
                key={category._id}
                parentId={category._id}
                title={category.parent}
                icon={category.icon}
                nested={category.children}
                FilterProduct={FilterProduct}
                page={page}
              />
            ))}
          </div>
        )}

        {/* {categoryDrawerOpen && (
          <div className="relative grid gap-2 mt-5">
            <h3 className="font-semibold font-serif text-lg m-0 text-heading flex align-center border-b px-8 py-3">
              Pages
            </h3>
            <div className="relative grid gap-1 p-6">
              {pages.map((item) => (
                <a
                  key={item.title}
                  href={item.href}
                  className="p-2 flex font-serif items-center rounded-md hover:bg-gray-50 w-full hover:text-cyan-600"
                >
                  <item.icon
                    className="flex-shrink-0 h-4 w-4"
                    aria-hidden="true"
                  />
                  <p className="inline-flex items-center justify-between ml-2 text-sm font-medium w-full hover:text-cyan-600">
                    {item.title}
                  </p>
                </a>
              ))}
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default Category;
