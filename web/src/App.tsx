import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppActions, AppDispatch, RootState } from './store';
import { ToastContainer } from 'react-toastify';
import { Box, Text, useWindowSize } from 'lr-components';
import { NextUIProvider } from '@nextui-org/react';
import AppActionHook from './components/AppActionHook';
import { isEnvBrowser } from './utils/misc';
import { fetchNui } from './utils/fetchNui';
import Stage from './components/pixi/Stage';
import Menu from './components/pixi/Menu';
import { Globals } from '@react-spring/web';

function App() {
  const { ratioWidth } = useWindowSize();
  /* const selectedItem = useSelector(
    (state: RootState) => state.main.selectedItem
  );
  const show = useSelector((state: RootState) => state.main.show);
  const menuItems = useSelector((state: RootState) => state.main.items); */
  const store = useSelector((state: RootState) => state.main);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (!isEnvBrowser()) {
      setTimeout(() => {
        fetchNui('AppReady');
      }, 2000);
    } else {
      setTimeout(() => {
        dispatch(
          AppActions.setMainData({
            items: [
              {
                label: 'Handcuff',
              },
              {
                label: 'Frisk',
              },
              {
                label: 'Fingerprint',
              },
              {
                label: 'Jail',
              },
              {
                label: 'Search',
              },
            ],
          })
        );
      }, 2000);
    }
  }, []);
  useEffect(() => {
    Globals.assign({
      skipAnimation: store.disableAnimation,
    });
  }, [store.disableAnimation]);

  return (
    <NextUIProvider>
      <Box
        display='flex'
        position='absolute'
        flexWrap='wrap'
        justifyContent='center'
        alignItems='center'
        flexDirection='column'
        width={'50%'}
        height={'50%'}
        rGap={10}
      >
        {Object.keys(AppActions).map((action) => {
          return (
            <AppActionHook
              action={action as keyof typeof AppActions}
            ></AppActionHook>
          );
        })}
      </Box>
      {store.show && (
        <Box
          width={'100vw'}
          height={'100vh'}
          position='absolute'
          top={0}
          left={0}
          display='flex'
          justifyContent='center'
          alignItems='center'
          className='prose'
          pointerEvents='none'
        >
          <Stage
            width={ratioWidth * 1920}
            height={ratioWidth * 1080}
            options={{ backgroundAlpha: 0, antialias: true }}
            style={{
              position: 'absolute',
              zIndex: 1,
              pointerEvents: 'none',
            }}
          >
            {store.items.length > 0 && (
              <Menu
                items={store.items}
                color={store.color}
                background={store.background}
                width={store.width}
                radius={store.radius}
              />
            )}
          </Stage>
          <Box
            position='absolute'
            rWidth={320}
            rHeight={320}
            backgroundColor='#2525255e'
            borderRadius={'100%'}
            display='flex'
            justifyContent='center'
            alignItems='center'
          >
            {store.selectedItem ? (
              <Box>
                <Text
                  color='white'
                  fontFamily='Anton'
                  rFontSize={30}
                  textAlign='center'
                >
                  {store.selectedItem.label}
                </Text>
                <Text
                  color='white'
                  fontFamily='Anton'
                  rFontSize={20}
                  textAlign='center'
                >
                  {store.selectedItem.desc}
                </Text>
              </Box>
            ) : (
              <Box
                rWidth={200}
                rHeight={200}
                borderRadius={'100%'}
                backgroundColor='#ff4654'
                background={
                  'radial-gradient(circle, rgba(255,70,84,1) 0%, rgba(255,70,84,1) 62%, rgba(215,63,74,1) 100%)'
                }
                display='flex'
                justifyContent='center'
                alignItems='center'
                cursor='pointer'
                onClick={() => {
                  console.log('onClose');
                  fetchNui('close');
                }}
                pointerEvents='all'
              >
                <Text
                  color='white'
                  fontFamily='Anton'
                  rFontSize={30}
                  textAlign='center'
                >
                  CLOSE
                </Text>
              </Box>
            )}
          </Box>
        </Box>
      )}

      <ToastContainer pauseOnFocusLoss={false} hideProgressBar={true} />
    </NextUIProvider>
  );
}

export default App;
