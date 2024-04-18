# adamsisk.info

This is the source code for my personal website, [adamsisk.info](https://adamsisk.info).

Build with React (but it doesn't need to be) and Tailwind CSS.

## Development

```sh
yarn && yarn dev
```

# TODO

- [x] Add a blog
- [x] update npmrc to not use artifactory (oops!)
- [x] add syntax highlighting to code blocks
- [x] figure out why i get a 404 on the first load of the blog page
- [x] make current link active - https://blog.logrocket.com/an-introduction-to-wouter-a-react-router-alternative/
- [ ] figure out why backticks are rendering the ticks in addition to the styling
- [ ] finish the theme toggle
- [ ] cache pages after first load?
- [ ] turn links in markdown wrapper into wouter Link elements
- [ ] make headings easily anchorable - copy link button
- [ ] upvote buttons?
- [ ] react snap! https://chat.openai.com/c/2bc07438-d201-44e7-9b41-3d4de7e7ba61
- [ ] look into why react-syntax-highlight has a huge waterfall
- [ ] include raw source maps
- [ ] add ADRs!
- [ ] logging/analytics?
- [ ] nav bar A11y

# code ideas

- a mini code editor - using the same instance of react and deps that's installed on the blog, with a live update display next to it.
- dynamic meta tags in the index.html based on the requested blog path?

# blog ideas

- breaking down the App component to be templatized and minified
