
import type { QuizQuestion, Student, Admin } from './types';

export const ADMIN_CREDENTIALS: Admin = {
  id: 'admin',
  role: 'admin',
};

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    question: "Which activity do you enjoy the most in your free time?",
    options: ["Solving complex puzzles or math problems", "Creating art, music, or writing stories", "Working with my hands, building or fixing things", "Organizing events, leading a team, or debating"],
  },
  {
    question: "What subject in school are you most drawn to?",
    options: ["Science and Technology", "Arts and Humanities", "Vocational/Technical subjects", "Business and Economics"],
  },
  {
    question: "How do you prefer to work?",
    options: ["Independently, with minimal supervision", "Collaboratively in a team", "In a structured, predictable environment", "In a fast-paced, dynamic environment"],
  },
  {
    question: "What kind of problems do you like to solve?",
    options: ["Analytical problems that require logic and data", "Creative problems that require imagination and new ideas", "Practical, hands-on problems", "Strategic problems related to people and resources"],
  },
  {
    question: "What is your long-term career goal?",
    options: ["To be an expert or innovator in a specific field", "To express myself creatively and make an impact on culture", "To build tangible things and see the results of my work", "To lead a company or organization to success"],
  },
  {
    question: "How comfortable are you with taking risks?",
    options: ["I prefer stability and avoid risks", "I'm willing to take calculated risks for a good reward", "I enjoy taking risks and thrive on uncertainty", "My risk tolerance depends on the situation"],
  },
  {
    question: "What work environment sounds most appealing?",
    options: ["A quiet lab or office", "A vibrant, creative studio or workshop", "An outdoor or on-the-move setting", "A corporate boardroom or busy office"],
  },
  {
    question: "How important is salary to you compared to job satisfaction?",
    options: ["Salary is my top priority", "Job satisfaction is more important than salary", "Both are equally important", "I'd take a lower salary for a job with a strong social impact"],
  },
  {
    question: "Which of these best describes your communication style?",
    options: ["Data-driven and direct", "Expressive and storytelling", "Clear, concise, and instructional", "Persuasive and inspiring"],
  },
  {
    question: "What impact do you want to make in your career?",
    options: ["Advancing human knowledge and technology", "Enriching people's lives through art and culture", "Improving the physical world around us", "Building and leading successful enterprises"],
  },
];

export const MOCK_STUDENTS: Student[] = [
    {
        id: 'student1',
        role: 'student',
        report: {
            dateTaken: '2023-10-26',
            recommendations: [
                { career: 'Software Engineer', description: 'Designs and builds software applications.', reasoning: 'Based on strong analytical skills and interest in technology.' },
                { career: 'Data Scientist', description: 'Analyzes complex data to find trends.', reasoning: 'Loves solving puzzles and working with data.' },
                { career: 'UX/UI Designer', description: 'Focuses on user experience and interface design.', reasoning: 'Combines creativity with a passion for technology.' },
            ]
        }
    },
    {
        id: 'student2',
        role: 'student',
        report: {
            dateTaken: '2023-10-25',
            recommendations: [
                { career: 'Graphic Designer', description: 'Creates visual concepts to communicate ideas.', reasoning: 'Highly creative with a strong artistic inclination.' },
                { career: 'Marketing Manager', description: 'Develops marketing strategies to promote products.', reasoning: 'Excellent communication and strategic thinking skills.' },
                { career: 'Content Creator', description: 'Produces entertaining or educational material for online audiences.', reasoning: 'Enjoys storytelling and connecting with people.' },
            ]
        }
    },
     {
        id: 'student3',
        role: 'student',
        report: null,
    },
];
