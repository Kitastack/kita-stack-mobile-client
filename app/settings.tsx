import { useState } from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import { TimePicker, TimePickerModal } from "react-native-paper-dates";
export default function Pages() {
	const [visible, setVisible] = useState(false);
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
			<Button onPress={() => setVisible(true)} mode="outlined">
				Pick time
			</Button>
			<TimePickerModal
				visible={visible}
				onConfirm={() => {
					setVisible(false);
				}}
				onDismiss={() => {
					setVisible(false);
				}}
				hours={12}
				minutes={18}
			/>
		</View>
	);
}
