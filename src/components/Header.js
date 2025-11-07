// src/components/Header.jsx
import React from "react";
import { Factory, Globe } from "lucide-react";

const Header = ({ language, isRTL, t, onLanguageToggle }) => {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div
            className={`flex items-center space-x-3 ${
              isRTL ? "flex-row-reverse space-x-reverse" : ""
            }`}
          >
            <div className="bg-gradient-to-br from-emerald-500 to-blue-600 p-2 rounded-lg">
              <Factory className="w-8 h-8 text-white" />
            </div>
            <div className={isRTL ? "text-right" : ""}>
              <h1 className="text-2xl font-bold text-gray-900">{t.appName}</h1>
              <p className="text-sm text-gray-600">{t.tagline}</p>
            </div>
          </div>
          <div
            className={`flex items-center space-x-4 ${
              isRTL ? "flex-row-reverse space-x-reverse" : ""
            }`}
          >
            <div
              className={`flex items-center space-x-2 text-sm text-gray-600 ${
                isRTL ? "flex-row-reverse space-x-reverse" : ""
              }`}
            >
              <span className="hidden sm:inline">{t.poweredBy}</span>
              <span className="font-semibold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                Gemini & Vertex AI
              </span>
            </div>
            <button
              onClick={onLanguageToggle}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-blue-600 text-white rounded-lg hover:from-emerald-600 hover:to-blue-700 transition-all shadow-sm"
            >
              <Globe className="w-4 h-4" />
              <span className="font-medium">
                {language === "en" ? "العربية" : "English"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
