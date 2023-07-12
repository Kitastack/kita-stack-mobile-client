import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MemberProps } from "./useMemberStore";
import * as ExpoSMS from "expo-sms";
export interface UseMessageStore {
	message: string;
	setMessage: (text:string) => void
}
export const useMessageStore = create<UseMessageStore>()(
	persist(
		(set, get) => ({
			message: "",
			setMessage(text) {
				set((state)=> ({message: text}))
			}
		}),
		{
			name: "message-store",
			storage: createJSONStorage(() => AsyncStorage),
		}
	)
);
