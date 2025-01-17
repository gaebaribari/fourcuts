import { useState } from 'react';
import imageCompression from 'browser-image-compression';

interface ImageData {
  src: string;
  position: {
    x: number;
    y: number;
  };
  width?: number;
  height?: number;
}


export const useImageHandling = () => {
  const [images, setImages] = useState<ImageData[]>(
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

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && currentImageIndex !== null) {
      const fileName = file.name.toLowerCase();
      const fileExtension = fileName.split('.').pop();

      try {
        let processedFile = file;
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
        };
        reader.readAsDataURL(processedFile);
      } catch (error) {
        console.error('이미지 변환 오류:', error);
        alert('이미지 파일을 처리하는 중 오류가 발생했습니다.');
      }
    }
  };

  const handleDelete = (index: number) => {
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

  return {
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
  };
};
