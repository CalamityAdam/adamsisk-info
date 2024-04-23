import { ReactElement } from 'react';
import ReactMarkdown from 'react-markdown';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import remarkGfm from 'remark-gfm';
import breaks from 'remark-breaks';
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
import sh from 'react-syntax-highlighter/dist/esm/languages/prism/bash';
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx';
import { dracula as syntaxStyles } from 'react-syntax-highlighter/dist/esm/styles/prism';

SyntaxHighlighter.registerLanguage('jsx', jsx);
SyntaxHighlighter.registerLanguage('sh', sh);
SyntaxHighlighter.registerLanguage('tsx', tsx);

interface Props {
  children: string;
}

function MarkdownWrapper({
  children,
}: Props): ReactElement<{ children: string }> {
  const components = {
    code({ node, inline, className, children: codeChildren, ...props }: any) {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <SyntaxHighlighter
          style={syntaxStyles}
          language={match[1]}
          PreTag='div'
          {...props}
        >
          {String(codeChildren).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code
          className={`text-black px-0.5 bg-orange ${
            className ? className : ''
          }`}
          {...props}
        >
          {codeChildren}
        </code>
      );
    },
  };

  return (
    <div className='overflow-hidden prose prose-pre:border-none dark:prose-invert lg:max-w-5xl mx-0 lg:prose-lg w-full leading-6'>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, breaks]}
        children={children}
        components={components}
        className='w-full'
      />
    </div>
  );
}

export default MarkdownWrapper;
