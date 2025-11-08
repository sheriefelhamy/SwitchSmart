# SwitchSmart

A bilingual (English/Arabic) fuel conversion calculator that helps industrial facilities evaluate the financial and environmental benefits of switching from traditional fuels to natural gas.

> 🌍 **Built for the Intelligent Planet Hackathon 2025**  
> *Innovate with Google AI to build sustainable, intelligent solutions for our planet* - [Devpost](https://devpost.com)

## Features

- **Bilingual Support**: Full English and Arabic language support with RTL layout for Arabic
- **Fuel Conversion Calculator**: Calculate savings, ROI, and payback periods for fuel switching
- **Environmental Impact**: Calculate CO2 emission reductions
- **AI-Powered Chat Assistant**: Get instant answers about fuel conversion using Google's Gemini AI
- **Data Persistence**: Save calculations to Google Sheets for record-keeping
- **PDF Export**: Generate professional reports of your calculations
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Technologies Used

- **React 19.2.0**: Modern UI framework
- **Tailwind CSS**: Utility-first styling
- **Google Gemini AI**: AI-powered chat assistant
- **Lucide React**: Beautiful icons
- **html2canvas & jsPDF**: PDF generation
- **Google Apps Script**: Backend data storage

## Prerequisites

Before you begin, ensure you have:

- Node.js (v14 or higher)
- npm or yarn package manager
- Google Gemini API key
- Google Apps Script web app URL (for data saving)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd switchsmart
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   REACT_APP_GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Update Google Sheets integration**
   
   In `App.js`, update the `GOOGLE_SCRIPT_URL` with your Google Apps Script web app URL:
   ```javascript
   const GOOGLE_SCRIPT_URL = "your_google_script_url_here";
   ```

## Running the Application

### Development Mode
```bash
npm start
```
The app will open at [http://localhost:3000](http://localhost:3000)

### Production Build
```bash
npm run build
```
Creates an optimized production build in the `build` folder.

### Testing
```bash
npm test
```

## Project Structure

```
switchsmart/
├── public/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── TabNavigation.jsx
│   │   ├── CalculatorForm.jsx
│   │   ├── ResultsPanel.jsx
│   │   ├── Sidebar.jsx
│   │   ├── ChatButton.jsx
│   │   └── ChatWindow.jsx
│   ├── data/
│   │   └── translations.js
│   ├── App.js
│   └── index.js
├── package.json
├── tailwind.config.js
└── README.md
```

## Usage Guide

### Calculator

1. Select your industry type (Cement, Steel, Chemicals, etc.)
2. Choose your plant size (Small, Medium, Large)
3. Enter current fuel type and consumption details
4. Input current fuel costs and operating hours
5. Specify location and conversion costs
6. Click "Calculate Savings" to see results

### Results Panel

View comprehensive analysis including:
- Annual and monthly savings
- CO2 emission reductions
- Payback period
- Return on Investment (ROI)
- Cost comparison charts

### AI Chat Assistant

Click the chat button to ask questions about:
- Fuel conversion benefits
- Technical considerations
- Environmental impact
- Financial calculations

## Calculation Methodology

### Savings Calculation
```javascript
Gas Price = Current Fuel Cost × 0.63
Annual Savings = (Current Cost - Gas Price × 1.1) × Monthly Consumption × 12
Monthly Savings = Annual Savings ÷ 12
```

### Payback Period
```javascript
Payback Months = Conversion Cost ÷ Monthly Savings
```

### CO2 Reduction
```javascript
CO2 Reduction = (Current Fuel Emissions - Gas Emissions) × Annual Consumption
Current Fuel: 75 kg CO2 per unit
Natural Gas: 53 kg CO2 per unit (including 10% efficiency factor)
```

### ROI
```javascript
ROI = (Annual Savings ÷ Conversion Cost) × 100
```

## Input Validation

- Monthly Consumption: 0 - 100,000,000 units
- Operating Hours: 0 - 24 hours per day
- Current Fuel Cost: 0 - 10,000 currency units

## Google Sheets Integration

The application saves calculation results to Google Sheets including:
- User input data
- Calculated results
- Timestamp and language preference

### Setting Up Google Sheets Backend

1. Create a new Google Sheet
2. Create a Google Apps Script with a `doPost` function
3. Deploy as web app with "Anyone" access
4. Copy the web app URL to your `.env` file

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `REACT_APP_GEMINI_API_KEY` | Google Gemini API key for AI chat | Yes |

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Known Issues

- PDF generation may have layout issues in some browsers
- Google Sheets save uses `no-cors` mode which limits error handling

## Future Enhancements

- [ ] Multi-currency support
- [ ] Historical data tracking and trends
- [ ] Comparison of multiple fuel types
- [ ] Advanced ROI scenarios
- [ ] Email report generation
- [ ] User authentication and saved profiles

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues, questions, or contributions, please open an issue on the GitHub repository.

## Acknowledgments

- Built for the **Intelligent Planet Hackathon 2025** on Devpost
- Google Gemini AI for chat functionality and sustainable innovation
- Tailwind CSS for styling framework
- Lucide for icon library
- React team for the amazing framework

## Hackathon Focus

This project addresses the hackathon's sustainability goals by:
- **Reducing Carbon Emissions**: Helping industries transition to cleaner natural gas fuel
- **AI-Powered Decision Making**: Using Google Gemini AI to educate and assist users
- **Economic Sustainability**: Demonstrating cost savings alongside environmental benefits
- **Accessibility**: Bilingual support makes sustainable solutions accessible to Arabic-speaking regions
- **Data-Driven Impact**: Quantifying both financial and environmental benefits of fuel switching

---

**Version**: 0.1.0  
**Last Updated**: November 2025