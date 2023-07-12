import { create } from "zustand";

export interface MemberContact {
  id: string;
  name: string;
  phoneNumber: string;
  infoUrl?: string;
  logoImgUrl?: string;
}
export interface NationalContact {
  name: string;
  phoneNumber: string;
  infoUrl?: string;
  logoImgUrl?: string;
}

export interface ContactStore {
  date: string;
  status: "loading" | undefined;
  member: MemberContact[];
  nationalPhone?: NationalContact[];
  fetchNewData: () => void;
}

export const useContactStore = create<ContactStore>((set) => ({
  date: new Date().toISOString(),
  status: undefined,
  member: [],
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
