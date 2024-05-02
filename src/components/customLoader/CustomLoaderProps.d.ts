import {ReactNode} from 'react';
import {
  ImageSourcePropType,
  ViewStyle,
  ImageStyle,
  TextStyle,
} from 'react-native';

/**
 * Props for a custom loader component.
 */
export type CustomLoaderProps = {
  /** Indicates whether the loader is currently in a loading state. */
  loading: boolean;

  /** Specifies the type of loader, either 'basic' or 'app'.
   *
   * Note: If you specify 'app' type then pass the icon prop to show the app icon/loader icon. And you have to specify whether you require indicator or not.
   */
  type: 'basic' | 'app';

  /** Specifies whether an indicator is required. */
  requireIndicator?: boolean;

  /** Specifies whether loading text is required. */
  loadingTextRequire?: boolean;

  /** The text to display in primary loading text while loading. */
  loadingText?: string;

  /** The icon to display during loading.
   *
   * Note: If you are using icon don't send iconPath prop and vice-versa.
   */
  icon?: ImageSourcePropType; // Image Prop type

  /** The url path for the icon.
   *
   * Note: If you are using iconPath don't send icon prop and vice-versa.
   */
  iconPath?: string;

  /** An array of colors for the loader indicator. The size of array should be 5. */
  indicatorColorsArray?: string[];

  /** Specifies a custom size for the loader indicator rotation. */
  customSizeForIndicatiorRotation?: number;

  /** Specifies the size of the loader indicator dots. */
  indicatorDotSize?: number;

  /** Additional styles for the container of the loader. */
  containerStyle?: ViewStyle;

  /** Additional styles for the loader backdrop. */
  backdropStyle?: ViewStyle;

  /** Additional styles for the loader icon. */
  iconStyle?: ImageStyle;

  /** Additional styles for the loading text. */
  loadingTextStyle?: TextStyle;

  /** The React Text component to be rendered as children. */
  children?: ReactNode;
};
