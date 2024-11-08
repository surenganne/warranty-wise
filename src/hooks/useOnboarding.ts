import { useState, useEffect } from 'react';
import { Step } from 'react-joyride';

export function useOnboarding() {
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const [showTour, setShowTour] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisitedBefore');
    if (!hasVisited) {
      setShowTour(true);
      localStorage.setItem('hasVisitedBefore', 'true');
    }
    setIsFirstVisit(false);
  }, []);

  const steps: Step[] = [
    {
      target: '.add-product-button',
      content: 'Start by adding your first product. Click here to add warranties, manuals, and service records.',
      disableBeacon: true,
    },
    {
      target: '.notification-button',
      content: 'Get notified when warranties are about to expire or when service is due.',
    },
    {
      target: '.analytics-button',
      content: 'View detailed analytics about your products and warranty status.',
    },
    {
      target: '.calendar-button',
      content: 'Keep track of important dates with our calendar view.',
    },
    {
      target: '.settings-button',
      content: 'Customize your experience and notification preferences here.',
    },
    {
      target: '.help-button',
      content: 'Need help? Access our comprehensive help center and support resources.',
    },
  ];

  return {
    showTour,
    setShowTour,
    steps,
    isFirstVisit,
  };
}