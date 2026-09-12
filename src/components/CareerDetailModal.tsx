import React from 'react';
import { Career, Course } from '../types';
import { X, DollarSign, TrendingUp, Award, BookOpen, CheckCircle, Sparkles, Bookmark } from 'lucide-react';

interface CareerDetailModalProps {
  career: Career | null;
  courses: Course[];
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (careerId: string) => void;
  onSelectCourse: (courseId: string) => void;
  onGenerateRoadmap: (careerTitle: string) => void;
}

export const CareerDetailModal: React.FC<CareerDetailModalProps> = ({
  career,
  courses,
  onClose,
  isBookmarked,
  onToggleBookmark,
  onSelectCourse,
  onGenerateRoadmap,
}) => {
  if (!career) return null;

  const relatedCourses = courses.filter((c) => career.topCourses.includes(c.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-slate-100">
        {/* Modal Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-100 flex items-center justify-between z-10">
          <div className="flex items-center space-x-3">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700">
              {career.industry}
            </span>
            <span className="flex items-center text-xs font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
              <TrendingUp className="w-3.5 h-3.5 mr-1" />
              Demand: {career.demandScore}/100
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onToggleBookmark(career.id)}
              className={`p-2 rounded-xl border transition-all ${
                isBookmarked
                  ? 'bg-indigo-50 border-indigo-200 text-indigo-600'
                  : 'bg-white border-slate-200 text-slate-400 hover:text-slate-600'
              }`}
              title={isBookmarked ? 'Bookmarked' : 'Bookmark Career'}
            >
              <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-indigo-600' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">{career.title}</h2>
            <p className="text-slate-600 text-base leading-relaxed">{career.description}</p>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <div className="flex items-center space-x-2 text-indigo-600 mb-1">
                <DollarSign className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wider">Salary Range</span>
              </div>
              <p className="text-lg font-bold text-slate-900">{career.salaryRange}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <div className="flex items-center space-x-2 text-violet-600 mb-1">
                <TrendingUp className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wider">Projected Growth</span>
              </div>
              <p className="text-lg font-bold text-slate-900">{career.growthRate}</p>
            </div>
          </div>

          {/* Education & Future Outlook */}
          <div className="bg-gradient-to-r from-indigo-50/60 to-violet-50/60 p-5 rounded-2xl border border-indigo-100/60">
            <div className="flex items-start space-x-3">
              <Award className="w-5 h-5 text-indigo-600 mt-0.5 shrink-0" />
              <div>
                <h4 className="text-sm font-semibold text-indigo-900 mb-1">Education & Credentials</h4>
                <p className="text-sm text-indigo-950/80">{career.educationRequired}</p>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-indigo-200/40 text-xs text-indigo-900/80">
              <span className="font-semibold">Future Outlook:</span> {career.futureOutlook}
            </div>
          </div>

          {/* Key Skills */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-3">
              Essential Skills Required
            </h3>
            <div className="flex flex-wrap gap-2">
              {career.keySkills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Daily Tasks */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-3">
              Typical Daily Responsibilities
            </h3>
            <ul className="space-y-2">
              {career.dailyTasks.map((task, idx) => (
                <li key={idx} className="flex items-start text-sm text-slate-600">
                  <CheckCircle className="w-4 h-4 text-emerald-500 mr-2.5 mt-0.5 shrink-0" />
                  <span>{task}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Top Courses */}
          {relatedCourses.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-3">
                Recommended EdTech Courses
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {relatedCourses.map((course) => (
                  <div
                    key={course.id}
                    onClick={() => onSelectCourse(course.id)}
                    className="p-3.5 rounded-2xl border border-slate-200 hover:border-indigo-500 hover:shadow-md transition-all cursor-pointer bg-white group"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-indigo-600">{course.category}</span>
                      <span className="text-xs font-medium text-slate-500">{course.duration}</span>
                    </div>
                    <h5 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {course.title}
                    </h5>
                    <p className="text-xs text-slate-500 mt-1">Instructor: {course.instructor}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Footer */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={() => onGenerateRoadmap(career.title)}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-6 py-3 rounded-xl font-medium text-sm shadow-sm hover:from-indigo-700 hover:to-violet-700 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Generate AI Learning Roadmap</span>
            </button>
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 font-medium text-sm transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
