import { Stack, router } from "expo-router";
import { ScrollView } from "react-native";
import * as ExpoContacts from "expo-contacts";
import { useEffect, useState } from "react";
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
	function preprocessContactList(searchText: string) {
		setSearchValue(searchText);
		// console.log(searchText);
	}
	function search() {
		const regex = RegExp(searchValue || "", "i");
		setLoading(true);
		setFilteredContactList(
			contactList.filter((val, _) => val.name.match(regex))
		);
		setLoading(false);
	}

	useEffect(() => {
		(async () => {
			const { status } = await ExpoContacts.requestPermissionsAsync();
			if (status === ExpoContacts.PermissionStatus.GRANTED) {
				setLoading(true);
				const { data } = await ExpoContacts.getContactsAsync();
				setContactList(data);
				setLoading(false);
			} else {
				console.log("Failed to get access into contacts");
			}
			search();
		})();
		setCurrentTargetMember(targetMember);
	}, []);

	return (
		<>
			<Stack.Screen options={{ title: "" }} />
			<Searchbar
				value={searchValue}
				onChangeText={(text) => preprocessContactList(text)}
				onIconPress={() => search()}
				onSubmitEditing={() => search()}
				style={{ marginBottom: 8, marginHorizontal: 16 }}
			/>
			{loading ? (
				<Text>loading...</Text>
			) : (
				<FlatList
					data={filteredContactList}
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
