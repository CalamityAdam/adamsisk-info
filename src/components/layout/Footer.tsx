import { useEffect, useMemo, useState } from 'react';
import IconLinkedin from '../icons/IconLinkedin';
import IconGithub from '../icons/IconGithub';
import IconEmail from '../icons/IconEmail';

function Footer() {
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer className='h-24 sm:h-36 lg:h-52 mt-6 flex justify-between items-center shrink-0'>
      <div>
        <ThemeToggle />
      </div>
      <div className='flex flex-col justify-center items-end h-full sm:gap-2 lg:gap-4'>
        <p className='block uppercase'>© Adam Sisk {year}</p>
        <div className='flex gap-4'>
          <a
            href='https://www.linkedin.com/in/adamsisk/'
            aria-label='linkedin'
            title='visit me on linkedin'
          >
            <IconLinkedin />
          </a>
          <a
            href='https://github.com/calamityadam'
            aria-label='github'
            title='visit me on github'
          >
            <IconGithub />
          </a>
          <a
            href='mailto:sisk@hey.com?subject=Hi%20Adam!'
            aria-label='email'
            title='send me an email'
          >
            <IconEmail />
          </a>
        </div>
      </div>
    </footer>
  );
}

export { Footer };

const ThemeToggle: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute(
      'data-theme',
      isDarkMode ? 'dark' : 'light'
    );
  }, [isDarkMode]);

  function toggleTheme() {
    setIsDarkMode(!isDarkMode);
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      toggleTheme();
    }
  }

  return (
    <div className='flex flex-col items-center'>
      <label
        className='inline-flex items-center cursor-pointer'
        onKeyDown={handleKeyDown}
      >
        <input
          type='checkbox'
          className='sr-only peer'
          checked={isDarkMode}
          onChange={toggleTheme}
        />
        <div className="relative w-9 h-5 bg-primary peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-secondary dark:peer-focus:ring-secondary rounded-full peer dark:bg-secondary peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-background-primary after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-background-primary after:border-background-primary after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-secondary peer-checked:bg-yellow"></div>
        <span className='inline-flex flex-col ms-3 text-md font-semibold'>
          <span>{isDarkMode ? 'Light 🧔🏻‍♂️' : 'Dark 🧔🏿‍♂️'}</span>
        </span>
      </label>
      <span className='font-thin text-sm italic mt-0.5'>*experimental</span>
    </div>
  );
};
