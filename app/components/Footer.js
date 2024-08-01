import React from "react"

import { Link } from "react-router-dom"

function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-flex-container">
        <div>
          <h4>FACILITIES</h4>
          <ul>
            <li className="text-font">
              <Link to={"/health"}>College Health services</Link>
            </li>
            <li className="text-font">
              <Link to={"/under-construction"}>Counselling</Link>
            </li>
            <li className="text-font">
              <Link to={"/under-construction"}>Electricity Bulk Metering Unit</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4>QUICK LINKS</h4>
          <ul>
            <li className="text-font">
              <Link to={"/under-construction"}>Admission</Link>
            </li>
            <li className="text-font">
              <Link to={"/under-construction"}>About Us</Link>
            </li>
            <li className="text-font">
              <Link to={"/under-construction"}>Portals</Link>
            </li>
            <li className="text-font">
              <Link to={"/under-construction"}>Login</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4>CALENDER</h4>
          <ul>
            <li className="text-font">
              <Link to={"/under-construction"}>Academic Calender</Link>
            </li>
            <li className="text-font">
              <Link to={"/under-construction"}>Event Calender</Link>
            </li>
            <li className="text-font">
              <Link to={"/under-construction"}>Recruitment Calender</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4>RESEARCH</h4>
          <ul>
            <li className="text-font">
              <Link to={"/under-construction"}>Awards</Link>
            </li>
            <li className="text-font">
              <Link to={"/under-construction"}>Events</Link>
            </li>
            <li className="text-font">
              <Link to={"/under-construction"}>Online Community</Link>
            </li>
            <li className="text-font">
              <Link to={"/under-construction"}>Project</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4>ALUMNI</h4>
          <ul>
            <li className="text-font">
              <Link to={"/under-construction"}>Awards</Link>
            </li>
            <li className="text-font">
              <Link to={"/under-construction"}>Leardership</Link>
            </li>
            <li className="text-font">
              <Link to={"/under-construction"}>Online Community</Link>
            </li>
            <li className="text-font">
              <Link to={"/under-construction"}>Project</Link>
            </li>
            <li className="text-font">
              <Link to={"/under-construction"}>About Us</Link>
            </li>
          </ul>
        </div>
      </div>
      <div class="logo-container">
        <div class="logo-container-inner">
          <div class="facebook-container">
            <img src="https://res.cloudinary.com/dlbtbf6vy/image/upload/v1710277834/fb_qvh7ap.png" alt="facebook" />
          </div>
          <div class="twitter-container">
            <img src="https://res.cloudinary.com/dlbtbf6vy/image/upload/v1710277833/tw_wu1v6i.png" alt="twitter" />
          </div>
          <div class="facebook-container">
            <img src="https://res.cloudinary.com/dlbtbf6vy/image/upload/v1710323103/intagram_w4crtj.jpg" alt="facebook" />
          </div>
          <div class="facebook-container">
            <img src="https://res.cloudinary.com/dlbtbf6vy/image/upload/v1710323199/youtube-icon-2048x2048-wiwalbpx_vnf1xu.png" alt="facebook" />
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
