import { SafeAreaView, Text, View } from "react-native";
import { Appbar, Button } from "react-native-paper";
import { ARROW } from "constants/config";
import { useSafeAreaInsets } from "react-native-safe-area-context";
export default function Page() {
	const { top } = useSafeAreaInsets();
	return (
		<View style={{ flex: 1, flexDirection: "column", paddingTop: top }}>
			<Button mode="elevated" onPress={() => console.log("pressed")}>
				<Text>this is button {ARROW.LEFT} </Text>
			</Button>
		</View>
	);
}
