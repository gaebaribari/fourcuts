import './App.css';
import { useRef, useState, useEffect } from 'react';
import FourCuts from './components/FourCuts';
import html2canvas from 'html2canvas';
import saveAs from "file-saver";
import styled from 'styled-components';
import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';


const ColorButton = styled.button<{
  buttonColor: string;
  isSelected?: boolean
}>` 
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin: 4px;
  background-color: ${props => props.buttonColor};
  border: ${props => props.isSelected ? '4px solid white' : 'none'};
  box-shadow: ${props => props.isSelected
    ? '0 0 0 2px rgba(0,0,0,0.3)'
    : 'none'
  };
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const colors = [
  '#890000',
  '#000b4d',
  '#1a3b00',
  '#401a00'
];


function App() {


  const FourCutsRef = useRef<HTMLDivElement>(null);

  const [selectedColor, setSelectedColor] = useState<string>(colors[0]);
  const [selectedSticker, setSelectedSticker] = useState<string>('');

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };

  const handleCapture = async () => {
    if (!FourCutsRef.current) return;

     // 플랫폼 감지 함수
     const detectPlatform = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
      return isMobile ? 'mobile' : 'web';
    };


    try {
      const div = FourCutsRef.current;
      const canvas = await html2canvas(div, { scale: 2 });
      canvas.toBlob(async (blob) => {
        if (blob !== null) {
          saveAs(blob, "result.png");
          try {
            const printRef = collection(db, 'photo_prints');
            await addDoc(printRef, {
              themeColor: selectedColor,
              themeSticker: selectedSticker,
              platform: detectPlatform(),
            });

          } catch (firebaseError) {
            console.error("Firebase logging error:", firebaseError);
          }
        }
      });
    } catch (error) {
      console.error("Error converting div to image:", error);
    }
  };


  return (
    <div>
      <FourCuts ref={FourCutsRef} backgroundColor={selectedColor} sticker={selectedSticker}/>
      <div style={{ display: 'flex', marginTop: '16px' }}>
        {colors.map((color) => (
          <ColorButton
            key={color}
            buttonColor={color}
            onClick={() => handleColorSelect(color)}
            isSelected={color === selectedColor}
          />
        ))}
      </div>
      <div style={{ display: 'flex', marginTop: '16px' }}>
          <button onClick={()=> setSelectedSticker('bg1')}>1</button>
          <button onClick={()=> setSelectedSticker('bg2')}>2</button>
          <button onClick={()=> setSelectedSticker('bg3')}>3</button>
      </div>
      <button onClick={handleCapture}>캡쳐하기</button>
    </div>

  );
}

export default App;