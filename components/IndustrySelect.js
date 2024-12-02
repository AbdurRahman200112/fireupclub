import { useState } from "react";
import Select from "react-select";
import { Controller } from "react-hook-form";

const IndustrySelect = ({ control, setValue, errors }) => {
  const industryOptions = [
    { value: "retail", label: "Retail" },
    { value: "technology", label: "Technology" },
    { value: "healthcare", label: "Healthcare" },
    { value: "finance", label: "Finance" },
    { value: "food_beverages", label: "Food & Beverages" },
    { value: "realestate", label: "Consulting Real Estate" },
    { value: "advertisement", label: "Advertisement Agency" },
    { value: "education", label: "Education" },
    { value: "manufacturing", label: "Manufacturing / Wholesale" },
    { value: "media_entertainment", label: "Media / Entertainment" },
    { value: "transportation", label: "Transportation Logistics" },
    { value: "event_management", label: "Event Management" },
    { value: "travel_tourism", label: "Travel & Tourism" },
    { value: "factory_production", label: "Factory Production Facility" },
    { value: "home_decor", label: "Home Decor" },
    { value: "rent_car", label: "Rent a Car" },
    { value: "legal_service", label: "Legal Service" },
    { value: "photography", label: "Photography" },
    { value: "artisanal_handcraft", label: "Artisanal Handcraft" },
    { value: "pets", label: "Pets" },
    { value: "online_store", label: "Online Store" },
    { value: "pr_agency", label: "PR Agency" },
  ];

  const [showCustomInput, setShowCustomInput] = useState(false);

  return (
    <div className="form-group mb-5">
      <label>Select Industry *</label>
      <Controller
        name="industry"
        control={control}
        rules={{
          required: "Industry is required.",
          validate: (value) => {
            if (value === "other_industry") {
              const customValue = control.getValues("customIndustry");
              return customValue?.trim()
                ? true
                : "Please specify your custom industry.";
            }
            return true;
          },
        }}
        render={({ field }) => (
          <>
            <Select
              {...field}
              options={[
                ...industryOptions,
                { value: "other_industry", label: "Other" },
              ]}
              placeholder="Select or search industry"
              onInputChange={(inputValue) => {
                const hasMatch = industryOptions.some((option) =>
                  option.label.toLowerCase().includes(inputValue.toLowerCase())
                );
                if (!hasMatch && inputValue.trim()) {
                  setShowCustomInput(true);
                } else {
                  setShowCustomInput(false);
                }
              }}
              onChange={(selectedOption) => {
                field.onChange(selectedOption.value);
                setShowCustomInput(selectedOption.value === "other_industry");
                if (selectedOption.value !== "other_industry") {
                  setValue("customIndustry", ""); // Clear custom input
                }
              }}
            />
            {showCustomInput && (
              <Controller
                name="customIndustry"
                control={control}
                rules={{
                  required: "Please specify your custom industry.",
                }}
                render={({ field: customField }) => (
                  <input
                    {...customField}
                    type="text"
                    placeholder="Specify your industry"
                    className={`mt-3 form-control ${
                      errors.customIndustry ? "input-error" : ""
                    }`}
                  />
                )}
              />
            )}
          </>
        )}
      />
      {errors.industry && (
        <p className="error-text">{errors.industry.message}</p>
      )}
      {errors.customIndustry && (
        <p className="error-text">{errors.customIndustry.message}</p>
      )}
    </div>
  );
};

export default IndustrySelect;
