import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Calendar, Clock, BarChart2, TrendingUp, Award, Video } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';

interface DashboardProps {
  userType: 'recruiter' | 'candidate';
}

const Dashboard: React.FC<DashboardProps> = ({ userType }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16 pb-12 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between mb-8">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:text-3xl sm:truncate">
              {userType === 'recruiter' ? 'Recruiter Dashboard' : 'Candidate Dashboard'}
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <div className="mt-4 flex md:mt-0 md:ml-4">
            <Link to="/interview">
              <Button icon={<Video className="w-4 h-4" />}>
                {userType === 'recruiter' ? 'Create New Interview' : 'Join Interview'}
              </Button>
            </Link>
          </div>
        </div>

        {userType === 'recruiter' ? <RecruiterDashboard /> : <CandidateDashboard />}
      </div>
    </div>
  );
};

const RecruiterDashboard: React.FC = () => {
  // Mock data for recruiter dashboard
  const stats = [
    { name: 'Total Candidates', value: '248', icon: <Users className="w-6 h-6 text-blue-500" /> },
    { name: 'Interviews This Week', value: '12', icon: <Calendar className="w-6 h-6 text-green-500" /> },
    { name: 'Average Interview Time', value: '32m', icon: <Clock className="w-6 h-6 text-purple-500" /> },
    { name: 'Hire Rate', value: '18%', icon: <TrendingUp className="w-6 h-6 text-yellow-500" /> },
  ];

  const upcomingInterviews = [
    { id: 1, candidate: 'Alex Johnson', position: 'Frontend Developer', time: '10:00 AM', date: 'Today' },
    { id: 2, candidate: 'Sarah Williams', position: 'UX Designer', time: '2:30 PM', date: 'Today' },
    { id: 3, candidate: 'Michael Brown', position: 'Product Manager', time: '11:15 AM', date: 'Tomorrow' },
  ];

  const topCandidates = [
    { id: 1, name: 'Emma Davis', position: 'Full Stack Developer', score: 92, skills: ['React', 'Node.js', 'MongoDB'] },
    { id: 2, name: 'James Wilson', position: 'DevOps Engineer', score: 88, skills: ['AWS', 'Docker', 'Kubernetes'] },
    { id: 3, name: 'Olivia Martinez', position: 'Data Scientist', score: 85, skills: ['Python', 'TensorFlow', 'SQL'] },
  ];

  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name} className="overflow-hidden">
            <div className="flex items-center">
              <div className="flex-shrink-0">{stat.icon}</div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">{stat.name}</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900 dark:text-white">{stat.value}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Upcoming Interviews */}
        <Card title="Upcoming Interviews" className="col-span-1">
          <div className="space-y-4">
            {upcomingInterviews.map((interview) => (
              <div key={interview.id} className="flex items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                    <span className="text-blue-600 dark:text-blue-400 font-medium">
                      {interview.candidate.charAt(0)}
                    </span>
                  </div>
                </div>
                <div className="ml-4 flex-1">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">{interview.candidate}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{interview.position}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{interview.time}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{interview.date}</p>
                </div>
              </div>
            ))}
            <Button variant="outline" fullWidth>View All Interviews</Button>
          </div>
        </Card>

        {/* Top Candidates */}
        {/* <Card title="Top Candidates" className="col-span-1">
          <div className="space-y-4">
            {topCandidates.map((candidate) => (
              <div key={candidate.id} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                      <span className="text-green-600 dark:text-green-400 font-medium">
                        {candidate.name.charAt(0)}
                      </span>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">{candidate.name}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{candidate.position}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Award className="w-4 h-4 text-yellow-500 mr-1" />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{candidate.score}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {candidate.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
            <Button variant="outline" fullWidth>View All Candidates</Button>
          </div>
        </Card> */}
      </div>

      {/* Analytics Chart Placeholder */}
      <Card title="Hiring Analytics" subtitle="Last 30 days">
        <div className="h-80 w-full bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
          <BarChart2 className="w-16 h-16 text-gray-400" />
          <p className="ml-4 text-gray-500 dark:text-gray-400">Analytics visualization will appear here</p>
        </div>
      </Card>
    </div>
  );
};

const CandidateDashboard: React.FC = () => {
  // Mock data for candidate dashboard
  const upcomingInterviews = [
    { id: 1, company: 'TechCorp', position: 'Frontend Developer', time: '10:00 AM', date: 'Tomorrow' },
    { id: 2, company: 'InnovateSoft', position: 'React Developer', time: '3:30 PM', date: 'May 15, 2025' },
  ];

  const pastInterviews = [
    { 
      id: 1, 
      company: 'GlobalTech', 
      position: 'UI Developer', 
      date: 'April 28, 2025',
      feedback: 'Great technical skills, could improve communication',
      score: 85
    },
    { 
      id: 2, 
      company: 'WebSolutions', 
      position: 'Frontend Engineer', 
      date: 'April 15, 2025',
      feedback: 'Strong problem-solving abilities, excellent cultural fit',
      score: 92
    },
  ];

  const skills = [
    { name: 'React', score: 92 },
    { name: 'JavaScript', score: 88 },
    { name: 'CSS', score: 85 },
    { name: 'Communication', score: 78 },
    { name: 'Problem Solving', score: 90 },
  ];

  return (
    <div className="space-y-8">
      {/* Upcoming Interviews */}
      <Card title="Upcoming Interviews" className="col-span-1">
        <div className="space-y-4">
          {upcomingInterviews.length > 0 ? (
            <>
              {upcomingInterviews.map((interview) => (
                <div key={interview.id} className="flex items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                      <span className="text-blue-600 dark:text-blue-400 font-medium">
                        {interview.company.charAt(0)}
                      </span>
                    </div>
                  </div>
                  <div className="ml-4 flex-1">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">{interview.company}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{interview.position}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{interview.time}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{interview.date}</p>
                  </div>
                </div>
              ))}
              <Link to="/interview">
                <Button fullWidth>Prepare for Interview</Button>
              </Link>
            </>
          ) : (
            <div className="text-center py-8">
              <Calendar className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No upcoming interviews</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                You don't have any interviews scheduled at the moment.
              </p>
            </div>
          )}
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Past Interviews */}
        <Card title="Past Interviews" className="col-span-1">
          <div className="space-y-4">
            {pastInterviews.map((interview) => (
              <div key={interview.id} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                      <span className="text-purple-600 dark:text-purple-400 font-medium">
                        {interview.company.charAt(0)}
                      </span>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">{interview.company}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{interview.position}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Award className="w-4 h-4 text-yellow-500 mr-1" />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{interview.score}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{interview.feedback}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{interview.date}</p>
              </div>
            ))}
            <Button variant="outline" fullWidth>View All Reports</Button>
          </div>
        </Card>

        {/* Skills Assessment */}
        <Card title="Skills Assessment" className="col-span-1">
          <div className="space-y-4">
            {skills.map((skill) => (
              <div key={skill.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{skill.name}</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{skill.score}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div 
                    className="bg-blue-600 dark:bg-blue-500 h-2.5 rounded-full" 
                    style={{ width: `${skill.score}%` }}
                  ></div>
                </div>
              </div>
            ))}
            <Button variant="outline" fullWidth>Improve Your Skills</Button>
          </div>
        </Card>
      </div>

      {/* Practice Area */}
      <Card title="Practice Area" subtitle="Prepare for your next interview">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
            <Video className="mx-auto h-8 w-8 text-blue-500 dark:text-blue-400 mb-2" />
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">Mock Interviews</h3>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Practice with AI interviewer
            </p>
            <Button size="sm" className="mt-3">Start Practice</Button>
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
            <BarChart2 className="mx-auto h-8 w-8 text-green-500 dark:text-green-400 mb-2" />
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">Skill Assessments</h3>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Test your technical knowledge
            </p>
            <Button size="sm" variant="outline" className="mt-3">Take Test</Button>
          </div>
          <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-center">
            <Award className="mx-auto h-8 w-8 text-purple-500 dark:text-purple-400 mb-2" />
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">Learning Resources</h3>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Improve your interview skills
            </p>
            <Button size="sm" variant="outline" className="mt-3">Explore</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;