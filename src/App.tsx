import "./App.css";
import { useRef, useState } from "react";
import FourCuts from "./components/FourCuts";
import FeedbackButton from "./components/FeedbackButton";
import { downloadImage } from "./functions/downloadImage";
import * as Style from "./styles/styledComponents";
import * as Button from "./styles/button";

function App() {
	const fourCutsRef = useRef<HTMLDivElement | null>(null);
	const [selectedColor, setSelectedColor] = useState<string>(Style.colors[0]);
	const [selectedSticker, setSelectedSticker] = useState<string>(
		Style.stickers[0]
	);

	const handleColorSelect = (color: string) => {
		setSelectedColor(color);
	};

	const handleDownload = () => {
		downloadImage(fourCutsRef.current);
	};

	return (
		<Style.PageContainer>
			<Style.Wrapper>
				<div style={{ display: "flex", marginTop: "16px" }}>
					{Style.colors.map((color: string) => (
						<Button.ColorButton
							key={color}
							buttonColor={color}
							onClick={() => handleColorSelect(color)}
							isSelected={color === selectedColor}
						/>
					))}
				</div>
				<Button.ButtonWrap>
					{Style.stickers.map((sticker: string, index: number) => (
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
				</Button.ButtonWrap>
				<div ref={fourCutsRef}>
					<FourCuts backgroundColor={selectedColor} sticker={selectedSticker} />
				</div>
				<div style={{ marginTop: "16px" }}>
					<Button.CaptureButton onClick={handleDownload}>
						사진 저장 📷
					</Button.CaptureButton>
					<FeedbackButton />
				</div>
			</Style.Wrapper>
		</Style.PageContainer>
	);
}

export default App;
