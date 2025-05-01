
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface Flashcard {
  id: string;
  term: string;
  definition: string;
}

interface FlashcardSectionProps {
  title: string;
  flashcards: Flashcard[];
}

export default function FlashcardSection({ title, flashcards }: FlashcardSectionProps) {
  const [currentCard, setCurrentCard] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [completed, setCompleted] = useState<Record<string, boolean>>({});

  const handleNext = () => {
    const nextIndex = (currentCard + 1) % flashcards.length;
    setCurrentCard(nextIndex);
    setFlipped(false);
    
    // Mark current card as completed
    setCompleted(prev => ({
      ...prev,
      [flashcards[currentCard].id]: true
    }));
  };

  const handlePrevious = () => {
    const prevIndex = currentCard === 0 ? flashcards.length - 1 : currentCard - 1;
    setCurrentCard(prevIndex);
    setFlipped(false);
  };

  const toggleFlip = () => {
    setFlipped(!flipped);
  };

  const progress = Object.keys(completed).length;
  const progressPercentage = flashcards.length > 0 
    ? Math.min(100, Math.round((progress / flashcards.length) * 100))
    : 0;

  if (flashcards.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">{title}</h3>
        <div className="text-sm text-muted-foreground">
          {progress} of {flashcards.length} reviewed ({progressPercentage}%)
        </div>
      </div>

      <div className="perspective-1000">
        <div 
          className={`relative h-64 cursor-pointer transition-transform duration-300 ${
            flipped ? 'rotate-y-180' : ''
          }`}
          onClick={toggleFlip}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <Card className="absolute inset-0" style={{ backfaceVisibility: 'hidden' }}>
            <CardContent className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="text-sm text-muted-foreground mb-2">Term</div>
                <div className="text-xl font-medium">{flashcards[currentCard].term}</div>
                <div className="mt-4 text-sm text-muted-foreground">Click to flip</div>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="absolute inset-0 bg-muted" 
            style={{ 
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)'
            }}
          >
            <CardContent className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="text-sm text-muted-foreground mb-2">Definition</div>
                <div className="text-lg">{flashcards[currentCard].definition}</div>
                <div className="mt-4 text-sm text-muted-foreground">Click to flip back</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex justify-between pt-2">
        <Button variant="outline" onClick={handlePrevious}>
          Previous
        </Button>
        <Button onClick={handleNext}>
          {completed[flashcards[currentCard].id] ? 'Next' : 'Mark as Known'}
        </Button>
      </div>

      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
}
