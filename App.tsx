import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SignIn } from "./src/screens/signIn";
import { SignUp } from "./src/screens/SignUp";
import { SplashScreen } from "./src/screens/SplashScreen";
import { Verify } from "./src/screens/Verify";
import { Dashboard } from "./src/screens/Dashboard";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#020617",
  },
});

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<
    "splash" | "signin" | "signup" | "verify" | "dashboard"
  >("splash");
  const [verifyEmail, setVerifyEmail] = useState("");
  const [splashNextScreen, setSplashNextScreen] = useState<"signin" | "dashboard">("signin");

  const handleSplashComplete = () => {
    setCurrentScreen(splashNextScreen);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      {currentScreen === "splash" ? (
        <SplashScreen onNavigateToLogin={handleSplashComplete} />
      ) : currentScreen === "signin" ? (
        <SignIn
          onNavigateToSignUp={() => setCurrentScreen("signup")}
          onNavigateToSplash={() => {
            setSplashNextScreen("dashboard");
            setCurrentScreen("splash");
          }}
        />
      ) : currentScreen === "signup" ? (
        <SignUp
          onNavigateToSignIn={() => setCurrentScreen("signin")}
          onNavigateToVerify={(email) => {
            setVerifyEmail(email);
            setCurrentScreen("verify");
          }}
          onBack={() => setCurrentScreen("signin")}
        />
      ) : currentScreen === "verify" ? (
        <Verify
          email={verifyEmail}
          onNavigateToSignIn={() => setCurrentScreen("signin")}
          onNavigateToHome={() => {
            setCurrentScreen("dashboard");
          }}
        />
      ) : (
        <Dashboard onSignOut={() => setCurrentScreen("signin")} />
      )}
    </SafeAreaView>
  );
}
