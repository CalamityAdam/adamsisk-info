import { Link } from 'wouter';
import siteLogo from '../assets/site-logo.svg';

function Nav() {
  return (
    <nav className='h-14 shrink-0 mb-6 sm:h-24 flex items-center'>
      <div>
        <Link href='/'>
          <img
            src={siteLogo}
            className='h-10 sm:h-14'
            height='56'
            alt='A S site logo'
          />
        </Link>
      </div>

      <div className='flex-1'></div>

      <div className='space-x-8'>
        <Link href='/' className='text-lg font-semibold'>
          Home
        </Link>
        <Link href='/blog' className='text-lg font-semibold'>
          Blog
        </Link>
      </div>
    </nav>
  );
}

export { Nav };
