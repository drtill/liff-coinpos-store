import {
  Document,
  Page,
  Image,
  Text,
  View,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';
import React, { useContext, useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';

Font.register({
  family: 'Open Sans',
  fonts: [
    {
      src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf',
    },
    {
      src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-600.ttf',
      fontWeight: 600,
    },
  ],
});
Font.register({ family: 'Kanit',
  fonts:[
    {
      src: 'https://fonts.gstatic.com/s/kanit/v11/nKKX-Go6G5tXcr72GwU.ttf',
    }
  ]  });
Font.register({ family: 'Sarabun',
  fonts:[
    {
      src: 'https://fonts.gstatic.com/s/sarabun/v13/DtVjJx26TKEr37c9WBI.ttf',
    }
  ]  });
Font.register({ family: 'SarabunBold',
  fonts:[
    {
      src: 'https://fonts.gstatic.com/s/sarabun/v13/DtVmJx26TKEr37c9YK5sulw.ttf',
    }
  ]  });
Font.register({
  family: 'DejaVu Sans',
  fonts: [
    {
      src: 'https://kendo.cdn.telerik.com/2017.2.621/styles/fonts/DejaVu/DejaVuSans.ttf',
    },
    {
      src: 'https://kendo.cdn.telerik.com/2017.2.621/styles/fonts/DejaVu/DejaVuSans-Bold.ttf',
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    marginRight: 10,
    marginBottom: 20,
    marginLeft: 10,
    paddingTop: 30,
    paddingLeft: 10,
    paddingRight: 60,
    lineHeight: 1.5,
  },
  paymentTable: {
    display: 'table',
    width: 'auto',
    borderColor: '#d1d5db',
    marginTop:10
    
  },
  paymentMethodHeaderTableCol: {
    width: '20%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth:1,
    borderRightWidth:1,
    borderColor: '#d1d5db',
  },
  paymentMethodListTableCol: {
    width: '20%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth:1,
    borderRightWidth:1,
    borderColor: '#d1d5db',
  },
  approvedByHeaderTableCol: {
    width: '20%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth:1,
    borderRightWidth:1,
    borderColor: '#d1d5db',
  },
  approvedByListTableCol: {
    width: '20%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth:1,
    borderRightWidth:1,
    borderColor: '#d1d5db',
  },
  dueDateHeaderTableCol: {
    width: '20%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth:1,
    borderRightWidth:1,
    borderColor: '#d1d5db',
  },
  dueDateListTableCol: {
    width: '20%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth:1,
    borderRightWidth:1,
    borderColor: '#d1d5db',
  },
  payAmountHeaderTableCol: {
    width: '40%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth:1,
    borderRightWidth:1,
    borderColor: '#d1d5db',
  },
  payAmountListTableCol: {
    width: '40%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth:1,
    borderRightWidth:1,
    borderColor: '#d1d5db',
  },
   addressTable: {
    display: 'table',
    width: 'auto',
    borderColor: '#d1d5db',
    
  },
  addressTableRow: {
    margin: 'auto',
    flexDirection: 'row',
    color: '#B9D1EA',
    backgroundColor:'#B9D1EA',
    marginLeft:0,
    marginRight:0
  },
  addressTableInfoRow: {
    margin: 'auto',
    flexDirection: 'row',
    marginLeft:0,
    marginRight:0
  },
  
  addressTableCol: {
    width: '50%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth:1,
    borderRightWidth:1,
    borderColor: '#C0C0C0',
  },
  addressTableCell: {
    margin: 'auto',
    marginTop: 5,
    fontSize: 10,
    fontFamily: 'Sarabun',
  },
  addressHeader: {
    color:'#696969',
    fontSize: 11,
    fontFamily: 'Sarabun',
    fontWeight: 'bold',
    paddingLeft:5,
    marginLeft:5
  },
  addressInfo: {
    //color:'#000000',
    fontSize: 10,
    fontFamily: 'Sarabun',
    paddingTop:2,
    paddingLeft:5,
    
  },
  
  table: {
    display: 'table',
    width: 'auto',
    borderColor: '#d1d5db',
    color: '#4b5563',
  },
  summaryTable: {
    display: 'table',
    width: 'auto',
    
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row',
  },
  summaryTableRow: {
    flexDirection: 'row',
  },
  tableCol: {
    width: '15%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0.5,
    borderTopWidth: 0.5,
    borderColor: '#d1d5db',
  },

  summaryListTableCol1: {
    width: '60%',
    borderStyle:'solid',
    borderWidth: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth:0,
    borderRightWidth:0,
    
  },
  summaryListTableCol2: {
    width: '20%',
    borderStyle:'solid',
    borderWidth: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth:0,
    borderRightWidth:0,
    
  },
  summaryListTableCol3: {
    width: '20%',
    borderStyle:'solid',
    borderWidth: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth:0,
    borderRightWidth:0,
    
  },
  orderDetailHeaderTableRow: {
    margin: 'auto',
    flexDirection: 'row',
    color: '#c0c0c0',
    backgroundColor:'#c0c0c0',
    marginLeft:0,
    marginRight:0
  },
  orderHeaderTableCol: {
    width: '15%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth:1,
    borderRightWidth:1,
    borderColor: '#d1d5db',
  },
  orderListTableCol: {
    width: '15%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth:1,
    borderRightWidth:1,
    borderColor: '#d1d5db',
  },

  productHeaderTableCol: {
    width: '30%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth:1,
    borderRightWidth:1,
    borderColor: '#d1d5db',
  },
  productListTableCol: {
    width: '30%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth:1,
    borderRightWidth:1,
    borderColor: '#d1d5db',
  },
  qtyHeaderTableCol: {
    width: '15%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth:1,
    borderRightWidth:1,
    borderColor: '#d1d5db',
  },
  qtyListTableCol: {
    width: '15%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth:1,
    borderRightWidth:1,
    borderColor: '#d1d5db',
  },
  unitPriceHeaderTableCol: {
    width: '20%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth:1,
    borderRightWidth:1,
    borderColor: '#d1d5db',
  },
  unitPriceListTableCol: {
    width: '20%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth:1,
    borderRightWidth:1,
    borderColor: '#d1d5db',
  },
  amountHeaderTableCol: {
    width: '20%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth:1,
    borderRightWidth:1,
    borderColor: '#d1d5db',
    
    
  },
  amountPriceListTableCol: {
    width: '20%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth:1,
    borderRightWidth:1,
    borderColor: '#d1d5db',
  },
  tableCell: {
    margin: 'auto',
    marginTop: 5,
    fontSize: 10,
    fontFamily: 'Kanit',
  },
  orderDetailTableCell: {
    margin: 'auto',
    marginTop: 5,
    fontSize: 10,
    fontFamily: 'Sarabun',
  },

  receiptFirst: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 5,
    borderBottom: 0.5,
  },
  receiptSecond: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 5,
    paddingBottom: 5,
  },
  receiptSecond1: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 0,
    paddingBottom: 5,
  },
  receiptSecond2: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 5,
    paddingBottom: 5,
  },
  receiptThird: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingTop: 5,
    paddingBottom: 0,
  },
  logo: {
    width: 96,
    height: 96,
    paddingTop:'flex-start',
    alignItems:'flex-start',
    alignContent:'flex-start',
    alignSelf:'flex-start'
  },
  title: {
    color: '#111827',
    fontFamily: 'Sarabun',
    fontWeight: 'bold',
    fontSize: 13,
  },
  info: {
    fontSize: 10,
    color: '#374151',
    fontFamily: 'Kanit',
    
  },

  companyNameInfo: {
    fontSize: 16,
    color: '#000000',
    fontFamily: 'SarabunBold',
    fontWeight: 'bold',
    paddingBottom:5
  },
  locationInfo: {
    fontSize: 12,
    color: '#000000',
    fontFamily: 'Sarabun',
    paddingTop:0,
    paddingBottom:0
  },
  receiptTitle: {
    fontSize: 20,
    color: '#000000',
    fontFamily: 'SarabunBold',
    fontWeight: 'bold',
    textAlign:'left',
    paddingTop: 5,
    paddingBottom:5
  },
  receiptInfo: {
    fontSize: 10,
    color: '#374151',
    fontFamily: 'Sarabun',
    textAlign:'right',
    
  },
  barcode: {
    width: 192,
    height: 48,
    bottom: 5,
  },
  dateTitle: {
    fontSize: 10,
    color: '#000000',
    fontFamily: 'Sarabun',
    paddingTop:0,
    paddingBottom:0
  },
  employeeTitle: {
    fontSize: 10,
    color: '#696969',
    fontFamily: 'Sarabun',
    paddingTop:0,
    paddingLeft:5,
    paddingBottom:0
  },
  statusTitle: {
    fontSize: 12,
    color: '#000000',
    fontFamily: 'Sarabun',
    fontWeight: 'bold',
    paddingTop:0,
    paddingLeft:5,
    paddingBottom:0
  },
  amount: {
    fontSize: 10,
    fontFamily: 'Sarabun',
    color: '#ef4444',
  },
  status: {
    color: '#10b981',
  },
  quantity: {
    color: '#1f2937',
  },
  summaryBold: {
    color: '#1f2937',
    fontFamily: 'Sarabun',
    fontWeight:'bold'
  },
  summary: {
    color: '#1f2937',
    fontFamily: 'Sarabun',
    
  },
  header: {
    color: '#111827',
    fontSize: 11,
    fontFamily: 'Sarabun',
    fontWeight: 'bold',
  },
  orderDetailHeader: {
    color: '#696969',
    fontSize: 11,
    fontFamily: 'Sarabun',
    fontWeight: 'bold',
  },
  orderDetailCell: {
    
    margin: 'auto',
    marginTop: 5,
    fontSize: 10,
    fontFamily: 'Sarabun',
  },
  summaryCell1: {
    
    textAlign:'right',
    marginTop: 5,
    fontSize: 10,
    fontFamily: 'Sarabun',
  },
  summaryCell2: {
    
    textAlign:'right',
    marginTop: 5,
    marginRight:2,
    fontSize: 10,
    fontFamily: 'Sarabun',
  },

  thanks: {
    color: '#22c55e',
    fontFamily: 'Sarabun',
  },
});

const ReceiptForDownload = ({ data, currencySign,companyName, locationName, locationAddress1,locationAddress2,locationCity,locationStateOrProvince,locationCountry,locationPostalCode,
  locationEmail,locationWebsite,locationTel }) => {

    const [companyLogo,setCompanyLogo] = useState('')
  useEffect(() =>
  {
    if(sessionStorage.getItem('companyLogo'))
      {
        var companyLogoData = sessionStorage.getItem('companyLogo'); 
        //alert('companyLogoData = ' + companyLogoData);
        setCompanyLogo(companyLogoData);
      }

  },[]);
  return (
    <>
      <Document>
        <Page size="A4" style={styles.page}>
        <View style={styles.receiptFirst}>
            <View>
              <Text style={styles.companyNameInfo}>
                {companyName}
              </Text>
              <Text style={styles.locationInfo}>
                ????????????: {locationName}
              </Text>
              <Text style={styles.locationInfo}>
                ??????????????????????????????????????????????????????????????????????????????: {locationName}
              </Text>
              <Text style={styles.locationInfo}>
                {locationAddress1} {locationAddress2} {locationCity} {locationStateOrProvince}
              </Text>

              <Text style={styles.locationInfo}> {locationCountry} {locationPostalCode}</Text>
              <Text style={styles.locationInfo}> Phone: {locationTel}</Text>
              <Text style={styles.locationInfo}> e-mail: {locationEmail}</Text>
              <Text style={styles.locationInfo}> Website: {locationWebsite}</Text>


            </View>
            <View>
              <Image style={styles.logo} src={companyLogo} />

            </View>
          </View>

          <View style={styles.receiptSecond}>
            <View>
              <Text style={styles.receiptTitle}>
                RECEIPT/??????????????????????????????????????????
              </Text>
            </View>
            <View>
              <Text style={styles.title}>???????????????????????????????????????????????????????????????</Text>
              <Text style={styles.receiptInfo}>#{data.receiptNumber}</Text>
            </View>
            
            
          </View>

          <View style={styles.receiptSecond1}>
            <View>
              <Text style={styles.dateTitle}>?????????????????? {data.orderDate !== undefined && (
                  <span>{dayjs(data?.orderDate).format('MMMM D, YYYY')}</span>
                )}</Text>
              {/* <Text style={styles.info}>
                {data.orderDate !== undefined && (
                  <span>{dayjs(data?.orderDate).format('MMMM D, YYYY')}</span>
                )}
              </Text> */}
            </View>
            
            
          </View>

          <View style={styles.addressTable}>
            <View style={styles.addressTableRow}>
              <View style={styles.addressTableCol}>
                <Text style={styles.addressTableCell}>
                  <span style={styles.addressHeader}>???????????????????????????????????????????????????????????? </span>
                </Text>
              </View>
              <View style={styles.addressTableCol}>
                <Text style={styles.addressTableCell}>
                  <span style={styles.addressHeader}>???????????????????????????????????????</span>
                </Text>
              </View>
              
            </View>
            <View style={styles.addressTableInfoRow}>
                <View style={styles.addressTableCol}>
                  <Text style={styles.addressInfo}>{data.customerName}</Text>
                  <Text style={styles.addressInfo}>{data.customerMobile}</Text>
                  <Text style={styles.addressInfo}>{data.shippingAddress === null ? "" : (data.shippingAddress === undefined ? "" : data.shippingAddress)}</Text>
                  <Text style={styles.addressInfo}>
                    {data.shippingCity}, {data.shippingCountry}, {data.shippingZipCode}
                  </Text>
                  
                </View>
                <View style={styles.addressTableCol}>
                  <Text style={styles.addressInfo}>{data.customerName}</Text>
                  <Text style={styles.addressInfo}>{data.customerMobile}</Text>
                  <Text style={styles.addressInfo}>{data.shippingAddress === null ? "" : (data.shippingAddress === undefined ? "" : data.shippingAddress)} </Text>
                  <Text style={styles.addressInfo}>
                    {data.shippingCity}, {data.shippingCountry}, {data.shippingZipCode}
                  </Text>
                </View>
                
              </View>
            
          </View>

          <View style={styles.receiptSecond2}>
            <View>
               <Text style={styles.employeeTitle}>?????????????????????????????? {data.orderEmployee}</Text>
              {/* <Text style={styles.info}>
                {data.orderDate !== undefined && (
                  <span>{dayjs(data?.orderDate).format('MMMM D, YYYY')}</span>
                )}
              </Text> */}
            </View>
            <View>
              <Text style={styles.statusTitle}>???????????????: {data.orderStatus}</Text>
            </View>
            
            
          </View>

          <View style={styles.table}>
            <View style={styles.orderDetailHeaderTableRow}>
              <View style={styles.orderHeaderTableCol}>
                <Text style={styles.orderDetailTableCell}>
                  <span style={styles.orderDetailHeader}>??????????????? </span>
                </Text>
              </View>
              <View style={styles.productHeaderTableCol}>
                <Text style={styles.orderDetailTableCell}>
                  <span style={styles.orderDetailHeader}>??????????????????</span>
                </Text>
              </View>
              <View style={styles.qtyHeaderTableCol}>
                <Text style={styles.orderDetailTableCell}>
                  <span style={styles.orderDetailHeader}>??????????????? </span>
                </Text>
              </View>
              <View style={styles.unitPriceHeaderTableCol}>
                <Text style={styles.orderDetailTableCell}>
                  <span style={styles.orderDetailHeader}>????????????????????????????????????</span>
                </Text>
              </View>

              <View style={styles.amountHeaderTableCol}>
                <Text style={styles.orderDetailTableCell}>
                  
                  {' '}
                  <span style={styles.orderDetailHeader}>?????????</span>
                </Text>
              </View>
            </View>
            {data?.orderDetails?.map((item, i) => (
              <View key={i} style={styles.tableRow}>
                <View style={styles.orderListTableCol}>
                  <Text style={styles.orderDetailCell}>{i + 1} </Text>
                </View>
                <View style={styles.productListTableCol}>
                  <Text style={styles.orderDetailCell}>{item.productVariantName} </Text>
                </View>
                <View style={styles.qtyListTableCol}>
                  <Text style={styles.orderDetailCell}>
                    {' '}
                    <span style={styles.quantity}>{item.quantity}</span>{' '}
                  </Text>
                </View>
                <View style={styles.unitPriceListTableCol}>
                  <Text style={styles.orderDetailCell}>
                    {' '}
                    <span style={styles.quantity}>{currencySign}{item.productVariantPrice}.00</span>{' '}
                  </Text>
                </View>

                <View style={styles.amountPriceListTableCol}>
                  <Text style={styles.orderDetailCell}>
                    <span style={styles.amount}>{currencySign}{parseInt(item.quantity) * parseFloat(item.productVariantPrice)}.00</span>{' '}
                  </Text>
                </View>
              </View>
            ))}
          </View>
          
          

          <View style={styles.receiptThird}>
            <View style={styles.summaryTable}>
              
                <View style={styles.summaryTableRow}>
                  <View style={styles.summaryListTableCol1}>
                  
                  </View>
                
                  <View style={styles.summaryListTableCol2}>
                    <Text style={styles.summaryCell1}>
                      {' '}
                      <span style={styles.summaryBold}>??????????????????</span>{' '}
                    </Text>
                  </View>

                  <View style={styles.summaryListTableCol3}>
                    <Text style={styles.summaryCell2}>
                      <span style={styles.summaryBold}>{currencySign}{Math.round(data.subTotal)}.00</span>{' '}
                    </Text>
                  </View>
                </View>
                <View style={styles.summaryTableRow}>
                  <View style={styles.summaryListTableCol1}>
                  
                  </View>
                
                  <View style={styles.summaryListTableCol2}>
                    <Text style={styles.summaryCell1}>
                      {' '}
                      <span style={styles.summary}>??????????????????</span>{' '}
                    </Text>
                  </View>

                  <View style={styles.summaryListTableCol3}>
                    <Text style={styles.summaryCell2}>
                      <span style={styles.summary}>{currencySign}{Math.round(data.totalDiscount)}.00</span>{' '}
                    </Text>
                  </View>
                </View>
                
                <View style={styles.summaryTableRow}>
                  <View style={styles.summaryListTableCol1}>
                  
                  </View>
                
                  <View style={styles.summaryListTableCol2}>
                    <Text style={styles.summaryCell1}>
                      {' '}
                      <span style={styles.summary}>????????????{'(' + data.taxRate + '%)'}</span>{' '}
                    </Text>
                  </View>

                  <View style={styles.summaryListTableCol3}>
                    <Text style={styles.summaryCell2}>
                      <span style={styles.summary}>{currencySign}{Math.round(data.taxAmount)}.00</span>{' '}
                    </Text>
                  </View>
                </View>
                <View style={styles.summaryTableRow}>
                  <View style={styles.summaryListTableCol1}>
                  
                  </View>
                
                  <View style={styles.summaryListTableCol2}>
                    <Text style={styles.summaryCell1}>
                      {' '}
                      <span style={styles.summary}>????????????????????????????????????????????????</span>{' '}
                    </Text>
                  </View>

                  <View style={styles.summaryListTableCol3}>
                    <Text style={styles.summaryCell2}>
                      <span style={styles.summary}>{currencySign}{Math.round(data.shippingFee)}.00</span>{' '}
                    </Text>
                  </View>
                </View>
                <View style={styles.summaryTableRow}>
                  <View style={styles.summaryListTableCol1}>
                  
                  </View>
                
                  <View style={styles.summaryListTableCol2}>
                    <Text style={styles.summaryCell1}>
                      {' '}
                      <span style={styles.summaryBold}>??????????????????????????????????????????</span>{' '}
                    </Text>
                  </View>

                  <View style={styles.summaryListTableCol3}>
                    <Text style={styles.summaryCell2}>
                      <span style={styles.summaryBold}>{currencySign}{Math.round(data.orderTotal)}.00</span>{' '}
                    </Text>
                  </View>
                </View>
              </View>
            <View>
              
            </View>
            
            {/* <View>
              <Text style={styles.title}>?????????????????????????????????????????? {' '}</Text>
              <Text style={styles.info}> {data.paymentMethod} </Text>
            </View>
            <View>
              <Text style={styles.title}>????????????????????????</Text>
              <Text style={styles.info}>
                {currencySign}{Math.round(data.shippingFee)}.00
              </Text>
            </View>
            <View>
              <Text style={styles.title}>??????????????????</Text>
              <Text style={styles.info}> {currencySign}{Math.round(data.totalDiscount)}.00</Text>
            </View>

            <View>
              <Text style={styles.title}>?????????????????????????????? {' '}</Text>
              <Text style={styles.amount}>{currencySign}{Math.round(data.orderTotal)}.00</Text>
            </View> */}
          </View>

          <View style={styles.paymentTable}>
            <View style={styles.orderDetailHeaderTableRow}>
              <View style={styles.paymentMethodHeaderTableCol}>
                <Text style={styles.orderDetailTableCell}>
                  <span style={styles.orderDetailHeader}>????????????????????????????????????????????? </span>
                </Text>
              </View>
              <View style={styles.approvedByHeaderTableCol}>
                <Text style={styles.orderDetailTableCell}>
                  <span style={styles.orderDetailHeader}>??????????????????????????????/??????????????????????????????</span>
                </Text>
              </View>
              <View style={styles.dueDateHeaderTableCol}>
                <Text style={styles.orderDetailTableCell}>
                  <span style={styles.orderDetailHeader}>???????????????????????????????????????  </span>
                </Text>
              </View>
              <View style={styles.payAmountHeaderTableCol}>
                <Text style={styles.orderDetailTableCell}>
                  <span style={styles.orderDetailHeader}>??????????????????????????????  </span>
                </Text>
              </View>

              
            </View>
            {data?.paymentDetails?.map((item, i) => (
              <View key={i} style={styles.tableRow}>
                <View style={styles.paymentMethodListTableCol}>
                  <Text style={styles.orderDetailCell}>{item.paymentMethod} </Text>
                </View>
                <View style={styles.approvedByListTableCol}>
                  <Text style={styles.orderDetailCell}>{item.approveBy} </Text>
                </View>
                <View style={styles.dueDateListTableCol}>
                  <Text style={styles.orderDetailCell}>
                    {' '}
                    <span style={styles.quantity}>
                      {item.dueDate !== undefined && (
                        dayjs(item.dueDate).format('MMMM D, YYYY')
                     )}
                    </span>{' '}
                  </Text>
                </View>
                <View style={styles.payAmountListTableCol}>
                  <Text style={styles.orderDetailCell}>
                    {' '}
                    <span style={styles.quantity}>{currencySign}{item.paymentAmount}.00</span>{' '}
                  </Text>
                </View>

                
              </View>
            ))}
          </View>
          <View
            style={{
              textAlign: 'center',
              fontSize: 12,
              paddingBottom: 50,
              paddingTop: 50,
              fontFamily: 'Kanit'
            }}
          >
            <Text>
              ?????????????????????????????????????????????????????? <span style={styles.thanks}>{data.customerName},</span> ??????????????????????????????????????????????????????????????????????????????????????? !
            </Text>
          </View>
        </Page>
      </Document>
    </>
  );
};

export default ReceiptForDownload;
