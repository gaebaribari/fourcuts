import styled from "styled-components";
import { Button } from "./button";

export const ModalBackground = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 1000;
`;

export const ModalContent = styled.div`
	background: white;
	padding: 20px;
	border-radius: 8px;
	width: 90%;
	max-width: 425px;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h2`
	margin: 0 0 20px 0;
	font-size: 1.5rem;
	color: #333;
`;

export const TextArea = styled.textarea`
	width: 94%;
	min-height: 100px;
	padding: 12px;
	border: 1px solid #ddd;
	border-radius: 4px;
	margin-bottom: 16px;
	font-size: 1rem;
	resize: vertical;

	&:focus {
		outline: none;
		border-color: #1a3b00;
	}
`;
export const ErrorMessage = styled.div`
	color: #dc3545;
	margin-bottom: 16px;
	font-size: 0.875rem;
`;

export const FeedbackButton = styled(Button)`
	border: 2px solid #1a3b00;
	margin-top: 10px;
	color: #1a3b00;

	&:hover {
		background-color: #e9ecef;
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
