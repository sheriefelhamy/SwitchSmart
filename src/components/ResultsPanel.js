// src/components/ResultsPanel.jsx
import React, {useRef} from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import {
  DollarSign,
  Clock,
  Leaf,
  TrendingDown,
  CheckCircle,
  X,
} from "lucide-react";



const ResultsPanel = ({
  results,
  t,
  isRTL,
  language,
  formatNumber,
  saveStatus,
}) => {

  const printRef = React.useRef(null);
  const exportAsPdf = async () =>
{
  const element = printRef.current;
  if (!element)
  {
    return ("error");
  }
  const canvas = await html2canvas(element, {scale: 2});
  const data = canvas.toDataURL("image/png");
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "px",
    format: "a4",
  });
  
  const imageProps = pdf.getImageProperties(data);
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (imageProps.height * pdfWidth) / imageProps.width;

  pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
  pdf.save("download.pdf");
}
  return (
    <div 
      className="space-y-6"
       ref={printRef}
    >
      {saveStatus.message && (
        <div
          className={`p-4 rounded-lg border ${
            saveStatus.type === "success"
              ? "bg-green-50 border-green-200 text-green-800"
              : "bg-red-50 border-red-200 text-red-800"
          } ${isRTL ? "text-right" : ""}`}
        >
          <div
            className={`flex items-center space-x-2 ${
              isRTL ? "flex-row-reverse space-x-reverse" : ""
            }`}
          >
            {saveStatus.type === "success" ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <X className="w-5 h-5" />
            )}
            <span className="font-medium">{saveStatus.message}</span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-6 text-white shadow-lg">
          <div
            className={`flex items-center justify-between mb-2 ${
              isRTL ? "flex-row-reverse" : ""
            }`}
          >
            <DollarSign className="w-8 h-8" />
            <span
              className={`text-emerald-100 text-sm ${
                isRTL ? "text-left" : "text-right"
              }`}
            >
              {t.annualSavings}
            </span>
          </div>
          <div className={`text-3xl font-bold ${isRTL ? "text-right" : ""}`}>
            {formatNumber(parseInt(results.annualSavings))}{" "}
            {language === "ar" ? "ريال" : "SAR"}
          </div>
          <div
            className={`text-emerald-100 text-sm mt-1 ${
              isRTL ? "text-right" : ""
            }`}
          >
            {formatNumber(parseInt(results.monthlySavings))}{" "}
            {language === "ar" ? "ريال" : "SAR"}/{t.monthlySavings}
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
          <div
            className={`flex items-center justify-between mb-2 ${
              isRTL ? "flex-row-reverse" : ""
            }`}
          >
            <Clock className="w-8 h-8" />
            <span
              className={`text-blue-100 text-sm ${
                isRTL ? "text-left" : "text-right"
              }`}
            >
              {t.paybackPeriod}
            </span>
          </div>
          <div className={`text-3xl font-bold ${isRTL ? "text-right" : ""}`}>
            {formatNumber(parseFloat(results.paybackMonths))} {t.months}
          </div>
          <div
            className={`text-blue-100 text-sm mt-1 ${
              isRTL ? "text-right" : ""
            }`}
          >
            {formatNumber(parseFloat((results.paybackMonths / 12).toFixed(1)))}{" "}
            {t.years}
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
          <div
            className={`flex items-center justify-between mb-2 ${
              isRTL ? "flex-row-reverse" : ""
            }`}
          >
            <Leaf className="w-8 h-8" />
            <span
              className={`text-green-100 text-sm ${
                isRTL ? "text-left" : "text-right"
              }`}
            >
              {t.co2Reduction}
            </span>
          </div>
          <div className={`text-3xl font-bold ${isRTL ? "text-right" : ""}`}>
            {formatNumber(parseInt(results.co2Reduction))}{" "}
            {language === "ar" ? "كغ" : "kg"}/{t.perYear}
          </div>
          <div
            className={`text-green-100 text-sm mt-1 ${
              isRTL ? "text-right" : ""
            }`}
          >
            {formatNumber(parseFloat((results.co2Reduction / 1000).toFixed(1)))}{" "}
            {t.tons}
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
          <div
            className={`flex items-center justify-between mb-2 ${
              isRTL ? "flex-row-reverse" : ""
            }`}
          >
            <TrendingDown className="w-8 h-8" />
            <span
              className={`text-purple-100 text-sm ${
                isRTL ? "text-left" : "text-right"
              }`}
            >
              {t.roi}
            </span>
          </div>
          <div className={`text-3xl font-bold ${isRTL ? "text-right" : ""}`}>
            {formatNumber(parseFloat(results.roi))}%
          </div>
          <div
            className={`text-purple-100 text-sm mt-1 ${
              isRTL ? "text-right" : ""
            }`}
          >
            {t.annualReturn}
          </div>
        </div>
      </div>

      <div 
      className="bg-white rounded-xl shadow-lg p-6">
        <h3
          className={`text-xl font-bold text-gray-900 mb-4 ${
            isRTL ? "text-right" : ""
          }`}
        >
          {t.costComparison}
        </h3>
        <div className="space-y-4">
          <div
            className={`flex justify-between items-center p-4 bg-gray-50 rounded-lg ${
              isRTL ? "flex-row-reverse" : ""
            }`}
          >
            <span className="text-gray-700">{t.currentFuelCostLabel}</span>
            <span className="font-semibold text-gray-900">
              {formatNumber(parseFloat(results.currentCost))}{" "}
              {language === "ar" ? "ريال" : "SAR"}
            </span>
          </div>
          <div
            className={`flex justify-between items-center p-4 bg-emerald-50 rounded-lg ${
              isRTL ? "flex-row-reverse" : ""
            }`}
          >
            <span className="text-gray-700">{t.gasCostLabel}</span>
            <span className="font-semibold text-emerald-700">
              {formatNumber(parseFloat(results.gasPrice))}{" "}
              {language === "ar" ? "ريال" : "SAR"}
            </span>
          </div>
          <div
            className={`flex justify-between items-center p-4 bg-blue-50 rounded-lg ${
              isRTL ? "flex-row-reverse" : ""
            }`}
          >
            <span className="text-gray-700">{t.savingsPerUnit}</span>
            <span className="font-semibold text-blue-700">
              {formatNumber(
                parseFloat((results.currentCost - results.gasPrice).toFixed(2))
              )}{" "}
              {language === "ar" ? "ريال" : "SAR"}
            </span>
          </div>
        </div>
      </div>
      <button 
      onClick={exportAsPdf}
      className="w-full bg-gradient-to-r from-gray-700 to-gray-800 text-white py-4 rounded-lg font-semibold hover:from-gray-800 hover:to-gray-900 transition-all shadow-lg">
        📄 {t.exportReport}
      </button>
    </div>
  );
};

export default ResultsPanel;