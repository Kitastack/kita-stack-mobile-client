import { View } from "react-native";
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
			<View
				style={{
					flex: 1,
					flexDirection: "column",
					gap: 2,
					paddingHorizontal: 16,
				}}
			>
				<View style={{ rowGap: 8 }}>
					{/* <Text variant="displaySmall">Dashboard</Text> */}
					<Card mode="contained">
						<Card.Title
							title="Kontak Emergensi Publik"
							subtitle="Nomor Polisi, dll"
							left={(props) => (
								<Avatar.Icon
									{...props}
									icon={"contacts-outline"}
								/>
							)}
						/>
					</Card>
					<Card mode="contained">
						<Card.Title
							title="Member SOS"
							subtitle="Pilih nomor SOS disini"
							left={(props) => (
								<Avatar.Icon
									{...props}
									icon={"account-supervisor-circle-outline"}
								/>
							)}
						/>
					</Card>
					<Card mode="contained">
						<Card.Title
							title="Pesan Otomatis"
							subtitle="Pengiriman pesan otomatis saat gawat darurat"
							left={(props) => (
								<Avatar.Icon {...props} icon={"whatsapp"} />
							)}
						/>
					</Card>
					<Divider />
					<Button
						mode="contained"
						onPress={() => setDialogVisibility(true)}
					>
						SOS
					</Button>
					<Button
						mode="elevated"
						onPress={() => router.push("/settings")}
					>
						to Settings
					</Button>

					{/* dialog screen */}
					<Portal>
						<Dialog
							visible={dialogVisibility}
							onDismiss={() => setDialogVisibility(false)}
						>
							<Dialog.Title>Alert</Dialog.Title>
							<Dialog.Content>
								<Text variant="bodyMedium">
									this is content
								</Text>
							</Dialog.Content>
							<Dialog.Actions>
								<Button
									onPress={() => setDialogVisibility(false)}
								>
									close dialog
								</Button>
							</Dialog.Actions>
						</Dialog>
					</Portal>
				</View>
			</View>
		</>
	);
}
