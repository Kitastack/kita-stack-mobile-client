import { useMaterial3Theme } from "@pchmn/expo-material3-theme";
import {
	useTheme,
	PaperProvider,
	MD3DarkTheme,
	MD3LightTheme,
	adaptNavigationTheme,
} from "react-native-paper";
import {
	ThemeProvider,
	DarkTheme as NavigationDarkTheme,
	DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import merge from "deepmerge";
import { useColorScheme } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import MyAppBar from "components/base/MyAppBar";
import { Stack } from "expo-router";

const { LightTheme, DarkTheme } = adaptNavigationTheme({
	reactNavigationLight: NavigationDefaultTheme,
	reactNavigationDark: NavigationDarkTheme,
});
const combinedTheme = {
	default: merge(MD3LightTheme, LightTheme),
	dark: merge(MD3DarkTheme, DarkTheme),
};

export default function Layout() {
	const colorScheme = useColorScheme();
	const { theme } = useMaterial3Theme();
	const paperTheme =
		colorScheme === "dark"
			? { ...combinedTheme.dark, colors: theme.dark }
			: { ...combinedTheme.default, colors: theme.light };
	return (
		<SafeAreaProvider
			style={{
				backgroundColor: paperTheme.colors.background,
			}}
		>
			<ThemeProvider
				value={
					colorScheme === "dark"
						? combinedTheme.dark
						: combinedTheme.default
				}
			>
				<PaperProvider theme={paperTheme}>
					<Stack
						screenOptions={{
							header: (props) => <MyAppBar {...props} />,
						}}
					/>
				</PaperProvider>
			</ThemeProvider>
		</SafeAreaProvider>
	);
}
