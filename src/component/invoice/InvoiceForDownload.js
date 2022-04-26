import {
  Document,
  Page,
  Image,
  Text,
  View,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';
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
  table: {
    display: 'table',
    width: 'auto',
    borderColor: '#d1d5db',
    color: '#4b5563',
  },
  tableRow: {
    margin: 'auto',
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
  tableCell: {
    margin: 'auto',
    marginTop: 5,
    fontSize: 10,
    fontFamily: 'Kanit',
  },

  invoiceFirst: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 20,
    borderBottom: 0.5,
  },
  invoiceSecond: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingBottom: 20,
  },
  invoiceThird: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingBottom: 20,
  },
  logo: {
    width: 30,
    height: 30,
    bottom: 5,
  },
  title: {
    color: '#111827',
    fontFamily: 'Kanit',
    fontWeight: 'bold',
    fontSize: 13,
  },
  info: {
    fontSize: 10,
    color: '#374151',
    fontFamily: 'Kanit',
    
  },
  amount: {
    fontSize: 10,
    fontFamily: 'Kanit',
    color: '#ef4444',
  },
  status: {
    color: '#10b981',
  },
  quantity: {
    color: '#1f2937',
  },
  header: {
    color: '#111827',
    fontSize: 11,
    fontFamily: 'Kanit',
    fontWeight: 'bold',
  },

  thanks: {
    color: '#22c55e',
    fontFamily: 'Kanit',
  },
});

const InvoiceForDownload = ({ data,companyLogo, currencySign }) => {
  return (
    <>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.invoiceFirst}>
            <View>
              <Text style={{ fontFamily: 'Kanit', fontWeight: 'bold' }}>
                ใบเรียกเก็บเงิน
              </Text>
              <Text style={styles.info}>
                สถานะ :{' '}
                {data.orderStatus === 'Draft' && (
                  <span style={{ color: '#eab308' }}>{data.orderStatus}</span>
                )}
                {data.orderStatus === 'Active' && (
                  <span style={{ color: '#14b8a6' }}>{data.orderStatus}</span>
                )}
                {data.orderStatus === 'Finalized' && (
                  <span style={{ color: '#14b8a6' }}>{data.orderStatus}</span>
                )}
                {data.orderStatus === 'Fulfilled' && (
                  <span style={{ color: '#22c55e' }}>{data.orderStatus}</span>
                )}
                {data.orderStatus === 'Canceled' && (
                  <span style={{ color: '#f43f5e' }}>{data.orderStatus}</span>
                )}
              </Text>
            </View>
            <View>
              <Image style={styles.logo} src={companyLogo} />
              <Text style={styles.info}>
                Cecilia Chapman, 561-4535 Nulla LA,
              </Text>
              <Text style={styles.info}> United States 96522</Text>
            </View>
          </View>

          <View style={styles.invoiceSecond}>
            <View>
              <Text style={styles.title}>วันที่</Text>
              <Text style={styles.info}>
                {data.orderDate !== undefined && (
                  <span>{dayjs(data?.orderDate).format('MMMM D, YYYY')}</span>
                )}
              </Text>
            </View>
            <View>
              <Text style={styles.title}>หมายเลขใบเรียกเก็บเงิน</Text>
              <Text style={styles.info}>#{data.invoiceNumber}</Text>
            </View>
            <View>
              <Text style={styles.title}>ที่อยู่เรียกเก็บเงิน</Text>
              <Text style={styles.info}>{data.customerName}</Text>
              <Text style={styles.info}> {data.shippingToAddress === null ? "" : (data.shippingToAddress === undefined ? "" : data.shippingToAddress.substring(0, 25))}</Text>
              {/* <Text style={styles.info}>
                {data.city}, {data.country}, {data.zipCode}
              </Text> */}
            </View>
          </View>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  <span style={styles.header}>ลำดับ</span>
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  <span style={styles.header}>ชื่อสินค้า</span>
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  <span style={styles.header}>จำนวน</span>
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  <span style={styles.header}>ราคาต่อหน่วย</span>
                </Text>
              </View>

              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {' '}
                  <span style={styles.header}>ยอดรวม</span>
                </Text>
              </View>
            </View>
            {data?.orderDetails?.map((item, i) => (
              <View key={i} style={styles.tableRow}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{i + 1} </Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{item.productVariantName} </Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>
                    {' '}
                    <span style={styles.quantity}>{item.quantity}</span>{' '}
                  </Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>
                    {' '}
                    <span style={styles.quantity}>{currencySign}{item.productVariantPrice}.00</span>{' '}
                  </Text>
                </View>

                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>
                    <span style={styles.amount}>{currencySign}{parseInt(item.quantity) * parseFloat(item.productVariantPrice)}.00</span>{' '}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.invoiceThird}>
            <View>
              <Text style={styles.title}>รูปแบบชำระเงิน {' '}</Text>
              <Text style={styles.info}> {data.paymentMethod} </Text>
            </View>
            <View>
              <Text style={styles.title}>ค่าขนส่ง</Text>
              <Text style={styles.info}>
                {currencySign}{Math.round(data.shippingFee)}.00
              </Text>
            </View>
            <View>
              <Text style={styles.title}>ส่วนลด</Text>
              <Text style={styles.info}> {currencySign}{Math.round(data.totalDiscount)}.00</Text>
            </View>

            <View>
              <Text style={styles.title}>ยอดชำระรวม {' '}</Text>
              <Text style={styles.amount}>{currencySign}{Math.round(data.orderTotal)}.00</Text>
            </View>
          </View>

          <View
            style={{
              textAlign: 'center',
              fontSize: 12,
              paddingBottom: 50,
              paddingTop: 50,
              fontFamily: 'Kanit',
            }}
          >
            <Text>
              ขอบคุณที่ใช้บริการ <span style={styles.thanks}>{data.customerName},</span> เราได้รับคำสั่งซื้อของคุณแล้ว !
            </Text>
          </View>
        </Page>
      </Document>
    </>
  );
};

export default InvoiceForDownload;
