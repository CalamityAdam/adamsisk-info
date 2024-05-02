import { dracula as syntaxStyles } from 'react-syntax-highlighter/dist/esm/styles/prism';
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
import sh from 'react-syntax-highlighter/dist/esm/languages/prism/bash';
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx';
import md from 'react-syntax-highlighter/dist/esm/languages/prism/markdown';
import {
  PrismLight as SyntaxHighlighter,
  SyntaxHighlighterProps,
} from 'react-syntax-highlighter';

SyntaxHighlighter.registerLanguage('jsx', jsx);
SyntaxHighlighter.registerLanguage('md', md);
SyntaxHighlighter.registerLanguage('sh', sh);
SyntaxHighlighter.registerLanguage('tsx', tsx);

export default ({
  node,
  inline,
  className,
  children: codeChildren,
  ...props
}: any) => {
  const match = /language-(\w+)/.exec(className || '');
  return !inline && match ? (
    <SyntaxHighlighter style={syntaxStyles} language={match[1]} {...props}>
      {String(codeChildren).replace(/\n$/, '')}
    </SyntaxHighlighter>
  ) : (
    <code
      className={`text-black px-0.5 bg-orange ${className ? className : ''}`}
      {...props}
    >
      {codeChildren}
    </code>
  );
};
