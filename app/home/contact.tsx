import { Link, Stack } from "expo-router";
import { View } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { Button, Card, Text } from "react-native-paper";
import * as Linking from "expo-linking";
interface Contacts {
	id: string;
	name: string;
	contactNumber: string;
}

const contactList: Contacts[] = [
	{ contactNumber: "088987286034", id: "0", name: "Polisi" },
	{ contactNumber: "088987286034", id: "1", name: "Pemadam Kebakaran" },
	{ contactNumber: "088987286034", id: "2", name: "Polisi" },
	{ contactNumber: "088987286034", id: "3", name: "Polisi" },
];

export default function Page() {
	// const link = Linking.op
	return (
		<>
			<Stack.Screen options={{ title: "Kontak Emergensi" }} />
			<FlatList
				data={contactList}
				contentContainerStyle={{ rowGap: 4, paddingHorizontal: 8 }}
				renderItem={({ item }) => (
					<Card mode="contained">
						<Card.Title
							title={item.name}
							subtitle={item.contactNumber}
						/>
						<Card.Actions>
							<Button
								mode="contained"
								onPress={() => {
									Linking.openURL(
										`tel:${item.contactNumber}`
									);
								}}
							>
								Hubungi
							</Button>
							<Button mode="contained-tonal">Simpan nomor</Button>
						</Card.Actions>
					</Card>
				)}
			></FlatList>
		</>
	);
}
