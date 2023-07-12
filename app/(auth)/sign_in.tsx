import { Stack, router } from "expo-router";
import { View, ToastAndroid } from "react-native";
import { useTheme, Card, Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFormState, Form } from "react-native-use-form";
import { CBox, CText, CTextField } from "@/components";
import { useEffect, useState } from "react";
import { $useStorage } from "@/hooks/useStorage";
import { useAuth } from "@/context/AuthProvider";
import { $useAPI } from "@/hooks/useApi";

const Login = () => {
  const { dispatch } = useAuth();
  const $theme = useTheme();
  const $api = $useAPI();
  const [$mainLoading, $setLoading] = useState<boolean>(false);
  const [$errorMessage, $setErrorMessage] = useState<string | null>(null);

  const [{ errors, submit, formProps, hasError }, { email, password }] =
    useFormState(
      {
        email: "",
        password: "",
      },
      {
        // locale: "en", // optional override
        onChange: (latestValues) => {
          // optional: do something with latestValues
        },
        onSubmit: async (submittedValues) => {
          $setLoading(true);
          try {
            const _loginUser: any = await $api.post("v1/auth/login", {
              email: submittedValues.email,
              password: submittedValues.password,
            });

            if (_loginUser?.success) {
              await $api.post("v1/auth/login", {
                email: submittedValues.email,
                password: submittedValues.password,
              });
            }
            $useStorage("user", _loginUser.result);
            dispatch({ type: "login", payload: _loginUser.result });
            $setErrorMessage(null);

            router.replace("/tolong");
          } catch (error: any) {
            ToastAndroid.show("Terdapat kesalahan", ToastAndroid.LONG);
            $setErrorMessage(error?.data?.message || null);
            // console.log(error?.data?.message);
          } finally {
            $setLoading(false);
          }
        },
      },
    );

  useEffect(() => {}, []);

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
              source={require("@/assets/icon.png")}
            />
          </Card>
          <CBox style={{ flexDirection: "row", gap: 5 }}>
            <CText variant="titleLarge">Login</CText>
            <CText
              variant="titleLarge"
              style={{ color: $theme.colors.primary }}
            >
              KitaRescue
            </CText>
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
                {...email("email", {
                  validate: (value) => {
                    if (!value || value?.length <= 0) return "Perlu Diisi";
                    if (value?.length < 3)
                      return "Minimal terdiri dari 3 karakter";
                    if (!/^\S+@\S+$/.test(value)) return "Email tidak valid";
                    return true;
                  },

                  label: "Email",
                })}
                disabled={$mainLoading}
              />
              <CTextField
                {...password("password", {
                  validate: (value) => {
                    if (!value || value?.length <= 0) return "Perlu Diisi";
                    if (value?.length < 8)
                      return "Minimal terdiri dari 8 karakter";
                    return true;
                  },
                  label: "Password",
                })}
                disabled={$mainLoading}
              />
            </CBox>

            <CBox width="100%" gap={5} alignItems="center">
              <Button
                disabled={$mainLoading}
                loading={$mainLoading}
                onPress={submit}
                mode="contained"
                style={{
                  width: "100%",
                  borderRadius: 5,
                }}
              >
                Masuk
              </Button>
              <CText
                variant="labelSmall"
                underline
                style={{
                  marginTop: 5,
                }}
                onPress={() => router.replace("sign_up")}
              >
                Belum Punya Akun?
              </CText>
            </CBox>
          </Form>
        </CBox>
      </View>
    </SafeAreaView>
  );
};

export default Login;
