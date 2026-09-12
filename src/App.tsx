import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { CareerExplorer } from './components/CareerExplorer';
import { CareerMatchQuiz } from './components/CareerMatchQuiz';
import { RoadmapGenerator } from './components/RoadmapGenerator';
import { AICoachChat } from './components/AICoachChat';
import { CourseCatalog } from './components/CourseCatalog';
import { Dashboard } from './components/Dashboard';
import { MOCK_CAREERS, MOCK_COURSES } from './data/mockData';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('careers');
  const [bookmarkedCareerIds, setBookmarkedCareerIds] = useState<string[]>(['ai-ethics-officer', 'climate-tech-architect']);
  const [enrolledCourseIds, setEnrolledCourseIds] = useState<string[]>(['c-ai-ethics']);
  const [completedMilestones, setCompletedMilestones] = useState<string[]>([]);
  const [roadmapCareerTitle, setRoadmapCareerTitle] = useState<string>('');

  const handleToggleBookmark = (careerId: string) => {
    setBookmarkedCareerIds((prev) =>
      prev.includes(careerId) ? prev.filter((id) => id !== careerId) : [...prev, careerId]
    );
  };

  const handleToggleEnroll = (courseId: string) => {
    setEnrolledCourseIds((prev) =>
      prev.includes(courseId) ? prev.filter((id) => id !== courseId) : [...prev, courseId]
    );
  };

  const handleToggleMilestone = (milestoneKey: string) => {
    setCompletedMilestones((prev) =>
      prev.includes(milestoneKey) ? prev.filter((k) => k !== milestoneKey) : [...prev, milestoneKey]
    );
  };

  const handleGenerateRoadmapForCareer = (careerTitle: string) => {
    setRoadmapCareerTitle(careerTitle);
    setActiveTab('roadmap');
  };

  const handleSelectCourseFromModal = (courseId: string) => {
    if (!enrolledCourseIds.includes(courseId)) {
      setEnrolledCourseIds((prev) => [...prev, courseId]);
    }
    setActiveTab('courses');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-500 selection:text-white">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        bookmarkedCount={bookmarkedCareerIds.length}
        enrolledCount={enrolledCourseIds.length}
      />

      <main className="pb-16">
        {activeTab === 'careers' && (
          <CareerExplorer
            careers={MOCK_CAREERS}
            courses={MOCK_COURSES}
            bookmarkedIds={bookmarkedCareerIds}
            onToggleBookmark={handleToggleBookmark}
            onSelectCourse={handleSelectCourseFromModal}
            onGenerateRoadmap={handleGenerateRoadmapForCareer}
          />
        )}
        {activeTab === 'match' && (
          <CareerMatchQuiz
            onExploreCareer={(title) => {
              handleGenerateRoadmapForCareer(title);
            }}
          />
        )}
        {activeTab === 'roadmap' && (
          <RoadmapGenerator
            initialCareerTitle={roadmapCareerTitle}
            completedMilestoneIds={completedMilestones}
            onToggleMilestone={handleToggleMilestone}
          />
        )}
        {activeTab === 'coach' && <AICoachChat />}
        {activeTab === 'courses' && (
          <CourseCatalog
            courses={MOCK_COURSES}
            enrolledCourseIds={enrolledCourseIds}
            onToggleEnroll={handleToggleEnroll}
          />
        )}
        {activeTab === 'dashboard' && (
          <Dashboard
            careers={MOCK_CAREERS}
            courses={MOCK_COURSES}
            bookmarkedCareerIds={bookmarkedCareerIds}
            enrolledCourseIds={enrolledCourseIds}
            completedMilestones={completedMilestones}
            onToggleBookmark={handleToggleBookmark}
            onToggleEnroll={handleToggleEnroll}
            setActiveTab={setActiveTab}
          />
        )}
      </main>
    </div>
  );
}
