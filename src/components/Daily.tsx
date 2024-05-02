import { useLocation } from 'wouter';

function Daily(): null {
  const [, setLocation] = useLocation();
  setLocation('/daily/index');

  return null;
}

export { Daily };
