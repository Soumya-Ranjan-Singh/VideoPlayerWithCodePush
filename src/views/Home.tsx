import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Thumbnail, createThumbnail} from 'react-native-create-thumbnail';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import CustomLoader from '../components/customLoader/CustomLoader';
import DrawerIcon from '../assets/Drawer.svg';
import DrawerSceneWrapper from '../navigation/DrawerScreenWrapper';

type VideoRenderer = {
  videoUrl: string;
  navigation: any;
  //setVideoPlayerOpened: React.Dispatch<React.SetStateAction<boolean>>;
};

const VideoThumbnail: React.FC<VideoRenderer> = ({
  videoUrl,
  navigation,
  //setVideoPlayerOpened,
}) => {
  const [thumbnail, setThumbnail] = useState<Thumbnail>();

  // Function to generate video thumbnails
  const generateVideoThumbnail = async (url: string) => {
    try {
      const thumbnailData = await createThumbnail({
        url: url,
        timeStamp: 10000,
        dirSize: 10,
        format: 'jpeg',
      });
      setThumbnail(thumbnailData);
    } catch (error) {
      console.error('Error generating video thumbnail:', error);
    }
  };

  useEffect(() => {
    generateVideoThumbnail(videoUrl); // Automatically generate thumbnail when component loads
  }, [videoUrl]);

  console.log('thumbnail', thumbnail);

  return (
    <TouchableOpacity
      style={styles.buttonStyle}
      onPress={() => {
        navigation.navigate('PLAYER', {videoUrl});
      }}>
      {thumbnail ? (
        <ImageBackground
          source={{uri: thumbnail?.path}}
          style={styles.thumbnailStyle}
        />
      ) : (
        <View>
          <ActivityIndicator size="large" color={'blue'} />
        </View>
      )}
    </TouchableOpacity>
  );
};

const Home = () => {
  const navigation = useNavigation();
  const isDarkMode = useColorScheme() === 'dark';
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    // Simulating loading for demonstration purposes
    //const basicLoaderTimeout = setTimeout(() => setLoadingBasic(false), 3000);
    const appLoaderTimeout = setTimeout(() => setIsLoading(false), 5000);

    return () => {
      //clearTimeout(basicLoaderTimeout);
      clearTimeout(appLoaderTimeout);
    };
  }, []);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  return (
    <DrawerSceneWrapper>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />

        {isLoading && (
          <CustomLoader
            loading={isLoading}
            type="app"
            icon={require('../assets/download.jpeg')}
            loadingTextRequire={true}
            requireIndicator={true}
          />
        )}

        <View
          style={[
            {
              backgroundColor: isDarkMode ? Colors.black : Colors.white,
            },
            styles.container,
          ]}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Home</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.dispatch(DrawerActions.toggleDrawer());
              }}>
              <DrawerIcon height={20} width={30} style={styles.iconStyle} />
            </TouchableOpacity>
          </View>

          <FlatList
            data={data}
            contentContainerStyle={styles.flatlistStyle}
            renderItem={({item, index}) => {
              return (
                <View key={index} style={styles.itemContainer}>
                  <VideoThumbnail
                    videoUrl={item}
                    navigation={navigation}
                    //setVideoPlayerOpened={setVideoPlayerOpened}
                  />
                </View>
              );
            }}
          />
        </View>
      </SafeAreaView>
    </DrawerSceneWrapper>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    backgroundColor: 'white',
    height: 80,
    width: 'auto',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
  },
  headerText: {
    fontSize: 20,
    color: 'black',
    alignSelf: 'center',
    textAlign: 'center',
    fontWeight: '700',
    position: 'absolute',
    left: 0,
    right: 0,
  },
  iconStyle: {
    marginLeft: 0,
  },
  flatlistStyle: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  itemContainer: {
    marginVertical: 5,
    backgroundColor: '#224476',
    borderRadius: 15,
    overflow: 'hidden',
  },
  buttonStyle: {
    height: 100,
  },
  thumbnailStyle: {
    height: 100,
    width: 100,
  },
});

const data: any[] = [
  'https://maven-543.s3.ap-south-1.amazonaws.com/test/hgliQiMmLa_SampleVideo_1280x720_30mb.mp4',
  'https://maven-543.s3.ap-south-1.amazonaws.com/test/BskKhzzdQz_4267245-uhd_3840_2160_30fps.mp4',
  'https://maven-543.s3.ap-south-1.amazonaws.com/test/hgliQiMmLa_SampleVideo_1280x720_30mb.mp4',
];
