import { useMemo } from 'react';
import iconLinkedin from '../assets/icon-linkedin.svg';
import iconGithub from '../assets/icon-github.svg';
import iconEmail from '../assets/icon-email.svg';

function Footer() {
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
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
  );
}

export { Footer };
