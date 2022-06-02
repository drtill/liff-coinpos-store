import React, { useContext,useEffect } from 'react';
import { useState } from 'react'
import dynamic from 'next/dynamic';
//import { CardElement } from '@stripe/react-stripe-js';
import Link from 'next/link';
import {
  IoReturnUpBackOutline,
  IoArrowForward,
  IoBagHandle,
  IoWalletSharp,
  IoSaveOutline,
  IoCheckboxOutline,
  IoCloseCircleOutline,
  IoCreateOutline

} from 'react-icons/io5';
import { ImCreditCard,ImClearFormatting,ImFileEmpty } from 'react-icons/im';

import Loading from '@component/preloader/Loading';
//import { Combobox } from '@headlessui/react'
import Dropdown from 'react-dropdown';
//internal import
import Layout from '@layout/Layout';
import Label from '@component/form/Label';
import Error from '@component/form/Error';
import CartItem from '@component/cart/CartItem';
import InputArea from '@component/form/InputArea';
import CountryFormSelect from '@component/form/CountryFormSelect';
import ProvinceFormSelect from '@component/form/ProvinceFormSelect';
import CityFormSelect from '@component/form/CityFormSelect';
import DistrictFormSelect from '@component/form/DistrictFormSelect';
import ShippingFormSelect from '@component/form/ShippingFormSelect';
import InputShipping from '@component/form/InputShipping';
import InputPayment from '@component/form/InputPayment';
import useCheckoutSubmit from '@hooks/useCheckoutSubmit';
import BankTransferPayment from '@component/form/BankTransferPayment';
import QRPaymentPayment from '@component/form/QRPaymentPayment';

import { UserContext } from '@context/UserContext';

import {Form} from 'react-bootstrap';
import ProductServices from '@services/ProductServices';

//import EditableCustomerInput from '@component/form/EditableCustomerInput';

import Select from 'react-select'
/* import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
  ComboboxOptionText,
} from "@reach/combobox";
import "@reach/combobox/styles.css"; */

const Checkout = () => {
  const {
    handleSubmit,
    submitHandler,
    handleShippingCost,
    register,
    errors,
    showCard,
    setShowCard,
    error,
    //stripe,
    couponInfo,
    couponRef,
    handleCouponCode,
    discountAmount,
    shippingCost,
    total,
    isEmpty,
    items,
    cartTotal,
    isCheckoutSubmit,
    orderId,
    companyId,
    liffId,
    pictureUrl,
    setItems,
    handleShippingId,
    handleShippingName,
    setCouponData
  } = useCheckoutSubmit();

  const {dispatch} = useContext(UserContext);

  const options = [
    { value: 'chocolate1111', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]
  const [selectedOption,setSelectedOption]  = useState({});

  
  const [discountDetails, setDiscountDetail] = useState([]);
  const [totalDiscount, setTotalDiscount] = useState(0);

  const [customerInfoLoading, setCustomerInfoLoading] = useState(true);
  const [confirmOrderLoading, setConfirmOrderLoading] = useState(false);
  
  const [postalCodeLoading, setPostalCodeLoading] = useState(true);
  const [districtLoading, setDistrictLoading] = useState(true);
  const [cityLoading, setCityLoading] = useState(true);
  const [provinceLoading, setProvinceLoading] = useState(true);
  const [countryLoading, setCountryLoading] = useState(true);

  const [address1Loading, setAddress1Loading] = useState(true);
  

  const [catalogName, setCatalogName] = useState('');
  
  const [customerId, setCustomerId] = useState(0);

  

  const [companyName,setCompanyName] = useState('');
  const [dataPath,setDataPath] = useState('');


  /* useEffect(() => 
  {
    if(sessionStorage.getItem('discountDetails'))
    {
      var discountDetailsJson = sessionStorage.getItem('discountDetails'); 
      
      //alert(discountDetailsJson);
      var disDetailsData = JSON.parse(discountDetailsJson);
      setDiscountDetail(disDetailsData);
      if(disDetailsData !== null)
      {
        var totalDiscountData = disDetailsData.reduce((discountTotal, item) => (discountTotal += item.discount),0);
        setTotalDiscount(totalDiscountData);
        //setTotalDiscount(totalDiscountVal);
      }
    }

  }) */
  
  
      
  
  
  

  
  
  const [companyLogo, setCompanyLogo] = useState('');
  const [IsApproveCustomerInfo, setApproveCustomerInfo] = useState(false);
  const [IsEditCustomerInfo, setEditCustomerInfo] = useState(false);
  const [IsDisableCustomerInfo, setDisableCustomerInfo] = useState(true);
  const [customerAddressId, setCustomerAddressId] = useState(0);
  


  const [address1,setCustomerAddress] = useState('');

  const [allProvinces, setAllProvinces] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [countrys,setCountry] = useState([]);

  const [allCitys, setAllCitys] = useState([]);
  const [cities, setCities] = useState([]);

  const [allDistricts, setAllDistricts] = useState([]);
  const [districts, setDistricts] = useState([]);

  const [districtIdAndPostalCodes, setDistrictIdAndPostalCodes] = useState([]);
  
  const [postalcode, setPostalCode] = useState('');
  const [districtText, setDistrictText] = useState('');
  const [cityText, setCityText] = useState('');
  const [provinceText, setProvinceText] = useState('');
  const [changePostalcode, setChangePostalCode] = useState(false);
  const [shippingServices, setShippings] = useState([]);
  const [shippingIdAndCost, setShippingIdAndCost] = useState([]);

  const [countryLabel, setCountryLabel] = useState('Select Country');
  const [provinceLabel, setProvinceLabel] = useState('Select Province');
  const [cityLabel, setCityLabel] = useState('Select City');
  const [districtLabel, setDistrictLabel] = useState('Select District');

  const [isCountryEnable, setCountrySelectorEnable] = useState(false);
  const [isDistrictEnable, setDistrictSelectorEnable] = useState(false);
  const [isProvinceEnable, setProvinceSelectorEnable] = useState(false);
  const [isCityEnable, setCitySelectorEnable] = useState(false);
  const [isPostalCodeEnable, setPostalCodeEnable] = useState(false);




  const [countryId, setCountryId] = useState(0);
  const [cityId, setCityId] = useState(0);
  const [provinceId,setProvinceId] = useState(0);
  const [districtId,setDistrictId] = useState(0);

  const [defaultFirstName,setDefaultCustomerFirstName] = useState('');
  const [defaultLastName,setDefaultCustomerLastName] = useState('');
  const [defaultEmail,setDefaultCustomerEmail] = useState('');
  const [defaultPhoneNumber,setDefaultCustomerPhoneNumber] = useState('');
  const [defaultAddress1,setDefaultCustomerAddress] = useState('');

  const [defaultProvinces, setDefaultProvinces] = useState([]);
  const [defaultCountrys,setDefaultCountry] = useState([]);
  const [defaultCities, setDefaultCities] = useState([]);
  const [defaultDistricts, setDefaultDistricts] = useState([]);
  
  const [defaultCountryId, setDefaultCountryId] = useState(0);
  const [defaultCityId, setDefaultCityId] = useState(0);
  const [defaultProvinceId,setDefaultProvinceId] = useState(0);
  const [defaultDistrictId,setDefaultDistrictId] = useState(0);
  const [defaultPostalcode, setDefaultPostalCode] = useState('');

  
  const [defaultDistrictText, setDefaultDistrictText] = useState('');
  const [defaultCityText, setDefaultCityText] = useState('');
  const [defaultProvinceText, setDefaultProvinceText] = useState('');
  const [defaultCountryText, setDefaultCountryText] = useState('');

  const [defaultIsInputAddress,setDefaultIsInputAddress] = useState(false);

  const [qrShow, setQRShow] = useState(false);
  const [bankShow, setBankShow] = useState(false);
  const [qrUrl, setQRUrl] = useState('');

  const [isInputAddress, setIsInputAddress] = useState(false);

  const [firstNameError, setFirstNameError] = useState({});
  const [lastNameError, setLastNameError] = useState({});
  const [emailError, setEmailError] = useState({});
  const [contactError, setContactError] = useState({});

  const [countryError, setCountryError] = useState({});
  const [provinceError, setProvinceError] = useState({});
  const [cityError, setCityError] = useState({});
  const [districtError, setDistrictError] = useState({});
  const [address1Error, setAddress1Error] = useState({});
  const [postalCodeError, setPostalCodeError] = useState({});

  const [locationName, setLocationName] = useState('');
  const [locationAddress1, setLocationAddress1] = useState('');
  const [locationAddress2, setLocationAddress2] = useState('');
  const [locationCity, setLocationCity] = useState('');
  const [locationStateOrProvince, setLocationStateOrProvince] = useState('');
  const [locationCountry, setLocationCountry] = useState('');
  const [locationPostalCode, setLocationPostalCode] = useState('');
  const [locationEmail, setLocationEmail] = useState('');
  const [locationTel, setLocationTel] = useState('');

  const [salesOrderId, setSalesOrderId] = useState(0);
  const [lineLiffId, setLineLiffId] = useState('');
  const [lineUserId, setLineUserId] = useState('');
  const [linePOSId, setLinePOSId] = useState('');

  const [lineCompanyId, setLineCompanyId] = useState(0);

  const [firstName, setCustomerFirstName] = useState('');
  const [lastName, setCustomerLastName] = useState('');
  const [email, setCustomerEmail] = useState('');
  const [phoneNumber, setCustomerPhoneNumber] = useState('');
  
  const [customerAddress1, setCustomerAddress1] = useState('');

  const [shippingId, setShippingId] = useState(0);
  const [shippingLabel, setShippingLabel] = useState('Select Shipping');
  
  const [currencySign, setCurrencySign] = useState('');
  const [profileImageUrl, setProfileImage] = useState('');
  
  /* if(sessionStorage.getItem('countrys'))
  {
    var countrysJson = sessionStorage.getItem('countrys'); 
    //alert(countrysJson);
    countrys = JSON.parse(countrysJson);
    setCountrys(countrys)
  }
  if(sessionStorage.getItem('provinces'))
  {
    var provincesJson = sessionStorage.getItem('provinces'); 
    provinces = JSON.parse(provincesJson);
  }
  if(sessionStorage.getItem('cities'))
  {
    var citiesJson = sessionStorage.getItem('cities'); 
    cities = JSON.parse(citiesJson);
  }
  if(sessionStorage.getItem('districts'))
  {
    var districtsJson = sessionStorage.getItem('districts'); 
    districts = JSON.parse(districtsJson);
  } */

  useEffect(async() => 
  {

    var userLocalJson = localStorage.getItem('userInfo');
    if(userLocalJson)
    {
      var userLocal = JSON.parse(userLocalJson)
      dispatch({ type: 'USER_LOGIN', payload: userLocal });
    }
    

    var allAddressSelector = await ProductServices.fetchGetAddressSelectorInfo();
    
    var countryOptions = [];
      
    
    for(var i=0;i<allAddressSelector.countrys.length;i++)
    {
      var item = allAddressSelector.countrys[i];
      if(item !== undefined)
      {
        var countryName = item.countryLocalName;
        var countryId = item.countryId;
        countryOptions.push({ value: countryId, label: countryName })
      }
    }
    //alert("country = " + JSON.stringify(countryOptions));
    setCountry(countryOptions);

    var provinceOptions = [];
      
    for(var i=0;i<allAddressSelector.provinces.length;i++)
    {
      var item = allAddressSelector.provinces[i];
      if(item !== undefined)
      {
        var provinceName = item.Name_th;
        var id = item.Id;
        provinceOptions.push({ value: id, label: provinceName})
      }
    }
    //alert("provinceOptions = " + JSON.stringify(provinceOptions));
    setAllProvinces(provinceOptions);

    setProvinces(provinceOptions);

    var cityOptions = [];
      
    for(var i=0;i<allAddressSelector.cities.length;i++)
    {
      var item = allAddressSelector.cities[i];
      if(item !== undefined)
      {
        var cityName = item.Name_th;
        var id = item.Id;
        var provinceId = item.ProvinceId
        cityOptions.push({ value: id, label: cityName, provinceId: provinceId})
      }
    }
    //alert("cityOptions = " + JSON.stringify(cityOptions));
    setAllCitys(cityOptions);

    var districtOptions = [];
      
    for(var i=0;i<allAddressSelector.districts.length;i++)
    {
      var item = allAddressSelector.districts[i];
      if(item !== undefined)
      {
        var districtName = item.Name_th;
        var id = item.Id;
        var cityId = item.CityId
        var zipCode = item.ZipCode
        districtOptions.push({ value: id, label: districtName, cityId: cityId, zipCode: zipCode})
      }
    }
    //alert("districtOptions = " + JSON.stringify(districtOptions));
    setAllDistricts(districtOptions);



    setCustomerInfoLoading(true);
    setCountryLoading(true);
    setProvinceLoading(true);
    setCityLoading(true);
    setDistrictLoading(true);
    setPostalCodeLoading(true);
    

    if(sessionStorage.getItem('getCompanyData'))
    {
      InitialData(countryOptions, provinceOptions, cityOptions, districtOptions);
    }
    else
    {
      LoadCompanyData();
      sessionStorage.setItem('getCompanyData',true)
    }

    

  setCustomerInfoLoading(false);

  setPostalCodeLoading(false);
  setDistrictLoading(false);
  setCityLoading(false);
  setProvinceLoading(false);
  setCountryLoading(false);
  },[]);


  const LoadCompanyData = async() =>
  {
    const defaultData = await ProductServices.fetchGetDefaultDataCompany({
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
  };

  const InitialData = (countryLists, provinceLists, cityLists, districtLists) =>
  {
    if(sessionStorage.getItem('countryId'))
    {
      
      var countryIdData = Number(sessionStorage.getItem('countryId')); 
      //alert('countryIdData = ' + countryIdData)
      setCountryId(countryIdData);
      setDefaultCountryId(countryIdData)
      setCountrySelectorEnable(false);
      
      var country = countryLists.filter((item) => item.value === countryIdData);

      if(country.length > 0)
      {
        setCountryLabel(country[0].label);
        setDefaultCountryText(country[0].label);
      }
        
    }
    
    if(Number(countryIdData) !== 10 && Number(countryIdData) !== 0)//thai
    {
      //alert()
      var isInputAddressData = true;
      setIsInputAddress(isInputAddressData);
      setDefaultIsInputAddress(isInputAddressData);
      if(sessionStorage.getItem('city'))
      {
        var cityTextData = sessionStorage.getItem('city'); 
        setCityText(cityTextData);
        setDefaultCityText(cityTextData)
          
      }
      if(sessionStorage.getItem('district'))
      {
        var districtTextData = sessionStorage.getItem('district'); 
        setDistrictText(districtTextData);
        setDefaultDistrictText(districtTextData);
      }
      if(sessionStorage.getItem('province'))
      {
        var provinceTextData = sessionStorage.getItem('province'); 
        setProvinceText(provinceTextData);
        setDefaultProvinceText(provinceTextData);
      }
      
      //alert('not thai')
    }
    else
    {
      //alert('thai')
    }

    if(sessionStorage.getItem('lineProfileImage'))
    {
      var profileImageData = sessionStorage.getItem('lineProfileImage'); 
      setProfileImage(profileImageData);
    }
    if(sessionStorage.getItem('customerId'))
  {
    var customerIdData = sessionStorage.getItem('customerId'); 
    setCustomerId(customerIdData);
          
  }
  if(sessionStorage.getItem('dataPath'))
  {
    var dataPathData = sessionStorage.getItem('dataPath'); 
    //alert(dataPathData);
    setDataPath(dataPathData);
          
  }
  if(sessionStorage.getItem('catalogName'))
  {
    var catalogNameData = sessionStorage.getItem('catalogName'); 
    setCatalogName(catalogNameData);      
  }
  
  if(sessionStorage.getItem('customerAddressId'))
  {
    //alert("has customerAddressIdData")
    var customerAddressIdData = Number(sessionStorage.getItem('customerAddressId')); 
    //alert("customerAddressIdData = " + customerAddressIdData)
    setCustomerAddressId(customerAddressIdData);
    if(customerAddressId !== undefined && customerAddressId !== null && customerAddressId !== 0)
    {
      //alert('1 disable')
      setDisableCustomerInfo(true);
    }
    else
    {
      setDisableCustomerInfo(false);
    }
  }
  else
  {
    setDisableCustomerInfo(false);
  }

  /* if(sessionStorage.getItem('countrysJSON'))
  {
    var countrysJson = sessionStorage.getItem('countrysJSON'); 
    //alert(countrysJson);
    var countryList = JSON.parse(countrysJson);
    if(countryList === null)
    {
      setCountry([])
    }
    else
    {
      var countryOptions = [];
      
      for(var i=0;i<countryList.length;i++)
      {
        var item = countryList[i];
        if(item !== undefined)
        {
          var countryName = item.countryLocalName;
          var countryId = item.countryId;
          countryOptions.push({ value: countryId, label: countryName })
        }
      }
      setCountry(countryOptions);
    }
    
  }
  if(sessionStorage.getItem('provinces'))
  {
    var provincesJson = sessionStorage.getItem('provinces'); 
    var provincesList = JSON.parse(provincesJson);
    //alert('provincesList = ' + provincesList)
    if(provincesList === null)
    {
      setProvinces([]);
    }
    else
    {
      var provincesOptions = [];
      
      for(var i=0;i<provincesList.length;i++)
      {
        var item = provincesList[i];
        if(item !== undefined)
        {
          var provincesName = item.Name_th;
          var provincesId = item.Id;
          provincesOptions.push({ value: provincesId, label: provincesName })
        }
      }
      
      setProvinces(provincesOptions);
    }
  } */

  
  if(sessionStorage.getItem('cities'))
  {
    //alert('cities');
    var citiesJson = sessionStorage.getItem('cities'); 
    //alert('citiesJson = ' + citiesJson);
    var citiesList = JSON.parse(citiesJson);
    if(citiesList === null)
    {
      setCities([]);
    }
    else
    {
      var citiesOptions = [];
      
      for(var i=0;i<citiesList.length;i++)
      {
        var item = citiesList[i];
        if(item !== undefined)
        {
          var citiesName = item.Name_th;
          var citiesId = item.Id;
          citiesOptions.push({ value: citiesId, label: citiesName })
        }
      }
      
      setCities(citiesOptions);
    }
  }
  if(sessionStorage.getItem('districts'))
  {
    var districtsJson = sessionStorage.getItem('districts'); 
    var districtsList = JSON.parse(districtsJson);
    if(districtsList === null)
    {
      setDistricts([]);
    }
    else
    {
      var districtsOptions = [];
      var districtIdAndPostals = [];
      
      for(var i=0;i<districtsList.length;i++)
      {
        var item = districtsList[i];
        if(item !== undefined)
        {
          var districtsName = item.Name_th;
          var districtsId = item.Id;
          var districtPostalCode = item.ZipCode;
          districtsOptions.push({ value: districtsId, label: districtsName })
          districtIdAndPostals.push({ value: districtsId, label: districtPostalCode })
        }
      }
      
      setDistricts(districtsOptions);
      setDistrictIdAndPostalCodes(districtIdAndPostals);
    }
  }




  if(sessionStorage.getItem('companyLogo'))
  {
    companyLogoData = sessionStorage.getItem('companyLogo'); 
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
  
  if(sessionStorage.getItem('orderId'))
  {
    var salesOrderIdData = sessionStorage.getItem('orderId'); 
    setSalesOrderId(salesOrderIdData);
  }
  if(sessionStorage.getItem('liffId'))
  {
    var lineLiffIdData = sessionStorage.getItem('liffId');
    setLineLiffId(lineLiffIdData);
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

  if(sessionStorage.getItem('companyId'))
  {
    var lineCompanyIdData = sessionStorage.getItem('companyId');
    setLineCompanyId(lineCompanyIdData);
  }
  if(sessionStorage.getItem('customerFirstName'))
  {
    
    var customerFirstNameData = sessionStorage.getItem('customerFirstName'); 
    //alert(customerFirstNameData);
    setCustomerFirstName(customerFirstNameData);
    setDefaultCustomerFirstName(customerFirstNameData)
    
  }
  if(sessionStorage.getItem('customerLastName'))
  {
    var customerLastNameData = sessionStorage.getItem('customerLastName'); 
    setCustomerLastName(customerLastNameData);
    setDefaultCustomerLastName(customerLastNameData);
  }
  if(sessionStorage.getItem('customerEmail'))
  {
    var customerEmailData = sessionStorage.getItem('customerEmail'); 
    setCustomerEmail(customerEmailData);
    setDefaultCustomerEmail(customerEmailData);
  }
  if(sessionStorage.getItem('customerPhoneNumber'))
  {
    var customerPhoneNumberData = sessionStorage.getItem('customerPhoneNumber');
    setCustomerPhoneNumber(customerPhoneNumberData);
    setDefaultCustomerPhoneNumber(customerPhoneNumberData);
      
  }

  if(sessionStorage.getItem('address1'))
  {
    var customerAddress1Data = sessionStorage.getItem('address1'); 
    setCustomerAddress(customerAddress1Data);
    setDefaultCustomerAddress(customerAddress1Data)
      
  }
  
  if(sessionStorage.getItem('provinceId'))
  {
    var provinceIdData = Number(sessionStorage.getItem('provinceId')); 
    setProvinceId(provinceIdData);
    setDefaultProvinceId(provinceIdData);
    

    var province = provinceLists.filter((item) => item.value === provinceIdData);

      if(province.length > 0)
      {
        setProvinceLabel(province[0].label);
        setDefaultProvinceText(province[0].label);
        setProvinceSelectorEnable(false);
      }
  }
  
  
  
  if(sessionStorage.getItem('cityId'))
  {
    var cityIdData = Number(sessionStorage.getItem('cityId')); 
     setCityId(cityIdData); 
     setDefaultCityId(cityIdData);
     var city = cityLists.filter((item) => item.value === cityIdData);

     if(city.length > 0)
     {
       setCityLabel(city[0].label);
       setDefaultCityText(city[0].label);
       setCitySelectorEnable(false);
     }
  }
  if(sessionStorage.getItem('districtId'))
  {
    var districtIdData = Number(sessionStorage.getItem('districtId')); 
    setDistrictId(districtIdData);
    setDefaultDistrictId(districtIdData);
    var district = districtLists.filter((item) => item.value === districtIdData);

     if(district.length > 0)
     {
       setDistrictLabel(district[0].label);
       setDefaultDistrictText(district[0].label);
       setDistrictSelectorEnable(false);
     }
  }
  
  if(sessionStorage.getItem('postalcode'))
  {
    var postalCodeData = sessionStorage.getItem('postalcode'); 
    setPostalCode(postalCodeData);
    setDefaultPostalCode(postalCodeData);
  }

  if(sessionStorage.getItem('shippingId'))
  {
    var shippingIdData = Number(sessionStorage.getItem('shippingId')); 
    setShippingId(shippingIdData)

    var shippingsJson = sessionStorage.getItem('shippings'); 
    var shippingsList = JSON.parse(shippingsJson);

    var shipping = shippingsList.filter((item) => item.value === shippingIdData);

     if(shipping.length > 0)
     {
       setShippingLabel(shipping[0].label);
       
       
     }
  }

  
  if(sessionStorage.getItem('shippings'))
  {
    var shippingsJson = sessionStorage.getItem('shippings'); 
    var shippingsList = JSON.parse(shippingsJson);

    var shippingOptions = [];
      var shippingIdAndCosts = [];
      
      for(var i=0;i<shippingsList.length;i++)
      {
        var item = shippingsList[i];
        if(item !== undefined)
        {
          var shippingName = item.serviceName + ":" + item.serviceChargeDisplay;
          var shippingId = item.providerId;
          var shippingCost = item.serviceCharge;
          shippingOptions.push({ value: shippingId, label: shippingName })
          shippingIdAndCosts.push({ value: shippingId, label: shippingCost })
        }
      }

    setShippings(shippingOptions);
    setShippingIdAndCost(shippingIdAndCosts);
  }

  if(sessionStorage.getItem('companyLogo'))
  {
    var companyLogoData = sessionStorage.getItem('companyLogo'); 
    setCompanyLogo(companyLogoData);
  }

  
  if(sessionStorage.getItem('currencySign'))
  {
    var currencySignData = sessionStorage.getItem('currencySign'); 
    setCurrencySign(currencySignData);
    
  }

  };

  const UpdateTotal = (id,qty,discountRate) =>
  {
    //alert("UpdateTotal");
    try
    {
      var totalDiscountValue = 0;
      for(var i=0;i<items.length;i++)
      {
        var item = items[i];
        if(item.id === id)
        {
          totalDiscountValue += (qty * item.price) * discountRate; 

        }
        else
        {
          for(var j=0;j<discountDetails.length;j++)
          {
            var discountItem = discountDetails[j];
            if(discountItem.id === item.id)
            {
              totalDiscountValue += (item.quantity * item.price * (discountItem.discountRate ? discountItem.discountRate : 0));
            } 
          }
          
        }
      }
      //alert(totalDiscountValue);
      setTotalDiscount(totalDiscountValue);
      //setTotalDiscount(์totalDiscountValue);
    }
    catch(ex)
    {
      alert("Update Total Error: " + ex.message);
    }
    
  }
  const submitContact = async () => {
    setCustomerInfoLoading(true);
    setConfirmOrderLoading(true);
    //event.preventDefault();

    //alert("Confirm");
    
    
    
    //alert(`submitContact`);
    //alert(`So your name is ${firstName}?`);
    var data = {};

    data["firstName"] = firstName;
    data["lastName"] = lastName;
    //alert(email);
    data["email"] = email;


    var countryItem = countrys.find(x => x.value === countryId);
  //alert(JSON.stringify(countryItem));
    var countryString = countryItem === null ? "" : countryItem.label;

    
    var cityString = '';
    var provinceString = '';
    var districtString = '';
    if(isInputAddress === true)
    {
      cityString = cityText;
      provinceString = provinceText;
      districtString = districtText;
    }
    else
    {
      var cityItem = cities.find(x => x.value === cityId);
      cityString = cityItem === null ? "" : cityItem.label;

      var provinceItem = provinces.find(x => x.value === provinceId);
      provinceString = provinceItem === null ? "" : provinceItem.label;

      var districtItem = districts.find(x => x.value === districtId);
      districtString = districtItem === null ? "" : districtItem.label;
    }

    var postalCodeString = postalcode;

    //alert(phoneNumber);

    data["address"] = address1;//event.target.address.value;
    data["contact"] = phoneNumber;//event.target.contact.value;

    data["country"] = countryString;

    //var cityItem = cities.find(x => x.Id == event.target.province2.value);
    data["city"] = cityString;//cityItem === null ? "" : cityItem.Name_th;

    //var provinceItem = provinces.find(x => x.Id == event.target.province.value);
    data["province"] = provinceString;//provinceItem === null ? "" : provinceItem.Name_th;

    //var districtItem = districts.find(x => x.Id == event.target.district.value);
    data["district"] = districtString;//districtItem === null ? "" : districtItem.Name_th;

    //alert(postalCodeString);
    data["postalCode"] = postalCodeString;//event.target.postalCode.value;
    

    //alert('before catalogName = ' + catalogName);
    if(catalogName !== null)
    {
      var orderDetails = [];
      for(var i = 0;i<items.length;i++)
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

      data["orderDetails"] = JSON.stringify(orderDetails);
      data["catalogName"] = catalogName;

    }


    if(!checkValid(firstName,lastName,email,phoneNumber, address1, countryId, provinceString, districtString, cityString))
    {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน")
      
    }
    else
    {
      //alert("Confirm");
      await submitHandler(data);
    }
    
    //setConfirmOrderLoading(false);
    //setCustomerInfoLoading(false);
  };

  //const ApplyPromotionCode = async(promotionCode,discountPercentage, isForAllProduct, minimumAmount, productIdList) =>
  const ApplyPromotionCode = async(e) => {
    e.preventDefault();  
      

      if (!couponRef.current.value) {
        notifyError('Please Input a Coupon Code!');
        return;
      }
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
      var companyId = lineCompanyId;
      var locationId = catalogLocationId;
      var qrPromotion = promotionCode;
      var pictureUrl = '';

      
      const promotion = await ProductServices.applyPromotionCode({
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

          //setPromotionCode(promotionCode);

          localStorage.setItem('discountDetails',JSON.stringify(discountDetails));
          localStorage.setItem('discountRate', (discountPercentage/100));
          localStorage.setItem('promotionCode', promotionCode);
          localStorage.setItem('promotionMinimumAmount', minimumAmount);
          localStorage.setItem('promotionProductIdList', JSON.stringify(productIdList));
          localStorage.setItem('isForAllProduct', isForAllProduct);

          setDiscountDetail(JSON.stringify(discountDetails))

          var couponData = [];
          //alert(JSON.stringify(promotion))
          var couponDetail = {
            couponCode:promotionCode,
            endTime:promotion.endTime,
            minimumAmount:promotion.minimumAmount,
            discountPercentage:promotion.discountRate,

          };
          couponData.push(couponDetail);
          
          //alert(JSON.stringify(couponData));
          sessionStorage.setItem('couponInfo', JSON.stringify(couponData));
          //Cookies.set('couponInfo', JSON.stringify(couponData));
          setCouponData(promotionCode, couponData);
          

    }

  const handlePostalCodeChange = (event) => {  
    //alert("aaaa" + event.target.value);
    setPostalCode(event.target.value)
  }
  const handleDistrictTextChange = (event) => {  
    //alert("aaaa" + event.target.value);
    setDistrictText(event.target.value)
  }
  const handleCityTextChange = (event) => {  
    //alert("aaaa" + event.target.value);
    
    setCityText(event.target.value)
    
  }
  const handleProvinceTextChange = (event) => {  
    
    setProvinceText(event.target.value)
  }
  const handleAddress1Change = (event) => {  
    //alert("aaaa" + event.target.value);
    setCustomerAddress(event.target.value)
  }

  const handleEmailChange = (event) => {  
    //alert("aaaa" + event.target.value);
    setCustomerEmail(event.target.value)
  }
  const handleContactChange = (event) => {  
    //alert("aaaa" + event.target.value);
    setCustomerPhoneNumber(event.target.value)
  }
  const handleFirstNameChange = (event) => {  
    //alert("aaaa" + event.target.value);
    setCustomerFirstName(event.target.value)
  }
  const handleLastNameChange = (event) => {  
    //alert("aaaa" + event.target.value);
    setCustomerLastName(event.target.value)
  }

  const handleShippingChange = async(selectedOption) => {
    //console.log(event.target.value);
    //alert('shipping Id = ' + event.target.name);
    var shippingData = selectedOption.value;
    var shippingDatas = shippingIdAndCost.filter((x) => x.value === shippingData); //shippingData.split(':');
    //alert(shippingData)
    //return;
    var shippingCost = 0.00;
    if(shippingDatas.length > 0)
    {
      shippingCost = parseFloat(shippingDatas[0].label);
    }
    
    //alert('shipping cost = ' + shippingCost);
    handleShippingCost(shippingCost);
    
    handleShippingId(Number(shippingDatas[0].value))
    var shippingName = '';
    var shipping = shippingServices.filter((x) => x.value === shippingData);
    if(shipping.length > 0)
    {
      shippingName = shipping[0].label;
    }
    /*for(var i = 0; i<shippingServices.length;i++)
    {
       if(shippingServices[i].providerId == Number(shippingDatas[0]))
       {
        
         shippingName = shippingServices[i].serviceName;
         //alert('shippingName = ' + shippingName)
       }
    }*/
    handleShippingName(shippingName)

    //alert("liffId = " + lineLiffId);
    if(lineLiffId !== undefined)
    {
      if(lineLiffId.length > 0)
      {
        var shippingLabel = shippingName;
        /*if(shippingDatas.length > 3)
        {
          shippingLabel = shippingDatas[2] + ":" + shippingDatas[3];
        }*/
        //alert("updateSocialPOSShipping " + shippingDatas[2] + ":" + shippingDatas[3])
        updateSocialPOSShipping(Number(shippingDatas[0]), shippingLabel, shippingCost);
      }
    }
}
const updateSocialPOSShipping = async(shippingId, shippingLabel, shippingCost) =>
{
  var stockLocationId = 0;
  
  if(sessionStorage.getItem('locationId'))
  {
    stockLocationId = sessionStorage.getItem('locationId'); 
    
  }

  await ProductServices.fetchUpdateSocialPOSShipping(
    {
      orderId:salesOrderId,
      orderNumber:'',
      locationId:stockLocationId,
      shippingLabel:shippingLabel,
      shippingId:shippingId,
      shippingCost:shippingCost,
      liffId:lineLiffId,
      lineUserId:lineUserId,
      linePOSId:linePOSId,
      pictureUrl:profileImageUrl,
      companyId:lineCompanyId,

    })
}
const handleCountryChange = async(selectedOption) => {
  //alert('handleCountryChange');  
  setProvinceLoading(true);
    setCityLoading(true);
    setDistrictLoading(true);
    setPostalCodeLoading(true);
    //alert("aaaa = " + JSON.stringify(selectedOption));
    var countryId = parseInt(selectedOption.value)
    
    setCountryId(countryId);
    if(countryId === 10)//thai
    {
      //alert('thai');
      setIsInputAddress(false);
      setProvinces(allProvinces);

      setProvinceSelectorEnable(true);

      setCitySelectorEnable(false);
      setDistrictSelectorEnable(false);
      
      
    }
    else
    {
      //alert('no thai');
      setIsInputAddress(true);
      setProvinces([]);
      setProvinceSelectorEnable(false);
      setCitySelectorEnable(false);
      setDistrictSelectorEnable(false);
    }
    //alert('country Id = ' + countryId);
    //var provincesData = await ProductServices.fetchGetStateProvince();
    //var provinces = await GetStateProvince()
    //PopulateProvince(provinces)
    setPostalCode('');

    setProvinceLoading(false);
    setCityLoading(false);
    setDistrictLoading(false);
    setPostalCodeLoading(false);
}
const handleProvinceChange = async(selectedOption) => {
  setCityLoading(true);
  setDistrictLoading(true);
  setPostalCodeLoading(true);
    console.log(selectedOption.value);
    var stateId = parseInt(selectedOption.value)
    //alert('state Id = ' + stateId);

    var citysData = allCitys.filter((item) => item.provinceId === stateId); //await ProductServices.fetchGetCity({stateId});
    //alert(JSON.stringify(citysData));
    setProvinceId(stateId);

    var citysOptions = [];
      
      for(var i=0;i<citysData.length;i++)
      {
        var item = citysData[i];
        if(item !== undefined)
        {
          var citysName = item.label;
          var citysId = item.value;
          citysOptions.push({ value: citysId, label: citysName })
        }
      }
      
      await delay(200)
    setCities(citysOptions);
    setCityLabel('Select City')
    setCityId(0);
    if(citysOptions.length > 0)
    {
      setCitySelectorEnable(true);
    }
    else
    {
      setCitySelectorEnable(false);
    }
    
    setDistricts([]);
    setDistrictSelectorEnable(false);
    setDistrictLabel('Select District')
    setDistrictId(0);
    //setDistricts([]);
    setPostalCode('');
    //var citys = await GetCity(stateId)
    //PopulateCity(citys)
    setCityLoading(false);
    setDistrictLoading(false);
    setPostalCodeLoading(false);
}
const handleCityChange = async(selectedOption) => {
  setDistrictLoading(true);
  setPostalCodeLoading(true);
    console.log(selectedOption.value);
    var cityId = parseInt(selectedOption.value)        
    //alert('city Id = ' + cityId);
    var districtsData = allDistricts.filter((item) => item.cityId === cityId); //await ProductServices.fetchGetDistrict({cityId});
    setCityId(cityId);
    //alert(JSON.stringify(districtsData));
    var districtsOptions = [];
    var districtIdAndPostals = [];
      
      for(var i=0;i<districtsData.length;i++)
      {
        var item = districtsData[i];
        if(item !== undefined)
        {
          var districtsName = item.label;
          var districtsId = item.value;
          var districtPostalCode = item.zipCode;
          districtsOptions.push({ value: districtsId, label: districtsName })
          districtIdAndPostals.push({ value: districtsId, label: districtPostalCode })
        }
      }
    
    await delay(200)
    setDistricts(districtsOptions);
    if(districtsOptions.length > 0)
    {
      setDistrictSelectorEnable(true);
    }
    else
    {
      setDistrictSelectorEnable(false);
    }
    setDistrictIdAndPostalCodes(districtIdAndPostals);
    setPostalCode('');
    //PopulateDistrict(districts)
    setDistrictLoading(false);
    setPostalCodeLoading(false);

      
      setDistricts(districtsOptions);
      setDistrictIdAndPostalCodes(districtIdAndPostals);
    
}
const handleDistrictChange = async(selectedOption) => {
    console.log(selectedOption.value);
    setPostalCodeLoading(true);
    var districtId = parseInt(selectedOption.value)     
    setDistrictId(districtId);   
    //alert('district Id = ' + districtId);
    //setPostalCode(districtId);
    //set
    await delay(200)
    PopulatePostalCode(districtId)
    //setCustomerAddress(event.target.value)
    
    setPostalCodeLoading(false);
}

const PopulatePostalCode = (id) =>
{
  //setData(id);
  for(var i=0;i<districtIdAndPostalCodes.length;i++)
  {
    var item = districtIdAndPostalCodes[i];
    
    if(item !== null)
    {
      //alert("has item = " + JSON.stringify(item))
      if(item.value === id)
      {
        //alert('post = ' + districtIdAndPostalCodes[i])
        //alert(document.getElementById("postalCode").value);
        //alert(document.getElementById("postalCode").defaultValue);
        //document.getElementById("postalCode").value = districts[i].ZipCode;
        //document.getElementById("postalCode").defaultValue = districts[i].ZipCode;
        setChangePostalCode(true);
        setPostalCode(districtIdAndPostalCodes[i].label);
      }
    }
  }
}



const AcceptCustomerInfo = async () =>
{
  //alert("AcceptCustomerInfo");
  
  setEditCustomerInfo(false);
  setDisableCustomerInfo(true);
  setApproveCustomerInfo(true);
}

const EditCustomerInfo = async () =>
{
  setEditCustomerInfo(true);
  setDisableCustomerInfo(false);
  setApproveCustomerInfo(false);

  setCountrySelectorEnable(true);
  setDistrictSelectorEnable(true);
  setCitySelectorEnable(true);
  setProvinceSelectorEnable(true);
}
const CancelCustomerInfo = async () =>
{
  setAddress1Loading(true);
  setCountryLoading(true);
  setProvinceLoading(true);
  setCityLoading(true);
  setDistrictLoading(true);
  setPostalCodeLoading(true);

  setCustomerFirstName(defaultFirstName);
  setCustomerLastName(defaultLastName);
  setCustomerEmail(defaultEmail);
  setCustomerPhoneNumber(defaultPhoneNumber);
  setCustomerAddress(defaultAddress1);
  setCountryId(defaultCountryId);
    

  await delay(200)

  var defaultProvince = allProvinces.filter(x => x.value === defaultProvinceId);

    //alert('defaultProvince = ' + JSON.stringify(defaultProvince));
    if(defaultProvince.length > 0)
    {
      setProvinceLabel(defaultProvince[0].label)
    }
    else
    {
      setProvinceLabel('');
    }
    
    setProvinceId(defaultProvinceId);
    //setProvinces(defaultProvinces);

    var defaultCity = allCitys.filter(x => x.value === defaultCityId);
    if(defaultCity.length > 0)
    {
      setCityLabel(defaultCity[0].label);
    }
    else
    {
      setCityLabel('');
    }
    setCityId(defaultCityId);
    //setCities(defaultCities);

    var defaultDistrict = allDistricts.filter(x => x.value === defaultDistrictId);
    if(defaultDistrict.length > 0)
    {
      setDistrictLabel(defaultDistrict[0].label);
    }
    else
    {
      setDistrictLabel('');
    }
    setDistrictId(defaultDistrictId);
    //setDistricts(defaultDistricts);

    setPostalCode(defaultPostalcode);

    setProvinceText(defaultProvinceText);
    setCityText(defaultCityText);
    setDistrictText(defaultDistrictText);

    setIsInputAddress(defaultIsInputAddress);

    //alert('defaultFirstName = ' + defaultFirstName + ' firstName = ' + firstName);

    setEditCustomerInfo(false);
    setDisableCustomerInfo(true);
    setApproveCustomerInfo(false);

    setPostalCodeEnable(false);
    setDistrictSelectorEnable(false);
    setCitySelectorEnable(false);
    setProvinceSelectorEnable(false);
    setCountrySelectorEnable(false);

    setAddress1Loading(false);
    setCountryLoading(false);
    setProvinceLoading(false);
    setCityLoading(false);
    setDistrictLoading(false);
    setPostalCodeLoading(false);
}
const SaveCustomerInfo = async (companyId) =>
{
  //alert(countryId);
  setCustomerInfoLoading(true);
  var countryItem = countrys.find(x => x.value === countryId);
  //alert(JSON.stringify(countryItem));
    var countryString = countryItem === null ? "" : countryItem.label;

    //alert("cityId = " + cityId);

    var cityString = '';
    var provinceString = '';
    var districtString = '';
    if(isInputAddress === true)
    {
      cityString = cityText;
      provinceString = provinceText;
      districtString = districtText;
    }
    else
    {
      var cityItem = cities.find(x => x.value === cityId);
      //alert('cityItem = ' + JSON.stringify(cityItem))
      cityString = cityItem === null ? "" : cityItem.label;

      var provinceItem = provinces.find(x => x.value === provinceId);
      //alert('provinceItem = ' + JSON.stringify(provinceItem))
      provinceString = provinceItem === null ? "" : provinceItem.label;

      var districtItem = districts.find(x => x.value === districtId);
      districtString = districtItem === null ? "" : districtItem.label;
    }
    //alert(JSON.stringify(cityItem));
    
    
    //alert("provinceId = " + provinceId);
    //alert(JSON.stringify(provinceItem));
    
    //alert("districtId = " + districtId);
    //alert(JSON.stringify(districtItem));
    
    var postalCodeString = postalcode;
    //alert(companyId)
    //alert(firstName);
    //return;

    if(!checkValid(firstName,lastName,email,phoneNumber, address1, countryId, provinceString, districtString, cityString))
    {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน")
      //return;
    }
    else
    {
      var customerData = await ProductServices.fetchSaveCustomerInfo(
        {
          firstName:firstName,
          middleName:'',
          lastName:lastName,
          gender:0,
          phone:phoneNumber,
          mobile:phoneNumber,
          email:email,
          address1:address1,
          district:districtString,
          city:cityString,
          stateOrProvince:provinceString,
          country:countryString,
          countryId:countryId,
          postalcode:postalCodeString,
          companyId:companyId,
          catalogName:catalogName,
          customerId:customerId
  
        });
        //alert(JSON.stringify(customerData));
        var customerAddressId = customerData.customerAddressId;
        setCustomerAddressId(customerAddressId);
        setEditCustomerInfo(false);
        setDisableCustomerInfo(true);

        setCountryLabel(countryString);
        setProvinceLabel(provinceString);
        setDistrictLabel(districtString);
        setCityLabel(cityString);

        setCountrySelectorEnable(false);
        setProvinceSelectorEnable(false);
        setCitySelectorEnable(false);
        setDistrictSelectorEnable(false);

        clearErrorMessage();
    }

    setCustomerInfoLoading(false);
    
}

const SaveCustomerInfo1 = async () =>
{
  //alert(countryId);
  setCustomerInfoLoading(true);
  var countryItem = countrys.find(x => x.countryId === countryId);
  //alert(JSON.stringify(countryItem));
    var countryString = countryItem === null ? "" : countryItem.label;

    //alert("cityId = " + cityId);

    var cityString = '';
    var provinceString = '';
    var districtString = '';
    if(isInputAddress === true)
    {
      cityString = cityText;
      provinceString = provinceText;
      districtString = districtText;
    }
    else
    {
      var cityItem = cities.find(x => x.value === cityId);
      cityString = cityItem === null ? "" : cityItem.label;

      var provinceItem = provinces.find(x => x.value === provinceId);
      provinceString = provinceItem === null ? "" : provinceItem.label;

      var districtItem = districts.find(x => x.value === districtId);
      districtString = districtItem === null ? "" : districtItem.label;
    }
    //alert(JSON.stringify(cityItem));
    
    
    //alert("provinceId = " + provinceId);
    //alert(JSON.stringify(provinceItem));
    
    //alert("districtId = " + districtId);
    //alert(JSON.stringify(districtItem));
    
    var postalCodeString = postalcode;
    //alert(companyId)
    //alert(firstName);
    //return;

    if(!checkValid(firstName,lastName,email,phoneNumber, address1, countryId, provinceString, districtString, cityString))
    {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน")
      //return;
    }
    else
    {
      alert("Ok")
    }

    setCustomerInfoLoading(false);
    
}

const clearErrorMessage = () =>
{
  setContactError('');
}
const checkValid = (firstName, lastName, email, phoneNumber, address1, countryId, provinceString, districtString,cityString) =>
{
  var isComplete = true;
  if(firstName.length <= 0)
  {
    var error = {};
    error['message'] = 'ชื่อต้นว่างไม่ได้';
    setFirstNameError(error);
    isComplete = false;
  }
  if(lastName.length <= 0)
  {
    var error = {};
    error['message'] = 'ชื่อต้นว่างไม่ได้';
    setLastNameError(error);
    isComplete = false;
  }
  if(email.length <= 0)
  {
    var error = {};
    error['message'] = 'ชื่อต้นว่างไม่ได้';
    setEmailError(error);
    isComplete = false;
  }
  if(phoneNumber.length <= 0)
  {
    //alert("Contact Error")
    var error = {};
    error['message'] = 'เบอร์ติดต่อว่างไม่ได้';
    setContactError(error);
    isComplete = false;
  }
  if(address1.length <= 0)
  {
    var error = {};
    error['message'] = 'ชื่อต้นว่างไม่ได้';
    setAddress1Error(error);
    isComplete = false;
  }
  if(countryId === 0)
  {
    var error = {};
    error['message'] = 'ชื่อต้นว่างไม่ได้';
    setCountryError(error);
    isComplete = false;
  }
  if(provinceString.length <= 0)
  {
    var error = {};
    error['message'] = 'ชื่อต้นว่างไม่ได้';
    setProvinceError(error);
    isComplete = false;
  }
  if(districtString.length <= 0)
  {
    var error = {};
    error['message'] = 'ชื่อต้นว่างไม่ได้';
    setDistrictError(error);
    isComplete = false;
  }
  if(cityString.length <= 0)
  {
    var error = {};
    error['message'] = 'ชื่อต้นว่างไม่ได้';
    setCityError(error);
    isComplete = false;
  }

  return isComplete;
}


  
    
  return (
    <>
      <Layout title="Checkout" description="this is checkout page" dataPath={dataPath} companyName={companyName} locationName={locationName} companyLogo={companyLogo}  
      locationAddress1={locationAddress1} locationAddress2={locationAddress2} locationCity={locationCity}
      locationStateOrProvince={locationStateOrProvince} locationCountry={locationCountry} locationPostalCode={locationPostalCode}
      locationEmail={locationEmail} locationTel={locationTel} page='checkout'>
        <div className="mx-auto max-w-screen-2xl px-3 sm:px-10">
          <div className="py-10 lg:py-12 px-0 2xl:max-w-screen-2xl w-full xl:max-w-screen-xl flex flex-col md:flex-row lg:flex-row">
            <div className="md:w-full lg:w-3/5 flex h-full flex-col order-2 sm:order-1 lg:order-1">
              
              <div className="mt-5 md:mt-0 md:col-span-2">
                {/* <form onSubmit={handleSubmit(submitHandler)}> */}
                {confirmOrderLoading === true ? 
                  <Loading loading={confirmOrderLoading} />
              
                :
                  
                  customerInfoLoading === true ? 
                    
                    <Loading loading={customerInfoLoading} />
                  :
                    <>
                      <div className="form-group">
                        <h2 className="font-semibold font-serif text-base text-gray-700 pb-3">
                          01. ข้อมูลส่วนบุคคล
                        </h2>
                        <div className="grid grid-cols-6 gap-6">
                          <div className="col-span-6 sm:col-span-3">
                            
                          <InputArea
                            register={register}
                            label="ชื่อต้น"
                            name="firstName"
                            type="text"
                            placeholder="ชื่อต้น"
                            dataValue={firstName}
                            disable={!IsEditCustomerInfo}
                            handleDataChange={handleFirstNameChange}
                          />
                            
                            <Error errorName={firstNameError} />
                          </div>

                          <div className="col-span-6 sm:col-span-3">
                            <InputArea
                              register={register}
                              label="นามสกุล"
                              name="lastName"
                              type="text"
                              placeholder="ชื่อสกุล"
                              dataValue={lastName}
                              disable={!IsEditCustomerInfo}
                              handleDataChange={handleLastNameChange}
                            />
                            
                            <Error errorName={lastNameError} />
                          </div>
                          <div className="col-span-6 sm:col-span-3">
                            <InputArea
                                register={register}
                                label="Email address"
                                name="email"
                                type="email"
                                placeholder="youremail@gmail.com"
                                dataValue={email}
                                disable={!IsEditCustomerInfo}
                                handleDataChange={handleEmailChange}
                              />
                            
                            <Error errorName={emailError} />
                          </div>

                          <div className="col-span-6 sm:col-span-3">
                            <InputArea
                                  register={register}
                                  label="เบอร์ติดต่อ"
                                  name="contact"
                                  type="tel"
                                  placeholder="+062-6532956"
                                  dataValue={phoneNumber}
                                  disable={!IsEditCustomerInfo}
                                  handleDataChange={handleContactChange}
                                />
                            

                              <Error errorName={contactError} />
                            </div>
                          
                        </div>
                      </div>

                      <div className="form-group mt-12">
                        <h2 className="font-semibold font-serif text-base text-gray-700 pb-3">
                          02. ที่อยู่ขนส่ง
                        </h2>

                        <div className="grid grid-cols-6 gap-6 mb-8">
                          <div className="col-span-6">
                          <InputArea
                                  register={register}
                                  label="บ้านเลขที่ ซอย ถนน"
                                  name="address"
                                  type="text"
                                  placeholder="บ้านเลขที่ ซอย ถนน"
                                  dataValue={address1}
                                  disable={!IsEditCustomerInfo}
                                  handleDataChange={handleAddress1Change}
                                />
                            
                            <Error errorName={address1Error} />
                          </div>

                          <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                            
                            {countryLoading 
                            ?
                            <Loading loading={countryLoading } />
                              
                            :
                              <>
                              <Label label={"ประเทศ"} />
                              <div className="relative">
                                
                                  <Select options={countrys} 
                                  isDisabled={!isCountryEnable}
                                  
                                    defaultValue={{ label: countryLabel, value: countryId }} 
                                    onChange={handleCountryChange}/>

                              </div>

                              
                              {/* <Select options={options} value={selectedOption} onChange={handleCountryChange}/> */}
                                {/* <CountryFormSelect register={register}
                                label="ประเทศ"
                                name="province1"
                                type="text"
                                isDisable={IsDisableCustomerInfo}
                                handleItemChange={handleCountryChange}
                                dataList={countrys} selectedId={countryId}
                                /> */}
                              
                              <Error errorName={countryError} />
                              </>

                            }
                            
                          </div>

                          <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                            
                            {
                              provinceLoading
                              ?
                                <Loading loading={provinceLoading} />
                              :

                                isInputAddress === true 
                                ?
                                <InputArea
                                  register={register}
                                  label="จังหวัด"
                                  name="province"
                                  type="input"
                                  placeholder="Please insert state/province."
                                  dataValue={provinceText}
                                  handleDataChange={handleProvinceTextChange}
                                />
                                  
                                :
                                <>
                                  <Label label={"จังหวัด"} />
                                  <div className="relative">
                                    <Select options={provinces} 
                                    isDisabled={!isProvinceEnable}
                                    defaultValue={{ label: provinceLabel, value: provinceId }} 
                                    onChange={handleProvinceChange}/>
                                  </div>
                                </>
                                  /* <ProvinceFormSelect register={register}
                                  label="จังหวัด"
                                  name="province"
                                  type="text"
                                  isDisable={IsDisableCustomerInfo}
                                  handleItemChange={handleProvinceChange}
                                  dataList={provinces} selectedId={provinceId}
                                  /> */
                            }
                            
                            <Error errorName={provinceError} />
                          </div>

                          <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                          
                            {
                              cityLoading
                              ?
                              <Loading loading={cityLoading} />
                              :
                                isInputAddress === true 
                                ?
                                <InputArea
                                  register={register}
                                  label="เขต/อำเภอ"
                                  name="province2"
                                  type="input"
                                  placeholder="Please insert city."
                                  dataValue={cityText}
                                  handleDataChange={handleCityTextChange}
                                />
                                  
                                :
                                <>
                                  <Label label={"เขต/อำเภอ"} />
                                  <div className="relative">
                                    <Select options={cities} 
                                    isDisabled={!isCityEnable}
                                    defaultValue={{ label: cityLabel, value: cityId }} 
                                    onChange={handleCityChange}/>
                                  </div>
                                </>
                                
                                /*<CityFormSelect register={register}
                                label="เขต/อำเภอ"
                                name="province2"
                                type="text"
                                isDisable={IsDisableCustomerInfo}
                                handleItemChange={handleCityChange}
                                dataList={cities} selectedId={cityId}
                                />*/
                            }
                            
                            <Error errorName={cityError} />
                          </div>

                          <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                          
                            {
                              districtLoading
                              ?
                                <Loading loading={districtLoading} />
                              :
                                isInputAddress === true 
                                ?
                                  <InputArea
                                    register={register}
                                    label="แขวง/ตำบล"
                                    name="district"
                                    type="input"
                                    placeholder="Please insert district."
                                    dataValue={districtText}
                                    handleDataChange={handleDistrictTextChange}
                                  />
                                  
                                :
                                <>
                                  <Label label={"แขวง/ตำบล"} />
                                  <div className="relative">
                                    <Select options={districts} 
                                    isDisabled={!isDistrictEnable}
                                    defaultValue={{ label: districtLabel, value: districtId }} 
                                    onChange={handleDistrictChange}/>
                                  </div>
                                </>
                                
                                  /*<DistrictFormSelect register={register}
                                    label="แขวง/ตำบล"
                                    name="district"
                                    type="text"
                                    isDisable={IsDisableCustomerInfo}
                                    handleItemChange={handleDistrictChange}
                                    dataList={districts} selectedId={districtId}
                                    />*/
                            }
                            
                            <Error errorName={districtError} />
                          </div>

                          <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                          
                          {
                            postalCodeLoading
                            ?
                              <Loading loading={postalCodeLoading} />
                            :
                            <>
                              <InputArea
                              register={register}
                              label="รหัสไปรษณีย์"
                              name="zipCode"
                              type="input"
                              placeholder="รหัสไปรษณีย์"
                              dataValue={postalcode}
                              handleDataChange={handlePostalCodeChange}
                              disable={!IsEditCustomerInfo}
                              />
                            
                            
                            <Error errorName={postalCodeError} />
                            </>
                          }
                            
                          </div>

                          
                        </div>

                        
                        
                      </div>
                      {
                      customerAddressId === 0 
                      ?
                        IsEditCustomerInfo === true ?
                          <div className="grid grid-cols-6 gap-4 lg:gap-6 mt-10">
                      
                            <div className="col-span-6 sm:col-span-3">
                              <button
                                type="button"
                                disabled={isEmpty || isCheckoutSubmit}
                                onClick={() => SaveCustomerInfo(lineCompanyId)}
                                className="bg-cyan-500 hover:bg-cyan-600 border border-cyan-500 transition-all rounded py-3 text-center text-sm font-serif font-medium text-white flex justify-center w-full"
                              >
                                บันทึกข้อมูลลูกค้า{' '}
                                <span className="text-xl ml-2">
                                  {' '}
                                  <IoSaveOutline />
                                </span>
                              </button>
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                              <button
                                type="button"
                                disabled={isEmpty || isCheckoutSubmit}
                                onClick={() => CancelCustomerInfo()}
                                className="bg-indigo-50 border border-indigo-100 rounded py-3 text-center text-sm font-medium text-gray-700 hover:text-gray-800 hover:border-gray-300 transition-all flex justify-center font-serif w-full"
                              >
                                ยกเลิก{' '}
                                <span className="text-xl ml-2">
                                  {' '}
                                  <IoCloseCircleOutline />
                                </span>
                              </button>
                            </div>
                        
                          </div>
                        :
                        <div className="grid grid-cols-6 gap-4 lg:gap-6 mt-10">
                          <div className="col-span-6 sm:col-span-3">
                            
                          </div>
                            <div className="col-span-6 sm:col-span-3">
                                <button
                                  type="button"
                                  disabled={isEmpty || isCheckoutSubmit}
                                  onClick={() => EditCustomerInfo()}
                                  className="bg-cyan-500 hover:bg-cyan-600 border border-cyan-500 transition-all rounded py-3 text-center text-sm font-serif font-medium text-white flex justify-center w-full"
                                >
                                  แก้ไขข้อมูลลูกค้า{' '}
                                  <span className="text-xl ml-2">
                                    {' '}
                                    <IoCreateOutline />
                                  </span>
                                </button>
                              </div>
                        </div>
                      :
                        
                          IsEditCustomerInfo === true ?
                            <div className="grid grid-cols-6 gap-4 lg:gap-6 mt-10">
                            
                              <div className="col-span-6 sm:col-span-3">
                                <button
                                  type="button"
                                  disabled={isEmpty || isCheckoutSubmit}
                                  onClick={() => SaveCustomerInfo(lineCompanyId)}
                                  className="bg-cyan-500 hover:bg-cyan-600 border border-cyan-500 transition-all rounded py-3 text-center text-sm font-serif font-medium text-white flex justify-center w-full"
                                >
                                  บันทึกข้อมูลลูกค้า{' '}
                                  <span className="text-xl ml-2">
                                    {' '}
                                    <IoSaveOutline />
                                  </span>
                                </button>
                              </div>
                              <div className="col-span-6 sm:col-span-3">
                                <button
                                  type="button"
                                  disabled={isEmpty || isCheckoutSubmit}
                                  onClick={() => CancelCustomerInfo()}
                                  className="bg-indigo-50 border border-indigo-100 rounded py-3 text-center text-sm font-medium text-gray-700 hover:text-gray-800 hover:border-gray-300 transition-all flex justify-center font-serif w-full"
                                >
                                  ยกเลิก{' '}
                                  <span className="text-xl ml-2">
                                    {' '}
                                    <IoCloseCircleOutline />
                                  </span>
                                </button>
                              </div>
                              
                            </div>
                          :
                            <div className="grid grid-cols-6 gap-4 lg:gap-6 mt-10">
                              
                              
                              <div className="col-span-6 sm:col-span-3">
                                <button
                                  type="button"
                                  disabled={isEmpty || isCheckoutSubmit}
                                  onClick={() => EditCustomerInfo()}
                                  className="bg-cyan-500 hover:bg-cyan-600 border border-cyan-500 transition-all rounded py-3 text-center text-sm font-serif font-medium text-white flex justify-center w-full"
                                >
                                  แก้ไขข้อมูลลูกค้า{' '}
                                  <span className="text-xl ml-2">
                                    {' '}
                                    <IoCreateOutline />
                                  </span>
                                </button>
                              </div>
                              <div className="col-span-6 sm:col-span-3">
                                <button
                                  type="button"
                                  disabled={isEmpty || isCheckoutSubmit}
                                  onClick={() => AcceptCustomerInfo()}
                                  className="bg-orange-500 hover:bg-orange-600 border border-orange-500 transition-all rounded py-3 text-center text-sm font-serif font-medium text-white flex justify-center w-full"
                                >
                                  อนุมัติข้อมูลลูกค้า{' '}
                                  <span className="text-xl ml-2">
                                    {' '}
                                    <IoCheckboxOutline />
                                  </span>
                                </button>
                              </div>
                            </div>
                        
                        
                    }
                    {
                      customerAddressId === 0 ? 
                        <>
                          <br/>
                          <h2 className="font-semibold font-serif text-base text-center text-gray-700 pb-3">
                            กรุณาบันทึกข้อมูลลูกค้า ก่อนอนุมัติคำสั่งขาย 
                          </h2>
                        </> 
                      : 
                        IsApproveCustomerInfo === false ?
                          <>
                            <br/>
                            <h2 className="font-semibold font-serif text-base text-center text-gray-700 pb-3">
                              กรุณาอนุมัติข้อมูลลูกค้า ก่อนอนุมัติคำสั่งขาย 
                            </h2>
                          </>
                        :
                        <>
                          <div className="form-group mt-12">
                                <h2 className="font-semibold font-serif text-base text-gray-700 pb-3">
                                  03. รูปแบบขนส่ง
                                </h2>
                                <div className="grid grid-cols-6 gap-6">
                                  <div className="col-span-6 sm:col-span-3">
                                  <Select options={shippingServices} 
                                    
                                    defaultValue={{ label: shippingLabel, value: shippingId }} 
                                    onChange={handleShippingChange}/>
                                  {/* <ShippingFormSelect register={register}
                                    label="Shipping"
                                    name="shippingOption"
                                    type="text"
                                    handleItemChange={handleShippingChange} 
                                    dataList={shippingServices} selectedId={shippingId}/> */}
                                  </div>
                                  
                                  
                                </div>
                                
                              </div>
          
                              <div className="grid grid-cols-6 gap-4 lg:gap-6 mt-10">
                                <div className="col-span-6 sm:col-span-3">
                                  <Link href={"/" + dataPath}>
                                    <a className="bg-indigo-50 border border-indigo-100 rounded py-3 text-center text-sm font-medium text-gray-700 hover:text-gray-800 hover:border-gray-300 transition-all flex justify-center font-serif w-full">
                                      <span className="text-xl mr-2">
                                        <IoReturnUpBackOutline />
                                      </span>
                                      ช็อบต่อ
                                    </a>
                                  </Link>
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                  <button
                                    type="button"
                                    onClick={()=> submitContact()}
                                    disabled={isEmpty || isCheckoutSubmit}
                                    className="bg-cyan-500 hover:bg-cyan-600 border border-cyan-500 transition-all rounded py-3 text-center text-sm font-serif font-medium text-white flex justify-center w-full"
                                  >
                                    อนุมัติ คำสั่งขาย{' '}
                                    <span className="text-xl ml-2">
                                      {' '}
                                      <IoArrowForward />
                                    </span>
                                  </button>
                                </div>
                              </div>
                        </>
                      }
                    </>
                  
                  
                  
                }
                
              </div>
            </div>

            <div className="md:w-full lg:w-2/5 lg:ml-10 xl:ml-14 md:ml-6 flex flex-col h-full md:sticky lg:sticky top-28 md:order-2 lg:order-2">
              <div className="border p-5 lg:px-8 lg:py-8 rounded-lg bg-white order-1 sm:order-2">
                <h2 className="font-semibold font-serif text-lg pb-4">
                  สรุป คำสั่งขาย
                </h2>

                {confirmOrderLoading 
                ? 
                  <Loading loading={confirmOrderLoading} />
                :
                  <>
                    <div className="overflow-y-scroll flex-grow scrollbar-hide w-full max-h-64 bg-gray-50 block">
                      {items.map((item) => (
                        <CartItem key={item.id} item={item} discountDetails={discountDetails} UpdateTotal={UpdateTotal}/>
                      ))}

                      {isEmpty && (
                        <div className="text-center py-10">
                          <span className="flex justify-center my-auto text-gray-500 font-semibold text-4xl">
                            <IoBagHandle />
                          </span>
                          <h2 className="font-medium font-serif text-sm pt-2 text-gray-600">
                            ยังไม่มีข้อมูลสินค้า!
                          </h2>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center mt-4 py-4 lg:py-4 text-sm w-full font-semibold text-heading last:border-b-0 last:text-base last:pb-0">
                      <form className="w-full">
                        {couponInfo.couponCode ? (
                          <span className="bg-cyan-50 px-4 py-3 leading-tight w-full rounded-md flex justify-between">
                            {' '}
                            <p className="text-cyan-600">ใช้คูปองแล้ว </p>{' '}
                            <span className="text-red-500 text-right">
                              {couponInfo.couponCode}
                            </span>
                          </span>
                        ) : (
                          <div className="flex flex-col sm:flex-row items-start justify-end">
                            <input
                              ref={couponRef}
                              type="text"
                              placeholder="ระบุ รหัสส่วนลดของคุณ"
                              className="form-input py-2 px-3 md:px-4 w-full appearance-none transition ease-in-out border text-input text-sm rounded-md h-12 duration-200 bg-white border-gray-200 focus:ring-0 focus:outline-none focus:border-cyan-500 placeholder-gray-500 placeholder-opacity-75"
                            />
                            
                            <button
                              onClick={() => ApplyPromotionCode}
                              className="md:text-sm leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold text-center justify-center border border-gray-200 rounded-md placeholder-white focus-visible:outline-none focus:outline-none px-5 md:px-6 lg:px-8 py-3 md:py-3.5 lg:py-3 mt-3 sm:mt-0 sm:ml-3 md:mt-0 md:ml-3 lg:mt-0 lg:ml-3 bg-cyan-500 hover:bg-cyan-600 text-white h-12 text-sm lg:text-base w-full sm:w-auto"
                            >
                              ใช้รหัสคูปอง
                            </button>
                          </div>
                        )}
                      </form>
                    </div>
                  </>
                }
                
                <div className="flex items-center py-2 text-sm w-full font-semibold text-gray-500 last:border-b-0 last:text-base last:pb-0">
                  ยอดขาย
                  <span className="ml-auto flex-shrink-0 text-gray-800 font-bold">
                    {currencySign}{cartTotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center py-2 text-sm w-full font-semibold text-gray-500 last:border-b-0 last:text-base last:pb-0">
                  ค่าขนส่ง
                  <span className="ml-auto flex-shrink-0 text-gray-800 font-bold">
                  {currencySign}{shippingCost.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center py-2 text-sm w-full font-semibold text-gray-500 last:border-b-0 last:text-base last:pb-0">
                  ส่วนลด
                  <span className="ml-auto flex-shrink-0 font-bold text-orange-400">
                  {currencySign}{totalDiscount.toFixed(2)}
                  </span>
                </div>
                <div className="border-t mt-4">
                  <div className="flex items-center font-bold font-serif justify-between pt-5 text-sm uppercase">
                    ยอดชำระรวม
                    <span className="font-serif font-extrabold text-lg">
                      {' '}
                      {currencySign}{Number(total)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

export default dynamic(() => Promise.resolve(Checkout), { ssr: false });
