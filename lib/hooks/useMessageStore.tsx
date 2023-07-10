import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MemberProps } from "./useMemberStore";
export interface UseMessageStore {
	message: string;
	targetMember: MemberProps[];
	setMessage: (newMessage: string) => void;
	resetMessage: () => void;
	setTargetMember: (props: MemberProps[]) => void;
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
		}),
		{
			name: "message-store",
			storage: createJSONStorage(() => AsyncStorage),
		}
	)
);
