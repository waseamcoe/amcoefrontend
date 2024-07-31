import React from "react"
import { Link } from "react-router-dom"
import Button from "./ReusableComp/Button"

function Welcome() {
  return (
    <>
      <div className="welcome-content-container">
        <div className="welcome-description">
          <div className="content-headers">
            <h1>The Provost</h1>
          </div>
          <div className="welcome-description-img">
            <img src="https://res.cloudinary.com/dmw39pbxq/image/upload/v1722424708/amcoe31-removebg-preview_z3dkbm.png" />
          </div>
          <p className="text-font">Wase Local Government Area and its environs are highly educationally disadvantaged. The 12th Emir of Wase, HRH Alhaji Abdullahi Maikano who laid an exemplary penchant for community based educational and infrastructural development initiated the establishment of JNI school in Wase. The 13th Emir, HRH, Dr. Haruna Abdullahi continued the good work and established the JNI Primary and Secondary Schools. By the early 2010 the Federal Government made the far reaching declaration that the Nigeria Certificate of Education (NCE) was henceforth the minimum requirement for teaching in the primary schools in the country...</p>
          {/* <button className="resource">Read More</button> */}
          <Link to={"/history-of-amcoe"}>
            <Button label={"Read More"} />
          </Link>
        </div>
        <div className="campus-spotlight">
          <div className="content-headers">
            <h1 className="headings">
              Campus Spotlight <i class="fa-solid fa-rss"></i>
            </h1>
          </div>
          <div className="welcome-description-img" style={{ float: "none", margin: 0, width: "100%", marginBottom: "20px", height: "200px" }}>
            <img src="https://res.cloudinary.com/dmw39pbxq/image/upload/v1722247565/amco5_xfj8dr.jpg" />
          </div>
          <div>
            <p className="text-font">Computer science students during their visit to the national data center, which is among the biggest data centers in the nation</p>
            <Button label={"More Spotlight"} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Welcome
