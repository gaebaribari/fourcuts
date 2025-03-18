import { useState, useEffect, useCallback } from "react";

interface ImageData {
	src: string;
	position: {
		x: number;
		y: number;
	};
	height: number;
	width: number;
}

interface Props {
	currentImageIndex: number;
	boxSize: number;
}
export const useHandleImage = ({ currentImageIndex, boxSize }: Props) => {
	const [images, setImages] = useState<ImageData[]>(
		new Array(4).fill({
			src: "",
			position: { x: 0, y: 0 },
			width: 0,
			height: 0,
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
						let imageHeight: number;
						let imageWidth: number;

						if (img.width >= img.height) {
							imageHeight = boxSize;
							imageWidth = (img.width * boxSize) / img.height;
						} else {
							imageHeight = (img.height * boxSize) / img.width;
							imageWidth = boxSize;
						}
						setImages((prev) => {
							const newImages = [...prev];
							newImages[currentImageIndex] = {
								src: reader.result as string,
								position: { x: 0, y: 0 },
								height: imageHeight,
								width: imageWidth,
							};
							return newImages;
						});
					};
					img.src = reader.result as string;
				};
				reader.readAsDataURL(file);
			} catch (error) {
				console.error("이미지 변환 오류:", error);
				alert("이미지 파일을 처리하는 중 오류가 발생했습니다.");
			}
		}
	};

	const imageRemove = (index: number) => {
		setImages((prev) => {
			const newImages = [...prev];
			newImages[index] = {
				src: "",
				position: { x: 0, y: 0 },
				height: 0,
				width: 0,
			};
			return newImages;
		});
	};

	const [isDragging, setIsDragging] = useState(false);
	const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });

	const startImageMove = useCallback(
		(e: React.MouseEvent, index: number) => {
			e.preventDefault();
			setIsDragging(true);

			const image = images[index];
			setStartPosition({
				x: e.clientX - (image.position.x || 0),
				y: e.clientY - (image.position.y || 0),
			});
		},
		[images, setIsDragging, setStartPosition]
	);

	const moveImage = useCallback(
		(e: MouseEvent) => {
			if (!isDragging) return;

			let newX = 0;
			let newY = 0;

			const currentImage = images[currentImageIndex];
			const { height, width } = currentImage;

			if (width < height) {
				const minY = (-1 * (height - boxSize)) / 2;
				const maxY = (height - boxSize) / 2;
				newX = 0;
				newY = Math.max(minY, Math.min(maxY, e.clientY - startPosition.y));
			} else {
				const minX = (-1 * (width - boxSize)) / 2;
				const maxX = (width - boxSize) / 2;
				newX = Math.max(minX, Math.min(maxX, e.clientX - startPosition.x));
				newY = 0;
			}

			setImages((prev) => {
				const newImages = [...prev];
				if (currentImageIndex != null && newImages[currentImageIndex]) {
					newImages[currentImageIndex] = {
						...newImages[currentImageIndex],
						position: { x: newX, y: newY },
					};
				}
				return newImages;
			});
		},
		[isDragging, startPosition, currentImageIndex, images, boxSize]
	);

	const stopImageMove = useCallback(() => {
		setIsDragging(false);
	}, [setIsDragging]);

	useEffect(() => {
		if (isDragging) {
			document.addEventListener("mousemove", moveImage);
			document.addEventListener("mouseup", stopImageMove);

			return () => {
				document.removeEventListener("mousemove", moveImage);
				document.removeEventListener("mouseup", stopImageMove);
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
