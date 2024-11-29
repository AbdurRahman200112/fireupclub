"use client";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper"; // Import Swiper core and modules

// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Register Swiper modules
SwiperCore.use([Autoplay, Pagination, Navigation]);

// Team data
const teamMembers = [
  {
    name: "Saqib Z Siddique",
    role: "Technical Analyst",
    image: "assets/img/team/02.webp",
    socialLinks: {
      facebook: "#",
      twitter: "#",
      linkedin: "#",
    },
  },
  {
    name: "Imran Kalim",
    role: "E-Commerce Expert",
    image: "assets/img/team/03.webp",
    socialLinks: {
      facebook: "#",
      twitter: "#",
      linkedin: "#",
    },
  },
  {
    name: "Nafees Mazhar",
    role: "Content Creator & Youtuber",
    image: "assets/img/team/04.webp",
    socialLinks: {
      facebook: "#",
      twitter: "#",
      linkedin: "#",
    },
  },
  {
    name: "Farid Aliani – CFA",
    role: "Portfolio Management Expert",
    image: "assets/img/team/05.webp",
    socialLinks: {
      facebook: "#",
      twitter: "#",
      linkedin: "#",
    },
  },
  {
    name: "Umaima Ansari",
    role: "Amazon Kdp Expert",
    image: "assets/img/team/06.webp",
    socialLinks: {
      facebook: "#",
      twitter: "#",
      linkedin: "#",
    },
  },
  {
    name: "Rehan Kazmi – FCA",
    role: "Tax Consultant",
    image: "assets/img/team/07.webp",
    socialLinks: {
      facebook: "#",
      twitter: "#",
      linkedin: "#",
    },
  },
];

const Team = () => {
  return (
    <section className="team-section fix team-bg section-padding" id="team">
      <div className="container">
        <div className="section-title text-center">
          <span className="sub-content wow fadeInUp">
            <img src="assets/img/bale.png" alt="img" />
            Team Member
          </span>
          <h2 className="text-white wow fadeInUp" data-wow-delay=".3s">
            Meet Our Professional Team Members
          </h2>
        </div>
        <div className="row">
            <div className="col-xl-3 col-lg-4 col-md-4">
              <div className="team-card-items">
                <div className="team-image">
                  <img src="assets/img/team/01.webp" alt="Nabeel Shaikh – FCA" style={{ height: "335px", width: "100%", objectFit: "cover" }}/>
                  <div className="icon-list">
                    <ul>
                      <li>
                        <a href="#">
                          <i className="fab fa-facebook-f" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fab fa-twitter" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fab fa-linkedin-in" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fab fa-pinterest-p" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="team-content">
                  <h4>
                    <a href="team-details">Nabeel Shaikh – FCA</a>
                  </h4>
                  <p>Founder</p>
                </div>
              </div>
            </div>
            <div className="col-xl-9 col-lg-8 col-md-8">
              <Swiper
              spaceBetween={30}
              slidesPerView={3}
              loop = {true}
              autoplay={{
                delay: 3000,
                
                disableOnInteraction: false,
              }}
              breakpoints={{
                320: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
            >

              {teamMembers.map((member, index) => (
                <SwiperSlide key={index}>
                  <div className="team-card-items">
                    <div className="team-image">
                      <img src={member.image} alt={`${member.name}`} style={{ height: "335px", width: "100%", objectFit: "cover" }}/>
                      <div className="icon-list">
                        <ul>
                          <li>
                            <a href={member.socialLinks.facebook}>
                              <i className="fab fa-facebook-f" />
                            </a>
                          </li>
                          <li>
                            <a href={member.socialLinks.twitter}>
                              <i className="fab fa-twitter" />
                            </a>
                          </li>
                          <li>
                            <a href={member.socialLinks.linkedin}>
                              <i className="fab fa-linkedin-in" />
                            </a>
                          </li>
                          <li>
                            <a href={member.socialLinks.pinterest}>
                              <i className="fab fa-pinterest-p" />
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="team-content">
                      <h4>
                        <a href="team-details">{member.name}</a>
                      </h4>
                      <p>{member.role}</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
              </Swiper>
            </div>
        </div>


      </div>
    </section>
  );
};

export default Team;
