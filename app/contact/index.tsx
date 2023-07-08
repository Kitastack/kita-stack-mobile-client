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
	useTheme,
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
	const theme = useTheme();
	const { fetchNewData, nationalPhone, status } = useContactStore();
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
			<FlatList
				nestedScrollEnabled
				data={nationalPhone}
				contentContainerStyle={{ gap: 8, padding: 8 }}
				renderItem={({ item }) => (
					<Card
						// style={{ maxWidth: 160 }}
						mode="contained"
						onPress={() =>
							selectCurrentContact(item.name, item.phoneNumber)
						}
					>
						<Card.Content>
							<Text variant="displaySmall">
								{item.phoneNumber}
							</Text>
							<Text>{item.name}</Text>
						</Card.Content>
					</Card>
				)}
				keyExtractor={({ name }) => name}
			/>
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
						<Button mode="outlined" icon={"phone"}>
							Panggil
						</Button>
						<Button
							style={{}}
							onPress={() =>
								setContactConfirmationDialogVisible(false)
							}
						>
							Batal
						</Button>
					</Dialog.Actions>
				</Dialog>
			</Portal>
		</>
	);
}
