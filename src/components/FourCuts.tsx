import { useState } from "react";
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
	const [boxSize] = useState<number>(170);
	const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
	const { images, imageUpload, imageRemove, startImageMove } = useHandleImage({
		currentImageIndex,
		boxSize,
	});

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
};

export default FourCuts;
