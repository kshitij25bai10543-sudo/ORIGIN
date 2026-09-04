# ORIGIN
# 🌳 FRA Monitor — AI-Powered Forest Rights Monitoring System

> **AI + GIS based decision-support system for monitoring Forest Rights Act (FRA) implementation across districts.**

## 📌 Overview

FRA Monitor is a web-based application designed to help officials understand and monitor the implementation of the **Forest Rights Act (FRA)**.

FRA-related information such as claims, approvals, rejections, pending applications, and land records can be difficult to analyze when the data is spread across different sources.

FRA Monitor brings this information together into a **single interactive map and dashboard** and uses AI-assisted analysis to highlight potential anomalies.

---

## 🎯 Problem Statement

Monitoring FRA implementation across states and districts can be difficult because:

* Claim information can be fragmented across records.
* Officials may have difficulty identifying long-pending claims.
* Land information may contain inconsistencies.
* Unusual rejection or approval patterns can be difficult to identify.
* There is no simple visual interface for quickly understanding district-wise progress.

FRA Monitor aims to make this information easier to understand and investigate.

---

## 💡 Our Solution

The system provides three main capabilities:

### 🗺️ 1. Interactive GIS Map

An interactive map displays FRA-related information district-wise.

Districts can be visually categorized based on their status:

* 🟢 **Normal**
* 🟡 **Needs Attention**
* 🔴 **Critical**

Officials can click on a district to view its detailed statistics.

### 🤖 2. AI-Powered Anomaly Detection

The system analyzes mock FRA claim data and identifies potentially unusual cases such as:

* Long-pending claims
* Land-area mismatches
* Missing records
* Duplicate claims
* Unusually high rejection rates
* Inconsistent information

The system does **not automatically declare an anomaly as fraud or wrongdoing**. It flags the case for human review.

### 📊 3. Decision-Support Dashboard

The dashboard provides an easy-to-understand summary of:

* Total claims
* Approved claims
* Pending claims
* Rejected claims
* Processing time
* District-wise performance
* Detected anomalies
* State-wise progress

---

## 🔄 How It Works

```text
                    FRA MONITOR
                         │
                         ↓
                 Mock FRA Dataset
                         │
              ┌──────────┴──────────┐
              ↓                     ↓
        District Data           Claim Data
              │                     │
              └──────────┬──────────┘
                         ↓
                  Anomaly Engine
                         │
              ┌──────────┼──────────┐
              ↓          ↓          ↓
           Delays     Mismatch    Patterns
              │          │          │
              └──────────┼──────────┘
                         ↓
                    AI Analysis
                         │
                         ↓
              Plain-English Summary
                         │
              ┌──────────┴──────────┐
              ↓                     ↓
          GIS Map              Dashboard
```

---

## 🧪 Example

Suppose a district has:

```text
Total Claims:        1,000
Approved:              700
Pending:               200
Rejected:              100
```

The system detects:

```text
⚠️ 37 claims pending for more than 180 days

⚠️ 12 claims have land-area mismatches

⚠️ Rejection rate is unusually high
```

The AI generates a simple summary:

> "The district has processed most of its FRA claims, but several cases require attention. A number of claims have remained pending for an extended period, while some records contain land-area discrepancies. Officials may want to prioritize these cases for review."

---

## 🛡️ Human-in-the-Loop Approach

FRA Monitor is designed as a **decision-support tool**, not an automated decision-maker.

AI-generated anomalies are treated as **alerts for officials to investigate**.

The system avoids making unsupported claims such as:

> ❌ "This claim is fraudulent."

Instead, it reports:

> ⚠️ "The available records contain a discrepancy that requires review."

This helps reduce the risk of incorrect conclusions from incomplete data.

---

## 🗂️ Data

This hackathon prototype uses **mock data**.

No private or confidential government data is required.

Possible data sources for realistic geographic structures include:

* **Bhuvan** — Indian geospatial data platform
* **data.gov.in** — Government of India's open-data platform
* Public geographic boundary datasets

For the prototype, claim data can be self-generated and stored as CSV/JSON, while district boundaries can be stored as GeoJSON.

---

## 📁 Project Structure

```text
fra-monitor/
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── backend/
│   ├── server.js
│   ├── anomalyEngine.js
│   └── data/
│       ├── claims.csv
│       └── districts.geojson
│
├── .env
├── package.json
└── README.md
```

---

## 🛠️ Technology Stack

### Frontend

* HTML
* CSS
* JavaScript
* Leaflet.js

### Backend

* Node.js
* Express.js

### Data

* CSV
* JSON
* GeoJSON

### AI

* Groq / Gemini API

### Mapping

* Leaflet.js
* OpenStreetMap

---

## ⚙️ Core Anomaly Rules

The prototype can use simple rules before involving the AI.

### Delayed Claim

```text
processing_days > 180
```

### Land Mismatch

```text
claimed_area != recorded_area
```

or:

```text
difference > 10%
```

### High Rejection Rate

```text
rejected_claims / total_claims > threshold
```

### Missing Data

```text
Claim exists
+
Land record unavailable
```

### Duplicate Claim

```text
Same location + similar claimant details + multiple claim IDs
```

The detected anomalies are then passed to the AI to generate a human-readable explanation.

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd fra-monitor
```

### 2. Install dependencies

```bash
npm install
```

### 3. Add your AI API key

Create a `.env` file:

```env
GEMINI_API_KEY=your_api_key_here
```

or:

```env
GROQ_API_KEY=your_api_key_here
```

### 4. Start the backend

```bash
node backend/server.js
```

### 5. Open the frontend

Open:

```text
frontend/index.html
```

in your browser.

---

## 🎬 Demo Flow

For the hackathon demonstration:

### Step 1

Open the FRA Monitor dashboard.

### Step 2

Select a state.

### Step 3

Select a district from the map.

### Step 4

View claim statistics.

### Step 5

Show detected anomalies.

### Step 6

Click an anomaly to see the AI-generated explanation.

### Step 7

Demonstrate a deliberately inconsistent record to show how the system handles uncertainty.

---

## 🌟 Key Features

* 🗺️ Interactive district-level GIS map
* 📊 State and district statistics
* 🤖 AI-generated anomaly explanations
* ⚠️ Delayed claim detection
* 📍 Land-record mismatch detection
* 🔍 Claim-level investigation
* 📈 State-wise progress monitoring
* 🛡️ Human-in-the-loop decision support
* 📱 Simple and accessible web interface

---

## 🔮 Future Improvements

The prototype can later be extended with:

* Real government datasets
* More detailed GIS layers
* Satellite imagery integration
* Role-based access for officials
* Historical trend analysis
* Automated reports
* Advanced statistical anomaly detection
* Mobile-friendly interface
* District comparison
* Notification system for critical cases

---

## ⚠️ Disclaimer

This project is a **hackathon prototype** using mock/synthetic data.

It is intended to demonstrate how GIS, structured data analysis, and AI can support FRA monitoring.

AI-generated insights should be reviewed by authorized officials before any administrative action is taken.

---

## 👥 Team

**Team Name:** *Your Team Name*

**Project:** FRA Monitor

**Category:** AI + Development

**Problem Statement:** PS-7 — AI-powered Decision Support System for Forest Rights Act (FRA) Monitoring

---

## ❤️ Built For

**Hackathon 2026**

> *Making complex FRA data easier to visualize, investigate, and understand.*

