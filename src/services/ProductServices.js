import requests from './httpServices';

//const serviceUrl = 'https://coinpos-prod.azurewebsites.net/lineliff/';
const serviceUrl = 'https://coinpos-uat.azurewebsites.net/lineliff/';
//const serviceUrl = 'http://localhost:41781/lineliff/';
const ProductServices = {
  getShowingProducts() {
    return requests.get('/products/show');
  },

  getDiscountedProducts() {
    return requests.get('/products/discount');
  },
  async fetchCreateLiffOrder(body)
  {
    try
    {
      var productList = null;
        const products = await fetch(serviceUrl + 'CreateNewLiffOrder',//fetch('http://localhost:5002/simple-cors3', 
        { 
          method:'POST',
          //credentials:"include",
          headers: {'Content-Type': 'application/json','x-security-lock':'0241CCFF2D40AF7AF8A4FC02272C47A30D15DBDFB36E3266D1296212574F328E'},
          body:`{"CompanyId": ${body.companyId === null ? 0 : body.companyId}, "LocationId":${body.locationId === null ? 0 : body.locationId},"CompanyName":"${body.companyName}",
          "LocationName":"${body.locationName}","Email":"${body.email}",
          "LineUserId":"${body.lineUserId}","LinePOSId":"${body.linePOSId}","LiffId":"${body.liffId}","GroupId":"${body.groupId}",
          "PictureUrl":"${body.pictureUrl}"}`
          
        }).then(function(response) {
          return response.text();
        }).then(function(data) {

          alert("Data = " + data);
          var obj = JSON.parse(data);
          //var pvJson = obj.ProductVariantListJson
          productList = obj
          
        });
      
        return productList;
    }
    catch (err) 
    {
      return "Error: " + err.message;
      
    }
  },
  async fetchUpdateSocialPOSShipping(body){
    try
    {
      var productList = null;
        const products = await fetch(serviceUrl + 'NotifyShippingMethod',//fetch('http://localhost:5002/simple-cors3', 
        { 
          method:'POST',
          //credentials:"include",
          headers: {'Content-Type': 'application/json','x-security-lock':'0241CCFF2D40AF7AF8A4FC02272C47A30D15DBDFB36E3266D1296212574F328E'},
          body:`{"OrderId": ${body.orderId},"OrderNumber": "${body.orderNumber}", "CompanyId": ${body.companyId === null ? 0 : body.companyId}, "StockLocationId":${body.locationId === null ? 0 : body.locationId},"LineUserId":"${body.lineUserId}","LinePOSId":"${body.linePOSId}","LiffId":"${body.liffId}","PictureUrl":"${body.pictureUrl}","ShippingLabel":"${body.shippingLabel}","ShippingId":${body.shippingId},"ShippingFee":${body.shippingCost}}`
          
        }).then(function(response) {
          return response.text();
        }).then(function(data) {

          
          var obj = JSON.parse(data);
          //var pvJson = obj.ProductVariantListJson
          productList = obj
          
        });
      
        return productList;
    }
    catch (err) 
    {
      return "Error: " + err.message;
      
    }
  },
  addToCoinPOSCart(body){
    return requests.post('/products/AddToCoinPOSCart',body);
  },
  async fetchAddToCoinPOSCart(body){
    try
    {
      var productList = null;
        const products = await fetch(serviceUrl + 'AddToLiffOrder',//fetch('http://localhost:5002/simple-cors3', 
        { 
          method:'POST',
          //credentials:"include",
          headers: {'Content-Type': 'application/json','x-security-lock':'0241CCFF2D40AF7AF8A4FC02272C47A30D15DBDFB36E3266D1296212574F328E'},
          body:`{"OrderId": ${body.orderId},"ProductVariantId": ${body.pvId}, "CompanyId": ${body.companyId === null ? 0 : body.companyId}, "StockLocationId":${body.locationId === null ? 0 : body.locationId},"PromotionCode":"","TaxTypeId":2,"LineUserId":"${body.lineUserId}","LinePOSId":"${body.linePOSId}","GroupId":"${body.groupId}","LiffId":"${body.liffId}","PictureUrl":"${body.pictureUrl}","PromotionCode":"${body.promotionCode}"}`
          
        }).then(function(response) {
          return response.text();
        }).then(function(data) {

          
          var obj = JSON.parse(data);
          //var pvJson = obj.ProductVariantListJson
          productList = obj
          
        });
      
        return productList;
    }
    catch (err) 
    {
      return "Error: " + err.message;
      
    }
  },
  updateCoinPOSCartDetail(body)
  {
    return requests.post('/products/UpdateCoinPOSCartDetail',body);
  },
  async fetchUpdateCoinPOSCartDetail(body)
  {
    try
    {
      var obj = null;
      await fetch(serviceUrl + 'UpdateOrderDetail', 
            { 
              method:'POST',
              headers: {'Content-Type': 'application/json','x-security-lock':'0241CCFF2D40AF7AF8A4FC02272C47A30D15DBDFB36E3266D1296212574F328E'},
              body:`{"OrderDetailId":${body.orderDetailId},"UserId":${body.userId},"Quantity":${body.quantity},"CompanyId":${body.companyId},"OrderId": ${body.orderId},"ProductVariantId": ${body.pvId},"UpdateType":"${body.updateType}","LineUserId":"${body.linePOSId}","LiffId":"${body.liffId}","PictureUrl":"${body.pictureUrl}"}`
              
            }).then(function(response) {
              return response.text();
            }).then(function(data) {
      
              
              try
              {
                obj = JSON.parse(data);
                

              }
              catch(ex)
              {
                
              }
              
            });

            return obj;
    }
    catch (err) 
    {
      return "Error: " + err.message;
      
    }
  },
  removeCoinPOSCartDetail(body)
  {
    return requests.post('/products/RemoveCoinPOSCartDetail',body);
  },
  async fetchRemoveCoinPOSCartDetail(body)
  {
    try
    {
      var obj = null;
      await fetch(serviceUrl + 'DeleteOrderDetail', 
            { 
              method:'POST',
              headers: {'Content-Type': 'application/json','x-security-lock':'0241CCFF2D40AF7AF8A4FC02272C47A30D15DBDFB36E3266D1296212574F328E'},
              body:`{"OrderId": ${body.orderId}, "ProductVariantId":${body.pvId},"LineUserId":"${body.linePOSId}","LiffId":"${body.liffId}","PictureUrl":"${body.pictureUrl}"}`
              
            }).then(function(response) {
              return response.text();
            }).then(function(data) {
      
              
              try
              {
                obj = JSON.parse(data);
                

              }
              catch(ex)
              {
                
              }
              
            });

            return obj;
    }
    catch (err) 
    {
      return "Error: " + err.message;
      
    }
  },
  applyPromotionCode(body) {
    return requests.post('/products/ApplyPromotionCode',body);
  },
  async fetchApplyPromotionCode(body) {
    try
    {
      var productList = null;
      await fetch(serviceUrl + 'ApplyPromotionCode',//fetch('http://localhost:5002/simple-cors3', 
      { 
        method:'POST',
        //credentials:"include",
        headers: {'Content-Type': 'application/json','x-security-lock':'0241CCFF2D40AF7AF8A4FC02272C47A30D15DBDFB36E3266D1296212574F328E'},
        body:`{"CompanyId":${body.companyId},"LocationId":${body.locationId},
        "OrderId":${body.orderId},
        "PromotionCode":"${body.qrPromotion}",
        "UserId":1,
        "LineUserId": "${body.lineUserId}",
        "LinePOSId":"${body.linePOSId}","LiffId":"${body.liffId}","PictureUrl":"${body.pictureUrl}",
        "CatalogName":"${body.catalogName}","OrderDetails":${body.orderDetails}}`
        }).then(function(response) {
          return response.text();
        }).then(function(data) {

        //var obj = JSON.parse(data);
        //console.log("Obj = " + obj);
        //console.log(data); // this will be a string
        productList = data;
      });
      
        return productList;
    }
    catch (err) 
    {
      return "Error: " + err.message;
      
    }
  },
  cancelPromotionCode(body) {
    return requests.post('/products/CancelPromotionCode',body);
  },
  getQRPayment(body)
  {
    return requests.post('/products/GetQRPayment',body);
  },
  async fetchGetQRPayment(body)
  {
    try
    {
        var paymentData = null;
        await fetch(serviceUrl + 'GetQRPayment',//fetch('http://localhost:5002/simple-cors3', 
              { 
                method:'POST',
                //credentials:"include",
                headers: {'Content-Type': 'application/json','x-security-lock':'0241CCFF2D40AF7AF8A4FC02272C47A30D15DBDFB36E3266D1296212574F328E'},
                body:`{"OrderId": ${body.orderId},"LiffId":"${body.liffId}","LineUserId":"${body.lineUserId}", "CompanyId":${body.companyId}}`
                
              }).then(function(response) {
                return response.text();
              }).then(function(data) {
        
                var obj = JSON.parse(data);
                paymentData = obj
                
              });
              return paymentData;
    }
    catch (err) 
    {
      return 'Error: ' + err.message;
      
    }
  },
  async fetchCancelPromotionCode(body) {
    try
    {
      var productList = null;
      await fetch(serviceUrl + 'ApplyPromotionCode',//fetch('http://localhost:5002/simple-cors3', 
      { 
        method:'POST',
        //credentials:"include",
        headers: {'Content-Type': 'application/json','x-security-lock':'0241CCFF2D40AF7AF8A4FC02272C47A30D15DBDFB36E3266D1296212574F328E'},
        body:`{"CompanyId":${body.companyId},"LocationId":${body.locationId},
        "OrderId":${body.orderId},
        "PromotionCode":"${body.qrPromotion}",
        "UserId":1,
        "LineUserId": "${body.lineUserId}",
        "LinePOSId":"${body.linePOSId}","LiffId":"${body.liffId}","PictureUrl":"${body.pictureUrl}",
        "CatalogName":"${body.catalogName}","OrderDetails":${body.orderDetails}}`
        }).then(function(response) {
          return response.text();
        }).then(function(data) {

        //var obj = JSON.parse(data);
        //console.log("Obj = " + obj);
        //console.log(data); // this will be a string
        productList = data;
      });
      
        return productList;
    }
    catch (err) 
    {
      return "Error: " + err.message
      
    }
  },
  getProductBySlug(slug) {
    return requests.get(`/products/${slug}`);
  },
  getOrderByUserId(body)
  {
    return requests.post('/products/GetOrderByUserId',body);
  },
  async fetchGetOrderByUserId(body)
  {
    try {

      var productList = null;
      console.log("Get Order = " + JSON.stringify(body));
      alert("Get Order by user = " + JSON.stringify(req.body));
      
      //return;
      await fetch(serviceUrl + 'GetOrderByUserId',//fetch('http://localhost:5002/simple-cors3', 
      { 
        method:'POST',
        //credentials:"include",
        headers: {'Content-Type': 'application/json','x-security-lock':'0241CCFF2D40AF7AF8A4FC02272C47A30D15DBDFB36E3266D1296212574F328E'},
        body:`{"CompanyId":"${body.companyId}","LineUserId":"${body.lineUserId}","LinePOSId":"${body.linePOSId}","LiffId":"${body.liffId}","Page":${body.page},"RowPerPage":${body.rowPerPage},"CatalogName":"${body.catalogName}","CompanyCode":"${body.companyCode}","Email":"${body.email}"}`
        }).then(function(response) {
          return response.text();
        }).then(function(data) {
  
        var obj = JSON.parse(data);
        //console.log("Obj = " + obj);
        //console.log(data); // this will be a string
        productList = obj;
      });
      
        return productList;
    } catch (err) {
      return "Error: " + err.message; 
      
    }
  },
  getDashboardOrderByUserId(body)
  {
    return requests.post('/products/GetDashboardOrderByUserId',body);
  },
  async fetchGetOrderByUserId(body)
  {
    try {
      var productList = null;
      await fetch(serviceUrl + 'GetOrderByUserId',//fetch('http://localhost:5002/simple-cors3', 
      { 
        method:'POST',
        //credentials:"include",
        headers: {'Content-Type': 'application/json','x-security-lock':'0241CCFF2D40AF7AF8A4FC02272C47A30D15DBDFB36E3266D1296212574F328E'},
        body:`{"CompanyId":"${body.companyId}","LineUserId":"${body.lineUserId}","LinePOSId":"${body.linePOSId}","LiffId":"${body.liffId}","Page":${body.page},"RowPerPage":${body.rowPerPage},"CatalogName":"${body.catalogName}","CompanyCode":"${body.companyCode}","Email":"${body.email}"}`
        }).then(function(response) {
          return response.text();
        }).then(function(data) {
  
        //var obj = JSON.parse(data);
        //console.log("Obj = " + obj);
        //console.log(data); // this will be a string
        productList = data;
      });
      
        return productList;
    } catch (err) {
      return 'Error: ' + err.message;
      /*res.status(500).send({
        message: err.message,
      });*/
    }
  },
  async fetchGetDashboardOrderByUserId(body)
  {
    try {
      var productList = null;
      //alert("Get Order = " + JSON.stringify(body));
      //res.send("Get Order = " + JSON.stringify(req.body));
      
      //return;
      await fetch(serviceUrl + 'GetDashboardOrderByUserId',//fetch('http://localhost:5002/simple-cors3', 
      { 
        method:'POST',
        //credentials:"include",
        headers: {'Content-Type': 'application/json','x-security-lock':'0241CCFF2D40AF7AF8A4FC02272C47A30D15DBDFB36E3266D1296212574F328E'},
        body:`{"CompanyId":"${body.companyId}","LineUserId":"${body.lineUserId}","LinePOSId":"${body.linePOSId}","LiffId":"${body.liffId}","Page":0,"RowPerPage":0,"CatalogName":"${body.catalogName}","CompanyCode":"${body.companyCode}","Email":"${body.email}"}`
        }).then(function(response) {
          return response.text();
        }).then(function(data) {
  
          //alert(data);
        var obj = JSON.parse(data);
        //console.log("Obj = " + obj);
        //console.log(data); // this will be a string
        productList = obj;

      });
      
        return productList
    } catch (err) {
      return "Error: " + err.message;
    }
  },
  async fetchGetProductBySlug(body){
    try
    {
      var product = null;
      await fetch(serviceUrl + 'GetLiffProductBySlug',
      { 
        method:'POST',
        //credentials:"include",
        headers: {'Content-Type': 'application/json','x-security-lock':'0241CCFF2D40AF7AF8A4FC02272C47A30D15DBDFB36E3266D1296212574F328E'},
        body:`{"LiffId": "${body.liffId}","LineUserId":"${body.lineUserId}", "LinePOSId":"${body.linePOSId}", "GroupId":"${body.groupId}","CompanyId":${body.companyId}
          ,"LocationId":${body.locationId},"CompanyName":"${body.companyName}","LocationName":"${body.locationName}"
          ,"CompanyCode":"${body.companyCode}","CatalogName":"${body.catalogName}","PromotionId":${body.promotionId}
          ,"CustomerId":${body.customerId},"CustomerTypeId":"${body.customerTypeId}"
          ,"Slug":"${body.slug}"}`
          
        }).then(function(response) {
          return response.text();
        }).then(function(data) {

        var obj = JSON.parse(data);

        //alert(data);
        //var obj = JSON.parse(data);
          
        //alert("Obj = " + data);
        console.log(data); // this will be a string
        var pvJson = obj.ProductVariantJson
          product = JSON.parse(pvJson)
      });
      
        return product;
    }
    catch (err) 
    {
      return err.message;
      
    }
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
  getDistrict(body)
  {
    return requests.post('/products/GetDistrict',body);
  },
  async fetchGetDistrict(body)
  {
    try
  {
    var distrinctData = ''
    await fetch(serviceUrl + 'GetDistrict',
    { 
      method:'POST',
      //credentials:"include",
      headers: {'Content-Type': 'application/json','x-security-lock':'0241CCFF2D40AF7AF8A4FC02272C47A30D15DBDFB36E3266D1296212574F328E'},
      body:`{"CityId": "${body.cityId}"}` 
      }).then(function(response) {
        return response.text();
      }).then(function(data) {

      var obj = JSON.parse(data);
      distrinctData = (obj.districtResponses);
    });
    
      return distrinctData;
  }
  catch (err) 
  {
    return "Error: " + err.message;
    
  }
  },
  getCity(body)
  {
    return requests.post('/products/GetCity',body);
  },
  async fetchGetCity(body)
  {
    try
    {
      var cityData = ''
      await fetch(serviceUrl + 'GetCity',
      { 
        method:'POST',
        //credentials:"include",
        headers: {'Content-Type': 'application/json','x-security-lock':'0241CCFF2D40AF7AF8A4FC02272C47A30D15DBDFB36E3266D1296212574F328E'},
        body: `{"StateId":"${body.stateId}"}`
        }).then(function(response) {
          return response.text();
        }).then(function(data) {

        var obj = JSON.parse(data);
        cityData = (obj.cityResponses);
      });
      
        return cityData;
    }
    catch (err) 
    {
      return "Error: " + err.message;
    }
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
  async fetchGetAddressSelectorInfo()
  {
    try
    {
      var addressSelectorData = null;
      await fetch(serviceUrl + 'GetAddressSelectorInfo',
      { 
        method:'POST',
        //credentials:"include",
        headers: {'Content-Type': 'application/json','x-security-lock':'0241CCFF2D40AF7AF8A4FC02272C47A30D15DBDFB36E3266D1296212574F328E'},
        body:``  
        }).then(function(response) {
          return response.text();
        }).then(function(data) {

        //var obj = JSON.parse(data);
        //alert('address Selector = ' + data);
        var obj = JSON.parse(data)
        addressSelectorData = obj;
      });
      return addressSelectorData;
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

          //console.log("GetData = " + data)
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
  async fetchGetCoinPOSOrder(body){
    try
    {
      var productList = null;
      await fetch(serviceUrl + 'GetLiffOrder',
      { 
        method:'POST',
        //credentials:"include",
        headers: {'Content-Type': 'application/json','x-security-lock':'0241CCFF2D40AF7AF8A4FC02272C47A30D15DBDFB36E3266D1296212574F328E'},
        body:`{"LiffId": "${body.liffId}","LineUserId":"${body.lineUserId}", "LinePOSId":"${body.linePOSId}", "GroupId":"${body.groupId}","OrderId":${body.orderId},"CompanyId":${body.companyId}
          ,"LocationId":${body.locationId},"CompanyName":"${body.companyName}","LocationName":"${body.locationName}"}`
          
        }).then(function(response) {
          return response.text();
        }).then(function(data) {

        //var obj = JSON.parse(data);
        var obj = JSON.parse(data);
          
        console.log("Obj = " + obj);
        console.log(data); // this will be a string
        var pvJson = obj.ProductVariantListJson
          productList = JSON.parse(pvJson)
      });
      
        return productList;
    }
    catch (err) 
    {
      return err.message;
      
    }
  },
  async fetchGetCoinPOSProductService(body){
    try
    {
      //alert("Fetch")
      var productList = null;
      const products = await fetch(serviceUrl + 'GetLiffProductList',//fetch('http://localhost:5002/simple-cors3', 
        { 
          method:'POST',
          //credentials:"include",
          headers: {'Content-Type': 'application/json','x-security-lock':'0241CCFF2D40AF7AF8A4FC02272C47A30D15DBDFB36E3266D1296212574F328E'},
          body:`{"LiffId": "${body.liffId}","LineUserId":"${body.lineUserId}", "LinePOSId":"${body.linePOSId}", "GroupId":"${body.groupId}","OrderId":${body.orderId},"CompanyId":${body.companyId},
          "CatalogName":"${body.catalogName}","CompanyCode":"${body.companyCode}","PromotionId":${body.promotionId},"CustomerTypeId":${body.customerTypeId},"LocationId":${body.locationId},"CompanyName":"${body.companyName}","LocationName":"${body.locationName}","Page":${body.page},"RowPerPage":${body.itemPerPage},"Query":"${body.query}","Category":"${body.category}","Product":"${body.product}"}`
          
        }).then(function(response) {
          return response.text();
        }).then(function(data) {

          console.log("GetData = " + data)
          var obj = JSON.parse(data);
          var pvJson = obj.ProductVariantListJson
          productList = JSON.parse(pvJson)
          
          
        });
      

        return productList;
    }
    catch(err) {
        return "Error: " + err.message
    }
  },
  async fetchGetNewAndRecommentProductService(body){
    try
    {
      //alert("Fetch")
      var productList = null;
      const products = await fetch(serviceUrl + 'GetNewAndRecommentProductList',//fetch('http://localhost:5002/simple-cors3', 
        { 
          method:'POST',
          //credentials:"include",
          headers: {'Content-Type': 'application/json','x-security-lock':'0241CCFF2D40AF7AF8A4FC02272C47A30D15DBDFB36E3266D1296212574F328E'},
          body:`{"LiffId": "${body.liffId}","LineUserId":"${body.lineUserId}", "LinePOSId":"${body.linePOSId}", "GroupId":"${body.groupId}","OrderId":${body.orderId},"CompanyId":${body.companyId},
          "CatalogName":"${body.catalogName}","CompanyCode":"${body.companyCode}","PromotionId":${body.promotionId},"CustomerTypeId":${body.customerTypeId},"LocationId":${body.locationId},"CompanyName":"${body.companyName}","LocationName":"${body.locationName}","Page":${body.page},"RowPerPage":${body.itemPerPage},"Query":"${body.query}","Category":"${body.category}","Product":"${body.product}"}`
          
        }).then(function(response) {
          return response.text();
        }).then(function(data) {

          console.log("GetData = " + data)
          var obj = JSON.parse(data);
          //alert('data = ' + data);
          var pvJson = obj.ProductVariantListJson
          productList = JSON.parse(pvJson)
          
          
        });
      

        return productList;
    }
    catch(err) {
        return "Error: " + err.message
    }
  },
  async fetchGetProductCategoryService(body){
    try
    {
      //alert('body = ' + JSON.stringify(body))
      //alert("body.catalogName = " + body.catalogName)
      //alert("body.companyCode = " + body.companyCode)

      var productList = null;
      const products = await fetch(serviceUrl + 'GetOnlyLiffProductCategoryList',//fetch('http://localhost:5002/simple-cors3', 
        { 
          method:'POST',
          //credentials:"include",
          headers: {'Content-Type': 'application/json','x-security-lock':'0241CCFF2D40AF7AF8A4FC02272C47A30D15DBDFB36E3266D1296212574F328E'},
          body:`{
          "CatalogName":"${body.catalogName}","CompanyCode":"${body.companyCode}"}`
          
        }).then(function(response) {
          return response.text();
        }).then(function(data) {

          console.log("GetData = " + data)
          var obj = JSON.parse(data);
          //alert('data = ' + data);
          var pvJson = obj.ProductVariantListJson
          productList = JSON.parse(pvJson)
          
          
        });
      

        return productList;
    }
    catch(err) {
        return "Error: " + err.message
    }
  },
  async fetchCancelPromotionCode(body) {
    try
    {
      var productList = null;
      await fetch(serviceUrl + 'ApplyPromotionCode',//fetch('http://localhost:5002/simple-cors3', 
      { 
        method:'POST',
        //credentials:"include",
        headers: {'Content-Type': 'application/json','x-security-lock':'0241CCFF2D40AF7AF8A4FC02272C47A30D15DBDFB36E3266D1296212574F328E'},
        body:`{"CompanyId":${body.companyId},"LocationId":${body.locationId},
        "OrderId":${body.orderId},
        "PromotionCode":"${body.qrPromotion}",
        "UserId":1,
        "LineUserId": "${body.lineUserId}",
        "LinePOSId":"${body.linePOSId}","LiffId":"${body.liffId}","PictureUrl":"${body.pictureUrl}",
        "CatalogName":"${body.catalogName}","OrderDetails":${body.orderDetails}}`
        }).then(function(response) {
          return response.text();
        }).then(function(data) {

        //var obj = JSON.parse(data);
        //console.log("Obj = " + obj);
        //console.log(data); // this will be a string
        productList = data;
      });
      
        return productList;
    }
    catch (err) 
    {
      return "Error: " + err.message
      
    }
  },
  async fetchApplyPromotionCode(body) {
    try
    {
      var productList = null;
      await fetch(serviceUrl + 'ApplyPromotionCode',//fetch('http://localhost:5002/simple-cors3', 
      { 
        method:'POST',
        //credentials:"include",
        headers: {'Content-Type': 'application/json','x-security-lock':'0241CCFF2D40AF7AF8A4FC02272C47A30D15DBDFB36E3266D1296212574F328E'},
        body:`{"CompanyId":${body.companyId},"LocationId":${body.locationId},
        "OrderId":${body.orderId},
        "PromotionCode":"${body.qrPromotion}",
        "UserId":1,
        "LineUserId": "${body.lineUserId}",
        "LinePOSId":"${body.linePOSId}","LiffId":"${body.liffId}","PictureUrl":"${body.pictureUrl}",
        "CatalogName":"${body.catalogName}","OrderDetails":${body.orderDetails}}`
        }).then(function(response) {
          return response.text();
        }).then(function(data) {

        //var obj = JSON.parse(data);
        //console.log("Obj = " + obj);
        //console.log(data); // this will be a string
        productList = data;
      });
      
        return productList;
    }
    catch (err) 
    {
      return "Error: " + err.message;
      
    }
  },
  async fetchRefreshCoinPOSProductService(body){
    try
    {
      //alert("Fetch")
      var productList = null;
      const products = await fetch(serviceUrl + 'RefreshLiffProductList',//fetch('http://localhost:5002/simple-cors3', 
        { 
          method:'POST',
          //credentials:"include",
          headers: {'Content-Type': 'application/json','x-security-lock':'0241CCFF2D40AF7AF8A4FC02272C47A30D15DBDFB36E3266D1296212574F328E'},
          body:`{"LiffId": "${body.liffId}","LineUserId":"${body.lineUserId}", "LinePOSId":"${body.linePOSId}", "GroupId":"${body.groupId}","OrderId":${body.orderId},"CompanyId":${body.companyId},
          "CatalogName":"${body.catalogName}","CompanyCode":"${body.companyCode}","PromotionId":${body.promotionId},"CustomerTypeId":${body.customerTypeId},"LocationId":${body.locationId},"CompanyName":"${body.companyName}","LocationName":"${body.locationName}","Page":${body.page},"RowPerPage":${body.itemPerPage},"Query":"${body.query}","Category":"${body.category}","Product":"${body.product}"}`
          
        }).then(function(response) {
          return response.text();
        }).then(function(data) {

          console.log("GetData = " + data)
          var obj = JSON.parse(data);
          var pvJson = obj.ProductVariantListJson
          productList = JSON.parse(pvJson)
          
          
        });
      

        return productList;
    }
    catch(err) {
        return "Error: " + err.message
    }
  },

  saveCustomerInfo(body) {
    
    return requests.post('/products/SaveCustomerInfo', body);
    
  },
  async fetchSaveCustomerInfo(body) {
    
    try
    {
      var productList = null;
      await fetch(serviceUrl + 'SocialCustomerSaveService',//fetch('http://localhost:5002/simple-cors3', 
        { 
          method:'POST',
          //credentials:"include",
          headers: {'Content-Type': 'application/json','x-security-lock':'0241CCFF2D40AF7AF8A4FC02272C47A30D15DBDFB36E3266D1296212574F328E'},
          body:`{"FirstName": "${body.firstName}","MiddleName": "${body.middleName}", "LastName": "${body.lastName}", "Gender":${body.gender},"Phone":"${body.phone}","Mobile":"${body.mobile}","Email":"${body.email}","Address1":"${body.address1}","District":"${body.district}","City":"${body.city}","StateOrProvince":"${body.stateOrProvince}","Postalcode":"${body.postalcode}","Country":"${body.country}","CountryId":"${body.countryId}","CustomerId":"${body.customerId}","CompanyId":"${body.companyId}","CatalogName":"${body.catalogName}","PictureUrl":"${body.imageUrl}"}`
          
        }).then(function(response) {
          return response.text();
        }).then(function(data) {

          
          var obj = JSON.parse(data);
          //var pvJson = obj.ProductVariantListJson
          productList = obj
          
        });
      
        return productList;
    }
    catch (err) 
    {
      return "Error: " + err.message
    }
    
  },
  closeCoinPOSCart(body){
    return requests.post('/products/CloseBill',body);
  },
  async fetchCloseCoinPOSCart(body){
    try
    {
      var productList = null;
      await fetch(serviceUrl + 'CloseBill', 
      { 
        method:'POST',
        //credentials:"include",
        headers: {'Content-Type': 'application/json','x-security-lock':'0241CCFF2D40AF7AF8A4FC02272C47A30D15DBDFB36E3266D1296212574F328E'},
        body:`{"OrderId": ${body.orderId},"ShippingId":${body.shippingId},"ShippingName":"${body.shippingName}","ShippingFee":${body.shippingFee},"CompanyId":"${body.companyId}","LineUserId":"${body.linePOSId}","LiffId":"${body.liffId}","PictureUrl":"${body.pictureUrl}",
        "FirstName":"${body.firstName}","LastName":"${body.lastName}","Mobile":"${body.mobile}","Email":"${body.email}",
        "Address1":"${body.address1}","District":"${body.district}","Country":"${body.country}","City":"${body.city}","StateOrProvince":"${body.stateOrProvince}","PostalCode":"${body.postalCode}",
        "OrderDetails":${body.orderDetails},"CatalogName":"${body.catalogName}","CompanyCode":"${body.companyCode}"}`
        }).then(function(response) {
          return response.text();
        }).then(function(data) {

        
          //alert('data = ' + data)
        productList = JSON.parse(data);
      });
      
        return productList;
    }
    catch (err) 
    {
      return "Error: " + err.message;
      
    }
  },
  getPayOrderById(body) {
    return requests.post('/products/GetPayOrderById', body);
    
  },
  async fetchGetPayOrderById(body) {
    try {
      
      //alert("Get Pay Order = " + JSON.stringify(body));
      var productList
      await fetch(serviceUrl + 'GetPayCart',
      { 
        method:'POST',
        //credentials:"include",
        headers: {'Content-Type': 'application/json','x-security-lock':'0241CCFF2D40AF7AF8A4FC02272C47A30D15DBDFB36E3266D1296212574F328E'},
        body:`{"OrderId": ${body.orderId},"CompanyId":"${body.companyId}","LocationId":"${body.locationId}","UserId":"${body.lineUserId}","GroupId":"${body.groupId}","LinePOSId":"${body.linePOSId}","LiffId":"${body.liffId}","PictureUrl":"${body.pictureUrl}","CatalogName":"${body.catalogName}"}`
        }).then(function(response) {
          return response.text();
        }).then(function(data) {
  
        var obj = JSON.parse(data);
        console.log("Obj = " + obj);
        //console.log(data); // this will be a string
        productList = obj;
      });
      
        return productList;
    } catch (err) {
      return "Error: " + err.message
    }
    
  },
  sendBankTransferPayment(body)
  {
    return requests.post('/products/SendBankTransferPayment',body);
  },
  async fetchSendBankTransferPayment(body)
  {
    try
    {
      //res.send("Close Bill");
      //console.log(req.body);
      //return;
      var productList = null;
      await fetch(serviceUrl + 'SendBankTransferPayment',//fetch('http://localhost:5002/simple-cors3', 
      { 
        method:'POST',
        //credentials:"include",
        headers: {'Content-Type': 'application/json','x-security-lock':'0241CCFF2D40AF7AF8A4FC02272C47A30D15DBDFB36E3266D1296212574F328E'},
        body:`{"OrderId": ${body.orderId},"LiffId":"${body.liffId}","LineUserId":"${body.lineUserId}","PictureUrl":"${body.pictureUrl}", "CompanyId":${body.companyId},"AccountName":"${body.accountName}","AccountNumber":"${body.accountNumber}", "TransferTime":"${body.transferTimeValue}"}`
        }).then(function(response) {
          return response.text();
        }).then(function(data) {

        //var obj = JSON.parse(data);
        //console.log("Obj = " + obj);
        //console.log(data); // this will be a string
        productList = data;
      });
      
        return productList;
    }
    catch (err) 
    {
      return "Error: " + err.message;
    }
  },
};

export default ProductServices;
