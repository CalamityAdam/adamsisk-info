import { useContentLoader } from '../../hooks/useContentLoader';
import MarkdownWrapper from '../layout/MarkdownWrapper';

function ContentLoader({
  params,
  path,
}: {
  params: { slug: string };
  path: string;
}) {
  const content = useContentLoader(`${path}/${params.slug}`);

  return <MarkdownWrapper>{content}</MarkdownWrapper>;
}

export { ContentLoader };
