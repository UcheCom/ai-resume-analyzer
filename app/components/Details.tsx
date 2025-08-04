import React from 'react';
import { cn } from '~/lib/utils';
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionContent
} from './Accordion';

// Define the types for our component
interface Tip {
  type: "good" | "improve";
  tip: string;
  explanation: string;
}

interface CategoryFeedback {
  score: number;
  tips: Tip[];
}

interface Feedback {
  toneAndStyle: CategoryFeedback;
  content: CategoryFeedback;
  structure: CategoryFeedback;
  skills: CategoryFeedback;
}

interface DetailsProps {
  feedback: Feedback;
}

// Helper component: ScoreBadge
interface ScoreBadgeProps {
  score: number;
}

const ScoreBadge: React.FC<ScoreBadgeProps> = ({ score }) => {
  // Determine background color based on score
  const bgColor = score > 69
    ? 'bg-green-100'
    : score > 39
      ? 'bg-yellow-100'
      : 'bg-red-100';

  // Determine text color based on score
  const textColor = score > 69
    ? 'text-green-600'
    : score > 39
      ? 'text-yellow-600'
      : 'text-red-600';

  return (
    <div className={cn(
      'flex items-center gap-1 px-2 py-1 rounded-md',
      bgColor
    )}>
      {score > 69 && (
        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      )}
      <span className={cn('font-medium', textColor)}>
        {score}/100
      </span>
    </div>
  );
};

// Helper component: CategoryHeader
interface CategoryHeaderProps {
  title: string;
  categoryScore: number;
}

const CategoryHeader: React.FC<CategoryHeaderProps> = ({ title, categoryScore }) => {
  return (
    <div className="flex justify-between items-center w-full">
      <h3 className="text-lg font-medium">{title}</h3>
      <ScoreBadge score={categoryScore} />
    </div>
  );
};

// Helper component: CategoryContent
interface CategoryContentProps {
  tips: Tip[];
}

const CategoryContent: React.FC<CategoryContentProps> = ({ tips }) => {
  return (
    <div className="space-y-4">
      {/* Two-column grid for tips */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tips.map((tip, index) => (
          <div key={index} className="flex items-start gap-2">
            {tip.type === "good" ? (
              <svg className="w-5 h-5 text-green-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-yellow-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            )}
            <span className={cn(
              'font-medium',
              tip.type === "good" ? "text-green-700" : "text-yellow-700"
            )}>
              {tip.tip}
            </span>
          </div>
        ))}
      </div>

      {/* Explanation boxes */}
      <div className="space-y-3">
        {tips.map((tip, index) => (
          <div 
            key={index} 
            className={cn(
              'p-3 rounded-md',
              tip.type === "good" 
                ? "bg-green-50 border border-green-200" 
                : "bg-yellow-50 border border-yellow-200"
            )}
          >
            <p className={cn(
              'text-sm',
              tip.type === "good" ? "text-green-700" : "text-yellow-700"
            )}>
              {tip.explanation}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main Details component
const Details: React.FC<DetailsProps> = ({ feedback }) => {
  const categories = [
    { id: 'tone-style', title: 'Tone & Style', data: feedback.toneAndStyle },
    { id: 'content', title: 'Content', data: feedback.content },
    { id: 'structure', title: 'Structure', data: feedback.structure },
    { id: 'skills', title: 'Skills', data: feedback.skills }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-bold mb-4">Detailed Feedback</h2>
      
      <Accordion className="space-y-3">
        {categories.map((category) => (
          <AccordionItem key={category.id} id={category.id} className="border rounded-md overflow-hidden">
            <AccordionHeader itemId={category.id} className="bg-gray-50 hover:bg-gray-100">
              <CategoryHeader 
                title={category.title} 
                categoryScore={category.data.score} 
              />
            </AccordionHeader>
            <AccordionContent itemId={category.id}>
              <CategoryContent tips={category.data.tips} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default Details;