title: Styling Active Nav Links with Wouter and Tailwind CSS
date: 2024-04-17
author: Me

# Styling Active Nav Links with Wouter and Tailwind CSS

Styling navigation links to indicate an "active" state based on the current page is a low hanging fruit when building out a web application. Lucky for us, [Wouter](https://github.com/molefrog/wouter?tab=readme-ov-file#how-do-i-make-a-link-active-for-the-current-route) makes this **incredibly** easy.

## Here's some routes
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

