import { Route, Switch } from 'wouter';
import { Intro } from './Intro';
import { Suspense, lazy } from 'react';
import { Blogs } from './Blogs';

function BlogPostLoader({ params }: { params: { slug: string } }) {
  const BlogPost = lazy(() => import(`../blogs/${params.slug}.tsx`));

  return (
    <Suspense fallback='Loading blog post...'>
      <BlogPost />
    </Suspense>
  );
}

export const Router = () => (
  <Switch>
    <Route path='/' component={Intro} />
    <Route path='/blog/' component={Blogs} />
    <Route path='/blog/:slug' component={BlogPostLoader} />
  </Switch>
);
