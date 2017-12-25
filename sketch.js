// @flow
// @jsx dom

import { xen, dom } from './xen';
import type { P5 } from './p5';

xen(function*(_: P5) {
  yield <scene width={200} height={200} background="yellowgreen" />;
  let ctr = 0;
  while (true) {
    ctr++;
    yield (
      <ellipse
        x={60 + ctr % 60}
        y={60 + ctr % 60}
        width={100}
        height={100}
        fill={200}
      />
    );
  }
}, 'root');
