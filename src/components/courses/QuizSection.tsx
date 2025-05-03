
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Question } from '@/data/courseTypes';
import { useToast } from '@/hooks/use-toast';

interface QuizSectionProps {
  questions: Question[];
  onComplete?: (score: number) => void;
}

export default function QuizSection({ questions, onComplete }: QuizSectionProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
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
  };

  // If quiz is completed, show the results
  if (quizCompleted) {
    const score = Math.round((correctAnswers / questions.length) * 100);
    const passed = score >= 70;
    
    return (
      <Card className="mt-8">
        <CardHeader>
          <h3 className="text-xl font-semibold">Quiz Completed!</h3>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <div className="py-6">
            <div className="text-5xl font-bold mb-2">{score}%</div>
            <p className="text-muted-foreground">
              You answered {correctAnswers} out of {questions.length} questions correctly.
            </p>
          </div>
          
          <div className={`py-4 rounded-lg ${passed ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
            {passed ? (
              <p>Congratulations! You passed the quiz.</p>
            ) : (
              <p>You didn't pass this time. Review the material and try again.</p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={handleRestartQuiz}>Restart Quiz</Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="mt-8">
      <CardHeader className="border-b">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">Knowledge Check</h3>
          <div className="text-sm text-muted-foreground">
            Question {currentQuestionIndex + 1} of {questions.length}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <h4 className="text-lg font-medium mb-4">{currentQuestion.question}</h4>
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
              {option}
              {showExplanation && index === currentQuestion.correctAnswer && (
                <div className="absolute top-1/2 -translate-y-1/2 right-4 text-green-600 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                  <span className="ml-2 font-medium">Correct Answer</span>
                </div>
              )}
              {showExplanation && selectedOption === index && index !== currentQuestion.correctAnswer && (
                <div className="absolute top-1/2 -translate-y-1/2 right-4 text-red-600 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                  <span className="ml-2 font-medium">Incorrect</span>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {showExplanation && (
          <div className="mt-6 p-4 bg-muted rounded-lg">
            <h5 className="font-medium mb-1">Explanation</h5>
            <p className="text-muted-foreground">{currentQuestion.explanation}</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="border-t">
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
