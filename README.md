# 🎭 QAPlay

> Inspect, Analyse, Mock, Record, Generate

QAPlay is a powerful desktop application for QA engineers and developers to capture network traffic, create API mocks, check page performance analytics, record browser sessions, and generate Playwright test scripts — all from an intuitive, modern interface.

![QAPlay](./src/assets/logo.png)

---

## ✨ Features

### 🌐 Network Traffic Capture
- **Real-time monitoring** of all HTTP requests and responses
- Support for **Chromium**, **Firefox**, and **Safari (WebKit)** browsers
- **Filter by origin** to focus on specific domains
- View complete request/response details including headers, body, and timing
- **Status-based color coding** for quick identification (2xx, 3xx, 4xx, 5xx)

### 🎭 API Mocking
- **Create mocks** directly from captured network requests
- Configure custom **status codes**, **response bodies**, and **headers**
- Add **response delays** to simulate network latency
- **Toggle mocks on/off** without deleting them
- **Import/Export** mocks as JSON for team sharing
- Mocks are applied in real-time during browser sessions

### 📹 Session Recording
- **Automatic recording** of all user interactions (clicks, inputs, navigation)
- Generate **Playwright test scripts** from recorded sessions
- Scripts follow **Page Object Model (POM)** structure
- **Edit scripts** in the built-in editor before saving
- **Run tests** directly from the app with HTML report generation
- **Code snippets library** for common assertions and actions

### 📊 Performance Analytics
- **Lighthouse audits** powered by Google Lighthouse
- Measure **Performance**, **Accessibility**, **Best Practices**, **SEO**, and **PWA** scores
- **Auto-analytics mode** audits all visited pages during a session
- View detailed **HTML reports** for each audit
- Color-coded scores for quick assessment

### ❌ Error Tracking
- Dedicated **Errors tab** filters requests with 4xx/5xx status codes
- Quick identification of failing API calls
- Create mocks directly from error responses for testing error handling

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18.x or higher
- **npm** 9.x or higher

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd interceptqai

# Install dependencies
npm install

# Install Playwright browsers (required for browser automation)
npx playwright install
```

### Running the Application

```bash
# Development mode
npm start

# Build for production
npm run build
```

---

## 📖 Usage Guide

### 1. Launching a Browser Session

1. **Select a browser** from the dropdown (Chromium, Firefox, or WebKit)
2. **Enter the URL** you want to test
3. *(Optional)* Add **Allowed Origins** (comma-separated) to filter captured traffic
4. *(Optional)* Enable **Auto Performance Analytics** for automatic Lighthouse audits
5. Click **🚀 Launch & Record**

The browser opens with built-in network capture and session recording active.

### 2. Monitoring Network Traffic

While the browser is running:
- All network requests appear in the **Network** tab in real-time
- Click any request row to expand **detailed view** showing:
  - Request/Response headers
  - Request/Response body (parsed JSON when applicable)
  - Timing information
  - Status codes and content types

### 3. Creating API Mocks

**From a captured request:**
1. Click on any request in the Network table
2. Click **🎭 Create Mock** button
3. Edit the mock configuration:
   - **URL Pattern**: The URL to intercept (supports exact match or patterns)
   - **Method**: HTTP method (GET, POST, PUT, DELETE, PATCH)
   - **Status Code**: Response status to return
   - **Response Body**: JSON or other response content
   - **Headers**: Custom response headers
   - **Delay**: Milliseconds to wait before responding
4. Click **Save Mock**

**Creating a new mock manually:**
1. Go to the **Mocks** tab
2. Click **➕ Create Mock**
3. Fill in the mock configuration
4. Click **Save Mock**

**Managing mocks:**
- **Toggle switch** enables/disables individual mocks
- **Edit** button modifies mock configuration
- **Delete** button removes the mock
- **Import/Export** buttons for sharing mock configurations

### 4. Recording and Generating Scripts

Recording starts automatically when you launch a browser. As you interact:
- Clicks, form inputs, and navigation are captured
- Page transitions and form submissions are recorded

**After stopping the browser:**
1. The **Recording** tab opens automatically with the generated Playwright script
2. Review and **edit the script** as needed
3. **Save** the script with a custom name
4. **Run** the script to execute it as a Playwright test
5. View the **HTML report** showing test results

**Script Management:**
- **Saved Scripts** panel shows all your scripts
- Select multiple scripts and **Run Selected** for batch execution
- **Import** existing Playwright scripts
- **Delete** scripts you no longer need

**Code Snippets:**
Insert common Playwright actions:
- Assertions (visibility, text content, enabled state)
- Actions (clicks, fills, navigation)
- Waiting and timeouts

### 5. Running Performance Analytics

**Automatic (during session):**
1. Enable **Auto Performance Analytics** before launching
2. Browse normally — each page visit is queued for audit
3. When you stop the browser, audits run in the background
4. Results appear progressively in the **Analytics** tab

**Manual audit:**
1. Go to the **Analytics** tab
2. Enter a URL or click 🔄 to use the current browser URL
3. Click **Run Audit**
4. View scores for Performance, Accessibility, Best Practices, SEO, and PWA
5. Click **View Report** for the full Lighthouse HTML report

---

## 📁 Project Structure

```
interceptqai/
├── main.js                 # Electron main process
├── src/
│   ├── App.jsx             # Main React application
│   ├── components/         # React components
│   │   ├── AnalyticsTab.jsx
│   │   ├── BrowserLauncher.jsx
│   │   ├── ErrorsTab.jsx
│   │   ├── MockEditor.jsx
│   │   ├── MocksTab.jsx
│   │   ├── NetworkTable.jsx
│   │   ├── RequestDetails.jsx
│   │   └── ScriptTab.jsx
│   ├── services/           # Backend services
│   │   ├── MockManager.js      # Mock storage & management
│   │   ├── NetworkCapture.js   # Playwright browser control
│   │   ├── ScriptManager.js    # Script storage & execution
│   │   └── recorder.js         # Action recording logic
│   ├── styles/
│   │   └── App.css         # Application styles
│   └── assets/
│       └── logo.png        # Application logo
├── public/
│   └── index.html          # HTML template
├── build/                  # Webpack output
└── dist/                   # Electron Builder output
```

---

## ⚙️ Build & Distribution

### Build for macOS
```bash
npm run build:mac
```
Creates a `.dmg` installer in the `dist/` folder.

### Build for Windows
```bash
npm run build:win
```
Creates an NSIS installer in the `dist/` folder.

### Build for All Platforms
```bash
npm run build:all
```

---

## 🛠️ Technology Stack

| Component | Technology |
|-----------|------------|
| Desktop Framework | Electron 27 |
| UI Framework | React 18 |
| Browser Automation | Playwright 1.40 |
| Performance Audits | Lighthouse 11 |
| Build Tool | Webpack 5 |
| Package Manager | npm |

---

## 📝 Data Storage

QAPlay stores data in the application support directory:

| Data | Location |
|------|----------|
| Mocks | `~/Library/Application Support/qaplay/mocks.json` |
| Scripts | `~/Library/Application Support/qaplay/scripts/` |
| Reports | `~/Library/Application Support/qaplay/reports/` |

---

## ⌨️ Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Copy script to clipboard | Click "📋 Copy" in Recording tab |
| Toggle DevTools | `Cmd+Option+I` (macOS) / `Ctrl+Shift+I` (Windows) |

---

## 🐛 Troubleshooting

### Browser won't launch
- Ensure Playwright browsers are installed: `npx playwright install`
- Check if another instance is already running

### Mocks not working
- Verify the mock is enabled (toggle switch is ON)
- Check the URL pattern matches the request exactly
- Ensure the HTTP method matches

### Script execution fails
- Verify all selectors in the script are correct
- Check that the target website hasn't changed
- Review the HTML report for detailed error messages

### Analytics audit fails
- Ensure the URL is accessible
- Check your internet connection
- Some sites may block automated audits

---

## 📄 License

MIT License - See [LICENSE](./LICENSE) for details.

---

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines before submitting pull requests.

---

**Made with ❤️ for QA Engineers and Developers**
