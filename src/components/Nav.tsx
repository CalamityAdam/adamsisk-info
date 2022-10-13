import siteLogo from '../assets/site-logo.svg';

function Nav() {
  return (
    <nav className='h-14 sm:h-24 flex items-center'>
      <img src={siteLogo} className='sm:h-14' height='56' alt='A S site logo' />
    </nav>
  );
}

export { Nav };
