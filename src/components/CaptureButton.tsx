import html2canvas from 'html2canvas';
import styled from 'styled-components';
import saveAs from "file-saver";

interface CaptureButtonData {
    targetId:string,
}


// const CaptureButton = styled.button`
//   background-color: #4CAF50;
//   color: white;
//   border: none;
//   padding: 10px 20px;
//   border-radius: 5px;
//   cursor: pointer;
//   font-size: 16px;
//   transition: background-color 0.3s ease;

//   &:hover {
//     background-color: #45a049;
//   }

//   &:active {
//     background-color: #3d8b40;
//   }

//   ${props => props.disabled && `
//     background-color: #cccccc;
//     cursor: not-allowed;
//   `}
// `;

const CaptureContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px;
`;

const CapturedImage = styled.img`
  max-width: 300px;
  max-height: 300px;
  border: 2px solid #4CAF50;
  border-radius: 5px;
`;

// 스타일컴포넌트로 다시 하기 
const CaptureButton = ({ targetId }:CaptureButtonData) => {
  const handleCapture = async () => {
    try {
      const targetElement = document.getElementById(targetId);
      
      if (!targetElement) {
        alert('캡처할 대상을 찾을 수 없습니다.');
        return;
      }

      const canvas = await html2canvas(targetElement, {
        useCORS: true,
        scale: 2,
        logging: false,
        allowTaint: true
      });

      const image = canvas.toDataURL('image/png');

      const link = document.createElement('a');
      link.href = image;
      link.download = `capture_${new Date().toISOString().slice(0,10)}.png`;
      link.click();
    } catch (error) {
      console.error('캡처 중 오류:', error);
      alert('캡처에 실패했습니다.');
    }
  };

  return (
    <CaptureContainer>
      {/* <CaptureButton onClick={handleCapture}> */}
        {/* 📸 캡처하기 */}
      {/* </CaptureButton> */}
      
    </CaptureContainer>
  );
};

export default CaptureButton;

