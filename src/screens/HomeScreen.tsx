import { Text, View } from "react-native";
import { FeatureCard } from "../components/FeatureCard";
import { PrimaryButton } from "../components/PrimaryButton";

const features = [
  {
    title: "Expo + TypeScript",
    description: "A strongly typed mobile foundation with a fast development loop."
  },
  {
    title: "NativeWind",
    description: "Utility-first styling for React Native with Tailwind-style classes."
  },
  {
    title: "Supabase ready",
    description: "Centralized client setup for auth, database, and storage calls."
  }
];

export function HomeScreen() {
  return (
    <View className="flex-1 bg-slate-950 px-5 py-6">
      <View className="mb-8 rounded-[32px] border border-slate-800 bg-slate-900 px-5 py-8">
        <Text className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-400">
          CareerForge
        </Text>
        <Text className="mt-3 text-4xl font-bold leading-tight text-white">
          Expo starter for mobile product work.
        </Text>
        <Text className="mt-4 text-base leading-6 text-slate-400">
          Clean TypeScript structure, Tailwind-style styling, and a Supabase client
          ready for authentication and data flows.
        </Text>
        <View className="mt-6">
          <PrimaryButton label="Start building" />
        </View>
      </View>

      <View className="gap-4">
        {features.map((feature) => (
          <FeatureCard
            key={feature.title}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </View>
    </View>
  );
}
