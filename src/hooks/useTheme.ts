import { useEffect } from 'react';
import { UserSettings } from '../components/Settings';

export function useTheme(settings: UserSettings) {
  useEffect(() => {
    const root = window.document.documentElement;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const shouldBeDark = 
      settings.display.theme === 'dark' || 
      (settings.display.theme === 'system' && prefersDark);

    if (shouldBeDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [settings.display.theme]);
}