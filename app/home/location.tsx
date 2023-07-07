import { Stack, useFocusEffect } from "expo-router";
import { ScrollView } from "react-native";
import { Button, Text } from "react-native-paper";
import * as Location from "expo-location";
import { useCallback, useEffect, useState } from "react";
import { useSafeAreaFrame } from "react-native-safe-area-context";
export default function Page() {
	const [locationStatus, setLocationStatus] = useState<string | undefined>(
		undefined
	);
	const [currentLocation, setCurrentLocation] = useState("");

	useEffect(() => {
		(async () => {
			try {
				const { status } =
					await Location.requestForegroundPermissionsAsync();
				if (status === Location.PermissionStatus.GRANTED) {
					setLocationStatus("granted");
					const data = await Location.getProviderStatusAsync();
					const data2 = await Location.getCurrentPositionAsync();
					console.log(data2);
					if (data2) {
						const { latitude, longitude } = data2.coords;
						const data = await Location.reverseGeocodeAsync({
							latitude,
							longitude,
						});
						if (data) {
							const parsed = JSON.stringify(data);
							setCurrentLocation(parsed || "");
							console.log(data);
						} else {
							setCurrentLocation("fetch data failed");
						}
					}
				}
			} catch (e) {
				console.log(e);
			}
		})();
	}, []);
	return (
		<>
			<Stack.Screen options={{ title: "Lokasi" }} />
			<ScrollView style={{ paddingHorizontal: 16 }}>
				<Text variant="labelMedium">status: {locationStatus}</Text>
				<Text variant="displaySmall">Lokasi Saat ini</Text>
				<Text>{currentLocation}</Text>
				<Button>get location</Button>
			</ScrollView>
		</>
	);
}
