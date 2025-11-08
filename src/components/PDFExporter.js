// src/components/ResultsPanel.jsx
import React from "react";
import {
  DollarSign,
  Clock,
  Leaf,
  TrendingDown,
  CheckCircle,
  X,
  FileDown
} from "lucide-react";

const ResultsPanel = ({
   t,
  isRTL,
  saveStatus,
  formData, 
  results, 
  language, 
  formatNumber,
  className = '' 
}) => {

  const generatePDF = async () => {
    //try {
      // Dynamically import jsPDF
      if (!formData) {
    alert(language === 'ar' 
      ? 'بيانات النموذج غير متوفرة. يرجى التأكد من إدخال البيانات أولاً.' 
      : 'Form data not available. Please ensure data is entered first.');
    return;
  }
      const jsPDFModule = await import('jspdf');
      const jsPDF = jsPDFModule.default || jsPDFModule.jsPDF;
      
      // Import autotable plugin
      await import('jspdf-autotable');

      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      let yPosition = 20;

      // Configure for RTL if Arabic
      if (isRTL) {
        doc.setR2L(true);
      }

      // Helper function to add text (handles RTL)
      const addText = (text, x, y, options = {}) => {
        if (isRTL) {
          doc.text(text, pageWidth - x, y, { align: 'right', ...options });
        } else {
          doc.text(text, x, y, options);
        }
      };

      // Header with gradient effect simulation
      doc.setFillColor(16, 185, 129); // Emerald color
      doc.rect(0, 0, pageWidth, 40, 'F');
      
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(24);
      doc.setFont(undefined, 'bold');
      addText(t.appName || 'SwitchSmart', 20, 15);
      
      doc.setFontSize(12);
      doc.setFont(undefined, 'normal');
      addText(t.tagline || 'Gas Conversion Feasibility Report', 20, 25);
      
      // Add date
      doc.setFontSize(10);
      const dateText = new Date().toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US');
      addText(dateText, pageWidth - 20, 35, { align: isRTL ? 'left' : 'right' });

      yPosition = 50;

      // Reset text color
      doc.setTextColor(0, 0, 0);

      // Section 1: Project Overview
      doc.setFontSize(16);
      doc.setFont(undefined, 'bold');
      doc.setTextColor(16, 185, 129);
      addText(language === 'ar' ? 'نظرة عامة على المشروع' : 'Project Overview', 20, yPosition);
      yPosition += 10;

      doc.setFontSize(11);
      doc.setFont(undefined, 'normal');
      doc.setTextColor(0, 0, 0);

      // Industry Type mapping
      const industryMap = {
        cement: language === 'ar' ? 'مصنع أسمنت' : 'Cement Factory',
        steel: language === 'ar' ? 'تصنيع الصلب' : 'Steel Manufacturing',
        chemicals: language === 'ar' ? 'المعالجة الكيميائية' : 'Chemical Processing',
        textiles: language === 'ar' ? 'إنتاج المنسوجات' : 'Textile Production',
        food: language === 'ar' ? 'تجهيز الأغذية' : 'Food Processing',
        glass: language === 'ar' ? 'تصنيع الزجاج' : 'Glass Manufacturing',
        paper: language === 'ar' ? 'تصنيع الورق' : 'Paper Manufacturing',
        plastic: language === 'ar' ? 'تصنيع البلاستيك' : 'Plastic Manufacturing',
        other: language === 'ar' ? 'أخرى' : 'Other',
      };

      const fuelMap = {
        diesel: language === 'ar' ? 'الديزل' : 'Diesel',
        heavy_oil: language === 'ar' ? 'الزيت الثقيل' : 'Heavy Fuel Oil',
      };

      const overviewData = [
        [language === 'ar' ? 'نوع الصناعة' : 'Industry Type', industryMap[formData.industryType] || formData.industryType],
        [language === 'ar' ? 'نوع الوقود الحالي' : 'Current Fuel Type', fuelMap[formData.currentFuel] || formData.currentFuel],
        [language === 'ar' ? 'الموقع' : 'Location', formData.location || 'N/A'],
        [language === 'ar' ? 'الاستهلاك الشهري' : 'Monthly Consumption', `${formatNumber(parseInt(formData.monthlyConsumption))} ${language === 'ar' ? 'لتر' : 'Liters'}`],
        [language === 'ar' ? 'ساعات التشغيل اليومية' : 'Daily Operating Hours', `${formData.operatingHours} ${language === 'ar' ? 'ساعة' : 'hours'}`]
      ];

      doc.autoTable({
        startY: yPosition,
        head: [[language === 'ar' ? 'البيان' : 'Parameter', language === 'ar' ? 'القيمة' : 'Value']],
        body: overviewData,
        theme: 'grid',
        headStyles: { fillColor: [16, 185, 129], textColor: 255, fontStyle: 'bold' },
        styles: { font: 'helvetica', fontSize: 10, halign: isRTL ? 'right' : 'left' },
        margin: { left: 20, right: 20 }
      });

      yPosition = doc.lastAutoTable.finalY + 15;

      // Section 2: Financial Analysis
      doc.setFontSize(16);
      doc.setFont(undefined, 'bold');
      doc.setTextColor(59, 130, 246); // Blue color
      addText(language === 'ar' ? 'التحليل المالي' : 'Financial Analysis', 20, yPosition);
      yPosition += 10;

      const currency = language === 'ar' ? 'ريال' : 'SAR';
      const financialData = [
        [
          language === 'ar' ? 'التوفير السنوي' : 'Annual Savings',
          `${formatNumber(parseInt(results.annualSavings))} ${currency}`,
          language === 'ar' ? 'توفير كبير في تكاليف الوقود' : 'Significant fuel cost reduction'
        ],
        [
          language === 'ar' ? 'التوفير الشهري' : 'Monthly Savings',
          `${formatNumber(parseInt(results.monthlySavings))} ${currency}`,
          language === 'ar' ? 'تحسين التدفق النقدي الشهري' : 'Improved monthly cash flow'
        ],
        [
          language === 'ar' ? 'فترة الاسترداد' : 'Payback Period',
          `${formatNumber(parseFloat(results.paybackMonths))} ${language === 'ar' ? 'شهر' : 'months'}`,
          language === 'ar' ? 'استرداد سريع للاستثمار' : 'Quick investment recovery'
        ],
        [
          language === 'ar' ? 'العائد على الاستثمار' : 'Return on Investment',
          `${formatNumber(parseFloat(results.roi))}%`,
          language === 'ar' ? 'عائد استثماري ممتاز' : 'Excellent ROI'
        ],
        [
          language === 'ar' ? 'تكلفة التحويل' : 'Conversion Cost',
          `${formatNumber(parseInt(results.conversionCost))} ${currency}`,
          language === 'ar' ? 'استثمار لمرة واحدة' : 'One-time investment'
        ]
      ];

      doc.autoTable({
        startY: yPosition,
        head: [[language === 'ar' ? 'المؤشر' : 'Metric', language === 'ar' ? 'القيمة' : 'Value', language === 'ar' ? 'الملاحظات' : 'Notes']],
        body: financialData,
        theme: 'striped',
        headStyles: { fillColor: [59, 130, 246], textColor: 255, fontStyle: 'bold' },
        styles: { font: 'helvetica', fontSize: 10, halign: isRTL ? 'right' : 'left' },
        margin: { left: 20, right: 20 }
      });

      yPosition = doc.lastAutoTable.finalY + 15;

      // Add new page if needed
      if (yPosition > pageHeight - 60) {
        doc.addPage();
        yPosition = 20;
      }

      // Section 3: Environmental Impact
      doc.setFontSize(16);
      doc.setFont(undefined, 'bold');
      doc.setTextColor(34, 197, 94); // Green color
      addText(language === 'ar' ? 'الأثر البيئي' : 'Environmental Impact', 20, yPosition);
      yPosition += 10;

      const environmentalData = [
        [
          language === 'ar' ? 'تقليل انبعاثات CO₂' : 'CO₂ Emissions Reduction',
          `${formatNumber(parseInt(results.co2Reduction))} ${language === 'ar' ? 'كغ/سنة' : 'kg/year'}`,
          `${formatNumber(parseFloat((results.co2Reduction / 1000).toFixed(1)))} ${language === 'ar' ? 'طن سنوياً' : 'tons annually'}`
        ],
        [
          language === 'ar' ? 'نسبة التقليل' : 'Reduction Percentage',
          '40%',
          language === 'ar' ? 'مقارنة بالوقود الحالي' : 'Compared to current fuel'
        ],
        [
          language === 'ar' ? 'توافق رؤية 2030' : 'Vision 2030 Alignment',
          language === 'ar' ? 'ممتاز' : 'Excellent',
          language === 'ar' ? 'يدعم الأهداف البيئية' : 'Supports environmental goals'
        ]
      ];

      doc.autoTable({
        startY: yPosition,
        head: [[language === 'ar' ? 'المؤشر البيئي' : 'Environmental Metric', language === 'ar' ? 'القيمة' : 'Value', language === 'ar' ? 'التأثير' : 'Impact']],
        body: environmentalData,
        theme: 'grid',
        headStyles: { fillColor: [34, 197, 94], textColor: 255, fontStyle: 'bold' },
        styles: { font: 'helvetica', fontSize: 10, halign: isRTL ? 'right' : 'left' },
        margin: { left: 20, right: 20 }
      });

      yPosition = doc.lastAutoTable.finalY + 15;

      // Add new page if needed
      if (yPosition > pageHeight - 80) {
        doc.addPage();
        yPosition = 20;
      }

      // Section 4: Cost Comparison
      doc.setFontSize(16);
      doc.setFont(undefined, 'bold');
      doc.setTextColor(168, 85, 247); // Purple color
      addText(language === 'ar' ? 'مقارنة التكاليف' : 'Cost Comparison', 20, yPosition);
      yPosition += 10;

      const costData = [
        [
          language === 'ar' ? 'تكلفة الوقود الحالي' : 'Current Fuel Cost',
          `${formatNumber(parseFloat(results.currentCost))} ${currency}/${language === 'ar' ? 'لتر' : 'liter'}`
        ],
        [
          language === 'ar' ? 'تكلفة الغاز الطبيعي المعادلة' : 'Natural Gas Equivalent Cost',
          `${formatNumber(parseFloat(results.gasPrice))} ${currency}/${language === 'ar' ? 'لتر' : 'liter'}`
        ],
        [
          language === 'ar' ? 'التوفير لكل وحدة' : 'Savings per Unit',
          `${formatNumber(parseFloat((results.currentCost - results.gasPrice).toFixed(2)))} ${currency}/${language === 'ar' ? 'لتر' : 'liter'}`
        ]
      ];

      doc.autoTable({
        startY: yPosition,
        head: [[language === 'ar' ? 'نوع التكلفة' : 'Cost Type', language === 'ar' ? 'المبلغ' : 'Amount']],
        body: costData,
        theme: 'striped',
        headStyles: { fillColor: [168, 85, 247], textColor: 255, fontStyle: 'bold' },
        styles: { font: 'helvetica', fontSize: 10, halign: isRTL ? 'right' : 'left' },
        margin: { left: 20, right: 20 }
      });

      yPosition = doc.lastAutoTable.finalY + 15;

      // Section 5: Recommendations
      if (yPosition > pageHeight - 100) {
        doc.addPage();
        yPosition = 20;
      }

      doc.setFontSize(16);
      doc.setFont(undefined, 'bold');
      doc.setTextColor(234, 88, 12); // Orange color
      addText(language === 'ar' ? 'التوصيات' : 'Recommendations', 20, yPosition);
      yPosition += 10;

      doc.setFontSize(11);
      doc.setFont(undefined, 'normal');
      doc.setTextColor(0, 0, 0);

      const recommendations = language === 'ar' ? [
        '✓ المشروع يقدم عائد استثماري قوي مع فترة استرداد معقولة',
        '✓ التحويل يحقق توفيرات كبيرة في التكاليف التشغيلية',
        '✓ يساهم في تحقيق الأهداف البيئية لرؤية 2030',
        '✓ ينصح بالبدء في دراسة الجدوى التفصيلية',
        '✓ التواصل مع مزودي خدمات الغاز الطبيعي للحصول على عروض أسعار'
      ] : [
        '✓ Project offers strong ROI with reasonable payback period',
        '✓ Conversion achieves significant operational cost savings',
        '✓ Contributes to Vision 2030 environmental goals',
        '✓ Recommended to proceed with detailed feasibility study',
        '✓ Contact natural gas service providers for detailed quotes'
      ];

      recommendations.forEach((rec) => {
        if (yPosition > pageHeight - 20) {
          doc.addPage();
          yPosition = 20;
        }
        addText(rec, 25, yPosition);
        yPosition += 8;
      });

      // Footer
      const footerY = pageHeight - 15;
      doc.setFontSize(9);
      doc.setTextColor(128, 128, 128);
      addText(
        language === 'ar' 
          ? `تم إنشاؤه بواسطة SwitchSmart - مدعوم بالذكاء الاصطناعي | ${dateText}`
          : `Generated by SwitchSmart - AI Powered | ${dateText}`,
        pageWidth / 2,
        footerY,
        { align: 'center' }
      );

      // Save the PDF
      const fileName = language === 'ar' 
        ? `تقرير_جدوى_تحويل_الغاز_${formData.industryType}_${Date.now()}.pdf`
        : `Gas_Conversion_Feasibility_Report_${formData.industryType}_${Date.now()}.pdf`;
      
      doc.save(fileName);
    //} catch (error) {
    //  console.error('Error generating PDF:', error);
     // alert(language === 'ar' 
       // ? 'حدث خطأ أثناء إنشاء ملف PDF. يرجى المحاولة مرة أخرى.'
        //: 'An error occurred while generating the PDF. Please try again.'
      //);
   // }
  };

  return (
    <div className="space-y-6">
      {saveStatus?.message && (
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

      <div className="bg-white rounded-xl shadow-lg p-6">
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
        onClick={generatePDF}
        className={`w-full bg-gradient-to-r from-gray-700 to-gray-800 text-white py-4 rounded-lg font-semibold hover:from-gray-800 hover:to-gray-900 transition-all shadow-lg flex items-center justify-center space-x-2 ${
          isRTL ? 'flex-row-reverse space-x-reverse' : ''
        } ${className}`}
      >
        <FileDown className="w-5 h-5" />
        <span>📄 {t.exportReport || 'Export Feasibility Report (PDF)'}</span>
      </button>
    </div>
  );
};

export default ResultsPanel;