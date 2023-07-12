import { Stack, Tabs } from "expo-router";
import { useTheme } from "react-native-paper";
import { View } from "react-native";
// import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { BottomNavigation, Text, Button } from "react-native-paper";
import AuthProvider from "@/context/AuthProvider";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import React from "react";

import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
// const TopTab = createMaterialTopTabNavigator();
const Tab = createMaterialBottomTabNavigator();

const MusicRoute = () => <Text>Music</Text>;
const AlbumsRoute = () => <Text>Albums</Text>;
const RecentsRoute = () => <Text>Recents</Text>;
const Kegiatan = () => {
  const { dispatch } = useAuth();
  return (
    <>
      <SafeAreaView>
        <View
          style={{
            height: "100%",
          }}
        >
          <Text>Akun Route</Text>
          <Button
            onPress={async () => {
              await $useStorage("user", null);
              dispatch({ type: "logout" });
            }}
          >
            Logout
          </Button>
        </View>
      </SafeAreaView>
    </>
  );
};
import Tolong from "./tolong";
import Pertolongan from "./pertolongan";
import User from "./user";

import { useAuth } from "@/context/AuthProvider";
import { $useStorage } from "@/hooks/useStorage";

export default function Page() {
  const theme = useTheme();
  const [index, setIndex] = React.useState(0);

  // const [routes] = React.useState([
  //   {
  //     key: "tolong",
  //     title: "Tolong",
  //     focusedIcon: "alert-circle",
  //     unfocusedIcon: "alert-circle-outline",
  //   },
  //   {
  //     key: "pertolongan",
  //     title: "Pertolongan",
  //     focusedIcon: "handshake",
  //     unfocusedIcon: "handshake-outline",
  //   },
  //   {
  //     key: "kegiatan",
  //     title: "Kegiatan",
  //     focusedIcon: "clipboard-text-clock",
  //     unfocusedIcon: "clipboard-text-clock-outline",
  //   },
  //   {
  //     key: "akun",
  //     title: "Akun",
  //     focusedIcon: "account",
  //     unfocusedIcon: "account-outline",
  //   },
  // ]);
  return (
    <SafeAreaProvider>
      <Tab.Navigator
        initialRouteName="tolong"
        shifting={true}
        sceneAnimationEnabled={true}
      >
        <Tab.Screen
          name="tolong"
          component={Tolong}
          options={{
            tabBarIcon: "home-account",
          }}
        />
        <Tab.Screen
          name="Pertolongan"
          component={Pertolongan}
          options={{
            tabBarIcon: "handshake-outline",
          }}
        />
        <Tab.Screen
          name="Kegiatan"
          component={Kegiatan}
          options={{
            tabBarIcon: "clipboard-text-clock",
          }}
        />
        <Tab.Screen
          name="Akun"
          component={User}
          options={{
            tabBarIcon: "account",
          }}
        />
      </Tab.Navigator>
    </SafeAreaProvider>
  );
}
