import { Stack } from "expo-router";
import { ScrollView } from "react-native";
import { Card, Text, Title } from "react-native-paper";

export default function Page() {
	return (
		<>
			<Stack.Screen options={{ title: "Pesan" }} />
			<ScrollView style={{ rowGap: 8, paddingHorizontal: 16 }}>
				<Card>
					<Card.Content>
						<Text>Teks</Text>
					</Card.Content>
				</Card>
			</ScrollView>
		</>
	);
}
