import { ReactElement } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import breaks from 'remark-breaks';
import A from '../markdown/A';
import CodeBlock from '../markdown/CodeBlock';
import Heading from '../markdown/Heading';

interface Props {
  children: string;
}

function MarkdownWrapper({
  children,
}: Props): ReactElement<{ children: string }> {
  const components = {
    a: A,
    code: CodeBlock,
    h1: (props: { children?: React.ReactNode; [key: string]: any }) => (
      <Heading level={1} {...props} />
    ),
    h2: (props: { children?: React.ReactNode; [key: string]: any }) => (
      <Heading level={2} {...props} />
    ),
    h3: (props: { children?: React.ReactNode; [key: string]: any }) => (
      <Heading level={3} {...props} />
    ),
  };
  return (
    <div className='overflow-hidden prose prose-pre:border-none dark:prose-invert lg:max-w-5xl mx-0 lg:prose-lg w-full leading-6'>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, breaks]}
        children={children}
        components={components}
        // className='w-full'
      />
    </div>
  );
}

export default MarkdownWrapper;
