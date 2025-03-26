import { useRef, useState } from "react";
import Feedback from "./components/Feedback";
import FourCuts from "./components/FourCuts";
import { downloadImage } from "./functions/downloadImage";
import { PageContainer, Wrapper, stickers, colors } from "./styles/fourcuts";
import { SelectButton, SelectButtonWrap, CaptureButton } from "./styles/button";

function App() {
	const fourCutsRef = useRef<HTMLDivElement | null>(null);
	const [selectedColor, setSelectedColor] = useState<string>(colors[0]);
	const [selectedSticker, setSelectedSticker] = useState<string>(stickers[0]);

	const handleColorSelect = (color: string) => {
		setSelectedColor(color);
	};

	const handleDownload = () => {
		downloadImage(fourCutsRef.current);
	};

	return (
		<PageContainer>
			<Wrapper>
				<SelectButtonWrap>
					{colors.map((color: string) => (
						<SelectButton
							key={color}
							buttonColor={color}
							onClick={() => handleColorSelect(color)}
						>
							{selectedColor === color ? "✘" : ""}
						</SelectButton>
					))}
				</SelectButtonWrap>
				<SelectButtonWrap>
					{stickers.map((sticker: string, index: number) => (
						<SelectButton
							key={sticker}
							onClick={() => setSelectedSticker(sticker)}
						>
							{selectedSticker === sticker ? "✘" : index}
						</SelectButton>
					))}
				</SelectButtonWrap>
				<div ref={fourCutsRef}>
					<FourCuts backgroundColor={selectedColor} sticker={selectedSticker} />
				</div>
				<div style={{ marginTop: "16px" }}>
					<CaptureButton onClick={handleDownload}>사진 저장 📷</CaptureButton>
					<Feedback />
				</div>
			</Wrapper>
		</PageContainer>
	);
}

export default App;
