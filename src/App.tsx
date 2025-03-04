// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import LandingPage from './pages/LandingPage';
// import LoginPage from './pages/LoginPage';
// import SignupPage from './pages/SignupPage';
// import Dashboard from './pages/Dashboard';
// import InterviewSession from './pages/InterviewSession';
// import Navbar from './components/Navbar';
// import { ThemeProvider } from './context/ThemeContext';
// import { GoogleOAuthProvider } from '@react-oauth/google';

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   // Mock login function (UI only)
//   const handleLogin = () => {
//     setIsLoggedIn(true);
//   };

//   return (
//     <ThemeProvider>
//       <Router>
//         {isLoggedIn && <Navbar />}
//         <Routes>
//           <Route path="/" element={<LandingPage />} />
//           <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
//           <Route path="/signup" element={<SignupPage onSignup={handleLogin} />} />
//           <Route path="/dashboard" element={<Dashboard userType="recruiter" />} />
//           <Route path="/interview" element={<InterviewSession />} />
//         </Routes>
//       </Router>
//     </ThemeProvider>
//   );
// }

// export default App;
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard';
import InterviewSession from './pages/InterviewSession';
import Navbar from './components/Navbar';
import { ThemeProvider } from './context/ThemeContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Mock login function (UI only)
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <ThemeProvider>
        <Router>
          {isLoggedIn && <Navbar />}
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
            <Route path="/signup" element={<SignupPage onSignup={handleLogin} />} />
            <Route path="/dashboard" element={<Dashboard userType="recruiter" />} />
            <Route path="/interview" element={<InterviewSession />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
