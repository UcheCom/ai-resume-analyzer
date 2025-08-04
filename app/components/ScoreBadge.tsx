import React from 'react';

interface ScoreBadgeProps {
  score: number;
}

const ScoreBadge: React.FC<ScoreBadgeProps> = ({ score }) => {
  // Determine badge style and label based on score
  let badgeStyle = '';
  let badgeLabel = '';

  if (score > 70) {
    badgeStyle = 'bg-badge-green text-green-600';
    badgeLabel = 'Strong';
  } else if (score > 49) {
    badgeStyle = 'bg-badge-yellow text-yellow-600';
    badgeLabel = 'Good Start';
  } else {
    badgeStyle = 'bg-badge-red text-red-600';
    badgeLabel = 'Needs Work';
  }

  return (
    <div className={`inline-block px-2 py-1 rounded-md ${badgeStyle}`}>
      <p className="text-xs font-medium">{badgeLabel}</p>
    </div>
  );
};

export default ScoreBadge;