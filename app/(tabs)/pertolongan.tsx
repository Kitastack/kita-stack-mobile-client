import { Stack, router } from "expo-router";
import { View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { useIsFocused } from "@react-navigation/core";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
	useSafeAreaInsets,
	SafeAreaView,
} from "react-native-safe-area-context";
const TopTab = createMaterialTopTabNavigator();
import MapView, { Marker, Region, PROVIDER_GOOGLE } from "react-native-maps";
import { useEffect, useState } from "react";

const Pertolongan = () => {
	const isFocused = useIsFocused();
	const { bottom: $bottomSafeArea } = useSafeAreaInsets();
	const [mapRegion, setmapRegion] = useState<Region>({
		latitude: -8.5869,
		longitude: 116.0922,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421,
	});
	useEffect(() => {
		if (isFocused) {
			console.log("pertolongan", isFocused);
		}
	}, [isFocused]);
	return (
		<>
			<Stack.Screen options={{ header: () => null }} />
			<SafeAreaView>
				<View
					style={{
						backgroundColor: "red",
						height: "100%",
					}}
				>
					<MapView
						provider={PROVIDER_GOOGLE}
						style={{ alignSelf: "stretch", height: "100%" }}
						region={mapRegion}
					>
						<Marker coordinate={mapRegion} />
						<Marker
							coordinate={{
								latitude: -8.5871886,
								longitude: 116.0972789,
							}}
						/>
					</MapView>
				</View>
			</SafeAreaView>
		</>
	);
};

export default Pertolongan;
