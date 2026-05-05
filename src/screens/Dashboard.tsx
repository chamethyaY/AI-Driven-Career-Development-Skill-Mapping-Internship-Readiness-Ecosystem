import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type DashboardProps = {
  onSignOut?: () => void;
};

export function Dashboard({ onSignOut }: DashboardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.topIconWrap}>
          <LinearGradient
            colors={["#7B6CF6", "#C86DD7", "#2EC6C6"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.iconGradient}
          >
            <Ionicons name="home-outline" size={34} color="#FFFFFF" />
          </LinearGradient>
        </View>

        <Text style={styles.heading}>Dashboard</Text>
        <Text style={styles.subtitle}>Your account is verified and ready to use.</Text>

        <TouchableOpacity onPress={onSignOut} activeOpacity={0.8} style={styles.signOutBtn}>
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0E27",
    paddingHorizontal: 24,
    paddingTop: 36,
    paddingBottom: 24,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  topIconWrap: {
    marginBottom: 26,
  },
  iconGradient: {
    width: 84,
    height: 84,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 32,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.7)",
    textAlign: "center",
    marginBottom: 28,
    maxWidth: 320,
  },
  signOutBtn: {
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.04)",
  },
  signOutText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 14,
  },
});
