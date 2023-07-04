import Tesseract, { createWorker } from 'tesseract.js';
import Jimp from 'jimp';

export async function performOCR(imagePath, rectangle) {
  try {
    const start = Date.now();

    const image = await Jimp.read(imagePath);
    image.contrast(0.5);

    const worker = await createWorker();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    const result = await worker.recognize(imagePath, {
      rectangle,
    });

    console.log(`Duration: ${Date.now() - start}`, result.data);

    await worker.terminate();
  } catch (error) {
    console.error(error);
  }
}
