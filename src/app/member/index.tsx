import { styles } from "@/constants/style";
import { useMemberStore } from "@/lib/hooks/useMemberStore";
import { Stack, router } from "expo-router";
import { FlatList, ScrollView, View } from "react-native";
import {
	Appbar,
	Card,
	FAB,
	IconButton,
	Searchbar,
	Text,
	useTheme,
} from "react-native-paper";

export default function Page() {
	const { member } = useMemberStore();
	const theme = useTheme();
	return (
		<>
			<Stack.Screen
				options={{
					title: "Kerabat",
					header: (props) => (
						<Appbar.Header>
							<Appbar.BackAction onPress={() => router.back()} />
							<Appbar.Content title={props.options.title} />
						</Appbar.Header>
					),
				}}
			/>
			<View style={{ flex: 1 }}>
				<FlatList
					data={member}
					ListEmptyComponent={() => (
						<View
							style={{
								flex: 1,
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<Text>Kontak kerabat anda kosong</Text>
						</View>
					)}
					renderItem={({ item: items }) => (
						<Card>
							<Card.Content>
								<Text>{items.name}</Text>
							</Card.Content>
						</Card>
					)}
				/>
			</View>
			<View>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						backgroundColor: theme.colors.elevation.level1,
						padding: 8,
						gap: 4,
					}}
				>
					<Searchbar style={{ flex: 1 }} value="" />
					<View>
						<FAB mode="flat" variant="secondary" icon={"plus"} />
					</View>
				</View>
			</View>
		</>
	);
}
