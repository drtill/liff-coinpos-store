import React, { useEffect, useState } from 'react';
import Link from 'next/link';

//internal import
import Layout from '@layout/Layout';
import PageHeader from '@component/header/PageHeader';

const TermAndConditions = () => {

  const [companyLogo, setCompanyLogo] = useState('');
  const [companyId, setCompanyId] = useState(0);
  const [companyName,setCompanyName] = useState('');
  const [dataPath,setDataPath] = useState('');


  const [locationName, setLocationName] = useState('');
  const [locationAddress1, setLocationAddress1] = useState('');
  const [locationAddress2, setLocationAddress2] = useState('');
  const [locationCity, setLocationCity] = useState('');
  const [locationStateOrProvince, setLocationStateOrProvince] = useState('');
  const [locationCountry, setLocationCountry] = useState('');
  const [locationPostalCode, setLocationPostalCode] = useState('');
  const [locationEmail, setLocationEmail] = useState('');
  const [locationTel, setLocationTel] = useState('');
  useEffect(() => 
  {
    
    if(sessionStorage.getItem('companyLogo'))
    {
      var companyLogoData = sessionStorage.getItem('companyLogo'); 
      setCompanyLogo(companyLogoData);
    }
    if(sessionStorage.getItem('companyId'))
    {
      var lineCompanyIdData = sessionStorage.getItem('companyId');
      setCompanyId(lineCompanyIdData);
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

    if(sessionStorage.getItem('dataPath'))
    {
      var dataPathData = sessionStorage.getItem('dataPath'); 
      setDataPath(dataPathData);
            
    }
  },[])
  return (
    <Layout
      title="Terms & Conditions"
      description="This is terms and conditions page" dataPath={dataPath} companyName={companyName} locationName={locationName} companyLogo={companyLogo}
      locationAddress1={locationAddress1} locationAddress2={locationAddress2} locationCity={locationCity}
        locationStateOrProvince={locationStateOrProvince} locationCountry={locationCountry} locationPostalCode={locationPostalCode}
        locationEmail={locationEmail} locationTel={locationTel}
    >
      <PageHeader title="ข้อกำหนดและเงื่อนไข" />
      <div className="bg-white">
        <div className="max-w-screen-2xl mx-auto lg:py-20 py-10 px-3 sm:px-10">
          <div className="mb-8 lg:mb-12 last:mb-0">
            <h2 className="text-xl xl:text-2xl xl:leading-7 font-semibold font-serif mb-2 lg:mb-4">
              Welcome to CoinPOS!
            </h2>
            <div className="font-sans leading-7">
              <p>
                ข้อกำหนดการใช้งานเหล่านี้ บังคับใช้กับ www.coinpos.app ("เว็บไซต์") และ แพล็ตฟอร์มอื่นๆของ CoinPOS โดยการใช้งานเว็บไซต์นี้ ท่านตกลงที่จะยอมรับ ข้อกำหนดและเงื่อนไข เหล่านี้ แต่ถ้าท่านไม่ยอมรับ ข้อกำหนดและเงื่อนไขเหล่านี้ กรุณาหยุดการใช้งาน เว็บไซด์ นี้ต่อทันที
              </p>
              <p>
                คำต่อไปนี้ใช้กับข้อกำหนดและเงื่อนไข ดังต่อไปนี้,
                คำชี้แจงสิทธิ์ส่วนบุคคล ประกาศปฏิเสธความรับผิดชอบ และข้อตกลงทั้งหมด:
                "ลูกค้า", "ผู้ใช้", "คุณ" และ "ของคุณ" หมายถึง ตัวคุณที่เข้าสู่ระบบนี้
                เว็บไซต์ และเป็นไปตามข้อกำหนดและเงื่อนไขของบริษัท
                "บริษัท", "เราเอง", "เรา", "ของเรา" and "ตัวเรา" หมายถึงบริษัทของเรา 
                "คู่สัญญา" "คู่สัญญา" หรือ "เรา" หมายถึงทั้งลูกค้า และตัวเราเอง 
                เงื่อนไขทั้งหมด จะรวมถึง ข้อเสนอ การยอมรับ และ การพิจารณาการชำระเงินที่จำเป็น 
                เพื่อดำเนินการตามขั้นตอนการความช่วยเหลือของเราแก่ลูกค้า ในลักษณะที่เหมาะสมที่สุดสำหรับ
                การตอบสนองความต้องการของลูกค้า ในส่วนที่เกี่ยวกับ
                การให้บริการตามที่ระบุไว้ของบริษัท อย่างรวดเร็วและทันท่วงที
                และอยู่ภายใต้พระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562
              </p>
            </div>
          </div>
          <div className="mb-6 lg:mb-12 last:mb-0">
            <h2 className="text-xl xl:text-2xl xl:leading-7 font-semibold font-serif mb-2 lg:mb-4">
              Cookies
            </h2>
            <div className="font-sans leading-7">
              <p>
                เราใช้มีการใช้คุกกี้(Cookies) โดยการเข้าใช้ระบบ CoinPOS คุณ
                ตกลงที่จะใช้คุกกี้ตามข้อตกลงกับความเป็นส่วนตัว ตามนโยบายของ Prolifit Software & Technology Co., Ltd
                เว็บไซต์ มีการใช้คุกกี้เป็นส่วนใหญ่ เพื่อ โต้ตอบ และการตอบสนอง เรียกค้น
                รายละเอียดของผู้ใช้ ในการเข้าใช้แต่ละครั้ง เราใช้คุกกี้
                เว็บไซต์ เพื่อเปิดใช้งาน การทำงานของบางอย่าง เพื่อให้ง่าย และรวดเร็วขึ้นสำหรับ การเข้าใช้เว็บไซต์ของเรา พันธมิตร/โฆษณาของเราก็อาจใช้คุกกี้ในลักษณะเดียวกัน
              </p>
            </div>
          </div>
          <div className="mb-8 lg:mb-12 last:mb-0">
            <h2 className="text-xl xl:text-2xl xl:leading-7 font-semibold font-serif mb-2 lg:mb-4">
              License
            </h2>
            <div className="font-sans leading-7">
              <p>
                เว้นแต่จะระบุไว้เป็นอย่างอื่น CoinPOS และ/หรือผู้อนุญาตเป็นเจ้าของ
                สิทธิ์ในทรัพย์สินทางปัญญา สำหรับเนื้อหาใน CoinPOS ทั้งหมด
                สงวนลิขสิทธิ์ทรัพย์สินทางปัญญา คุณสามารถเข้าถึงบริการ เพื่อการใช้งานส่วนตัวของคุณเองนี้
                ได้จาก CoinPOS ภายใต้ ข้อจำกัดที่กำหนดไว้ ในข้อกำหนดและเงื่อนไขเหล่านี้
                ข้อตกลงนี้ จะเริ่มในวันที่นี้
              </p>

              {/* <ul>
                <strong className="mb-2">You must not:</strong>
                <li>
                  1. Identifiers (e.g. name, mailing address, email address,
                  phone number, credit/debit card number)
                </li>
                <li>
                  2. Characteristics of protected classifications (e.g. gender,
                  age)
                </li>
                <li>
                  3. Commercial information (e.g. products or services
                  purchased, purchase history)
                </li>
                <li>
                  4. Internet or other electronic network activity (e.g. browse
                  or search history)
                </li>
                <li> 5. Geo location data (e.g. latitude or longitude)</li>
                <li>
                  6. Audio, electronic, visual, or similar information (e.g.
                  recording of Guest service calls)
                </li>
                <li>
                  7. Inferences drawn from any of the above (e.g. preferences or
                  characteristics)
                </li>
              </ul>
              <p>
                Parts of this website offer an opportunity for users to post and
                exchange opinions and information in certain areas of the
                website. KachaBazar does not filter, edit, publish or review
                Comments prior to their presence on the website. Comments do not
                reflect the views and opinions of KachaBazar,its agents and/or
                affiliates. Comments reflect the views and opinions of the
                person who post their views and opinions. To the extent
                permitted by applicable laws, KachaBazar shall not be liable for
                the Comments or for any liability, damages or expenses caused
                and/or suffered as a result of any use of and/or posting of
                and/or appearance of the Comments on this website.
              </p> */}
            </div>
            <div className="my-6 lg:my-8 last:mb-0">
              <h2 className="text-xl xl:text-2xl xl:leading-7 font-semibold font-serif mb-2 lg:mb-4">
                ความรับผิดในเนื้อหา
              </h2>
              <div className="font-sans leading-7">
                <p>
                เราจะไม่รับผิดชอบต่อเนื้อหาใด ๆ ของคุณที่ปรากฏ บนเว็บไซต์ 
                เนื้อหาบนเว็บไซต์ถูกนำเสนอ “ตามที่เป็นอยู่จริง” บริษัทไม่รับประกันหรือรับรองเนื้อหาประเภทใด ในเรื่องใดทั้งโดยชัดแจ้งหรือโดยนัยในส่วนที่เกี่ยวกับข้อกำหนดและเงื่อนไข 
                หรือเว็บไซต์ รวมทั้งแต่ไม่จำกัดเฉพาะการรับรองความเหมาะสมของสภาพการเป็นที่ซื้อขายได้ การไม่ละเมิด หรือความเหมาะสมสำหรับวัตถุประสงค์เฉพาะ 
                เว้นแต่ในระดับที่การรับประกันและการรับรองนั้นไม่อาจแยกออกไปได้ในทางกฎหมาย
                </p>
              </div>
            </div>
            <div className="my-6 lg:my-8 last:mb-0">
              <h2 className="text-xl xl:text-2xl xl:leading-7 font-semibold font-serif mb-2 lg:mb-4">
                นโยบายความเป็นส่วนตัว
              </h2>
              <div className="font-sans leading-7">
                <p>
                  นโยบายความเป็นส่วนตัวของเราซึ่งกำหนดวิธีที่เราจะใช้ข้อมูลของท่าน โดยสามารถดูได้ที่{' '}
                  <Link href="/privacy-policy">
                    <a className="text-emerald-500">Privacy Policy</a>
                  </Link>{' '}
                  ในการใช้งานเว็บไซต์นี้ ท่านยินยอมให้ดำเนินการตามที่อธิบายไว้ในนั้นและรับประกันว่าข้อมูลทั้งหมดที่ท่านให้นั้นถูกต้อง
                </p>
              </div>
            </div>
            
            <div className="my-6 lg:my-8 last:mb-0">
              <h2 className="text-xl xl:text-2xl xl:leading-7 font-semibold font-serif mb-2 lg:mb-4">
                การเชื่อมโยงกับเว็บไซต์อื่น
              </h2>
              <div className="font-sans leading-7">
                <p>
                ทางบริษัทขอแจ้งให้ผู้ใช้บริการทุกท่านทราบว่า เนื่องจากเว็บไซด์ของบริษัทมีการเชื่อมต่อ (link) ไปยังเว็บไซด์อื่น ทาง Prolifit Software & Technology Co., Ltd และ CoinPOS  จะไม่รับผิดชอบ สำหรับนโยบายคุ้มครองข้อมูลส่วนบุคคลของเว็บไซด์อื่น และ Prolifit Software & Technology Co., Ltd และ CoinPOS  ขอแนะนำให้ผู้ใช้บริการทุกท่าน ระมัดระวัง
                และโปรดอ่านนโยบายการคุ้มครองข้อมูลส่วนบุคคลของเว็บไซด์แต่ละเว็บไซด์ และทุกเว็บไซด์ซึ่งมีการรวบรวมข้อมูลส่วนบุคคล นโยบายข้อมูลส่วนบุคคลฉบับนี้ใช้บังคับเฉพาะข้อมูลที่เว็บไซด์นี้รวบรวมเท่านั้น
                </p>
              </div>
            </div>
            <div className="my-6 lg:my-8 last:mb-0">
              <h2 className="text-xl xl:text-2xl xl:leading-7 font-semibold font-serif mb-2 lg:mb-4">
                ข้อจำกัดความรับผิดชอบ
              </h2>
              <div className="font-sans leading-7">
                <p>
                  ในขอบเขตสูงสุดที่กฎหมายที่ใช้บังคับอนุญาต เราไม่รวมการรับรอง การรับประกัน และเงื่อนไขทั้งหมดที่เกี่ยวข้องกับเว็บไซต์ของเราและการใช้เว็บไซต์นี้ ไม่มีอะไรในข้อจำกัดความรับผิดชอบนี้จะ:
                </p>
                <ul>
                  <li>
                    1. จำกัดหรือยกเว้น ความรับผิดของเรา หรือของคุณสำหรับ การเสียชีวิตหรือ
                    การบาดเจ็บส่วนบุคคล;
                  </li>
                  <li>
                    2. จำกัดหรือยกเว้น ความรับผิดของเรา หรือของคุณสำหรับ การฉ้อโกงหรือ
                    ฉ้อฉล;
                  </li>
                  <li>
                    3. จำกัดความรับผิดใด ๆ ของเรา หรือของคุณในลักษณะใด ๆ ที่
                    ไม่อนุญาตภายใต้กฎหมายที่บังคับใช้; หรือ
                  </li>
                  <li>
                    4. ไม่รวมความรับผิดใด ๆ ของเรา หรือของคุณที่อาจไม่ใช่
                    ยกเว้นภายใต้กฎหมายที่บังคับใช้
                  </li>
                </ul>
                <p>
                  ข้อจำกัดและข้อห้ามของความรับผิดที่กำหนดไว้ในส่วนนี้ และที่อื่น ๆ ในข้อจำกัดความรับผิดชอบนี้: (a) อยู่ภายใต้
                  วรรคก่อน และ (b) ควบคุมหนี้สินทั้งหมด ที่เกิดขึ้นภายใต้ข้อจำกัดความรับผิดชอบ รวมถึงหนี้สินที่เกิดขึ้นใน
                  สัญญาในการละเมิด และสำหรับการฝ่าฝืนหน้าที่ตามกฎหมาย ตราบเท่าทีเว็บไซต์และข้อมูลและบริการบนเว็บไซต์
                  ให้ฟรี เราจะไม่รับผิดชอบใดๆทั้งสิ้น การสูญเสียหรือความเสียหายในลักษณะใด ๆ
                  {
                    
                  /* The limitations and prohibitions of liability set in this
                  Section and elsewhere in this disclaimer: (a) are subject to
                  the preceding paragraph; and (b) govern all liabilities
                  arising under the disclaimer, including liabilities arising in
                  contract, in tort and for breach of statutory duty. As long as
                  the website and the information and services on the website
                  are provided free of charge, we will not be liable for any
                  loss or damage of any nature. */}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TermAndConditions;
