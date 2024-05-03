import { useLocation } from 'wouter';

function Daily(): null {
  const [, navigate] = useLocation();
  navigate('/daily/index', { replace: true });

  return null;
}

export { Daily };
