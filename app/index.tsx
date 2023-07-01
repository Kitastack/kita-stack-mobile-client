import { SafeAreaView, View } from "react-native";
import { Appbar, Button, Text } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState } from "react";
import MyAppBar from "components/base/MyAppBar";
import { Stack, router } from "expo-router";
export default function Page() {
	const { top } = useSafeAreaInsets();
	const [nums, setNums] = useState(0);
	return (
		<View style={{ flex: 1, flexDirection: "column" }}>
			<Stack.Screen options={{ title: "" }} />
			<View
				style={{
					flex: 1,
					flexDirection: "column",
					gap: 2,
					paddingHorizontal: 8,
				}}
			>
				<View style={{ rowGap: 8 }}>
					<Text variant="displaySmall">
						Testing Voice Recognition
					</Text>
					<Text variant="bodyLarge">
						this is my attempt for creating voice recognition in
						android
					</Text>
					<Button
						mode="elevated"
						onPress={() => router.push("/settings")}
					>
						to Settings
					</Button>
				</View>
			</View>
		</View>
	);
}
