import { ContentPaths } from '../../constants';
import { LoaderProps } from '../../types';
import { ContentLoader } from './ContentLoader';

function AdrLoader(props: LoaderProps) {
  return <ContentLoader {...props} path={ContentPaths.ADR} />;
}

export { AdrLoader };
