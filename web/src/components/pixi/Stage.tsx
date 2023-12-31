import React from 'react';
import { Stage as PixiStage } from '@pixi/react';
import { ReactReduxContext } from 'react-redux';

interface ContextBrigeProps {
  children: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Context: React.Context<any>;
  render: (children: React.ReactNode) => React.ReactNode;
}

const ContextBridge = ({ children, Context, render }: ContextBrigeProps) => {
  return (
    <Context.Consumer>
      {(value) =>
        render(<Context.Provider value={value}>{children}</Context.Provider>)
      }
    </Context.Consumer>
  );
};

type StageProps = {
  children: React.ReactNode;
} & React.ComponentProps<typeof PixiStage>;

export const Stage = ({ children, ...props }: StageProps) => {
  return (
    <ContextBridge
      Context={ReactReduxContext}
      render={(children) => <PixiStage {...props}>{children}</PixiStage>}
    >
      {children}
    </ContextBridge>
  );
};

export default Stage;
