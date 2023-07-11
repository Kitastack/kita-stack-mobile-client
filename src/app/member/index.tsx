import { styles } from "@/constants/style";
import { MemberProps, useMemberStore } from "@/lib/hooks/useMemberStore";
import { Stack, router } from "expo-router";
import { useCallback, useState } from "react";
import { FlatList, ScrollView, View } from "react-native";
import {
	Appbar,
	Card,
	Chip,
	FAB,
	IconButton,
	Searchbar,
	Text,
	useTheme,
} from "react-native-paper";

export default function Page() {
	const { member, removeMember } = useMemberStore();
	const [filteredMember, setFilteredMember] = useState<MemberProps[]>([]);
	const theme = useTheme();
	const doSearch = useCallback(() => {}, []);
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
			<View style={{ flex: 1, paddingHorizontal: 16 }}>
				<FlatList
					data={member}
					contentContainerStyle={{ gap: 8 }}
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
						<Card mode="contained">
							<Card.Content
								style={{
									flexDirection: "row",
									justifyContent: "space-between",
									alignItems: "center",
								}}
							>
								<View style={{ flex: 1, gap: 8 }}>
									<Text variant="titleMedium">
										{items.name}
									</Text>
									<View
										style={{
											flexDirection: "row",
											flexWrap: "wrap",
											gap: 2,
										}}
									>
										<Chip mode="outlined" icon={"check"}>
											Telepon
										</Chip>
										<Chip mode="outlined" icon={"check"}>
											SMS
										</Chip>
									</View>
								</View>
								<View style={{ flexDirection: "row" }}>
									<IconButton
										icon={"trash-can-outline"}
										iconColor={theme.colors.error}
										onPress={() => removeMember(items.id)}
									/>
									{/* <IconButton icon={"account-edit-outline"} /> */}
								</View>
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
						<FAB
							onPress={() => router.push("/member/add")}
							variant="primary"
							icon={"plus"}
						/>
					</View>
				</View>
			</View>
		</>
	);
}
