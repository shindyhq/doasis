'use client';

import { useState } from 'react';
import { CheckInService } from '@/services/CheckInService';
import { CheckIn } from '@/types/custom';

interface CheckInWidgetProps {
  initialCheckIn: CheckIn | null;
}

export function CheckInWidget({ initialCheckIn }: CheckInWidgetProps) {
  const [currentMood, setCurrentMood] = useState<number | null>(initialCheckIn?.mood_score || null);
  const [loading, setLoading] = useState(false);

  const handleMoodSelect = async (score: number) => {
    setLoading(true);
    // Optimistic update
    setCurrentMood(score);
    
    try {
      await CheckInService.logCheckIn(score);
      // Success - state already updated optimistically
    } catch (error) {
      console.error('Failed to log check-in:', error);
      // Revert on error
      setCurrentMood(initialCheckIn?.mood_score || null);
    } finally {
      setLoading(false);
    }
  };

  const moods = [
    { score: 1, emoji: '😔', label: 'Heavy' },
    { score: 2, emoji: '😐', label: 'Unsettled' },
    { score: 3, emoji: '🙂', label: 'Okay' },
    { score: 4, emoji: '😌', label: 'Peaceful' },
    { score: 5, emoji: '🥰', label: 'Radiant' },
  ];

  return (
    <div className="bg-white/50 backdrop-blur-sm border border-white/60 p-6 rounded-[32px] w-full md:w-auto min-w-[300px]">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-secondary font-display text-sm font-bold uppercase tracking-widest">
          How is your spirit today?
        </h3>
        {loading && (
          <span className="text-[10px] uppercase font-bold text-primary/40 animate-pulse">
            Saving...
          </span>
        )}
      </div>
      <div className="flex justify-between gap-2">
        {moods.map((mood) => (
          <button 
            key={mood.score}
            onClick={() => handleMoodSelect(mood.score)}
            disabled={loading}
            className={`w-10 h-10 rounded-full transition-all shadow-sm border flex items-center justify-center text-xl
              ${currentMood === mood.score 
                ? 'bg-accent text-white scale-110 border-accent' 
                : 'bg-white border-primary/5 grayscale hover:grayscale-0 hover:scale-110 hover:bg-accent/10'
              }
              ${loading ? 'cursor-wait opacity-80' : 'cursor-pointer'}
            `}
            title={mood.label}
          >
            {mood.emoji}
          </button>
        ))}
      </div>
    </div>
  );
}
