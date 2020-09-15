import {
  getFloatInRange,
  getIntInRange
} from "@/shared/utils/randomGenerator.util";

class Circle {
  private opacity: number = getFloatInRange(0.05, 0.9);
  private counter = 0;
  private direction = 0;
  private start = 0;

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
    if (this.start === 0) {
      const randomInt = getFloatInRange(0, 1);
      if (randomInt < 0.2) {
        this.arc();
      } else if (randomInt >= 0.2 && randomInt < 0.4) {
        this.rect();
      } else {
        this.tri();
      }
    }
    this.context.fillStyle = `rgba(${getFloatInRange(0, 1) *
      255}, ${getFloatInRange(0, 1) * 255}, ${getFloatInRange(0, 1) * 255},  ${
      this.opacity
    })`;
    this.context.fill();

    if (this.opacity <= 0) {
      this.counter = 0;
      this.opacity = getFloatInRange(0.05, 0.9);
      this.width = getIntInRange(2, 10);
      this.speed = getFloatInRange(0.1, 1);
    }
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
    this.context.fillRect(this.xPos, this.yPos, this.width, this.width);
  }

  public tri(): void {
    this.context.beginPath();
    this.context.moveTo(this.xPos, this.yPos + this.width);
    this.context.moveTo(this.xPos + this.width, this.yPos + this.width);
    this.context.moveTo(this.xPos, this.yPos);
    this.context.closePath();
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
  const circleCount = 50;
  const circles: Circle[] = getCircles(circleCount, canvas, context);

  if (context) {
    draw(canvas, context, circles);
  }

  return {
    draw,
    circles
  };
};
