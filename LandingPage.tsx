
import React from 'react';

interface LandingPageProps {
  onNavigateToLogin: () => void;
}

const FeatureCard: React.FC<{ title: string; description: string; icon: React.ReactNode }> = ({ title, description, icon }) => (
  <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
    <div className="flex justify-center items-center mb-4 h-12 w-12 rounded-full bg-brand-primary mx-auto">
        {icon}
    </div>
    <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </div>
);


const LandingPage: React.FC<LandingPageProps> = ({ onNavigateToLogin }) => {
  return (
    <div className="min-h-screen bg-brand-dark flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="text-center max-w-4xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight">
            Discover Your <span className="text-brand-primary">Future Career Path</span> Today
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
            Our interactive system helps you find the most suitable career based on your unique skills, interests, and academic performance.
          </p>
        </header>

        <main>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <FeatureCard 
              title="Simple & Interactive Quiz"
              description="A quick 10-question quiz designed to understand you better and pinpoint your strengths."
              icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>}
            />
            <FeatureCard 
              title="Personalized Recommendations"
              description="Receive data-driven, personalized career suggestions that align with your profile."
              icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>}
            />
            <FeatureCard 
              title="Track Your Growth"
              description="Download your reports and retake the quiz anytime to see how your recommendations evolve."
              icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>}
            />
          </div>

          <button
            onClick={onNavigateToLogin}
            className="bg-brand-primary text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-indigo-500 transition-colors duration-300 shadow-lg transform hover:scale-105"
          >
            Get Started
          </button>
        </main>
      </div>
    </div>
  );
};

export default LandingPage;
