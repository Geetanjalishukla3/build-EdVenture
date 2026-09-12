import React from 'react';
import { Career, Course } from '../types';
import { LayoutDashboard, Bookmark, BookOpen, CheckCircle, Award, ArrowRight, Compass } from 'lucide-react';

interface DashboardProps {
  careers: Career[];
  courses: Course[];
  bookmarkedCareerIds: string[];
  enrolledCourseIds: string[];
  completedMilestones: string[];
  onToggleBookmark: (id: string) => void;
  onToggleEnroll: (id: string) => void;
  setActiveTab: (tab: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  careers,
  courses,
  bookmarkedCareerIds,
  enrolledCourseIds,
  completedMilestones,
  onToggleBookmark,
  onToggleEnroll,
  setActiveTab,
}) => {
  const bookmarkedCareers = careers.filter((c) => bookmarkedCareerIds.includes(c.id));
  const enrolledCourses = courses.filter((c) => enrolledCourseIds.includes(c.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-900 to-violet-900 text-white p-8 rounded-3xl shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 text-indigo-200 text-xs font-semibold uppercase tracking-wider">
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Student Dashboard</span>
          </div>
          <h1 className="text-3xl font-bold">Welcome to Your Learning Portal</h1>
          <p className="text-indigo-200 text-sm max-w-xl">
            Track your bookmarked future careers, active EdTech certifications, and AI learning milestones in one unified space.
          </p>
        </div>
        <div className="flex items-center space-x-4 bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/10">
          <div className="text-center px-4">
            <span className="block text-2xl font-bold text-white">{bookmarkedCareers.length}</span>
            <span className="text-xs text-indigo-200">Bookmarked Roles</span>
          </div>
          <div className="w-px h-8 bg-white/20" />
          <div className="text-center px-4">
            <span className="block text-2xl font-bold text-white">{enrolledCourses.length}</span>
            <span className="text-xs text-indigo-200">Enrolled Courses</span>
          </div>
          <div className="w-px h-8 bg-white/20" />
          <div className="text-center px-4">
            <span className="block text-2xl font-bold text-white">{completedMilestones.length}</span>
            <span className="text-xs text-indigo-200">Milestones Done</span>
          </div>
        </div>
      </div>

      {/* Bookmarked Careers Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
            <Bookmark className="w-5 h-5 text-indigo-600" />
            <span>Bookmarked Career Roles</span>
          </h2>
          <button
            onClick={() => setActiveTab('careers')}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center space-x-1"
          >
            <span>Explore More</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {bookmarkedCareers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookmarkedCareers.map((career) => (
              <div key={career.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <span className="text-xs font-semibold px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full">
                    {career.industry}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-3 mb-2">{career.title}</h3>
                  <p className="text-slate-600 text-xs line-clamp-2 mb-4">{career.description}</p>
                  <div className="text-xs text-slate-500 mb-4 font-medium">
                    Salary: <span className="text-slate-900 font-bold">{career.salaryRange}</span>
                  </div>
                </div>
                <button
                  onClick={() => setActiveTab('careers')}
                  className="w-full py-2.5 rounded-xl bg-slate-50 hover:bg-indigo-600 hover:text-white text-slate-700 text-xs font-semibold transition-all"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-8 text-center border border-slate-200">
            <Compass className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="text-sm font-bold text-slate-800">No bookmarked careers yet</h3>
            <p className="text-xs text-slate-500 mt-1">Browse the Career Explorer and bookmark roles that spark your interest.</p>
          </div>
        )}
      </div>

      {/* Enrolled Courses Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-indigo-600" />
            <span>Enrolled EdTech Courses</span>
          </h2>
          <button
            onClick={() => setActiveTab('courses')}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center space-x-1"
          >
            <span>Browse Catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {enrolledCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.map((course) => (
              <div key={course.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full">
                    Active Enrollment
                  </span>
                  <span className="text-xs font-medium text-slate-500">{course.duration}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900">{course.title}</h3>
                <p className="text-xs text-slate-500">Instructor: {course.instructor}</p>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full w-1/3" />
                </div>
                <span className="block text-xs text-slate-500">Progress: 33% Completed</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-8 text-center border border-slate-200">
            <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="text-sm font-bold text-slate-800">No active course enrollments</h3>
            <p className="text-xs text-slate-500 mt-1">Explore our EdTech curriculum and enroll in your first certification.</p>
          </div>
        )}
      </div>
    </div>
  );
};
