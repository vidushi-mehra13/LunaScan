# LunaScan 
Lightweight Web Vulnerability Assessment Tool

LunaScan is a modular full-stack web application designed to perform automated security assessments on web applications. It focuses on lightweight scanning, security header analysis, and basic reflected XSS detection in a clean, modern interface.

---

##  Features

* 🔎 Automated URL crawling
* 🛡️ Security header analysis
* ⚠️ Basic reflected XSS detection
* 📜 Scan history tracking
* 🎨 Minimal dark UI with TailwindCSS
* ⚡ Fast and lightweight architecture

---

##  Tech Stack

### Frontend

* React (Vite / Next.js)
* TailwindCSS
* Minimal animations

### Backend

* Node.js (if applicable)
* Express / API Routes
* REST-based architecture

---

##  How It Works

1. User enters a target URL.
2. Application performs:

   * Header inspection
   * Basic crawling
   * XSS payload reflection tests
3. Results are categorized by severity.
4. Scan summary is displayed in a structured report format.

---

##  Project Structure

```
/src
  /components
  /pages or /app
  /utils
  /services
/public
package.json
tailwind.config.js
```

---

##  Disclaimer

This tool is intended **strictly for educational and authorized security testing purposes only**.
Do not scan websites without proper permission.

---

##  Future Improvements

* Advanced XSS payload detection
* SQL Injection checks
* Authentication vulnerability testing
* Rate limiting detection
* Report export (PDF)

---

##  Author

Vidushi Mehra(LunaTech)
Cybersecurity & Full Stack Developer

---

## 📄 License

MIT License
