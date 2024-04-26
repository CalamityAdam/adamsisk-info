title: Lightweight Client-Side Routing with Wouter
date: 2024-04-16
author: Me

# Lightweight Client-Side Routing with Wouter

So I wrote [my first blog](/blog/2024-04-10-hello-world), then [blogged about it](/blog/2024-04-11-i-want-to-make-a-blog)...hooray! 🕺 I have two whole pages on this site that you can visit. That just happens to be precisely the minimum number of pages required for adding an overly-optimized client-side routing solution.

> "Client-side routing is like when you're playing a game and can move to different levels without having to start the game over; it makes websites work faster and lets you do things without waiting." - ChatGPT, probably

I'm quite familiar with [React Router](https://reactrouter.com/en/main/start/tutorial), I've used it extensively in my day job. It's a great product, but at [23.8kB gzipped](https://bundlephobia.com/package/react-router-dom@6.22.3) we'd no longer be holding true to our blog requirement #2: _In every possible way, this should be as over-engineered and over-optimized as possible._

## Wouter (a javascript library)

Coming in at only 1/10th the size of React Router ([2.3kB gzipped](https://bundlephobia.com/package/wouter@3.1.2)), this is an s-tier choice in favor of (over-)optimization. Wouter uses familiar components like `Link`, `Route`, `Switch`, etc..
_Not sure what "gzip size" is or why (gzip) size matters? [I asked ChatGPT](https://chat.openai.com/share/97fb0df9-5d77-4bdc-8a2e-3b1048a1ec85) so you don't have to._

### Setup

Stupid simple. Install the package in your friendly neighborhood terminal.

```sh
npm i wouter
```

Add some routes, and links to reach them.

```jsx
import { Link, Route, Switch } from 'wouter';
import { Blog, Home } from './pages';

function App() {
  return (
    <div>
      <nav>
        <Link href='/'>Home</Link>
        <Link href='/blog'>Blog</Link>
      </nav>

      <Switch>
        <Route path='/' component={Home} />
        <Route path='/blog' component={Blog} />
      </Switch>
    </div>
  );
}
```

> If you're unfamiliar with the functionality of a router, it allows for dynamic rendering of components based on the current URL, while integrating with the browser's history API to enable navigation using the forward and backward buttons.

In the code above, we see two links rendered on the page. Clicking on 'Home' sets the URL path to `/` (e.g., `{{DOMAIN_URL}}/`—the path is just the bit after the website name). The `<Switch>` component then renders only the `Home` component, as that is the `Route` with a `path` prop set to `"/"`, matching the current URL path. Clicking on 'Blog' changes the URL path to `/blog` (or `{{DOMAIN_URL}}/blog`), which causes the `Switch` to reactively render only the `Blog` component, no longer displaying the `Home` component.

...**neat**, so it works! If you're just looking to get the most basic navigation/routing then you can stop reading here, mission accomplished ✅ But remember, we like to over-engineer **everything**. 😏

Considering our blog requirement #1 (_writing should take place in a markdown file inside of a text editor, ideally as a file stored in the project_), we're storing each blog as a markdown file in our `blogs/` directory. In fact, I'm writing this right now in a file called `blogs/2024-04-16-lightweight-client-side-routing-with-wouter.md`. **We need to update our router to account for a file name in the URL path**

### Dynamic Routing

Our current setup provides us with a home page and a blog index page. However, this configuration only gets us 2/3 of the way to a fully-functioning blog website.

The last step in dynamic routing involves surfacing values (params) from the URL path to then render content specific to the given value. In our case, we can add another route to our `Switch` that includes a path parameter for the blog post slug (_a URL-friendly, unique identifier derived from the post title_). This parameter allows us to fetch and display a specific post dynamically based on the URL accessed. Here's how we can implement it:

```jsx
<Route path="/blog/:slug" component={BlogPost}>
```

This setup would pass a prop called `slug` to the component specified in the `component` prop. In this case, our `BlogPost` component could utilize that parameter to fetch and render the corresponding blog post, as shown below:

```jsx
// If URL = {{DOMAIN_URL}}/blog/2024-04-10-hello-world

function BlogPost({ match }) {
  const { slug } = match.params;
  console.log(slug); // Outputs: 2024-04-10-hello-world

  const [post, setPost] = useState('');

  useEffect(() => {
    fetch(`api/blog/${slug}`)
      .then((res) => res.text())
      .then(setPost);
  }, [slug]);

  return <div>{post}</div>;
}
```

Alternatively, we can grab the slug parameter from a provided `useParams` hook:

```jsx
import { useParams } from 'wouter';

function BlogPost() {
  const { slug } = useParams();

  console.log(slug); // Outputs: 2024-04-10-hello-world
}
```

## Dynamic Markdown Imports

Remember how I'm just writing this blog as a markdown file in the project's repository itself? Well, there's no API for me to fetch from. Instead, we need to import the raw markdown file itself and render it in a component. Then we'll utilize [react-markdown](https://chat.openai.com/c/2bc07438-d201-44e7-9b41-3d4de7e7ba61) for prettifying the content.

Given that over the lifespan of a blog, it _could_ grow to dozens, hundreds, even thousands of individual blog posts (let's be real, I'll probably forget about this in a few weeks...). As web developers, we should be good stewards of our users' resources. It would be unwise to ship _every_ blog post when this app loads. _I spy an over-engineering opportunity!_

> If we structure our files in a way where the file name is the same as the slug we'll use in the URL path, then we can use the slug to find the blog post file in our `blogs/` directory.

We can utilize lazy loading and code splitting via the [`import()` function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import) to delay fetching the blog post files until we actually need them. This is a very simple way to split code, so if the user only views one blog post we only send them one blog post. We can do something like this:

```jsx
import(`./blogs/${slug}.md?raw`).then((markdown) =>
  setMarkdown(markdown.default)
);
```

> With Vite, assets can be imported as strings using the ?raw suffix. We're using markdown files, so we want strings.

When Vite or WebPack sees this `import()` syntax, it knows to create separate chunks for each module (in our case, a module represents a file). For imports using variables, like the `slug` in the file paths, Vite requires paths to be known at build time. Luckily for us, we dictate the file paths, so this isn't an issue.

Let's build a new `BlogPostLoader` component which can be responsible for fetching and rendering the blog post.

```jsx
function BlogPostLoader({ params }) {
  const [markdown, setMarkdown] = useState('');

  useEffect(() => {
    function loadMarkdown() {
      import(`../blogs/${params.slug}.md?raw`)
        .then((markdownModule) => {
          setMarkdown(markdownModule.default);
        })
        .catch(console.error);
    }

    loadMarkdown();
  }, [params.slug]);

  return <MarkdownWrapper>{markdown}</MarkdownWrapper>;
}
```

> We're manually adding `.md` to the `import()` file path since we're referencing a file in our project, and adding `?raw` to specify the asset to be returned as a string.

Now we'll update our Router component to use our new `BlogPostLoader` as the component for the `/blog/:slug` Route.

```jsx
<Switch>
  <Route path='/' component={Home} />
  <Route path='/blog/' component={Blogs} />
  <Route path='/blog/:slug' component={BlogPostLoader} />
</Switch>
```

Navigating to `{{DOMAIN_URL}}/blog/2024-04-10-hello-world` will now make an additional fetch to pull the raw markdown stored in the file at the path `src/blogs/2024-04-10-hello-world.md` and then render it as a child of `MarkdownWrapper`.

## SOLIDification

> I'm currently exploring the SOLID principles and actively applying them.

Our new `BlogPostLoader` is handling both the logic to dynamically import markdown _and_ rendering it, which violates the **Single Responsibility Principle** (each component should have only one reason to change). To address this, we can split the responsibilities into two distinct parts:

- **Data Fetching**
- **Data Presentation**

We'll create a custom hook to handle fetching the markdown for a requested blog post.

```jsx
// useMarkdownLoader.ts
import { useState, useEffect } from 'react';

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

// BlogPostLoader.ts
import { useMarkdownLoader } from './useMarkdownLoader';
import MarkdownWrapper from './MarkdownWrapper';

function BlogPostLoader({ params }: { params: { slug: string } }) {
  const markdown = useMarkdownLoader(params.slug);

  return <MarkdownWrapper>{markdown}</MarkdownWrapper>;
}
```

Our router setup is straightforward yet effective, but it fails to adhere to the **Open/Closed Principle** (_components should be open for extension, but closed for modification_). Currently, to extend our router with a new route, we'd need to modify the core router logic. By extracting the routes into a configuration object, we can dynamically specify additional routes more flexibly.

```jsx
// routesConfig.ts
import { Home, Blogs, BlogPostLoader } from './components';

export const routes = [
  { path: '/', component: Home },
  { path: '/blog/', component: Blogs },
  { path: '/blog/:slug', component: BlogPostLoader },
];

// Router.ts
import { Switch, Route } from 'wouter';
import { routes } from './routesConfig';

function Router() {
  return (
    <Switch>
      {routes.map((route) => (
        <Route key={route.path} path={route.path} component={route.component} />
      ))}
    </Switch>
  );
}
```

That's all, folks! We built a router, enhanced it with dynamic imports, and then refined it by applying some key SOLID principles. 🕺
