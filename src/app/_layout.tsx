import {
  useTheme,
  PaperProvider,
  MD3DarkTheme,
  MD3LightTheme,
  adaptNavigationTheme,
  configureFonts,
  customText,
  Text,
} from "react-native-paper";
import {
  ThemeProvider,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { en, registerTranslation } from "react-native-paper-dates";
import { View, useColorScheme } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Slot, Stack, router } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import merge from "deepmerge";

import MyAppBar from "@/components/base/MyAppBar";
import { KSDarkTheme, KSLightTheme } from "@/constants/papertheme";
import { ColorSpace } from "react-native-reanimated";
import AuthProvider from "@/context/AuthProvider";

registerTranslation("en", en);

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});
const combinedTheme = {
  default: merge(LightTheme, KSLightTheme),
  dark: merge(DarkTheme, KSDarkTheme),
};

export default function Layout() {
  const [loadedFont] = useFonts({
    "JP-Bold": require("@/assets/fonts/jakarta-plus/PlusJakartaSans-Bold.ttf"),
    "JP-BoldItalic": require("@/assets/fonts/jakarta-plus/PlusJakartaSans-BoldItalic.ttf"),
    "JP-SemiBold": require("@/assets/fonts/jakarta-plus/PlusJakartaSans-SemiBold.ttf"),
    "JP-SemiBoldItalic": require("@/assets/fonts/jakarta-plus/PlusJakartaSans-SemiBoldItalic.ttf"),
    "JP-Medium": require("@/assets/fonts/jakarta-plus/PlusJakartaSans-Medium.ttf"),
    "JP-MediumItalic": require("@/assets/fonts/jakarta-plus/PlusJakartaSans-MediumItalic.ttf"),
    "JP-Italic": require("@/assets/fonts/jakarta-plus/PlusJakartaSans-Italic.ttf"),
    "JP-Regular": require("@/assets/fonts/jakarta-plus/PlusJakartaSans-Regular.ttf"),
    "JP-Light": require("@/assets/fonts/jakarta-plus/PlusJakartaSans-Light.ttf"),
  });
  const baseVariants = configureFonts({
    config: { fontFamily: "JP-Regular", letterSpacing: 0 },
  });
  const colorScheme = useColorScheme();
  const colorPaper = useMemo(
    () =>
      colorScheme === "dark"
        ? { ...combinedTheme.dark }
        : { ...combinedTheme.default },
    [colorScheme],
  );

  const themePaper = useMemo(
    () => ({
      ...colorPaper,
      fonts: !loadedFont
        ? colorPaper.fonts
        : configureFonts({
            config: {
              ...baseVariants,

              labelLarge: {
                ...baseVariants.bodySmall,
                fontFamily: "JP-Bold",
                fontSize: 12,
              },
              labelMedium: {
                ...baseVariants.bodySmall,
                fontFamily: "JP-Medium",
                fontSize: 12,
              },
              labelSmall: {
                ...baseVariants.bodySmall,
                fontFamily: "JP-Regular",
                fontSize: 12,
              },
              bodyLarge: {
                ...baseVariants.bodySmall,
                fontFamily: "JP-Medium",
              },
              bodyMedium: {
                ...baseVariants.bodySmall,
                fontFamily: "JP-Regular",
              },
              bodySmall: {
                ...baseVariants.bodySmall,
                fontFamily: "JP-Regular",
              },
              titleLarge: {
                ...baseVariants.titleMedium,
                fontSize: 20,
                fontFamily: "JP-Bold",
              },
              titleMedium: {
                ...baseVariants.titleMedium,
                fontSize: 20,
                fontFamily: "JP-Bold",
              },
              titleSmall: {
                ...baseVariants.titleSmall,
                fontSize: 20,
                fontFamily: "JP-Medium",
              },
              headlineLarge: {
                ...baseVariants.headlineLarge,
                fontFamily: "JP-Bold",
              },
              headlineMedium: {
                ...baseVariants.headlineMedium,
                fontFamily: "JP-Bold",
              },
              headlineSmall: {
                ...baseVariants.headlineSmall,
                fontFamily: "JP-Medium",
              },
            },
          }),
    }),
    [colorPaper, loadedFont],
  );

  return (
    <SafeAreaProvider
      style={{
        backgroundColor: themePaper.colors.background,
      }}
    >
      <ThemeProvider
        value={
          colorScheme === "dark" ? combinedTheme.dark : combinedTheme.default
        }
      >
        <PaperProvider
          theme={{
            ...themePaper,
          }}
        >
          <AuthProvider>
            <Slot />
          </AuthProvider>
        </PaperProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
