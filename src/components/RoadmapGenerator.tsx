import React, { useState } from 'react';
import { Map, Sparkles, CheckCircle, ArrowRight, Clock, BookOpen, Plus } from 'lucide-react';

interface RoadmapGeneratorProps {
  initialCareerTitle?: string;
  completedMilestoneIds: string[];
  onToggleMilestone: (id: string) => void;
}

export const RoadmapGenerator: React.FC<RoadmapGeneratorProps> = ({
  initialCareerTitle = '',
  completedMilestoneIds,
  onToggleMilestone,
}) => {
  const [careerTitle, setCareerTitle] = useState(initialCareerTitle);
  const [currentSkills, setCurrentSkills] = useState('');
  const [loading, setLoading] = useState(false);
  const [roadmapData, setRoadmapData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!careerTitle.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/ai/roadmap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetCareerTitle: careerTitle, currentSkills }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setRoadmapData(data);
    } catch (err: any) {
      setError(err.message || 'Failed to generate roadmap.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold tracking-wide uppercase">
          <Sparkles className="w-4 h-4" />
          <span>AI Roadmap Generator</span>
        </div>
        <h1 className="text-3xl font-bold text-slate-900">Custom Career Learning Milestone Builder</h1>
        <p className="text-slate-600 text-sm">
          Enter your target future-proof role and current background to receive a step-by-step curriculum powered by Gemini.
        </p>
      </div>

      {/* Generator Form */}
      <form onSubmit={handleGenerate} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Target Career Role
            </label>
            <input
              type="text"
              required
              placeholder="e.g. AI Ethics Officer, Quantum Engineer"
              value={careerTitle}
              onChange={(e) => setCareerTitle(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 text-slate-900"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Your Current Skills / Background
            </label>
            <input
              type="text"
              placeholder="e.g. Python, basic statistics, student in sociology"
              value={currentSkills}
              onChange={(e) => setCurrentSkills(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 text-slate-900"
            />
          </div>
        </div>
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-6 py-3 rounded-xl font-semibold text-sm shadow-sm hover:from-indigo-700 hover:to-violet-700 transition-all cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin" />
                <span>Generating Roadmap...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Build AI Roadmap</span>
              </>
            )}
          </button>
        </div>
        {error && <p className="text-xs text-rose-600 font-medium">{error}</p>}
      </form>

      {/* Roadmap Output */}
      {roadmapData && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-gradient-to-r from-indigo-900 to-violet-900 text-white p-6 sm:p-8 rounded-3xl shadow-lg">
            <h2 className="text-2xl font-bold mb-2">{roadmapData.roadmapTitle}</h2>
            <p className="text-indigo-200 text-sm leading-relaxed">{roadmapData.overview}</p>
          </div>

          <div className="space-y-4">
            {roadmapData.milestones?.map((milestone: any, idx: number) => {
              const milestoneKey = `${roadmapData.roadmapTitle}-step-${milestone.stepNumber}`;
              const isCompleted = completedMilestoneIds.includes(milestoneKey);
              return (
                <div
                  key={idx}
                  className={`bg-white rounded-3xl p-6 border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                    isCompleted ? 'border-emerald-500 bg-emerald-50/20 shadow-sm' : 'border-slate-200 shadow-sm'
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div
                      className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-sm shrink-0 ${
                        isCompleted ? 'bg-emerald-600 text-white' : 'bg-indigo-50 text-indigo-700'
                      }`}
                    >
                      {milestone.stepNumber}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-1">{milestone.title}</h3>
                      <p className="text-slate-600 text-sm mb-3 leading-relaxed">{milestone.description}</p>
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="flex items-center text-xs font-medium text-slate-500">
                          <Clock className="w-3.5 h-3.5 mr-1 text-indigo-600" />
                          {milestone.estimatedWeeks} Weeks Est.
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {milestone.skillsToAcquire?.map((skill: string, sIdx: number) => (
                            <span key={sIdx} className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onToggleMilestone(milestoneKey)}
                    className={`px-4 py-2.5 rounded-xl font-semibold text-xs transition-all flex items-center space-x-1.5 shrink-0 cursor-pointer ${
                      isCompleted
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>{isCompleted ? 'Completed' : 'Mark Complete'}</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
