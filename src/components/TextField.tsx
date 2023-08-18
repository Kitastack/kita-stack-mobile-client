import { TextInput, TextInputProps, HelperText } from "react-native-paper";

type Iprops = {
  _value?: any;
  _setValue?: Function;
  errorMessage?: string;
} & TextInputProps;

const TextField = ({
  _value,
  _setValue,
  errorMessage,
  error,
  ...rest
}: Iprops) => {
  return (
    <>
      <TextInput
        dense
        mode="outlined"
        value={_value}
        onChangeText={(_text) => _setValue?.(_text)}
        underlineColor="transparent"
        style={{
          width: "100%",
          paddingBottom: 5,
          borderRadius: 5,
          borderBottomWidth: 0,
          fontSize: 14,
        }}
        error={error}
        {...rest}
      />
      {Boolean(error && errorMessage) && (
        <HelperText
          type="error"
          padding="none"
          style={{
            paddingVertical: 0,
            marginVertical: 0,
            paddingLeft: 5,
          }}
        >
          {errorMessage || ""}
        </HelperText>
      )}
    </>
  );
};

export default TextField;
