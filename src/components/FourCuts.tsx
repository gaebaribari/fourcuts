import { useState, useEffect } from "react";
import { useHandleImage } from "../hooks/useHandleImage";
import {
	PhotoGridContainer,
	StickerBackground,
	PhotoBox,
	Placeholder,
	FileInput,
	ImageWrapper,
	StyledImage,
} from "../styles/fourcuts";
import { CloseButton } from "../styles/button";

interface FourCutsProps {
	backgroundColor: string;
	sticker: string;
}

interface ImageData {
	src: string;
	position: {
		x: number;
		y: number;
	};
	height?: number;
	width?: number;
}

const FourCuts = ({ backgroundColor, sticker }: FourCutsProps) => {
	const [boxSize, setBoxSize] = useState<number>();
	const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
	const { images, imageUpload, imageRemove, startImageMove } = useHandleImage({
		currentImageIndex,
		boxSize,
	});

	useEffect(() => {
		const handleBoxSize = () => {
			if (window.matchMedia("(max-width: 768px)").matches) {
				setBoxSize(100);
			} else {
				setBoxSize(170);
			}
		};

		handleBoxSize(); // 초기 실행
		window.addEventListener("resize", handleBoxSize);

		return () => {
			window.removeEventListener("resize", handleBoxSize);
		};
	}, []);

	return (
		<PhotoGridContainer backgroundColor={backgroundColor}>
			<StickerBackground sticker={sticker as string} />
			{images.map((image: ImageData, index: number) => (
				<PhotoBox key={index}>
					{!image.src ? (
						<>
							<Placeholder>+</Placeholder>
							<FileInput
								type="file"
								accept="image/*"
								onClick={() => setCurrentImageIndex(index)}
								onChange={imageUpload}
							/>
						</>
					) : (
						<ImageWrapper>
							<CloseButton onClick={() => imageRemove(index)}>X</CloseButton>
							<StyledImage
								src={image.src}
								onMouseDown={(e) => {
									setCurrentImageIndex(index);
									startImageMove(e, index);
								}}
								$positionX={image.position.x}
								$positionY={image.position.y}
								$imageWidth={image.width}
								$imageHeight={image.height}
							/>
						</ImageWrapper>
					)}
				</PhotoBox>
			))}
		</PhotoGridContainer>
	);
};

export default FourCuts;
