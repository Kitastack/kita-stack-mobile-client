import {Avatar, Card, Text} from "react-native-paper";
import {View} from "react-native";
import {styles} from "@/constants/style";

export interface MemberCardProps {
    id?: string
    name: string
    phoneNumber: string
}
export const MemberCard = (props: MemberCardProps) => {
    return (
        <Card mode={"outlined"}>
            <Card.Title title={props.name} subtitle={props.phoneNumber} left={props => <Avatar.Icon {...props} icon={"account"}/>}/>
        </Card>
    )
}
