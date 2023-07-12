import { Slot, Stack, Tabs, router } from "expo-router";
import { Appbar, useTheme } from "react-native-paper";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
const TopTab = createMaterialTopTabNavigator();
import IndexPage from "./index";
import PersonalPage from "./index";

export default function Page() {
  const theme = useTheme();
  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="Kerabat" />
        {/* <Appbar.Action
          icon={"account"}
          aria-label="Akun"
          onPress={() => {
            router.push("/home/account");
          }}
        /> */}
      </Appbar.Header>
      <Slot />
    </>
  );
}
