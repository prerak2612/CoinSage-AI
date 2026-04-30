# CoinSage AI

## Multi-Agent Crypto Research and Decision System

---

## Overview

CoinSage AI is a multi-agent system designed to simulate real-time crypto analysis and decision-making.

Most AI tools return answers without showing how they were derived. In finance-related use cases, this lack of transparency can be risky. This project focuses on making the reasoning process visible and structured.

---

## What it does

When a user submits a query, the system runs a step-by-step workflow:

1. Fetches market-related data  
2. Analyzes news and sentiment signals  
3. Calls internal tools for price and trend evaluation  
4. Processes signals through a reasoning layer  
5. Generates a final recommendation with confidence  

Each stage is executed sequentially and exposed in the UI.

---

## Key Features

- Multi-agent workflow with clear separation of responsibilities  
- Tool-calling system (`getCryptoPrice`, `getMarketTrend`)  
- Real-time execution view of agent steps  
- Tool call logs for transparency  
- Structured recommendation output (trend, risk, confidence)  
- Typewriter-style final response  
- Confidence score with visual indicator  

---

## Example

**Input:**  
“What is the current outlook for Bitcoin and Ethereum?”

**System flow:**
- Market data is evaluated  
- News sentiment is analyzed  
- Tools are called for price and trend  
- Signals are combined  

**Output:**  
A structured recommendation such as:  
“Bullish trend with moderate risk” along with a confidence score.

---

## Tech Stack

- React.js  
- Tailwind CSS  
- JavaScript (custom agent pipeline)  

---

## UI Highlights

- Step-by-step agent workflow visualization  
- Live execution status and tool logs  
- Typewriter-based recommendation output  
- Confidence score with progress bar  
- Clean, minimal, SaaS-style design  

---

