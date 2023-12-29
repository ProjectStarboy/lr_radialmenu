import { AppActions, AppDispatch } from '../store';
import { useNuiEvent } from '../hooks/useNuiEvent';
import { useDispatch } from 'react-redux';
import { Box, Text } from 'lr-components';
import { isEnvBrowser } from '../utils/misc';

interface Props {
  action: keyof typeof AppActions;
}

function AppActionHook(props: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const isDev = isEnvBrowser();
  console.log('AppActionHook', props.action);
  useNuiEvent(props.action, (data) => {
    //dynamicDispatch(action, data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const a = AppActions[props.action] as any;
    dispatch(a(data));
  });

  return (
    isDev && (
      <Box
        rPadding={5}
        backgroundColor='#1f1f1f'
        rBorderRadius={10}
        opacity={0.5}
      >
        <Text>{props.action}</Text>
      </Box>
    )
  );
}

export default AppActionHook;
