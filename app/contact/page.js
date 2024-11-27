
import Link from "next/link";
import Contact from "@/components/Contact";
import NextLayout from "@/layouts/NextLayout";
const page = () => {
  return (
    <NextLayout header={3} footer={3} single>
      <Contact  />
      {/* Contact Section Section Start */}
      <section className="contact-section section-padding">
        <div className="container">
          <div className="contact-wrapper">
            <div className="row g-4">
              <div className="col-lg-6">
                <div className="contact-content">
                  <div className="section-title">
                    <span className="sub-content wow fadeInUp">
                      <img src="assets/img/bale.png" alt="img" />
                      Contact Us
                    </span>
                    <h2 className="wow fadeInUp" data-wow-delay=".3s">
                      Don’t Hessite to Contact <br />
                      Our Team Member
                    </h2>
                  </div>
                  <p className="mt-3 mt-md-0 wow fadeInUp" data-wow-delay=".5s">
                    Sed ut perspiciatis unde omnis iste natus error voluptatem
                    accusantium <br />
                    doloremque laudantium, totam rem aperiam
                  </p>
                  <ul
                    className="contact-list wow fadeInUp"
                    data-wow-delay=".3s"
                  >
                    <li>
                      <a href="mailto:info@example.com">info@example.com</a>
                    </li>
                    <li>55 Main Street, 2nd block, Malborne, Australia</li>
                    <li>
                      <a href="tel:+00012345688">+000 (123) 456 88</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-6">
                <div
                  className="contact-right wow fadeInUp"
                  data-wow-delay=".4s"
                >
                  <Link href="/Subscription">
                    <button className="theme-btn">Get Started</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Map Section Start */}
      <div className="map-section">
        <div className="map-items">
          <div className="googpemap">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6678.7619084840835!2d144.9618311901502!3d-37.81450084255415!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642b4758afc1d%3A0x3119cc820fdfc62e!2sEnvato!5e0!3m2!1sen!2sbd!4v1641984054261!5m2!1sen!2sbd"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </NextLayout>
  );
};
export default page;
