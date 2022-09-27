import { useMemo } from 'react';
import siteLogo from './assets/site-logo.svg';
import iconLinkedin from './assets/icon-linkedin.svg';
import iconGithub from './assets/icon-github.svg';
import iconEmail from './assets/icon-email.svg';

function App() {
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <div className='flex flex-col h-screen px-6'>
      <nav className='h-14 flex'>
        <img src={siteLogo} className='logo react' alt='A S site logo' />
      </nav>
      <div className='flex-1 flex items-center justify-center'>
        <h1 className='text-center uppercase'>
          <span className='block text-3xl'>hi my name is</span>
          <span className='block text-6xl font-extrabold'>Adam Sisk</span>
          <span className='block text-lg'>I make things on the internet</span>
        </h1>
      </div>
      <footer className='h-24 flex justify-end'>
        <div className='flex flex-col justify-center items-end h-full'>
          <p className='block uppercase'>© Adam Sisk {year}</p>
          <div className='flex gap-4'>
            <a
              href='https://www.linkedin.com/in/adamsisk/'
              aria-label='linkedin'
              title='visit me on linkedin'
            >
              <img
                width='24'
                height='24'
                src={iconLinkedin}
                className='icon linkedin'
                alt='linkedin'
              />
            </a>
            <a
              href='https://github.com/calamityadam'
              aria-label='github'
              title='visit me on github'
            >
              <img
                width='24'
                height='24'
                src={iconGithub}
                className='icon github'
                alt='github'
              />
            </a>
            <a
              href='mailto:sisk@hey.com?subject=Hi%20Adam!'
              aria-label='email'
              title='send me an email'
            >
              <img
                width='24'
                height='24'
                src={iconEmail}
                className='icon email'
                alt='email'
              />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
