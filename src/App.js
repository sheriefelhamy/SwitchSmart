// src/App.jsx
import React, { useState, useEffect } from "react";
import { translations } from "./data/translations";
import Header from "./components/Header";
import TabNavigation from "./components/TabNavigation";
import CalculatorForm from "./components/CalculatorForm";
import ResultsPanel from "./components/ResultsPanel";
import Sidebar from "./components/Sidebar";
import ChatButton from "./components/ChatButton";
import ChatWindow from "./components/ChatWindow";

const App = () => {
  const [language, setLanguage] = useState("en");
  const [activeTab, setActiveTab] = useState("calculator");
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [results, setResults] = useState(null);
  const [saveStatus, setSaveStatus] = useState({ type: "", message: "" });
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    industryType: "cement",
    plantsize: "small",
    currentFuel: "diesel",
    monthlyConsumption: "",
    currentFuelCost: "",
    operatingHours: "",
    location: "",
    conversionCost: "",
  });

  const t = translations[language];
  const isRTL = language === "ar";

  //const [errors, setErrors] = useState({});

 
  const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbz6y3D5PW15Cciyu1UMcAA7xriCGrzDSA4U5YefWua9Wy5CQSc3RLBDToqY5RmET2bdPQ/exec";

  // Initialize chat messages
  useEffect(() => {
    setMessages([{ role: "assistant", content: t.aiWelcome }]);
  }, [language, t.aiWelcome]);

  // Set document direction and language
  useEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = language;
  }, [language, isRTL]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "ar" : "en"));
  };


   //setErrors(prev => ({
      //...prev,
      //monthlyConsumption: "Enter valid consumption",
    //})
 // );
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;  
  if (name === "monthlyConsumption" && value < 0 || value > 1000000) 
  {
    console.log("enter valid input");
    return;
  } 
   if(name === "operatingHours" && value > 24 || value < 0)
  {
    console.log("enter valid input");
    return; 
  }
  else if(name === "currentFuelCost" && (value < 0 || value > 10000))
  {
    console.log("enter valid input");
    return;
  }

  // clear error when valid input
 // setErrors(prev => ({
   // ...prev,
    //monthlyConsumption: "",
  //}))
    else
    {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const formatNumber = (num) => {
    return language === "ar"
      ? num.toLocaleString("ar-SA")
      : num.toLocaleString("en-US");
  };

  const calculateSavings = () => {
    const consumption = parseFloat(formData.monthlyConsumption);
    const currentCost = parseFloat(formData.currentFuelCost);
    const conversionCost = parseFloat(formData.conversionCost) || 500000;

    const gasPrice = currentCost * 0.63;
    const annualSavings = ((currentCost )- (gasPrice * 1.1))* consumption* 12 ;
    const paybackMonths = (conversionCost / (annualSavings / 12)).toFixed(1);
    const co2Reduction = (consumption * 12 * 75)-(consumption*1.1*12*53);

    setResults({
      annualSavings: annualSavings.toFixed(0),
      monthlySavings: (annualSavings / 12).toFixed(0),
      co2Reduction: co2Reduction.toFixed(0),
      paybackMonths: paybackMonths,
      gasPrice: gasPrice.toFixed(2),
      currentCost: currentCost.toFixed(2),
      roi: ((annualSavings / conversionCost) * 100).toFixed(1),
      conversionCost: conversionCost,
    });

    setActiveTab("results");
    setSaveStatus({ type: "", message: "" });
  };

  const saveToGoogleSheets = async () => {
    if (!results) return;

    setIsSaving(true);
    setSaveStatus({ type: "", message: "" });

    try {
      const dataToSave = {
        name: formData.name,
        industryType: formData.industryType,
        plantsize: formData.plantsize,
        currentFuel: formData.currentFuel,
        monthlyConsumption: formData.monthlyConsumption,
        currentFuelCost: formData.currentFuelCost,
        operatingHours: formData.operatingHours,
        location: formData.location,
        conversionCost: formData.conversionCost || "500000",
        annualSavings: results.annualSavings,
        monthlySavings: results.monthlySavings,
        co2Reduction: results.co2Reduction,
        paybackMonths: results.paybackMonths,
        roi: results.roi,
        gasPrice: results.gasPrice,
        language: language,
        timestamp: new Date().toISOString(),
      };

      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSave),
      });

      setSaveStatus({ type: "success", message: t.savedSuccessfully });
      setTimeout(() => setSaveStatus({ type: "", message: "" }), 3000);
    } catch (error) {
      console.error("Save error:", error);
      setSaveStatus({ type: "error", message: t.saveFailed });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSubmit = async () => {
    calculateSavings();
    await saveToGoogleSheets();
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    setMessages((prev) => [...prev, { role: "user", content: inputMessage }]);

    setTimeout(() => {
      let response = "";
      const lowerInput = inputMessage.toLowerCase();

      if (
        lowerInput.includes("savings") ||
        lowerInput.includes("save") ||
        lowerInput.includes("توفير")
      ) {
        response = t.aiSavings;
      } else if (
        lowerInput.includes("payback") ||
        lowerInput.includes("roi") ||
        lowerInput.includes("استرداد")
      ) {
        response = t.aiPayback;
      } else if (
        lowerInput.includes("emission") ||
        lowerInput.includes("co2") ||
        lowerInput.includes("انبعاثات")
      ) {
        response = t.aiEmission;
      } else if (
        lowerInput.includes("process") ||
        lowerInput.includes("how") ||
        lowerInput.includes("عملية") ||
        lowerInput.includes("كيف")
      ) {
        response = t.aiProcess;
      } else {
        response = t.aiDefault;
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: response },
      ]);
    }, 1000);

    setInputMessage("");
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50"
      style={{
        fontFamily: isRTL ? "Cairo, sans-serif" : "system-ui, sans-serif",
      }}
    >
      <Header
        language={language}
        isRTL={isRTL}
        t={t}
        onLanguageToggle={toggleLanguage}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <TabNavigation
          activeTab={activeTab}
          onTabChange={setActiveTab}
          t={t}
          isRTL={isRTL}
          hasResults={!!results}
        />

        <div
          className={`grid grid-cols-1 lg:grid-cols-3 gap-6 ${
            isRTL ? "lg:grid-flow-col-dense" : ""
          }`}
        >
          <div className={`lg:col-span-2 ${isRTL ? "lg:order-2" : ""}`}>
            {activeTab === "calculator" && (
              <CalculatorForm
                formData={formData}
                onInputChange={handleInputChange}
                onSubmit={handleSubmit}
                t={t}
                isRTL={isRTL}
                isSaving={isSaving}
              />
            )}

            {activeTab === "results" && results && (
              <ResultsPanel
                results={results}
                t={t}
                isRTL={isRTL}
                language={language}
                formatNumber={formatNumber}
                saveStatus={saveStatus}
              />
            )}
          </div>

          <Sidebar t={t} isRTL={isRTL} />
        </div>
      </div>

      <ChatButton
        chatOpen={chatOpen}
        onToggle={() => setChatOpen(!chatOpen)}
        isRTL={isRTL}
      />

      {chatOpen && (
        <ChatWindow
          messages={messages}
          inputMessage={inputMessage}
          onInputChange={setInputMessage}
          onSendMessage={handleSendMessage}
          t={t}
          isRTL={isRTL}
        />
      )}
    </div>
  );
};

export default App;
