import { Stack } from "expo-router";
import { View } from "react-native";
import { Text } from "react-native-paper";

export default function Page() {
	return (
		<>
			<Stack.Screen options={{ title: "Tambah kerabat" }} />
			<View style={{ flex: 1 }}>
				<Text>test</Text>
			</View>
		</>
	);
}
