import { useState } from "react";
import { useHandleImage } from "../hooks/useHandleImage";
import * as Style from "../styles/styledComponents";
import * as Button from "../styles/button";

interface FourCutsProps {
	backgroundColor: string | ((props: any) => string);
	sticker: string | ((props: any) => string);
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
		<Style.PhotoGridContainer backgroundColor={backgroundColor}>
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
						<Style.ImageWrapper>
							<Button.CloseButton onClick={() => imageRemove(index)}>
								X
							</Button.CloseButton>
							<Style.StyledImage
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
						</Style.ImageWrapper>
					)}
				</Style.PhotoBox>
			))}
		</Style.PhotoGridContainer>
	);
};

export default FourCuts;
