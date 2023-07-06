import { Stack, router } from "expo-router";
import React from "react";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import { Appbar, Button, Card, Text, useTheme } from "react-native-paper";
import { TimePicker, TimePickerModal } from "react-native-paper-dates";
export default function Pages() {
	const theme = useTheme();
	const [visible, setVisible] = useState(false);
	const onDismiss = React.useCallback(() => {
		setVisible(false);
	}, [setVisible]);
	const onConfirm = React.useCallback(
		({ hours, minutes }: { hours: number; minutes: number }) => {
			setVisible(false);
			console.log({ hours, minutes });
		},
		[setVisible]
	);
	return (
		<>
			<Stack.Screen options={{ header: () => null }} />
			<Appbar.Header mode="large">
				<Appbar.BackAction onPress={() => router.back()} />
				<Appbar.Content title="Pengaturan" />
			</Appbar.Header>
			<ScrollView
				style={{
					flex: 1,
					flexDirection: "column",
					paddingHorizontal: 16,
					rowGap: 8,
				}}
			>
				<Card
					style={{ backgroundColor: theme.colors.errorContainer }}
					onPress={() => router.push("/datepicker")}
				>
					<Card.Content>
						<Text
							style={{ color: theme.colors.onErrorContainer }}
							variant="titleSmall"
						>
							Open Dev session
						</Text>
					</Card.Content>
				</Card>
			</ScrollView>
		</>
	);
}
