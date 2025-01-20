import './App.css';
import { useRef, useState } from 'react';
import FourCuts from './components/FourCuts';
import FeedbackButton from './components/FeedbackButton';
import { useBrowserDetect } from './hooks/useBrowserDetect';
import { UseCapture } from './hooks/useCapture';
import * as Style from './styles/styledComponents';

function App() {
  const browserName = useBrowserDetect();
  const FourCutsRef = useRef<HTMLDivElement>(null);
  const [selectedColor, setSelectedColor] = useState<string>(Style.colors[0]);
  const [selectedSticker, setSelectedSticker] = useState<string>(Style.stickers[0]);

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };

  const handleCapture = () => {
    UseCapture(FourCutsRef.current);
  };

  return (
    <Style.PageContainer>
      <p>브라우저이름 {browserName}</p>
      <Style.Wrapper>
        <div style={{ display: 'flex', marginTop: '16px' }}>
          {Style.colors.map((color:string) => (
            <Style.ColorButton
              key={color}
              buttonColor={color}
              onClick={() => handleColorSelect(color)}
              isSelected={color === selectedColor}
            />
          ))}
        </div>
        <Style.ButtonWrap>
          {Style.stickers.map((sticker:string, index:number) => (
            <button
              key={sticker}
              onClick={() => setSelectedSticker(sticker)}
            >
              {selectedSticker === sticker ? '✘' : index === 0 ? '0' : index === 1 ? '1' : index === 2 ? '2' : '3'}
            </button>
          ))}
        </Style.ButtonWrap>
        <FourCuts 
          ref={FourCutsRef} 
          backgroundColor={selectedColor} 
          sticker={selectedSticker} 
        />
        <div style={{ marginTop: '16px' }}>
          <Style.CaptureButton onClick={handleCapture}>
            사진 저장 📷
          </Style.CaptureButton>
          <FeedbackButton />
        </div>
      </Style.Wrapper>
    </Style.PageContainer>
  );
}

export default App;