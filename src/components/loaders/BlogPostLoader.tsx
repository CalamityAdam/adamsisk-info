import { ContentLoader } from './ContentLoader';
import { LoaderProps } from '../../types';
import { ContentPaths } from '../../constants';

function BlogPostLoader(props: LoaderProps) {
  return <ContentLoader {...props} path={ContentPaths.BLOGS} />;
}

export { BlogPostLoader };
