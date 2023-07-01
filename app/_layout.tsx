import MyAppBar from "components/base/MyAppBar";
import { Slot, Stack } from "expo-router";
import { SafeAreaView } from "react-native";
import { PaperProvider, useTheme } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Layout() {
	const paperTheme = useTheme();
	return (
		<SafeAreaProvider>
			<PaperProvider>
				<Stack
					screenOptions={{
						header: (props) => <MyAppBar {...props} />,
						contentStyle: {
							backgroundColor: paperTheme.colors.background,
						},
					}}
				/>
			</PaperProvider>
		</SafeAreaProvider>
	);
}
