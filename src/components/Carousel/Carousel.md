```jsx
const sizes = [200, 250, 300, 350, 400, 450, 500]
const slides = Array.from({ length: 5 }).map(() => {
  const width = sizes[Math.floor(Math.random() * sizes.length)]
  const height = sizes[Math.floor(Math.random() * sizes.length)]

  return ({
    src: `http://placekitten.com/${width}/${height}`,
    alt: 'Fluffy Little Kittens'
  })
});

<div>
  <Carousel slides={slides} />
</div>
```