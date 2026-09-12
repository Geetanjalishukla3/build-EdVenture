import React, { useState, useMemo } from 'react';
import { Career, Course } from '../types';
import { Search, Filter, TrendingUp, DollarSign, Bookmark, ArrowRight, Sparkles, Compass } from 'lucide-react';
import { CareerDetailModal } from './CareerDetailModal';

interface CareerExplorerProps {
  careers: Career[];
  courses: Course[];
  bookmarkedIds: string[];
  onToggleBookmark: (id: string) => void;
  onSelectCourse: (courseId: string) => void;
  onGenerateRoadmap: (careerTitle: string) => void;
}

export const CareerExplorer: React.FC<CareerExplorerProps> = ({
  careers,
  courses,
  bookmarkedIds,
  onToggleBookmark,
  onSelectCourse,
  onGenerateRoadmap,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('All');
  const [selectedCareer, setSelectedCareer] = useState<Career | null>(null);

  const industries = ['All', ...Array.from(new Set(careers.map((c) => c.industry)))];

  const filteredCareers = useMemo(() => {
    return careers.filter((career) => {
      const matchesSearch =
        career.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        career.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        career.keySkills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesIndustry = selectedIndustry === 'All' || career.industry === selectedIndustry;
      return matchesSearch && matchesIndustry;
    });
  }, [careers, searchQuery, selectedIndustry]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-6 py-6 sm:py-10">
        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-50 to-violet-50 border border-indigo-100/50 text-indigo-700 text-xs font-bold tracking-widest uppercase shadow-sm">
          <Sparkles className="w-4 h-4 text-indigo-500" />
          <span>Future-Proof Career Directory</span>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 tracking-tight leading-[1.15] drop-shadow-sm">
          Explore Careers Shaping Tomorrow’s World
        </h1>
        <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
          Discover high-growth roles in artificial intelligence, quantum computing, climate technology, neurotech, and more.
        </p>
      </div>

      {/* Search & Filters */}
      <div className="bg-white p-4 sm:p-6 rounded-3xl shadow-sm border border-slate-200 space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search careers, skills, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all text-slate-900 placeholder:text-slate-400"
            />
          </div>

          {/* Industry Pills */}
          <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            <Filter className="w-4 h-4 text-slate-400 shrink-0 ml-1 mr-1" />
            {industries.map((ind) => (
              <button
                key={ind}
                onClick={() => setSelectedIndustry(ind)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedIndustry === ind
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {ind}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Careers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCareers.map((career) => {
          const isBookmarked = bookmarkedIds.includes(career.id);
          return (
            <div
              key={career.id}
              className="bg-white rounded-3xl p-6 border border-slate-200 hover:border-indigo-500/50 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Card Top */}
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700">
                    {career.industry}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleBookmark(career.id);
                    }}
                    className={`p-2 rounded-xl border transition-all cursor-pointer ${
                      isBookmarked
                        ? 'bg-indigo-50 border-indigo-200 text-indigo-600'
                        : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-indigo-600' : ''}`} />
                  </button>
                </div>

                {/* Title & Description */}
                <h3
                  onClick={() => setSelectedCareer(career)}
                  className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors cursor-pointer"
                >
                  {career.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-2">
                  {career.description}
                </p>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-3 mb-4 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <div>
                    <div className="flex items-center text-xs font-semibold text-slate-500 mb-0.5">
                      <DollarSign className="w-3.5 h-3.5 text-indigo-600 mr-0.5" />
                      Salary
                    </div>
                    <span className="text-xs font-bold text-slate-900">{career.salaryRange}</span>
                  </div>
                  <div>
                    <div className="flex items-center text-xs font-semibold text-slate-500 mb-0.5">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-600 mr-0.5" />
                      Growth
                    </div>
                    <span className="text-xs font-bold text-emerald-700">{career.growthRate}</span>
                  </div>
                </div>

                {/* Skills Preview */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {career.keySkills.slice(0, 3).map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 text-xs font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                  {career.keySkills.length > 3 && (
                    <span className="px-2 py-1 rounded-lg bg-slate-100 text-slate-500 text-xs font-medium">
                      +{career.keySkills.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Card Footer */}
              <button
                onClick={() => setSelectedCareer(career)}
                className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-2xl bg-slate-50 hover:bg-indigo-600 hover:text-white text-slate-700 text-sm font-semibold transition-all group-hover:bg-indigo-600 group-hover:text-white cursor-pointer"
              >
                <span>Explore Role & Skills</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>

      {filteredCareers.length === 0 && (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200">
          <Compass className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-800">No careers found</h3>
          <p className="text-sm text-slate-500">Try adjusting your search terms or industry filter.</p>
        </div>
      )}

      {/* Detail Modal */}
      <CareerDetailModal
        career={selectedCareer}
        courses={courses}
        onClose={() => setSelectedCareer(null)}
        isBookmarked={selectedCareer ? bookmarkedIds.includes(selectedCareer.id) : false}
        onToggleBookmark={onToggleBookmark}
        onSelectCourse={onSelectCourse}
        onGenerateRoadmap={onGenerateRoadmap}
      />
    </div>
  );
};
