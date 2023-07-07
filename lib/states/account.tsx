import { atom } from "jotai";

export interface AccountStore {
	id: string;
	username: string;
	name: string;
	email: string;
	avatarUrl: string;
}

export const accountsStore = atom<AccountStore | {}>({});
