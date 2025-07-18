/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';
const metallicDarkGrey = '#D3D4DB'; // updated metallic dark grey from image
const spartanRed = '#C0392B'; // spartan red
const metallicSilver = '#A7A9AC'; // metallic silver for highlights

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: metallicSilver,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: metallicSilver,
    primary: metallicSilver,
    metallicDarkGrey,
    spartanRed,
    accent: spartanRed,
    border: spartanRed,
  },
  dark: {
    text: '#ECEDEE',
    background: metallicDarkGrey,
    tint: metallicSilver,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: metallicSilver,
    primary: metallicSilver,
    metallicDarkGrey,
    spartanRed,
    accent: spartanRed,
    border: spartanRed,
  },
};
