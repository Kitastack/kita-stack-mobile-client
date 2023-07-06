import { Link, Stack } from "expo-router";
import { View } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { Button, Card, IconButton, Text } from "react-native-paper";
import * as Linking from "expo-linking";
import { styles } from "@/constants/style";
interface Contacts {
	id: string;
	name: string;
	contactNumber: string;
}

const contactList: Contacts[] = [
	{ contactNumber: "088987286034", id: "0", name: "Polisi" },
	{ contactNumber: "088987286034", id: "1", name: "Pemadam Kebakaran" },
	{ contactNumber: "088987286034", id: "2", name: "Ambulan" },
	{ contactNumber: "088987286034", id: "3", name: "Polisi" },
];

export default function Page() {
	// const link = Linking.op
	return (
		<>
			<Stack.Screen options={{ title: "Kontak Emergensi" }} />
			<FlatList
				data={contactList}
				contentContainerStyle={{ rowGap: 4, paddingHorizontal: 16 }}
				renderItem={({ item }) => (
					<Card mode="contained">
						<Card.Content>
							<View style={styles.flexHorizontal}>
								<View style={styles.flexVertical}>
									<Text variant="titleMedium">
										{item.name}
									</Text>
									<Text variant="bodyMedium">
										{item.contactNumber}
									</Text>
								</View>
								<IconButton
									icon={"phone"}
									onPress={() =>
										Linking.openURL(
											`tel:${item.contactNumber}`
										)
									}
								/>
							</View>
						</Card.Content>
					</Card>
				)}
			></FlatList>
		</>
	);
}
