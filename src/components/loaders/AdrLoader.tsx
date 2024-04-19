import { LoaderProps } from '../types';
import { ContentLoader } from './ContentLoader';

function AdrLoader(props: LoaderProps) {
  return <ContentLoader {...props} path='daily/adr' />;
}

export { AdrLoader };
