import AsyncStorage from "@react-native-async-storage/async-storage";

export async function $useStorage(
  id: string,
  value?: any,
  instance: boolean = false
) {
  let result: any = null;
  const store = async (_payload: string) =>
    await AsyncStorage.getItem(_payload);
  const isStore = id && (await store(id));

  if (instance) {
    result = AsyncStorage;
  } else if (value === undefined && isStore) {
    result = JSON.parse((await store(id)) as string);
  } else if (id && value === null) {
    await AsyncStorage.removeItem(id);
  } else if (id && !!value) {
    const newVal = JSON.stringify(value);
    await AsyncStorage.setItem(id, newVal);
    result = newVal;
  }
  return result || undefined;
}
