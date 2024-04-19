import { ContentPaths } from '../../constants';
import { LoaderProps } from '../../types';
import { ContentLoader } from './ContentLoader';

function DailyDocLoader(props: LoaderProps) {
  return <ContentLoader {...props} path={ContentPaths.DAILY} />;
}

export { DailyDocLoader };
