
import React from 'react';
import { useState, useEffect } from 'react'
import Label from '@component/form/Label';
import {Form} from 'react-bootstrap';

const EditableCustomerInput = ({
  register,
  id,
  type,
  dataValue,
  label,
  name,
  defaultValue,
  placeholder,
  Icon,
  isDisable,
  changeData,
  canAutoChange,
  handleDataChange
}) => {


  
  var [value, setValue] = useState(dataValue);
  var [inputType, setInputType] = useState(type);
  
  
  //const [postalcode, setPostalCode] = useState('');
  const handleChange = (event) => {  
      //alert("Change")  
      //alert("Handle Change = " + isChangeByKey);
      setValue(event.target.value); 
      //dataVal = event.target.value;
      //alert("dataVal = " + dataVal);
    }
  const handleSubmit = (event) => {
        //alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
      }

    
    
    useEffect(() =>
    {
      if(canAutoChange === true)
      {
        //alert("Val = " + value + " DVal = " + dataValue)
        if(dataValue !== value)
        {
          setValue(dataValue);
        }
      }  

    },[])

    useEffect(() =>{
      if(canAutoChange === true)
      {
        //alert("Val = " + value + " DVal = " + dataValue)
        if(dataValue !== value)
        {
          setValue(dataValue);
        }
      }
    });

    return (
      <div className="mb-3">
          <label for="exampleFormControlInput1" style={{color:"dimgray",display:"flex"}} className="form-label">{label}</label>
          {isDisable === true ?
          <h3 className="py-2 px-4 md:px-5">{value}</h3>
        :
          inputType === 'input'
            ?
              <input 
              {...register(`${name}`, {
                  required: `${label} is required!`,
                })}
              id={id} 
              type={inputType} 
              name={name}
              defaultValue={defaultValue}
              value={value}
              placeholder={placeholder}
              
              className={
              Icon
              ? 'py-2 pl-10 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-cyan-500 h-11 md:h-12'
              : 'py-2 px-4 md:px-5 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-cyan-500 h-11 md:h-12'
              }
              onChange={handleDataChange}/>
            :
              inputType === 'textarea'
              ?
                <textarea 
                {...register(`${name}`, {
                    required: `${label} is required!`,
                  })}
                  id={id} 
                type={inputType} 
                name={name}
                defaultValue={defaultValue}
                value={value}
                placeholder={placeholder}
                disabled
                className={
                Icon
                ? 'py-2 pl-10 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-cyan-500 h-11 md:h-12' 
                : 'py-2 px-4 md:px-5 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-cyan-500 h-11 md:h-12'
                }
                onChange={handleDataChange}></textarea>
              :
                <input 
                {...register(`${name}`, {
                    required: `${label} is required!`,
                  })}
                  id={id} 
                type={inputType} 
                name={name}
                defaultValue={defaultValue}
                value={value}
                placeholder={placeholder}
                
                
                className={
                
                Icon
                ? 'py-2 pl-10 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-cyan-500 h-11 md:h-12'
                : 'py-2 px-4 md:px-5 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-cyan-500 h-11 md:h-12'
                }
                onChange={handleDataChange}/>
          
              }
            </div>)
  
};

export default EditableCustomerInput;

