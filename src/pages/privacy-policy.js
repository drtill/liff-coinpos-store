import React, { useEffect, useState } from 'react';

//internal import
import Layout from '@layout/Layout';
import PageHeader from '@component/header/PageHeader';

const PrivacyPolicy = () => {

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
    <Layout title="Privacy Policy" description="This is privacy policy page" dataPath={dataPath} companyName={companyName} locationName={locationName} companyLogo={companyLogo}
    locationAddress1={locationAddress1} locationAddress2={locationAddress2} locationCity={locationCity}
      locationStateOrProvince={locationStateOrProvince} locationCountry={locationCountry} locationPostalCode={locationPostalCode}
      locationEmail={locationEmail} locationTel={locationTel} page='privacy'>
      <PageHeader title="นโยบายความเป็นส่วนตัว" />
      <div className="bg-white">
        <div className="max-w-screen-2xl mx-auto lg:py-20 py-10 px-4 sm:px-10">
          
          <div className="mb-8 lg:mb-12 last:mb-0">
            <h2 className="text-xl xl:text-2xl xl:leading-7 font-semibold font-serif mb-2 lg:mb-4">
              ความยินยอม
            </h2>
            <div className="font-sans leading-7">
              <p>
                Prolifit Software & Technology Co., Ltd (ต่อไปนี้จะเรียกว่า ‘บริษัท/เรา’) เป็นผู้ให้บริการเว็บไซต์ https://coinpos.app/ รวมไปถึงแพลตฟอร์มออนไลน์ และช่องทางโซเชียลมีเดียอื่นๆ ในเครือ บริษัทขอเรียนว่า บริษัทเคารพความเป็นส่วนตัวของผู้ใช้งาน และตระหนักดีว่าข้อมูลส่วนบุคคลของผู้ใช้งานแต่ละท่านมีความสำคัญอย่างยิ่ง บริษัทจึงต้องการที่จะชี้แจงให้ทราบเกี่ยวกับการเก็บรวบรวม ใช้ หรือเปิดเผยข้อมูลส่วนบุคคลของท่าน
              </p>
              <p>
                ดังนั้น บริษัทจึงได้มีนโยบายคุ้มครองข้อมูลส่วนบุคคลนี้ เพื่อชี้แจงรายละเอียดและ วิธีการจัดเก็บรวบรวม ใช้ และ/หรือเปิดเผย การคุ้มครองข้อมูล การเข้าถึงข้อมูล การโอนย้าย และการวิเคราะห์ประมวลผลข้อมูลส่วนบุคคลของท่าน ดังต่อไปนี้
              </p>
              <p>
               ข้อมูลส่วนบุคคลในทีนี้หมายถึงข้อมูลต่างๆ ที่ได้ใช้งานผ่าน CoinPOS, CoinScan, SocialPOS และ แพล็ตฟอร์มอื่นๆ ของบริษัท คุกกี้ ข้อมูลการทำรายการ และประสบการณ์การใช้งาน
              </p>
              <p>
                นโยบายการคุ้มครองข้อมูลส่วนบุคคล (Privacy Policy) นี้อยู่ภายใต้พระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 โดยบริษัทมีอำนาจหน้าที่ตัดสินใจเกี่ยวกับการเก็บรวบรวม ใช้ หรือเปิดเผยข้อมูลส่วนบุคคล ซึ่งตามกฎหมายเรียกว่า ‘ผู้ควบคุมข้อมูลส่วนบุคคล’ โดยมีพนักงานที่บริษัทมอบหมายโดยเฉพาะให้มีหน้าที่ดำเนินการเกี่ยวกับการเก็บรวบรวม ใช้ หรือเปิดเผยข้อมูลส่วนบุคคลตามคำสั่งหรือในนามของบริษัท ซึ่งตามกฎหมายเรียกว่า ‘ผู้ประมวลผลข้อมูลส่วนบุคคล’ ส่วนท่านถือเป็น ‘เจ้าของข้อมูลส่วนบุคคล’ ตามกฎหมายนี้
              </p>
            </div>
          </div>
          <div className="mb-8 lg:mb-12 last:mb-0">
            <h2 className="text-xl xl:text-2xl xl:leading-7 font-semibold font-serif mb-2 lg:mb-4">
              ข้อมูลส่วนบุคคลอะไรบ้างที่บริษัทเก็บรวบรวม ใช้ และ/หรือเปิดเผย
            </h2>
            <div className="font-sans leading-7">
              <p>
                เราจะเก็บรวบรวมข้อมูลส่วนบุคคลซึ่งเป็นข้อมูลที่ทำให้สามารถระบุตัวตนของท่านได้ ไม่ว่าทางตรงหรือทางอ้อม ได้แก่ ข้อมูลที่ท่านให้ไว้โดยตรงจากการลงทะเบียนผ่านระบบ THE STANDARD Member การลงทะเบียนเข้าร่วมกิจกรรมต่างๆ ของบริษัท คุกกี้ ข้อมูลการทำรายการ และประสบการณ์การใช้งานผ่านหน้าเว็บไซต์ ผู้ที่ได้รับมอบหมาย หรือช่องทางอื่นใด เช่น
              </p>
              <ol>
                <li>
                  1. ข้อมูลส่วนตัว เช่น ชื่อ นามสกุล อายุ วันเดือนปีเกิด สถานภาพสมรส เลขประจำตัวประชาชน เลขหนังสือเดินทาง
                </li>
                <li>
                  2. ข้อมูลการติดต่อ เช่น ที่อยู่อาศัย สถานที่ทำงาน หมายเลขโทรศัพท์ อีเมล ไอดีไลน์
                </li>
                <li>
                  3. ข้อมูลอุปกรณ์หรือเครื่องมือ เช่น IP Address MAC Address Cookie ID
                </li>
                <li>
                  4. ข้อมูลอื่นๆ เช่น การใช้งานเว็บไซต์ เสียง ภาพนิ่ง ภาพเคลื่อนไหว และข้อมูลอื่นใดที่ถือว่าเป็นข้อมูลส่วนบุคคลภายใต้กฎหมายคุ้มครองข้อมูลส่วนบุคคล
                </li>
                
              </ol>
            </div>
          </div>
          <div className="mb-8 lg:mb-12 last:mb-0">
            <h2 className="text-xl xl:text-2xl xl:leading-7 font-semibold font-serif mb-2 lg:mb-4">
              วัตถุประสงค์ในการเก็บรวบรวม ใช้ และ/หรือเปิดเผยข้อมูล
            </h2>
            <div className="font-sans leading-7">
              <p>
                เราจะนำข้อมูลของท่านมาใช้เพื่อการพัฒนาและปรับปรุง แพลตฟอร์ม CoinPOS และช่องทางอื่นๆ ในเครือ ตลอดจนการวิเคราะห์และประมวลผลข้อมูลส่วนบุคคล เพื่อให้ตอบโจทย์การใช้งานของผู้ใช้งาน ด้วยวิธีการทางอิเล็กทรอนิกส์แก่ท่านให้มีประสิทธิภาพมากยิ่งขึ้น
              </p>

              <p>
                หากภายหลังมีการเปลี่ยนแปลงวัตถุประสงค์ บริษัทจะแจ้งให้ท่านทราบ เพื่อขอความยินยอม และจัดให้มีบันทึกการแก้ไขเพิ่มเติมไว้เป็นหลักฐาน
              </p>

              <p>
                ทั้งนี้ บริษัทจะไม่กระทำการเก็บรวบรวม ใช้ หรือเปิดเผยข้อมูลส่วนบุคคลของท่าน เพื่อประโยชน์อย่างอื่น ที่นอกเหนือจากวัตถุประสงค์ที่ได้แจ้งไว้กับท่านไว้ก่อนหรือขณะเก็บรวบรวม 
              </p>
            </div>
          </div>
          <div className="mb-8 lg:mb-12 last:mb-0">
            <h2 className="text-xl xl:text-2xl xl:leading-7 font-semibold font-serif mb-2 lg:mb-4">
              Log Files
            </h2>
            <div className="font-sans leading-7">
              <p>
                Prolifit Software & Technology Co., Ltd ปฏิบัติตามขั้นตอนมาตรฐานของการใช้ไฟล์บันทึก ไฟล์เหล่านี้จะบันทึกผู้เยี่ยมชมเมื่อพวกเขาเยี่ยมชมเว็บไซต์ บริษัทโฮสติ้งทั้งหมดทำเช่นนี้และเป็นส่วนหนึ่งของการวิเคราะห์บริการโฮสติ้ง ข้อมูลที่รวบรวมโดยไฟล์บันทึก ได้แก่ ที่อยู่อินเทอร์เน็ตโปรโตคอล (IP) ประเภทเบราว์เซอร์ ผู้ให้บริการอินเทอร์เน็ต (ISP) การประทับวันที่และเวลา หน้าอ้างอิง/ออก และอาจถึงจำนวนการคลิก สิ่งเหล่านี้ไม่ได้เชื่อมโยงกับข้อมูลใด ๆ ที่สามารถระบุตัวบุคคลได้ จุดประสงค์ของข้อมูลนี้มีไว้เพื่อวิเคราะห์แนวโน้ม บริหารจัดการไซต์ ติดตามความเคลื่อนไหวของผู้ใช้บนเว็บไซต์ ความปลอดภัย และรวบรวมข้อมูลด้านประชากรศาสตร์
              </p>
            </div>
          </div>
          <div className="mb-8 lg:mb-12 last:mb-0">
            <h2 className="text-xl xl:text-2xl xl:leading-7 font-semibold font-serif mb-2 lg:mb-4">
              พันธมิตรการโฆษณาของเรา
            </h2>
            <div className="font-sans leading-7">
              <p>
                พันธมิตรการโฆษณาของเรา หรือ ผู้โฆษณาบางรายในเว็บไซต์ของเราอาจใช้คุกกี้, JavaScript หรือเว็บบีคอน 
                แต่ละรายมีนโยบายความเป็นส่วนตัวสำหรับนโยบายเกี่ยวกับข้อมูลผู้ใช้ เพื่อให้เข้าถึงได้ง่ายขึ้น
              </p>
              <p>
                โปรดทราบว่า Prolifit Software & Technology Co., Ltd ไม่มีสิทธิ์เข้าถึงหรือควบคุมคุกกี้เหล่านี้ที่ใช้โดยผู้โฆษณาบุคคลที่สาม
              </p>
            </div>
          </div>
          <div className="mb-8 lg:mb-12 last:mb-0">
            <h2 className="text-xl xl:text-2xl xl:leading-7 font-semibold font-serif mb-2 lg:mb-4">
              นโยบายความเป็นส่วนตัวของบุคคลที่สาม
            </h2>
            <div className="font-sans leading-7">
              <p>
                นโยบายความเป็นส่วนตัวของ Prolifit Software & Technology Co., Ltd ไม่มีผลกับผู้โฆษณาหรือเว็บไซต์อื่น ดังนั้น เราขอแนะนำให้คุณศึกษานโยบายความเป็นส่วนตัวที่เกี่ยวข้องของเซิร์ฟเวอร์โฆษณาบุคคลที่สามเหล่านี้สำหรับข้อมูลโดยละเอียดเพิ่มเติม อาจรวมถึงแนวทางปฏิบัติและคำแนะนำเกี่ยวกับวิธีการเลือกไม่รับตัวเลือกบางอย่าง
              </p>
              <p>
                คุณสามารถเลือกปิดการใช้งานคุกกี้ผ่านตัวเลือกเบราว์เซอร์ของคุณ หากต้องการทราบข้อมูลโดยละเอียดเพิ่มเติมเกี่ยวกับการจัดการคุกกี้กับเว็บเบราว์เซอร์เฉพาะ สามารถดูได้ที่เว็บไซต์ที่เกี่ยวข้องของเบราว์เซอร์
              </p>
            </div>
          </div>
          <div className="mb-8 lg:mb-12 last:mb-0">
            <h2 className="text-xl xl:text-2xl xl:leading-7 font-semibold font-serif mb-2 lg:mb-4">
              สิทธิความเป็นส่วนตัวของ CCPA (กฏห้ามละเมิดการขายข้อมูลส่วนบุคคล)
            </h2>
            <div className="font-sans leading-7">
              <p>
                ภายใต้ CCPA ผู้ใช้งานมีสิทธิ์ที่จะ:

                ขอให้ธุรกิจที่รวบรวมข้อมูลส่วนบุคคลของผู้บริโภคเปิดเผยหมวดหมู่และข้อมูลส่วนบุคคลเฉพาะที่ธุรกิจได้รวบรวมเกี่ยวกับผู้บริโภค

                ขอให้ธุรกิจลบข้อมูลส่วนบุคคลเกี่ยวกับผู้บริโภคที่ธุรกิจได้รวบรวมไว้

                ขอให้ธุรกิจไม่ขายข้อมูลส่วนบุคคลของผู้บริโภค

                หากคุณส่งคำขอ เรามีเวลาหนึ่งเดือนในการตอบกลับคุณ หากคุณต้องการใช้สิทธิ์เหล่านี้ โปรดติดต่อเรา
              </p>
            </div>
          </div>
          <div className="mb-8 lg:mb-12 last:mb-0">
            <h2 className="text-xl xl:text-2xl xl:leading-7 font-semibold font-serif mb-2 lg:mb-4">
              ข้อมูลสำหรับเด็ก
            </h2>
            <div className="font-sans leading-7">
              <p>
                สิ่งสำคัญอีกประการหนึ่งของเราคือการเพิ่มการป้องกันสำหรับเด็กขณะใช้อินเทอร์เน็ต เราสนับสนุนให้พ่อแม่และผู้ปกครองสังเกต เข้าร่วม และ/หรือตรวจสอบและชี้นำกิจกรรมออนไลน์ของพวกเขา
              </p>
              <p>
                Prolifit Software & Technology Co., Ltd ไม่ได้รวบรวมข้อมูลส่วนบุคคลใด ๆ ที่สามารถระบุตัวตนได้จากเด็กอายุต่ำกว่า 13 ปี หากคุณคิดว่าบุตรหลานของคุณให้ข้อมูลประเภทนี้บนเว็บไซต์ของเรา เราขอแนะนำให้คุณติดต่อเราทันทีและเราจะพยายามอย่างเต็มที่ ความพยายามที่จะลบข้อมูลดังกล่าวออกจากบันทึกของเราโดยทันที
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
