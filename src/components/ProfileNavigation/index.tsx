'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';

interface ProfileNavigationProps {
  totalProfiles: number;
  onProfileChange: (index: number) => void;
  currentProfile: number;
  t: any;
  date: string;
  company: string;
}

export const ProfileNavigation = ({ 
  totalProfiles, 
  onProfileChange, 
  currentProfile, 
  t,
  date,
  company 
}: ProfileNavigationProps) => {
  const handlePrevious = () => {
    const newIndex = currentProfile > 0 ? currentProfile - 1 : totalProfiles - 1;
    onProfileChange(newIndex);
  };

  const handleNext = () => {
    const newIndex = currentProfile < totalProfiles - 1 ? currentProfile + 1 : 0;
    onProfileChange(newIndex);
  };

  // Formatear la fecha
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="flex flex-col items-center gap-4 mt-6 print:hidden">
      <div className="flex items-center gap-4 w-full relative">
        <Button
          variant="default"
          size="icon"
          onClick={handlePrevious}
          aria-label={t('navigation.previous')}
          className="opacity-0 group-hover:opacity-100 transition-opacity absolute -left-4 z-10 bg-gray-900 hover:bg-gray-700 text-white"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {/* Navigation Container */}
        <div className="flex items-center justify-center w-full relative">
          {/* Date */}
          <span className="absolute left-8 text-sm text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
            {formatDate(date)}
          </span>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            {Array.from({ length: totalProfiles }).map((_, index) => (
              <button
                key={index}
                onClick={() => onProfileChange(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentProfile === index 
                    ? 'bg-gray-800 scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Ir al perfil ${index + 1}`}
              />
            ))}
          </div>

          {/* Company */}
          <span className="absolute right-8 text-sm text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
            {company}
          </span>
        </div>

        <Button
          variant="default"
          size="icon"
          onClick={handleNext}
          aria-label={t('navigation.next')}
          className="opacity-0 group-hover:opacity-100 transition-opacity absolute -right-4 z-10 bg-gray-900 hover:bg-gray-700 text-white"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}; 