import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function DetailsScreen({ route, navigation }) {
  const { metal, priceData } = route.params;

  // Convert timestamp to readable date/time
  const date = new Date(priceData?.timestamp * 1000).toLocaleDateString();
  const time = new Date(priceData?.timestamp * 1000).toLocaleTimeString();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{metal.name} Details</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Card */}
      <LinearGradient
        colors={["#10384f", "#051620"]}
        style={styles.card}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Metal Icon */}
        <View style={styles.iconWrapper}>
          <Image source={metal.icon} style={styles.icon} />
        </View>

        <Text style={styles.priceLabel}>Current Price</Text>
        <Text style={styles.priceValue}>₹{priceData?.price_gram_24k}/g</Text>
        <Text style={styles.subInfo}>+ 3% GST applicable</Text>

        <View style={styles.row}>
          <Text style={styles.infoText}>Open</Text>
          <Text style={styles.infoValue}>₹{priceData?.open_price}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.infoText}>Prev Close</Text>
          <Text style={styles.infoValue}>₹{priceData?.prev_close_price}</Text>
        </View>

        <View style={styles.rowBetween}>
          <Text style={styles.timeText}>Last Updated: {date}</Text>
          <View style={styles.timer}>
            <Ionicons name="time-outline" size={14} color="#fff" />
            <Text style={styles.timerText}>{time}</Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#051620", padding: 16 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    justifyContent: "space-between",
  },
  headerTitle: { color: "#fff", fontSize: 20, fontWeight: "bold" },

  card: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 6,
    alignItems: "center",
  },
  iconWrapper: {
    marginBottom: 16,
    backgroundColor: "rgba(255,255,255,0.1)",
    padding: 12,
    borderRadius: 50,
  },
  icon: { width: 60, height: 60, resizeMode: "contain" },

  priceLabel: { fontSize: 14, color: "#AAB8C2" },
  priceValue: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginVertical: 6,
    lineHeight: 36,
    paddingBottom: 4,
  },
  subInfo: { fontSize: 12, color: "#FFD700", marginBottom: 20 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    width: "100%",
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
    width: "100%",
  },
  infoText: { color: "#AAB8C2", fontSize: 14 },
  infoValue: { color: "#fff", fontSize: 14, fontWeight: "600", lineHeight: 20 },
  timeText: { color: "#AAB8C2", fontSize: 12 },
  timer: { flexDirection: "row", alignItems: "center" },
  timerText: { color: "#fff", marginLeft: 4, fontSize: 12, lineHeight: 16 },
});
