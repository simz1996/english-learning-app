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

        recognition.onresult = (event) => {
            const audioBlob = event.results[0][0].transcript;
            sendAudioToBackend(audioBlob);
        };

        recognition.start();
    };

    const sendAudioToBackend = async (audioBlob: string) => {
        const response = await fetch('/api/openai/transcribe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ audioBlob }),
        });

        const data = await response.json();
        setTranscription(data.transcription);
        generateFeedback(data.transcription);
    };

    const generateFeedback = async (transcription: string) => {
        const response = await fetch('/api/openai/feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ transcription }),
        });

        const data = await response.json();
        convertFeedbackToSpeech(data.feedback);
    };

    const convertFeedbackToSpeech = async (feedback: string) => {
        const response = await fetch('/api/openai/text-to-speech', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ feedback }),
        });

        const data = await response.json();
        const audio = new Audio(data.audioUrl);
        audio.play();
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
