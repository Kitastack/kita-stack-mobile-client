import { Slot, Stack } from "expo-router";
import { SafeAreaView } from "react-native";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Layout() {
	return (
		<SafeAreaProvider>
			<PaperProvider>
				<Slot />
			</PaperProvider>
		</SafeAreaProvider>
	);
}
