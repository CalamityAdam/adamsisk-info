import { ReactElement } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default ({
  children,
}: {
  children: string;
}): ReactElement<{ children: string }> => (
  <ReactMarkdown remarkPlugins={[remarkGfm]} children={children} />
);
