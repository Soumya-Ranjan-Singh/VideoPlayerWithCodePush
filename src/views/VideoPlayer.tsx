import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  BackHandler,
  NativeModules,
  AppState,
} from 'react-native';
import Video from 'react-native-video';
import Orientation, {OrientationType} from 'react-native-orientation-locker';
import {useNavigation, useRoute} from '@react-navigation/native';
import VideoPlayer from 'react-native-video-controls';

const VideoScreen = () => {
  const navigation = useNavigation();
  const {PipModule} = NativeModules;
  const route = useRoute();
  const {videoUrl} = route.params;
  const [fullscreen, setFullscreen] = useState(true);
  const [pipMode, setPipMode] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    console.log('cjuhyvr4f', Orientation.getInitialOrientation());
    Orientation.getOrientation(
      orientation =>
        OrientationType['LANDSCAPE-LEFT'] === orientation &&
        setFullscreen(false),
    );
  }, []);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleHardwareBackPress,
    );

    return () => backHandler.remove(); // Clean up the event listener on unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleHardwareBackPress = () => {
    // console.log('bygvvvgv');
    navigation.goBack();
    // Orientation.lockToPortrait();
    return true; // Prevent default behavior (exit app)
  };

  useEffect(() => {
    const handleAppStateChange = (nextAppState: string) => {
      if (nextAppState === 'background') {
        // Orientation.lockToPortrait();
        // Orientation.unlockAllOrientations();
        setFullscreen(false);
        setPipMode(true);
        PipModule.enterPipMode();
      } else {
        setPipMode(false);
        setFullscreen(true);
      }
    };

    const appStateSubscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    return () => {
      appStateSubscription.remove();
    };
  }, [PipModule]);

  // const onFullScreen = (isFullScreen: boolean) => {
  //   if (isFullScreen) {
  //     Orientation.lockToLandscape();
  //   } else {
  //     Orientation.unlockAllOrientations();
  //   }
  //   setFullscreen(isFullScreen);
  // };

  return (
    <View style={styles.container}>
      {pipMode ? (
        <Video
          source={{uri: videoUrl}}
          ref={videoRef}
          resizeMode="contain"
          style={{flex: 1}}
          playInBackground={false}
        />
      ) : (
        <VideoPlayer
          source={{uri: videoUrl}}
          ref={videoRef}
          controls={true}
          resizeMode="stretch"
          fullscreen={false}
          fullscreenAutorotate={true}
          fullscreenOrientation="landscape"
          pictureInPicture
          videoStyle={{flex: 1}}
          navigator={navigation}
          onBack={() => {
            navigation.goBack();
            //Orientation.getDeviceOrientation();
          }}
          //onEnterFullscreen={() => onFullScreen(true)}
          //onExitFullscreen={() => onFullScreen(false)}
        />
      )}
    </View>
  );
};

export default VideoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
