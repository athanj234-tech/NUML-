
import React from 'react';
import { SEMESTERS_DATA } from '../../constants';
import type { Course } from '../../types';
import Accordion from '../ui/Accordion';
import CourseCard from '../ui/CourseCard';
import Header from '../layout/Header';

interface MainScreenProps {
  isAdmin: boolean;
  onCourseSelect: (course: Course) => void;
  onNavigateToAdmin: () => void;
}

const MainScreen: React.FC<MainScreenProps> = ({ isAdmin, onCourseSelect, onNavigateToAdmin }) => {
  return (
    <div className="min-h-screen bg-brand-primary">
      <Header title="NUML Scholar" showAdminButton={isAdmin} onAdminClick={onNavigateToAdmin} />
      <main className="container mx-auto p-4 md:p-8">
        <div className="bg-brand-secondary rounded-lg shadow-xl overflow-hidden">
          {SEMESTERS_DATA.map((semester) => (
            <Accordion key={semester.id} title={semester.title} startOpen={semester.id === 4}>
              {semester.courses.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {semester.courses.map((course) => (
                    <CourseCard key={course.name} course={course} onClick={onCourseSelect} />
                  ))}
                </div>
              ) : (
                <p className="text-brand-light text-center py-4">No courses available for this semester yet.</p>
              )}
            </Accordion>
          ))}
        </div>
      </main>
    </div>
  );
};

export default MainScreen;
