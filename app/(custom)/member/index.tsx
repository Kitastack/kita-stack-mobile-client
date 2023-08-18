import { styles } from "@/constants/style";
import {
  MemberPermission,
  MemberProps,
  useMemberStore,
} from "@/lib/hooks/useMemberStore";
import { Stack, router, useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { FlatList, ScrollView, View } from "react-native";
import {
  Appbar,
  Card,
  Chip,
  FAB,
  IconButton,
  Searchbar,
  Text,
  useTheme,
} from "react-native-paper";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [members, setMembers] = useState<MemberProps[]>([]);
  const { member, removeMember, toggleMemberPermission } = useMemberStore();
  const theme = useTheme();
  const togglePermission = useCallback(
    (id: string, permission: MemberPermission) => {
      toggleMemberPermission(id, permission);
    },
    [member],
  );
  const refresh = useCallback(() => {
    setLoading(true);
    setMembers(member.filter((item, _) => item.name.includes(searchVal)));
    setLoading(false);
    console.log("test");
  }, [member]);
  const doSearch = useCallback(() => {
    setLoading(true);
    setMembers(member.filter((item, _) => item.name.includes(searchVal)));
    setLoading(false);
  }, [searchVal, member]);

  const resetSearch = useCallback(() => {
    setSearchVal("");
    setLoading(true);
    setMembers(member);
    setLoading(false);
  }, [searchVal]);
  useEffect(() => {
    refresh();
  }, []);
  useEffect(() => refresh(), [member]);
  return (
    <>
      <Stack.Screen
        options={{
          title: "Kerabat",
          header: (props) => (
            <Appbar.Header>
              <Appbar.BackAction onPress={() => router.back()} />
              <Appbar.Content title={props.options.title} />
            </Appbar.Header>
          ),
        }}
      />
      <View style={{ flex: 1, paddingHorizontal: 16 }}>
        {loading ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>Loading</Text>
          </View>
        ) : (
          <FlatList
            data={members}
            contentContainerStyle={{ gap: 8 }}
            ListEmptyComponent={() => (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text>Kontak kerabat anda kosong</Text>
              </View>
            )}
            renderItem={({ item: items }) => (
              <Card mode="contained">
                <Card.Content
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View style={{ flex: 1, gap: 8 }}>
                    <Text variant="titleMedium">{items.name}</Text>
                    <View
                      style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        gap: 2,
                      }}
                    >
                      <Chip
                        mode="outlined"
                        onPress={() => togglePermission(items.id, "PHONE")}
                        icon={
                          items.phoneEnabled
                            ? "checkbox-marked-circle-outline"
                            : "checkbox-blank-circle-outline"
                        }
                      >
                        Telepon
                      </Chip>
                      <Chip
                        onPress={() => {
                          togglePermission(items.id, "SMS");
                        }}
                        mode="outlined"
                        icon={
                          items.smsEnabled
                            ? "checkbox-marked-circle-outline"
                            : "checkbox-blank-circle-outline"
                        }
                      >
                        SMS
                      </Chip>
                    </View>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <IconButton
                      icon={"trash-can-outline"}
                      iconColor={theme.colors.error}
                      onPress={() => {
                        removeMember(items.id);
                        refresh();
                      }}
                    />
                    {/* <IconButton icon={"account-edit-outline"} /> */}
                  </View>
                </Card.Content>
              </Card>
            )}
          />
        )}
      </View>
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: theme.colors.elevation.level1,
            padding: 8,
            gap: 4,
          }}
        >
          <Searchbar
            style={{ flex: 1 }}
            value={searchVal}
            onChangeText={setSearchVal}
            onSubmitEditing={doSearch}
            onIconPress={doSearch}
          />
          <View>
            <FAB
              onPress={() => router.push("/member/add")}
              variant="primary"
              icon={"plus"}
            />
          </View>
        </View>
      </View>
    </>
  );
}
