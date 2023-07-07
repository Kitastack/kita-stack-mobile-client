import { create } from "zustand";

export interface ContactStore {
	date: string;
	status: "loading" | undefined;
	member?:
		| {
				name: string;
				phoneNumber: string;
				infoUrl?: string;
				logoImgUrl?: string;
		  }[];
	nationalPhone?:
		| {
				name: string;
				phoneNumber: string;
				infoUrl?: string;
				logoImgUrl?: string;
		  }[];
	fetchNewData: () => void;
}

export const useContactStore = create<ContactStore>((set) => ({
	date: new Date().toISOString(),
	status: undefined,
	member: undefined,
	fetchNewData: () =>
		set((state) => ({
			nationalPhone: [
				{
					phoneNumber: "112",
					name: "Layanan Nomor Panggilan Darurat",
					infoUrl: "https://layanan112.kominfo.go.id",
				},
				{
					phoneNumber: "118",
					name: "Kemenkes",
				},
				{
					phoneNumber: "110",
					name: "Polisi",
				},
				{
					phoneNumber: "123",
					name: "PLN",
				},
			],
		})),
}));
