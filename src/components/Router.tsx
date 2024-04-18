import { useEffect, useState } from 'react';
import { Route, Switch } from 'wouter';
import { Intro } from './Intro';
import { Posts } from './Posts';
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

export const routes = [
  { path: '/', component: Intro },
  { path: '/blog/', component: Posts },
  { path: '/blog/:slug', component: BlogPostLoader },
];

export const Router = () => (
  <Switch>
    {routes.map((route) => (
      <Route key={route.path} path={route.path} component={route.component} />
    ))}
  </Switch>
);
