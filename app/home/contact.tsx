import { Link, Stack, useFocusEffect } from "expo-router";
import { View } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import {
	Button,
	Card,
	Dialog,
	Divider,
	IconButton,
	Portal,
	Text,
} from "react-native-paper";
import * as Linking from "expo-linking";
import { styles } from "@/constants/style";
import { useContactStore } from "@/lib/hooks/useContactStore";
import { Suspense, useState } from "react";
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
	const { fetchNewData, member, nationalPhone, status } = useContactStore();
	const [selectedContact, setSelectedContact] = useState({
		name: "",
		phoneNumber: "",
	});
	const [
		contactConfirmationDialogVisible,
		setContactConfirmationDialogVisible,
	] = useState(false);

	function selectCurrentContact(name: string, phoneNumber: string) {
		setSelectedContact({ name: name, phoneNumber });
		setContactConfirmationDialogVisible(true);
	}

	return (
		<>
			<Stack.Screen options={{ title: "" }} />
			<ScrollView nestedScrollEnabled style={{ paddingHorizontal: 16 }}>
				{/* <Button onPress={() => fetchNewData()}>Add item</Button> */}
				<Divider style={{ marginVertical: 8 }} />
				<Text variant="titleLarge">Nomor Darurat Umum: </Text>
				<FlatList
					nestedScrollEnabled
					horizontal
					data={nationalPhone}
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={{ columnGap: 8, padding: 2 }}
					renderItem={({ item }) => (
						<Card
							style={{ maxWidth: 160 }}
							mode="outlined"
							onPress={() =>
								selectCurrentContact(
									item.name,
									item.phoneNumber
								)
							}
						>
							<Card.Content>
								<Text variant="displaySmall">
									{item.phoneNumber}
								</Text>
								<Text variant="bodyLarge">{item.name}</Text>
							</Card.Content>
						</Card>
					)}
					keyExtractor={({ name }) => name}
				/>
				<Divider style={{ marginVertical: 8 }} />
				<Text variant="titleMedium">Kontak yang anda percaya: </Text>
			</ScrollView>

			{/* different view */}
			<Portal>
				<Dialog
					visible={contactConfirmationDialogVisible}
					onDismiss={() => setContactConfirmationDialogVisible(false)}
				>
					<Dialog.Title>
						Anda yakin untuk melakukan panggilan ini?
					</Dialog.Title>
					<Dialog.Content>
						<Text>
							Anda akan menelpon ke layanan{" "}
							<Text style={{ fontWeight: "bold" }}>
								{selectedContact.name}
							</Text>
						</Text>
					</Dialog.Content>
					<Dialog.Actions>
						<Button
							onPress={() =>
								setContactConfirmationDialogVisible(false)
							}
						>
							Batal
						</Button>
						<Button icon={"phone"}>Panggil</Button>
					</Dialog.Actions>
				</Dialog>
			</Portal>
		</>
	);
}
