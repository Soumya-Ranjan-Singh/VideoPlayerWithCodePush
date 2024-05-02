import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';
import React from 'react';
import DrawerSceneWrapper from '../navigation/DrawerScreenWrapper';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import DrawerIcon from '../assets/Drawer.svg';
import {TouchableOpacity} from 'react-native-gesture-handler';

const About = () => {
  const navigation = useNavigation();

  const isDarkMode = useColorScheme() === 'dark';

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

        <View
          style={[
            {
              backgroundColor: isDarkMode ? Colors.black : Colors.white,
            },
            styles.container,
          ]}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>About</Text>

            <TouchableOpacity
              onPress={() => {
                navigation.dispatch(DrawerActions.toggleDrawer());
              }}>
              <DrawerIcon height={20} width={30} style={styles.iconStyle} />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </DrawerSceneWrapper>
  );
};

export default About;

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
});
