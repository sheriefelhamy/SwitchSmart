// src/components/Sidebar.jsx
import React from "react";

const Sidebar = ({ t, isRTL }) => {
  return (
    <div className={`space-y-6 ${isRTL ? "lg:order-1" : ""}`}>
      <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-6 text-white shadow-lg">
        <h3 className={`text-lg font-bold mb-3 ${isRTL ? "text-right" : ""}`}>
          {t.whySwitch}
        </h3>
        <ul className={`space-y-2 text-sm ${isRTL ? "text-right" : ""}`}>
          <li className={`flex items-start ${isRTL ? "flex-row-reverse" : ""}`}>
            <span className={isRTL ? "ml-2" : "mr-2"}>💰</span>
            <span>{t.benefit1}</span>
          </li>
          <li className={`flex items-start ${isRTL ? "flex-row-reverse" : ""}`}>
            <span className={isRTL ? "ml-2" : "mr-2"}>🌱</span>
            <span>{t.benefit2}</span>
          </li>
          <li className={`flex items-start ${isRTL ? "flex-row-reverse" : ""}`}>
            <span className={isRTL ? "ml-2" : "mr-2"}>⚡</span>
            <span>{t.benefit3}</span>
          </li>
          <li className={`flex items-start ${isRTL ? "flex-row-reverse" : ""}`}>
            <span className={isRTL ? "ml-2" : "mr-2"}>🇸🇦</span>
            <span>{t.benefit4}</span>
          </li>
        </ul>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3
          className={`text-lg font-bold text-gray-900 mb-3 ${
            isRTL ? "text-right" : ""
          }`}
        >
          {t.quickFacts}
        </h3>
        <div
          className={`space-y-3 text-sm text-gray-600 ${
            isRTL ? "text-right" : ""
          }`}
        >
          <p>✓ {t.fact1}</p>
          <p>✓ {t.fact2}</p>
          <p>✓ {t.fact3}</p>
          <p>✓ {t.fact4}</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
