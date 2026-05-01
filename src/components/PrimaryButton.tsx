import { Pressable, Text, View } from "react-native";

type PrimaryButtonProps = {
  label: string;
  onPress?: () => void;
};

export function PrimaryButton({ label, onPress }: PrimaryButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      className="overflow-hidden rounded-2xl bg-blue-500"
    >
      <View className="px-5 py-4">
        <Text className="text-center text-base font-semibold text-white">
          {label}
        </Text>
      </View>
    </Pressable>
  );
}
