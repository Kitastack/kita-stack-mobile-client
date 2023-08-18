import {create} from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {persist, createJSONStorage} from "zustand/middleware";

export interface MemberProps {
    id: string;
    name: string;
    phoneNumber: string;
    locationEnabled?: boolean;
    smsEnabled?: boolean;
    phoneEnabled?: boolean;
}

export type MemberPermission = "LOCATION" | "PHONE" | "SMS";

export interface MemberStore {
    member: MemberProps[];
    addMember: ({id, name, phoneNumber}: MemberProps) => void;
    setMemberPermission: (
        id: string,
        permission: MemberPermission,
        status: boolean
    ) => void;
    toggleMemberPermission: (id: string, permission: MemberPermission) => void;
    removeMember: (id: string) => void;
    getMemberByPermissions?: (permissions: MemberPermission[]) => MemberProps[]
}

export const useMemberStore = create<MemberStore>()(
    persist(
        (set, get) => ({
            member: [],
            addMember: ({id, name, phoneNumber}: MemberProps) => {
                set((state) => ({
                    member: [
                        ...state.member,
                        {id: id, name: name, phoneNumber: phoneNumber},
                    ],
                }));
            },
            removeMember: (id: string) => {
                set((state) => ({
                    member: state.member.filter((props) => props.id !== id),
                }));
            },
            setMemberPermission: (id, permission, status) => {
                const members = get().member;
                const memberIdx = members.findIndex((obj) => obj.id === id);
                switch (permission) {
                    case "LOCATION":
                        members[memberIdx].locationEnabled = status;
                        break;
                    case "PHONE":
                        members[memberIdx].phoneEnabled = status;
                        break;
                    case "SMS":
                        members[memberIdx].smsEnabled = status;
                        break;
                    default:
                        break;
                }
                set((state) => ({member: members}));
            },
            getMemberByPermissions: (permissions) => {
                let members: MemberProps[] = []
                members = get().member
                for (let i = 0; i < permissions.length; i++) {
                    switch (permissions[i]) {
                        case "LOCATION":
                            members = members.filter((item, _) => item.locationEnabled)
                            break;
                        case "PHONE":
                            members = members.filter((item, _) => item.phoneEnabled)
                            break
                        case "SMS":
                            members = members.filter((item, _) => item.smsEnabled)
                            break
                        default:
                            break
                    }
                }
                return members
            },
            toggleMemberPermission: (id, permission) => {
                let status: boolean | undefined = undefined
                const currentMember = get().member.filter((val, _) => val.id === id)
                switch (permission) {
                    case "SMS":
                        status = currentMember[0].smsEnabled
                        break
                    case "PHONE":
                        status = currentMember[0].phoneEnabled
                        break
                    case "LOCATION":
                        status = currentMember[0].locationEnabled
                        break
                    default:
                        return
                }
                get().setMemberPermission(id, permission, !status)
            }
        }),
        {
            name: "member-storage",
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
