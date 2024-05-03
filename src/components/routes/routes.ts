import { Adr } from '../Adr';
import { Daily } from '../Daily';
import { Intro } from '../Intro';
import { Posts } from '../Posts';
import { AdrLoader, BlogPostLoader, DailyDocLoader } from '../loaders';

export const routes = [
  { path: '/adr/:slug', component: AdrLoader },
  { path: '/blog/:slug', component: BlogPostLoader },
  { path: '/daily/:slug', component: DailyDocLoader },
  { path: '/', component: Intro },
  { path: '/adr', component: Adr },
  { path: '/blog', component: Posts },
  { path: '/daily', component: Daily },
];
