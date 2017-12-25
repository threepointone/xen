// @flow
// @jsx dom
import 'regenerator-runtime';
import p5 from 'p5';
import type { P5 } from './p5';

type tag =
  // 2d
  | 'arc'
  | 'ellipse'
  | 'line'
  | 'point'
  | 'quad'
  | 'rect'
  | 'triangle'
  | 'bezier'
  | 'curve'
  | 'shape'
  | 'contour'
  | 'vertex'
  | 'bezierVertex'
  | 'curveVertex'
  //3d
  | 'plane'
  | 'box'
  | 'sphere'
  | 'cylinder'
  | 'cone'
  | 'ellipsoid'
  | 'torus'

  // image
  | 'image'
  // text
  | 'text'
  // cameras
  | 'camera'
  | 'perspective'
  | 'ortho'
  // lights
  | 'ambientLight'
  | 'directionalLight'
  | 'pointLight'
  | 'scene';

// scene? canvas? events?

type Node = {
  type: tag | Component,
  props: Object,
  children: Array<Node>,
};

type Component = (props: Object, ctx: P5) => Node;

// let's do this

const tags = {
  arc(
    {
      x,
      y,
      width,
      height,
      start,
      stop,
      mode,
    }: {
      x: number,
      y: number,
      width: number,
      height: number,
      start: number,
      stop: number,
      mode: 'open' | 'chord' | 'pie',
    },
    _: P5,
  ) {
    const pMode =
      mode === 'open'
        ? _.OPEN
        : mode === 'chord' ? _.CHORD : mode === 'pie' ? _.PIE : undefined;
    _.arc(x, y, width, height, start, stop, pMode);
  },
  ellipse(
    {
      x,
      y,
      width,
      height,
      mode,
    }: {
      x: number,
      y: number,
      width: number,
      height: number,
      mode?: 'center' | 'radius' | 'corner' | 'corners',
    },
    _: P5,
  ) {
    if (mode) {
      _.ellipseMode(_[mode.toUpperCase()]);
    }
    _.ellipse(x, y, width, height);
  },
  line({ x1, y1, x2, y2 }, _) {
    _.line(x1, y1, x2, y2);
  },
  point({ x, y }, _) {
    _.point(x, y);
  },
  quad({ x1, y1, x2, y2, x3, y3, x4, y4 }, _) {
    _.quad(x1, y1, x2, y2, x3, y3, x4, y4);
  },
  rect(
    {
      x,
      y,
      w,
      h,
      tl,
      tr,
      br,
      bl,
      mode,
    }: {
      x: number,
      y: number,
      w: number,
      h: number,
      tl: number,
      tr: number,
      br: number,
      bl: number,
      mode?: 'corner' | 'corners' | 'radius' | 'center',
    },
    _,
  ) {
    if (mode) {
      const pMode =
        mode === 'corner'
          ? _.CORNER
          : mode === 'corners'
            ? _.CORNERS
            : mode === 'radius'
              ? _.RADIUS
              : mode === 'center' ? _.CENTER : undefined;
      if (pMode) {
        _.rectMode(pMode);
      }
    }
    _.rect(x, y, w, h, tl, tr, br, bl);
  },
  triangle({ x1, y1, x2, y2, x3, y3 }, _) {
    _.triangle(x1, y1, x2, y2, x3, y3);
  },
  bezier({ x1, y1, x2, y2, x3, y3, x4, y4, detail }, _) {
    if (detail) {
      _.bezierDetail(detail);
    }
    _.bezier(x1, y1, x2, y2, x3, y3, x4, y4);
  },
  curve({ x1, y1, x2, y2, x3, y3, x4, y4, detail, tightness }, _) {
    if (detail) {
      _.curveDetail(detail);
    }
    if (tightness) {
      _.curveTightness(tightness);
    }
    _.curve(x1, y1, x2, y2, x3, y3, x4, y4);
  },
  shape({ vertices, kind }, _) {
    _.beginShape(kind);
  },
  shapeAfter({ vertices, kind }, _) {
    _.endShape();
  },
  vertex({ x, y, z }, _) {
    _.vertex(x, y, z);
  },
  bezierVertex({ x2, y2, x3, y3, x4, y4 }, _) {
    _.bezierVertex(x2, y2, x3, y3, x4, y4);
  },
  curveVertex({ x, y }, _) {
    _.curveVertex(x, y);
  },
  contour({}, _) {
    _.beginContour();
  },
  contourAfter({}, _) {
    _.endContour();
  },
  //3d
  // plane() {},
  // box() {},
  // sphere() {},
  // cylinder() {},
  // cone() {},
  // ellipsoid() {},
  // torus() {},

  // image
  // image() {},
  // text
  // text() {},
  // cameras
  camera({ x, y, z, centerX, centerY, centerZ, upX, upY, upZ }, _) {
    _.camera(x, y, z, centerX, centerY, centerZ, upX, upY, upZ);
  },
  perspective({ fovy, aspect, near, far }, _) {
    _.perspective(fovy, aspect, near, far);
  },
  ortho({ left, right, bottom, top, near, far }, _) {
    _.ortho(left, right, bottom, top, near, far);
  },
  // lights
  ambientLight({ color }, _) {
    _.ambientLight(color);
  },
  directionalLight({ color, position }, _) {
    _.directionalLight(color, position);
  },
  pointLight({ color, position }, _) {
    _.pointLight(color, position);
  },
  scene({ width, height, background }, _) {
    _.createCanvas(width, height);
    if (background) {
      _.background(background);
    }
  },
};

const setters = [
  'fill',
  'noFill',
  'noStroke',
  'stroke',

  'noSmooth',

  'smooth',
  'strokeCap',
  'strokeJoin',
  'strokeWeight',
];

export function dom(
  type: tag | Component,
  props: Object,
  ...children: Array<Node>
): Node {
  return { type, props, children };
}

function render({ type, props, children }: Node, _: P5) {
  if (typeof type === 'string') {
    _.push();
    Object.keys(props).forEach(key => {
      if (setters.indexOf(key) >= 0) {
        _[key](props[key]);
      }
    });
    tags[type](props, _);
    children.forEach(child => render(child, _));
    if (tags[type + 'After']) {
      tags[type + 'After'](props, _);
    }
    _.pop();
  } else if (typeof type === 'function') {
    render(type({ ...props, children }, _), _);
  }
}

export function xen(gen, ele) {
  let it: Iterator<*>, done;
  function next(i, _) {
    const frame = i.next();
    done = frame.done;
    if (frame.value) {
      render(frame.value, _);
    }
  }
  const p = new p5((_: P5) => {
    _.setup = () => {
      it = gen(_);
      next(it, _);
    };
    _.draw = () => {
      if (!done) {
        next(it, _);
      }
    };
  }, ele);
}
