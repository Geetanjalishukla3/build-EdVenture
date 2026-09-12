export interface Career {
  id: string;
  title: string;
  industry: string;
  salaryRange: string;
  growthRate: string;
  demandScore: number; // 1-100
  educationRequired: string;
  description: string;
  keySkills: string[];
  dailyTasks: string[];
  topCourses: string[];
  iconName: string;
  futureOutlook: string;
}

export interface Course {
  id: string;
  title: string;
  category: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  rating: number;
  studentsEnrolled: number;
  instructor: string;
  description: string;
  skillsGained: string[];
  image: string;
}

export interface RoadmapMilestone {
  stepNumber: number;
  title: string;
  description: string;
  estimatedWeeks: number;
  skillsToAcquire: string[];
  suggestedCourseId?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
}

export interface UserProfile {
  name: string;
  targetCareerId?: string;
  bookmarkedCareerIds: string[];
  enrolledCourseIds: string[];
  completedMilestones: string[]; // milestone keys
  skills: string[];
}
