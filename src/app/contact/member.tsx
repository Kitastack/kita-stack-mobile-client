import { styles } from "@/constants/style";
import { useContactStore } from "@/lib/hooks/useContactStore";
import { Tabs } from "expo-router";
import {useCallback, useEffect, useState} from "react";
import { FlatList, View } from "react-native";
import {
	Avatar,
	Card,
	FAB,
	IconButton,
	Portal,
	Text,
	Tooltip,
} from "react-native-paper";
import {MemberProps, useMemberStore} from "@/lib/hooks/useMemberStore";

export default function Page() {

	const {member} = useMemberStore()
	const [members, setMembers] = useState<MemberProps[]>([])
	const getMember = useCallback(()=> {
		setMembers(member.filter((item,i)=> item.phoneEnabled))
	},[member])
	useEffect(()=>getMember(),[member])
	return (
		<>
			<FlatList
				data={members}
				renderItem={({ item }) => (
					<Card>
						<Card.Title title={item.name} subtitle={item.phoneNumber} />
					</Card>
				)}
				ListEmptyComponent={() => (
					<View
						style={{
							flex: 1,
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<Text>Anda belum menambahkan kerabat. untuk menambah kerabat, anda dapat mengakses alaman ini</Text>
					</View>
				)}
			/>
		</>
	);
}
