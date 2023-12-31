/* eslint-disable @typescript-eslint/no-unused-vars */
import { Container, Graphics, Sprite, Text } from '@pixi/react';
import React, { useEffect, useMemo } from 'react';
import * as PIXI from 'pixi.js';
import { animated, useSpring, easings } from '@react-spring/web';
import { useWindowSize } from 'lr-components';
import { AdvancedBloomFilter } from '@pixi/filter-advanced-bloom';
import { useDispatch } from 'react-redux';
import { AppActions, AppDispatch } from '../../store';
import { IItem } from '../../types';

interface ArcMenuItemProps {
  startAngle: number;
  size?: number;
  width: number;
  radius: number;
  cx: number;
  cy: number;
  item: IItem;
  index: number;
  background?: number;
  color?: number;
  onClick?: (index: number) => void;
}

const AnimatedGraphics = animated(Graphics);

const TextStyle = new PIXI.TextStyle({
  align: 'center',
  fontFamily: 'Anton',
  fontSize: 15,
  fontWeight: 'bold',
  fill: ['#ffffff'],
  stroke: '#000000',
});

function ArcMenuItem(props: ArcMenuItemProps) {
  const { ratioWidth } = useWindowSize();
  const {
    startAngle,
    size = 0.05,
    width,
    radius,
    cx,
    cy,
    item,
    background = 0x1f2326,
    color = 0xff4654,
    onClick: onIemClick,
    index,
  } = props;
  const cx2 = cx + Math.cos((startAngle + size / 2) * Math.PI) * 5;
  const cy2 = cy + Math.sin((startAngle + size / 2) * Math.PI) * 5;
  const [isHover, setIsHover] = React.useState(false);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (isHover) {
      const onClick = () => {
        onIemClick && onIemClick(index);
      };
      window.addEventListener('click', onClick);
      return () => {
        window.removeEventListener('click', onClick);
      };
    }
  }, [isHover, props]);

  const hitArea2 = useMemo(() => {
    const length = 20;
    const points: { x: number; y: number }[] = [];

    for (let i = 0; i <= length; i++) {
      const x =
        cx +
        Math.cos((startAngle + (size / length) * i) * Math.PI) *
          (radius + width / 2);
      const y =
        cy +
        Math.sin((startAngle + (size / length) * i) * Math.PI) *
          (radius + width / 2);
      points.push({ x, y });
    }
    for (let i = 0; i <= length; i++) {
      const x =
        cx +
        Math.cos((startAngle + (size / length) * (length - i)) * Math.PI) *
          (radius - width / 2);
      const y =
        cy +
        Math.sin((startAngle + (size / length) * (length - i)) * Math.PI) *
          (radius - width / 2);
      points.push({ x, y });
    }
    return new PIXI.Polygon(...points);
  }, [cx, cy, radius, size, startAngle, width]);

  const hitArea3 = useMemo(() => {
    const length = 20;
    const points: { x: number; y: number }[] = [];

    for (let i = 0; i <= length; i++) {
      const x =
        cx +
        Math.cos((startAngle + (size / length) * i) * Math.PI) *
          (radius + (width * 20) / 2);
      const y =
        cy +
        Math.sin((startAngle + (size / length) * i) * Math.PI) *
          (radius + (width * 20) / 2);
      points.push({ x, y });
    }
    for (let i = 0; i <= length; i++) {
      const x =
        cx +
        Math.cos((startAngle + (size / length) * (length - i)) * Math.PI) *
          (radius - width);
      const y =
        cy +
        Math.sin((startAngle + (size / length) * (length - i)) * Math.PI) *
          (radius - width);
      points.push({ x, y });
    }
    return new PIXI.Polygon(...points);
  }, [cx, cy, radius, size, startAngle, width]);

  return (
    <Container>
      <AnimatedGraphics
        draw={(g) => {
          g.clear();

          g.beginFill(isHover ? color : background, isHover ? 0.2 : 0.2);
          g.drawPolygon(hitArea2);
          g.endFill();
        }}
        interactive={true}
        pointerdown={() => {
          /* props.onClick(); */
        }}
        pointerover={(e) => {
          setIsHover(true);
          dispatch(AppActions.setSelectedItem(props.item));
          dispatch(AppActions.setSelectedIndex(props.index));
          /* props.onClick(); */
        }}
        pointerout={() => {
          setIsHover(false);
          dispatch(AppActions.setSelectedItem(null));
          dispatch(AppActions.setSelectedIndex(null));
        }}
        hitArea={hitArea3}
        cursor='pointer'
      />
      <Container>
        <AnimatedGraphics
          draw={(g) => {
            g.clear();

            if (isHover) {
              g.lineStyle(ratioWidth * 10, color, 1, 0.5, false);
              g.arc(
                cx,
                cy,
                radius - width / 2 - 10,
                startAngle * Math.PI,
                (startAngle + size) * Math.PI
              );
            }
          }}
        />
      </Container>
      <Container
        x={cx + Math.cos((startAngle + size / 2) * Math.PI) * radius}
        y={cy + Math.sin((startAngle + size / 2) * Math.PI) * radius}
        /* rotation={(startAngle + size / 2) * Math.PI + Math.PI} */
      >
        {item.icon ? (
          <Sprite
            image={`./icons/${item.icon}`}
            anchor={{ x: 0.5, y: 0.5 }}
            x={0}
            y={0}
            width={50 * ratioWidth}
            height={50 * ratioWidth}
            alpha={1.0}
          />
        ) : (
          <Text
            text={item.label}
            anchor={0.5}
            style={TextStyle}
            x={0}
            y={0}
            rotation={(startAngle + size / 2) * Math.PI + 0.5 * Math.PI}
          />
        )}
        {/* <Text
          text={props.item.label}
          anchor={0.5}
          style={TextStyle}
          x={20 * ratioWidth}
          y={0}
          rotation={1.5 * Math.PI}
        /> */}
      </Container>
    </Container>
  );
}

export default ArcMenuItem;
