import { useState, useEffect, useCallback } from 'react';

interface ImageData {
  src: string;
  position: {
    x: number;
    y: number;
  };
  width?: number;
  height?: number;
}

interface Props {
  currentImageIndex: number | null;
  imageRefs: React.RefObject<(HTMLImageElement | null)[]>;
  imageBoxRef: React.RefObject<HTMLDivElement | null>;
}

export const useHandleImage = ({ currentImageIndex, imageRefs, imageBoxRef }: Props) => {
  const [images, setImages] = useState<ImageData[]>(
    new Array(4).fill({
      src: '',
      position: { x: 0, y: 0 },
      width: 0,
      height: 0
    })
  );

  const imageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && currentImageIndex !== null) {
      try {
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
        };
        reader.readAsDataURL(file);
      } catch (error) {
        console.error('이미지 변환 오류:', error);
        alert('이미지 파일을 처리하는 중 오류가 발생했습니다.');
      }
    }
  };

  const imageRemove = (index: number) => {
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
  };

  //
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });

  const startImageMove = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    const index = Number(e.currentTarget.getAttribute('data-index'));
    const image = images[index];

    setStartPosition({
      x: e.clientX - (image.position.x || 0),
      y: e.clientY - (image.position.y || 0)
    });
  }, [images, setIsDragging, setStartPosition]);

  const moveImage = useCallback((e: MouseEvent) => {

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
  }, [isDragging, startPosition, currentImageIndex, images]);

  const stopImageMove = useCallback(() => {
    setIsDragging(false);
  }, [setIsDragging]);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', moveImage);
      document.addEventListener('mouseup', stopImageMove);

      return () => {
        document.removeEventListener('mousemove', moveImage);
        document.removeEventListener('mouseup', stopImageMove);
      };
    }
  }, [isDragging, moveImage, stopImageMove]);

  return {
    images,
    imageUpload,
    imageRemove,
    startImageMove,
  };
};
