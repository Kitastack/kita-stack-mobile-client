import { FlatList, ScrollView, View } from "react-native";
import {
	Appbar,
	Avatar,
	Card,
	FAB,
	Text,
	TouchableRipple,
	useTheme,
} from "react-native-paper";
import { useState } from "react";
import { Stack, router } from "expo-router";
import { styles } from "@/constants/style";

interface CardItemProp {
	id: number;
	icon: string;
	title: string;
	subtitle: string;
	href?: string;
}

const cardItems: CardItemProp[] = [
	{
		id: 0,
		icon: "contacts-outline",
		title: "Kontak",
		subtitle: "Nomor darurat nasional",
		href: "/home/contact",
	},
	{
		id: 1,
		icon: "message",
		title: "Pesan",
		subtitle: "pesan darurat",
		href: "/home/message",
	},
	{
		id: 2,
		icon: "map-marker",
		title: "Lokasi",
		subtitle: "lokasimu",
		href: "/home/location",
	},
	{
		id: 3,
		icon: "account-circle",
		title: "Akun Anda",
		subtitle: "Fitur akun",
		href: "/home/account",
	},
	{
		id: 4,
		icon: "toolbox-outline",
		title: "Status",
		subtitle: "Kontrol sensor, data, dll",
		href: "/settings",
	},
];

export default function Page() {
	const paperTheme = useTheme();
	const [dialogVisibility, setDialogVisibility] = useState(false);
	return (
		<>
			<Stack.Screen options={{ title: "", header: () => null }} />
			{/* main app */}
			<FlatList
				data={cardItems}
				ListHeaderComponent={() => (
					<Appbar.Header
						mode="large"
						style={{
							backgroundColor: paperTheme.colors.surface,
						}}
					>
						<Appbar.Content title="Home Page" />
						<Appbar.Action
							icon={"cog-outline"}
							aria-label="pengaturan"
							onPress={() => {
								router.push("/settings");
							}}
						/>
					</Appbar.Header>
				)}
				numColumns={2}
				columnWrapperStyle={{
					columnGap: 4,
					justifyContent: "space-evenly",
				}}
				contentContainerStyle={{ rowGap: 4 }}
				style={{
					flexGrow: 1,
					paddingHorizontal: 16,
				}}
				ListFooterComponent={() => (
					<View style={{ paddingVertical: 40 }} />
				)}
				renderItem={(prop) => (
					<Card
						onPress={() =>
							prop.item.href ? router.push(prop.item.href) : {}
						}
						style={{ flexGrow: 1 }}
						mode="contained"
					>
						<Card.Content style={{ maxWidth: "100%" }}>
							<Avatar.Icon icon={prop.item.icon} />
							<Text variant="titleLarge">{prop.item.title}</Text>
							<Text
								variant="bodyMedium"
								numberOfLines={1}
								ellipsizeMode="tail"
								style={{}}
							>
								{prop.item.subtitle || ""}
							</Text>
						</Card.Content>
					</Card>
				)}
				keyExtractor={(item) => item.id.toString()}
			/>
			<FAB
				mode="elevated"
				variant="primary"
				icon={"microphone-variant"}
				style={styles.fab}
			/>
		</>
	);
}
