import { styles } from "@/constants/style";
import { useContactStore } from "@/lib/hooks/useContactStore";
import { Tabs } from "expo-router";
import { useCallback } from "react";
import { FlatList, View } from "react-native";
import {
	Avatar,
	Card,
	FAB,
	IconButton,
	Portal,
	Text,
	Tooltip,
} from "react-native-paper";

export default function Page() {
	const { member } = useContactStore();
	const testFAB = useCallback(() => console.log("test"), []);
	return (
		<>
			<FlatList
				data={member}
				renderItem={({ item }) => (
					<Card>
						<Card.Title title={item.name} />
					</Card>
				)}
				ListEmptyComponent={() => (
					<View
						style={{
							flex: 1,
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<Text>Anda belum menambahkan anggota</Text>
					</View>
				)}
			/>
		</>
	);
}
