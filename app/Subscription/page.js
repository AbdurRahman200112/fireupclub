"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Select from "react-select";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { isValidPhoneNumber } from "libphonenumber-js";
import countries from "world-countries";
import PreSubscription from "@/components/PreSubscription";

const MultiStepForm = () => {
  const [step, setStep] = useState(0);
  const totalSteps = 6; // Total number of steps
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    nationality: "",
    residence: "",
    age: "",
  });
  const [errors, setErrors] = useState({}); // State to track validation errors
  const formRef = useRef(null); // Reference for the form element

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({
      ...errors,
      [e.target.name]: "", // Clear error when user starts typing
    });
  };

  // Handle React-Select changes
  const handleSelectChange = (selectedOption, field) => {
    setFormData({
      ...formData,
      [field]: selectedOption ? selectedOption.value : "",
    });
    setErrors({
      ...errors,
      [field]: "", // Clear error when selection is made
    });
  };

  const validateStep = () => {
    let isValid = true;
    const newErrors = {};

    if (step === 1 && !formData.name.trim()) {
      isValid = false;
      newErrors.name = "Name is required.";
    }
    if (step === 2 && !formData.phone.trim()) {
      isValid = false;
      newErrors.phone = "Phone number is required.";
    } else if (step === 2 && !isValidPhoneNumber(`+${formData.phone}`)) {
      isValid = false;
      newErrors.phone = "Invalid phone number.";
    }
    if (step === 3 && !formData.email.trim()) {
      isValid = false;
      newErrors.email = "Email is required.";
    }
    if (step === 4 && !formData.nationality.trim()) {
      isValid = false;
      newErrors.nationality = "Nationality is required.";
    }
    if (step === 5 && !formData.residence.trim()) {
      isValid = false;
      newErrors.residence = "Country of Residence is required.";
    }
    if (step === 6 && !formData.age.trim()) {
      isValid = false;
      newErrors.age = "Age is required.";
    }

    setErrors(newErrors);
    return isValid;
  };

  const nextStep = () => {
    if (step === 0 || validateStep()) {
      setStep((prevStep) => prevStep + 1);
    }
  };

  const prevStep = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  // Animation variants for steps
  const stepAnimation = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 },
  };

  // Generate country options dynamically using `world-countries` library
  const countryOptions = countries.map((country) => ({
    value: country.cca2, // Country code (e.g., "US", "IN")
    label: country.name.common, // Country name
  }));

  return (
    <section className="multiform-section">
      <div className="multi-form-progress">
        <div className="progress-bar-track">
          <motion.div
            className="multi-form-bar-fill"
            initial={{ width: "0%" }}
            animate={{ width: `${(step / totalSteps) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          ></motion.div>
        </div>
      </div>
      <div className="bg-cover w-100 h-100 section-padding">
        <div className="container">
        {step === 0 ? (
          <div className="row align-items-center">
          {/* Left Column */}
          <div className="col-md-6 text-start">
            <h2 className="text-2xl font-bold mb-4">Welcome to the FireUpClub Subscription</h2>
            <p className="text-gray-600 mb-4">
              Begin your journey with us. Fill out the form and get registered with FireupClub.
            </p>
            <button
              type="button"
              className="theme-btn"
              onClick={() => setStep(1)} // Move to the first form step
            >
              Get Started
            </button>
          </div>

          {/* Right Column */}
          <div className="col-md-6">
            {/* Empty column for future image */}
          </div>
        </div>
      ) : (
        <>
          <div className="multiform-wrapper">
            <div className="row g-4 justify-content-center">
              <div className="col-lg-12">
                <div className="multi-step-form-container">
                  <form
                    ref={formRef}
                    action="#"
                    id="multi-step-form"
                    className="multi-form-items"
                    noValidate
                  >
                    <AnimatePresence mode="wait">
                      {step === 1 && (
                        <motion.div
                          className="step step-1"
                          key="step-1"
                          variants={stepAnimation}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          transition={{ duration: 0.6, ease: "easeInOut" }}
                        >
                          <div className="form-group">
                            <label>
                              <span style={{ color: "var(--theme-secondary)" }}>
                                {step} <i className="fal fa-long-arrow-right "></i>
                              </span>
                              Enter Full Name *
                            </label>
                            <input
                              type="text"
                              name="name"
                              id="fullname"
                              placeholder="Full Name"
                              value={formData.name}
                              onChange={handleInputChange}
                              required
                            />
                            <div
                              style={{
                                color: "var(--bs-danger)",
                                fontSize: "15px",
                                height: "20px",
                                marginTop: "5px",
                              }}
                            >
                              {errors.name && <p className="error-text">{errors.name}</p>}
                            </div>
                            <div className="button-group d-flex justify-content-between mt-4">
                              <button
                                type="button"
                                className="multi-next theme-btn d-flex gap-2"
                                onClick={nextStep}
                              >
                                Next
                                <i className="fal fa-long-arrow-right"></i>
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {step === 2 && (
                        <motion.div
                          className="step step-2"
                          key="step-2"
                          variants={stepAnimation}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          transition={{ duration: 0.6, ease: "easeInOut" }}
                        >
                          <div className="form-group">
                          <label>
                            <span style={{color: 'var(--theme-secondary)'}}>{ step } <i className="fal fa-long-arrow-right "></i>
                            </span> 
                            Enter Phone Number *
                            </label>
                            <PhoneInput
                              country={"us"}
                              value={formData.phone}
                              onChange={(value) => {
                                setFormData({ ...formData, phone: value });
                                setErrors({ ...errors, phone: "" });
                              }}
                              inputStyle={{
                                width: "100%",
                                padding: "10px",
                                border: errors.phone ? "1px solid red" : "1px solid #ccc",
                              }}
                              dropdownStyle={{
                                maxHeight: "200px",
                                overflow: "auto",
                              }}
                            />
                            <div style={{ color: 'var(--bs-danger)', fontSize: '15px', height: "20px",  marginTop: "5px" }}>
                            {errors.phone && <p className="error-text">{errors.phone}</p>}
                            </div>
                            <div className="button-group d-flex justify-content-between mt-4">
                              <button
                                type="button"
                                className="multi-prev d-flex gap-2"
                                onClick={prevStep}
                              >
                                <i className="fal fa-long-arrow-left"></i>
                                Back
                              </button>
                              <button
                                type="button"
                                className="multi-next theme-btn d-flex gap-2"
                                onClick={nextStep}
                              >
                                Next
                                <i className="fal fa-long-arrow-right"></i>
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {step === 3 && (
                        <motion.div
                          className="step step-3"
                          key="step-3"
                          variants={stepAnimation}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          transition={{ duration: 0.6, ease: "easeInOut" }}
                        >
                          <div className="form-group">
                          <label>
                            <span style={{color: 'var(--theme-secondary)'}}>{ step } <i className="fal fa-long-arrow-right "></i>
                            </span> 
                            Enter Email *
                            </label>
                            <input
                              type="email"
                              name="email"
                              id="subsEmail"
                              placeholder="Email"
                              value={formData.email}
                              onChange={handleInputChange}
                              required
                            />
                            <div style={{ color: 'var(--bs-danger)', fontSize: '15px', height: "20px",  marginTop: "5px" }}>
                            {errors.email && <p className="error-text">{errors.email}</p>}
                            </div>
                                
                            <div className="button-group d-flex justify-content-between mt-4">
                              <button
                                type="button"
                                className="multi-prev d-flex gap-2"
                                onClick={prevStep}
                              >
                                <i className="fal fa-long-arrow-left"></i>
                                Back
                              </button>
                              <button
                                type="button"
                                className="multi-next theme-btn d-flex gap-2"
                                onClick={nextStep}
                              >
                                Next
                                <i className="fal fa-long-arrow-right"></i>
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                      {step === 4 && (
                        <motion.div
                          className="step step-4 select"
                          key="step-4"
                          variants={stepAnimation}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          transition={{ duration: 0.6, ease: "easeInOut" }}
                        >
                          <div className="form-group">
                          <label>
                            <span style={{color: 'var(--theme-secondary)'}}>{ step } <i className="fal fa-long-arrow-right "></i>
                            </span> 
                            Select Nationality *
                            </label>
                            <Select
                              options={countryOptions}
                              onChange={(selectedOption) =>
                                handleSelectChange(selectedOption, "nationality")
                              }
                              value={countryOptions.find(
                                (option) => option.value === formData.nationality
                              )}
                              placeholder="Select Country"
                            />
                            <div style={{ color: 'var(--bs-danger)', fontSize: '15px', height: "20px",  marginTop: "5px" }}>
                            {errors.nationality && <p className="error-text">{errors.nationality}</p>}
                            </div>
                                
                            <div className="button-group d-flex justify-content-between mt-4">
                              <button
                                type="button"
                                className="multi-prev d-flex gap-2"
                                onClick={prevStep}
                              >
                                <i className="fal fa-long-arrow-left"></i>
                                Back
                              </button>
                              <button
                                type="button"
                                className="multi-next theme-btn d-flex gap-2"
                                onClick={nextStep}
                              >
                                Next
                                <i className="fal fa-long-arrow-right"></i>
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                      {step === 5 && (
                        <motion.div
                          className="step step-5 select"
                          key="step-5"
                          variants={stepAnimation}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          transition={{ duration: 0.6, ease: "easeInOut" }}
                        >
                          <div className="form-group">
                          <label>
                            <span style={{color: 'var(--theme-secondary)'}}>{ step } <i className="fal fa-long-arrow-right "></i>
                            </span> 
                            Country of Residence *
                            </label>
                            <Select
                              options={countryOptions}
                              onChange={(selectedOption) =>
                                handleSelectChange(selectedOption, "residence")
                              }
                              value={countryOptions.find(
                                (option) => option.value === formData.residence
                              )}
                              placeholder="Select Country"
                            />
                            <div style={{ color: 'var(--bs-danger)', fontSize: '15px', height: "20px",  marginTop: "5px" }}>
                            {errors.residence && <p className="error-text">{errors.residence}</p>}
                            </div>
                                
                            <div className="button-group d-flex justify-content-between mt-4">
                              <button
                                type="button"
                                className="multi-prev d-flex gap-2"
                                onClick={prevStep}
                              >
                                <i className="fal fa-long-arrow-left"></i>
                                Back
                              </button>
                              <button
                                type="button"
                                className="multi-next theme-btn d-flex gap-2"
                                onClick={nextStep}
                              >
                                Next
                                <i className="fal fa-long-arrow-right"></i>
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {step === 6 && (
                        <motion.div
                          className="step step-6"
                          key="step-6"
                          variants={stepAnimation}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          transition={{ duration: 0.6, ease: "easeInOut" }}
                        >
                          <div className="form-group">
                          <label>
                            <span style={{color: 'var(--theme-secondary)'}}>{ step } <i className="fal fa-long-arrow-right "></i>
                            </span> 
                            Enter your Age *
                            </label>
                            <input
                              type="number"
                              name="age"
                              id="subsAge"
                              placeholder="Age"
                              value={formData.age}
                              onChange={handleInputChange}
                              required
                            />
                            <div style={{ color: 'var(--bs-danger)', fontSize: '15px', height: "20px",  marginTop: "5px" }}>
                            {errors.age && (
                              <p className="error-text">{errors.age}</p>
                            )}
                            </div>
                            
                            <div className="button-group d-flex justify-content-between mt-4">
                              <button
                                type="button"
                                className="multi-prev d-flex gap-2"
                                onClick={prevStep}
                              >
                                <i className="fal fa-long-arrow-left"></i>
                                Back
                              </button>
                              <button
                                type="submit"
                                className="theme-btn multi-next d-flex gap-2"
                                onClick={() => alert("Form Submitted")}
                              >
                                Submit
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}

                    </AnimatePresence>
                  </form>
                </div>
              </div>
            </div>
          </div>
      </>
      )}
        </div>
      </div>
    </section>
  );
};

export default MultiStepForm;
