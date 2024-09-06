// src/components/VoiceCapture.tsx

"use client"; // This marks the component as a Client Component

import { useState } from 'react';

const VoiceCapture = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [transcription, setTranscription] = useState('');

    const startRecording = () => {
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => {
            setIsRecording(true);
        };

        recognition.onend = () => {
            setIsRecording(false);
        };

        recognition.onresult = async (event: SpeechRecognitionEvent) => { // Correctly type the event parameter
            const audioBlob = event.results[0][0].transcript;
            await sendAudioToBackend(audioBlob);
        };

        recognition.start();
    };

    const sendAudioToBackend = async (audioBlob: string) => {
        try {
            const response = await fetch('/api/openai/transcribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ audioBlob }),
            });

            if (!response.ok) {
                throw new Error('Failed to transcribe audio');
            }

            const data = await response.json();
            setTranscription(data.transcription);
            await generateFeedback(data.transcription);
        } catch (error) {
            console.error('Error sending audio to backend:', error);
        }
    };

    const generateFeedback = async (transcription: string) => {
        try {
            const response = await fetch('/api/openai/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ transcription }),
            });

            if (!response.ok) {
                throw new Error('Failed to generate feedback');
            }

            const data = await response.json();
            await convertFeedbackToSpeech(data.feedback);
        } catch (error) {
            console.error('Error generating feedback:', error);
        }
    };

    const convertFeedbackToSpeech = async (feedback: string) => {
        try {
            const response = await fetch('/api/openai/text-to-speech', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ feedback }),
            });

            if (!response.ok) {
                throw new Error('Failed to convert feedback to speech');
            }

            const data = await response.json();
            const audio = new Audio(data.audioUrl);
            audio.play();
        } catch (error) {
            console.error('Error converting feedback to speech:', error);
        }
    };

    return (
        <div>
            <button onClick={startRecording} disabled={isRecording}>
                {isRecording ? 'Recording...' : 'Start Recording'}
            </button>
            {transcription && <p>Transcription: {transcription}</p>}
        </div>
    );
};

export default VoiceCapture;
