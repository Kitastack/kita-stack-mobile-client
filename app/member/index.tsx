import { Stack } from "expo-router";
import { ScrollView } from "react-native";
import { Text } from "react-native-paper";

export default function Page() {
	return (
		<>
			<Stack.Screen options={{ title: "Kerabat" }} />

			<ScrollView>
				<Text>ini text</Text>
			</ScrollView>
		</>
	);
}
