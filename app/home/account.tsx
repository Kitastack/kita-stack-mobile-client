import { Stack, router } from "expo-router";
import { ScrollView } from "react-native";
import { Appbar, Avatar, Text } from "react-native-paper";

export default function Page() {
	return (
		<>
			<Stack.Screen options={{ header: () => null }} />
			<Appbar.Header mode="center-aligned">
				<Appbar.BackAction onPress={() => router.back()} />
				<Appbar.Content title="Akun" />
			</Appbar.Header>
			<ScrollView>
				{/* <Avatar.Image source={} */}
				<Text> this is my text</Text>
			</ScrollView>
		</>
	);
}
