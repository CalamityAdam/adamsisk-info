import { Body, Footer, Layout, Nav, Router } from './components';
import ErrorBoundary from './components/ErrorBoundary';

export default () => (
  <ErrorBoundary
    fallback={
      <div>
        Something went wrong!{' '}
        <a className='underline' href='/'>
          take me home.
        </a>
      </div>
    }
  >
    <Layout>
      <Nav />

      <Body>
        <Router />
      </Body>

      <Footer />
    </Layout>
  </ErrorBoundary>
);
