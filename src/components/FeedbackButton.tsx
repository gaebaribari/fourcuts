import React, { useState } from 'react';
import styled from 'styled-components';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

const ModalOverlay = styled.div`
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

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 425px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  margin: 0 0 20px 0;
  font-size: 1.5rem;
  color: #333;
`;

const TextArea = styled.textarea`
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

const Button = styled.button`
border:none;
  display:block;
  width: 300px;
  height:50px;

  border-radius: 16px;
  cursor: pointer;
  font-size: 1rem;
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const TriggerButton = styled(Button)`
border:2px solid #1a3b00;
margin-top:10px;
  background-color: #f8f9fa;
  color:#1a3b00;
  
  &:hover {
    background-color: #e9ecef;
  }
`;



const SubmitButton = styled(Button)`
  background-color: #1a3b00;
  color: white;
  width: 100%;
  padding: 12px;
  
  &:hover:not(:disabled) {
    background-color: #1a3b00;
  }
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  margin-bottom: 16px;
  font-size: 0.875rem;
`;

interface FeedbaProps {
  apiEndpoint?: string;
}

const Feedba: React.FC<FeedbaProps> = ({
  apiEndpoint = '/api/feedback'
}) => {
  const [message, setMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!message.trim()) {
      setError('피드백 메시지를 입력해주세요.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message.trim(),
          timestamp: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error('피드백 제출에 실패했습니다.');
      }

      setMessage('');
      setIsOpen(false);
    } catch (error) {
      console.error('피드백 제출 중 오류:', error);
      setError('피드백 제출에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const submitFeedback = async () => {

    try {
      try {
        const printRef = collection(db, 'feedback');
        await addDoc(printRef, {
          feedback: message,
        });

      } catch (firebaseError) {
        console.error("Firebase logging error:", firebaseError);
      }
    }
    catch (error) {
      console.error("Error converting div to image:", error);
    }
  };

  return (
    <>
      <TriggerButton onClick={() => setIsOpen(true)}>
        피드백 보내기 💌
      </TriggerButton>

      {isOpen && (
        <ModalOverlay onClick={() => setIsOpen(false)}>
          <ModalContent onClick={e => e.stopPropagation()}>
            <Title>피드백 대환영 🤍</Title>
            <form onSubmit={handleSubmit}>
              {error && <ErrorMessage>{error}</ErrorMessage>}
              <TextArea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="서비스 개선을 위한 소중한 의견을 남겨주세요"
                disabled={isSubmitting}
              />
              <SubmitButton type="submit" disabled={isSubmitting} onClick={submitFeedback}>
                {isSubmitting ? '제출 중...' : '피드백 제출'}
              </SubmitButton>
            </form>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

export default Feedba;