
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';

interface ScenarioOption {
  id: string;
  text: string;
  isCorrect: boolean;
  feedback: string;
}

interface Scenario {
  title: string;
  description: string;
  options: ScenarioOption[];
  type: 'multiple-choice' | 'dialogue';
}

interface InteractiveScenarioProps {
  scenario: Scenario;
  onComplete?: () => void;
}

export default function InteractiveScenario({ scenario, onComplete }: InteractiveScenarioProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleOptionSelect = (optionId: string) => {
    if (showFeedback) return; // Prevent changing after submission
    setSelectedOption(optionId);
  };

  const handleSubmit = () => {
    if (!selectedOption) return;
    
    setShowFeedback(true);
    
    const isCorrect = scenario.options.find(o => o.id === selectedOption)?.isCorrect;
    
    if (isCorrect) {
      setCompleted(true);
      if (onComplete) {
        onComplete();
      }
    }
  };

  const handleContinue = () => {
    setShowFeedback(false);
    setSelectedOption(null);
  };

  const selectedOptionData = selectedOption 
    ? scenario.options.find(o => o.id === selectedOption)
    : null;

  return (
    <Card className="mt-6">
      <CardHeader>
        <h3 className="text-lg font-medium">{scenario.title}</h3>
        <p className="text-muted-foreground">{scenario.description}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {scenario.options.map((option) => (
            <div
              key={option.id}
              onClick={() => handleOptionSelect(option.id)}
              className={`p-4 border rounded-lg cursor-pointer transition-all ${
                selectedOption === option.id ? 'border-primary' : 'hover:border-muted-foreground/50'
              } ${
                showFeedback && option.isCorrect
                  ? "bg-green-50 border-green-500 text-green-800"
                  : showFeedback && selectedOption === option.id && !option.isCorrect
                  ? "bg-red-50 border-red-500 text-red-800"
                  : "bg-background"
              }`}
            >
              {option.text}
            </div>
          ))}
        </div>

        {showFeedback && selectedOptionData && (
          <div className={`p-4 rounded-lg mt-4 ${
            selectedOptionData.isCorrect ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
          }`}>
            <p className="font-medium mb-1">
              {selectedOptionData.isCorrect ? 'Correct!' : 'Not quite right.'}
            </p>
            <p>{selectedOptionData.feedback}</p>
          </div>
        )}

        <div className="pt-4">
          {!showFeedback ? (
            <Button 
              onClick={handleSubmit} 
              disabled={!selectedOption}
              className="w-full"
            >
              Submit Answer
            </Button>
          ) : !completed ? (
            <Button 
              onClick={handleContinue} 
              variant="outline"
              className="w-full"
            >
              Try Again
            </Button>
          ) : (
            <Button 
              className="w-full bg-green-600 hover:bg-green-700"
              onClick={handleContinue}
            >
              Continue
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
