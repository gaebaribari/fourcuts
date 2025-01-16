import React, { useState, useRef, useEffect, useCallback, forwardRef } from 'react';
import styled from 'styled-components';
import imageCompression from 'browser-image-compression';
import bg1 from '../images/bg1.png';
import bg2 from '../images/bg2.png';
import bg3 from '../images/bg3.png';


const PhotoGridContainer = styled.div<{ backgroundColor?: string | ((props: any) => string); }>`
  display: grid;
  position:relative;  
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 10px;
  width: 350px;
  height: 350px;
  margin-top:10px;
  padding: 80px;
  background-color: ${props => props.backgroundColor};
`;

const StickerBackground = styled.div<{ sticker?: string }>` 
  background-image: url(${props => {
    switch (props.sticker) {
      case 'bg1':
        return bg1;
      case 'bg2':
        return bg2;
      case 'bg3':
        return bg3;
      default:
        return '';
    }
  }});
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: ${props => {
    switch (props.sticker) {
      case '':
        return 0;
      default:
        return 1;
    }
  }};
  width: 510px;
  height: 510px;
`;

const PhotoBox = styled.div<{ image?: string }>`
  background-color: ${props => props.image ? 'transparent' : '#f0f0f0'};
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
  cursor: ${props => props.image ? 'move' : 'pointer'};
`;

const FileInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  
`;

const CloseButton = styled.button`
  z-index:1;
  position:absolute;
  border: none;
  background: none;
  cursor: pointer;
  top: 4%;
  right: 2%;
`;

const StyledImage = styled.img<{
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
const Placeholder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 24px;
  color: #888;
`;


interface ImageData {
  src: string;
  position: {
    x: number;
    y: number;
  };
  width?: number;
  height?: number;
}


interface PhotoGridContainerProps {
  backgroundColor?: string | ((props: any) => string);
  sticker?: string | ((props: any) => string);
}


const FourCuts = forwardRef<HTMLDivElement, PhotoGridContainerProps>(({ backgroundColor, sticker, ...props }, ref) => {
  const [images, setImages] = useState<(ImageData & { width?: number, height?: number })[]>(
    new Array(4).fill({
      src: '',
      position: { x: 0, y: 0 },
      width: 0,
      height: 0
    })
  );
  const [currentImageIndex, setCurrentImageIndex] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });

  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
  const imageBoxRef = useRef<HTMLImageElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && currentImageIndex !== null) {
      const fileName = file.name.toLowerCase();
      const fileExtension = fileName.split('.').pop();

      try {
        let processedFile = file;

        // HEIC 파일인 경우 변환
        if (fileExtension === 'heic' || fileExtension === 'heif') {
          processedFile = await imageCompression(file, {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
            fileType: 'image/jpeg'
          });
        }

        const reader = new FileReader();
        reader.onloadend = () => {
          const img = new Image();
          img.onload = () => {
            setImages(prev => {
              const newImages = [...prev];
              newImages[currentImageIndex] = {
                src: reader.result as string,
                position: { x: 0, y: 0 },
                width: img.width,
                height: img.height
              };
              return newImages;
            });
          };
          img.src = reader.result as string;
          console.log(images);

        };
        reader.readAsDataURL(processedFile);

      } catch (error) {
        console.error('이미지 변환 오류:', error);
        alert('이미지 파일을 처리하는 중 오류가 발생했습니다.');
      }
    }
  };

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    const index = Number(e.currentTarget.getAttribute('data-index'));
    setCurrentImageIndex(index);
    const image = images[index];

    setStartPosition({
      x: e.clientX - (image.position.x || 0),
      y: e.clientY - (image.position.y || 0)
    });
  }, [images]);

  const handleDelete = (index:number) => {
    setImages(prev => {
      const newImages = [...prev];
      newImages[index] = {
        src: '',
        position: { x: 0, y: 0 },
        width: 0,
        height: 0,
      };
      return newImages;
    });
  }


  const handleMouseMove = useCallback((e: MouseEvent) => {

    if (!isDragging) return;


    let newX = 0;
    let newY = 0;



    if (currentImageIndex !== null && currentImageIndex !== undefined) {
      const currentImage = images[currentImageIndex];
      const currentImageRef = imageRefs.current[currentImageIndex];

      if (currentImageRef) {
        const { clientHeight, clientWidth } = currentImageRef;
        const { clientHeight: boxHeight = clientHeight, clientWidth: boxWidth = clientWidth } = imageBoxRef.current || {};

        if (clientWidth < clientHeight) {
          const minY = -1 * (clientHeight - boxHeight) / 2
          const maxY = (clientHeight - boxHeight) / 2

          newX = currentImage.position.x || 0;
          newY = Math.max(minY, Math.min(maxY, e.clientY - startPosition.y));

        } else {
          const minX = -1 * (clientWidth - boxWidth) / 2
          const maxX = (clientWidth - boxWidth) / 2

          newX = Math.max(minX, Math.min(maxX, e.clientX - startPosition.x));
          newY = currentImage.position.y || 0;
        }
      }
    }

    setImages(prev => {
      const newImages = [...prev];
      if (currentImageIndex != null && newImages[currentImageIndex]) {
        newImages[currentImageIndex] = {
          ...newImages[currentImageIndex],
          position: { x: newX, y: newY }
        };
      }
      return newImages;
    });
  }, [isDragging, startPosition, currentImageIndex, setImages, images]);
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);


  return (
    <PhotoGridContainer
      ref={ref}
      backgroundColor={backgroundColor}
      {...props}>
      <StickerBackground sticker={sticker as string} />
      {images.map((image, index) => (
        <PhotoBox
          key={index}
        >

          {!image.src ? (
            <>
              <Placeholder>+</Placeholder>
              <FileInput
                type="file"
                accept="image/*"
                onClick={() => setCurrentImageIndex(index)}
                onChange={handleFileChange}
              />
            </>
          ) : (

            <ImageWrapper ref={imageBoxRef}>
              <CloseButton onClick={()=>handleDelete(index)}>
                X
              </CloseButton>
              <StyledImage
                src={image.src}
                ref={(el) => {
                  imageRefs.current[index] = el;
                }}
                alt=""
                onMouseDown={handleMouseDown}
                data-index={index}
                positionX={image.position.x}
                positionY={image.position.y}
                imageWidth={image.width}
                imageHeight={image.height}
              />
            </ImageWrapper>
          )}
        </PhotoBox>
      ))}
    </PhotoGridContainer>
  );
});

export default FourCuts;