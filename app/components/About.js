import React, { useEffect } from "react"

import Navigation from "./Navigation"
import Footer from "./Footer"

function About() {
  // This runs once whenever the page loads, it scroll the window the top
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <>
      <Navigation />
      <div className="about-cont">
        <div className="about-head">
          <div className="about-head-overlay"></div>
          <h1>History of AMCOE</h1>
          <h2 className="heading-font">
            Home{" "}
            <span className="about-icon">
              <i class="fa-solid fa-angle-right" aria-hidden="true"></i>
              <i class="fa-solid fa-angle-right" aria-hidden="true"></i>
            </span>{" "}
            History of AMCOE
          </h2>
        </div>
        {/* <div className="about-text-cont">
          <div className="about-text-h">
            <h2>Preamble</h2>
          </div>
          <div className="about-text-p">
            <p className="text-font">The landscape of education in Nigeria is never changing; and this change, which is reflected in the establishment of more and more institutions of learning, is driven by demand and the demand for education is driven by a number of factors. These include: the growing population of Nigeria with a large percentage being children and young adults of schooling age; the shortage of adequate spaces for the teeming population of applicants annually, dubbed the lack of access; and the increasing importance of education as a definer of social and economic status of people. The demands at the tertiary level, especially university education, is more acute as more and more graduating students from all secondary schools and old graduates who have not secured admission annually compete for the limited space available in Nigerian universities.</p>
            <p className="text-font">The crises of access influenced the decision of the Federal Government to establish nine new universities to be funded by it. The issue of equity, in terms of the distribution of federal resources, also influenced the decision of the Federal Government to increase the number of its universities. This is buttressed by the need to give equal opportunity to all Nigerians, irrespective of their State of origin, the opportunity to acquire qualitative university education within a reasonable distance from their locale.</p>
            <p className="text-font">However, the overarching rationale for the establishment of new universities lies not with expanding access, but with the understanding and appreciation of the Federal Government of the roles universities play in the growth and development of human societies. Looking into the 21st century with hope and aspiring to become one of the leading global economies at the dawn of the century, Nigeria and its Government took the initiative to establish new universities for the rapid socio-economic transformation of the country. It is the aspiration and expectation of the Federal Government that these universities shall become centres of excellence and wheels for driving the transformational agenda of government.</p>
          </div>
        </div> */}

        <div className="about-text-cont">
          <div className="about-text-h">
            <h2 className="heading-font">Historical Background</h2>
          </div>
          <div className="about-text-p">
            <p className="text-font">Wase Local Government Area and its environs are highly educationally disadvantaged. The 12th Emir of Wase, HRH Alhaji Abdullahi Maikano who laid an exemplary penchant for community based educational and infrastructural development initiated the establishment of JNI school in Wase. The 13th Emir, HRH, Dr. Haruna Abdullahi continued the good work and established the JNI Primary and Secondary Schools. By the early 2010 the Federal Government made the far reaching declaration that the Nigeria Certificate of Education (NCE) was henceforth the minimum requirement for teaching in the primary schools in the country. Therefore the Alhaji Musa Abdullahi, Danburam Nyalun, led EXCO of the Wase LGA Chapter of the JNI took up the challenge and worked tirelessly to establish an NCE awarding College. The leadership drew support from the state Chairman and National Vice Chairman of the JNI, his Royal Highness the 14th Emir of Wase, Dr Muhammadu Sambo Haruna who is in every way like his forebears with respect to community based development of the Wase Local Government Area. </p>
            <p className="text-font">By 30th May 2013, the efforts of the leadership began to show concrete results with their application along with Five Million Naira non-refundable application fee for the establishment of the NCCE awarding Abdullahi Maikano College of Education, Wase. The JNI donated its plot at 13A Emir Street, Wase to serve as permanent site of the College. While classes started temporarily at JNI and at Central Primary schools in Wase, works started immediately at the permanent site. Within a short time, befitting classrooms, an office block, library blocks etc. came up and put to use. </p>
            <p className="text-font">
              By 13th February, 2017, Vide Letter WLG/EDU/67, the Wase Local Government gave its approval, by 10th April, 2016 vide letter MHEST/COR/123/VOL.1/1, the Plateau State Government gave its approval for establishment of the College. A team of experts from the NCCE visited the College for resource inspection between 8th and 11th March, 2017 and made recommendations. Another team visited 17th and 19th September, 2020 and recommended the final approval which came from NCCE date 5th October 2020 vide NCCE/AP/AMCOE/20/Vol.1/13. The Abdullahi Maikano College of Education Wase was then listed No. 194 among accredited Colleges of Education in the Country on the NCCE portal{" "}
              <a target={"_blank"} href="http://www.ncceonline.edu.ng/colleges.php">
                http://www.ncceonline.edu.ng/colleges.php
              </a>{" "}
              From then the College has, with its committed Visitor, Governing Council. Management, professional teachers continued to witness remarkable and promising progress in terms of Student population, qualified and dedicated staff and relevant infrastructure and learning equipment.{" "}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default About
