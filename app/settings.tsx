import { router } from "expo-router";
import React from "react";
import { useState } from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
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
		<View
			style={{
				flex: 1,
				flexDirection: "column",
				paddingHorizontal: 16,
				rowGap: 4,
			}}
		>
			<Text>Time picker</Text>
			<Text>tes</Text>
			<Button onPress={() => router.push("/datepicker")}>
				to date picker
			</Button>
			<Button onPress={() => setVisible(true)} mode="outlined">
				Pick time
			</Button>
			<TimePickerModal
				visible={visible}
				onConfirm={onConfirm}
				onDismiss={onDismiss}
				hours={12}
				minutes={18}
			/>
		</View>
	);
}
