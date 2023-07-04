import { View } from "react-native";
import {
	Appbar,
	Button,
	Dialog,
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
			<Stack.Screen options={{ title: "" }} />
			<View
				style={{
					flex: 1,
					flexDirection: "column",
					gap: 2,
					paddingHorizontal: 16,
				}}
			>
				<View style={{ rowGap: 8 }}>
					<Text variant="displaySmall">
						Testing Voice Recognition
					</Text>
					<Text variant="bodyLarge">
						this is my attempt for creating voice recognition in
						android
					</Text>
					<Button
						mode="contained"
						onPress={() => setDialogVisibility(true)}
					>
						test geolocations
					</Button>
					<Button
						mode="elevated"
						onPress={() => router.push("/settings")}
					>
						to Settings
					</Button>
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
