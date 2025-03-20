import html2canvas from "html2canvas";

export const downloadImage = async (element: HTMLDivElement | null) => {
	if (!element) return;
	try {
		const canvas = await html2canvas(element, { scale: 2 });
		const dataURL = canvas.toDataURL();

		const link = document.createElement("a");
		link.setAttribute("href", dataURL);
		link.setAttribute("download", "네컷사진");
		link.style.display = "none";
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	} catch (error) {
		console.error("Error converting div to image:", error);
	}
};
