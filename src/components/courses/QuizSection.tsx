
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Question } from '@/data/courseTypes';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, AlertTriangle, LockIcon } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

interface QuizSectionProps {
  questions: Question[];
  onComplete?: (score: number) => void;
  isMicroLearning?: boolean;
}

export default function QuizSection({ questions, onComplete, isMicroLearning = false }: QuizSectionProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<Record<string, number>>({});
  const [isLocked, setIsLocked] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user account is locked
    const checkAccountStatus = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('failed_attempts, is_locked')
          .eq('id', user.id)
          .single();
          
        if (error) throw error;
        
        if (data) {
          setFailedAttempts(data.failed_attempts);
          setIsLocked(data.is_locked);
          
          if (data.is_locked) {
            toast({
              title: 'Account Locked',
              description: 'Your account has been locked due to multiple failed quiz attempts. Please contact an administrator to unlock your account.',
              variant: 'destructive',
            });
          }
        }
      } catch (error: any) {
        console.error('Error checking account status:', error.message);
      }
    };
    
    checkAccountStatus();
  }, [user, toast]);
  
  const currentQuestion = questions[currentQuestionIndex];

  // Handle answer selection
  const handleOptionSelect = (optionIndex: number) => {
    if (showExplanation) return; // Prevent changing after submitting
    setSelectedOption(optionIndex);
  };

  // Handle submitting an answer
  const handleSubmitAnswer = async () => {
    if (selectedOption === null) return;
    
    if (!showExplanation) {
      // First click - show explanation
      setShowExplanation(true);
      
      const isCorrect = selectedOption === currentQuestion.correctAnswer;
      
      // Update answers tracking
      setAnsweredQuestions({
        ...answeredQuestions,
        [currentQuestion.id]: selectedOption
      });
      
      if (isCorrect) {
        setCorrectAnswers(correctAnswers + 1);
        toast({
          title: "Correct!",
          description: "Great job!",
          variant: "default",
        });
      } else {
        toast({
          title: "Incorrect",
          description: `The correct answer is: ${currentQuestion.options[currentQuestion.correctAnswer]}`,
          variant: "destructive",
        });
      }
    } else {
      // Second click - go to next question or finish
      setShowExplanation(false);
      setSelectedOption(null);
      
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        // Quiz completed
        setQuizCompleted(true);
        if (onComplete) {
          const score = Math.round((correctAnswers / questions.length) * 100);
          
          // Check if score is passing (70% or higher)
          if (score < 70 && user) {
            // Update failed attempts in database
            const newFailedAttempts = failedAttempts + 1;
            setFailedAttempts(newFailedAttempts);
            
            try {
              // Update the profile with new failed_attempts count
              const { error } = await supabase
                .from('profiles')
                .update({ 
                  failed_attempts: newFailedAttempts,
                  // Lock account if failed 3 or more times
                  is_locked: newFailedAttempts >= 3 
                })
                .eq('id', user.id);
                
              if (error) throw error;
              
              // If this was the 3rd failed attempt, show lock message
              if (newFailedAttempts >= 3) {
                setIsLocked(true);
                toast({
                  title: 'Account Locked',
                  description: 'Your account has been locked due to multiple failed quiz attempts. Please contact an administrator to unlock your account.',
                  variant: 'destructive',
                });
                // Redirect to dashboard after a brief delay
                setTimeout(() => {
                  navigate('/dashboard');
                }, 3000);
              } else {
                toast({
                  title: 'Quiz Failed',
                  description: `You have ${3 - newFailedAttempts} attempts remaining before your account is locked.`,
                  variant: 'destructive',
                });
              }
            } catch (error: any) {
              console.error('Error updating failed attempts:', error.message);
            }
          }
          
          onComplete(score);
        }
      }
    }
  };

  // Restart the quiz
  const handleRestartQuiz = () => {
    // Don't allow restart if account is locked
    if (isLocked) {
      toast({
        title: 'Account Locked',
        description: 'Your account has been locked due to multiple failed quiz attempts. Please contact an administrator to unlock your account.',
        variant: 'destructive',
      });
      return;
    }
    
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setShowExplanation(false);
    setCorrectAnswers(0);
    setQuizCompleted(false);
    setAnsweredQuestions({});
  };

  // Function to get progress percentage
  const getProgressPercentage = () => {
    return Math.round(((currentQuestionIndex + (showExplanation ? 1 : 0)) / questions.length) * 100);
  };

  // If quiz is completed, show the results
  if (quizCompleted) {
    const score = Math.round((correctAnswers / questions.length) * 100);
    const passed = score >= 70;
    
    return (
      <Card className="mt-8 border-none shadow-lg overflow-hidden">
        <CardHeader className={`${passed ? 'bg-green-500/10' : 'bg-amber-500/10'} border-b`}>
          <h3 className="text-xl font-semibold">Quiz Completed!</h3>
        </CardHeader>
        <CardContent className="space-y-8 text-center pt-8">
          <div className="py-6">
            <div className={`text-6xl font-bold mb-2 ${passed ? 'text-green-500' : 'text-amber-500'}`}>{score}%</div>
            <p className="text-muted-foreground">
              You answered {correctAnswers} out of {questions.length} questions correctly.
            </p>
          </div>
          
          <div className={`py-6 px-4 rounded-lg ${passed ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
            <div className="flex items-center justify-center mb-2">
              {passed ? (
                <CheckCircle className="w-8 h-8 mr-2" />
              ) : (
                <AlertTriangle className="w-8 h-8 mr-2" />
              )}
              <h4 className="text-lg font-medium">
                {passed ? 'Congratulations!' : 'Almost there!'}
              </h4>
            </div>
            
            <p>
              {passed 
                ? "You've successfully passed this quiz and demonstrated your understanding of the material."
                : "You didn't pass this time, but don't worry. Review the material and try again."
              }
            </p>
          </div>
          
          {/* Question review summary */}
          <div className="border rounded-lg p-4">
            <h4 className="font-medium mb-4 text-left">Question Review</h4>
            <div className="space-y-3 text-left">
              {questions.map((q, i) => {
                const wasAnswered = answeredQuestions[q.id] !== undefined;
                const wasCorrect = answeredQuestions[q.id] === q.correctAnswer;
                
                return (
                  <div key={q.id} className="flex items-center">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 text-xs ${wasAnswered ? (wasCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800') : 'bg-gray-100 text-gray-800'}`}>
                      {i + 1}
                    </div>
                    <div className="truncate flex-1">{q.question}</div>
                    {wasAnswered && (
                      wasCorrect ? (
                        <CheckCircle size={16} className="text-green-500 ml-2" />
                      ) : (
                        <span className="text-red-500 ml-2 text-sm">Incorrect</span>
                      )
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          
          {isMicroLearning && (
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">
                This is a micro learning module. You can continue to the next module or retake this quiz.
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-center gap-4 border-t">
          <Button onClick={handleRestartQuiz} variant="outline">Restart Quiz</Button>
          {isMicroLearning && (
            <Button>Next Module</Button>
          )}
        </CardFooter>
      </Card>
    );
  }

  // If the account is locked, show locked message instead of quiz
  if (isLocked) {
    return (
      <Card className="mt-8 border-none shadow-lg overflow-hidden">
        <CardHeader className="border-b bg-red-50">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-red-700 flex items-center gap-2">
              <LockIcon size={20} />
              Account Locked
            </h3>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 py-6">
          <div className="text-center">
            <div className="bg-red-50 p-4 rounded-lg inline-flex items-center justify-center mb-4">
              <LockIcon size={40} className="text-red-500" />
            </div>
            <h4 className="text-lg font-medium mb-2">Your account has been locked</h4>
            <p className="text-muted-foreground">
              Due to multiple failed quiz attempts, your account has been locked. 
              You need to contact an administrator to unlock your account before you can continue.
            </p>
          </div>
        </CardContent>
        <CardFooter className="border-t p-4 flex justify-center">
          <Button onClick={() => navigate('/dashboard')} variant="outline">
            Return to Dashboard
          </Button>
        </CardFooter>
      </Card>
    );
  }
  
  return (
    <Card className="mt-8 border-none shadow-lg overflow-hidden">
      <CardHeader className="border-b bg-muted/30">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">
            {isMicroLearning ? 'Quick Knowledge Check' : 'Knowledge Check'}
          </h3>
          <div className="text-sm text-muted-foreground">
            Question {currentQuestionIndex + 1} of {questions.length}
          </div>
        </div>
        {/* Progress bar */}
        <div className="w-full h-1 bg-muted rounded-full overflow-hidden mt-4">
          <div 
            className="h-full bg-primary transition-all duration-300 ease-out" 
            style={{width: `${getProgressPercentage()}%`}}
          />
        </div>
      </CardHeader>
      <CardContent className="pt-8">
        <h4 className="text-lg font-medium mb-6">{currentQuestion.question}</h4>
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <div
              key={index}
              onClick={() => handleOptionSelect(index)}
              className={`p-4 border rounded-lg cursor-pointer transition-all relative ${
                selectedOption === index ? 'border-primary' : 'hover:border-muted-foreground/50'
              } ${
                showExplanation && index === currentQuestion.correctAnswer
                  ? "bg-green-50 border-green-500 text-green-800"
                  : showExplanation && selectedOption === index && index !== currentQuestion.correctAnswer
                  ? "bg-red-50 border-red-500 text-red-800"
                  : "bg-background"
              }`}
            >
              <div className="flex items-center">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs mr-3 ${
                  selectedOption === index ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  {String.fromCharCode(65 + index)} {/* Converts 0->A, 1->B, etc. */}
                </div>
                <span>{option}</span>
              </div>
              
              {showExplanation && index === currentQuestion.correctAnswer && (
                <div className="absolute top-1/2 -translate-y-1/2 right-4 text-green-600 flex items-center">
                  <CheckCircle size={20} className="mr-1" />
                  <span className="font-medium">Correct Answer</span>
                </div>
              )}
              {showExplanation && selectedOption === index && index !== currentQuestion.correctAnswer && (
                <div className="absolute top-1/2 -translate-y-1/2 right-4 text-red-600 flex items-center">
                  <AlertTriangle size={20} className="mr-1" />
                  <span className="font-medium">Incorrect</span>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {showExplanation && selectedOption === currentQuestion.correctAnswer && currentQuestion.explanation && (
          <div className="mt-6 p-4 bg-muted rounded-lg">
            <h5 className="font-medium mb-1">Explanation</h5>
            <p className="text-muted-foreground">{currentQuestion.explanation}</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="border-t p-4">
        <Button 
          onClick={handleSubmitAnswer} 
          disabled={selectedOption === null}
          className="w-full"
        >
          {showExplanation 
            ? currentQuestionIndex < questions.length - 1 
              ? "Next Question" 
              : "Finish Quiz" 
            : "Submit Answer"
          }
        </Button>
      </CardFooter>
    </Card>
  );
}
