import React from 'react';
import type { Admin, Student } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import BriefcaseIcon from './icons/BriefcaseIcon';
import ChartBarIcon from './icons/ChartBarIcon';
import UserIcon from './icons/UserIcon';


interface AdminDashboardProps {
  admin: Admin;
  students: Student[];
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ admin, students, onLogout }) => {
  const completedQuizzes = students.filter(s => s.report).length;

  const careerCounts = students
    .flatMap(s => s.report?.recommendations.map(r => r.career) ?? [])
    .reduce((acc, career) => {
      acc[career] = (acc[career] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  const chartData = Object.entries(careerCounts)
    // FIX: Explicitly typed the return value of the map function to resolve a type inference issue.
    // This ensures that `count` is correctly identified as a number for the subsequent sort operation.
    .map(([name, count]): { name: string; count: number } => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  return (
    <div className="min-h-screen bg-brand-dark p-4 sm:p-6 md:p-8">
       <header className="max-w-7xl mx-auto flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
            <div className="flex items-center space-x-4">
                <span className="text-gray-300">Welcome, <span className="font-bold text-brand-secondary">{admin.id}</span></span>
                <button
                    onClick={onLogout}
                    className="bg-red-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
                >
                    Logout
                </button>
            </div>
        </header>

        <main className="max-w-7xl mx-auto">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gray-800 p-6 rounded-lg flex items-center space-x-4">
                    <UserIcon className="h-10 w-10 text-brand-primary" />
                    <div>
                        <p className="text-gray-400 text-sm">Total Students</p>
                        <p className="text-2xl font-bold text-white">{students.length}</p>
                    </div>
                </div>
                 <div className="bg-gray-800 p-6 rounded-lg flex items-center space-x-4">
                    <BriefcaseIcon className="h-10 w-10 text-brand-secondary" />
                    <div>
                        <p className="text-gray-400 text-sm">Quizzes Completed</p>
                        <p className="text-2xl font-bold text-white">{completedQuizzes}</p>
                    </div>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg flex items-center space-x-4">
                    <ChartBarIcon className="h-10 w-10 text-yellow-500" />
                    <div>
                        <p className="text-gray-400 text-sm">Unique Careers Recommended</p>
                        <p className="text-2xl font-bold text-white">{chartData.length}</p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Student Reports Table */}
                <div className="lg:col-span-2 bg-gray-800 p-6 rounded-lg">
                    <h2 className="text-xl font-bold mb-4 text-white">Student Reports</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="border-b border-gray-700">
                                <tr>
                                    <th className="p-3 text-sm font-semibold text-gray-400">Student ID</th>
                                    <th className="p-3 text-sm font-semibold text-gray-400">Top Recommendation</th>
                                    <th className="p-3 text-sm font-semibold text-gray-400">Date Taken</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map(student => (
                                    <tr key={student.id} className="border-b border-gray-700 hover:bg-gray-700/50">
                                        <td className="p-3 text-white">{student.id}</td>
                                        <td className="p-3 text-gray-300">{student.report?.recommendations[0]?.career ?? 'N/A'}</td>
                                        <td className="p-3 text-gray-300">{student.report?.dateTaken ?? 'N/A'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Career Distribution Chart */}
                <div className="bg-gray-800 p-6 rounded-lg">
                    <h2 className="text-xl font-bold mb-4 text-white">Career Recommendation Distribution</h2>
                     <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
                            <XAxis type="number" stroke="#9ca3af" />
                            <YAxis type="category" dataKey="name" stroke="#9ca3af" width={100} tick={{ fontSize: 12 }} />
                            <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #4a5568' }} />
                            <Legend />
                            <Bar dataKey="count" fill="#10b981" name="Recommendations" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </main>
    </div>
  );
};

export default AdminDashboard;