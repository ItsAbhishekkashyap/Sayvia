// src/components/ThemeTester.tsx
'use client';

import { useTheme } from '@/context/ThemeContext';
import { useTheme as useNextTheme } from 'next-themes';

export function ThemeTester() {
  const { colorTheme, setColorTheme } = useTheme();
  const { theme, setTheme } = useNextTheme();

  return (
    <div className="p-4 space-y-4">
      <div className="flex gap-4">
        <button 
          onClick={() => setTheme('light')}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Light Mode
        </button>
        <button 
          onClick={() => setTheme('dark')}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Dark Mode
        </button>
      </div>
      
      <div className="flex gap-4 flex-wrap">
        {['default', 'ocean', 'sunset', 'lavender', 'monochrome'].map((theme) => (
          <button
            key={theme}
            onClick={() => setColorTheme(theme as any)}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            {theme}
          </button>
        ))}
      </div>

      <div className="p-4 rounded" style={{ backgroundColor: 'rgb(var(--primary))' }}>
        <p className="text-white">Primary Color Test</p>
      </div>
    </div>
  );
}