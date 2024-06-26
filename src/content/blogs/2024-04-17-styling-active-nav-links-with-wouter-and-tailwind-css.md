title: Styling Active Nav Links with Wouter and Tailwind CSS
date: 2024-04-17
author: Me

# Styling Active Nav Links with Wouter and Tailwind CSS

Styling navigation links to indicate an "active" state based on the current page is a low hanging fruit when building out a web application. Lucky for us, [Wouter](https://github.com/molefrog/wouter?tab=readme-ov-file#how-do-i-make-a-link-active-for-the-current-route) makes this **incredibly** easy.

## Here's some nav links

```jsx
// components/Nav.tsx

import { Link } from 'wouter';

function Nav() {
  return (
    <nav>
      <Link href='/'>Home</Link>
      <Link href='/blog'>Blog</Link>
    </nav>
  );
}

export { Nav };
```

They're cute, but kinda boring. Let's make them cuter 💅 Lucky for us, [Wouter](https://github.com/molefrog/wouter) provides a stupid simple way to [make a link active for the current route](https://github.com/molefrog/wouter?tab=readme-ov-file#how-do-i-make-a-link-active-for-the-current-route).

To achieve this, utilize Wouter's `<Link />` component by passing a function instead of a typical `className` string prop. Wouter will provide **a boolean which will be true when the URL path _exactly_ matches the `<Link>`'s href**.

```jsx
<Link href='/' className={(active) => (active ? 'underline' : '')}>
  Home
</Link>
```

As expected, Wouter delivers stupid simplicity. It could not be any easier! However, there's one small shortcoming with this approach; `active` will only be true when the path exactly matches (i.e., `/blogs` will not be active for `/blogs/1`). Actually, this is a **giant** shortcoming, considering our site primarily consists of blog posts and dynamic paths. Every individual blog post includes a slug in the URL.

## Hookify me, Captain

When accounting for more complex path structures, Wouter provides a way to manually check the path. Utilizing the `useLocation` hook, which, similarly to React's [`useState`](https://react.dev/reference/react/useState), returns a getter and a setter (or: a value and a function to update the value). We can **check the value returned from `useLocation` against each `Link`'s `href` to determine an active state**.

```tsx
const [location, setLocation] = useLocation();

// If URL == {{DOMAIN_URL}}/
// location == "/"

// if URL == {{DOMAIN_URL}}/blog
// location == "/blog"

// If URL == {{DOMAIN_URL}}/blog/2024-04-10-hello-world
// location == "/blog/2024-04-10-hello-world"
```

We can use the value to determine if the current page matches the link. Here, we've created a new component, NavLink, to handle this for us. We want a `NavLink` to, by default, apply a pretty underline when the user hovers over the link. If the user is already on that page, then the underline should already be present. We'll **add an `isActive` prop to conditionally render the active styles**.

```tsx
// components/NavLink.tsx

import { Link } from 'wouter';

interface NavLink {
  children: React.ReactNode;
  href: string;
  isActive?: boolean;
}

function NavLink({ children, href, isActive = false }: NavLink): JSX.Element {
  const baseClasses =
    'text-lg font-semibold hover:underline hover:underline-offset-2';

  const className = isActive
    ? `${baseClasses} underline underline-offset-2`
    : baseClasses;

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export { NavLink };
```

Then our top-level `Nav` component will tell `NavLink` whether or not it should be active. All we have to do is **pass the new `isActive` boolean prop to `NavLink`, with custom instructions based on each specific path**. Since every blog page follows the same `/blog/:slug` pattern, if the location _starts_ with `/blog`, then we know the user is either on the top-level `/blog` index page or on an individual blog.

```tsx
// components/Nav.tsx

import { Link, useLocation } from 'wouter';
import { NavLink } from './NavLink';

function Nav() {
  const [location] = useLocation();

  return (
    <nav>
      <NavLink href='/' isActive={location === '/'}>
        Home
      </NavLink>
      <NavLink href='/blog' isActive={location.startsWith('/blog')}>
        Blog
      </NavLink>
    </nav>
  );
}

export { Nav };
```

## SOLIDification

We're always looking for a way to apply the SOLID principles. We can apply the Single Responsibility Principle by giving the NavLink only _one_ reason to change.

```tsx
// separate styles/className logic into a new function
function buildNavLinkClassName(isActive: boolean): string {
  const baseClasses =
    'text-lg font-semibold hover:underline hover:underline-offset-2';

  return isActive ? `${baseClasses} underline underline-offset-2` : baseClasses;
}
```

```tsx
// use new function to build classNames
function NavLink({ children, href, isActive = false }: NavLink): JSX.Element {
  const className = buildNavLinkClassName(isActive);

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
```

We added some super easy-peasy styles to our nav links by passing a function instead of a `className` string. Then we enhanced it to account for blog post paths that include slugs. Then we applied the SRP from the SOLID principles. The end.
