import { Avatar, Card, IconButton, Text, useTheme } from "react-native-paper";
import { View } from "react-native";
import { styles } from "@/constants/style";

export interface MemberCardProps {
	id?: string;
	name: string;
	phoneNumber: string;
	onDelete?: () => void;
}
export const MemberCard = (props: MemberCardProps) => {
	const theme = useTheme();
	return (
		<Card mode={"outlined"} style={{ marginBottom: 4 }}>
			<Card.Title
				title={props.name}
				subtitle={props.phoneNumber}
				left={(props) => <Avatar.Icon {...props} icon={"account"} />}
			/>
			<Card.Actions>
				{props.onDelete ? (
					<IconButton
						mode="contained"
						style={{ backgroundColor: theme.colors.error }}
						iconColor={theme.colors.onError}
						icon={"trash-can"}
						onPress={() => props.onDelete()}
					/>
				) : (
					<></>
				)}
			</Card.Actions>
		</Card>
	);
};
