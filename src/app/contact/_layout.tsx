import { Stack, Tabs } from "expo-router";
import { useTheme } from "react-native-paper";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
const TopTab = createMaterialTopTabNavigator();
import IndexPage from "./index";
import PersonalPage from "./member";

export default function Page() {
	const theme = useTheme();
	return (
		<>
			<Stack.Screen options={{ title: "Kontak" }} />
			<TopTab.Navigator
				screenOptions={{
					tabBarStyle: { backgroundColor: theme.colors.background },
				}}
			>
				<TopTab.Screen name="Layanan Umum" component={IndexPage} />
				<TopTab.Screen name="Kerabat Anda" component={PersonalPage} />
			</TopTab.Navigator>
		</>
	);
}
