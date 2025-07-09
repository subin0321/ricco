/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */
const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#121212',                // ← 블랙
    background: '#F9F9F9',          // ← 화이트
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    skyblue: '#ABC4ED',             // ← 새로 추가
  },
  dark: {
    text: '#F9F9F9',                // ← 밝은 화이트로 텍스트
    background: '#121212',          // ← 블랙
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    skyblue: '#ABC4ED',             // ← dark에도 동일하게 추가
  },
};
