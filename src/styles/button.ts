import styled from "styled-components";

export const Button = styled.button`
	display: block;
	width: 300px;
	height: 50px;
	border: none;

	border-radius: 16px;
	cursor: pointer;
	font-size: 1rem;

	&:disabled {
		opacity: 0.7;
		cursor: not-allowed;
	}
`;

export const SubmitButton = styled(Button)`
	background-color: #1a3b00;
	color: white;
	width: 100%;
	padding: 12px;

	&:hover:not(:disabled) {
		background-color: #1a3b00;
	}
`;

export const FeedbackButton = styled(Button)`
	border: 2px solid #1a3b00;
	margin-top: 10px;
	color: #1a3b00;

	&:hover {
		background-color: #e9ecef;
	}
`;

export const CloseButton = styled.button`
	z-index: 1;
	position: absolute;
	border: none;
	background: none;
	cursor: pointer;
	top: 4%;
	right: 2%;

	-webkit-text-fill-color: black;
	-webkit-tap-highlight-color: transparent;
	-webkit-focus-ring-color: transparent;
`;

export const CaptureButton = styled(Button)`
	background-color: #1a3b00;
	color: #e9ecef;
`;

export const ButtonWrap = styled.div`
	display: flex;
	margin: 5px 0 16px 0;

	& > button {
		border: none;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		margin: 4px;
		font-size: 20px;
		font-weight: bold;
	}
`;

export const ColorButton = styled.button<{
	buttonColor: string;
	isSelected?: boolean;
}>`
	border: none;
	width: 40px;
	height: 40px;
	border-radius: 50%;
	margin: 4px;
	background-color: ${(props) => props.buttonColor};

	cursor: pointer;
	transition: transform 0.2s ease;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;

	&:hover {
		transform: scale(1.1);
	}

	&::after {
		content: "✘"; // 일반 체크마크
		display: ${(props) => (props.isSelected ? "block" : "none")};
		color: rgba(255, 255, 255, 0.9);
		font-size: 20px;
		font-weight: bold;

		-webkit-text-fill-color: black;
		-webkit-tap-highlight-color: transparent;
		-webkit-focus-ring-color: transparent;
	}
`;
