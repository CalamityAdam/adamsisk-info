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

To achieve this, utilize Wouter's `<Link />` component by passing a function instead of a typical `className` string prop. Wouter will provide a boolean which will be true when the URL path _exactly_ matches the text inside of the `<Link>`.

```jsx
<Link href='/' className={(active) => (active ? 'underline' : '')}>
  Home
</Link>
```

As expected, Wouter delivers stupid simplicity. It could not be any easier! However, there's one small shortcoming with this approach; `active` will only be true when the path exactly matches (i.e., `/blogs` will not be active for `/blogs/1`). Actually, this is a **giant** shortcoming, considering our site primarily consists of blog posts and dynamic paths. Every individual blog post includes a slug in the URL.

## Hookify me, Captain

When accounting for more complex path structures, Wouter provides a way to manually check the path. We can use the `useLocation` hook, which, similarly to React's [`useState`](https://react.dev/reference/react/useState), returns a getter and a setter (or: a value and a function to update the value). We can check the value returned from `useLocation` against each `Link`'s `href` to determine an active state.

```jsx
const [location, setLocation] = useLocation();
```

We can use the value to determine if the current page matches the link. Here, we've created a new component, NavLink, to handle this for us. We want a nav link to, by default, apply a pretty underline when the user hovers over the link. If the user is already on that page, then the underline should already be present.

```tsx
import { Link, useLocation } from 'wouter';

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
```

### SOLIDification

We're always looking for a way to apply the SOLID principles. We can apply the Single Responsibility Principle by giving the NavLink only _one_ reason to change.

```tsx
function buildNavLinkClassName(isActive: boolean): string {
  const baseClasses =
    'text-lg font-semibold hover:underline hover:underline-offset-2';

  return isActive ? `${baseClasses} underline underline-offset-2` : baseClasses;
}
```

```tsx
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
