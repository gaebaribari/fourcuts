import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import {
	ModalBackground,
	ModalContent,
	Title,
	ErrorMessage,
	TextArea,
	FeedbackButton,
	SubmitButton,
} from "../styles/feedback";

const Feedback = () => {
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
	};

	const submitFeedback = async () => {
		const TIME_ZONE = 9 * 60 * 60 * 1000;
		const d = new Date();
		const date = new Date(d.getTime() + TIME_ZONE).toISOString().split("T")[0];
		const time = d.toTimeString().split(" ")[0];
		try {
			await addDoc(collection(db, "feedback"), {
				feedback: message,
				timestamp: date + " " + time,
			});
			setIsSubmitting(false);
			setIsOpen(false);
			setMessage("");
		} catch (firebaseError) {
			console.error("Firebase logging error:", firebaseError);
		}
	};

	return (
		<>
			<FeedbackButton onClick={() => setIsOpen(true)}>
				피드백 보내기 💌
			</FeedbackButton>

			{isOpen && (
				<ModalBackground onClick={() => setIsOpen(false)}>
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
				</ModalBackground>
			)}
		</>
	);
};

export default Feedback;
