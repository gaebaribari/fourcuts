
import styled from 'styled-components';
import bg1 from '../images/bg1.png';
import bg2 from '../images/bg2.png';
import bg3 from '../images/bg3.png';
import backgroundImage from '../images/homepage2.jpg';

export const PhotoGridContainer = styled.div<{ backgroundColor?: string | ((props: any) => string); }>`
  display: grid;
  position: relative;  
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 10px;
  width: 350px;
  height: 350px;
  margin-top: 10px;
  padding: 80px;
  background-color: ${props => props.backgroundColor};
`;

export const StickerBackground = styled.div<{ sticker?: string }>` 
  background-image: url(${props => {
    switch (props.sticker) {
      case 'bg1': return bg1;
      case 'bg2': return bg2;
      case 'bg3': return bg3;
      default: return '';
    }
  }});
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: ${props => props.sticker ? 1 : 0};
  width: 510px;
  height: 510px;
`;

export const PhotoBox = styled.div<{ image?: string }>`
  background-color: ${props => props.image ? 'transparent' : '#f0f0f0'};
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
  cursor: ${props => props.image ? 'move' : 'pointer'};
`;

export const FileInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
`;

export const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CloseButton = styled.button`
  z-index: 1;
  position: absolute;
  border: none;
  background: none;
  cursor: pointer;
  top: 4%;
  right: 2%;
`;

export const StyledImage = styled.img<{
  positionX: number;
  positionY: number;
  imageWidth?: number;
  imageHeight?: number;
}>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(
    calc(-50% + ${props => props.positionX}px), 
    calc(-50% + ${props => props.positionY}px)
  );
  ${props => {
    const width = props.imageWidth || 0;
    const height = props.imageHeight || 0;

    if (width < height) {
      return `
        width: 100%;
        height: auto;
        max-width: 100%;
      `;
    } else {
      return `
        width: auto;
        height: 100%;
        max-height: 100%;
      `;
    }
  }}
  cursor: move;
  object-fit: cover;
`;

export const Placeholder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 24px;
  color: #888;
`;

export const PageContainer = styled.div`
  width: 100%;
  min-height: 110vh;
  background-image:  url(${backgroundImage});
  background-size: cover;
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column
`;

export const Button = styled.button`
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

export const CaptureButton = styled(Button)`
  background-color: #1a3b00;
  border: none;
  color: #e9ecef;
`;


export const ButtonWrap = styled.div`
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

export const ColorButton = styled.button<{
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

export const colors = [
  '#890000',
  '#000b4d',
  '#1a3b00',
  '#401a00'
];

export const stickers = [
  '',
  'bg1',
  'bg2',
  'bg3',
]
