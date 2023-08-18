import { Stack, router } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { FlatList, StyleSheet, ToastAndroid, View } from "react-native";
import {
  ActivityIndicator,
  Avatar,
  Button,
  Card,
  Dialog,
  Portal,
  Searchbar,
  Text,
  useTheme,
} from "react-native-paper";
import * as ExpoContacts from "expo-contacts";
import { useMemberStore } from "@/lib/hooks/useMemberStore";

const MemberCard = (props: {
  title: string;
  phoneNumbers: string;
  uri?: string;
  onPress?: () => void;
}) => (
  <Card mode="contained" onPress={props.onPress}>
    <Card.Content
      style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
    >
      {props.uri ? (
        <Avatar.Image size={48} source={{ uri: props.uri }} />
      ) : (
        <Avatar.Icon size={48} icon={"account-outline"} />
      )}
      <View>
        <Text
          variant="titleMedium"
          ellipsizeMode="tail"
          style={{ maxWidth: 180 }}
          numberOfLines={1}
        >
          {props.title}
        </Text>
        <Text variant="labelMedium">{props.phoneNumbers}</Text>
      </View>
    </Card.Content>
  </Card>
);

export default function Page() {
  const theme = useTheme();
  const [currentContact, setCurrentContact] = useState<ExpoContacts.Contact>();
  const { addMember } = useMemberStore();

  const [dialogVisible, setDialogVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [contacts, setContacts] = useState<ExpoContacts.Contact[]>([]);

  const doSearch = useCallback(async () => {
    const search = searchVal;
    setLoading(true);
    const { data } = await ExpoContacts.getContactsAsync({ name: search });
    setContacts(data);
    setLoading(false);
  }, [searchVal]);

  const resetSearch = useCallback(async () => {
    setSearchVal("");
    setLoading(true);
    const { data } = await ExpoContacts.getContactsAsync({});
    setContacts(data);
    setLoading(false);
  }, [searchVal]);

  const openDialog = useCallback(
    (contact: ExpoContacts.Contact) => {
      setCurrentContact(contact);
      setDialogVisible(true);
    },
    [dialogVisible],
  );

  useEffect(() => {
    setLoading(true);

    (async () => {
      const { granted } = await ExpoContacts.requestPermissionsAsync();
      if (granted) {
        const { data } = await ExpoContacts.getContactsAsync();
        setContacts(data);
        setLoading(false);
      }
    })();
  }, []);

  return (
    <>
      <Stack.Screen options={{ title: "Tambah kerabat" }} />
      <View style={{ flex: 1, paddingHorizontal: 16 }}>
        {loading ? (
          <ActivityIndicator animating color={theme.colors.onPrimary} />
        ) : contacts.length > 0 ? (
          <FlatList
            data={contacts}
            keyExtractor={({ id }) => id}
            contentContainerStyle={{ gap: 8 }}
            renderItem={({ item }) => (
              <MemberCard
                title={item.name}
                uri={item.image?.uri}
                phoneNumbers={
                  item.phoneNumbers && item.phoneNumbers[0].number
                    ? item.phoneNumbers[0]?.number
                    : ""
                }
                onPress={() => openDialog(item)}
              />
            )}
          />
        ) : (
          <View
            style={{
              flex: 2,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text>Kontak yang tersedia tidak ditemukan</Text>
          </View>
        )}
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: theme.colors.elevation.level1,
          padding: 8,
          gap: 8,
        }}
      >
        <View style={{ flex: 1 }}>
          <Searchbar
            value={searchVal}
            onChangeText={setSearchVal}
            onSubmitEditing={() => {
              doSearch().then(() => console.log("done"));
            }}
            onIconPress={() => {
              doSearch().then(() => console.log("done"));
            }}
            onClearIconPress={() => {
              resetSearch().then(() => console.log("reseted"));
            }}
          />
        </View>
      </View>
      <Portal>
        <Dialog
          visible={dialogVisible}
          onDismiss={() => setDialogVisible(false)}
        >
          <Dialog.Title>Tambah kerabat?</Dialog.Title>
          <Dialog.Content>
            <Text>
              anda akan menambahkan {currentContact?.name} ke dalam anggota
              kerabatmu
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={() => {
                if (currentContact) {
                  if (
                    currentContact.phoneNumbers &&
                    currentContact.phoneNumbers[0].number
                  ) {
                    addMember({
                      id: currentContact.id,
                      name: currentContact.name,
                      phoneNumber: currentContact.phoneNumbers[0].number,
                    });
                    ToastAndroid.show(
                      "Kerabat berhasil ditambahkan",
                      ToastAndroid.SHORT,
                    );
                    router.back();
                  }
                } else {
                  ToastAndroid.show(
                    "Kontak yang anda pilih tidak memiliki nama / nomor",
                    ToastAndroid.SHORT,
                  );
                }
                setDialogVisible(false);
              }}
              icon={"check"}
            >
              Tambahkan
            </Button>
            <Button onPress={() => setDialogVisible(false)}>Batal</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
}
