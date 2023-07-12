// base
import { Stack, router } from "expo-router";
import { View, ToastAndroid } from "react-native";
import { useTheme, Card, Button, Checkbox } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFormState, Form } from "react-native-use-form";
import { CBox, CText, CTextField } from "@/components";
import { useEffect, useState } from "react";
import { $useStorage } from "@/hooks/useStorage";
import { $useAPI } from "@/hooks/useApi";

const Daftar = () => {
  const $theme = useTheme();
  const $api = $useAPI();
  const [$mainLoading, $setLoading] = useState<boolean>(false);
  const [$isChecked, $setChecked] = useState<boolean>(false);
  const [$errorMessage, $setErrorMessage] = useState<string | null>(null);

  const [
    { errors, submit, formProps, hasError },
    { username, email, password },
  ] = useFormState(
    {
      username: "",
      email: "",
      password: "",
    },
    {
      // locale: "en", // optional override
      onChange: (latestValues) => {
        // optional: do something with latestValues
      },
      onSubmit: async (submittedValues) => {
        $setErrorMessage(null);
        $setLoading(true);
        try {
          const _resultAfterRegisterUser: any = await $api.post(
            "v1/users/create",
            {
              ...submittedValues,
              isAgreeTerm: $isChecked,
            }
          );
          console.log(_resultAfterRegisterUser);

          if (_resultAfterRegisterUser?.success) {
            await $api.post("v1/auth/sendVerifyEmail", {
              email:
                _resultAfterRegisterUser?.result?.email ||
                submittedValues.email,
            });
          }

          ToastAndroid.show(
            "Verifikasi akun melalui email Anda. Periksa folder spam bila perlu",
            ToastAndroid.LONG
          );
          $setErrorMessage(null);
          $setChecked(false);

          router.replace("sign_in");
        } catch (error: any) {
          ToastAndroid.show("Terdapat kesalahan", ToastAndroid.LONG);
          $setErrorMessage(error?.data?.message || null);
          console.log(error);
        } finally {
          $setLoading(false);
        }
      },
    }
  );

  return (
    <SafeAreaView>
      <Stack.Screen options={{ title: "", header: () => null }} />
      <View
        style={{
          padding: 10,
        }}
      >
        <CBox width="100%" height="100%" alignItems="center" gap={25}>
          <Card>
            <Card.Cover
              style={{ width: 50, height: 50 }}
              source={require("@/assets/kitastack.jpeg")}
            />
          </Card>
          <CBox style={{ flexDirection: "row", gap: 5 }}>
            <CText
              variant="titleLarge"
              style={{ color: $theme.colors.primary }}
            >
              Daftar Akun
            </CText>
            <CText variant="titleLarge">KitaRescue</CText>
          </CBox>
          {$errorMessage && (
            <CBox
              width="100%"
              alignItems="start"
              style={{
                flexDirection: "row",
                gap: 5,
                backgroundColor: $theme.colors.errorContainer,
                padding: 10,
                borderRadius: 5,
              }}
            >
              <CText style={{ color: "red" }}>{$errorMessage}</CText>
            </CBox>
          )}
          <Form {...formProps}>
            <CBox width="100%" gap={10}>
              <CTextField
                {...username("username", {
                  validate: (_v) => {
                    if (!_v || _v?.length <= 0) return "Perlu Diisi";
                    if (_v?.length < 3)
                      return "Minimal terdiri dari 3 karakter";
                    return true;
                  },
                  label: "Nama",
                })}
                disabled={$mainLoading}
              />
              <CTextField
                {...email("email", {
                  validate: (_v) => {
                    if (!_v || _v?.length <= 0) return "Perlu Diisi";
                    if (_v?.length < 3)
                      return "Minimal terdiri dari 3 karakter";
                    if (!/^\S+@\S+$/.test(_v)) return "Email tidak valid";
                    return true;
                  },

                  label: "Email",
                })}
                disabled={$mainLoading}
              />
              <CTextField
                {...password("password", {
                  validate: (_v) => {
                    if (!_v || _v?.length <= 0) return "Perlu Diisi";
                    if (_v?.length < 8)
                      return "Minimal terdiri dari 8 karakter";
                    return true;
                  },
                  label: "Password",
                })}
                disabled={$mainLoading}
              />
              <CBox
                style={{
                  flexDirection: "row",
                  gap: 5,
                  alignItems: "center",
                }}
              >
                <Checkbox
                  status={$isChecked ? "checked" : "unchecked"}
                  onPress={() => {
                    $setChecked((_val) => !_val);
                  }}
                />
                <View style={{ flexShrink: 1 }}>
                  <CText>
                    Saya setuju dengan syarat dan ketentuan yang berlaku
                  </CText>
                </View>
              </CBox>
            </CBox>

            <CBox width="100%" gap={5} alignItems="center">
              <Button
                disabled={$mainLoading}
                onPress={submit}
                mode="contained"
                style={{
                  width: "100%",
                  borderRadius: 5,
                }}
              >
                Daftar
              </Button>

              <CText
                variant="labelSmall"
                underline
                style={{
                  marginTop: 5,
                }}
                onPress={() => router.replace("sign_in")}
              >
                Sudah Punya Akun?
              </CText>
            </CBox>
          </Form>
        </CBox>
      </View>
    </SafeAreaView>
  );
};

export default Daftar;
