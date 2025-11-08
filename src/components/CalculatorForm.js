// src/components/CalculatorForm.jsx
import React from "react";
import { Save } from "lucide-react";

const CalculatorForm = ({
  formData,
  onInputChange,
  onSubmit,
  t,
  isRTL,
  isSaving,
}) => {
  const industryTypes = [
    { value: "cement", label: t.cement },
    { value: "steel", label: t.steel },
    { value: "chemicals", label: t.chemicals },
    { value: "textiles", label: t.textiles },
    { value: "food", label: t.food },
    { value: "glass", label: t.glass },
  ];

  const fuelTypes = [
    { value: "diesel", label: t.diesel },
    { value: "heavy_oil", label: t.heavyOil },
  ];

  const plantsize = [
    { value: "small", label: t.small },
    { value: "medium", label: t.medium },
    { value: "large", label: t.large },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2
        className={`text-2xl font-bold text-gray-900 mb-6 ${
          isRTL ? "text-right" : ""
        }`}
      >
        {t.formTitle}
      </h2>

      <div className="space-y-6">

        <div>
          <label
            className={`block text-sm font-medium text-gray-700 mb-2 ${
              isRTL ? "text-right" : ""
            }`}
          >
            {t.name}
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={onInputChange}
            placeholder={t.placeholderName}
            className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
              isRTL ? "text-right" : ""
            }`}
          />
        </div>

        <div>
          <label
            className={`block text-sm font-medium text-gray-700 mb-2 ${
              isRTL ? "text-right" : ""
            }`}
          >
            {t.industryType}
          </label>
          <select
            name="industryType"
            value={formData.industryType}
            onChange={onInputChange}
            className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
              isRTL ? "text-right" : ""
            }`}
          >
            {industryTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

      

        <div>
          <label
            className={`block text-sm font-medium text-gray-700 mb-2 ${
              isRTL ? "text-right" : ""
            }`}
          >
            {t.plantsize}
          </label>
          <select
            name="plantsize"
            value={formData.plantsize }
            onChange={onInputChange}
            className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
              isRTL ? "text-right" : ""
            }`}
          >
            {plantsize.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>



        <div>
          <label
            className={`block text-sm font-medium text-gray-700 mb-2 ${
              isRTL ? "text-right" : ""
            }`}
          >
            {t.currentFuel}
          </label>
          <select
            name="currentFuel"
            value={formData.currentFuel}
            onChange={onInputChange}
            className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
              isRTL ? "text-right" : ""
            }`}
          >
            {fuelTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>


           <div>
          <label
            className={`block text-sm font-medium text-gray-700 mb-2 ${
              isRTL ? "text-right" : ""
            }`}
          >
            {t.monthlyConsumption}
          </label>
          <input
            type="number"
            name="monthlyConsumption"
            value={formData.monthlyConsumption}
            onChange={onInputChange}
            placeholder={
                    //errors.monthlyConsumption
                      //? errors.monthlyConsumption
                      //:
                       t.placeholderConsumption
                        }
          className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
          isRTL ? "text-right" : ""
             }`}
          />
        </div>



        <div>
          <label
            className={`block text-sm font-medium text-gray-700 mb-2 ${
              isRTL ? "text-right" : ""
            }`}
          >
            {t.currentFuelCost}
          </label>
          <input
            type="number"
            step="0.01"
            name="currentFuelCost"
            value={formData.currentFuelCost}
            onChange={onInputChange}
            placeholder={t.placeholderFuelCost}
            className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
              isRTL ? "text-right" : ""
            }`}
          />
        </div>

        <div>
          <label
            className={`block text-sm font-medium text-gray-700 mb-2 ${
              isRTL ? "text-right" : ""
            }`}
          >
            {t.operatingHours}
          </label>
          <input
            type="number"
            name="operatingHours"
            value={formData.operatingHours}
            onChange={onInputChange}
            placeholder={t.placeholderHours}
            className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
              isRTL ? "text-right" : ""
            }`}
          />
        </div>

        <div>
          <label
            className={`block text-sm font-medium text-gray-700 mb-2 ${
              isRTL ? "text-right" : ""
            }`}
          >
            {t.location}
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={onInputChange}
            placeholder={t.placeholderLocation}
            className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
              isRTL ? "text-right" : ""
            }`}
          />
        </div>

        <div>
          <label
            className={`block text-sm font-medium text-gray-700 mb-2 ${
              isRTL ? "text-right" : ""
            }`}
          >
            {t.conversionCost}
          </label>
          <input
            type="number"
            name="conversionCost"
            value={formData.conversionCost}
            onChange={onInputChange}
            placeholder={t.placeholderConversion}
            className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
              isRTL ? "text-right" : ""
            }`}
          />
          <p
            className={`mt-2 text-sm text-gray-500 ${
              isRTL ? "text-right" : ""
            }`}
          >
            {t.leaveBlank}
          </p>
        </div>

        <button
          onClick={onSubmit}
          disabled={
            isSaving ||
            !formData.monthlyConsumption ||
            !formData.currentFuelCost
          }
          className={`w-full bg-gradient-to-r from-emerald-500 to-blue-600 text-white py-4 rounded-lg font-semibold hover:from-emerald-600 hover:to-blue-700 transition-all shadow-lg flex items-center justify-center space-x-2 ${
            isRTL ? "flex-row-reverse space-x-reverse" : ""
          } ${isSaving ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <Save className="w-5 h-5" />
          <span>{isSaving ? t.saving : t.calculateButton}</span>
        </button>
      </div>
    </div>
  );
};

export default CalculatorForm;
