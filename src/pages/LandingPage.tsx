import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Users, BarChart2, Brain } from 'lucide-react';
import Button from '../components/Button';
import { useTheme } from '../context/ThemeContext';

const LandingPage: React.FC = () => {
  const { theme } = useTheme();
  
  // Smooth scroll effect for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      
      if (anchor) {
        e.preventDefault();
        const targetId = anchor.getAttribute('href')?.substring(1);
        if (targetId) {
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            window.scrollTo({
              top: targetElement.offsetTop - 80,
              behavior: 'smooth'
            });
          }
        }
      }
    };
    
    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-blue-600 dark:text-blue-400 font-bold text-xl">Hire360.ai</span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-4">
                <a href="#features" className="text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Features
                </a>
                <a href="#about" className="text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  About Us
                </a>
                <Link to="/login">
                  <Button variant="outline" size="sm">
                    Log in
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm">
                    Sign up
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="md:flex md:items-center md:space-x-12">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                <span className="block">Transform Your</span>
                <span className="block text-blue-600 dark:text-blue-400">Hiring Process</span>
              </h1>
              <p className="mt-6 text-xl text-gray-500 dark:text-gray-300 max-w-3xl">
                Hire360.ai uses advanced AI to assess candidates through interactive interviews, providing deep insights beyond the resume.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                <Link to="/signup">
                  <Button size="lg" icon={<ArrowRight className="w-5 h-5" />}>
                    Get Started
                  </Button>
                </Link>
                <a href="#features">
                  <Button variant="outline" size="lg">
                    Learn More
                  </Button>
                </a>
              </div>
            </div>
            <div className="md:w-1/2 relative">
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" 
                  alt="AI Interview" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-500 rounded-full opacity-20 blur-2xl"></div>
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-purple-500 rounded-full opacity-20 blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              <span className="block">Powerful Features</span>
              <span className="block text-blue-600 dark:text-blue-400">For Modern Hiring</span>
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-300 mx-auto">
              Our platform combines AI technology with human expertise to create a comprehensive hiring solution.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-50 dark:bg-gray-700 p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-5">
                <Brain className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">AI-Powered Interviews</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our AI conducts natural conversations, adapting questions based on candidate responses for deeper insights.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-50 dark:bg-gray-700 p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-5">
                <BarChart2 className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Comprehensive Analytics</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Get detailed reports on candidate performance, skills assessment, and cultural fit metrics.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-50 dark:bg-gray-700 p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-5">
                <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Bias Reduction</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our platform helps eliminate unconscious bias with standardized evaluation criteria and objective assessments.
              </p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Link to="/signup">
              <Button size="lg">
                Start Using Hire360.ai
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:space-x-16">
            <div className="lg:w-1/2 mb-10 lg:mb-0">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" 
                  alt="Team collaboration" 
                  className="rounded-lg shadow-xl"
                />
                <div className="absolute -bottom-4 -right-4 w-64 h-64 bg-blue-500 rounded-full opacity-10 blur-3xl -z-10"></div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl mb-6">
                About Hire360.ai
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Founded in 2023, Hire360.ai was created by a team of HR professionals and AI experts who recognized the limitations of traditional hiring processes.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Our mission is to transform recruitment by combining cutting-edge AI technology with human expertise, creating a more efficient, fair, and insightful hiring process.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-600 dark:text-gray-300">Trusted by 500+ companies worldwide</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-600 dark:text-gray-300">Over 100,000 successful interviews conducted</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-600 dark:text-gray-300">Continuous AI improvement through machine learning</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 dark:bg-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl mb-6">
            Ready to Transform Your Hiring Process?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto">
            Join thousands of companies already using Hire360.ai to find the best talent efficiently and effectively.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/signup">
              <Button 
                variant="secondary" 
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
              >
                Get Started Free
              </Button>
            </Link>
            <Link to="/login">
              <Button 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-blue-700 dark:border-gray-300 dark:hover:bg-blue-800"
              >
                Log In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex justify-center md:justify-start">
              <span className="text-blue-600 dark:text-blue-400 font-bold text-xl">Hire360.ai</span>
            </div>
            <div className="mt-8 md:mt-0">
              <p className="text-center md:text-right text-gray-500 dark:text-gray-400">
                &copy; {new Date().getFullYear()} Hire360.ai. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;