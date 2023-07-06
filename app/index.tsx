import { FlatList, ScrollView, View } from "react-native";
import { useState } from "react";
import { Stack, router, useFocusEffect } from "expo-router";
import { styles } from "@/constants/style";
import React from "react";

export default function Page() {
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
