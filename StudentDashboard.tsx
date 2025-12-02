
import React from 'react';
import type { Student } from '../types';
import jsPDF from 'jspdf';

interface StudentDashboardProps {
  student: Student;
  onTakeQuiz: () => void;
  onLogout: () => void;
}

const StudentDashboard: React.FC<StudentDashboardProps> = ({ student, onTakeQuiz, onLogout }) => {

  const handleDownloadReport = () => {
    if (!student.report) return;

    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text("Career Recommendation Report", 105, 20, { align: 'center' });
    doc.setFontSize(16);
    doc.text(`For: ${student.id}`, 105, 30, { align: 'center' });
    doc.setFontSize(12);
    doc.text(`Date: ${student.report.dateTaken}`, 105, 38, { align: 'center' });

    let yPos = 60;
    student.report.recommendations.forEach((rec, index) => {
        if (yPos > 260) {
            doc.addPage();
            yPos = 20;
        }
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text(`${index + 1}. ${rec.career}`, 14, yPos);
        yPos += 8;

        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
        
        doc.text("Description:", 14, yPos);
        const descLines = doc.splitTextToSize(rec.description, 170);
        doc.text(descLines, 20, yPos + 5);
        yPos += 5 + (descLines.length * 5);

        doc.text("Reasoning:", 14, yPos);
        const reasonLines = doc.splitTextToSize(rec.reasoning, 170);
        doc.text(reasonLines, 20, yPos + 5);
        yPos += 5 + (reasonLines.length * 5) + 10;
    });

    doc.save(`Career-Report-${student.id}.pdf`);
  };

  return (
    <div className="min-h-screen bg-brand-dark p-4 sm:p-6 md:p-8">
        <header className="max-w-7xl mx-auto flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-white">Welcome, <span className="text-brand-primary">{student.id}</span>!</h1>
            <button
                onClick={onLogout}
                className="bg-red-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
            >
                Logout
            </button>
        </header>
        <main className="max-w-7xl mx-auto">
            {student.report ? (
                <div className="bg-gray-800 rounded-lg shadow-xl p-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-white">Your Career Recommendations</h2>
                            <p className="text-gray-400">Based on your quiz results from {student.report.dateTaken}</p>
                        </div>
                        <div className="flex space-x-4 mt-4 md:mt-0">
                             <button
                                onClick={handleDownloadReport}
                                className="bg-brand-secondary text-white font-bold py-2 px-4 rounded-lg hover:bg-emerald-500 transition-colors"
                            >
                                Download Report
                            </button>
                             <button
                                onClick={onTakeQuiz}
                                className="bg-gray-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-500 transition-colors"
                            >
                                Retake Quiz
                            </button>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {student.report.recommendations.map((rec, index) => (
                            <div key={index} className="bg-gray-700 p-6 rounded-lg transform hover:scale-105 transition-transform duration-300">
                                <h3 className="text-xl font-bold text-brand-primary">{rec.career}</h3>
                                <p className="text-gray-300 mt-2">{rec.description}</p>
                                <p className="text-sm text-gray-400 mt-4 italic"><strong>Reasoning:</strong> {rec.reasoning}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="text-center bg-gray-800 rounded-lg shadow-xl p-12">
                    <h2 className="text-3xl font-bold text-white">Ready to Discover Your Path?</h2>
                    <p className="text-gray-300 mt-4 max-w-xl mx-auto">You haven't taken the career quiz yet. Take our quick, 10-question quiz to receive your personalized career recommendations.</p>
                    <button
                        onClick={onTakeQuiz}
                        className="mt-8 bg-brand-primary text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-indigo-500 transition-colors duration-300 shadow-lg transform hover:scale-105"
                    >
                        Take the Quiz Now
                    </button>
                </div>
            )}
        </main>
    </div>
  );
};

export default StudentDashboard;
