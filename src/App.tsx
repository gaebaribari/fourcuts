import './App.css';
import { useEffect, useRef, useState } from 'react';
import FourCuts from './components/FourCuts';
import html2canvas from 'html2canvas';
import saveAs from "file-saver";
import styled from 'styled-components';
import FeedbackButton from './components/FeedbackButton';
import backgroundImage from './images/homepage2.jpg';
const { detect } = require('detect-browser');
const browser = detect();



const PageContainer = styled.div`
  width: 100%;
  min-height: 110vh;
  background-image:  url(${backgroundImage});
  background-size: cover;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column
`;

const Button = styled.button`
  border-radius: 4px;
  display:block;
  width: 300px;
height:50px;

  border-radius: 16px;
  cursor: pointer;
  font-size: 1rem;
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const CaptureButton = styled(Button)`
  background-color: #1a3b00;
  border: none;
  color: #e9ecef;
`;


const ButtonWrap = styled.div`
  display: flex;
   marginTop: 10px;


   & >button {
    border:none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin: 4px;
   font-size: 20px;
    font-weight: bold;
   }
`;

const ColorButton = styled.button<{
  buttonColor: string;
  isSelected?: boolean;
}>`
border:none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin: 4px;
  background-color: ${props => props.buttonColor};
  
  cursor: pointer;
  transition: transform 0.2s ease;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: scale(1.1);
  }

&::after {
    content: '✘'; // 일반 체크마크
    display: ${props => props.isSelected ? 'block' : 'none'};
    color: rgba(255, 255, 255, 0.9);
    font-size: 20px;
    font-weight: bold;
}
`;

const colors = [
  '#890000',
  '#000b4d',
  '#1a3b00',
  '#401a00'
];

const stickers = [
  '',
  'bg1',
  'bg2',
  'bg3',
]



function App() {
  const [ownbrowser, setBrowser] = useState<string>('');

  useEffect(() => {

    if (browser) {
      setBrowser(browser.name);
    }
    
  }, [ownbrowser]);

  const FourCutsRef = useRef<HTMLDivElement>(null);

  const [selectedColor, setSelectedColor] = useState<string>(colors[0]);
  const [selectedSticker, setSelectedSticker] = useState<string>(stickers[0]);

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };

  const handleCapture = async () => {
    if (!FourCutsRef.current) return;
    try {
      const div = FourCutsRef.current;
      const canvas = await html2canvas(div, { scale: 2 });
      canvas.toBlob(async (blob) => {
        if (blob !== null) {
          saveAs(blob, "result.png");
        }
      });
    } catch (error) {
      console.error("Error converting div to image:", error);
    }
  };


  return (
    <PageContainer>
    <p>브라우저이름 {ownbrowser}</p>
      <Wrapper>
      <div style={{ display: 'flex', marginTop: '16px' }}>
          {colors.map((color) => (
            <ColorButton
              key={color}
              buttonColor={color}
              onClick={() => handleColorSelect(color)}
              isSelected={color === selectedColor}>
            </ColorButton>
          ))}
        </div>
        <ButtonWrap>
          {stickers.map((sticker, index) => (
            <button
              key={sticker}
              onClick={() => setSelectedSticker(sticker)}
            >
              {selectedSticker === sticker ? '✘' : index === 0 ? '0' : index === 1 ? '1' : index === 2 ? '2' : '3'}
            </button>
          ))}
        </ButtonWrap>
        <FourCuts ref={FourCutsRef} backgroundColor={selectedColor} sticker={selectedSticker} />
        
      
        <div style={{ marginTop: '16px' }}>
          <CaptureButton onClick={handleCapture}>사진 저장 📷</CaptureButton>
          <FeedbackButton />
        </div>
      </Wrapper>
    </PageContainer>


  );
}

export default App;