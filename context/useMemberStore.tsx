import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist, createJSONStorage } from "zustand/middleware";

export interface MemberProps {
  id: string;
  name: string;
  phoneNumber: string;
}
export interface MemberStore {
  member: MemberProps[];
  addMember: ({ name, phoneNumber }: MemberProps) => void;
  removeMember: (id: string) => void;
}

export const useMemberStore = create<MemberStore>()(
  persist(
    (set) => ({
      member: [],
      addMember: ({ name, phoneNumber }: MemberProps) => {
        set((state) => ({
          member: [
            ...state.member,
            { id: new Date().toString(), name: name, phoneNumber: phoneNumber },
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
    },
  ),
);
