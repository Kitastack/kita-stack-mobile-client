import { FlatList, ScrollView, View } from "react-native";
import { useEffect, useState } from "react";
import { Stack, router, useFocusEffect } from "expo-router";
import { styles } from "@/constants/style";
import React from "react";
// import * as SplashScreen from "expo-splas"

export default function Page() {
	const [status, setStatus] = useState<"ready" | "none">("none");
	useEffect(() => {
		async function prepare() {
			try {
				await new Promise((resolve) => setTimeout(resolve, 2000));
			} catch (e) {
				console.warn(e);
			} finally {
				setStatus("ready");
			}
		}
		prepare();
	}, []);
	const toHome = React.useCallback(() => {
		router.replace("/home");
	}, []);
	useFocusEffect(() => toHome());
	return (
		<>
			<Stack.Screen options={{ title: "" }} />
			<View
				style={{
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
				}}
			></View>
		</>
	);
}
