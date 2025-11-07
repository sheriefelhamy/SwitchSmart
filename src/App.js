import React, { useState, useEffect } from 'react';
import { Calculator, MessageSquare, TrendingDown, Leaf, Clock, DollarSign, Factory, Send, X, Globe, Save, CheckCircle } from 'lucide-react';

// Translation data
const translations = {
  en: {
    // Header
    appName: "SwitchSmart",
    tagline: "AI-Powered Gas Conversion Estimator",
    poweredBy: "Powered by",
    
    // Navigation
    calculator: "Calculator",
    results: "Results",
    
    // Form Labels
    formTitle: "Fuel Conversion Calculator",
    industryType: "Industry Type",
    currentFuel: "Current Fuel Type",
    monthlyConsumption: "Monthly Fuel Consumption (Liters)",
    currentFuelCost: "Current Fuel Cost (SAR per Liter)",
    operatingHours: "Daily Operating Hours",
    location: "Facility Location (City)",
    conversionCost: "Estimated Conversion Cost (SAR) - Optional",
    defaultCost: "Default: 500,000 SAR",
    leaveBlank: "Leave blank to use default estimate",
    calculateButton: "Calculate Savings & Impact",
    
    // Save buttons
    saveToDatabase: "Save to Database",
    saving: "Saving...",
    savedSuccessfully: "Saved Successfully!",
    saveFailed: "Save Failed. Try Again.",
    
    // Industry Types
    cement: "Cement Factory",
    steel: "Steel Manufacturing",
    chemicals: "Chemical Processing",
    textiles: "Textile Production",
    food: "Food Processing",
    glass: "Glass Manufacturing",
    
    // Fuel Types
    diesel: "Diesel",
    heavyOil: "Heavy Fuel Oil",
    lpg: "LPG",
    
    // Placeholders
    placeholderConsumption: "e.g., 50000",
    placeholderCost: "e.g., 2.50",
    placeholderHours: "e.g., 16",
    placeholderLocation: "e.g., Riyadh",
    placeholderConversion: "Default: 500,000 SAR",
    
    // Results
    annualSavings: "Annual Savings",
    monthlySavings: "month",
    paybackPeriod: "Payback Period",
    months: "months",
    years: "years",
    co2Reduction: "CO₂ Reduction",
    perYear: "year",
    tons: "tons annually",
    roi: "ROI",
    annualReturn: "Annual return on investment",
    
    // Cost Comparison
    costComparison: "Cost Comparison",
    currentFuelCostLabel: "Current Fuel Cost (per liter)",
    gasCostLabel: "Natural Gas Equivalent Cost",
    savingsPerUnit: "Savings per Unit",
    exportReport: "Export Feasibility Report (PDF)",
    
    // Sidebar
    whySwitch: "Why Switch to Natural Gas?",
    benefit1: "30-40% lower fuel costs",
    benefit2: "40% less CO₂ emissions",
    benefit3: "Higher energy efficiency",
    benefit4: "Supports Vision 2030 goals",
    
    quickFacts: "Quick Facts",
    fact1: "Average payback: 18-36 months",
    fact2: "Conversion time: 3-6 months",
    fact3: "Maintenance costs: 20% lower",
    fact4: "Government incentives available",
    
    // AI Assistant
    aiAssistant: "Gemini AI Assistant",
    poweredByAI: "Powered by Google AI",
    askAnything: "Ask me anything...",
    
    // AI Responses
    aiWelcome: "Hello! I'm your AI assistant powered by Gemini. I can help you understand the gas conversion process, explain results, and run what-if scenarios. How can I help you today?",
    aiSavings: "Based on typical conversion patterns in Saudi Arabia, factories switching from diesel to natural gas see savings of 30-40% on fuel costs. The exact amount depends on your consumption volume and current fuel prices. Would you like me to help you calculate your specific savings?",
    aiPayback: "Payback periods for gas conversion typically range from 18-36 months depending on your consumption volume. Higher consumption facilities see faster payback. The average conversion cost is around 500,000-2,000,000 SAR depending on facility size.",
    aiEmission: "Natural gas produces approximately 40% less CO₂ compared to diesel, and significantly reduces NOₓ and particulate emissions. This helps meet Vision 2030 environmental targets and may qualify your facility for green incentives.",
    aiProcess: "The conversion process typically involves: 1) Infrastructure assessment, 2) Gas pipeline connection or storage setup, 3) Burner/boiler modifications, 4) Safety systems installation, 5) Testing and commissioning. The entire process takes 3-6 months on average.",
    aiDefault: "I can help you with information about cost savings, environmental benefits, payback periods, conversion process, or run what-if scenarios. What would you like to explore?"
  },
  ar: {
    // Header
    appName: "سويتش سمارت",
    tagline: "أداة تقدير تحويل الغاز المدعومة بالذكاء الاصطناعي",
    poweredBy: "مدعوم بواسطة",
    
    // Navigation
    calculator: "الحاسبة",
    results: "النتائج",
    
    // Form Labels
    formTitle: "حاسبة تحويل الوقود",
    industryType: "نوع الصناعة",
    currentFuel: "نوع الوقود الحالي",
    monthlyConsumption: "الاستهلاك الشهري للوقود (لتر)",
    currentFuelCost: "تكلفة الوقود الحالية (ريال لكل لتر)",
    operatingHours: "ساعات التشغيل اليومية",
    location: "موقع المنشأة (المدينة)",
    conversionCost: "تكلفة التحويل المقدرة (ريال) - اختياري",
    defaultCost: "الافتراضي: 500,000 ريال",
    leaveBlank: "اتركه فارغاً لاستخدام التقدير الافتراضي",
    calculateButton: "احسب التوفير والأثر",
    
    // Save buttons
    saveToDatabase: "حفظ في قاعدة البيانات",
    saving: "جاري الحفظ...",
    savedSuccessfully: "تم الحفظ بنجاح!",
    saveFailed: "فشل الحفظ. حاول مرة أخرى.",
    
    // Industry Types
    cement: "مصنع أسمنت",
    steel: "تصنيع الصلب",
    chemicals: "المعالجة الكيميائية",
    textiles: "إنتاج المنسوجات",
    food: "تجهيز الأغذية",
    glass: "تصنيع الزجاج",
    
    // Fuel Types
    diesel: "الديزل",
    heavyOil: "الزيت الثقيل",
    lpg: "الغاز البترولي المسال",
    
    // Placeholders
    placeholderConsumption: "مثلاً، 50000",
    placeholderCost: "مثلاً، 2.50",
    placeholderHours: "مثلاً، 16",
    placeholderLocation: "مثلاً، الرياض",
    placeholderConversion: "الافتراضي: 500,000 ريال",
    
    // Results
    annualSavings: "التوفير السنوي",
    monthlySavings: "شهرياً",
    paybackPeriod: "فترة الاسترداد",
    months: "شهر",
    years: "سنة",
    co2Reduction: "تقليل ثاني أكسيد الكربون",
    perYear: "سنوياً",
    tons: "طن سنوياً",
    roi: "العائد على الاستثمار",
    annualReturn: "العائد السنوي على الاستثمار",
    
    // Cost Comparison
    costComparison: "مقارنة التكاليف",
    currentFuelCostLabel: "تكلفة الوقود الحالي (لكل لتر)",
    gasCostLabel: "تكلفة الغاز الطبيعي المعادلة",
    savingsPerUnit: "التوفير لكل وحدة",
    exportReport: "تصدير تقرير الجدوى (PDF)",
    
    // Sidebar
    whySwitch: "لماذا التحويل إلى الغاز الطبيعي؟",
    benefit1: "تكاليف وقود أقل بنسبة 30-40%",
    benefit2: "انبعاثات CO₂ أقل بنسبة 40%",
    benefit3: "كفاءة طاقة أعلى",
    benefit4: "يدعم أهداف رؤية 2030",
    
    quickFacts: "حقائق سريعة",
    fact1: "متوسط الاسترداد: 18-36 شهراً",
    fact2: "وقت التحويل: 3-6 أشهر",
    fact3: "تكاليف الصيانة: أقل بنسبة 20%",
    fact4: "حوافز حكومية متاحة",
    
    // AI Assistant
    aiAssistant: "مساعد جيميني الذكي",
    poweredByAI: "مدعوم بواسطة Google AI",
    askAnything: "اسألني أي شيء...",
    
    // AI Responses
    aiWelcome: "مرحباً! أنا مساعدك الذكي المدعوم بجيميني. يمكنني مساعدتك في فهم عملية تحويل الغاز، وشرح النتائج، وإجراء سيناريوهات افتراضية. كيف يمكنني مساعدتك اليوم؟",
    aiSavings: "بناءً على أنماط التحويل النموذجية في المملكة العربية السعودية، تحقق المصانع التي تتحول من الديزل إلى الغاز الطبيعي توفيراً بنسبة 30-40% في تكاليف الوقود. يعتمد المبلغ الدقيق على حجم استهلاكك وأسعار الوقود الحالية. هل تريد مني مساعدتك في حساب توفيرك المحدد؟",
    aiPayback: "تتراوح فترات الاسترداد لتحويل الغاز عادةً من 18-36 شهراً اعتماداً على حجم استهلاكك. المنشآت ذات الاستهلاك الأعلى ترى استرداداً أسرع. متوسط تكلفة التحويل حوالي 500,000-2,000,000 ريال حسب حجم المنشأة.",
    aiEmission: "ينتج الغاز الطبيعي حوالي 40% أقل من انبعاثات CO₂ مقارنة بالديزل، ويقلل بشكل كبير من انبعاثات NOₓ والجسيمات. هذا يساعد في تحقيق أهداف رؤية 2030 البيئية وقد يؤهل منشأتك للحوافز الخضراء.",
    aiProcess: "تتضمن عملية التحويل عادةً: 1) تقييم البنية التحتية، 2) توصيل خط أنابيب الغاز أو إعداد التخزين، 3) تعديلات الشعلات/الغلايات، 4) تركيب أنظمة السلامة، 5) الاختبار والتشغيل. تستغرق العملية بأكملها 3-6 أشهر في المتوسط.",
    aiDefault: "يمكنني مساعدتك بمعلومات حول توفير التكاليف، الفوائد البيئية، فترات الاسترداد، عملية التحويل، أو إجراء سيناريوهات افتراضية. ماذا تريد أن تستكشف؟"
  }
};

const SwitchSmartApp = () => {
  const [language, setLanguage] = useState('en');
  const [activeTab, setActiveTab] = useState('calculator');
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [results, setResults] = useState(null);
  const [saveStatus, setSaveStatus] = useState({ type: '', message: '' });
  const [isSaving, setIsSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    industryType: 'cement',
    currentFuel: 'diesel',
    monthlyConsumption: '',
    currentFuelCost: '',
    operatingHours: '',
    location: '',
    conversionCost: ''
  });

  const t = translations[language];
  const isRTL = language === 'ar';

  // IMPORTANT: Replace this with your actual Google Apps Script URL
  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwnWKTRffWHdR85ESzn6D2ZjYm09FQaJhcoXRKQuZx1G0jhRTsYvwb6iD9TWRU8OKywbw/exec';

  useEffect(() => {
    setMessages([
      { role: 'assistant', content: t.aiWelcome }
    ]);
  }, [language, t.aiWelcome]);

  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language, isRTL]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ar' : 'en');
  };

  const industryTypes = [
    { value: 'cement', label: t.cement },
    { value: 'steel', label: t.steel },
    { value: 'chemicals', label: t.chemicals },
    { value: 'textiles', label: t.textiles },
    { value: 'food', label: t.food },
    { value: 'glass', label: t.glass }
  ];

  const fuelTypes = [
    { value: 'diesel', label: t.diesel },
    { value: 'heavy_oil', label: t.heavyOil },
    { value: 'lpg', label: t.lpg }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const formatNumber = (num) => {
    if (language === 'ar') {
      return num.toLocaleString('ar-SA');
    }
    return num.toLocaleString('en-US');
  };

  const calculateSavings = () => {
    const consumption = parseFloat(formData.monthlyConsumption);
    const currentCost = parseFloat(formData.currentFuelCost);
    const conversionCost = parseFloat(formData.conversionCost) || 500000;
    
    const gasPrice = currentCost * 0.65;
    const annualSavings = (currentCost - gasPrice) * consumption * 12;
    const paybackMonths = (conversionCost / (annualSavings / 12)).toFixed(1);
    const co2Reduction = consumption * 12 * 2.68 * 0.4;
    
    setResults({
      annualSavings: annualSavings.toFixed(0),
      monthlySavings: (annualSavings / 12).toFixed(0),
      co2Reduction: co2Reduction.toFixed(0),
      paybackMonths: paybackMonths,
      gasPrice: gasPrice.toFixed(2),
      currentCost: currentCost.toFixed(2),
      roi: ((annualSavings / conversionCost) * 100).toFixed(1),
      conversionCost: conversionCost
    });
    
    setActiveTab('results');
    setSaveStatus({ type: '', message: '' });
  };

  const saveToGoogleSheets = async () => {
    if (!results) return;
    
    setIsSaving(true);
    setSaveStatus({ type: '', message: '' });

    try {
      const dataToSave = {
        // Form Data
        industryType: formData.industryType,
        currentFuel: formData.currentFuel,
        monthlyConsumption: formData.monthlyConsumption,
        currentFuelCost: formData.currentFuelCost,
        operatingHours: formData.operatingHours,
        location: formData.location,
        conversionCost: formData.conversionCost || '500000',
        
        // Results
        annualSavings: results.annualSavings,
        monthlySavings: results.monthlySavings,
        co2Reduction: results.co2Reduction,
        paybackMonths: results.paybackMonths,
        roi: results.roi,
        gasPrice: results.gasPrice,
        
        // Metadata
        language: language,
        timestamp: new Date().toISOString()
      };

      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSave)
      });

      // With no-cors mode, we can't read the response, so we assume success
      setSaveStatus({ type: 'success', message: t.savedSuccessfully });
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSaveStatus({ type: '', message: '' });
      }, 3000);

    } catch (error) {
      console.error('Save error:', error);
      setSaveStatus({ type: 'error', message: t.saveFailed });
    } finally {
      setIsSaving(false);
    }
  };

  const sendMessage = () => {
    if (!inputMessage.trim()) return;
    
    setMessages(prev => [...prev, { role: 'user', content: inputMessage }]);
    
    setTimeout(() => {
      let response = '';
      const lowerInput = inputMessage.toLowerCase();
      
      if (lowerInput.includes('savings') || lowerInput.includes('save') || lowerInput.includes('توفير')) {
        response = t.aiSavings;
      } else if (lowerInput.includes('payback') || lowerInput.includes('roi') || lowerInput.includes('استرداد')) {
        response = t.aiPayback;
      } else if (lowerInput.includes('emission') || lowerInput.includes('co2') || lowerInput.includes('انبعاثات')) {
        response = t.aiEmission;
      } else if (lowerInput.includes('process') || lowerInput.includes('how') || lowerInput.includes('عملية') || lowerInput.includes('كيف')) {
        response = t.aiProcess;
      } else {
        response = t.aiDefault;
      }
      
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    }, 1000);
    
    setInputMessage('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50" style={{ fontFamily: isRTL ? 'Cairo, sans-serif' : 'system-ui, sans-serif' }}>
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className={`flex items-center space-x-3 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <div className="bg-gradient-to-br from-emerald-500 to-blue-600 p-2 rounded-lg">
                <Factory className="w-8 h-8 text-white" />
              </div>
              <div className={isRTL ? 'text-right' : ''}>
                <h1 className="text-2xl font-bold text-gray-900">{t.appName}</h1>
                <p className="text-sm text-gray-600">{t.tagline}</p>
              </div>
            </div>
            <div className={`flex items-center space-x-4 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <div className={`flex items-center space-x-2 text-sm text-gray-600 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <span className="hidden sm:inline">{t.poweredBy}</span>
                <span className="font-semibold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">Gemini & Vertex AI</span>
              </div>
              <button
                onClick={toggleLanguage}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-blue-600 text-white rounded-lg hover:from-emerald-600 hover:to-blue-700 transition-all shadow-sm"
              >
                <Globe className="w-4 h-4" />
                <span className="font-medium">{language === 'en' ? 'العربية' : 'English'}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex space-x-1 bg-white rounded-lg p-1 shadow-sm mb-6">
          <button
            onClick={() => setActiveTab('calculator')}
            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-md transition-all ${isRTL ? 'flex-row-reverse space-x-reverse' : ''} ${
              activeTab === 'calculator'
                ? 'bg-gradient-to-r from-emerald-500 to-blue-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Calculator className="w-5 h-5" />
            <span className="font-medium">{t.calculator}</span>
          </button>
          <button
            onClick={() => setActiveTab('results')}
            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-md transition-all ${isRTL ? 'flex-row-reverse space-x-reverse' : ''} ${
              activeTab === 'results'
                ? 'bg-gradient-to-r from-emerald-500 to-blue-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
            disabled={!results}
          >
            <TrendingDown className="w-5 h-5" />
            <span className="font-medium">{t.results}</span>
          </button>
        </div>

        <div className={`grid grid-cols-1 lg:grid-cols-3 gap-6 ${isRTL ? 'lg:grid-flow-col-dense' : ''}`}>
          <div className={`lg:col-span-2 ${isRTL ? 'lg:order-2' : ''}`}>
            {activeTab === 'calculator' && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className={`text-2xl font-bold text-gray-900 mb-6 ${isRTL ? 'text-right' : ''}`}>{t.formTitle}</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'text-right' : ''}`}>
                      {t.industryType}
                    </label>
                    <select
                      name="industryType"
                      value={formData.industryType}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${isRTL ? 'text-right' : ''}`}
                    >
                      {industryTypes.map(type => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'text-right' : ''}`}>
                      {t.currentFuel}
                    </label>
                    <select
                      name="currentFuel"
                      value={formData.currentFuel}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${isRTL ? 'text-right' : ''}`}
                    >
                      {fuelTypes.map(type => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'text-right' : ''}`}>
                      {t.monthlyConsumption}
                    </label>
                    <input
                      type="number"
                      name="monthlyConsumption"
                      value={formData.monthlyConsumption}
                      onChange={handleInputChange}
                      placeholder={t.placeholderConsumption}
                      className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${isRTL ? 'text-right' : ''}`}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'text-right' : ''}`}>
                      {t.currentFuelCost}
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      name="currentFuelCost"
                      value={formData.currentFuelCost}
                      onChange={handleInputChange}
                      placeholder={t.placeholderCost}
                      className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${isRTL ? 'text-right' : ''}`}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'text-right' : ''}`}>
                      {t.operatingHours}
                    </label>
                    <input
                      type="number"
                      name="operatingHours"
                      value={formData.operatingHours}
                      onChange={handleInputChange}
                      placeholder={t.placeholderHours}
                      className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${isRTL ? 'text-right' : ''}`}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'text-right' : ''}`}>
                      {t.location}
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder={t.placeholderLocation}
                      className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${isRTL ? 'text-right' : ''}`}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'text-right' : ''}`}>
                      {t.conversionCost}
                    </label>
                    <input
                      type="number"
                      name="conversionCost"
                      value={formData.conversionCost}
                      onChange={handleInputChange}
                      placeholder={t.placeholderConversion}
                      className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${isRTL ? 'text-right' : ''}`}
                    />
                    <p className={`mt-2 text-sm text-gray-500 ${isRTL ? 'text-right' : ''}`}>{t.leaveBlank}</p>
                  </div>
                                          {/* Calculate and Save to Database Button */}
                  <button
                    onClick={async () => {
                      calculateSavings();
                      await saveToGoogleSheets();
                   }}
                    disabled={
                      isSaving ||
                      !formData.monthlyConsumption ||
                      !formData.currentFuelCost
                    }
                  className={`w-full bg-gradient-to-r from-emerald-500 to-blue-600 text-white py-4 rounded-lg font-semibold hover:from-emerald-600 hover:to-blue-700 transition-all shadow-lg flex items-center justify-center space-x-2 ${
                  isRTL ? 'flex-row-reverse space-x-reverse' : ''
                  } ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
               >
              <Save className="w-5 h-5" />
             <span>{isSaving ? t.saving : t.calculateButton}</span>
             </button>
                </div>
              </div>
            )}

            {activeTab === 'results' && results && (
              <div className="space-y-6">
                {/* Save Status Message */}
                {saveStatus.message && (
                  <div
                    className={`p-4 rounded-lg border ${
                      saveStatus.type === 'success'
                        ? 'bg-green-50 border-green-200 text-green-800'
                        : 'bg-red-50 border-red-200 text-red-800'
                    } ${isRTL ? 'text-right' : ''}`}
                  >
                    <div className={`flex items-center space-x-2 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      {saveStatus.type === 'success' ? (
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
                    <div className={`flex items-center justify-between mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <DollarSign className="w-8 h-8" />
                      <span className={`text-emerald-100 text-sm ${isRTL ? 'text-left' : 'text-right'}`}>{t.annualSavings}</span>
                    </div>
                    <div className={`text-3xl font-bold ${isRTL ? 'text-right' : ''}`}>{formatNumber(parseInt(results.annualSavings))} {language === 'ar' ? 'ريال' : 'SAR'}</div>
                    <div className={`text-emerald-100 text-sm mt-1 ${isRTL ? 'text-right' : ''}`}>
                      {formatNumber(parseInt(results.monthlySavings))} {language === 'ar' ? 'ريال' : 'SAR'}/{t.monthlySavings}
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
                    <div className={`flex items-center justify-between mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <Clock className="w-8 h-8" />
                      <span className={`text-blue-100 text-sm ${isRTL ? 'text-left' : 'text-right'}`}>{t.paybackPeriod}</span>
                    </div>
                    <div className={`text-3xl font-bold ${isRTL ? 'text-right' : ''}`}>{formatNumber(parseFloat(results.paybackMonths))} {t.months}</div>
                    <div className={`text-blue-100 text-sm mt-1 ${isRTL ? 'text-right' : ''}`}>
                      {formatNumber(parseFloat((results.paybackMonths / 12).toFixed(1)))} {t.years}
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
                    <div className={`flex items-center justify-between mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <Leaf className="w-8 h-8" />
                      <span className={`text-green-100 text-sm ${isRTL ? 'text-left' : 'text-right'}`}>{t.co2Reduction}</span>
                    </div>
                    <div className={`text-3xl font-bold ${isRTL ? 'text-right' : ''}`}>{formatNumber(parseInt(results.co2Reduction))} {language === 'ar' ? 'كغ' : 'kg'}/{t.perYear}</div>
                    <div className={`text-green-100 text-sm mt-1 ${isRTL ? 'text-right' : ''}`}>
                      {formatNumber(parseFloat((results.co2Reduction / 1000).toFixed(1)))} {t.tons}
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
                    <div className={`flex items-center justify-between mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <TrendingDown className="w-8 h-8" />
                      <span className={`text-purple-100 text-sm ${isRTL ? 'text-left' : 'text-right'}`}>{t.roi}</span>
                    </div>
                    <div className={`text-3xl font-bold ${isRTL ? 'text-right' : ''}`}>{formatNumber(parseFloat(results.roi))}%</div>
                    <div className={`text-purple-100 text-sm mt-1 ${isRTL ? 'text-right' : ''}`}>
                      {t.annualReturn}
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className={`text-xl font-bold text-gray-900 mb-4 ${isRTL ? 'text-right' : ''}`}>{t.costComparison}</h3>
                  <div className="space-y-4">
                    <div className={`flex justify-between items-center p-4 bg-gray-50 rounded-lg ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span className="text-gray-700">{t.currentFuelCostLabel}</span>
                      <span className="font-semibold text-gray-900">{formatNumber(parseFloat(results.currentCost))} {language === 'ar' ? 'ريال' : 'SAR'}</span>
                    </div>
                    <div className={`flex justify-between items-center p-4 bg-emerald-50 rounded-lg ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span className="text-gray-700">{t.gasCostLabel}</span>
                      <span className="font-semibold text-emerald-700">{formatNumber(parseFloat(results.gasPrice))} {language === 'ar' ? 'ريال' : 'SAR'}</span>
                    </div>
                    <div className={`flex justify-between items-center p-4 bg-blue-50 rounded-lg ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span className="text-gray-700">{t.savingsPerUnit}</span>
                      <span className="font-semibold text-blue-700">{formatNumber(parseFloat((results.currentCost - results.gasPrice).toFixed(2)))} {language === 'ar' ? 'ريال' : 'SAR'}</span>
                    </div>
                  </div>
                </div>

                
                

                <button className="w-full bg-gradient-to-r from-gray-700 to-gray-800 text-white py-4 rounded-lg font-semibold hover:from-gray-800 hover:to-gray-900 transition-all shadow-lg">
                  📄 {t.exportReport}
                </button>
              </div>
            )}
          </div>

          <div className={`space-y-6 ${isRTL ? 'lg:order-1' : ''}`}>
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-6 text-white shadow-lg">
              <h3 className={`text-lg font-bold mb-3 ${isRTL ? 'text-right' : ''}`}>{t.whySwitch}</h3>
              <ul className={`space-y-2 text-sm ${isRTL ? 'text-right' : ''}`}>
                <li className={`flex items-start ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span className={isRTL ? 'ml-2' : 'mr-2'}>💰</span>
                  <span>{t.benefit1}</span>
                </li>
                <li className={`flex items-start ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span className={isRTL ? 'ml-2' : 'mr-2'}>🌱</span>
                  <span>{t.benefit2}</span>
                </li>
                <li className={`flex items-start ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span className={isRTL ? 'ml-2' : 'mr-2'}>⚡</span>
                  <span>{t.benefit3}</span>
                </li>
                <li className={`flex items-start ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span className={isRTL ? 'ml-2' : 'mr-2'}>🇸🇦</span>
                  <span>{t.benefit4}</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className={`text-lg font-bold text-gray-900 mb-3 ${isRTL ? 'text-right' : ''}`}>{t.quickFacts}</h3>
              <div className={`space-y-3 text-sm text-gray-600 ${isRTL ? 'text-right' : ''}`}>
                <p>✓ {t.fact1}</p>
                <p>✓ {t.fact2}</p>
                <p>✓ {t.fact3}</p>
                <p>✓ {t.fact4}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => setChatOpen(!chatOpen)}
        className={`fixed bottom-6 ${isRTL ? 'left-6' : 'right-6'} bg-gradient-to-r from-emerald-500 to-blue-600 text-white p-4 rounded-full shadow-2xl hover:shadow-xl transition-all z-50`}
      >
        {chatOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </button>

      {chatOpen && (
        <div className={`fixed bottom-24 ${isRTL ? 'left-6' : 'right-6'} w-96 bg-white rounded-xl shadow-2xl z-50 flex flex-col`} style={{ height: '500px' }}>
          <div className="bg-gradient-to-r from-emerald-500 to-blue-600 text-white p-4 rounded-t-xl">
            <div className={`flex items-center space-x-2 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <MessageSquare className="w-5 h-5" />
              <div className={isRTL ? 'text-right' : ''}>
                <h3 className="font-semibold">{t.aiAssistant}</h3>
                <p className="text-xs text-emerald-100">{t.poweredByAI}</p>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? (isRTL ? 'justify-start' : 'justify-end') : (isRTL ? 'justify-end' : 'justify-start')}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-emerald-500 to-blue-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  } ${isRTL ? 'text-right' : ''}`}
                >
                  <p className="text-sm">{msg.content}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t p-4">
            <div className={`flex space-x-2 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder={t.askAnything}
                className={`flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm ${isRTL ? 'text-right' : ''}`}
              />
              <button
                onClick={sendMessage}
                className="bg-gradient-to-r from-emerald-500 to-blue-600 text-white p-2 rounded-lg hover:from-emerald-600 hover:to-blue-700 transition-all"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SwitchSmartApp;