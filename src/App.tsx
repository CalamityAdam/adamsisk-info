import { Body, Footer, Layout, Nav } from './components';

function App() {
  return (
    <Layout>
      <Nav />

      <Body>
        <h1 className='text-center uppercase'>
          <span className='block text-3xl sm:text-4xl lg:text-6xl'>
            hi my name is
          </span>
          <span className='block text-6xl sm:text-8xl lg:text-9xl font-extrabold'>
            Adam Sisk
          </span>
          <span className='block text-lg sm:text-2xl lg:text-3xl'>
            I make things on the internet
          </span>
        </h1>
      </Body>

      <Footer />
    </Layout>
  );
}

export default App;
