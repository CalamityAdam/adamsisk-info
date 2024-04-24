import { useState } from 'react';
import slugify from 'slugify';
import CopyToClipboard from '../CopyToClipboard';

export default ({
  level,
  children = '',
  node,
  ...props
}: {
  level: number;
  children?: React.ReactNode;
  node?: any;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const id = slugify(String(children), { lower: true, strict: true });
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <Tag
      id={id}
      className={`text-${4 - level}xl font-bold mt-6 mb-4 relative`}
      {...props}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span>
        {children}
        {isHovered && (
          <CopyToClipboard
            text={`${window.location.origin}${window.location.pathname}#${id}`}
          >
            <span className='inline-block ml-2 cursor-pointer'>
              <svg
                className='w-6 h-6 text-gray-800 dark:text-white'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                fill='none'
                viewBox='0 0 24 24'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M13.213 9.787a3.391 3.391 0 0 0-4.795 0l-3.425 3.426a3.39 3.39 0 0 0 4.795 4.794l.321-.304m-.321-4.49a3.39 3.39 0 0 0 4.795 0l3.424-3.426a3.39 3.39 0 0 0-4.794-4.795l-1.028.961'
                />
              </svg>
            </span>
          </CopyToClipboard>
        )}
      </span>
    </Tag>
  );
};
