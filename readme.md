## xen

jsx and generators for p5.js

```jsx
xen(function*(_) {
  let ctr = 0;
  yield <scene background={0} noStroke />;

  while (true) {
    yield (
      <rect
        x={a++ % _.width}
        y={10}
        width={2}
        height={80}
        fill={102}
        stroke="red"
      />
    );
  }
});
```

* hot reloading
* iterable components
* proper types
