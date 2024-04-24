import { ExtraProps } from 'react-markdown';
import { Link } from 'wouter';

export default ({
  children = '',
  href = '',
  node,
}: JSX.IntrinsicElements['a'] & ExtraProps): JSX.Element => (
  <Link
    href={href}
    className='text-blue dark:text-orange no-underline hover:underline'
  >
    {children}
  </Link>
);
