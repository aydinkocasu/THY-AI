# THY-AI

## [LIVE DEMO][https://thy-ai.vercel.app/]

A web application that allows users to upload a Image file, and extract text from the Image using **Tesseract.js** for OCR, and **OpenAI** for enhanced text processing.

## Architecture

The application uses **React** for the frontend, **Tesseract.js** for OCR (text extraction from images). It integrates **OpenAI**'s API to process extracted text, adding functionality such as text summarization, translation, etc.

### Major Components:
1. **FileUpload Component**: Handles file upload and triggers the PDF-to-image conversion and text extraction.
2. **Tesseract.js**: OCR tool for extracting text from images, particularly useful for scanned PDFs.
3. **OpenAI Integration**: Uses the OpenAI API to process the extracted text for advanced capabilities (summarization, analysis, etc.).
4. **Chakra UI**: Used for modern, responsive UI components like buttons, inputs, and loading spinners.
---

## Setup Instructions

### Prerequisites

Before you start, make sure you have the following tools installed:

- **Node.js**: Version 16.x or later
- **npm**: For managing dependencies

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/pdf-to-image-text-converter.git
cd pdf-to-image-text-converter
```

### 2. Install Dependencies
Run the following command to install the required dependencies:

```bash
npm install
```

### 3. Add Environment Variables
Create a .env file in the root directory of the project and add the following environment variables:

OpenAI API Key: You will need an API key from OpenAI to use their models for text processing.
Tesseract Worker: If you're using a local worker for Tesseract.js, provide the path here.
Example .env file:

```env
OPENAI_API_KEY=your-openai-api-key-here
```

### 4. Run the Application
After installing the dependencies and adding the environment variables, start the app locally with:

```bash
npm start
```
This will start the development server, and you can access the app in your browser at http://localhost:3000.



