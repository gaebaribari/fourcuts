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

export const CloseButton = styled.button`
	z-index: 1;
	position: absolute;
	border: none;
	background: none;
	cursor: pointer;
	top: 4%;
	right: 2%;
	opacity: 0;
	transition: opacity 0.2s ease-in-out;

	-webkit-text-fill-color: black;
	-webkit-tap-highlight-color: transparent;
	-webkit-focus-ring-color: transparent;
`;

export const CaptureButton = styled(Button)`
	background-color: #1a3b00;
	text-align: center;
	align-content: center;
	color: #e9ecef;
`;

export const SelectButton = styled.button<{
	buttonColor?: string;
}>`
	border: none;
	width: 40px;
	height: 40px;
	border-radius: 50%;
	margin: 4px;
	font-size: 20px;
	font-weight: bold;
	color: white;
	background-color: ${(props) => props.buttonColor || "black"};
	display: flex;
	align-items: center;
	justify-content: center;
	&:hover {
		cursor: pointer;
	}
`;

export const SelectButtonWrap = styled.div`
	display: flex;
	margin-bottom: 1%;
	&:first-child {
		margin-top: 1%;
		margin-bottom: 0;
	}

	@media screen and (max-width: 768px) {
		&:first-child {
			margin-top: 6%;
			margin-bottom: 0;
		}
	}
`;
