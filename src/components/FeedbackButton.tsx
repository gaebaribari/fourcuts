import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import {
	ModalOverlay,
	ModalContent,
	Title,
	ErrorMessage,
	TextArea,
} from "../styles/styledComponents";
import { FeedbackButton, SubmitButton } from "../styles/button";

interface Props {
	apiEndpoint?: string;
}

const Feedback: React.FC<Props> = ({ apiEndpoint = "/api/feedback" }) => {
	const [message, setMessage] = useState("");
	const [isOpen, setIsOpen] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);

		if (!message.trim()) {
			setError("피드백 메시지를 입력해주세요.");
			return;
		}
		setIsSubmitting(true);

		try {
			const response = await fetch(apiEndpoint, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					message: message.trim(),
					timestamp: new Date().toISOString(),
				}),
			});

			if (!response.ok) {
				throw new Error("피드백 제출에 실패했습니다.");
			}

			setMessage("");
			setIsOpen(false);
		} catch (error) {
			console.error("피드백 제출 중 오류:", error);
			setError("피드백 제출에 실패했습니다. 다시 시도해주세요.");
		} finally {
			setIsSubmitting(false);
		}
	};

	const submitFeedback = async () => {
		try {
			try {
				const printRef = collection(db, "feedback");
				await addDoc(printRef, {
					feedback: message,
				});
			} catch (firebaseError) {
				console.error("Firebase logging error:", firebaseError);
			}
		} catch (error) {
			console.error("Error converting div to image:", error);
		}
	};

	return (
		<>
			<FeedbackButton onClick={() => setIsOpen(true)}>
				피드백 보내기 💌
			</FeedbackButton>

			{isOpen && (
				<ModalOverlay onClick={() => setIsOpen(false)}>
					<ModalContent onClick={(e) => e.stopPropagation()}>
						<Title>피드백 대환영 🤍</Title>
						<form onSubmit={handleSubmit}>
							{error && <ErrorMessage>{error}</ErrorMessage>}
							<TextArea
								value={message}
								onChange={(e) => setMessage(e.target.value)}
								placeholder="서비스 개선을 위한 소중한 의견을 남겨주세요"
								disabled={isSubmitting}
							/>
							<SubmitButton
								type="submit"
								disabled={isSubmitting}
								onClick={submitFeedback}
							>
								{isSubmitting ? "제출 중..." : "피드백 제출"}
							</SubmitButton>
						</form>
					</ModalContent>
				</ModalOverlay>
			)}
		</>
	);
};

export default Feedback;
