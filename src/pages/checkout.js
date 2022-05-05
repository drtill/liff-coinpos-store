import React, { useEffect } from 'react';
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

import {Form} from 'react-bootstrap';
import ProductServices from '@services/ProductServices';

import EditableCustomerInput from '@component/form/EditableCustomerInput';
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

  
  const [discountDetails, setDiscountDetail] = useState([]);
  const [totalDiscount, setTotalDiscount] = useState(0);

  const [customerInfoLoading, setCustomerInfoLoading] = useState(false);
  const [confirmOrderLoading, setConfirmOrderLoading] = useState(false);
  
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

  const [provinces, setProvinces] = useState([]);
  const [countrys,setCountry] = useState([]);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [postalcode, setPostalCode] = useState('');
  const [districtText, setDistrictText] = useState('');
  const [cityText, setCityText] = useState('');
  const [provinceText, setProvinceText] = useState('');
  const [changePostalcode, setChangePostalCode] = useState(false);
  const [shippingServices, setShippings] = useState([]);

  const [countryId, setCountryId] = useState(0);
  const [cityId, setCityId] = useState(0);
  const [provinceId,setProvinceId] = useState(0);
  const [districtId,setDistrictId] = useState(0);
  

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

  useEffect(() => 
  {
    if(sessionStorage.getItem('countryId'))
    {
      
      var countryIdData = Number(sessionStorage.getItem('countryId')); 
      //alert('countryIdData = ' + countryIdData)
      setCountryId(countryIdData);
      
        
    }
    if(Number(countryIdData) !== 10 && Number(countryIdData) !== 0)//thai
    {
      //alert()
      var isInputAddressData = true;
      setIsInputAddress(isInputAddressData);
      if(sessionStorage.getItem('city'))
      {
        var cityTextData = sessionStorage.getItem('city'); 
        setCityText(cityTextData);
          
      }
      if(sessionStorage.getItem('district'))
      {
        var districtTextData = sessionStorage.getItem('district'); 
        setDistrictText(districtTextData);
      }
      if(sessionStorage.getItem('province'))
      {
        var provinceTextData = sessionStorage.getItem('province'); 
        setProvinceText(provinceTextData);
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
    setDataPath(dataPathData);
          
  }
  if(sessionStorage.getItem('catalogName'))
  {
    var catalogNameData = sessionStorage.getItem('catalogName'); 
    setCatalogName(catalogNameData);      
  }
  if(sessionStorage.getItem('customerAddressId'))
  {
    
    var customerAddressIdData = Number(sessionStorage.getItem('customerAddressId')); 
    //alert("customerAddressIdData = " + customerAddressIdData)
    setCustomerAddressId(customerAddressIdData);
    if(customerAddressId !== undefined && customerAddressId !== null && customerAddressId !== 0)
    {
      setDisableCustomerInfo(true);
    }
    else
    {
      setCustomerAddressId(false);
    }
  }

  if(sessionStorage.getItem('countrysJSON'))
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
      setCountry(countryList);
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
      setProvinces(provincesList);
    }
  }

  
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
      setCities(citiesList);
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
      setDistricts(districtsList);
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

  if(sessionStorage.getItem('address1'))
  {
    var customerAddress1Data = sessionStorage.getItem('address1'); 
    setCustomerAddress(customerAddress1Data);
      
  }
  
  if(sessionStorage.getItem('provinceId'))
  {
    var provinceIdData = Number(sessionStorage.getItem('provinceId')); 
    setProvinceId(provinceIdData);
  }
  
  
  
  if(sessionStorage.getItem('cityId'))
  {
    var cityIdData = Number(sessionStorage.getItem('cityId')); 
     setCityId(cityIdData); 
  }
  if(sessionStorage.getItem('districtId'))
  {
    var districtIdData = Number(sessionStorage.getItem('districtId')); 
    setDistrictId(districtIdData);
  }
  if(sessionStorage.getItem('postalcode'))
  {
    var postalCodeData = sessionStorage.getItem('postalcode'); 
    setPostalCode(postalCodeData);
  }

  if(sessionStorage.getItem('shippingId'))
  {
    var shippingIdData = Number(sessionStorage.getItem('shippingId')); 
    setShippingId(shippingIdData)
  }

  
  if(sessionStorage.getItem('shippings'))
  {
    var shippingsJson = sessionStorage.getItem('shippings'); 
    var shippingsList = JSON.parse(shippingsJson);
    setShippings(shippingsList);
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
  },[]);

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


    var countryItem = countrys.find(x => x.countryId === countryId);
  //alert(JSON.stringify(countryItem));
    var countryString = countryItem === null ? "" : countryItem.countryLocalName;

    
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
      var cityItem = cities.find(x => x.Id === cityId);
      cityString = cityItem === null ? "" : cityItem.Name_th;

      var provinceItem = provinces.find(x => x.Id === provinceId);
      provinceString = provinceItem === null ? "" : provinceItem.Name_th;

      var districtItem = districts.find(x => x.Id === districtId);
      districtString = districtItem === null ? "" : districtItem.Name_th;
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
    
    setConfirmOrderLoading(false);
    setCustomerInfoLoading(false);
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
    //alert("aaaa" + event.target.value);
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

  const handleShippingChange = async(event) => {
    console.log(event.target.value);
    //alert('shipping Id = ' + event.target.name);
    var shippingData = event.target.value;
    var shippingDatas = shippingData.split(':');

    var shippingCost = 0.00;
    if(shippingDatas.length > 1)
    {
      shippingCost = parseFloat(shippingDatas[1]);
    }
    
    //alert('shipping cost = ' + shippingCost);
    handleShippingCost(shippingCost);
    
    handleShippingId(Number(shippingDatas[0]))
    var shippingName = '';
    for(var i = 0; i<shippingServices.length;i++)
    {
       if(shippingServices[i].providerId == Number(shippingDatas[0]))
       {
        
         shippingName = shippingServices[i].serviceName;
         //alert('shippingName = ' + shippingName)
       }
    }
    handleShippingName(shippingName)

    //alert("liffId = " + lineLiffId);
    if(lineLiffId !== undefined)
    {
      if(lineLiffId.length > 0)
      {
        var shippingLabel = '';
        if(shippingDatas.length > 3)
        {
          shippingLabel = shippingDatas[2] + ":" + shippingDatas[3];
        }
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
const handleCountryChange = async(event) => {
    console.log(event.target.value);
    var countryId = parseInt(event.target.value)
    setCountryId(countryId);
    if(countryId === 10)//thai
    {
      setIsInputAddress(false);
    }
    else
    {
      setIsInputAddress(true);
    }
    //alert('country Id = ' + countryId);
    //var provincesData = await ProductServices.fetchGetStateProvince();
    //var provinces = await GetStateProvince()
    //PopulateProvince(provinces)
    setPostalCode('');
}
const handleProvinceChange = async(event) => {
    console.log(event.target.value);
    var stateId = parseInt(event.target.value)
    //alert('state Id = ' + stateId);
    var citysData = await ProductServices.fetchGetCity({stateId});
    //alert(JSON.stringify(citysData));
    setProvinceId(stateId);
    setCities(citysData);
    setDistricts([]);
    setPostalCode('');
    //var citys = await GetCity(stateId)
    //PopulateCity(citys)
    
}
const handleCityChange = async(event) => {
    console.log(event.target.value);
    var cityId = parseInt(event.target.value)        
    //alert('city Id = ' + cityId);
    var districtsData = await ProductServices.fetchGetDistrict({cityId});
    setCityId(cityId);
    //alert(JSON.stringify(districtsData));
    setDistricts(districtsData);
    setPostalCode('');
    //PopulateDistrict(districts)
    
}
const handleDistrictChange = async(event) => {
    console.log(event.target.value);
    var districtId = parseInt(event.target.value)     
    setDistrictId(districtId);   
    //alert('district Id = ' + districtId);
    //setPostalCode(districtId);
    //set
    PopulatePostalCode(districtId)
    //setCustomerAddress(event.target.value)
    
}

const PopulatePostalCode = (id) =>
{
  //setData(id);
  for(var i=0;i<districts.length;i++)
  {
    var item = districts[i];
    if(item !== null)
    {
      if(item.Id === id)
      {
        //alert(districts[i].ZipCode);
        //alert(document.getElementById("postalCode").value);
        //alert(document.getElementById("postalCode").defaultValue);
        //document.getElementById("postalCode").value = districts[i].ZipCode;
        //document.getElementById("postalCode").defaultValue = districts[i].ZipCode;
        setChangePostalCode(true);
        setPostalCode(districts[i].ZipCode);
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
}
const CancelCustomerInfo = async () =>
{
  setEditCustomerInfo(false);
  setDisableCustomerInfo(true);
  setApproveCustomerInfo(false);
}
const SaveCustomerInfo = async (companyId) =>
{
  //alert(countryId);
  setCustomerInfoLoading(true);
  var countryItem = countrys.find(x => x.countryId === countryId);
  //alert(JSON.stringify(countryItem));
    var countryString = countryItem === null ? "" : countryItem.countryLocalName;

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
      var cityItem = cities.find(x => x.Id === cityId);
      cityString = cityItem === null ? "" : cityItem.Name_th;

      var provinceItem = provinces.find(x => x.Id === provinceId);
      provinceString = provinceItem === null ? "" : provinceItem.Name_th;

      var districtItem = districts.find(x => x.Id === districtId);
      districtString = districtItem === null ? "" : districtItem.Name_th;
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
    var countryString = countryItem === null ? "" : countryItem.countryLocalName;

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
      var cityItem = cities.find(x => x.Id === cityId);
      cityString = cityItem === null ? "" : cityItem.Name_th;

      var provinceItem = provinces.find(x => x.Id === provinceId);
      provinceString = provinceItem === null ? "" : provinceItem.Name_th;

      var districtItem = districts.find(x => x.Id === districtId);
      districtString = districtItem === null ? "" : districtItem.Name_th;
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
                  /* <form onSubmit={submitContact}>
                  
                  </form> */
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
                          
                          
                          <EditableCustomerInput register={register}
                          label="ชื่อต้น" 
                          name="firstName"
                          type="text"
                          placeholder="ชื่อต้น"
                          isDisable={IsDisableCustomerInfo}
                            dataValue={firstName}
                            canAutoChange={true}
                          handleDataChange={handleFirstNameChange}
                          />
                          <Error errorName={firstNameError} />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          
                          <EditableCustomerInput register={register}
                          label="นามสกุล" 
                          name="lastName"
                          type="text"
                          placeholder="ชื่อสกุล"
                          isDisable={IsDisableCustomerInfo}
                            dataValue={lastName}
                            canAutoChange={true}
                          handleDataChange={handleLastNameChange}
                          />
                          <Error errorName={lastNameError} />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          
                          <EditableCustomerInput register={register}
                          label="Email address"
                          name="email"
                          type="email"
                          placeholder="youremail@gmail.com"
                          isDisable={IsDisableCustomerInfo}
                          dataValue={email}

                          canAutoChange={true}
                          handleDataChange={handleEmailChange}
                          />
                          <Error errorName={emailError} />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          
                          <EditableCustomerInput register={register}
                          label="เบอร์ติดต่อ"
                          name="contact"
                          type="tel"
                          placeholder="+062-6532956"
                          isDisable={IsDisableCustomerInfo}
                          dataValue={phoneNumber}
                          canAutoChange={true}
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
                          
                          <EditableCustomerInput register={register}
                          label="บ้านเลขที่ ซอย ถนน"
                          name="address"
                          type="text"
                          placeholder="บ้านเลขที่ ซอย ถนน"
                          isDisable={IsDisableCustomerInfo}
                          dataValue={address1}
                          canAutoChange={true}
                          handleDataChange={handleAddress1Change}
                          />
                          <Error errorName={address1Error} />
                        </div>

                        <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                          
                          
                          <CountryFormSelect register={register}
                            label="ประเทศ"
                            name="province1"
                            type="text"
                            isDisable={IsDisableCustomerInfo}
                            handleItemChange={handleCountryChange}
                            dataList={countrys} selectedId={countryId}
                            />
                          
                          <Error errorName={countryError} />
                        </div>

                        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                          
                          {
                            isInputAddress === true 
                            ?
                              
                              <EditableCustomerInput register={register}
                                  id="province"
                                  label="จังหวัด"
                                  name="province"
                                  type="input"
                                  placeholder="Please insert state/province."
                                  isDisable={IsDisableCustomerInfo}
                                  dataValue={provinceText}
                                  changeData={changePostalcode}
                                  canAutoChange={true}
                                  handleDataChange={handleProvinceTextChange}
                                  />
                            :
                            
                              <ProvinceFormSelect register={register}
                              label="จังหวัด"
                              name="province"
                              type="text"
                              isDisable={IsDisableCustomerInfo}
                              handleItemChange={handleProvinceChange}
                              dataList={provinces} selectedId={provinceId}
                              />
                          }
                          
                          <Error errorName={provinceError} />
                        </div>

                        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                          
                          {
                            isInputAddress === true 
                            ?
                              
                              <EditableCustomerInput register={register}
                                id="city"
                                label="เขต/อำเภอ"
                                name="province2"
                                type="input"
                                placeholder="Please insert city."
                                isDisable={IsDisableCustomerInfo}
                                dataValue={cityText}
                                changeData={changePostalcode}
                                canAutoChange={true}
                                handleDataChange={handleCityTextChange}
                                />
                            :
                            <CityFormSelect register={register}
                            label="เขต/อำเภอ"
                            name="province2"
                            type="text"
                            isDisable={IsDisableCustomerInfo}
                            handleItemChange={handleCityChange}
                            dataList={cities} selectedId={cityId}
                            />
                          }
                          
                          <Error errorName={cityError} />
                        </div>
                        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                          
                          {isInputAddress === true 
                          ?
                            
                            <EditableCustomerInput register={register}
                            id="district"
                            label="แขวง/ตำบล"
                            name="district"
                            type="input"
                            placeholder="Please insert district."
                            isDisable={IsDisableCustomerInfo}
                            dataValue={districtText}
                            changeData={changePostalcode}
                            canAutoChange={true}
                            handleDataChange={handleDistrictTextChange}
                            />
                          :
                            <DistrictFormSelect register={register}
                              label="แขวง/ตำบล"
                              name="district"
                              type="text"
                              isDisable={IsDisableCustomerInfo}
                              handleItemChange={handleDistrictChange}
                              dataList={districts} selectedId={districtId}
                              />
                          }
                          
                          <Error errorName={districtError} />
                        </div>
                        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                          
                          <EditableCustomerInput register={register}
                          id="postalCode"
                          label="รหัสไปรษณีย์"
                          name="zipCode"
                          type="input"
                          placeholder="รหัสไปรษณีย์"
                          isDisable={IsDisableCustomerInfo}
                          dataValue={postalcode}
                          changeData={changePostalcode}
                          canAutoChange={true}
                          handleDataChange={handlePostalCodeChange}
                          />
                          
                          <Error errorName={postalCodeError} />
                        </div>
                      </div>

                      {/* <Label label="Shipping Cost" /> */}
                      
                    </div>
                    {
                      customerAddressId === 0 ?
                        <div className="grid grid-cols-6 gap-4 lg:gap-6 mt-10">
                          <div className="col-span-6 sm:col-span-3">
                            {'customerAddressId = ' + customerAddressId}
                          </div>
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
                        </div>
                      :
                        
                          IsEditCustomerInfo === true ?
                            <div className="grid grid-cols-6 gap-4 lg:gap-6 mt-10">
                            
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
                            </div>
                          :
                            <div className="grid grid-cols-6 gap-4 lg:gap-6 mt-10">
                              
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
                                  <ShippingFormSelect register={register}
                                    label="Shipping"
                                    name="shippingOption"
                                    type="text"
                                    handleItemChange={handleShippingChange} 
                                    dataList={shippingServices} selectedId={shippingId}/>
                                  </div>
                                  
                                  
                                </div>
                                
                              </div>
          
                              <div className="grid grid-cols-6 gap-4 lg:gap-6 mt-10">
                                <div className="col-span-6 sm:col-span-3">
                                  <Link href={dataPath}>
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
                              onClick={ApplyPromotionCode}
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
                      {currencySign}{Number(total)}{/* {Math.round(Number(total)-Number(totalDiscount))}.00 */}
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

export default dynamic(() => Promise.resolve(Checkout), { ssr: false });
