import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LoginScreen } from "./src/screens/LoginScreen";
import { SplashScreen } from "./src/screens/SplashScreen";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#020617",
  },
});

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<
    "splash" | "login" | "signup"
  >("splash");

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      {currentScreen === "splash" ? (
        <SplashScreen
          onNavigateToLogin={() => setCurrentScreen("login")}
          onNavigateToSignUp={() => setCurrentScreen("signup")}
        />
      ) : currentScreen === "login" ? (
        <LoginScreen />
      ) : (
        <LoginScreen /> // TODO: Create SignUpScreen component
      )}
    </SafeAreaView>
  );
}
