import { Stack, router } from "expo-router";
import { FlatList, View } from "react-native";
import {
  Appbar,
  Button,
  Card,
  Dialog,
  Divider,
  FAB,
  Portal,
  Text,
  TextInput,
} from "react-native-paper";
import { useMessageStore } from "@/lib/hooks/useMessageStore";
import * as ExpoSMS from "expo-sms";
import { styles } from "@/constants/style";
import { useCallback, useEffect, useState } from "react";
import { MemberProps, useMemberStore } from "@/lib/hooks/useMemberStore";

export default function Page() {
  const { member } = useMemberStore();
  const { message, setMessage } = useMessageStore();
  const [dialogVisible, setDialogVisible] = useState(false);
  const [members, setMembers] = useState<MemberProps[]>([]);
  // const [message, setMessage] = useState("")

  //functions
  const refreshMembers = useCallback(() => {
    setMembers(member.filter((item, _) => item.smsEnabled));
  }, [member]);
  const getPhoneNumbers = useCallback(() => {
    return members.map((val) => val.phoneNumber);
  }, [members]);

  const sendSMS = () => {
    (async () => {
      const isAvaiable = await ExpoSMS.isAvailableAsync();
      if (isAvaiable) {
        const { result } = await ExpoSMS.sendSMSAsync(
          getPhoneNumbers(),
          message
        );
      }
    })();
  };

  // effect
  useEffect(() => {
    refreshMembers();
  }, []);
  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="SMS" />
      </Appbar.Header>
      <View style={{ flex: 1, paddingHorizontal: 16 }}>
        <Text>Berikut adalah teks yang akan anda kirim: </Text>
        <TextInput value={message} onChangeText={setMessage} />
        <Divider style={{ marginVertical: 16 }} />
        <Text>berikut adalah kerabat yang menerima pesan anda</Text>
        <FlatList
          data={members}
          renderItem={({ item }) => (
            <Card mode={"outlined"}>
              <Card.Content>
                <Text>{item.name}</Text>
                <Text>{item.phoneNumber}</Text>
              </Card.Content>
            </Card>
          )}
        />
      </View>
      <View></View>
      <FAB
        style={styles.fab}
        icon={"send"}
        onPress={() => setDialogVisible(true)}
      />
      <Portal>
        <Dialog
          visible={dialogVisible}
          onDismiss={() => setDialogVisible(false)}
        >
          <Dialog.Title>
            <Text>Apakah anda yakin untuk mengirim ini?</Text>
          </Dialog.Title>
          <Dialog.Content>
            <Text>Anda akan diarakan ke menu SMS</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => sendSMS()}>Kirim</Button>
            <Button onPress={() => setDialogVisible(false)}>Batalkan</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
}
