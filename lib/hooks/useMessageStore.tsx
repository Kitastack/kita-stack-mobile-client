import {create} from "zustand";
import {createJSONStorage, persist} from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";


export interface UseMessageStore {
    message: string
    targetMember?: string
    setMessage: (newMessage:string) => void
    resetMessage: ()=> void
}

export const useMessageStore = create<UseMessageStore>()(
    persist((set,get)=> ({
        message: "",
        setMessage:(newMessage: string) => set({message: newMessage}),
        resetMessage: () => set({message: ""})
    }),{
        name: "message-store",
        storage: createJSONStorage(()=> AsyncStorage)
    })
)


