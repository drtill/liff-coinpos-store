import requests from './httpServices';

const serviceUrl = 'https://coinpos-uat.azurewebsites.net/lineliff/';
//const serviceUrl = 'http://localhost:41781/lineliff/';
const ProductServices = {
  getShowingProducts() {
    return requests.get('/products/show');
  },

  getDiscountedProducts() {
    return requests.get('/products/discount');
  },

  getProductBySlug(slug) {
    return requests.get(`/products/${slug}`);
  },
  getCountry(body)
  {
    return requests.post('/products/GetCountry',body);
  },
  getStateProvince(body)
  {
    return requests.post('/products/GetStateProvince',body);
  },
  async fetchGetStateProvince(body)
  {
    try
    {
      var provinceData = null;
      await fetch(serviceUrl + 'GetProvince',
      { 
        method:'POST',
        //credentials:"include",
        headers: {'Content-Type': 'application/json','x-security-lock':'0241CCFF2D40AF7AF8A4FC02272C47A30D15DBDFB36E3266D1296212574F328E'},
        body:``  
        }).then(function(response) {
          return response.text();
        }).then(function(data) {

        //var obj = JSON.parse(data);
        provinceData = (data);
      });
      
        return provinceData;
    }
    catch (err) 
    {
      return "Error: " + err.message;
      
    }
  },
  async fetchGetDefaultDataCompany(body){
    try
    {
      var productList = null;
      const products = await fetch(serviceUrl + 'GetDefaultDataCompany', 
        { 
          method:'POST',
          //credentials:"include",
          headers: {'Content-Type': 'application/json','x-security-lock':'0241CCFF2D40AF7AF8A4FC02272C47A30D15DBDFB36E3266D1296212574F328E'},
          body:`{"LiffId": "${body.liffId}","LineUserId":"${body.lineUserId}", "LinePOSId":"${body.linePOSId}", "GroupId":"${body.groupId}","OrderId":${body.orderId},"CompanyId":${body.companyId},
          "CatalogName":"${body.catalogName}","CompanyCode":"${body.companyCode}","PromotionId":${body.promotionId},"LocationId":${body.locationId},"CompanyName":"${body.companyName}","LocationName":"${body.locationName}","Page":${body.page},"RowPerPage":${body.itemPerPage},"Query":"${body.query}","Category":"${body.category}","Product":"${body.product}"}`
          
        }).then(function(response) {
          return response.text();
        }).then(function(data) {

          console.log("GetData = " + data)
          try
          {
            var obj = JSON.parse(data);
            var pvJson = obj.ProductVariantListJson
            productList = JSON.parse(pvJson)
          }
          catch(ex)
          {
            return "Error: " + data;
            
          }
          
          
          //closeNav(null);
        });
      

        return productList;
    }
    catch(err) {
      return "Error: " + err.message;
      
    }
  },
};

export default ProductServices;
