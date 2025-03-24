import { useRef, useState } from "react";
import FourCuts from "./components/FourCuts";
import FeedbackButton from "./components/FeedbackButton";
import { downloadImage } from "./functions/downloadImage";
import {
	PageContainer,
	Wrapper,
	stickers,
	colors,
} from "./styles/styledComponents";
import { ColorButton, ButtonWrap, CaptureButton } from "./styles/button";

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
				<div style={{ display: "flex", marginTop: "16px" }}>
					{colors.map((color: string) => (
						<ColorButton
							key={color}
							buttonColor={color}
							onClick={() => handleColorSelect(color)}
							isSelected={color === selectedColor}
						/>
					))}
				</div>
				<ButtonWrap>
					{stickers.map((sticker: string, index: number) => (
						<button key={sticker} onClick={() => setSelectedSticker(sticker)}>
							{selectedSticker === sticker
								? "✘"
								: index === 0
								? "0"
								: index === 1
								? "1"
								: index === 2
								? "2"
								: "3"}
						</button>
					))}
				</ButtonWrap>
				<div ref={fourCutsRef}>
					<FourCuts backgroundColor={selectedColor} sticker={selectedSticker} />
				</div>
				<div style={{ marginTop: "16px" }}>
					<CaptureButton onClick={handleDownload}>사진 저장 📷</CaptureButton>
					<FeedbackButton />
				</div>
			</Wrapper>
		</PageContainer>
	);
}

export default App;
