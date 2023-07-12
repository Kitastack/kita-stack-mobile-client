import { router } from "expo-router";
import { Card } from "react-native-paper";

export function SettingsCardListItem(props: { title: string; href: string }) {
  return (
    <Card onPress={() => router.push(props.href)}>
      <Card.Title title={props.title} />
    </Card>
  );
}
