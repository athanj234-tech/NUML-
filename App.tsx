
import React, { useState, useEffect, useCallback } from 'react';
import { onAuthStateChanged, signInAnonymously, User } from 'firebase/auth';
import { auth } from './services/firebase';
import { isFirstUser, setAdminUid, isUserAdmin, isUserApproved } from './services/firestoreService';
import LoadingScreen from './components/screens/LoadingScreen';
import PendingApprovalScreen from './components/screens/PendingApprovalScreen';
import MainScreen from './components/screens/MainScreen';
import ChatScreen from './components/screens/ChatScreen';
import AdminPanelScreen from './components/screens/AdminPanelScreen';
import type { Course } from './types';

type Screen = 'loading' | 'pending' | 'main' | 'chat' | 'admin';

const App: React.FC = () => {
  const [screen, setScreen] = useState<Screen>('loading');
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        // Check if this is the first user ever.
        const firstUser = await isFirstUser();
        if (firstUser) {
          await setAdminUid(currentUser.uid);
          setIsAdmin(true);
          setScreen('main');
          return;
        }

        // Check for admin and approval status.
        const adminStatus = await isUserAdmin(currentUser.uid);
        setIsAdmin(adminStatus);
        
        if (adminStatus) {
          setScreen('main');
          return;
        }

        const approvedStatus = await isUserApproved(currentUser.uid);
        if (approvedStatus) {
          setScreen('main');
        } else {
          setScreen('pending');
        }
      } else {
        // No user, sign in anonymously.
        signInAnonymously(auth).catch((error) => {
          console.error("Anonymous sign-in failed:", error);
          // Handle error, maybe show an error screen
        });
      }
    });

    return () => unsubscribe();
  }, []);

  const handleCourseSelect = useCallback((course: Course) => {
    setSelectedCourse(course);
    setScreen('chat');
  }, []);

  const handleBackToMain = useCallback(() => {
    setSelectedCourse(null);
    setScreen('main');
  }, []);

  const handleNavigateToAdmin = useCallback(() => {
    setScreen('admin');
  }, []);

  const renderScreen = () => {
    switch (screen) {
      case 'loading':
        return <LoadingScreen />;
      case 'pending':
        return <PendingApprovalScreen uid={user?.uid || 'Loading...'} />;
      case 'main':
        return <MainScreen isAdmin={isAdmin} onCourseSelect={handleCourseSelect} onNavigateToAdmin={handleNavigateToAdmin} />;
      case 'chat':
        if (selectedCourse) {
          return <ChatScreen course={selectedCourse} onBack={handleBackToMain} />;
        }
        // Fallback to main if no course is selected
        setScreen('main'); 
        return <MainScreen isAdmin={isAdmin} onCourseSelect={handleCourseSelect} onNavigateToAdmin={handleNavigateToAdmin} />;
      case 'admin':
        return <AdminPanelScreen onBack={handleBackToMain} />;
      default:
        return <LoadingScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-brand-primary">
      {renderScreen()}
    </div>
  );
};

export default App;
