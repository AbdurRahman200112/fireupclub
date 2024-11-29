"use client";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import Select from "react-select";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import countries from "world-countries";

const MultiStepForm = () => {
  const [step, setStep] = useState(0);
  const totalSteps = 6;

  const { handleSubmit, control, watch, trigger, formState: { errors } } = useForm({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      nationality: "",
      residence: "",
      age: "",
    },
  });

  const countryOptions = countries.map((country) => ({
    value: country.cca2,
    label: country.name.common,
  }));

  const nextStep = async () => {
    const isValid = await trigger();
    if (isValid) setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 0));
  };

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    alert("Form Submitted!");
  };

  const stepAnimation = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 },
  };
  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent default form submission
      if (step === 0) {
        setStep(1); // Move to the first form step
      } else {
        const isValid = await trigger(); // Validate current step fields
        if (isValid) {
          nextStep(); // Move to the next step if valid
        }
      }
    }
  };
  

  return (
    <section className="multiform-section">
      <div className="multi-form-progress">
        <div className="progress-bar-track">
          <motion.div
            className="multi-form-bar-fill"
            initial={{ width: "0%" }}
            animate={{ width: `${(step / totalSteps) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>
      </div>
      <div className="bg-cover w-100 h-100 section-padding">
        <div className="container">
          {step === 0 ? (
            <div className="row align-items-center">
              <div className="col-md-6 text-start">
                <h2 className="text-2xl font-bold mb-4">
                  Welcome to the FireUpClub Subscription
                </h2>
                <p className="text-gray-600 mb-4">
                  Begin your journey with us. Fill out the form and get
                  registered with FireupClub.
                </p>
                <button
                  type="button"
                  className="theme-btn bg-2"
                  onClick={() => setStep(1)}
                >
                  Get Started <i className="fa fa-long-arrow-right"></i>
                </button>
              </div>
              <div className="col-md-6"></div>
            </div>
          ) : (
            <div className="multiform-wrapper">
              <form
                onKeyDown={handleKeyDown}
                onSubmit={handleSubmit(onSubmit)}
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
                      <div className="row justify-content-between">
                        <div className="col-12 col-xl-5 col-lg-5">
                          <div className="form-group mb-5">
                          <label>Enter Full Name *</label>
                          <Controller
                            name="name"
                            control={control}
                            rules={{ required: "Name is required." }}
                            render={({ field }) => (
                              <input
                                {...field}
                                type="text"
                                placeholder="Full Name"
                              />
                            )}
                          />
                          {errors.name && (
                            <p className="error-text">{errors.name.message}</p>
                          )}
                          </div>
                          <div className="form-group mb-5">
                            <label>Enter Email *</label>
                            <Controller
                              name="email"
                              control={control}
                              rules={{
                                required: "Email is required.",
                                pattern: {
                                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                  message: "Invalid email format.",
                                },
                              }}
                              render={({ field }) => (
                                <input
                                  {...field}
                                  type="email"
                                  placeholder="Email"
                                  className={errors.email ? "input-error" : ""}
                                />
                              )}
                            />
                            {errors.email && <p className="error-text">{errors.email.message}</p>}
                          </div>
                          <div className="form-group mb-5">
                            <label>Enter Phone Number *</label>
                            <Controller
                              name="phone"
                              control={control}
                              rules={{
                                required: "Phone number is required.",
                                validate: (value) =>
                                  value && value.length >= 10
                                    ? true
                                    : "Invalid phone number.",
                              }}
                              render={({ field }) => (
                                <PhoneInput
                                  {...field}
                                  country={"us"}
                                  inputStyle={{
                                    width: "100%",
                                    padding: "10px",
                                    border: errors.phone
                                      ? "1px solid red"
                                      : "1px solid #ccc",
                                  }}
                                  dropdownStyle={{
                                    maxHeight: "200px",
                                    overflow: "auto",
                                  }}
                                  onChange={field.onChange}
                                />
                              )}
                            />
                            {errors.phone && (
                              <p className="error-text">{errors.phone.message}</p>
                            )}
                          </div>
                          <div className="form-group mb-5">
                            <label>LinkedIn URL (If any)</label>
                            <Controller
                              name="linkedin"
                              control={control}
                              rules={{
                                pattern: {
                                  value: /^https?:\/\/.+$/i, // Use regex object, not string
                                  message: "Invalid URL format. The URL must start with http:// or https://",
                                },
                              }}
                              render={({ field }) => (
                                <input
                                  {...field}
                                  type="text"
                                  placeholder="LinkedIn URL"
                                />
                              )}
                            />
                            {errors.linkedin && (
                              <p className="error-text">{errors.linkedin.message}</p>
                            )}
                          </div>

                        </div>
                        <div className="col-12 col-xl-5 col-lg-5">
                          <div className="form-group mb-5">
                          <label>Select Nationality *</label>
                          <Controller
                            name="nationality"
                            control={control}
                            rules={{ required: "Nationality is required." }}
                            render={({ field }) => (
                              <Select
                                {...field}
                                options={countryOptions}
                                placeholder="Select Country"
                                value={countryOptions.find((option) => option.value === field.value)}
                                onChange={(selectedOption) => field.onChange(selectedOption.value)}
                              />
                            )}
                          />
                          {errors.nationality && (
                            <p className="error-text">{errors.nationality.message}</p>
                          )}
                          </div>
                          <div className="form-group mb-5">
                            <label>Country of Residence *</label>
                            <Controller
                              name="residence"
                              control={control}
                              rules={{ required: "Country of Residence is required." }}
                              render={({ field }) => (
                                <Select
                                  {...field}
                                  options={countryOptions}
                                  placeholder="Select Country"
                                  value={countryOptions.find((option) => option.value === field.value)}
                                  onChange={(selectedOption) => field.onChange(selectedOption.value)}
                                />
                              )}
                            />
                            {errors.residence && (
                              <p className="error-text">{errors.residence.message}</p>
                            )}
                          </div>
                          <div className="form-group mb-5">
                            <label>Enter Your Age *</label>
                            <Controller
                              name="age"
                              control={control}
                              rules={{
                                required: "Age is required.",
                                min: { value: 1, message: "Invalid age." },
                              }}
                              render={({ field }) => (
                                <input
                                  {...field}
                                  type="number"
                                  placeholder="Age"
                                  min="1"
                                />
                              )}
                            />
                            {errors.age && (
                              <p className="error-text">{errors.age.message}</p>
                            )}
                          </div>


                        </div>
                      </div>

                      
                      <div className="button-group d-flex justify-content-between mt-4">
                        <button
                          type="button"
                          className="multi-next theme-btn bg-2 d-flex gap-2"
                          onClick={nextStep}
                        >
                          Next <i className="fal fa-long-arrow-right"></i>
                        </button>
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
                        <label>Enter Phone Number *</label>
                        <Controller
                          name="phone"
                          control={control}
                          rules={{
                            required: "Phone number is required.",
                            validate: (value) =>
                              value && value.length >= 10
                                ? true
                                : "Invalid phone number.",
                          }}
                          render={({ field }) => (
                            <PhoneInput
                              {...field}
                              country={"us"}
                              inputStyle={{
                                width: "100%",
                                padding: "10px",
                                border: errors.phone
                                  ? "1px solid red"
                                  : "1px solid #ccc",
                              }}
                              dropdownStyle={{
                                maxHeight: "200px",
                                overflow: "auto",
                              }}
                              onChange={field.onChange}
                            />
                          )}
                        />
                        {errors.phone && (
                          <p className="error-text">{errors.phone.message}</p>
                        )}
                      </div>
                      <div className="button-group d-flex justify-content-between mt-4">
                        <button
                          type="button"
                          className="multi-prev d-flex gap-2"
                          onClick={prevStep}
                        >
                          <i className="fal fa-long-arrow-left"></i> Back
                        </button>
                        <button
                          type="button"
                          className="multi-next theme-btn bg-2 d-flex gap-2"
                          onClick={nextStep}
                        >
                          Next <i className="fal fa-long-arrow-right"></i>
                        </button>
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
                        <label>Enter Email *</label>
                        <Controller
                          name="email"
                          control={control}
                          rules={{
                            required: "Email is required.",
                            pattern: {
                              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                              message: "Invalid email format.",
                            },
                          }}
                          render={({ field }) => (
                            <input
                              {...field}
                              type="email"
                              placeholder="Email"
                              className={errors.email ? "input-error" : ""}
                            />
                          )}
                        />
                        {errors.email && <p className="error-text">{errors.email.message}</p>}
                      </div>
                      <div className="button-group d-flex justify-content-between mt-4">
                        <button
                          type="button"
                          className="multi-prev d-flex gap-2"
                          onClick={prevStep}
                        >
                          <i className="fal fa-long-arrow-left"></i> Back
                        </button>
                        <button
                          type="button"
                          className="multi-next theme-btn d-flex gap-2"
                          onClick={nextStep}
                        >
                          Next <i className="fal fa-long-arrow-right"></i>
                        </button>
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
                        <label>Select Nationality *</label>
                        <Controller
                          name="nationality"
                          control={control}
                          rules={{ required: "Nationality is required." }}
                          render={({ field }) => (
                            <Select
                              {...field}
                              options={countryOptions}
                              placeholder="Select Country"
                              value={countryOptions.find((option) => option.value === field.value)}
                              onChange={(selectedOption) => field.onChange(selectedOption.value)}
                            />
                          )}
                        />
                        {errors.nationality && (
                          <p className="error-text">{errors.nationality.message}</p>
                        )}
                      </div>
                      <div className="button-group d-flex justify-content-between mt-4">
                        <button
                          type="button"
                          className="multi-prev d-flex gap-2"
                          onClick={prevStep}
                        >
                          <i className="fal fa-long-arrow-left"></i> Back
                        </button>
                        <button
                          type="button"
                          className="multi-next theme-btn d-flex gap-2"
                          onClick={nextStep}
                        >
                          Next <i className="fal fa-long-arrow-right"></i>
                        </button>
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
                        <label>Country of Residence *</label>
                        <Controller
                          name="residence"
                          control={control}
                          rules={{ required: "Country of Residence is required." }}
                          render={({ field }) => (
                            <Select
                              {...field}
                              options={countryOptions}
                              placeholder="Select Country"
                              value={countryOptions.find((option) => option.value === field.value)}
                              onChange={(selectedOption) => field.onChange(selectedOption.value)}
                            />
                          )}
                        />
                        {errors.residence && (
                          <p className="error-text">{errors.residence.message}</p>
                        )}
                      </div>
                      <div className="button-group d-flex justify-content-between mt-4">
                        <button
                          type="button"
                          className="multi-prev d-flex gap-2"
                          onClick={prevStep}
                        >
                          <i className="fal fa-long-arrow-left"></i> Back
                        </button>
                        <button
                          type="button"
                          className="multi-next theme-btn d-flex gap-2"
                          onClick={nextStep}
                        >
                          Next <i className="fal fa-long-arrow-right"></i>
                        </button>
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
                        <label>Enter Your Age *</label>
                        <Controller
                          name="age"
                          control={control}
                          rules={{
                            required: "Age is required.",
                            min: { value: 1, message: "Invalid age." },
                          }}
                          render={({ field }) => (
                            <input
                              {...field}
                              type="number"
                              placeholder="Age"
                              min="1"
                            />
                          )}
                        />
                        {errors.age && (
                          <p className="error-text">{errors.age.message}</p>
                        )}
                      </div>
                      <div className="button-group d-flex justify-content-between mt-4">
                        <button
                          type="button"
                          className="multi-prev d-flex gap-2"
                          onClick={prevStep}
                        >
                          <i className="fal fa-long-arrow-left"></i> Back
                        </button>
                        <button type="submit" className="theme-btn multi-next d-flex gap-2">
                          Submit
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MultiStepForm;
