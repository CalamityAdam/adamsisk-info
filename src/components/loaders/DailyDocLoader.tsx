import { LoaderProps } from '../types';
import { ContentLoader } from './ContentLoader';

function DailyDocLoader(props: LoaderProps) {
  return <ContentLoader {...props} path='daily' />;
}

export { DailyDocLoader };
