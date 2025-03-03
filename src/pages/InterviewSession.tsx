import React, {useState, useEffect} from "react";
import {
  Mic,
  MicOff,
  Video as VideoIcon,
  VideoOff,
  MessageSquare,
  Clock,
  Send,
} from "lucide-react";
import Button from "../components/Button";
import Card from "../components/Card";

const InterviewSession: React.FC = () => {
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(
    "Tell me about your experience with React.js and how you've used it in your previous projects."
  );
  const [timer, setTimer] = useState(0);
  const [isInterviewStarted, setIsInterviewStarted] = useState(false);
  const [chatMessages, setChatMessages] = useState<
    {sender: "ai" | "user"; text: string}[]
  >([
    {
      sender: "ai",
      text: "Welcome to your interview session! I'll be asking you some questions about your experience and skills. Are you ready to begin?",
    },
  ]);
  const [userInput, setUserInput] = useState("");

  // Mock questions for the interview
  const questions = [
    "Tell me about your experience with React.js and how you've used it in your previous projects.",
    "Describe a challenging problem you faced in a project and how you solved it.",
    "How do you stay updated with the latest frontend technologies?",
    "Can you explain your approach to responsive design?",
    "What's your experience with state management in React applications?",
  ];

  // Timer effect
  useEffect(() => {
    let interval: number | undefined;

    if (isInterviewStarted) {
      interval = window.setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isInterviewStarted]);

  // Format timer to MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn);
  };

  const toggleAudio = () => {
    setIsAudioOn(!isAudioOn);
  };

  const startInterview = () => {
    setIsInterviewStarted(true);
    setChatMessages((prev) => [...prev, {sender: "ai", text: questions[0]}]);
  };

  const nextQuestion = () => {
    const currentIndex = questions.indexOf(currentQuestion);
    if (currentIndex < questions.length - 1) {
      const nextQ = questions[currentIndex + 1];
      setCurrentQuestion(nextQ);
      setChatMessages((prev) => [...prev, {sender: "ai", text: nextQ}]);
    } else {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "Thank you for completing the interview! We'll analyze your responses and provide feedback shortly.",
        },
      ]);
    }
  };

  const sendMessage = () => {
    if (userInput.trim()) {
      setChatMessages((prev) => [...prev, {sender: "user", text: userInput}]);
      setUserInput("");

      // Simulate AI response after user message
      setTimeout(() => {
        nextQuestion();
      }, 1500);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16 pb-12 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between mb-8">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:text-3xl sm:truncate">
              Interview Session
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Frontend Developer Position
            </p>
          </div>
          <div className="mt-4 flex md:mt-0 md:ml-4 items-center">
            <div className="flex items-center mr-4">
              <Clock className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2" />
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                {formatTime(timer)}
              </span>
            </div>
            {!isInterviewStarted && (
              <Button onClick={startInterview}>Start Interview</Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Video Container */}
          <div className="lg:col-span-2">
            <Card className="h-full">
              <div className="aspect-w-16 aspect-h-9 bg-gray-800 rounded-lg overflow-hidden relative">
                {isVideoOn ? (
                  <div className="w-full h-full flex items-center justify-center">
                    <img
                      src="https://plus.unsplash.com/premium_vector-1727955579176-073f1c85dcda?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
                      alt="Video placeholder"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-900">
                    <div className="h-24 w-24 rounded-full bg-gray-700 flex items-center justify-center">
                      <span className="text-gray-400 text-4xl font-medium">
                        U
                      </span>
                    </div>
                  </div>
                )}

                {/* Video Controls */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
                  <Button
                    variant={isAudioOn ? "primary" : "secondary"}
                    onClick={toggleAudio}
                    className={
                      !isAudioOn
                        ? "bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
                        : ""
                    }
                  >
                    {isAudioOn ? (
                      <Mic className="w-5 h-5" />
                    ) : (
                      <MicOff className="w-5 h-5" />
                    )}
                  </Button>
                  <Button
                    variant={isVideoOn ? "primary" : "secondary"}
                    onClick={toggleVideo}
                    className={
                      !isVideoOn
                        ? "bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
                        : ""
                    }
                  >
                    {isVideoOn ? (
                      <VideoIcon className="w-5 h-5" />
                    ) : (
                      <VideoOff className="w-5 h-5" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Current Question */}
              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Current Question:
                </h3>
                <p className="text-gray-900 dark:text-white">
                  {currentQuestion}
                </p>
              </div>

              {/* Emotion Analysis Placeholder */}
              <div className="mt-6 grid grid-cols-4 gap-4">
                <div className="col-span-1 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-center">
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Confidence
                  </div>
                  <div className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                    85%
                  </div>
                </div>
                <div className="col-span-1 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-center">
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Clarity
                  </div>
                  <div className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                    92%
                  </div>
                </div>
                <div className="col-span-1 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-center">
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Engagement
                  </div>
                  <div className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                    78%
                  </div>
                </div>
                <div className="col-span-1 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-center">
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Sentiment
                  </div>
                  <div className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                    Positive
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Chat Panel */}
          <div className="lg:col-span-1">
            <Card className="h-full flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Interview Chat
                </h3>
                <MessageSquare className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </div>

              <div className="flex-grow overflow-y-auto mb-4 space-y-4 max-h-[500px]">
                {chatMessages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.sender === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg px-4 py-2 ${
                        message.sender === "user"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-auto">
                <div className="relative">
                  <textarea
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder="Type your response..."
                    rows={3}
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    disabled={!isInterviewStarted}
                  ></textarea>
                  <button
                    className="absolute right-2 bottom-2 p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={sendMessage}
                    disabled={!isInterviewStarted || !userInput.trim()}
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewSession;
