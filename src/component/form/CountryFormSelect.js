import React, { useEffect, useState } from 'react';
import Label from '@component/form/Label';
import {Form} from 'react-bootstrap';

const CountryFormSelect = ({
  register,
  defaultValue,
  name,
  label,
  type,
  placeholder,
  Icon,
  isDisable,
  dataList,
  selectedId,
  handleItemChange
}) => {

  
  
  const [countryId,setCountryId] = useState(0);
  const [countryList,setCountryList] = useState(dataList);
  const [countryOptionIndent,setCountryOptionIndent] = useState([]);
  

  useState(() => 
  {
    //alert('start dataList = ' + JSON.stringify(dataList));
    //alert('start countryList = ' + JSON.stringify(countryList));

    setCountryList(dataList);

    var countryOptionIndentData = [];
    if(selectedId === 0)
    {
      //alert("Select == 0")
      countryOptionIndentData.push(<option selected>Select Country</option>)
    }
    else
    {
      countryOptionIndentData.push(<option>Select Country</option>)
    }

    for(var i=0;i<dataList.length;i++)
    {
      if(countryList[i].countryId === countryId)
      {
        //alert("Select = " + countryId + " LocalName" + countryList[i].countryLocalName)
        countryOptionIndentData.push(<option selected value={countryList[i].countryId}>{countryList[i].countryLocalName}</option>)
      }
      else
      {
        countryOptionIndentData.push(<option value={countryList[i].countryId}>{countryList[i].countryLocalName}</option>)
      }
      
    }
    setCountryOptionIndent(countryOptionIndentData);
    setCountryList(dataList);
    setCountryId(selectedId);
  },[])
  
  useEffect(() => 
  {
    //alert('dataList = ' + JSON.stringify(dataList));
    //alert('countryList = ' + JSON.stringify(countryList));

    setCountryList(dataList);

    var countryOptionIndentData = [];
    if(selectedId === 0)
    {
      //alert("Select == 0")
      countryOptionIndentData.push(<option selected>Select Country</option>)
    }
    else
    {
      countryOptionIndentData.push(<option>Select Country</option>)
    }

    if(countryList.length > 0)
    {
      for(var i=0;i<dataList.length;i++)
      {
        if(countryList[i].countryId === countryId)
        {
          //alert("Select = " + countryId + " LocalName" + countryList[i].countryLocalName)
          countryOptionIndentData.push(<option selected value={countryList[i].countryId}>{countryList[i].countryLocalName}</option>)
        }
        else
        {
          countryOptionIndentData.push(<option value={countryList[i].countryId}>{countryList[i].countryLocalName}</option>)
        }
        
      }
    }
    
    setCountryOptionIndent(countryOptionIndentData);
    
    setCountryId(selectedId);

  });
  
  //alert(JSON.stringify(countryOptionIndent))
  //var json = countryOptionIndent.toString();//JSON.stringify(countryOptionIndent);
  
  //alert("Selected = " + json);

  return (
    <>
      <Label label={label} />
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-800 focus-within:text-gray-900 sm:text-base">
              <Icon />{' '}
            </span>
          </div>
        )}
        <Form.Select {...register(`${name}`, {
            required: `${label} is required!`,
          })}
          name={name}
          disabled={isDisable}
          className={
            isDisable 
              ?
                Icon
                ? 'py-2 pl-10 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-gray-50 border-gray-200 focus:outline-none focus:border-cyan-500 h-11 md:h-12'
                : 'py-2 px-4 md:px-5 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-gray-50 border-gray-200 focus:outline-none focus:border-cyan-500 h-11 md:h-12'
              :
                Icon
                ? 'py-2 pl-10 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-cyan-500 h-11 md:h-12'
                : 'py-2 px-4 md:px-5 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-cyan-500 h-11 md:h-12'
            
          }
          onChange={handleItemChange}
          >
            {countryOptionIndent}
            {/* {
                selectedId === 0
                ?
                    <option selected>Select Country</option>
                :
                    <option>Select Country</option>
            }
            {dataList !== null
            ?
                            
            dataList.map((item) => 
                item.countryId === selectedId
                ?
                    <option selected value={item.countryId}>{item.countryLocalName}</option>
                :
                    <option value={item.countryId}>{item.countryLocalName}</option>
                )
            :
                <option >Not Found</option>
            }  */}                  
        {/* <option >Open this select menu</option>
        <option value="1">One</option>
        <option selected value="2">Two</option>
        <option value="3">Three</option> */}
        </Form.Select>
        
      </div>
    </>
  );
};

export default CountryFormSelect;
