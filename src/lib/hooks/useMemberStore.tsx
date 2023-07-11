import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist, createJSONStorage } from "zustand/middleware";

export interface MemberProps {
	id: string;
	name: string;
	phoneNumber: string;
	locationEnabled?: boolean;
	smsEnabled?: boolean;
}
export interface MemberStore {
	member: MemberProps[];
	addMember: ({ id, name, phoneNumber }: MemberProps) => void;
	setMemberLocation?: (id: string, status: boolean) => void;
	setMemberSMS?: (id: string, status: boolean) => void;
	removeMember: (id: string) => void;
}

export const useMemberStore = create<MemberStore>()(
	persist(
		(set, get) => ({
			member: [],
			addMember: ({ id, name, phoneNumber }: MemberProps) => {
				set((state) => ({
					member: [
						...state.member,
						{ id: id, name: name, phoneNumber: phoneNumber },
					],
				}));
			},
			removeMember: (id: string) => {
				set((state) => ({
					member: state.member.filter((props) => props.id !== id),
				}));
			},
		}),
		{
			name: "member-storage",
			storage: createJSONStorage(() => AsyncStorage),
		}
	)
);
