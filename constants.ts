import React from 'react';
import type { Semester } from './types';
import { BookOpen, Mic, Shield, Globe, MessageSquare, Film } from './components/icons';

const commonPromptSuffix = " Keep your responses concise, informative, and tailored for a university student. Use markdown for formatting when appropriate.";

export const SEMESTERS_DATA: Semester[] = [
  {
    id: 1,
    title: 'Semester 1',
    courses: [
        // FIX: Added missing 'systemPrompt' and 'gradient' properties to match the 'Course' type.
        { name: 'Calculus I', icon: <BookOpen />, systemPrompt: "You are an expert tutor for Calculus I." + commonPromptSuffix, gradient: 'from-blue-400 to-blue-600' },
        // FIX: Added missing 'systemPrompt' and 'gradient' properties to match the 'Course' type.
        { name: 'Physics I', icon: <BookOpen />, systemPrompt: "You are an expert tutor for Physics I." + commonPromptSuffix, gradient: 'from-red-400 to-red-600' },
    ],
  },
  {
    id: 2,
    title: 'Semester 2',
    courses: [
        // FIX: Added missing 'systemPrompt' and 'gradient' properties to match the 'Course' type.
        { name: 'Data Structures', icon: <BookOpen />, systemPrompt: "You are an expert tutor for Data Structures." + commonPromptSuffix, gradient: 'from-green-400 to-green-600' },
        // FIX: Added missing 'systemPrompt' and 'gradient' properties to match the 'Course' type.
        { name: 'Algorithms', icon: <BookOpen />, systemPrompt: "You are an expert tutor for Algorithms." + commonPromptSuffix, gradient: 'from-yellow-400 to-yellow-600' },
    ],
  },
  {
    id: 3,
    title: 'Semester 3',
    courses: [
        // FIX: Added missing 'systemPrompt' and 'gradient' properties to match the 'Course' type.
        { name: 'Linear Algebra', icon: <BookOpen />, systemPrompt: "You are an expert tutor for Linear Algebra." + commonPromptSuffix, gradient: 'from-purple-400 to-purple-600' },
        // FIX: Added missing 'systemPrompt' and 'gradient' properties to match the 'Course' type.
        { name: 'Databases', icon: <BookOpen />, systemPrompt: "You are an expert tutor for Databases." + commonPromptSuffix, gradient: 'from-pink-400 to-pink-600' },
    ],
  },
  {
    id: 4,
    title: 'Semester 4',
    courses: [
      // FIX: Added missing 'systemPrompt' and 'gradient' properties to match the 'Course' type.
      { name: 'Foreign Policy Analysis', icon: <Globe />, systemPrompt: "You are an expert tutor for Foreign Policy Analysis." + commonPromptSuffix, gradient: 'from-cyan-400 to-cyan-600' },
      // FIX: Added missing 'systemPrompt' and 'gradient' properties to match the 'Course' type.
      { name: 'Intro to Mass Communication', icon: <Mic />, systemPrompt: "You are an expert tutor for Introduction to Mass Communication." + commonPromptSuffix, gradient: 'from-teal-400 to-teal-600' },
      // FIX: Added missing 'systemPrompt' and 'gradient' properties to match the 'Course' type.
      { name: 'Intro to Security Studies', icon: <Shield />, systemPrompt: "You are an expert tutor for Introduction to Security Studies." + commonPromptSuffix, gradient: 'from-gray-400 to-gray-600' },
      // FIX: Added missing 'systemPrompt' and 'gradient' properties to match the 'Course' type.
      { name: 'French Language', icon: <MessageSquare />, systemPrompt: "You are an expert tutor for the French Language." + commonPromptSuffix, gradient: 'from-indigo-400 to-indigo-600' },
      // FIX: Added missing 'systemPrompt' and 'gradient' properties to match the 'Course' type.
      { name: 'German Language', icon: <MessageSquare />, systemPrompt: "You are an expert tutor for the German Language." + commonPromptSuffix, gradient: 'from-yellow-500 to-orange-500' },
      // FIX: Added missing 'systemPrompt' and 'gradient' properties to match the 'Course' type.
      { name: 'Chinese Language', icon: <MessageSquare />, systemPrompt: "You are an expert tutor for the Chinese Language." + commonPromptSuffix, gradient: 'from-red-500 to-rose-500' },
    ],
  },
  {
    id: 5,
    title: 'Semester 5',
    courses: [],
  },
  {
    id: 6,
    title: 'Semester 6',
    courses: [],
  },
  {
    id: 7,
    title: 'Semester 7',
    courses: [],
  },
  {
    id: 8,
    title: 'Semester 8',
    courses: [],
  },
];
