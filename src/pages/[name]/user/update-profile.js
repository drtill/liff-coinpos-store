import dynamic from 'next/dynamic';
import Cookies from 'js-cookie';
import { useForm } from 'react-hook-form';
import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router'
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
//internal import
import Label from '@component/form/Label';
import Error from '@component/form/Error';
import Dashboard from '@pages/user/dashboard';
import InputArea from '@component/form/InputArea';
import EditableCustomerInput from '@component/form/EditableCustomerInput';
import CountryFormSelect from '@component/form/CountryFormSelect';
import ProvinceFormSelect from '@component/form/ProvinceFormSelect';
import CityFormSelect from '@component/form/CityFormSelect';
import DistrictFormSelect from '@component/form/DistrictFormSelect';
import ProductServices from '@services/ProductServices';

// import UserServices from '@services/UserServices';
import { UserContext } from '@context/UserContext';
import Uploader from '@component/image-uploader/Uploader';
import { notifySuccess, notifyError } from '@utils/toast';
//import { set } from 'firebase/database';
import Select from 'react-select'

import Loading from '@component/preloader/Loading';

const UpdateProfile = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const {
    state: { userInfo },
  } = useContext(UserContext);

  const { dispatch } = useContext(UserContext);

  const router = useRouter();
  const { query } = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  
  //var provinceTextData = '';
  //var cityTextData = '';
  //var districtTextData = '';

  var customerAddressIdData = 0
  
  var isInputAddressData = true;

  const [customerId, setCustomerId] = useState(0);
  const [companyId,setCompanyId] = useState(0);
  const [companyCode,setCompanyCode] = useState('');
  const [companyLogo, setCompanyLogo] = useState('');
  const [companyName, setCompanyName] = useState('');

  const [catalogName, setCatalogName] = useState('');
  const [dataPath, setDataPath] = useState('');

  
  const [IsApproveCustomerInfo, setApproveCustomerInfo] = useState(false);
  const [IsEditCustomerInfo, setEditCustomerInfo] = useState(false);
  const [IsDisableCustomerInfo, setDisableCustomerInfo] = useState(true);
  const [customerAddressId, setCustomerAddressId] = useState(customerAddressIdData);
  
  
  const [changePostalcode, setChangePostalCode] = useState(false);
  
  const [firstName,setCustomerFirstName] = useState('');
  const [lastName,setCustomerLastName] = useState('');
  const [email,setCustomerEmail] = useState('');
  const [phoneNumber,setCustomerPhoneNumber] = useState('');
  const [address1,setCustomerAddress] = useState('');

  const [allProvinces, setAllProvinces] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [countrys,setCountry] = useState([]);

  const [allCitys, setAllCitys] = useState([]);
  const [cities, setCities] = useState([]);

  const [allDistricts, setAllDistricts] = useState([]);
  const [districts, setDistricts] = useState([]);

  const [districtIdAndPostalCodes, setDistrictIdAndPostalCodes] = useState([]);

  const [countryId, setCountryId] = useState(0);
  const [cityId, setCityId] = useState(0);
  const [provinceId,setProvinceId] = useState(0);
  const [districtId,setDistrictId] = useState(0);
  const [postalcode, setPostalCode] = useState('');

  const [districtText, setDistrictText] = useState('');
  const [cityText, setCityText] = useState('');
  const [provinceText, setProvinceText] = useState('');

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

  
  
  const [isInputAddress, setIsInputAddress] = useState(isInputAddressData);
  const [defaultIsInputAddress, setDefaultIsInputAddress] = useState(isInputAddressData);

  const [customerInfoLoading, setCustomerInfoLoading] = useState(false);

  const [postalCodeLoading, setPostalCodeLoading] = useState(true);
  const [districtLoading, setDistrictLoading] = useState(true);
  const [cityLoading, setCityLoading] = useState(true);
  const [provinceLoading, setProvinceLoading] = useState(true);
  const [countryLoading, setCountryLoading] = useState(true);

  const [address1Loading, seAddress1Loading] = useState(true);


  const [countryLabel, setCountryLabel] = useState('Select Country');
  const [provinceLabel, setProvinceLabel] = useState('Select Province');
  const [cityLabel, setCityLabel] = useState('Select City');
  const [districtLabel, setDistrictLabel] = useState('Select District');

  const [isCountryEnable, setCountrySelectorEnable] = useState(false);
  const [isDistrictEnable, setDistrictSelectorEnable] = useState(false);
  const [isProvinceEnable, setProvinceSelectorEnable] = useState(false);
  const [isCityEnable, setCitySelectorEnable] = useState(false);
  const [isPostalCodeEnable, setPostalCodeEnable] = useState(false);

  const [countryError, setCountryError] = useState({});
  const [provinceError, setProvinceError] = useState({});
  const [cityError, setCityError] = useState({});
  const [districtError, setDistrictError] = useState({});
  const [address1Error, setAddress1Error] = useState({});
  const [postalCodeError, setPostalCodeError] = useState({});

  useEffect(() => 
  {
    setCustomerInfoLoading(true);

    initiateCompanyData();
    initiateCustomerInfoData();
    //alert('countryIdData = ' + countryIdData);
    
    setCustomerInfoLoading(false);
  },[]);
  

  const initiateCompanyData = () => 
  {
    var lineCompanyId = 0;
    var companyLogoData = '';
    var companyNameData = '';
    var catalogNameData = '';
    var dataPathData = '';
    if(sessionStorage.getItem('companyId'))
    {
      lineCompanyId = sessionStorage.getItem('companyId');
      //alert('lineCompanyId = ' + lineCompanyId);
      setCompanyId(lineCompanyId);
    }
    

    if(sessionStorage.getItem('companyLogo'))
    {
      companyLogoData = sessionStorage.getItem('companyLogo'); 
      setCompanyLogo(companyLogoData);
      
    }
    if(sessionStorage.getItem('companyName'))
    {
      companyNameData = sessionStorage.getItem('companyName'); 
      //alert(companyName)
      setCompanyName(companyNameData);
      
    }
    if(sessionStorage.getItem('dataPath'))
    {
      dataPathData = sessionStorage.getItem('dataPath'); 
      setDataPath(dataPathData);
            
    }
    if(sessionStorage.getItem('catalogName'))
    {
      catalogNameData = sessionStorage.getItem('catalogName');
      setCatalogName(catalogNameData);
      //alert('catalogName =' + catalogName);
            
    }
    //alert('lineCompanyId = ' + lineCompanyId);
    if(Number(lineCompanyId) === 0 || lineCompanyId === null || lineCompanyId === undefined)
    {

      router.push('/404');

    }
    
    
  }
  const initiateCustomerInfoData = () => 
  {
    initiateCustomerDetail();
    initiateCustomerAddress();
  }

  const initiateCustomerDetail = () =>
  {
    if (Cookies.get('userInfo')) {
      //alert("Get UserInfo");
      const user = JSON.parse(Cookies.get('userInfo'));
      if(user !== null && user !== undefined )
      {
        setValue('name', user.name);
        setValue('email', user.email);
        setValue('address', user.address);
        setValue('phone', user.phone);
        setImageUrl(user.image);
      }
      
    }

    if(sessionStorage.getItem('customerId'))
    {
      var customerIdData = sessionStorage.getItem('customerId'); 
      setCustomerId(customerIdData);
            
    }

    if(sessionStorage.getItem('customerFirstName'))
    {
      
      var customerFirstName = sessionStorage.getItem('customerFirstName'); 
      setCustomerFirstName(customerFirstName);
      setDefaultCustomerFirstName(customerFirstName)
      //alert(customerFirstName);  
    }
    if(sessionStorage.getItem('customerLastName'))
    {
      var customerLastName = sessionStorage.getItem('customerLastName'); 
      setCustomerLastName(customerLastName);
      setDefaultCustomerLastName(customerLastName);
    }
    if(sessionStorage.getItem('customerEmail'))
    {
      var customerEmail = sessionStorage.getItem('customerEmail'); 
      setCustomerEmail(customerEmail);
      setDefaultCustomerEmail(customerEmail);
    }
    if(sessionStorage.getItem('customerPhoneNumber'))
    {
      var customerPhoneNumber = sessionStorage.getItem('customerPhoneNumber');
      setCustomerPhoneNumber(customerPhoneNumber);
      setDefaultCustomerPhoneNumber(customerPhoneNumber);
    }
  }

  const initiateCustomerAddress = async() =>
  {

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
    if(sessionStorage.getItem('customerAddressId'))
    {
      
      customerAddressIdData = Number(sessionStorage.getItem('customerAddressId')); 
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
    
    var countryIdData = 0;
    if(sessionStorage.getItem('countryId'))
    {      
      countryIdData = Number(sessionStorage.getItem('countryId')); 
      setCountryId(countryIdData);
      setDefaultCountryId(countryIdData);  
      
      var country = countryOptions.filter((item) => item.value === countryIdData);

      if(country.length > 0)
      {
        setCountryLabel(country[0].label);
      }
    }

    /*if(sessionStorage.getItem('countrysJSON'))
    {
      var countrysJson = sessionStorage.getItem('countrysJSON'); 
      //alert(countrysJson);
      var countryList = JSON.parse(countrysJson);
      if(countryList === null)
      {
        setCountry([])
        setDefaultCountry([]);
      }
      else
      {
        setCountry(countryList);
        setDefaultCountry(countryList);
      }
      
    }*/
    /*if(sessionStorage.getItem('provinces'))
    {
      var provincesJson = sessionStorage.getItem('provinces'); 
      var provincesList = JSON.parse(provincesJson);
      //alert('provincesList = ' + provincesList)
      if(provincesList === null)
      {
        setProvinces([]);
        setDefaultProvinces([]);
      }
      else
      {
        setProvinces(provincesList);
        setDefaultProvinces(provincesList);
      }
    }*/

    
    if(sessionStorage.getItem('cities'))
    {
      //alert('cities');
      var citiesJson = sessionStorage.getItem('cities'); 
      //alert('citiesJson = ' + citiesJson);
      var citiesList = JSON.parse(citiesJson);
      if(citiesList === null)
      {
        setCities([]);
        //setDefaultCities([]);
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
        setDefaultDistricts([]);
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
    
    if(sessionStorage.getItem('address1'))
    {
      var customerAddress1 = sessionStorage.getItem('address1'); 
      //alert("Address1 = " + customerAddress1);
      setCustomerAddress(customerAddress1);
      setDefaultCustomerAddress(customerAddress1);
    }

    if(sessionStorage.getItem('provinceId'))
    {
      var provinceIdData = Number(sessionStorage.getItem('provinceId')); 
      setProvinceId(provinceIdData);
      setDefaultProvinceId(provinceIdData);

      var province = provinceOptions.filter((item) => item.value === provinceIdData);

      if(province.length > 0)
      {
        setProvinceLabel(province[0].label);
        if(IsEditCustomerInfo)
        {
          setProvinceSelectorEnable(true);
        }
        else
        {
          setProvinceSelectorEnable(false);
        }
        
      }
    }
    if(sessionStorage.getItem('cityId'))
    {
      var cityIdData = Number(sessionStorage.getItem('cityId')); 
      setCityId(cityIdData);
      setDefaultCityId(cityIdData);

      var city = cityOptions.filter((item) => item.value === cityIdData);

     if(city.length > 0)
     {
       setCityLabel(city[0].label);
       //setCitySelectorEnable(true);
       if(IsEditCustomerInfo)
        {
          setCitySelectorEnable(true);
        }
        else
        {
          setCitySelectorEnable(false);
        }
     }
    }
    if(sessionStorage.getItem('districtId'))
    {
      var districtIdData = Number(sessionStorage.getItem('districtId')); 
      setDistrictId(districtIdData);
      setDefaultDistrictId(districtIdData);

      var district = districtOptions.filter((item) => item.value === districtIdData);

      //alert('district = ' + JSON.stringify(district))
      if(district.length > 0)
      {
        //alert('district[0].label = ' + district[0].label)
        setDistrictLabel(district[0].label);

        setDistrictSelectorEnable(false);
        
      }
      
    }
    if(sessionStorage.getItem('postalcode'))
    {
      var postalCodeData = sessionStorage.getItem('postalcode'); 
      setPostalCode(postalCodeData);
      setDefaultPostalCode(postalCodeData);
    }

    var countryId = countryIdData;
    if(Number(countryId) !== 10 && Number(countryId) !== 0)//thai
    {
      
      isInputAddressData = true;
      setIsInputAddress(isInputAddressData);
      setDefaultIsInputAddress(isInputAddressData);
      if(sessionStorage.getItem('city'))
      {
        var cityTextData = sessionStorage.getItem('city'); 
        setCityText(cityTextData);
        setDefaultCityText(cityTextData);
        
          
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
      isInputAddressData = false;
      setIsInputAddress(isInputAddressData);
      setDefaultIsInputAddress(isInputAddressData);
    }

    seAddress1Loading(false);
    setCountryLoading(false);
    setProvinceLoading(false);
    setCityLoading(false);
    setDistrictLoading(false);
    setPostalCodeLoading(false);
  }

  const handleEmailChange = (event) => {  
    setCustomerEmail(event.target.value)
  }
  const handleContactChange = (event) => {  
    setCustomerPhoneNumber(event.target.value)
  }
  const handleFirstNameChange = (event) => {  
    setCustomerFirstName(event.target.value)
  }
  const handleLastNameChange = (event) => {  
    setCustomerLastName(event.target.value)
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

  const EditCustomerInfo = () =>
{
  
  setEditCustomerInfo(true);
  setDisableCustomerInfo(false);
  setApproveCustomerInfo(false);

  setCountrySelectorEnable(true);
  setDistrictSelectorEnable(true);
  setCitySelectorEnable(true);
  setProvinceSelectorEnable(true);
  
  //alert('defaultFirstName = ' + defaultFirstName + ' firstName = ' + firstName);
  setCustomerFirstName(defaultFirstName);
}
  const handleCountryChange = async(selectedOption) => {
    setProvinceLoading(true);
    setCityLoading(true);
    setDistrictLoading(true);
    setPostalCodeLoading(true);
    var countryId = parseInt(selectedOption.value)
    setCountryId(countryId);
    if(countryId === 10)//thai
    {
      //alert('thai');
      setIsInputAddress(false);
      setProvinces(allProvinces);
      setCities([]);
      setDistricts([]);
      setPostalCode('');
      setProvinceSelectorEnable(true);

      setCitySelectorEnable(false);
      setDistrictSelectorEnable(false);
    }
    else
    {
      //alert('no thai');
      setIsInputAddress(true);
      setProvinces([]);
      setPostalCode('');
      setProvinceSelectorEnable(false);
      setCitySelectorEnable(false);
      setDistrictSelectorEnable(false);
      setPostalCodeEnable(false);
    }
    await delay(200)
    //alert('country Id = ' + countryId);
    //var provincesData = await ProductServices.fetchGetStateProvince();
    //var provinces = await GetStateProvince()
    //PopulateProvince(provinces)
    setProvinceId(0);
    setProvinceLabel('Select Province');

    setCityId(0);
    setCityLabel('Select City');

    setDistrictId(0);
    setDistrictLabel('Select District');


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
    setPostalCodeEnable(false);
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
    setPostalCodeEnable(false);
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
  setPostalCodeEnable(true);
  //setCustomerAddress(event.target.value)
  
  setPostalCodeLoading(false);
    
}

const PopulatePostalCode = (id) =>
{
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

const handlePostalCodeChange = (event) => {  
  //alert("aaaa" + event.target.value);
  setPostalCode(event.target.value)
}
const handleAddress1Change = (event) => {  
  //alert("aaaa" + event.target.value);
  setCustomerAddress(event.target.value)
}
  const onSubmit = (data) => {
     

     //SaveCustomerInfo(companyId);

    
  };

  const SaveCustomerInfo = async () =>
{
  
  var catalogName = '';
  if(sessionStorage.getItem('customerId'))
  {
    customerId = sessionStorage.getItem('customerId'); 
    //alert('customerId = ' + customerId);
          
  }
  if(sessionStorage.getItem('catalogName'))
    {
      catalogName = sessionStorage.getItem('catalogName');
      alert('catalogName =' + catalogName);
            
    }
  /*if (!imageUrl) {
    notifyError('Image is required!');
    return;
  }*/
  setLoading(true);

  //SaveCustomerInfo(companyId);

  setCustomerInfoLoading(true);
  //alert(countryId);
  var countryItem = countrys.find(x => x.value === countryId);
  //alert('Country = ' + JSON.stringify(countryItem));
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
      //alert('cityId = ' + cityId);
      var cityItem = cities.find(x => x.value === cityId);
      cityString = cityItem === null ? "" : cityItem.label;

      //alert('provinceId = ' + provinceId);
      var provinceItem = provinces.find(x => x.value === provinceId);
      provinceString = provinceItem === null ? "" : provinceItem.label;

      //alert('districtId = ' + districtId);
      var districtItem = districts.find(x => x.value === districtId);
      districtString = districtItem === null ? "" : districtItem.label;
    }

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
          customerId:customerId,
          postalcode:postalCodeString,
          companyId:companyId,
          catalogName:catalogName,
          //imageUrl:imageUrl
  
        });

        notifySuccess('Update Profile Success!');
        //alert(JSON.stringify(customerData));
      sessionStorage.setItem('customerId', customerData.customerId);
          sessionStorage.setItem('customerFirstName', customerData.firstName);
          sessionStorage.setItem('customerLastName', customerData.lastName);
          sessionStorage.setItem('customerEmail', customerData.email);
          sessionStorage.setItem('customerPhoneNumber', customerData.phone);

          sessionStorage.setItem('customerAddressId', customerData.customerAddressId);


          //alert('address1 = ' + customerData.address1);
          sessionStorage.setItem('address1', customerData.address1);
          sessionStorage.setItem('countryId', customerData.countryId);
          sessionStorage.setItem('provinceId', customerData.provinceId);
          sessionStorage.setItem('province', customerData.StateOrProvince);
          sessionStorage.setItem('cityId', customerData.cityId);
          sessionStorage.setItem('city', customerData.City);
          sessionStorage.setItem('districtId', customerData.districtId);
          sessionStorage.setItem('district', customerData.District);
          sessionStorage.setItem('postalcode', customerData.postalcode);

      
      dispatch({ type: 'USER_LOGIN', payload: customerData });
      Cookies.set('userInfo', JSON.stringify(customerData));

      localStorage.setItem('userInfo', JSON.stringify(customerData));
        //alert('loading false')
      //setLoading(false);
      setEditCustomerInfo(false);
      setDisableCustomerInfo(true);
      setApproveCustomerInfo(false);

      setCountrySelectorEnable(false);
      setProvinceSelectorEnable(false);
      setCitySelectorEnable(false);
      setDistrictSelectorEnable(false);
    }
    setLoading(false);
    setCustomerInfoLoading(false);
      
      
}
  const CancelCustomerInfo = async() =>
  {
    //alert('ProvinceId = ' + provinceId + ' default province id = ' + defaultProvinceId);

    seAddress1Loading(true);
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
    //setCountry(defaultCountrys);

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

    seAddress1Loading(false);
    setCountryLoading(false);
    setProvinceLoading(false);
    setCityLoading(false);
    setDistrictLoading(false);
    setPostalCodeLoading(false);
  }
  

  const checkValid = (firstName, lastName, email, phoneNumber, address1, countryId, provinceString, districtString,cityString) =>
{
  var isComplete = true;
  if(firstName.length <= 0)
  {
    isComplete = false;
  }
  if(lastName.length <= 0)
  {
    isComplete = false;
  }
  if(email.length <= 0)
  {
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
    isComplete = false;
  }
  if(countryId === 0)
  {
    isComplete = false;
  }
  if(provinceString.length <= 0)
  {
    isComplete = false;
  }
  if(districtString.length <= 0)
  {
    isComplete = false;
  }
  if(cityString.length <= 0)
  {
    isComplete = false;
  }

  return isComplete;
}

  return (
    <Dashboard title="Update-Profile" description="This is edit profile page">
      <div className="max-w-screen-2xl">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h2 className="text-xl font-serif font-semibold mb-5">
                แก้ไข โปรไฟล์
              </h2>
            </div>
          </div>
        </div>
        {
          loading
          ?
            <Loading loading={loading} />
          :

          <form onSubmit={onSubmit}>
            <div className="mt-5 md:mt-0 md:col-span-2">
              {/* <div className="bg-white space-y-6">
                <div>
                  <Label label="Photo" />
                  <div className="mt-1 flex items-center">
                    <Uploader imageUrl={imageUrl} setImageUrl={setImageUrl} />
                  </div>
                </div>
              </div> */}

              <div className="mt-10 sm:mt-0">
                <div className="md:grid-cols-6 md:gap-6">
                  <div className="mt-5 md:mt-0 md:col-span-2">

                    {
                    customerInfoLoading === true 
                    ? 
                      <Loading loading={customerInfoLoading} />
                    
                    :
                      <div className="lg:mt-6 mt-4 bg-white">

                      <div className="form-group">
                        <h2 className="font-semibold font-serif text-base text-gray-700 pb-3">
                          ข้อมูลส่วนบุคคล
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
                            
                            <Error errorName={errors.firstName} />
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
                            
                            <Error errorName={errors.lastName} />
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
                            <Error errorName={errors.email} />
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

                            <Error errorName={errors.contact} />
                          </div>
                        </div>
                      </div>

                      <div className="form-group mt-12">
                      <h2 className="font-semibold font-serif text-base text-gray-700 pb-3">
                        ที่อยู่ขนส่ง
                      </h2>

                      <div className="grid grid-cols-6 gap-6 mb-8">
                        <div className="col-span-6">
                          {countryLoading
                            ?
                              <Loading loading={countryLoading } />
                            :
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
                          }
                          
                          {/* <EditableCustomerInput register={register}
                          label="Street address"
                          name="address"
                          type="text"
                          placeholder="123 Boulevard Rd, Beverley Hills"
                          isDisable={IsDisableCustomerInfo}
                          dataValue={address1}
                          canAutoChange={true}
                          handleDataChange={handleAddress1Change}
                          /> */}
                          <Error errorName={errors.address} />
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
                          <Error errorName={errors.province} />
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
                          <Error errorName={errors.city} />
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
                          <Error errorName={errors.district} />
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
                              disabled={true}
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
                      {/* <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                          <InputArea
                            register={register}
                            label="Full Name"
                            name="name"
                            type="text"
                            placeholder="Full Name"
                          />
                          <Error errorName={errors.name} />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <InputArea
                            register={register}
                            label="Your Address"
                            name="address"
                            type="text"
                            placeholder="Your Address"
                          />
                          <Error errorName={errors.address} />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <InputArea
                            register={register}
                            label="Phone/Mobile"
                            name="phone"
                            type="tel"
                            placeholder="Your Mobile Number"
                          />
                          <Error errorName={errors.phone} />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <InputArea
                            register={register}
                            label="Email Address"
                            name="email"
                            type="email"
                            placeholder="Your Email"
                          />
                          <Error errorName={errors.email} />
                        </div>
                      </div> */}
                      {/* <div className="col-span-6 sm:col-span-3">
                                    <button
                                      type="button"
                                      
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
                      <div className="col-span-6 sm:col-span-3 mt-5 text-right">
                        <button
                          disabled={loading}
                          type="submit"
                          className="md:text-sm leading-5 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-medium text-center justify-center border-0 border-transparent rounded-md placeholder-white focus-visible:outline-none focus:outline-none bg-cyan-500 text-white px-5 md:px-6 lg:px-8 py-2 md:py-3 lg:py-3 hover:text-white hover:bg-cyan-600 h-12 mt-1 text-sm lg:text-sm w-full sm:w-auto"
                        >
                          Update Profile
                        </button>
                      </div> */}
                      <div className="grid grid-cols-6 gap-4 lg:gap-6 mt-10 text-right">
                        {
                          IsEditCustomerInfo === true
                          ?
                          <>
                            <div className="col-span-6 sm:col-span-3 gap-4 lg:gap-6">
                            </div>
                            <div className="col-span-6 sm:col-span-3 gap-4 lg:gap-6">
                            
                              <button
                                    type="button"
                                    
                                    onClick={() => CancelCustomerInfo()}
                                    className="bg-indigo-50 border border-indigo-100 md:text-sm leading-5 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-medium text-center justify-center rounded-md placeholder-white focus-visible:outline-none focus:outline-none  text-gray-700 hover:text-gray-800 hover:border-gray-300  px-5 md:px-6 lg:px-8 py-2 md:py-3 lg:py-3 h-12 mt-1 mr-2 text-sm lg:text-sm w-full sm:w-auto"
                                  >
                                    ยกเลิก{' '}
                                    
                                  </button>
                              <button
                                disabled={loading}
                                type="button"
                                onClick={() => SaveCustomerInfo()}
                                className="md:text-sm leading-5 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-medium text-center justify-center border-0 border-transparent rounded-md placeholder-white focus-visible:outline-none focus:outline-none bg-cyan-500 text-white px-5 md:px-6 lg:px-8 py-2 md:py-3 lg:py-3 hover:text-white hover:bg-cyan-600 h-12 mt-1 text-sm lg:text-sm w-full sm:w-auto"
                              >
                                Update Profile
                              </button>
                              
                            </div>
                            </>
                          :
                          <>
                            <div className="col-span-6 sm:col-span-3 gap-4 lg:gap-6">
                            </div>
                            <div className="col-span-6 sm:col-span-3 gap-4 lg:gap-6">
                              
                              <button
                                      type="button"
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
                          </>
                        }
                        
                      </div>
                    </div>
                    }
                    
                  </div>
                </div>
              </div>
            </div>
          </form>
        }
        
      </div>
    </Dashboard>
  );
};


function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

export default dynamic(() => Promise.resolve(UpdateProfile), { ssr: false });
