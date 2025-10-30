
const fs = require("fs");
const mammoth = require('mammoth');

const extractTextFromPDF = async (filePath) => {
  const pdfjsLib = await import("pdfjs-dist/legacy/build/pdf.mjs");
  const data = new Uint8Array(fs.readFileSync(filePath));
  const pdf = await pdfjsLib.getDocument({ data }).promise;

  let fullText = '';
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items.map(item => item.str).join(' ');
    fullText += pageText + '\n';
  }

  return fullText;
};



const extractTextFromDOCX = async (filePath) => {
  const result = await mammoth.extractRawText({ path: filePath });
  return result.value;
}


module.exports = {
  extractTextFromPDF,
  extractTextFromDOCX
};