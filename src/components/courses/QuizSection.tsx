
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Question } from '@/data/courseTypes';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, AlertTriangle } from 'lucide-react';

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
  const { toast } = useToast();

  const currentQuestion = questions[currentQuestionIndex];

  // Handle answer selection
  const handleOptionSelect = (optionIndex: number) => {
    if (showExplanation) return; // Prevent changing after submitting
    setSelectedOption(optionIndex);
  };

  // Handle submitting an answer
  const handleSubmitAnswer = () => {
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
          onComplete(score);
        }
      }
    }
  };

  // Restart the quiz
  const handleRestartQuiz = () => {
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
        
        {showExplanation && currentQuestion.explanation && (
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
