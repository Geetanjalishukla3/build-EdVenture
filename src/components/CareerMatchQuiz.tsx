import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/mockData';
import { Sparkles, ArrowRight, CheckCircle2, RotateCcw, Compass } from 'lucide-react';

interface CareerMatchQuizProps {
  onExploreCareer: (careerTitle: string) => void;
}

export const CareerMatchQuiz: React.FC<CareerMatchQuizProps> = ({ onExploreCareer }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSelect = (label: string) => {
    setSelectedOption(label);
  };

  const handleNext = async () => {
    if (!selectedOption) return;
    const newAnswers = [...answers, selectedOption];
    setAnswers(newAnswers);
    setSelectedOption(null);

    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Submit to backend AI endpoint
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/ai/career-match', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userInterests: newAnswers[0],
            userSkills: newAnswers[1],
            educationLevel: newAnswers[2],
          }),
        });
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setResultData(data);
      } catch (err: any) {
        setError(err.message || 'Failed to generate career matches.');
      } finally {
        setLoading(false);
      }
    }
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setAnswers([]);
    setSelectedOption(null);
    setResultData(null);
    setError(null);
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center space-y-6 animate-fade-in">
        <div className="w-16 h-16 rounded-3xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto shadow-inner animate-spin">
          <Sparkles className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Analyzing Your Unique Profile with Gemini AI...</h2>
        <p className="text-slate-600 max-w-md mx-auto">
          Synthesizing your skills and aspirations with global future-of-work indicators to find your optimal career matches.
        </p>
      </div>
    );
  }

  if (resultData) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold tracking-wide uppercase">
            <Sparkles className="w-4 h-4" />
            <span>AI Career Match Results</span>
          </div>
          <h2 className="text-3xl font-bold text-slate-900">Your Personalized Career Recommendations</h2>
          <p className="text-slate-600 max-w-xl mx-auto">{resultData.encouragingAdvice}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {resultData.matches?.map((match: any, idx: number) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between hover:border-indigo-500 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full">
                    Match #{idx + 1}
                  </span>
                  <span className="text-sm font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                    {match.matchPercentage}% Match
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{match.careerTitle}</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">{match.reasoning}</p>

                <div className="mb-6">
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Key Skills to Bridge</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {match.keyGapSkills?.map((skill: string, sIdx: number) => (
                      <span key={sIdx} className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => onExploreCareer(match.careerTitle)}
                className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition-all cursor-pointer"
              >
                <Compass className="w-4 h-4" />
                <span>Explore Role & Roadmap</span>
              </button>
            </div>
          ))}
        </div>

        <div className="text-center pt-4">
          <button
            onClick={resetQuiz}
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Retake AI Assessment</span>
          </button>
        </div>
      </div>
    );
  }

  const question = QUIZ_QUESTIONS[currentStep];

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 space-y-8 animate-fade-in">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold tracking-wide uppercase">
          <Sparkles className="w-4 h-4" />
          <span>AI Career Matcher</span>
        </div>
        <h2 className="text-3xl font-bold text-slate-900">Find Your Future-Proof Career</h2>
        <p className="text-slate-600">Question {currentStep + 1} of {QUIZ_QUESTIONS.length}</p>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
        <div
          className="bg-indigo-600 h-full transition-all duration-300"
          style={{ width: `${((currentStep + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
        />
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <h3 className="text-xl font-bold text-slate-900">{question.question}</h3>

        <div className="space-y-3">
          {question.options.map((opt, idx) => {
            const isSelected = selectedOption === opt.label;
            return (
              <div
                key={idx}
                onClick={() => handleSelect(opt.label)}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/50 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <span className="text-sm font-medium text-slate-800">{opt.label}</span>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ml-4 ${
                    isSelected ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-300'
                  }`}
                >
                  {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                </div>
              </div>
            );
          })}
        </div>

        {error && <p className="text-xs text-rose-600 font-medium">{error}</p>}

        <div className="pt-4 flex justify-end">
          <button
            onClick={handleNext}
            disabled={!selectedOption}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all ${
              selectedOption
                ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-sm hover:from-indigo-700 hover:to-violet-700 cursor-pointer'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
          >
            <span>{currentStep === QUIZ_QUESTIONS.length - 1 ? 'Generate My AI Results' : 'Next Question'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
