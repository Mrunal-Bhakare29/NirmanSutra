import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";

const myListings = [
  {
    id: "1",
    name: "Steel Rods",
    qty: "100 Kg",
    price: "₹55/kg",
  },
];

export default function MyListingScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState("my");

  return (
    <View style={styles.container}>
      {/* Navbar */}
      <View style={styles.tabs}>
        <TouchableOpacity
          onPress={() => {
            setActiveTab("buy");
            navigation.navigate("ExcessMarketplaceScreen");
          }}
        >
          <Text style={styles.tab}>Buy Material</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setActiveTab("sell");
            navigation.navigate("SellMaterial");
          }}
        >
          <Text style={styles.tab}>Sell Material</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.activeTab}>My Listings</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={myListings}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.name}</Text>
            <Text>Qty: {item.qty}</Text>
            <Text style={styles.price}>{item.price}</Text>
          </View>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
    padding: 16,
  },

  tabs: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  activeTab: {
    color: "#fff",
    fontWeight: "bold",
    backgroundColor: "#2563EB",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },

  tab: {
    color: "#aaa",
    paddingHorizontal: 12,
    paddingVertical: 6,
  },

  header: {
    fontSize: 22,
    color: "#FACC15",
    fontWeight: "bold",
    marginBottom: 20,
  },

  input: {
    backgroundColor: "#1E293B",
    padding: 14,
    borderRadius: 10,
    marginBottom: 15,
    color: "#fff",
  },

  search: {
    backgroundColor: "#1E293B",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    color: "#fff",
  },

  card: {
    backgroundColor: "#1E293B",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
  },

  image: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },

  title: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  qty: {
    color: "#ccc",
    marginTop: 5,
  },

  location: {
    color: "#ccc",
    marginTop: 5,
  },

  price: {
    color: "#FACC15",
    fontWeight: "bold",
    marginTop: 5,
  },

  submitBtn: {
    backgroundColor: "#FACC15",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },

  submitText: {
    color: "#0F172A",
    fontWeight: "bold",
    fontSize: 16,
  },
});
