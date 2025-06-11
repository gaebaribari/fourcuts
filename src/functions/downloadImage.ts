import html2canvas from "html2canvas";
// import saveAs from "file-saver";

export const downloadImage = async (element: HTMLDivElement | null) => {
	if (!element) return;
	try {
		const canvas = await html2canvas(element, { scale: 2 });
		canvas.toBlob((blob) => {
			if (blob !== null) {
				const link = document.createElement("a");
				link.href = URL.createObjectURL(blob);
				// link.download = "result.png";
				link.setAttribute("download", "result.png");
				document.body.appendChild(link);

				link.click();
				document.body.removeChild(link);
				URL.revokeObjectURL(link.href);
			}
		});
	} catch (error) {
		console.error("Error converting div to image:", error);
	}
};
