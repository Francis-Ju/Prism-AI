
# Project Introduction

## 1. Project Overview
**Novartis Prism AI** is a Generative Design Intelligence Agent tailored for the pharmaceutical industry. It transforms conversational inputs and medical documents into high-fidelity, responsive HTML artifacts (landing pages, detail aids, newsletters, etc.) that strictly adhere to Novartis brand guidelines and medical compliance standards.

## 2. User Stories
- **As a Brand Manager**, I want to quickly generate visual concepts for a new campaign so that I can brief my agency more effectively.
- **As a Medical Liaison**, I need to create compliant educational materials for HCPs that visualize complex clinical data.
- **As a Sales Rep**, I want to customize a digital detail aid for a specific hospital system's formulary status.
- **As a Patient Engagement Lead**, I need to produce empathetic, easy-to-understand patient journey maps and symptom trackers.
- **As a Content Editor**, I need to tweak generated designs (colors, text) and easily undo mistakes without losing progress.

## 3. Problem Solved
Traditional content creation in pharma is slow, expensive, and often lacks visual consistency at the concept stage. 
- **Time-to-Market**: Reduces concept phase from weeks to minutes.
- **Compliance**: Enforces disclaimer usage, brand colors, and accessible layouts automatically.
- **Design Skill Gap**: Allows non-designers to produce professional-grade visual artifacts.

## 4. Product Value
- **Efficiency**: Instant visualization of medical concepts.
- **Consistency**: "Novartis Design System" baked into the generation model.
- **Flexibility**: Supports diverse formats (Posters, Dashboards, Mobile Apps).
- **Adaptability**: Works seamlessly on both local dev environments and cloud platforms via intelligent storage abstraction.

## 5. SPI (Situation, Pain, Impact)
- **Situation**: Pharma teams need to communicate complex scientific data to various audiences (HCPs, Patients, Payers).
- **Pain**: Creating these materials requires expensive agency hours, long feedback loops, and strict compliance checks that often kill creativity.
- **Impact**: Prism AI democratizes high-quality design, ensuring every idea can be visualized instantly with brand compliance, accelerating internal alignment and external communication.

## 6. Template Library (New)
The system now includes a comprehensive **Template Library** with categorized, high-fidelity starting points:
- **Clinical Efficacy**: Monographs, Comparative Data, Safety Profiles.
- **Education**: MOA Visuals, Dosing Guides, Guidelines.
- **Patient Centric**: Journey Maps, Symptom Trackers, Financial Support.
- **Sales Tools**: Digital Detailers, Objection Handlers, Formulary Maps.
- **Corporate**: Launch PR, Executive Dashboards.

## 7. Platform Integration
- **Storage**: Automatically detects and uses platform persistent storage when deployed, falling back to local storage for development.
- **Proxy**: Seamlessly handles LLM API calls via platform proxy when required, ensuring security and keyless operation for end-users.
