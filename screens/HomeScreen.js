import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Image,
  Animated,
  Easing,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { getMetalPrice } from "../api/metalApi";

const metals = [
  { name: "Gold", code: "gold", icon: require("../assets/gold.png") },
  { name: "Silver", code: "silver", icon: require("../assets/silver.png") },
  {
    name: "Platinum",
    code: "platinum",
    icon: require("../assets/platinum.png"),
  },
  {
    name: "Palladium",
    code: "palladium",
    icon: require("../assets/palladium.png"),
  },
];

export default function HomeScreen({ navigation }) {
  const [prices, setPrices] = useState({});
  const [loadingMetals, setLoadingMetals] = useState({});
  const [errorMetals, setErrorMetals] = useState({});

  const rotateAnim = useRef(new Animated.Value(0)).current;
  const shineAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loopShine = () => {
      shineAnim.setValue(0);
      Animated.timing(shineAnim, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => loopShine());
    };
    loopShine();

    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 6000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const shineTranslate = shineAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-80, 80], // diagonal distance
  });

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  useEffect(() => {
    const fetchAllPrices = async () => {
      setLoadingMetals(
        metals.reduce((acc, m) => ({ ...acc, [m.code]: true }), {})
      );
      try {
        const results = await Promise.all(
          metals.map(async (metal) => {
            try {
              const res = await getMetalPrice(metal.code);
              return { code: metal.code, data: res, error: null };
            } catch {
              return { code: metal.code, data: null, error: "Failed to fetch" };
            }
          })
        );

        const newPrices = {};
        const newErrors = {};
        const newLoading = {};
        results.forEach(({ code, data, error }) => {
          newPrices[code] = data;
          newErrors[code] = error;
          newLoading[code] = false;
        });
        setPrices(newPrices);
        setErrorMetals(newErrors);
        setLoadingMetals(newLoading);
      } catch (err) {
        console.error("Unexpected error:", err);
      }
    };

    fetchAllPrices();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={metals}
        keyExtractor={(item) => item.code}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: "space-between",
          marginBottom: 16,
        }}
        renderItem={({ item }) => {
          const priceData = prices[item.code];
          const loading = loadingMetals[item.code];
          const errorMsg = errorMetals[item.code];

          return (
            <TouchableOpacity
              style={styles.cardWrapper}
              onPress={() =>
                navigation.navigate("Details", { metal: item, priceData })
              }
              disabled={loading || !!errorMsg}
              activeOpacity={0.85}
            >
              <Animated.View
                pointerEvents="none"
                style={[styles.borderRotate, { transform: [{ rotate }] }]}
              >
                <LinearGradient
                  pointerEvents="none"
                  colors={[
                    "rgba(3,28,43,1)",
                    "rgba(152,224,255,1)",
                    "transparent",
                    "rgba(3,28,43,1)",
                  ]}
                  locations={[0, 0.2, 0.4, 1]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.borderGradient}
                />
              </Animated.View>

              {/* Inner Card with Gradient Background */}
              <LinearGradient
                colors={["#15556e", "#031c2bff"]}
                locations={[0.1, 0.9]}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 0 }}
                style={styles.card}
              >
                <View style={styles.iconWrapper}>
                  <Image source={item.icon} style={styles.icon} />
                  <Animated.View
                    pointerEvents="none"
                    style={[
                      styles.shine,
                      {
                        transform: [
                          { translateX: shineTranslate },
                          { translateY: shineTranslate },
                          { rotate: "30deg" },
                        ],
                      },
                    ]}
                  >
                    <LinearGradient
                      pointerEvents="none"
                      colors={[
                        "rgba(255,255,255,0)",
                        "rgba(255,255,255,0.3)",
                        "rgba(255,255,255,0)",
                      ]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={{ flex: 1 }}
                    />
                  </Animated.View>
                </View>

                <Text style={[styles.title, { color: "#fff" }]}>
                  {item.name}
                </Text>

                {loading && <ActivityIndicator size="small" color="#fff" />}
                {errorMsg && <Text style={styles.error}>{errorMsg}</Text>}

                {!loading && !errorMsg && priceData && (
                  <>
                    <Text style={styles.text}>
                      24K: ₹{priceData.price_gram_24k}
                    </Text>
                    <Text style={styles.time}>
                      {new Date(
                        priceData.timestamp * 1000
                      ).toLocaleTimeString()}
                    </Text>
                  </>
                )}
              </LinearGradient>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#051620", padding: 16 },
  cardWrapper: {
    flex: 1,
    marginHorizontal: 6,
    height: 180,
    borderRadius: 16,
    overflow: "hidden",
  },
  borderRotate: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  borderGradient: {
    width: "150%",
    height: "150%",
    borderRadius: 20,
    opacity: 0.8,
  },
  card: {
    flex: 1,
    borderRadius: 16,
    backgroundColor: "#082739",
    padding: 16,
    justifyContent: "center",
    alignItems: "flex-start",
    margin: 2,
  },
  iconWrapper: {
    width: 60,
    height: 50,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  shine: {
    position: "absolute",
    top: -50,
    left: -50,
    width: 40,
    height: 150,
    opacity: 0.8,
  },

  icon: { width: 60, height: 40, resizeMode: "contain" },

  title: { fontSize: 18, fontWeight: "700", marginBottom: 6 },
  text: { fontSize: 14, color: "#E0E7F5", lineHeight: 20 },
  time: { marginTop: 6, fontSize: 12, color: "#AAB8C2" },
  error: { color: "red", fontSize: 14 },
});
