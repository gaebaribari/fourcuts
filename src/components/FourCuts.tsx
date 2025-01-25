
import React, { useRef, forwardRef, useState } from 'react';
import { useImageHandling } from '../hooks/useImageHandling';
import * as Style from '../styles/styledComponents';
import * as Button from '../styles/button';

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
  const [currentImageIndex, setCurrentImageIndex] = useState<number | null>(null);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
  const imageBoxRef = useRef<HTMLImageElement>(null);
  const {
    images,
    imageUpload,
    imageRemove,
    startImageMove,
  } = useImageHandling({ currentImageIndex, imageRefs, imageBoxRef });


  return (
    <Style.PhotoGridContainer ref={ref} backgroundColor={backgroundColor} {...props}>
      <Style.StickerBackground sticker={sticker as string} />
      {images.map((image: ImageData, index: number) => (
        <Style.PhotoBox key={index}>
          {!image.src ? (
            <>
              <Style.Placeholder>+</Style.Placeholder>
              <Style.FileInput
                type="file"
                accept="image/*"
                onClick={() => setCurrentImageIndex(index)}
                onChange={imageUpload}
              />
            </>
          ) : (
            <Style.ImageWrapper ref={imageBoxRef}>
              <Button.CloseButton onClick={() => imageRemove(index)}>
                X
              </Button.CloseButton>
              <Style.StyledImage
                src={image.src}
                ref={(el) => {
                  imageRefs.current[index] = el;
                  console.log('imageRefs', imageRefs)
                }}
                alt=""
                onMouseDown={startImageMove}
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
