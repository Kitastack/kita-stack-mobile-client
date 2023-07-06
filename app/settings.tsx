import { router } from "expo-router";
import React from "react";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import { TimePicker, TimePickerModal } from "react-native-paper-dates";
export default function Pages() {
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
		<ScrollView
			style={{
				flex: 1,
				flexDirection: "column",
				paddingHorizontal: 16,
				rowGap: 4,
			}}
		>
			<Text>Time picker</Text>
			<Card onPress={() => router.push("/datepicker")}>
				<Card.Content>
					<Text variant="titleSmall">Open Dev session</Text>
				</Card.Content>
			</Card>
		</ScrollView>
	);
}
