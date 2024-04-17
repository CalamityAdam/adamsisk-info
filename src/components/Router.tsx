import { useEffect, useState } from 'react';
import { Route, Switch } from 'wouter';
import { Intro } from './Intro';
import { Blogs } from './Blogs';
import MarkdownWrapper from './MarkdownWrapper';

function useMarkdownLoader(slug: string): string {
  const [markdown, setMarkdown] = useState('');

  useEffect(() => {
    async function loadMarkdown() {
      try {
        const markdownModule = await import(`../blogs/${slug}.md?raw`);

        setMarkdown(markdownModule.default);
      } catch (error) {
        console.error(error);
      }
    }

    loadMarkdown();
  }, [slug]);

  return markdown;
}

function BlogPostLoader({ params }: { params: { slug: string } }) {
  const markdown = useMarkdownLoader(params.slug);

  return <MarkdownWrapper>{markdown}</MarkdownWrapper>;
}

export const Router = () => (
  <Switch>
    <Route path='/' component={Intro} />
    <Route path='/blog/' component={Blogs} />
    <Route path='/blog/:slug' component={BlogPostLoader} />
  </Switch>
);
