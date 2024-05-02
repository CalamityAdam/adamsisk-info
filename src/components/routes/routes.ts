import { Daily } from '../Daily';
import { Intro } from '../Intro';
import { Posts } from '../Posts';
import { AdrLoader, BlogPostLoader, DailyDocLoader } from '../loaders';

export const routes = [
  { path: '/', component: Intro },
  { path: '/blog', component: Posts },
  { path: '/daily', component: Daily },
  { path: '/adr/:slug', component: AdrLoader },
  { path: '/blog/:slug', component: BlogPostLoader },
  { path: '/daily/:slug', component: DailyDocLoader },
];
