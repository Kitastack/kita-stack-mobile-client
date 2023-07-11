import { Stack, router } from "expo-router";
import { View } from "react-native";
import { Appbar, Button, Text, TextInput } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
export default function Pages() {
	const { bottom } = useSafeAreaInsets();
	return (
		<>
			<Stack.Screen options={{ title: "", header: () => null }} />
			<View
				style={{
					flex: 1,
					flexDirection: "column",
					justifyContent: "flex-start",
					marginBottom: bottom,
				}}
			>
				<Appbar mode="medium">
					<Appbar.Content title="" />
				</Appbar>
				<View
					style={{
						flex: 1,
						flexDirection: "column",
						paddingHorizontal: 16,
						gap: 16,
						justifyContent: "center",
					}}
				>
					<Text variant="displayMedium" style={{}}>
						login
					</Text>
					<View
						style={{
							flex: 1,
							flexDirection: "column",
							justifyContent: "center",
							gap: 16,
						}}
					>
						<View>
							<TextInput
								value=""
								mode="outlined"
								label={"Email"}
								placeholder=""
							/>
							<TextInput
								value=""
								mode="outlined"
								label={"Password"}
								placeholder=""
							/>
						</View>
						<View
							style={{
								flex: 1,
								columnGap: 4,
								justifyContent: "flex-start",
								gap: 8,
							}}
						>
							<Button mode="contained">Login</Button>
							<Button mode="outlined">Buat akun</Button>
							<Button
								mode="text"
								onPress={() => router.replace("/")}
							>
								Lanjutkan tanpa harus membuat akun
							</Button>
						</View>
					</View>
				</View>
			</View>
		</>
	);
}
