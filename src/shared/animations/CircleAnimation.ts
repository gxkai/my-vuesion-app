import {
  getFloatInRange,
  getIntInRange
} from "@/shared/utils/randomGenerator.util";

function randomColor() {
  // 返回一个0-255的数值，三个随机组合为一起可定位一种rgb颜色
  let num = 3;
  const color: number[] = [];
  while (num--) {
    color.push(Math.floor(Math.random() * 254 + 1));
  }
  return color.join(", ");
}
interface ILocation {
  x: number;
  y: number;
}
const CONFIG = {
  kiraRadius: 5,
  kiraLineWidth: 2,
  kiraSpeed: 0.3,
  biuSpeed: 2,
  biuAcceleration: 1.02,
  biuCollectionCount: 10,
  biuLineWidth: 3,
  boomSpeed: 10,
  boomAcceleration: 0.95,
  boomAngel: Math.PI * 2,
  boomTargetCount: 100,
  boomGradient: 0.015,
  boomGravity: 0.98,
  boomCollectionCont: 2,
  boomLineWidth: 3,
  animateTimerTarget: 50
};
// 目标
class Kirakira {
  private targetLocation: ILocation;
  private radius: number;
  private context: CanvasRenderingContext2D;
  private start: number;
  constructor(
    targetX: number,
    targetY: number,
    context: CanvasRenderingContext2D
  ) {
    this.start = 0;
    // 指定产生的坐标点
    this.targetLocation = { x: targetX, y: targetY };
    this.radius = 1;
    this.context = context;
  }
  draw() {
    const context = this.context;
    // 绘制一个圆
    context.beginPath();
    context.arc(
      this.targetLocation.x,
      this.targetLocation.y,
      this.radius,
      0,
      Math.PI * 2
    );
    context.lineWidth = 2;
    context.strokeStyle = `rgba(${randomColor()}, 1)`;
    context.stroke();
  }

  update() {
    this.start++;
    // 让圆进行扩张，实现闪烁效果
    // if (this.radius < 5) {
    //   this.radius += 0.3;
    // } else {
    //   this.radius = 1;
    // }
  }

  init() {
    // this.draw();
    this.heart();
    this.update();
  }

  public heart(): void {
    const context = this.context;
    context.beginPath();
    context.save();
    //这里一定要先平移再旋转
    context.translate(this.targetLocation.x - 20, this.targetLocation.y + 20);
    //绘制的坐标系是从左上角到右下角
    context.rotate(Math.PI);
    context.strokeStyle = "";
    context.scale(this.start / 60, this.start / 60);
    //eval函数可以实现类似高级语言的反射效果
    eval("this.shape" + 3 + "()");
    // context.fillStyle =`rgba(${randomColor()}, 1)`;
    context.fillStyle = "red";
    context.fill();
    context.lineWidth = 0.1;
    context.stroke();
    context.restore();
  }
  public shape3(): void {
    const r = 0.01;
    const arr = [];
    for (let t = 0; t <= 60; t += 0.5) {
      const x =
        0.01 *
        (-Math.pow(t, 2) + 40 * t + 1200) *
        Math.sin((Math.PI * t) / 180);
      const y =
        0.01 *
        (-Math.pow(t, 2) + 40 * t + 1200) *
        Math.cos((Math.PI * t) / 180);
      this.context.lineTo(x, y);
      // @ts-ignore
      arr.push(-x, y);
    }
    for (let i = arr.length - 1; i > 0; i -= 2) {
      this.context.lineTo(arr[i - 1], arr[i]);
    }
  }
}

class Biubiubiu {
  private startLocation: ILocation;
  private targetLocation: ILocation;
  private nowLoaction: ILocation;
  private targetDistance: number;
  private speed: number;
  private acceleration: number;
  private angle: number;
  private collection: any[];
  private arrived: boolean;
  private context: CanvasRenderingContext2D;

  constructor(
    startX,
    startY,
    targetX,
    targetY,
    context: CanvasRenderingContext2D
  ) {
    this.context = context;
    this.startLocation = { x: startX, y: startY };
    this.targetLocation = { x: targetX, y: targetY };
    // 运动当前的坐标，初始默认为起点坐标
    this.nowLoaction = { x: startX, y: startY };
    // 到目标点的距离
    this.targetDistance = this.getDistance(
      this.startLocation.x,
      this.startLocation.y,
      this.targetLocation.x,
      this.targetLocation.y
    );
    // 速度
    this.speed = 2;
    // 加速度
    this.acceleration = 1.02;
    // 角度
    this.angle = Math.atan2(
      this.targetLocation.y - this.startLocation.y,
      this.targetLocation.x - this.startLocation.x
    );

    // 线段集合
    this.collection = [];
    // 线段集合, 每次存10个，取10个帧的距离
    this.collection = new Array(CONFIG.biuCollectionCount);
    // 是否到达目标点
    this.arrived = false;
  }

  draw() {
    const context = this.context;
    context.beginPath();
    try {
      context.moveTo(this.collection[0][0], this.collection[0][1]);
    } catch (e) {
      context.moveTo(this.nowLoaction.x, this.nowLoaction.y);
    }
    context.lineWidth = 3;
    context.lineCap = "round";
    context.lineTo(this.nowLoaction.x, this.nowLoaction.y);
    context.strokeStyle = `rgba(${randomColor()}, 0)`;
    context.stroke();
  }

  update() {
    this.collection.shift();
    this.collection.push([this.nowLoaction.x, this.nowLoaction.y]);
    this.speed *= this.acceleration;
    const vx = Math.cos(this.angle) * this.speed;
    const vy = Math.sin(this.angle) * this.speed;
    const nowDistance = this.getDistance(
      this.startLocation.x,
      this.startLocation.y,
      this.nowLoaction.x + vx,
      this.nowLoaction.y + vy
    );
    if (nowDistance >= this.targetDistance) {
      this.arrived = true;
    } else {
      this.nowLoaction.x += vx;
      this.nowLoaction.y += vy;
      this.arrived = false;
    }
  }

  getDistance(x0, y0, x1, y1) {
    // 计算两坐标点之间的距离
    const locX = x1 - x0;
    const locY = y1 - y0;
    // 勾股定理
    return Math.sqrt(Math.pow(locX, 2) + Math.pow(locY, 2));
  }

  init() {
    this.draw();
    this.update();
  }
}

class Boom {
  private startLocation: ILocation;
  private nowLocation: ILocation;
  private speed: number;
  private acceleration: number;
  private angle: number;
  private targetCount: number;
  private nowNum: number;
  private alpha: number;
  private grads: number;
  private gravity: number;
  private collection: any[];
  private arrived: boolean;
  private context: CanvasRenderingContext2D;
  // 爆炸物是没有确定的结束点坐标， 这个可以通过设定一定的阀值来限定
  constructor(
    startX: number,
    startY: number,
    context: CanvasRenderingContext2D
  ) {
    this.context = context;
    this.startLocation = { x: startX, y: startY };
    this.nowLocation = { x: startX, y: startY };
    // 速度
    this.speed = Math.random() * 10 + 2;
    // 加速度
    this.acceleration = 0.95;
    // 没有确定的结束点，所以没有固定的角度，可以随机角度扩散
    this.angle = Math.random() * Math.PI * 2;
    // 这里设置阀值为100
    this.targetCount = 100;
    // 当前计算为1，用于判断是否会超出阀值
    this.nowNum = 1;
    // 透明度
    this.alpha = 1;
    // 透明度减少梯度
    this.grads = 0.015;
    // 重力系数
    this.gravity = 0.98;

    // 线段集合, 每次存10个，取10个帧的距离
    this.collection = new Array(10);

    // 是否到达目标点
    this.arrived = false;
  }

  draw() {
    const context = this.context;
    context.beginPath();
    try {
      context.moveTo(this.collection[0][0], this.collection[0][1]);
    } catch (e) {
      context.moveTo(this.nowLocation.x, this.nowLocation.y);
    }
    context.lineWidth = 3;
    context.lineCap = "round";
    context.lineTo(this.nowLocation.x, this.nowLocation.y);
    // 设置由透明度减小产生的渐隐效果，看起来没这么突兀
    context.strokeStyle = `rgba(${randomColor()}, ${this.alpha})`;
    context.stroke();
  }

  update() {
    this.collection.shift();
    this.collection.push([this.nowLocation.x, this.nowLocation.y]);
    this.speed *= this.acceleration;

    const vx = Math.cos(this.angle) * this.speed;
    // 加上重力系数，运动轨迹会趋向下
    const vy = Math.sin(this.angle) * this.speed + this.gravity;

    // 当前计算大于阀值的时候的时候，开始进行渐隐处理
    if (this.nowNum >= this.targetCount) {
      this.alpha -= this.grads;
    } else {
      this.nowLocation.x += vx;
      this.nowLocation.y += vy;
      this.nowNum++;
    }

    // 透明度为0的话，可以进行移除处理，释放空间
    if (this.alpha <= 0) {
      this.arrived = true;
    }
  }

  init() {
    this.draw();
    this.update();
  }
}

class Animate {
  private startX: number;
  private startY: number;
  private targetX: number;
  private targetY: number;
  private kiras: any[];
  private bius: any[];
  private booms: any[];
  private timerTarget: number;
  private timerNum: number;
  private context: CanvasRenderingContext2D;
  private canvas: HTMLCanvasElement;
  private cw: number;
  private ch: number;
  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.cw = canvas.width;
    this.ch = canvas.height;
    this.context = canvas.getContext("2d") as CanvasRenderingContext2D;
    // 用于记录当前实例化的坐标点
    this.startX = 0;
    this.startY = 0;
    this.targetX = 0;
    this.targetY = 0;
    // 定义一个数组做为闪烁球的集合
    this.kiras = [];
    // 定义一个数组做为射线类的集合
    this.bius = [];
    // 定义一个数组做为爆炸类的集合
    this.booms = [];
    // 避免每帧都进行绘制导致的过量绘制，设置阀值，到达阀值的时候再进行绘制
    this.timerTarget = 80;
    this.timerNum = 0;
  }

  pushBoom(x, y) {
    const context = this.context;
    // 实例化爆炸效果，随机条数的射线扩散
    for (let bi = Math.random() * 10 + 20; bi > 0; bi--) {
      this.booms.push(new Boom(x, y, context));
    }
  }

  run() {
    const context = this.context;
    const cw = this.cw;
    const ch = this.ch;
    window.requestAnimationFrame(this.run.bind(this));
    context.clearRect(0, 0, cw, ch);

    let biuNum = this.bius.length;
    while (biuNum--) {
      this.bius[biuNum].init();
      this.kiras[biuNum].init();
      if (this.bius[biuNum].arrived) {
        // 到达目标后，可以开始绘制爆炸效果, 当前线条的目标点则是爆炸实例的起始点
        this.pushBoom(
          this.bius[biuNum].nowLoaction.x,
          this.bius[biuNum].nowLoaction.y
        );

        // 到达目标后，把当前类给移除，释放空间
        this.bius.splice(biuNum, 1);
        this.kiras.splice(biuNum, 1);
      }
    }

    let bnum = this.booms.length;
    while (bnum--) {
      // 触发动画
      this.booms[bnum].init();
      if (this.booms[bnum].arrived) {
        // 到达目标透明度后，把炸点给移除，释放空间
        this.booms.splice(bnum, 1);
      }
    }

    if (this.timerNum >= this.timerTarget) {
      // 到达阀值后开始绘制实例化射线
      this.startX = Math.random() * (cw / 2);
      this.startY = ch;
      this.targetX = Math.random() * cw;
      this.targetY = Math.random() * (ch / 2);
      const exBiu = new Biubiubiu(
        this.startX,
        this.startY,
        this.targetX,
        this.targetY,
        context
      );
      const exKira = new Kirakira(this.targetX, this.targetY, context);
      this.bius.push(exBiu);
      this.kiras.push(exKira);
      // 到达阀值后把当前计数重置一下
      this.timerNum = 0;
    } else {
      this.timerNum++;
    }
  }
}

class Circle {
  private opacity: number = getFloatInRange(0.05, 0.9);
  private counter = 0;
  private direction = 0;
  private start = 0;
  private color = "";
  constructor(
    private context: CanvasRenderingContext2D,
    private radius: number,
    private speed: number,
    private width: number,
    private xPos: number,
    private yPos: number
  ) {
    this.direction = getIntInRange(0, 1) === 1 ? -1 : 1;
  }
  public update(): void {
    this.counter += this.direction * this.speed;

    const opacityDirection: number = getIntInRange(0, 1) === 1 ? -1 : 1;
    this.opacity += opacityDirection * (getIntInRange(0, 999) / 50000);
    this.start++;
    this.randomShape();
    if (this.start % 100 === 0) {
      this.color = `rgb(${getFloatInRange(0, 1) * 255}, ${getFloatInRange(
        0,
        1
      ) * 255}, ${getFloatInRange(0, 1) * 255})`;
    }
    this.context.fillStyle = this.color;
    this.context.fill();

    if (this.opacity <= 0) {
      this.counter = 0;
      this.opacity = getFloatInRange(0.05, 0.9);
      this.width = getIntInRange(2, 10);
      this.speed = getFloatInRange(0.1, 1);
    }
  }

  public randomShape(): void {
    const randomInt = getFloatInRange(0, 1);
    this.heart();
  }

  public arc(): void {
    this.context.beginPath();

    this.context.arc(
      this.xPos + Math.cos(this.counter / 100) * this.radius,
      this.yPos + Math.sin(this.counter / 100) * this.radius,
      this.width,
      0,
      Math.PI * 2,
      false
    );

    this.context.closePath();
  }

  public rect(): void {
    this.context.fillRect(
      this.xPos + Math.cos(this.counter / 100) * this.radius,
      this.yPos + Math.cos(this.counter / 100) * this.radius,
      this.width,
      this.width
    );
  }

  public heart(): void {
    this.context.beginPath();
    this.context.save();
    //这里一定要先平移再旋转
    this.context.translate(
      this.xPos + Math.cos(this.counter / 100) * this.radius - 20,
      this.yPos + Math.cos(this.counter / 100) * this.radius + 20
    );
    //绘制的坐标系是从左上角到右下角
    this.context.rotate(Math.PI);
    this.context.scale(this.start / 60, this.start / 60);
    this.context.strokeStyle = "#ffffff";
    //eval函数可以实现类似高级语言的反射效果
    eval("this.shape" + 3 + "()");
    this.context.stroke();
    this.context.restore();
  }

  public shape1(): void {
    const part = (2 * Math.PI) / 500;
    //这里用的是笛卡尔坐标系的极坐标方程
    let start = 0;
    for (let i = 0; i < 500; i++) {
      start += part;
      const end = start + part;
      //这里如果将start*2就变成斜8字了，乘3就变成3叶草
      const r = 10 * (1 - Math.sin(start));
      this.context.arc(0, 0, r, start, end, false);
    }
    this.context.stroke();

    // this.context.beginPath();
    // this.context.translate(20, 20);
    // for(let i=0; i<500; i++) {
    //   start += part;
    //   const end = start + part;
    //   //这里如果将start*2就变成斜8字了，乘3就变成3叶草
    //   const r = 10 * (1 - Math.sin(start*8));
    //   this.context.arc(0, 0, r, start, end, false);
    // }
  }

  public shape2(): void {
    const part = (2 * Math.PI) / 500;
    let t = 0;
    for (let i = 0; i < 500; i++) {
      t += part;
      const x = 16 * Math.pow(Math.sin(t), 3);
      const y =
        13 * Math.cos(t) -
        5 * Math.cos(2 * t) -
        2 * Math.cos(3 * t) -
        Math.cos(4 * t);
      this.context.lineTo(x, y);
    }
  }

  public shape3(): void {
    const r = 0.01;
    const arr = [];
    for (let t = 0; t <= 60; t += 0.5) {
      const x =
        0.01 *
        (-Math.pow(t, 2) + 40 * t + 1200) *
        Math.sin((Math.PI * t) / 180);
      const y =
        0.01 *
        (-Math.pow(t, 2) + 40 * t + 1200) *
        Math.cos((Math.PI * t) / 180);
      this.context.lineTo(x, y);
      // @ts-ignore
      arr.push(-x, y);
    }
    for (let i = arr.length - 1; i > 0; i -= 2) {
      this.context.lineTo(arr[i - 1], arr[i]);
    }
  }

  public shape4(): void {
    const a = 5;
    const arr = [];
    for (let x = -3; x <= 3; x += 0.05) {
      const y1 =
        Math.sqrt(9 - Math.pow(x, 2)) + Math.pow(Math.pow(x, 2), 1 / 3);
      const y2 =
        -Math.sqrt(9 - Math.pow(x, 2)) + Math.pow(Math.pow(x, 2), 1 / 3);
      this.context.lineTo(a * x, a * y1);
      // @ts-ignore
      arr.push(a * x, a * y2);
    }
    for (let i = arr.length - 1; i > 0; i -= 2) {
      this.context.lineTo(arr[i - 1], arr[i]);
    }
  }
}

const getCircles = (
  circleCount: number,
  canvas: HTMLCanvasElement | any,
  context: CanvasRenderingContext2D | any
): Circle[] => {
  const localCircles: any[] = [];

  for (let i = 0; i < circleCount; i++) {
    localCircles.push(
      new Circle(
        context,
        getIntInRange(50, 350),
        getFloatInRange(0.1, 1),
        getFloatInRange(2, 10),
        getIntInRange(0, canvas.width),
        getIntInRange(0, canvas.height)
      )
    );
  }

  return localCircles;
};
const draw = (
  canvas: HTMLCanvasElement | any,
  context: CanvasRenderingContext2D | any,
  circles: Circle[]
): void => {
  context.clearRect(0, 0, canvas.width, canvas.height);

  circles.forEach((circle: Circle) => {
    circle.update();
  });

  /* istanbul ignore next */
  (window as any).requestAnimationFrame(() => {
    draw(canvas, context, circles);
  });
};

export const CircleAnimation = (canvas: HTMLCanvasElement | any): any => {
  const context: CanvasRenderingContext2D | any = canvas.getContext("2d");
  const circleCount = 2;
  const circles: Circle[] = getCircles(circleCount, canvas, context);

  if (context) {
    // draw(canvas, context, circles);
    new Animate(canvas).run();
  }

  return {
    draw,
    circles
  };
};
