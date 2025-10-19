
import type React from 'react';

export interface Course {
  name: string;
  icon: React.ReactNode;
  systemPrompt: string;
  gradient: string;
}

export interface Semester {
  id: number;
  title: string;
  courses: Course[];
}

export interface ApprovedUser {
  uid: string;
  addedAt: any; // Firestore Timestamp
}
