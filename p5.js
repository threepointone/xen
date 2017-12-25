// @flow

opaque type ColorMode = string;
opaque type ArcMode = string;
opaque type OriginMode = string;
opaque type StrokeCap = string;
opaque type StrokeJoin = string;
opaque type ShapeKind = string;
opaque type ShapeClose = string;
opaque type Cursor = string;
opaque type Renderer = string;
opaque type BlendMode = string;
opaque type DeviceOrientation = string;
opaque type KeyCode = number;
opaque type MouseButton = string;
opaque type Filter = string;

type Color = {
  toString: void => string,
  setRed: number => void,
  setGreen: number => void,
  setBlue: number => void,
  setAlpha: number => void,
};

type Vector = {
  toString: void => string,
};

type Element = {};

type Graphics = {};
type MediaElement = {};

type TypedDict = {};
type NumberedDict = {};
type Table = {};
type TableRow = {};
type XML = {};
type Font = {};

type Geometry = {};
type Matrix = {};
type RendererGL = {};
type Texture = {};
type Shader = {};

type Image = {
  width: number,
  height: number,
  pixels: Array<number>,
  loadPixels: void => void,
  get: (
    x?: number,
    y?: number,
    width?: number,
    height?: number,
  ) => Array<Color>,
  set: (x: number, y: number, any) => void, // todo
  resize: (width: number, height: number) => void,
  copy: (
    src: ?(Image | Graphics),
    sx: number,
    sy: number,
    sw: number,
    sh: number,
    dx: number,
    dy: number,
    dw: number,
    dh: number,
  ) => void,
  mask: (src: Image) => void,
  filter: (
    operation: | 'threshold'
    | 'gray'
    | 'invert'
    | 'posterize'
    | 'opaque'
    | 'erode'
    | 'dilate'
    | 'blur',
    value?: number,
  ) => void,
  blend: (
    src: ?(Image | Graphics),
    sx: number,
    sy: number,
    sw: number,
    sh: number,
    dx: number,
    dy: number,
    dw: number,
    dh: number,
    mode: BlendMode,
  ) => void,
  save: (filename: string, extension: string) => void,
};

type setters = [''];

export type P5 = {
  // color

  // creating & reading
  alpha: Color => number,
  blue: Color => number,
  brightness: Color => number,
  color: (any, ?any, ?any, ?any) => Color,
  green: Color => number,
  hue: Color => number,
  lerpColor: (Color, Color, number) => number,
  lightness: Color => number,
  red: Color => number,
  saturation: Color => number,

  // setting
  background: Color => void, // todo take all of color() args too
  clear: void => void,

  RGB: ColorMode,
  HSL: ColorMode,

  colorMode: ColorMode => void,
  fill: Color => void, // todo take all of color() args too
  noFill: void => void,
  noStroke: void => void,
  stroke: Color => void, // todo take all of color() args too

  // shapes

  // 2d primitives
  OPEN: ArcMode,
  CHORD: ArcMode,
  PIE: ArcMode,

  arc: (
    x: number,
    y: number,
    width: number,
    height: number,
    start: number,
    stop: number,
    mode?: ArcMode,
  ) => void,
  ellipse: (x: number, y: number, width: number, height: number) => void,
  line: (x1: number, y1: number, x2: number, y2: number) => void,
  point: (x: number, y: number) => void,
  quad: (
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    x3: number,
    y3: number,
    x4: number,
    y4: number,
  ) => void,
  rect: (
    x: number,
    y: number,
    w: number,
    h: number,
    tl?: number,
    tr?: number,
    br?: number,
    bl?: number,
  ) => void,
  triangle: (
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    x3: number,
    y3: number,
  ) => void,

  // attributes

  CENTER: OriginMode,
  RADIUS: OriginMode,
  CORNER: OriginMode,
  CORNERS: OriginMode,

  ellipseMode: OriginMode => void,
  noSmooth: void => void,
  rectMode: OriginMode => void,
  smooth: void => void,

  ROUND: StrokeCap,
  SQUARE: StrokeCap,
  PROJECT: StrokeCap,

  strokeCap: StrokeCap => void,

  MITER: StrokeJoin,
  BEVEL: StrokeJoin,
  ROUND: StrokeJoin,

  strokeJoin: StrokeJoin => void,
  strokeWeight: number => void,

  // curves
  bezier: (
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    x3: number,
    y3: number,
    x4: number,
    y4: number,
  ) => void, // todo - z-coordinate stuff?
  bezierDetail: number => void,
  bezierPoint: (
    start: number,
    control1: number,
    control2: number,
    fraction: number,
  ) => number,
  bezierTangent: (
    start: number,
    control1: number,
    control2: number,
    fraction: number,
  ) => number,
  curve: (
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    x3: number,
    y3: number,
    x4: number,
    y4: number,
  ) => void,
  curveDetail: number => void,
  curveTightness: number => void,
  curvePoint: (
    start: number,
    control1: number,
    control2: number,
    fraction: number,
  ) => number,
  curveTangent: (
    start: number,
    control1: number,
    control2: number,
    fraction: number,
  ) => number,

  // vertex
  beginContour: void => void,

  POINTS: ShapeKind,
  LINES: ShapeKind,
  TRIANGLES: ShapeKind,
  TRIANGLE_FAN: ShapeKind,
  TRIANGLE_STRIP: ShapeKind,
  QUADS: ShapeKind,
  QUAD_STRIP: ShapeKind,

  CLOSE: ShapeClose,

  beginShape: (?ShapeKind) => void,
  bezierVertex: (
    x2: number,
    y2: number,
    x3: number,
    y3: number,
    x4: number,
    y4: number,
  ) => void,
  curveVertex: (x: number, y: number) => void,
  endContour: void => void,
  endShape: (?ShapeClose) => void,
  quadraticVertex: (cx: number, cy: number, x3: number, y3: number) => void,
  vertex: (x: number, y: number, z?: boolean | number) => void, // todo - z?

  // 3d - todo

  // Constants
  HALF_PI: number,
  PI: number,
  QUARTER_PI: number,
  TAU: number,
  TWO_PI: number,

  // structure
  // defines
  preload(): void => void,
  setup: void => void,
  draw: void => void,

  // calls
  remove: void => void,
  noLoop: void => void,
  loop: void => void,
  push: void => void,
  pop: void => void,
  redraw: (?number) => void,

  // Environment
  print: any => void,
  frameCount: number,
  focused: boolean,

  ARROW: Cursor,
  CROSS: Cursor,
  HAND: Cursor,
  MOVE: Cursor,
  TEXT: Cursor,
  WAIT: Cursor,

  cursor: (cursor: Cursor, x?: number, y?: number) => void,
  frameRate: (void => number) | (number => void),
  getFrameRate: void => number,
  noCursor: void => void,
  displayWidth: number,
  displayHeight: number,
  windowWidth: number,
  windowHeight: number,
  width: number,
  height: number,
  fullscreen: (?boolean) => void,
  pixelDensity: (void => number) | (number => void),
  displayDensity: void => number,
  getURL: void => string,
  getURLPath: void => Array<string>,
  getURLParams: void => Object,

  // define
  windowResized: void => void,

  // todo
  // p5.Element
  // p5.Graphics

  P2D: Renderer,
  WEBGL: Renderer,

  createCanvas: (w: number, h: number, renderer?: Renderer) => void,
  resizeCanvas: (w: number, h: number, redraw?: boolean) => void,
  noCanvas: void => void,
  // todo - createGraphics()

  BLEND: BlendMode,
  DARKEST: BlendMode,
  LIGHTEST: BlendMode,
  DIFFERENCE: BlendMode,
  MULTIPLY: BlendMode,
  EXCLUSION: BlendMode,
  SCREEN: BlendMode,
  REPLACE: BlendMode,
  OVERLAY: BlendMode,
  HARD_LIGHT: BlendMode,
  SOFT_LIGHT: BlendMode,
  DODGE: BlendMode,
  BURN: BlendMode,
  ADD: BlendMode,
  NORMAL: BlendMode,

  blendMode: BlendMode => void,

  // transform
  // [ a c e
  //   b d f
  //   0 0 1 ]
  applyMatrix: (
    a: number,
    b: number,
    c: number,
    d: number,
    e: number,
    f: number,
  ) => void,
  resetMatrix: void => void,
  rotate: (angle: number, axis?: Vector) => void,
  rotateX: number => void,
  rotateY: number => void,
  rotateZ: number => void,
  scale: (x: number, y: number, z?: number) => void, // todo - vectors
  shearX: number => void,
  shearY: number => void,
  translate: (x: number, y: number, z?: number) => void,

  // todo - Data

  // Events
  // acceleration
  deviceOrientation: ?DeviceOrientation,
  accelerationX: number,
  accelerationY: number,
  accelerationZ: number,

  pAccelerationX: number,
  pAccelerationY: number,
  pAccelerationZ: number,

  rotationX: number,
  rotationY: number,
  rotationZ: number,

  pRotationX: number,
  pRotationY: number,
  pRotationZ: number,

  // todo - turnAxis
  setMoveThreshold: number => void,
  setShakeThreshold: number => void,

  // defines
  deviceMoved: void => void,
  deviceTurned: void => void,
  deviceShaken: void => void,

  // keyboard
  keyIsPressed: boolean,
  key: string,

  BACKSPACE: KeyCode,
  DELETE: KeyCode,
  ENTER: KeyCode,
  RETURN: KeyCode,
  TAB: KeyCode,
  ESCAPE: KeyCode,
  SHIFT: KeyCode,
  CONTROL: KeyCode,
  OPTION: KeyCode,
  ALT: KeyCode,
  UP_ARROW: KeyCode,
  DOWN_ARROW: KeyCode,
  LEFT_ARROW: KeyCode,
  RIGHT_ARROW: KeyCode,

  keyCode: number | KeyCode,
  keyIsDown: (number | KeyCode) => boolean,

  keyPressed: void => void,
  keyReleased: void => void,
  keyTyped: void => void,

  // mouse
  mouseX: number,
  mouseY: number,
  pmouseX: number,
  pmouseY: number,
  winMouseX: number,
  winMouseY: number,
  pwinMouseX: number,
  pwinMouseY: number,
  mouseButton: MouseButton,
  mouseIsPressed: boolean,
  mouseMoved: void => void,
  mouseDragged: void => void,
  mousePressed: void => void,
  mouseReleased: void => void,
  mouseClicked: void => void,
  doubleClicked: void => void,
  mouseWheel: ({ delta: number }) => ?boolean, // todo - ?bool for other defines where applicable

  // touch
  touches: Array<{ x: number, y: number, id: string }>,
  touchStarted: void => ?boolean,
  touchMoved: void => ?boolean,
  touchEnded: void => ?boolean,

  // Image
  createImage: (width: number, height: number) => Image,
  saveCanvas: (filename: string, extension: string) => void, // todo - selectedCanvas
  saveFrames: (
    filename: string,
    extension: string,
    duration: number,
    framerate: number,
  ) => void, // todo - callback

  // loading and displaying
  loadImage: (
    path: string,
    onSuccess?: (void) => void,
    onFailure?: (void) => void,
  ) => void,

  image:
    | ((
        img: Image | Graphics,
        x: number,
        y: number,
        width?: number,
        height?: number,
      ) => Image)
    | ((
        img: Image | Graphics,
        dx: number,
        dy: number,
        dWidth: number,
        dHeight: number,
        sx: number,
        sy: number,
        sWidth?: number,
        sHeight?: number,
      ) => Image),
  tint: Color => void, // todo - other formats
  noTint: void => void,
  imageMode: OriginMode => void, // todo - disallow  RADIUS

  // pixels
  pixels: Uint8ClampedArray,
  blend: (
    src: ?Image,
    sx: number,
    sy: number,
    sw: number,
    sh: number,
    dx: number,
    dy: number,
    dw: number,
    dh: number,
    mode: BlendMode,
  ) => void,
  copy: (
    src: ?Image,
    sx: number,
    sy: number,
    sw: number,
    sh: number,
    dx: number,
    dy: number,
    dw: number,
    dh: number,
  ) => void,

  THRESHOLD: Filter,
  GRAY: Filter,
  INVERT: Filter,
  POSTERIZE: Filter,
  OPAQUE: Filter,
  ERODE: Filter,
  DILATE: Filter,
  BLUR: Filter,
  filter: (operation: Filter, value?: number) => void,
  get: (x: number, y: number, w: number, h: number) => Image,
  loadPixels: void => void,
  set: (
    x: number,
    y: number,
    c: Number | Uint8ClampedArray | Color | Image,
  ) => void,
  updatePixels: (x?: number, y?: number, w?: number, h?: number) => void,

  // todo - IO

  // Math

  // todo - Typography

  // Lights, Camera

  // camera
  camera: (
    x?: number,
    y?: number,
    z?: number,
    centerX?: number,
    centerY?: number,
    centerZ?: number,
    upX?: number,
    upY?: number,
    upZ?: number,
  ) => void,
  perspective: (
    fovy?: number,
    aspect?: number,
    near?: number,
    far?: number,
  ) => void,
  ortho: (
    left: number,
    right: number,
    bottom: number,
    top: number,
    near: number,
    far: number,
  ) => void,

  // lights
  ambientLight: (color: Color) => void, // todo - other color formats
  directionalLight: (color: Color, position: Vector) => void, // todo - other color formats
  pointLight: (color: Color, position: Vector) => void, // todo - other color formats
  // material
  // shaders
  loadShader: (vertfile: string, shaderfile: string) => Shader,
  shader: Shader => void,
  normalMaterial: void => void,

  texture: (Image | MediaElement | Graphics) => void,
  ambientMaterial: Color => void, // todo - other forms
  specularMaterial: Color => void, // todo - other forms
};
