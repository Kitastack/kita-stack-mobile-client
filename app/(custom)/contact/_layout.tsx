import { Stack, Tabs, router } from "expo-router";
import { Appbar, useTheme } from "react-native-paper";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
const TopTab = createMaterialTopTabNavigator();
import IndexPage from "./index";
import PersonalPage from "./member";

export default function Page() {
  const theme = useTheme();
  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => router.push("/user")} />
        <Appbar.Content title="Halaman User" />
        {/* <Appbar.Action
          icon={"account"}
          aria-label="Akun"
          onPress={() => {
            router.push("/home/account");
          }}
        /> */}
      </Appbar.Header>
      <TopTab.Navigator
        screenOptions={{
          tabBarStyle: { backgroundColor: theme.colors.background },
        }}
      >
        <TopTab.Screen name="Layanan Umum" component={IndexPage} />
        <TopTab.Screen name="Kerabat Anda" component={PersonalPage} />
      </TopTab.Navigator>
    </>
  );
}
