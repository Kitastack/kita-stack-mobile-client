import { Stack, router } from "expo-router";
import { ScrollView } from "react-native";
import {
	Button,
	Card,
	Divider,
	Text,
	TextInput,
	Title,
} from "react-native-paper";
import { MemberCard } from "@/components/base/MemberCard";
import { useMessageStore } from "@/lib/hooks/useMessageStore";
import * as SMS from "expo-sms";
export default function Page() {
	const { message, setMessage, targetMember, setTargetMember } =
		useMessageStore();

	function removeItem(id: string) {
		setTargetMember(targetMember.filter((item, i) => item.id !== id));
	}

	async function sendMessage() {
		const isAvaiable = await SMS.isAvailableAsync();
		if (isAvaiable) {
			console.log("SMS activated");
			const numbers = targetMember.map((item, i) => item.phoneNumber);
			const { result } = await SMS.sendSMSAsync([...numbers], message);
			if (result === "sent") {
				console.log("done!");
			}
		}
	}

	return (
		<>
			<Stack.Screen options={{ title: "Pesan" }} />
			<ScrollView style={{ rowGap: 8, paddingHorizontal: 16 }}>
				<Title>pesan yang akan dikirim</Title>
				<TextInput
					mode="flat"
					numberOfLines={5}
					value={message}
					onChangeText={setMessage}
				/>
				<Divider style={{ marginVertical: 8 }} />
				<Text>Kerabat yang akan menerima:</Text>
				{targetMember.map((val, i) => (
					<MemberCard
						key={i}
						name={val.name}
						phoneNumber={val.phoneNumber}
						onDelete={() => removeItem(val.id)}
					/>
				))}

				<Button
					icon={"square-edit-outline"}
					onPress={() => router.push("/home/getContacts")}
				>
					Ganti kerabat yang menerima
				</Button>
				<Button mode="contained" onPress={() => sendMessage()}>
					send sms
				</Button>
			</ScrollView>
		</>
	);
}
