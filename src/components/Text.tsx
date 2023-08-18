import { ReactNode } from "react";
import { TextComponent } from "react-native";
import {
  customText,
  TextProps,
  TouchableRipple,
  useTheme,
} from "react-native-paper";

type IProps = {
  children: ReactNode;
  underline?: Boolean;
} & TextProps<any>;

export default function Text({ children, underline, ...rest }: IProps) {
  const $theme = useTheme();
  const TextCustom: any = customText<any>();
  return (
    <TouchableRipple
      rippleColor={$theme.colors.surfaceVariant}
      {...rest}
      style={{}}
    >
      <TextCustom
        variant={rest.variant}
        theme={rest.theme}
        style={[
          {
            textDecorationLine: underline ? "underline" : "none",
            padding: underline ? 2 : "auto",
          },
          rest.style,
        ]}
      >
        {children}
      </TextCustom>
    </TouchableRipple>
  );
}
