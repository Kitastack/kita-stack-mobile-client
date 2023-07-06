import { Stack } from "expo-router";
import { ScrollView } from "react-native";
import { Text } from "react-native-paper";

export default function Page() {
	return (
		<>
			<Stack.Screen options={{ title: "Lokasi" }} />
			<ScrollView style={{ paddingHorizontal: 16 }}>
				<Text variant="labelMedium">Lokasi Saat ini</Text>
			</ScrollView>
		</>
	);
}
