import { useEffect, useState } from 'react';
import { Link, useRoute } from 'wouter';
import siteLogo from '../../assets/site-logo.svg';

interface CustomDocument extends Document {
  poop: any;
}

function Nav() {
  const [isVisible, setIsVisible] = useState(false);
  const [wasVisibleOnce, setWasVisibleOnce] = useState(false);

  function handleMouseEnter(e: React.MouseEvent) {
    if (wasVisibleOnce) {
      setIsVisible(false);
      return;
    }

    if (e.buttons === 1 && !wasVisibleOnce) {
      setIsVisible(true);
      setWasVisibleOnce(true);
      (document as CustomDocument).poop = '💩';
    } else {
      setIsVisible(false);
    }
  }

  function handleMouseUp() {
    if (!isVisible) {
      return;
    }

    setIsVisible(false);
    document.removeEventListener('mouseup', handleMouseUp);
  }

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <nav className='h-14 shrink-0 mb-6 sm:h-24 flex items-center justify-between'>
      <div className='flex gap-1'>
        <Link href='/'>
          <img
            src={siteLogo}
            className='h-10 sm:h-14'
            height='56'
            alt='A S site logo'
            onMouseEnter={handleMouseEnter}
          />
        </Link>
        {isVisible && (
          <span
            aria-hidden='true'
            role='presentation'
            className='h-10 text-4xl text-background-primary font-bold sm:text-6xl leading-none'
          >
            S
          </span>
        )}
      </div>

      <ul className='flex gap-8 text-lg font-semibold'>
        <li>
          <ActiveAwareLink href='/'>Home</ActiveAwareLink>
        </li>
        <li>
          <ActiveAwareLink href='/blog'>Blog</ActiveAwareLink>
        </li>
      </ul>
    </nav>
  );
}

function buildNavLinkClassName(isActive: boolean): string {
  const baseClasses =
    'text-lg font-semibold hover:underline hover:underline-offset-2';
  return isActive ? `${baseClasses} font-bold` : baseClasses;
}

function useIsActive(href: string): boolean {
  const pattern = href === '/blog' ? '/blog/:slug?' : href;

  const [isActive] = useRoute(pattern);

  return isActive;
}

interface ActiveAwareLinkProps {
  href: string;
  children: React.ReactNode;
}

function ActiveAwareLink({
  href,
  children,
}: ActiveAwareLinkProps): JSX.Element {
  const isActive = useIsActive(href);
  const className = buildNavLinkClassName(isActive);

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export { Nav };
