
import React, { useState } from 'react';
import type { QuizQuestion, CareerRecommendation } from '../types';
import { generateCareerRecommendations } from '../services/geminiService';

interface QuizProps {
  questions: QuizQuestion[];
  onSubmit: (recommendations: CareerRecommendation[]) => void;
}

const Quiz: React.FC<QuizProps> = ({ questions, onSubmit }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleNext = async () => {
    if (selectedOption === null) return;
    
    const newAnswers = [...answers, selectedOption];
    setAnswers(newAnswers);
    setSelectedOption(null);

    if (isLastQuestion) {
      setIsLoading(true);
      setError(null);
      try {
        const recommendations = await generateCareerRecommendations(newAnswers);
        onSubmit(recommendations);
      } catch (e: any) {
        setError(e.message || 'An unexpected error occurred.');
      } finally {
        setIsLoading(false);
      }
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-brand-dark flex flex-col items-center justify-center text-white p-4">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-brand-primary"></div>
        <h2 className="text-2xl font-bold mt-8">Analyzing your results...</h2>
        <p className="text-gray-400 mt-2">Our AI is crafting your personalized career path. Please wait.</p>
      </div>
    );
  }

  if (error) {
     return (
        <div className="min-h-screen bg-brand-dark flex flex-col items-center justify-center text-white p-4">
            <h2 className="text-2xl font-bold text-red-500">An Error Occurred</h2>
            <p className="text-gray-400 mt-2">{error}</p>
             <button onClick={() => setCurrentQuestionIndex(0)} className="mt-6 bg-brand-primary text-white font-bold py-2 px-6 rounded-lg hover:bg-indigo-500 transition-colors">
                Try Again
             </button>
        </div>
     );
  }

  return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-gray-800 rounded-lg shadow-xl p-8">
        <div className="mb-6">
          <p className="text-brand-primary font-semibold">Question {currentQuestionIndex + 1} of {questions.length}</p>
          <h2 className="text-2xl font-bold mt-2 text-white">{currentQuestion.question}</h2>
        </div>
        <div className="space-y-4">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => setSelectedOption(option)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                selectedOption === option 
                ? 'bg-brand-primary border-brand-primary text-white shadow-lg' 
                : 'bg-gray-700 border-gray-600 hover:bg-gray-600 hover:border-gray-500'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleNext}
            disabled={!selectedOption}
            className="bg-brand-secondary text-white font-bold py-2 px-6 rounded-lg hover:bg-emerald-500 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
          >
            {isLastQuestion ? 'Submit' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
