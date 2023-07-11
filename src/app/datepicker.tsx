import DateTimePicker, {
	DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import React from "react";
import { useState } from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import { DatePickerInput, TimePicker } from "react-native-paper-dates";
import { TimePickerModal } from "react-native-paper-dates/lib/typescript/Time/TimePickerModal";

export default function Page() {
	const [inputDate, setInputDate] = useState(new Date());
	const [visible, setVisible] = useState(false);
	const onDateChange = (
		e: DateTimePickerEvent,
		selectedDate: Date | undefined
	) => {
		const temp = selectedDate;
		setVisible(false);
		if (temp) {
			setInputDate(temp);
		}
	};
	const openDate = () => {
		setVisible(true);
	};
	return (
		<View
			style={{
				flex: 1,
				flexDirection: "column",
				rowGap: 4,
				paddingHorizontal: 16,
			}}
		>
			<Button mode="contained" onPress={openDate}>
				Show date picker
			</Button>
			<Text>current date : {inputDate.toLocaleString()}</Text>
			{visible && (
				<DateTimePicker
					value={inputDate}
					mode="time"
					onChange={onDateChange}
				/>
			)}
		</View>
	);
}
