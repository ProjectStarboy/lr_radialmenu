import { PixiComponent } from '@pixi/react';
import * as PIXI from 'pixi.js';

interface ArcProps {
  cx: number;
  cy: number;
  r: number;
  width: number;
  startAngle?: number;
  endAngle?: number;
  color?: number;
  alpha?: number;
}

const Arc = PixiComponent<ArcProps, PIXI.Graphics>('Arc', {
  create: () => new PIXI.Graphics(),
  applyProps: (instance, _, props) => {
    instance.clear();
    instance.lineStyle(props.width, props.color || 0xff0000, props.alpha, 0.5);
    instance.arc(
      props.cx,
      props.cy,
      props.r,
      props.startAngle || 0,
      props.endAngle || 2 * Math.PI
    );
    instance.endFill();
  },
});

export default Arc;
