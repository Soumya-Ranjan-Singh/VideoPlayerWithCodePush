/* eslint-disable react-native/no-inline-styles */

/**
 * CustomLoaderProps describes the props for the CustomLoader component.
 * @typedef {Object} CustomLoaderProps
 * @property {boolean} loading - Indicates whether the loader is currently in a loading state.
 * @property {'basic' | 'app'} type - Specifies the type of loader, either 'basic' or 'app'.
 * Note: If you specify 'app' type then pass the icon prop to show the app icon/loader icon. And you have to specify whether you require indicator or not.
 * @property {boolean} [requireIndicator] - Specifies whether an indicator is required.
 * @property {boolean} [loadingTextRequire] - Specifies whether loading text is required.
 * @property {string} [loadingText] - The text to display in primary loading text while loading.
 * @property {ImageSourcePropType} [icon] - The icon to display during loading.
 * Note: If you are using icon don't send iconPath prop and vice-versa.
 * @property {string} [iconPath] - The URL path for the icon.
 * Note: If you are using iconPath don't send icon prop and vice-versa.
 * @property {string[]} [indicatorColorsArray] - An array of colors for the loader indicator. The size of array should be 5.
 * @property {number} [customSizeForIndicatiorRotation] - Specifies a custom size for the loader indicator rotation.
 * @property {number} [indicatorDotSize] - Specifies the size of the loader indicator dots.
 * @property {ViewStyle} [containerStyle] - Additional styles for the container of the loader.
 * @property {ViewStyle} [backdropStyle] - Additional styles for the loader backdrop.
 * @property {ImageStyle} [iconStyle] - Additional styles for the loader icon.
 * @property {TextStyle} [loadingTextStyle] - Additional styles for the loading text.
 * @property {ReactNode} [children] - The React Text component to be rendered as children.
 */

import React, {useEffect, useRef, useState} from 'react';
import {Animated, Easing, StyleSheet, View, Text, Image} from 'react-native';
const CustomLoader = ({
  loading,
  type,
  requireIndicator,
  loadingTextRequire,
  loadingText = 'Loading',
  icon,
  iconPath,
  indicatorColorsArray,
  customSizeForIndicatiorRotation = 150,
  indicatorDotSize = 20,
  containerStyle,
  backdropStyle,
  iconStyle,
  loadingTextStyle,
  children,
}) => {
  //const random = () => parseInt(Math.random() * 255);
  //const randomColor = () => `rgb(${random()}, ${random()}, ${random()})`;
  const [ellipsisCount, setEllipsisCount] = useState(0);
  const timerRef = useRef(null);
  const animation = useRef(new Animated.Value(0)).current;
  const color1 = indicatorColorsArray ? indicatorColorsArray[0] : '#2196F3';
  const color2 = indicatorColorsArray ? indicatorColorsArray[1] : '#8BC34A';
  const color3 = indicatorColorsArray ? indicatorColorsArray[2] : '#3F51B5';
  const color4 = indicatorColorsArray ? indicatorColorsArray[3] : '#FFC107';
  const color5 = indicatorColorsArray ? indicatorColorsArray[4] : '#FF9800';
  useEffect(() => {
    const animate = () => {
      Animated.loop(
        Animated.timing(animation, {
          toValue: 1,
          duration: 3500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ).start();
    };
    if (loading) {
      timerRef.current = setInterval(() => {
        setEllipsisCount(prevCount => (prevCount < 3 ? prevCount + 1 : 0));
      }, 300);
      animate();
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [animation, loading]);
  const Dim = customSizeForIndicatiorRotation;
  const inputRange = [0, 0.5, 1];
  const angle = animation.interpolate({
    inputRange,
    outputRange: ['0deg', '72deg', '360deg'],
  });
  const angle0 = animation.interpolate({
    inputRange,
    outputRange: ['0deg', '144deg', '360deg'],
  });
  const angle1 = animation.interpolate({
    inputRange,
    outputRange: ['0deg', '216deg', '360deg'],
  });
  const angle2 = animation.interpolate({
    inputRange,
    outputRange: ['0deg', '288deg', '360deg'],
  });
  const angle3 = animation.interpolate({
    inputRange,
    outputRange: ['0deg', '360deg', '360deg'],
  });
  const outerAngle = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '720deg'],
  });
  return (
    <View style={containerStyle ?? styles.container}>
      <View style={backdropStyle ?? styles.backdropStyle}>
        {(type === 'basic' || (type === 'app' && requireIndicator)) && (
          <Animated.View
            style={{
              width: Dim,
              height: Dim,
              transform: [{rotate: outerAngle}],
            }}>
            <Animated.View
              style={{
                ...styles.item,
                transform: [{rotate: angle3}],
                zIndex: 5,
                width: customSizeForIndicatiorRotation,
                height: customSizeForIndicatiorRotation,
              }}>
              <View
                style={[
                  styles.inneritem,
                  {height: indicatorDotSize, width: indicatorDotSize},
                ]}>
                <View
                  style={{
                    height: indicatorDotSize - 4 * (indicatorDotSize / 10),
                    width: indicatorDotSize - 4 * (indicatorDotSize / 10),
                    borderRadius: indicatorDotSize,
                    backgroundColor: color1,
                  }}
                />
              </View>
            </Animated.View>
            <Animated.View
              style={{
                ...styles.item,
                transform: [{rotate: angle2}],
                zIndex: 4,
                width: customSizeForIndicatiorRotation,
                height: customSizeForIndicatiorRotation,
              }}>
              <View
                style={[
                  styles.inneritem,
                  {height: indicatorDotSize, width: indicatorDotSize},
                ]}>
                <View
                  style={{
                    height: indicatorDotSize - 3 * (indicatorDotSize / 10),
                    width: indicatorDotSize - 3 * (indicatorDotSize / 10),
                    borderRadius: indicatorDotSize,
                    backgroundColor: color2,
                  }}
                />
              </View>
            </Animated.View>
            <Animated.View
              style={{
                ...styles.item,
                transform: [{rotate: angle1}],
                zIndex: 3,
                width: customSizeForIndicatiorRotation,
                height: customSizeForIndicatiorRotation,
              }}>
              <View
                style={[
                  styles.inneritem,
                  {height: indicatorDotSize, width: indicatorDotSize},
                ]}>
                <View
                  style={{
                    height: indicatorDotSize - 2 * (indicatorDotSize / 10),
                    width: indicatorDotSize - 2 * (indicatorDotSize / 10),
                    borderRadius: indicatorDotSize,
                    backgroundColor: color3,
                  }}
                />
              </View>
            </Animated.View>

            <Animated.View
              style={{
                ...styles.item,
                transform: [{rotate: angle0}],
                zIndex: 2,
                width: customSizeForIndicatiorRotation,
                height: customSizeForIndicatiorRotation,
              }}>
              <View
                style={[
                  styles.inneritem,
                  {height: indicatorDotSize, width: indicatorDotSize},
                ]}>
                <View
                  style={{
                    height: indicatorDotSize - indicatorDotSize / 10,
                    width: indicatorDotSize - indicatorDotSize / 10,
                    borderRadius: indicatorDotSize,
                    backgroundColor: color4,
                  }}
                />
              </View>
            </Animated.View>
            <Animated.View
              style={{
                ...styles.item,
                transform: [{rotate: angle}],
                zIndex: 1,
                width: customSizeForIndicatiorRotation,
                height: customSizeForIndicatiorRotation,
              }}>
              <View
                style={[
                  styles.inneritem,
                  {height: indicatorDotSize, width: indicatorDotSize},
                ]}>
                <View
                  style={{
                    height: indicatorDotSize,
                    width: indicatorDotSize,
                    borderRadius: indicatorDotSize,
                    backgroundColor: color5,
                  }}
                />
              </View>
            </Animated.View>
          </Animated.View>
        )}
      </View>
      {type === 'app' && (
        <>
          {iconPath ? (
            <>
              <Image
                source={{uri: iconPath}}
                style={iconStyle ?? styles.iconStyle}
                resizeMode="contain"
              />
            </>
          ) : (
            <>
              <Image
                source={icon}
                style={iconStyle ?? styles.iconStyle}
                resizeMode="contain"
              />
            </>
          )}
        </>
      )}
      <>
        {loadingTextRequire && (
          <>
            {children ? (
              children // If a child component is provided, render it
            ) : (
              <Text style={loadingTextStyle ?? styles.loadingTextStyle}>
                {loadingText}
                {Array(ellipsisCount + 1).join('.')}
              </Text>
            )}
          </>
        )}
      </>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000, // Increased zIndex value to ensure it's on top
  },
  backdropStyle: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconStyle: {
    width: 70,
    height: 70,
    marginBottom: 10,
  },
  loadingTextStyle: {
    fontSize: 16,
    color: '#ffffff',
  },
  item: {
    borderWidth: 0,
    backgroundColor: 'transparent',
    position: 'absolute',
  },
  inneritem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default CustomLoader;
