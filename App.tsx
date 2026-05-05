import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SignIn } from "./src/screens/signIn";
import { SignUp } from "./src/screens/SignUp";
import { SplashScreen } from "./src/screens/SplashScreen";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#020617",
  },
});

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<"splash" | "signin" | "signup">(
    "splash",
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      {currentScreen === "splash" ? (
        <SplashScreen onNavigateToLogin={() => setCurrentScreen("signin")} />
      ) : currentScreen === "signin" ? (
        <SignIn onNavigateToSignUp={() => setCurrentScreen("signup")} />
      ) : (
        <SignUp onNavigateToSignIn={() => setCurrentScreen("signin")} />
      )}
    </SafeAreaView>
  );
}
