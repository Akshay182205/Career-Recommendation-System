
import React, { useState, useEffect } from 'react';
import type { View, User, Student, Admin, CareerRecommendation, StudentReport } from './types';
import LandingPage from './LandingPage';
import LoginPage from './LoginPage';
import StudentDashboard from './StudentDashboard';
import AdminDashboard from './AdminDashboard';
import Quiz from './Quiz';
import { MOCK_STUDENTS, QUIZ_QUESTIONS, ADMIN_CREDENTIALS } from './constants';

const App: React.FC = () => {
  const [view, setView] = useState<View>('landing');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [students, setStudents] = useState<Student[]>(MOCK_STUDENTS);
  
  // This mock state represents registered users in a database
  const [registeredStudents, setRegisteredStudents] = useState([
    { id: 'student1', pass: 'pass1' },
    { id: 'student2', pass: 'pass2' },
    { id: 'student3', pass: 'pass3' },
  ]);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    if (user.role === 'admin') {
      setView('adminDashboard');
    } else {
      setView('studentDashboard');
    }
  };
  
  const handleRegister = (id: string, pass: string) => {
    const newStudent: Student = { id, role: 'student', report: null };
    setRegisteredStudents(prev => [...prev, { id, pass }]);
    setStudents(prev => [...prev, newStudent]);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setView('landing');
  };

  const handleSubmitQuiz = (recommendations: CareerRecommendation[]) => {
    if (currentUser?.role === 'student') {
      const newReport: StudentReport = {
        recommendations,
        dateTaken: new Date().toISOString().split('T')[0],
      };
      
      const updatedStudent: Student = {
        ...(currentUser as Student),
        report: newReport,
      };

      setCurrentUser(updatedStudent);
      setStudents(prevStudents => 
        prevStudents.map(s => s.id === currentUser.id ? updatedStudent : s)
      );
      setView('studentDashboard');
    }
  };

  const renderView = () => {
    switch (view) {
      case 'landing':
        return <LandingPage onNavigateToLogin={() => setView('login')} />;
      case 'login':
        return <LoginPage onLogin={handleLogin} registeredStudents={registeredStudents} onRegister={handleRegister} />;
      case 'studentDashboard':
        const currentStudent = students.find(s => s.id === currentUser?.id);
        return currentStudent ? <StudentDashboard student={currentStudent} onTakeQuiz={() => setView('quiz')} onLogout={handleLogout} /> : <LoginPage onLogin={handleLogin} registeredStudents={registeredStudents} onRegister={handleRegister} />;
      case 'quiz':
        return <Quiz questions={QUIZ_QUESTIONS} onSubmit={handleSubmitQuiz} />;
      case 'adminDashboard':
        return currentUser?.role === 'admin' ? <AdminDashboard admin={currentUser as Admin} students={students} onLogout={handleLogout} /> : <LoginPage onLogin={handleLogin} registeredStudents={registeredStudents} onRegister={handleRegister}/>;
      default:
        return <LandingPage onNavigateToLogin={() => setView('login')} />;
    }
  };

  return <div className="App">{renderView()}</div>;
};

export default App;
