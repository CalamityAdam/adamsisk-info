import { useLocation } from 'wouter';

function Adr(): null {
  const [, navigate] = useLocation();
  navigate('/adr/index', { replace: true });

  return null;
}

export { Adr };
