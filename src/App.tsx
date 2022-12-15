import { useMemo } from 'react';
import siteLogo from './assets/site-logo.svg';
import iconLinkedin from './assets/icon-linkedin.svg';
import iconGithub from './assets/icon-github.svg';
import iconEmail from './assets/icon-email.svg';

function App() {
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <div className='flex flex-col h-screen px-6 sm:px-14 max-w-7xl mx-auto'>
      <nav className='h-14 sm:h-24 flex items-center'>
        <img src={siteLogo} className='sm:h-14' height='56' alt='A S site logo' />
      </nav>
      <div className='flex-1 flex items-center justify-center'>
        <h1 className='text-center uppercase'>
          <span className='block text-3xl sm:text-4xl lg:text-6xl'>
            hi my name is
          </span>
          <span className='block text-6xl sm:text-8xl lg:text-9xl font-extrabold'>
            Adam Sisk
          </span>
          <span className='block text-lg sm:text-2xl lg:text-3xl'>
            I make things on the internet
          </span>
        </h1>
        <div><div class='op-interactive' id='6399fe5e00021864c0757f62' data-title='Open Field - What question do you want to ask your pros' data-url='https://ramseysolutions.outgrow.us/6399fe5e00021864c0757f62?vHeight=1' data-width='100%'></div><script src='//dyv6f9ner1ir9.cloudfront.net/assets/js/nloader.js'></script><script>initIframe('6399fe5e00021864c0757f62');</script></div>
      </div>
      <footer className='h-24 sm:h-36 lg:h-52 flex justify-end'>
        <div className='flex flex-col justify-center items-end h-full sm:gap-2 lg:gap-4'>
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
