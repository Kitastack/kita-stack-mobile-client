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
	icon: string;
	title: string;
	subtitle: string;
	href?: string;
}

const cardItems: CardItemProp[] = [
	{
		icon: "contacts-outline",
		title: "Kontak",
		subtitle: "Layanan nasional",
		href: "/contact",
	},
	{
		icon: "message",
		title: "SMS Darurat",
		subtitle: "Kelola pesan darurat otomatis",
		href: "/home/message",
	},
	{
		icon: "account-group-outline",
		title: "Kerabat",
		subtitle: "Kelola kerabat yang dapat anda hubungi",
		href: "/member",
	},
	{
		icon: "map-marker",
		title: "Lokasi",
		subtitle: "lokasimu",
		href: "/home/location",
	},
	{
		icon: "toolbox-outline",
		title: "Peralatan",
		subtitle: "Kontrol sensor, data, dll",
		href: "/settings",
	},
];

export default function Page() {
	const paperTheme = useTheme();
	const [dialogVisibility, setDialogVisibility] = useState(false);
	return (
		<>
			{/* TODO: create profile button + avatar */}
			<Stack.Screen
				options={{
					title: "",
					header: () => (
						<>
							<Appbar.Header
								mode="medium"
								style={{
									backgroundColor: paperTheme.colors.surface,
								}}
							>
								<Appbar.Content title="Selamat Datang" />
								<Appbar.Action
									icon={"account"}
									aria-label="Akun"
									onPress={() => {
										router.push("/home/account");
									}}
								/>
							</Appbar.Header>
						</>
					),
				}}
			/>
			{/* main app */}
			<FlatList
				nestedScrollEnabled
				data={cardItems}
				ListHeaderComponent={() => <></>}
				numColumns={2}
				columnWrapperStyle={{
					columnGap: 4,
					justifyContent: "space-evenly",
				}}
				contentContainerStyle={{
					rowGap: 4,
					paddingHorizontal: 16,
				}}
				style={{
					flexGrow: 1,
				}}
				ListFooterComponent={() => (
					<View style={{ paddingVertical: 20 }} />
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
								ellipsizeMode="tail"
								style={{ maxWidth: 160 }}
							>
								{prop.item.subtitle || ""}
							</Text>
						</Card.Content>
					</Card>
				)}
				keyExtractor={(item) => item.title.toString()}
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
