import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity } from "react-native";
import { StyleSheet, Text, View } from "react-native";

type SplashScreenProps = {
  onNavigateToLogin: () => void;
  onNavigateToSignUp: () => void;
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
    justifyContent: "space-between",
  },
  topSpace: {
    flex: 0.5,
  },
  content: {
    alignItems: "center",
    flex: 1.5,
    justifyContent: "center",
  },
  iconBox: {
    width: 88,
    height: 88,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    marginBottom: 24,
  },
  appName: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    fontWeight: "600",
    color: "rgba(255, 255, 255, 0.9)",
    marginBottom: 16,
  },
  description: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.7)",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 40,
  },
  buttonContainer: {
    width: "100%",
    gap: 12,
    flex: 1,
    justifyContent: "flex-end",
  },
  primaryButton: {
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  secondaryButton: {
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.3)",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  bottomSpace: {
    flex: 0.5,
  },
});

export function SplashScreen({
  onNavigateToLogin,
  onNavigateToSignUp,
}: SplashScreenProps) {
  return (
    <LinearGradient
      colors={["#7B6CF6", "#C86DD7", "#2EC6C6"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <View style={styles.container}>
        <View style={styles.topSpace} />

        <View style={styles.content}>
          <View style={styles.iconBox}>
            <Ionicons name="star-outline" size={40} color="#FFFFFF" />
          </View>

          <Text style={styles.appName}>CareerForge</Text>
          <Text style={styles.tagline}>Your Career Assistant</Text>
          <Text style={styles.description}>
            AI-powered guidance to unlock your professional potential
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <LinearGradient
            colors={["#7B6CF6", "#C86DD7", "#2EC6C6"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.primaryButton}
          >
            <TouchableOpacity
              onPress={onNavigateToSignUp}
              style={{ width: "100%", alignItems: "center" }}
            >
              <Text style={styles.primaryButtonText}>Sign Up</Text>
            </TouchableOpacity>
          </LinearGradient>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={onNavigateToLogin}
          >
            <Text style={styles.secondaryButtonText}>Sign In</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomSpace} />
      </View>
    </LinearGradient>
  );
}
