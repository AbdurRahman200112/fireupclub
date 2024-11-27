import Link from "next/link";

const Contact = () => {
  return (
    <div
      className="breadcrumb-wrapper section-padding bg-cover"
      style={{ background: 'var(--white)' }}
    >
      <div className="container">
        <div className="getInTouch">
            <div className="text-start">
            <h3 className="text-white wow fadeInUp" data-wow-delay=".3s">
                Don’t Hesitate to Contact
            </h3>
            <h1 className="text-white wow fadeInUp" data-wow-delay=".3s">
                Stay in touch!
            </h1>
            </div>
            <div className="contact-block">
                <form>
                    <div className="form-text-row">
                        <input 
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Full Name"
                        className="contact-input-field name">
                            
                        </input>
                        <input 
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                        className="contact-input-field email">
                        </input>
                    </div>
                    <button type="submit" className="contact-submit-btn">
                          Submit
                    </button>
                </form>
            </div>
        </div>
      </div>
    </div>
  );
};
export default Contact;
