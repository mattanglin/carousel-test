import React from 'react';
import Carousel from './components/Carousel/Carousel';

// Generate random images for test:
const sizes = [200, 250, 300, 350, 400, 450, 500]
const slides = Array.from({ length: 5 }).map(() => {
  const width = sizes[Math.floor(Math.random() * sizes.length)]
  const height = sizes[Math.floor(Math.random() * sizes.length)]

  return ({

    src: `http://placekitten.com/${width}/${height}`,
    alt: 'Fluffy Little Kittens'
  })
})

const App = () => (
  <div>
    <h1>Test App for Carousel Component</h1>
    <div style={{ margin: 'auto', marginTop: 30, maxWidth: 600 }}>
      <Carousel slides={slides} timeout={3} />
    </div>
  </div>
);

export default App;
