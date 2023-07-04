import { useState } from "react";
import { View } from "react-native";
import { DatePickerInput } from "react-native-paper-dates";

export default function Page() {
	const [inputDate, setInputDate] = useState<Date | undefined>(undefined);
	return (
		<View
			style={{
				flex: 1,
				flexDirection: "column",
				rowGap: 4,
				paddingHorizontal: 16,
			}}
		>
			<DatePickerInput
				mode="outlined"
				locale="en"
				label={"Birthdate"}
				value={inputDate}
				onChange={(e) => setInputDate(e)}
				inputMode="start"
			/>
		</View>
	);
}
