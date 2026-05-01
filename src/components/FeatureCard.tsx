import { Text, View } from "react-native";

type FeatureCardProps = {
  title: string;
  description: string;
};

export function FeatureCard({ title, description }: FeatureCardProps) {
  return (
    <View className="rounded-3xl border border-slate-800 bg-slate-900/80 p-4">
      <Text className="text-base font-semibold text-slate-100">{title}</Text>
      <Text className="mt-2 text-sm leading-5 text-slate-400">{description}</Text>
    </View>
  );
}
