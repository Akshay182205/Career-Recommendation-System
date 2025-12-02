
import React, { useState } from 'react';
import type { User } from '../types';
import { ADMIN_CREDENTIALS } from '../constants';
import UserIcon from './icons/UserIcon';
import LockIcon from './icons/LockIcon';

interface LoginPageProps {
  onLogin: (user: User) => void;
  registeredStudents: { id: string, pass: string }[];
  onRegister: (id: string, pass: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, registeredStudents, onRegister }) => {
  const [activeTab, setActiveTab] = useState<'student' | 'admin'>('student');
  const [isRegistering, setIsRegistering] = useState(false);
  
  const [studentId, setStudentId] = useState('');
  const [studentPass, setStudentPass] = useState('');
  const [studentConfirmPass, setStudentConfirmPass] = useState('');
  
  const [adminId, setAdminId] = useState('');
  const [adminPass, setAdminPass] = useState('');
  
  const [error, setError] = useState('');

  const handleStudentLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const student = registeredStudents.find(s => s.id === studentId && s.pass === studentPass);
    if (student) {
      onLogin({ id: studentId, role: 'student' });
    } else {
      setError('Invalid student ID or password.');
    }
  };
  
  const handleStudentRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (studentPass !== studentConfirmPass) {
      setError('Passwords do not match.');
      return;
    }
    if(registeredStudents.some(s => s.id === studentId)) {
        setError('A student with this ID already exists.');
        return;
    }
    onRegister(studentId, studentPass);
    onLogin({ id: studentId, role: 'student' });
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminId === ADMIN_CREDENTIALS.id && adminPass === 'adminpass') { // Mock password
      onLogin(ADMIN_CREDENTIALS);
    } else {
      setError('Invalid admin ID or password.');
    }
  };
  
  const renderStudentForm = () => (
    isRegistering ? (
       <form onSubmit={handleStudentRegister} className="space-y-6">
        <h3 className="text-xl font-semibold text-center text-white">Student Registration</h3>
        <div>
          <label className="block text-sm font-medium text-gray-300">User ID</label>
          <div className="relative mt-1">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3"><UserIcon className="text-gray-400" /></span>
            <input type="text" value={studentId} onChange={(e) => setStudentId(e.target.value)} required className="w-full pl-10 pr-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-brand-primary focus:border-brand-primary"/>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">Password</label>
          <div className="relative mt-1">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3"><LockIcon className="text-gray-400" /></span>
            <input type="password" value={studentPass} onChange={(e) => setStudentPass(e.target.value)} required className="w-full pl-10 pr-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-brand-primary focus:border-brand-primary"/>
          </div>
        </div>
         <div>
          <label className="block text-sm font-medium text-gray-300">Confirm Password</label>
          <div className="relative mt-1">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3"><LockIcon className="text-gray-400" /></span>
            <input type="password" value={studentConfirmPass} onChange={(e) => setStudentConfirmPass(e.target.value)} required className="w-full pl-10 pr-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-brand-primary focus:border-brand-primary"/>
          </div>
        </div>
        <button type="submit" className="w-full bg-brand-primary text-white py-2 px-4 rounded-md hover:bg-indigo-500 transition-colors">Register</button>
        <p className="text-sm text-center">Already have an account? <button type="button" onClick={() => { setIsRegistering(false); setError(''); }} className="font-medium text-brand-primary hover:underline">Login</button></p>
      </form>
    ) : (
      <form onSubmit={handleStudentLogin} className="space-y-6">
        <h3 className="text-xl font-semibold text-center text-white">Student Login</h3>
        <div>
          <label className="block text-sm font-medium text-gray-300">User ID</label>
          <div className="relative mt-1">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3"><UserIcon className="text-gray-400" /></span>
            <input type="text" value={studentId} onChange={(e) => setStudentId(e.target.value)} required className="w-full pl-10 pr-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-brand-primary focus:border-brand-primary"/>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">Password</label>
          <div className="relative mt-1">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3"><LockIcon className="text-gray-400" /></span>
            <input type="password" value={studentPass} onChange={(e) => setStudentPass(e.target.value)} required className="w-full pl-10 pr-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-brand-primary focus:border-brand-primary"/>
          </div>
        </div>
        <button type="submit" className="w-full bg-brand-primary text-white py-2 px-4 rounded-md hover:bg-indigo-500 transition-colors">Login</button>
        <p className="text-sm text-center">No account? <button type="button" onClick={() => { setIsRegistering(true); setError(''); }} className="font-medium text-brand-primary hover:underline">Create one</button></p>
      </form>
    )
  );
  
  const renderAdminForm = () => (
    <form onSubmit={handleAdminLogin} className="space-y-6">
      <h3 className="text-xl font-semibold text-center text-white">Admin Login</h3>
      <div>
        <label className="block text-sm font-medium text-gray-300">Admin ID</label>
         <div className="relative mt-1">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3"><UserIcon className="text-gray-400" /></span>
            <input type="text" value={adminId} onChange={(e) => setAdminId(e.target.value)} required className="w-full pl-10 pr-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-brand-primary focus:border-brand-primary"/>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300">Password</label>
        <div className="relative mt-1">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3"><LockIcon className="text-gray-400" /></span>
            <input type="password" value={adminPass} onChange={(e) => setAdminPass(e.target.value)} required className="w-full pl-10 pr-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-brand-primary focus:border-brand-primary"/>
        </div>
      </div>
      <button type="submit" className="w-full bg-brand-secondary text-white py-2 px-4 rounded-md hover:bg-emerald-500 transition-colors">Login</button>
    </form>
  );

  return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-xl p-8">
        <div className="flex border-b border-gray-700 mb-6">
          <button
            onClick={() => { setActiveTab('student'); setError(''); }}
            className={`w-1/2 py-3 text-center font-medium ${activeTab === 'student' ? 'text-brand-primary border-b-2 border-brand-primary' : 'text-gray-400'}`}
          >
            Student
          </button>
          <button
            onClick={() => { setActiveTab('admin'); setError(''); }}
            className={`w-1/2 py-3 text-center font-medium ${activeTab === 'admin' ? 'text-brand-secondary border-b-2 border-brand-secondary' : 'text-gray-400'}`}
          >
            Admin
          </button>
        </div>
        {error && <p className="bg-red-900 border border-red-700 text-red-200 text-center p-3 mb-4 rounded-md">{error}</p>}
        <div>
          {activeTab === 'student' ? renderStudentForm() : renderAdminForm()}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
