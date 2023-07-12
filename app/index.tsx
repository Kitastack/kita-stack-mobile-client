import { FlatList, ScrollView, View, Text } from "react-native";
import { Stack, router, useFocusEffect, useSegments } from "expo-router";
import React, { useEffect, useState, useCallback } from "react";

export default function Root() {
	useEffect(() => {
		async function _prepare() {
			// console.log("running");
			// router.push("sign_in");
		}
		_prepare();
	}, []);

	return (
		<>
			<Stack.Screen options={{ title: "", header: () => null }} />
			<View
				style={{
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Text>Loading...</Text>
			</View>
		</>
	);
}
