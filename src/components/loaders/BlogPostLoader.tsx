import { ContentLoader } from './ContentLoader';
import { LoaderProps } from '../types';

function BlogPostLoader(props: LoaderProps) {
  return <ContentLoader {...props} path='blogs' />;
}

export { BlogPostLoader };
