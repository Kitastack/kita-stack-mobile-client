import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MemberProps } from "./useMemberStore";
import * as ExpoSMS from "expo-sms";
export interface UseMessageStore {
	message: string;
	targetMember: MemberProps[];
	setMessage: (newMessage: string) => void;
	resetMessage: () => void;
	setTargetMember: (props: MemberProps[]) => void;
	sendMessages: () => Promise<boolean>;
}
export const useMessageStore = create<UseMessageStore>()(
	persist(
		(set, get) => ({
			message: "",
			targetMember: [],
			setMessage: (newMessage: string) => set({ message: newMessage }),
			resetMessage: () => set({ message: "" }),
			setTargetMember(props) {
				set(() => ({ targetMember: props }));
			},
			sendMessages: async () => {
				const message = get().message;
				const target = get().targetMember.map(
					(val, _) => val.phoneNumber
				);
				const isAvaiable = await ExpoSMS.isAvailableAsync();
				if (isAvaiable) {
					const { result } = await ExpoSMS.sendSMSAsync(
						target,
						message
					);
					if (result === "sent") {
						return true;
					}
				}
				return false;
			},
		}),
		{
			name: "message-store",
			storage: createJSONStorage(() => AsyncStorage),
		}
	)
);
