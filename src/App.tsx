import { Body, Breadcrumbs, Footer, Layout, Nav, Router } from './components';
import ErrorBoundary from './components/ErrorBoundary';

export default () => (
  <ErrorBoundary
    fallback={
      <div>
        <p>
          Something went wrong! 🤷‍♂️{' '}
          <a className='underline' href='/'>
            take me home.
          </a>
        </p>

        <p className='italic'>(or check the console for more info 👀)</p>
      </div>
    }
  >
    <Layout>
      <Nav />
      <Breadcrumbs />

      <Body>
        <Router />
      </Body>

      <Footer />
    </Layout>
  </ErrorBoundary>
);
