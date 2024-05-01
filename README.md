# adamsisk.info

This is the source code for my personal website, [adamsisk.info](https://adamsisk.info).

Build with React (but it doesn't need to be) and Tailwind CSS.

## Development

```sh
yarn && yarn dev
```

# TODO

- [ ] upvote buttons?
- [ ] move to adumb.dev
- [ ] figure out why code blocks have a thicc border
- [ ] finish the theme toggle
- [ ] cache pages after first load?
- [ ] react snap! https://chat.openai.com/c/2bc07438-d201-44e7-9b41-3d4de7e7ba61
- [ ] look into why react-syntax-highlight has a huge waterfall
- [ ] include raw source maps
- [ ] logging/analytics?
- [ ] nav bar A11y
- [ ] ssr? https://chat.openai.com/c/8f43ac87-93b0-4683-8c9e-2fb836ab7d93
- [x] environmentalize domain (adamsisk.info) to support adumb.dev
- [x] turn links in markdown wrapper into wouter Link elements
- [x] link to Heath's blog!! https://www.heathwhughes.com/
- [x] add syntax highlighting to code blocks
- [x] make headings easily anchorable - copy link button
- [x] make current link active
- [x] add ADRs!
- [x] update npmrc to not use artifactory (oops!)
- [x] figure out why backticks are rendering the ticks in addition to the styling
- [x] figure out why i get a 404 on the first load of the blog page
- [x] Add a blog

# things to know

- when writing markdown you can use environment variables by wrapping them in double curly brackets
  - example markdown:
    ```md
    This website is hosted at {{DOMAIN_URL}}!
    ```
  - .env:
    ```
    VITE_DOMAIN_URL=https://adamsisk.info
    ```
  - output:
    ```
    This website is hosted at https://adamsisk.info!
    ```
  - _note:_ if the value inside of the double curlies is not found in .env then the raw markdown will remain untouched.
- max app width: 1280px
- max blog width: 1024px
- En-Dash         &ndash;    &#150;
- Em-Dash         &mdash;    &#151;
- Minus Symbol    &minus;    &#8722;



# code ideas

- a mini code editor - using the same instance of react and deps that's installed on the blog, with a live update display next to it.
- dynamic meta tags in the index.html based on the requested blog path?
- automator quick action for "improve writing"? gpt4-api?

# blog ideas

- breaking down the App component to be templatized and minified
- apply SRP to Posts.tsx (currently 2 reasons to change: UI, and blog posts)
- ✨ make npm package for centering app with max width (insta cool SPA) use the max-width
  ```css
  .with-max-width {
    max-width: calc(100vw-32px);
    sm:max-width: calc(100vw-48px);
    width: 100%;
    margin: 0 auto;
  }
  ```
- photo web-site as a service - sign in with google photos and select albums or people
  - auto sorting? auto filtering?
