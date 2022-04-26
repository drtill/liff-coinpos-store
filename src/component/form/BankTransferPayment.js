import React, { useEffect } from 'react';
import { useState } from 'react'
import DatePicker from "react-datepicker";
import ProductServices from '@services/ProductServices';
import "react-datepicker/dist/react-datepicker.css";
import {
  IoReturnUpBackOutline,
  IoArrowForward,
  IoBagHandle,
  IoWalletSharp,
} from 'react-icons/io5';
import Loading from '@component/preloader/Loading';

const BankTransferPayment = (
    { 
        register, 
        Icon, 
        name, 
        value,
        dataList,
        orderId,
        liffId,
        lineUserId,
        companyId
    }) => {
  
      const [payLoading, setPayLoading] = useState(false);
      var [startDate,setStartDate] = useState(new Date())
      var [bankAccount,setBankAccountNumber] = useState('');
      var [bankAccountName,setBankAccountName] = useState('');
      
      const [bankTransferOptionIndent,setBankTransferOptionIndent] = useState([]);

      useEffect(() => {
        var bankTransferOptionIndentData = [];
        for(var i=0;i<dataList.length;i++)
        {
            bankTransferOptionIndentData.push(<div className="flex item-center justify-between"><div className="flex items-center"><span className="text-xl mr-3 text-gray-400"><Icon /></span><h6 className="font-serif font-medium text-sm text-gray-600">{dataList[i].bankName}</h6></div><label className="form-radio outline-none focus:ring-0 text-cyan-500">{dataList[i].bankAccount}</label><input type="radio" value={dataList[i].bankAccount} onClick={() => setBankAccount(
              dataList[i].bankAccount,dataList[i].bankName)} name="bankMethod" className="form-radio outline-none focus:ring-0 text-cyan-500"/></div>)
            
        }
        setBankTransferOptionIndent(bankTransferOptionIndentData);
      },[]);
        
  
        const handleChange = (date) => {
          setStartDate(date)
          
        }
  
        
    const setBankAccount = (_account, _accountName) => {
      //alert("Select " + _account);
      setBankAccountNumber(_account);
      setBankAccountName(_accountName);
      
    }
    const InformBankTransfer = async() => {
    
      setPayLoading(true);
      var accountName = bankAccountName;
      var accountNumber = bankAccount;
      var transferTimeValue = startDate
      await ProductServices.fetchSendBankTransferPayment(
        {
          orderId,
          liffId,
          lineUserId,
          companyId,
          accountName,
          accountNumber,
          transferTimeValue


        })
      alert("Inform " + bankAccount);
      setPayLoading(false);
    }
        
    return (
      payLoading === true
      ?
        <Loading loading={payLoading} />
      :
        <div className="px-3 py-4 card border border-gray-200 bg-white rounded-md">
          <label className="cursor-pointer label">
            {bankTransferOptionIndent}
          </label>
          <div className='row'>
            <p className="text-base opacity-90 leading-7 mb-3">
              ระบุวันและเวลา เพื่อแจ้งการโอนชำระเงินของคุณ
            </p>
          </div>
          <div className='row'>
            <DatePicker id="bankTransfer-datePicker" className="mb-4 py-2 pl-10 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-cyan-500 h-11 md:h-12"
                      selected={startDate}
                      onChange={handleChange}
                      name="startDate"
                      timeFormat="HH:mm"
                      timeIntervals={1}
                      timeCaption="time"
                      dateFormat="MMMM d, yyyy HH:mm"
                      showTimeSelect
                    />
                                          
          </div>
          <div className='row' style={{display:"contents",marginRight:"20px"}}>

            <button
              type="button" onClick={() => InformBankTransfer()}
              className="bg-cyan-500 hover:bg-cyan-600 border border-cyan-500 transition-all rounded py-3 text-center text-sm font-serif font-medium text-white flex justify-center w-full"
            >
              แจ้งการโอน{' '}
              <span className="text-xl ml-2">
                {' '}
                <IoArrowForward />
              </span>
            </button>
                  
          </div>
        </div>
    
    );
};

export default BankTransferPayment;
