import { Stack, router } from "expo-router";
import { ScrollView } from "react-native";
import * as ExpoContacts from "expo-contacts";
import { useCallback, useEffect, useState } from "react";
import { Button, Card, Searchbar, Text, Title } from "react-native-paper";
import { MemberProps } from "@/lib/hooks/useMemberStore";
import { useMessageStore } from "@/lib/hooks/useMessageStore";
import { FlatList } from "react-native-gesture-handler";

export default function Page() {
	const [loading, setLoading] = useState(true);
	const [searchValue, setSearchValue] = useState("");
	const { targetMember, setTargetMember } = useMessageStore();
	const [currentTargetMember, setCurrentTargetMember] = useState<
		MemberProps[]
	>([]);
	const [contactList, setContactList] = useState<ExpoContacts.Contact[]>([]);
	const [filteredContactList, setFilteredContactList] = useState<
		ExpoContacts.Contact[]
	>([]);
	function useCurrentContact(id: string, name: string, phoneNumber?: string) {
		const parsedNumber = phoneNumber || "";
		setTargetMember([
			...targetMember,
			{ id, name, phoneNumber: parsedNumber },
		]);
		router.back();
	}
	const resetSearch = useCallback(() => {
		setSearchValue("text");
		setLoading(true);
		(async () => {
			const { data } = await ExpoContacts.getContactsAsync();
			setContactList(data);
			setLoading(false);
		})();
	}, []);
	const search = useCallback(
		(overrideText?: string) => {
			console.log("test");
			setLoading(true);

			const searchText = (searchValue || "").toLowerCase();
			(async () => {
				const { data } = await ExpoContacts.getContactsAsync({
					name: searchText.toLowerCase(),
				});
				setContactList(data);
				setLoading(false);
			})();
		},
		[searchValue]
	);

	useEffect(() => {
		(async () => {
			const { status } = await ExpoContacts.requestPermissionsAsync();
			if (status === ExpoContacts.PermissionStatus.GRANTED) {
				setLoading(true);
				const { data } = await ExpoContacts.getContactsAsync({});
				setContactList(data);
				setLoading(false);
			} else {
				console.log("Failed to get access into contacts");
			}
		})();
		setCurrentTargetMember(targetMember);
	}, []);

	return (
		<>
			<Stack.Screen options={{ title: "" }} />
			<Searchbar
				value={searchValue}
				placeholder={`contoh: "Mas Adit"`}
				onChangeText={(text) => setSearchValue(text)}
				onClearIconPress={() => resetSearch()}
				onIconPress={() => search()}
				onSubmitEditing={() => search()}
				style={{ marginBottom: 8, marginHorizontal: 16 }}
			/>
			{loading ? (
				<Text>loading...</Text>
			) : (
				<FlatList
					data={contactList}
					contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}
					renderItem={({ item, index }) => (
						<Card
							key={index}
							mode="contained"
							onPress={() =>
								useCurrentContact(
									item.id,
									item.name,
									item.phoneNumbers
										? item.phoneNumbers[0].number?.toString()
										: ""
								)
							}
						>
							<Card.Title
								title={item.name}
								subtitle={
									item.phoneNumbers
										? item.phoneNumbers[0].number?.toString()
										: ""
								}
							/>
						</Card>
					)}
				/>
			)}
		</>
	);
}
