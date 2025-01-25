import html2canvas from 'html2canvas';
import saveAs from 'file-saver';

export const UseCapture = async (element: HTMLDivElement | null) => {
  if (!element) return;
  try {
    const canvas = await html2canvas(element, { scale: 2 });
    canvas.toBlob((blob) => {
      if (blob !== null) {
        saveAs(blob, "result.png");
      }
    });
  } catch (error) {
    console.error("Error converting div to image:", error);
  }
};