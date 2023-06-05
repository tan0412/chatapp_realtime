import {Dimensions, PixelRatio, Platform} from 'react-native';

export const MAX_WIDTH = Dimensions.get('screen').width;
export const MAX_HEIGHT = Dimensions.get('screen').height;

export const IS_IOS = Platform.OS === 'ios';

const wScale = Dimensions.get('window').width / 390;
const hScale = Dimensions.get('window').height / 667;

export function normalize(size: number, based: 'width' | 'height' = 'width') {
  const newSize = based === 'height' ? size * hScale : size * wScale;

  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}

/**
 * Set a specific value depends on platforms.
 * If we do not set iosSize, we imply that we want to set for both android and ios with given value androidSize
 * @param androidSize size for android
 * @param iosSize size for ios
 * @returns
 */
export function normalizePlatforms(androidSize: number, iosSize?: number) {
  if (iosSize === undefined) {
    return androidSize;
  }

  if (Platform.OS === 'ios') {
    return iosSize;
  } else if (Platform.OS === 'android') {
    return androidSize;
  } else {
    throw Error('Platform is not supported!');
  }
}

export const calculateWidth = (horizontalPadding?: number): number => {
  if (horizontalPadding) {
    const calc = MAX_WIDTH - 2 * horizontalPadding;
    // console.log('return ' + calc);
    return calc > 0 ? calc : 100;
  }
  return MAX_WIDTH;
};
