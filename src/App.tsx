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
        <div><div className='op-interactive' id='6399fe5e00021864c0757f62' data-title='Open Field - What question do you want to ask your pros' data-url='https://ramseysolutions.outgrow.us/6399fe5e00021864c0757f62?vHeight=1' data-width='100%'></div><script src='//dyv6f9ner1ir9.cloudfront.net/assets/js/nloader.js'></script><script>initIframe('6399fe5e00021864c0757f62');</script></div>
      </Body>

      <Footer />
    </Layout>
  );
}

export default App;
