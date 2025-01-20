
import React, { useRef, useEffect, useCallback, forwardRef } from 'react';
import { useImageHandling } from '../hooks/useImageHandling';
import * as Style from '../styles/styledComponents';

interface PhotoGridContainerProps {
  backgroundColor?: string | ((props: any) => string);
  sticker?: string | ((props: any) => string);
}

interface ImageData {
  src: string;
  position: {
    x: number;
    y: number;
  };
  width?: number;
  height?: number;
}



const FourCuts = forwardRef<HTMLDivElement, PhotoGridContainerProps>(({ backgroundColor, sticker, ...props }, ref) => {
  const {
    images,
    setImages,
    currentImageIndex,
    setCurrentImageIndex,
    isDragging,
    setIsDragging,
    startPosition,
    setStartPosition,
    handleFileChange,
    handleDelete
  } = useImageHandling();

  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
  const imageBoxRef = useRef<HTMLImageElement>(null);

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
  }, [images, setIsDragging, setCurrentImageIndex, setStartPosition]);

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
          const minY = -1 * (clientHeight - boxHeight) / 2;
          const maxY = (clientHeight - boxHeight) / 2;
          newX = currentImage.position.x || 0;
          newY = Math.max(minY, Math.min(maxY, e.clientY - startPosition.y));
        } else {
          const minX = -1 * (clientWidth - boxWidth) / 2;
          const maxX = (clientWidth - boxWidth) / 2;
          newX = Math.max(minX, Math.min(maxX, e.clientX - startPosition.x));
          newY = currentImage.position.y || 0;
        }
      }
    }

    setImages((prev:ImageData[]) => {
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
  }, [setIsDragging]);

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
    <Style.PhotoGridContainer ref={ref} backgroundColor={backgroundColor} {...props}>
      <Style.StickerBackground sticker={sticker as string} />
      {images.map((image:ImageData, index:number) => (
        <Style.PhotoBox key={index}>
          {!image.src ? (
            <>
              <Style.Placeholder>+</Style.Placeholder>
              <Style.FileInput
                type="file"
                accept="image/*"
                onClick={() => setCurrentImageIndex(index)}
                onChange={handleFileChange}
              />
            </>
          ) : (
            <Style.ImageWrapper ref={imageBoxRef}>
              <Style.CloseButton onClick={() => handleDelete(index)}>
                X
              </Style.CloseButton>
              <Style.StyledImage
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
            </Style.ImageWrapper>
          )}
        </Style.PhotoBox>
      ))}
    </Style.PhotoGridContainer>
  );
});

export default FourCuts;