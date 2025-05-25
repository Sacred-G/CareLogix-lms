import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';

// Interface for legacy scenario structure
interface ScenarioOption {
  id: string;
  text: string;
  isCorrect: boolean;
  feedback: string;
}

// Interface for legacy scenario
interface LegacyScenario {
  title: string;
  description: string;
  options: ScenarioOption[];
  type: 'multiple-choice' | 'dialogue';
}

// New interfaces for branching scenarios
interface BranchingOption {
  text: string;
  outcome: string;
  correct: boolean;
  next?: string;
}

interface Decision {
  id?: string;
  prompt: string;
  options: BranchingOption[];
}

interface BranchingContent {
  scenario: string;
  decisions: Decision[];
}

interface BranchingScenario {
  title: string;
  description: string;
  type: 'multiple-choice' | 'dialogue' | 'mindmap';
  content?: BranchingContent;
  options?: any[];
  mindmapType?: string;
}

interface InteractiveScenarioProps {
  scenario?: LegacyScenario;
  branchingScenario?: BranchingScenario;
  onComplete?: () => void;
}

export default function InteractiveScenario({ scenario, branchingScenario, onComplete }: InteractiveScenarioProps) {
  // Detect which type of scenario we're dealing with
  const isBranchingScenario = !!branchingScenario;
  
  // State for legacy scenarios
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [completed, setCompleted] = useState(false);
  
  // State for branching scenarios
  const [currentDecisionIndex, setCurrentDecisionIndex] = useState(0);
  const [selectedBranchingOption, setSelectedBranchingOption] = useState<number | null>(null);
  const [showBranchingFeedback, setShowBranchingFeedback] = useState(false);
  const [scenarioHistory, setScenarioHistory] = useState<{prompt: string, selection: string, outcome: string, correct: boolean}[]>([]);
  const [currentDecisionId, setCurrentDecisionId] = useState<string | undefined>(undefined);
  
  // Initialize the first decision for branching scenarios
  useEffect(() => {
    if (branchingScenario && branchingScenario.content.decisions.length > 0) {
      setCurrentDecisionId(branchingScenario.content.decisions[0].id);
    }
  }, [branchingScenario]);
  
  // Find the current decision by ID
  const getCurrentDecision = (): Decision | undefined => {
    if (!branchingScenario) return undefined;
    
    return branchingScenario.content.decisions.find(d => 
      (currentDecisionId && d.id === currentDecisionId) || 
      (!currentDecisionId && branchingScenario.content.decisions.indexOf(d) === 0)
    );
  };
  
  const currentDecision = getCurrentDecision();
  
  // Handlers for legacy scenarios
  const handleOptionSelect = (optionId: string) => {
    if (showFeedback) return; // Prevent changing after submission
    setSelectedOption(optionId);
  };

  const handleSubmit = () => {
    if (!selectedOption || !scenario) return;
    
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

  const selectedOptionData = selectedOption && scenario
    ? scenario.options.find(o => o.id === selectedOption)
    : null;
  
  // Handlers for branching scenarios
  const handleBranchingOptionSelect = (index: number) => {
    if (showBranchingFeedback) return; // Prevent changing after submission
    setSelectedBranchingOption(index);
  };
  
  const handleBranchingSubmit = () => {
    if (selectedBranchingOption === null || !currentDecision) return;
    
    const selectedOption = currentDecision.options[selectedBranchingOption];
    setShowBranchingFeedback(true);
    
    // Add to history
    setScenarioHistory([...scenarioHistory, {
      prompt: currentDecision.prompt,
      selection: selectedOption.text,
      outcome: selectedOption.outcome,
      correct: selectedOption.correct
    }]);
    
    // If this is the end of the scenario, mark as completed
    if (!selectedOption.next) {
      setCompleted(true);
      if (onComplete) {
        onComplete();
      }
    }
  };
  
  const handleBranchingContinue = () => {
    if (!currentDecision || selectedBranchingOption === null) return;
    
    const selectedOption = currentDecision.options[selectedBranchingOption];
    
    // If there's a next decision, navigate to it
    if (selectedOption.next) {
      setCurrentDecisionId(selectedOption.next);
      setShowBranchingFeedback(false);
      setSelectedBranchingOption(null);
    }
  };
  
  // Render the appropriate scenario type
  if (isBranchingScenario && branchingScenario) {
    return (
      <Card className="mt-6">
        <CardHeader>
          <h3 className="text-lg font-medium">{branchingScenario.title}</h3>
          <p className="text-muted-foreground">{branchingScenario.description}</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Scenario Context */}
          <div className="bg-muted/30 p-4 rounded-md border">
            <p>{branchingScenario.content.scenario}</p>
          </div>
          
          {/* History */}
          {scenarioHistory.length > 0 && (
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="history">
                <AccordionTrigger>Previous Decisions</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 mt-2">
                    {scenarioHistory.map((item, index) => (
                      <div key={index} className="border rounded-md p-3">
                        <p className="font-medium">{item.prompt}</p>
                        <div className={`mt-2 p-2 rounded ${item.correct ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                          <p className="text-sm font-medium flex items-center gap-1">
                            {item.correct ? (
                              <><CheckCircle2 className="h-4 w-4 text-green-600" /> Your choice:
                            </>) : (
                              <><AlertCircle className="h-4 w-4 text-red-600" /> Your choice:
                            </>)}
                          </p>
                          <p className="ml-5">{item.selection}</p>
                          <p className="mt-1 ml-5 text-sm">{item.outcome}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )}
          
          {/* Current Decision */}
          {currentDecision && (
            <div className="space-y-6">
              <div className="p-4 border rounded-lg bg-card">
                <h4 className="font-medium mb-3">{currentDecision.prompt}</h4>
                
                <div className="space-y-3">
                  {currentDecision.options.map((option, index) => (
                    <div
                      key={index}
                      onClick={() => handleBranchingOptionSelect(index)}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        selectedBranchingOption === index ? 'border-primary' : 'hover:border-muted-foreground/50'
                      } ${
                        showBranchingFeedback && option.correct
                          ? "bg-green-50 border-green-500 text-green-800"
                          : showBranchingFeedback && selectedBranchingOption === index && !option.correct
                          ? "bg-red-50 border-red-500 text-red-800"
                          : "bg-background"
                      }`}
                    >
                      {option.text}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Feedback */}
              {showBranchingFeedback && selectedBranchingOption !== null && (
                <div className={`p-4 rounded-lg ${
                  currentDecision.options[selectedBranchingOption].correct 
                    ? 'bg-green-50 border border-green-200 text-green-800' 
                    : 'bg-red-50 border border-red-200 text-red-800'
                }`}>
                  <p className="font-medium mb-1 flex items-center gap-2">
                    {currentDecision.options[selectedBranchingOption].correct ? (
                      <><CheckCircle2 className="h-5 w-5" /> Correct choice!</>
                    ) : (
                      <><AlertCircle className="h-5 w-5" /> Not the best choice</>
                    )}
                  </p>
                  <p>{currentDecision.options[selectedBranchingOption].outcome}</p>
                </div>
              )}
              
              {/* Buttons */}
              <div className="flex justify-end space-x-2">
                {showBranchingFeedback ? (
                  <Button 
                    onClick={handleBranchingContinue}
                    disabled={completed || !currentDecision.options[selectedBranchingOption!]?.next}
                  >
                    {completed ? 'Completed' : currentDecision.options[selectedBranchingOption!]?.next ? 'Continue' : 'Finished'}
                  </Button>
                ) : (
                  <Button 
                    onClick={handleBranchingSubmit}
                    disabled={selectedBranchingOption === null}
                  >
                    Submit Answer
                  </Button>
                )}
              </div>
            </div>
          )}
          
          {/* Completion Message */}
          {completed && !currentDecision && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 text-blue-800 rounded-lg">
              <p className="font-medium">Scenario Completed!</p>
              <p>You've successfully completed this interactive scenario.</p>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }
  
  // Legacy scenario rendering
  if (scenario) {
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

          <div className="flex justify-end space-x-2">
            {showFeedback ? (
              <Button 
                onClick={handleContinue}
                disabled={completed}
              >
                {completed ? 'Completed' : 'Try Again'}
              </Button>
            ) : (
              <Button 
                onClick={handleSubmit}
                disabled={!selectedOption}
              >
                Submit Answer
              </Button>
            )}
          </div>

          {completed && (
            <div className="mt-4 p-4 bg-blue-50 text-blue-800 rounded-lg">
              <p className="font-medium">Scenario Completed!</p>
              <p>You've successfully completed this interactive scenario.</p>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }
  
  // Fallback if neither scenario type is provided
  return (
    <Card className="mt-6">
      <CardContent>
        <p className="text-muted-foreground">No scenario data provided.</p>
      </CardContent>
    </Card>
  );
}
