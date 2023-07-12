import { Stack, router } from "expo-router";
import React from "react";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import { Appbar, Button, Card, Text, useTheme } from "react-native-paper";
export default function Pages() {
	const theme = useTheme();
	const [visible, setVisible] = useState(false);
	return (
		<>
			<Stack.Screen options={{ header: () => null }} />
			<Appbar.Header mode="large">
				<Appbar.BackAction onPress={() => router.back()} />
				<Appbar.Content title="Pengaturan" />
			</Appbar.Header>
			<ScrollView
				style={{
					flex: 1,
					flexDirection: "column",
					paddingHorizontal: 16,
					rowGap: 8,
				}}
			>
				<Text>pengaturan belum tersedia untuk saat ini</Text>
			</ScrollView>
		</>
	);
}
