import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { ComponentProps } from "react";
import { Ionicons } from "@expo/vector-icons";

type IconButtonProps = {
  onPress: () => void;
} & ComponentProps<typeof Ionicons>;

const IconButton = ({ onPress, ...iconProps }: IconButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.buttonContainer}>
        <Ionicons {...iconProps} />
      </View>
    </Pressable>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 24,
    padding: 6,
    width: 48,
    height: 48,
    marginHorizontal: 8,
    marginVertical: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  pressed: {
    opacity: 0.75,
  },
});
