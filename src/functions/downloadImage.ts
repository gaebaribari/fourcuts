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
				console.log(link.href, "이게 Null이어서 안된거아니야?"); //왜 모바일에선 안된거냐며
				link.download = "result.png";
				link.setAttribute("target", "_blank");

				link.click();
				URL.revokeObjectURL(link.href);
			}
		});
	} catch (error) {
		console.error("Error converting div to image:", error);
	}
};
