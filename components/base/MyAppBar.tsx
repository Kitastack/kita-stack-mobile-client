import { Appbar } from "react-native-paper";
import { getHeaderTitle } from "@react-navigation/elements";
import { router } from "expo-router";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";

/**
 * Wrapper for material 3 AppBar, should included from stack screen options.
 *
 * You can overide this by disable stack header and use `<AppBar/>` from `react-native-paper` directly into routes
 */
export default function MyAppBar({
	route,
	options,
	back,
}: NativeStackHeaderProps) {
	const title = getHeaderTitle(options, route.name);
	return (
		<Appbar.Header>
			{back ? <Appbar.BackAction onPress={() => router.back()} /> : <></>}
			<Appbar.Content title={title || ""} />
		</Appbar.Header>
	);
}
