import { Appbar } from "react-native-paper";
import { getHeaderTitle } from "@react-navigation/elements";
import { router } from "expo-router";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";

export default function MyAppBar({
	route,
	options,
	back,
}: NativeStackHeaderProps) {
	const title = getHeaderTitle(options, route.name);
	console.log(title);
	return (
		<Appbar.Header>
			{back ? <Appbar.BackAction onPress={() => router.back()} /> : <></>}
			<Appbar.Content title={title || ""} />
		</Appbar.Header>
	);
}
