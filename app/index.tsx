import { FlatList, ScrollView, View } from "react-native";
import {
	Appbar,
	Avatar,
	Button,
	Card,
	Dialog,
	Divider,
	Portal,
	Text,
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
	},
	{
		id: 2,
		icon: "car-emergency",
		title: "SOS?",
		subtitle: "fitur SOS lainnya",
	},
	{
		id: 3,
		icon: "account-circle-outline",
		title: "Akun Anda",
		subtitle: "Fitur akun",
	},
];

export default function Page() {
	const paperTheme = useTheme();
	const [dialogVisibility, setDialogVisibility] = useState(false);
	return (
		<>
			<Stack.Screen options={{ title: "", header: () => null }} />
			<Appbar.Header mode="large">
				<Appbar.Content title="Home Page" />
				<Appbar.Action
					icon={"cog-outline"}
					aria-label="pengaturan"
					onPress={() => {
						router.push("/settings");
					}}
				/>
				<Appbar.Action
					icon={"login"}
					aria-label="Login"
					onPress={() => {
						router.replace("/login");
					}}
				/>
			</Appbar.Header>

			{/* main app */}
			<View
				style={{
					...styles.flexCol,
					gap: 2,
					paddingHorizontal: 16,
					paddingBottom: 8,
				}}
			>
				<View style={{ ...styles.flexCol, gap: 8 }}>
					<FlatList
						data={cardItems}
						numColumns={2}
						columnWrapperStyle={{
							columnGap: 4,
							justifyContent: "space-evenly",
						}}
						contentContainerStyle={{ rowGap: 4 }}
						renderItem={(prop) => (
							<Card
								onPress={() =>
									prop.item.href
										? router.push(prop.item.href)
										: {}
								}
								style={{ flexGrow: 1 }}
								mode="contained"
							>
								<Card.Content style={{ maxWidth: "100%" }}>
									<Avatar.Icon icon={prop.item.icon} />
									<Text variant="titleLarge">
										{prop.item.title}
									</Text>
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

					<Divider />

					<Button
						mode="contained"
						onPress={() => setDialogVisibility(true)}
					>
						SOS
					</Button>
					<Button
						mode="outlined"
						onPress={() => router.push("/settings")}
					>
						to Settings
					</Button>

					<Portal>
						<Dialog
							visible={dialogVisibility}
							onDismiss={() => setDialogVisibility(false)}
						>
							<Dialog.Title>Oh maaf!</Dialog.Title>
							<Dialog.Content>
								<Text variant="bodyMedium">
									Pengguna harus melakukan Log In terlebih
									dahulu untuk menjalankan fungsi ini.
								</Text>
							</Dialog.Content>
							<Dialog.Actions>
								<Button
									onPress={() => setDialogVisibility(false)}
								>
									Tutup
								</Button>
							</Dialog.Actions>
						</Dialog>
					</Portal>
				</View>
			</View>
		</>
	);
}
