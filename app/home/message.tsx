import { Stack } from "expo-router";
import { ScrollView } from "react-native";
import {Button, Card, Divider, Text, TextInput, Title} from "react-native-paper";
import {MemberCard} from "@/components/base/MemberCard";
import {useMessageStore} from "@/lib/hooks/useMessageStore";
import * as SMS from "expo-sms"
export default function Page() {
	const {message,setMessage} = useMessageStore()
	const sendMessage = async() => {
		const isAvaiable = await SMS.isAvailableAsync()
		if(isAvaiable) {
			console.log("SMS activated")
			const {result} = await SMS.sendSMSAsync(['081805760692','0881037790913'],'test message')
			if(result === "sent") {
				console.log("done!")
			}
		}
	}
	return (
		<>
			<Stack.Screen options={{ title: "Pesan" }} />
			<ScrollView style={{ rowGap: 8, paddingHorizontal: 16 }}>
				<Title>pesan yang akan dikirim</Title>
				<TextInput value={message} onChangeText={setMessage} />
				<Divider style={{ marginVertical: 8 }} />
				<Text>Kerabat yang akan menerima:</Text>
				<MemberCard name={"Adhinata"} phoneNumber={"088107790913"}/>
				<Button onPress={()=> sendMessage()} >send sms</Button>
			</ScrollView>
		</>
	);
}
