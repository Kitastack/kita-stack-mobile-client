import { Stack, router } from "expo-router";
import { Platform, View } from "react-native";
import {
  Button,
  Text,
  TextInput,
  TouchableRipple,
  useTheme,
} from "react-native-paper";
import { useIsFocused } from "@react-navigation/core";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  useSafeAreaInsets,
  SafeAreaView,
} from "react-native-safe-area-context";
import { CBox, CText, CTextField } from "@/components";
import * as Location from "expo-location";
const TopTab = createMaterialTopTabNavigator();
import { useCallback, useState, useEffect, useRef, LegacyRef } from "react";
import { $useAPI } from "@/hooks/useApi";
import MapView, {
  Camera,
  Marker,
  Region,
  Circle,
  PROVIDER_GOOGLE,
} from "react-native-maps";

const Home = () => {
  const $isFocused = useIsFocused();
  const $theme = useTheme();
  const [$count, $setCount] = useState<number>(3);
  const [$isPressed, $setPressed] = useState<boolean>(false);
  const [$isQuickPressed, $setQuickPressed] = useState<boolean>(false);
  const [$isNeedRescue, $setNeedRescue] = useState<boolean>(false);
  const [$_lastRescue, $_setLastRescue] = useState<any>(undefined);

  const $api = $useAPI();
  const $map: LegacyRef<MapView> = useRef(null);
  const _counterInterval = () =>
    setInterval(() => {
      $setCount((_val) => _val - 1);
    }, 1000);
  const _updateTick = () =>
    setInterval(() => $setPressed((_val) => !_val), 1000);

  const $setZoom = (zoom: number = 18) => {
    $map.current?.getCamera().then((cam: Camera) => {
      if (Platform.OS === "android") {
        cam.zoom = zoom;
      } else {
        cam.altitude = zoom / 2;
      }

      cam.center = {
        latitude: ~~Number(-8.5871886) + Number(-0.5891886),
        longitude: 116.0972789,
      };

      $map.current?.animateCamera(cam);
    });
  };

  const handleZoomIn = () => {
    $map.current?.getCamera().then((cam: any) => {
      if (Platform.OS === "android") {
        cam.zoom += 1;
      } else {
        cam.altitude /= 2;
      }

      $map.current?.animateCamera(cam);
    });
  };

  const handleZoomOut = () => {
    $map.current?.getCamera().then((cam: any) => {
      if (Platform.OS === "android") {
        cam.zoom -= 1;
      } else {
        cam.altitude *= 2;
      }
      $map.current?.animateCamera(cam);
    });
  };

  const $getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === Location.PermissionStatus.GRANTED) {
        const _result = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Highest,
        });

        if (!_result) return null;

        const { latitude, longitude } = _result.coords;

        const address = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });

        if (address) return { ..._result.coords, address };
        return _result.coords;
      }
    } catch (e) {
      console.log(e);
      return undefined;
    }
  };

  const $isAlreadyRescue = async () => {
    console.log("test");
    try {
      $_setLastRescue(undefined);
      const _lastRescue: any = await $api.get(
        "v1/rescue/getByUserWithNonFinished",
        {
          params: {
            payload: JSON.stringify({
              pipeline: [
                {
                  $sort: {
                    _createdDate: -1,
                  },
                },
                {
                  $lookup: {
                    from: "Users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "user",
                  },
                },
                {
                  $unwind: {
                    path: "$user",
                    preserveNullAndEmptyArrays: true,
                  },
                },
              ],
            }),
            limit: 1,
          },
        },
      );

      if (_lastRescue?.success) {
        $_setLastRescue(_lastRescue?.result[0]);
        $setZoom();
      }
      // console.log("done", $_lastRescue.user);
    } catch (error: any) {
      console.log("tolong-error", error);
    }
  };

  const $markAsFinished = async () => {
    try {
      console.log("run-finished", {
        _id: $_lastRescue?._id,
        isFinished: true,
      });
      if (!$_lastRescue?._id) return;
      const _updatedRescue: any = await $api.post("v1/rescue/saveByUser", {
        _id: $_lastRescue._id,
        isFinished: true,
      });
      if (_updatedRescue?.success) await $isAlreadyRescue();
    } catch (error) {
      console.log("tolong-error", error);
    }
  };

  const $createRescue = useCallback(async () => {
    try {
      console.log("loc", $getLocation());
      await $api.post("v1/rescue/saveByUser", {
        lat: String(-8.5869),
        lng: String(116.0922),
        address: "Universitas Mataram Fakultas Teknik",
        description: "Meminta pertolongan tanpa keterangan detail (perhatian)",
      });
      await $isAlreadyRescue();
    } catch (error) {
      console.log("tolong-error", error);
    }
  }, []);

  useEffect(() => {
    if ($isFocused) {
      $isAlreadyRescue();
    }
  }, [$isFocused]);

  return (
    <>
      <Stack.Screen options={{ header: () => null }} />
      <SafeAreaView>
        {/* <View
          style={{
            height: "100%",
          }}
        > */}

        {$_lastRescue && $_lastRescue?._id ? (
          <View style={{ padding: 10 }}>
            <CText variant="headlineMedium">Pertolongan Anda</CText>
            <CText>{$_lastRescue._createdDate}</CText>
            <CText style={{ marginTop: 25 }}>
              Deskripsi : {$_lastRescue.description || "-"}
            </CText>
            <CText>Alamat : {$_lastRescue.address || "-"}</CText>
            <CText style={{ color: $theme.colors.primary }}>
              Dibuat Oleh : {$_lastRescue.user?.username || "-"}{" "}
              {($_lastRescue.user?.email && `/ ${$_lastRescue.user?.email}`) ||
                ""}
            </CText>
            <CBox style={{ marginTop: 25 }}>
              <Button
                mode="contained"
                style={{
                  borderRadius: 5,
                  backgroundColor: $theme.colors.error,
                }}
              >
                Minta Pertolongan
              </Button>
              <Button
                mode="contained"
                style={{ borderRadius: 5, marginTop: 5 }}
                onPress={() => $markAsFinished()}
              >
                Tandai Selesai
              </Button>
            </CBox>
            <CText variant="bodyLarge" style={{ marginTop: 15 }}>
              Lokasi Anda
            </CText>
            <MapView
              provider={PROVIDER_GOOGLE}
              ref={$map}
              showsTraffic={false}
              showsScale={true}
              style={{
                alignSelf: "stretch",
                height: "100%",
                marginTop: 5,
              }}
              region={{
                latitude: -8.5869,
                longitude: 116.0922,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              onPress={(_event) => {}}
            >
              <Circle
                center={{
                  latitude: -8.5871886,
                  longitude: 116.0972789,
                }}
                radius={100}
                strokeWidth={2}
                strokeColor={$theme.colors.primary}
                fillColor={$theme.colors.surfaceVariant}
              />
              <Marker
                pinColor="blue"
                coordinate={{
                  latitude: -8.5871886,
                  longitude: 116.0972789,
                }}
              />
            </MapView>
          </View>
        ) : (
          <TouchableRipple
            rippleColor={$theme.colors.surfaceVariant}
            style={{ height: "100%" }}
            onLongPress={() => {
              $setCount(3);

              setTimeout(() => {
                // $_lastRescue;
                $createRescue();
                $setNeedRescue(true);
                clearInterval(_updateTick());
                clearInterval(_counterInterval());
              }, 3000);
              $setQuickPressed(true);
            }}
            onPressOut={() => {
              setTimeout(() => {
                $setPressed(false);
                $setNeedRescue(false);
                $setQuickPressed(false);
                clearInterval(_updateTick());
                clearInterval(_counterInterval());
              }, 1000);
            }}
          >
            <CBox
              width="100%"
              height="100%"
              alignItems="center"
              justifyContent="center"
            >
              <CBox
                width={750}
                height={750}
                alignItems="center"
                justifyContent="center"
                style={{
                  backgroundColor: $isPressed
                    ? $theme.colors.surfaceVariant
                    : $theme.colors.surface,
                  borderRadius: 750,
                }}
              >
                <CBox
                  width={500}
                  height={500}
                  alignItems="center"
                  justifyContent="center"
                  style={{
                    backgroundColor: $isPressed
                      ? $theme.colors.surface
                      : $theme.colors.surfaceVariant,
                    borderRadius: 500,
                  }}
                >
                  <CBox
                    width={250}
                    height={250}
                    alignItems="center"
                    justifyContent="center"
                    style={{
                      backgroundColor: $theme.colors.primary,
                      borderRadius: 250,
                    }}
                  >
                    <CText variant="titleMedium" style={{ color: "white" }}>
                      Minta Pertolongan
                    </CText>
                    <CText style={{ color: "white" }}>
                      {$isQuickPressed
                        ? $isNeedRescue
                          ? "Lepaskan"
                          : `Tahan ${$count} Detik`
                        : "Tahan Untuk Mulai"}
                    </CText>
                  </CBox>
                </CBox>
              </CBox>
            </CBox>
          </TouchableRipple>
        )}

        {/* <Button
              onPress={() => console.log("ok")}
              style={{ width: "50%", padding: 10 }}
            >
              Hello
            </Button> */}
        {/* </View> */}
      </SafeAreaView>
    </>
  );
};

export default Home;
