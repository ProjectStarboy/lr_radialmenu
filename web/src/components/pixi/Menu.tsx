import { Container, Graphics } from '@pixi/react';
import React from 'react';
import ArcMenuItem from './ArcMenuItem';
import { useWindowSize } from 'lr-components';
import { animated, easings, useSpring } from '@react-spring/web';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { IItem } from '../../types';
import { fetchNui } from '../../utils/fetchNui';

interface Props {
  color?: number;
  background?: number;
  items: IItem[];
  width?: number;
  radius?: number;
}

const AnimatedGraphics = animated(Graphics);
const AnimatedContainer = animated(Container);

function Menu({ items, color, background, width = 120, radius = 220 }: Props) {
  const { ratioWidth } = useWindowSize();

  const selectedIndex = useSelector(
    (state: RootState) => state.main.selectedIndex
  );
  const itemSize = 2 / items.length;
  const selectorStyles = useSpring({
    from: {
      rotation: 0 * Math.PI,
      opacity: 0,
    },
    to: {
      rotation:
        selectedIndex !== undefined && selectedIndex !== null
          ? -selectedIndex * itemSize * Math.PI +
            ((items.length * itemSize) / 2) * Math.PI -
            itemSize * Math.PI
          : 1 * Math.PI,
      opacity: selectedIndex !== undefined && selectedIndex !== null ? 1 : 0,
    },
    config: {
      duration: 300,
      easing: easings.easeInOutBack,
    },
  });

  const onItemClick = (index: number) => {
    fetchNui('onMenuItemClick', { index });
  };
  if (items.length === 0) return null;

  return (
    <Container>
      {/* <Arc
        width={ratioWidth * 60}
        r={ratioWidth * 120}
        cx={ratioWidth * 960}
        cy={ratioWidth * 540}
        startAngle={0 * Math.PI}
        endAngle={2 * Math.PI}
        color={0xffffff}
        alpha={0.2}
      /> */}
      {selectedIndex !== undefined && selectedIndex !== null && (
        <AnimatedContainer
          rotation={selectorStyles.rotation}
          position={[ratioWidth * 960, ratioWidth * 540]}
          pivot={[ratioWidth * 960, ratioWidth * 540]}
          alpha={selectorStyles.opacity}
        >
          <AnimatedGraphics
            draw={(g) => {
              g.clear();
              g.lineStyle(ratioWidth * 120, 0xff4654, 1.0, 0.5);
              g.arc(
                ratioWidth * 960,
                ratioWidth * 540,
                ratioWidth * 220,
                1 * Math.PI,
                (1 + itemSize - 0.005) * Math.PI
              );
              g.endFill();
            }}
            interactive={true}
            pointerdown={() => {}}
          />
        </AnimatedContainer>
      )}
      {items.map((item, index) => {
        return (
          <ArcMenuItem
            startAngle={
              1 + (items.length * itemSize) / 2 - itemSize - index * itemSize
            }
            width={ratioWidth * width}
            size={itemSize - 0.005}
            radius={ratioWidth * radius}
            cx={ratioWidth * 960}
            cy={ratioWidth * 540}
            item={item}
            index={index}
            color={color}
            background={background}
            onClick={onItemClick}
          />
        );
      })}
    </Container>
  );
}

export default Menu;
