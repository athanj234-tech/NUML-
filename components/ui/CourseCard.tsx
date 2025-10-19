
import React from 'react';
import type { Course } from '../../types';

interface CourseCardProps {
  course: Course;
  onClick: (course: Course) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onClick }) => {
  return (
    <button
      onClick={() => onClick(course)}
      className={`relative group w-full p-6 bg-gradient-to-br ${course.gradient} rounded-xl text-white flex flex-col items-center justify-center text-center shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden`}
    >
      <div className="absolute inset-0 bg-black opacity-10 group-hover:opacity-20 transition-opacity"></div>
      <div className="relative z-10 flex flex-col items-center">
        <div className="mb-3">
          {course.icon}
        </div>
        <h3 className="font-bold text-lg">{course.name}</h3>
      </div>
    </button>
  );
};

export default CourseCard;
