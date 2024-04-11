import { useEffect, useState } from 'react';
import { Route, Switch } from 'wouter';
import { Intro } from './Intro';
import { Blogs } from './Blogs';
import MarkdownWrapper from './MarkdownWrapper';

function BlogPostLoader({ params }: { params: { slug: string } }) {
  const [markdown, setMarkdown] = useState<string>('');

  useEffect(() => {
    // dynamically import the markdown file based on the slug
    const loadMarkdown = async () => {
      const markdownModule = await import(`../blogs/${params.slug}.md?raw`);
      console.log('markdownModule', markdownModule.default);
      setMarkdown(markdownModule.default);
    };

    loadMarkdown().catch(console.error);
  }, [params.slug]);

  return <MarkdownWrapper>{markdown}</MarkdownWrapper>;
}

export const Router = () => (
  <Switch>
    <Route path='/' component={Intro} />
    <Route path='/blog/' component={Blogs} />
    <Route path='/blog/:slug' component={BlogPostLoader} />
  </Switch>
);
