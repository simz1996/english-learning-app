// src/app/page.tsx
import VoiceCapture from '@/components/VoiceCapture'; // Ensure this path is correct

export default function HomePage() {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
            <header className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-800">English Learning App</h1>
                <p className="text-gray-600 mt-2">Improve your English pronunciation, fluency, and intonation.</p>
            </header>

            <main className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
                <VoiceCapture />
            </main>

            <footer className="mt-8 text-center text-gray-500 text-sm">
                <p>
                    Built with <a href="https://nextjs.org/" className="text-blue-500 hover:underline">Next.js</a> and powered by <a href="https://openai.com/" className="text-blue-500 hover:underline">OpenAI</a>.
                </p>
                <p className="mt-2">
                    Deployed on <a href="https://vercel.com/" className="text-blue-500 hover:underline">Vercel</a> and <a href="https://railway.app/" className="text-blue-500 hover:underline">Railway</a>.
                </p>
            </footer>
        </div>
    );
}
