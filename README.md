# Carousel for instrument

React Carousel component for Instrument skills test

## Installation
```sh
> yarn add @mattanglin/carousel
```

## Usage
```js
import React from 'react';
import { Carousel } from '@mattanglin/carousel';

const slides = [
  { src: 'http://placekitten.com/300/300', alt: 'Kitten number 1' },
  { src: 'http://placekitten.com/640/480', alt: 'Kitten number 2' },
  { src: 'http://placekitten.com/300/500', alt: 'Kitten number 3' },
]

const App = () => (
  <Carousel slides={mySlides} />
);

export default App;
```

## API

[Styleguide Docs](https://mattanglin.github.io/carousel-test/)
