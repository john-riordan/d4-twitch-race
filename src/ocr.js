import Tesseract from 'tesseract.js';

export async function performOCR(imagePath, rectangle) {
  try {
    const start = Date.now();
    const result = await Tesseract.recognize(imagePath, 'eng', {
      rectangle,
    });
    console.log(`Duration: ${Date.now() - start}`, rectangle, result.data.text);
  } catch (error) {
    console.error(error);
  }
}
