import { Link, useLocation } from 'wouter';

const Breadcrumbs = (): JSX.Element | null => {
  /*
  use cases
  location = /
    should return null
  location = /blog
    should render Home > Blog with Blog as active
  location = /blog/slug
    should render Home > Blog > Slug with Slug as active
  */
  const [location] = useLocation();

  if (location === '/') return null;

  const pathSegments = location.split('/').filter(Boolean);
  const lastSegment = pathSegments.pop();

  return (
    <nav className='flex self-start mb-4' aria-label='Breadcrumb'>
      <ol className='inline-flex m-0 items-center list-none space-x-1 md:space-x-3 rtl:space-x-reverse'>
        <Crumb>Home</Crumb>
        {pathSegments.map((segment, index) => (
          <li key={segment} className='m-0'>
            <div className='flex items-center'>
              <CrumbSeparator />
              <Link
                href={`/${pathSegments.slice(0, index + 1).join('/')}`}
                className='ms-1 text-sm font-medium hover:underline hover:text-blue md:ms-2 dark:hover:text-orange'
              >
                {segment}
              </Link>
            </div>
          </li>
        ))}
        {lastSegment && (
          <li aria-current='page' className='m-0'>
            <div className='flex items-center'>
              <CrumbSeparator />
              <span className='ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400'>
                {lastSegment}
              </span>
            </div>
          </li>
        )}
      </ol>
    </nav>
  );
};

export { Breadcrumbs };

const Crumb = ({ children }: { children: string; withSeparator?: boolean }) => (
  <li className='m-0'>
    <Link
      href='/'
      className='text-sm font-medium hover:text-blue hover:underline dark:hover:text-orange'
    >
      {children}
    </Link>
  </li>
);

const CrumbSeparator = () => (
  <svg
    className='w-3 h-3 text-gray-400 mx-1 rtl:rotate-180'
    aria-hidden='true'
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 6 10'
  >
    <path
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2'
      d='m1 9 4-4-4-4'
    />
  </svg>
);
