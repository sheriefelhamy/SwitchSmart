// src/components/TabNavigation.jsx
import React from "react";
import { Calculator, TrendingDown } from "lucide-react";

const TabNavigation = ({ activeTab, onTabChange, t, isRTL, hasResults }) => {
  return (
    <div className="flex space-x-1 bg-white rounded-lg p-1 shadow-sm mb-6">
      <button
        onClick={() => onTabChange("calculator")}
        className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-md transition-all ${
          isRTL ? "flex-row-reverse space-x-reverse" : ""
        } ${
          activeTab === "calculator"
            ? "bg-gradient-to-r from-emerald-500 to-blue-600 text-white shadow-md"
            : "text-gray-600 hover:bg-gray-50"
        }`}
      >
        <Calculator className="w-5 h-5" />
        <span className="font-medium">{t.calculator}</span>
      </button>
      <button
        onClick={() => onTabChange("results")}
        className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-md transition-all ${
          isRTL ? "flex-row-reverse space-x-reverse" : ""
        } ${
          activeTab === "results"
            ? "bg-gradient-to-r from-emerald-500 to-blue-600 text-white shadow-md"
            : "text-gray-600 hover:bg-gray-50"
        }`}
        disabled={!hasResults}
      >
        <TrendingDown className="w-5 h-5" />
        <span className="font-medium">{t.results}</span>
      </button>
    </div>
  );
};

export default TabNavigation;
