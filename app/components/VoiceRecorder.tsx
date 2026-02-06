"use client";

import { useState, useRef } from "react";
import { Mic, Square, Loader2, CheckCircle, XCircle } from "lucide-react";

interface VoiceRecorderProps {
  expectedText: string;
  onComplete: (score: number) => void;
}

export default function VoiceRecorder({ expectedText, onComplete }: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<{ transcription: string; score: number; passed: boolean } | null>(null);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: "audio/webm" }); // or mp3/wav
        await processAudio(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setResult(null);
    } catch (err) {
      console.error("Error accessing microphone:", err);
      alert("Impossible d'accéder au microphone");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const processAudio = async (audioBlob: Blob) => {
    setIsProcessing(true);
    
    // Simulate processing delay for realistic effect
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simple simulation: If audio blob size > 0, assume they said something
    // In a real app, this would go to Google Cloud Speech or similar
    const passed = audioBlob.size > 3000; // Threshold for empty recording
    const score = passed ? Math.floor(Math.random() * (100 - 80) + 80) : 0;

    setResult({
        transcription: passed ? expectedText : "(Aucun son détecté)",
        score,
        passed
    });

    if (passed) {
        onComplete(score);
    } else {
        alert("Nous n'avons rien entendu. Essayez de parler plus fort.");
    }

    setIsProcessing(false);
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6 bg-gray-50 rounded-2xl border-2 border-gray-100">
      <div className="text-center">
        <p className="text-gray-400 text-sm font-bold uppercase mb-2">Prononcez cette phrase</p>
        <p className="text-2xl font-bold text-gray-800">"{expectedText}"</p>
      </div>

      <div className="relative">
        {isProcessing ? (
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center animate-pulse">
            <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
          </div>
        ) : (
          <button
            onClick={isRecording ? stopRecording : startRecording}
            className={`w-20 h-20 rounded-full flex items-center justify-center transition-all shadow-lg hover:scale-105 ${
              isRecording 
                ? "bg-red-500 text-white animate-pulse shadow-red-200" 
                : "bg-brand-blue text-white shadow-blue-200"
            }`}
          >
            {isRecording ? <Square className="w-8 h-8 fill-current" /> : <Mic className="w-8 h-8" />}
          </button>
        )}
      </div>

      {result && (
        <div className={`w-full p-4 rounded-xl border-2 ${result.passed ? 'border-brand-green bg-green-50' : 'border-red-200 bg-red-50'}`}>
          <div className="flex items-start gap-3">
            {result.passed ? (
              <CheckCircle className="w-6 h-6 text-brand-green flex-shrink-0" />
            ) : (
              <XCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
            )}
            <div>
              <p className="font-bold text-gray-800 mb-1">
                {result.passed ? "Excellent !" : "Essaie encore"}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                Vous avez dit : "{result.transcription}"
              </p>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${result.passed ? 'bg-brand-green' : 'bg-red-500'}`}
                    style={{ width: `${result.score}%` }}
                  ></div>
                </div>
                <span className="text-xs font-bold">{result.score}%</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
