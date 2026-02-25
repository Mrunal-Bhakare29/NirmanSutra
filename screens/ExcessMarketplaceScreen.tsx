import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";

const materials = [
  { id: "1", name: "Cement", brand: "UltraTech OPC 53", qty: "120 Bags", condition: "Unused", location: "Kolhapur (4.2 km)", price: "₹320 / bag", best: true, image: "https://via.placeholder.com/400" },
  { id: "2", name: "Steel TMT Bars", brand: "Fe500", qty: "500 Kg", condition: "Opened", location: "Sangli (10 km)", price: "₹45 / kg", image: "https://via.placeholder.com/400" },
  { id: "3", name: "River Sand", brand: "Washed", qty: "2 Brass", condition: "Unused", location: "Kolhapur (3 km)", price: "₹4800 / brass", image: "https://via.placeholder.com/400" },
];

export default function BuyMaterialScreen({ navigation }) {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("buy");

  const filteredMaterials = materials.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />

      {item.best && (
        <View style={styles.bestTag}>
          <Text style={styles.bestText}>Best Deal</Text>
        </View>
      )}

      <Text style={styles.title}>{item.name} - {item.brand}</Text>
      <Text style={styles.qty}>Qty: {item.qty}</Text>

      <Text
        style={[
          styles.condition,
          item.condition === "Unused" ? styles.green : styles.yellow,
        ]}
      >
        Condition: {item.condition}
      </Text>

      <Text style={styles.location}>📍 {item.location}</Text>
      <Text style={styles.price}>{item.price}</Text>

      <View style={styles.row}>
        <TouchableOpacity
          style={styles.detailsBtn}
          onPress={() => navigation.navigate("MaterialDetail", { item })}
        >
          <Text style={styles.btnText}>View Details</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.contactBtn}>
          <Text style={styles.btnText}>Contact</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          onPress={() => {
            setActiveTab("buy");
          }}
        >
          <Text style={activeTab === "buy" ? styles.activeTab : styles.tab}>
            Buy Material
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setActiveTab("sell");
            navigation.navigate("SellMaterial");
          }}
        >
          <Text style={activeTab === "sell" ? styles.activeTab : styles.tab}>
            Sell Material
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setActiveTab("MyListing");
            navigation.navigate("MyListing");
          }}
        >
          <Text style={activeTab === "MyListing" ? styles.activeTab : styles.tab}>
            My Listings
          </Text>
        </TouchableOpacity>
      </View>

      {/* Search */}
      <TextInput
        placeholder="Search materials..."
        placeholderTextColor="#888"
        style={styles.search}
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={filteredMaterials}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0f172a", padding: 15 },

  tabs: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },

  activeTab: {
    color: "#fff",
    fontWeight: "bold",
    backgroundColor: "#2563eb",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },

  tab: {
    color: "#aaa",
    paddingHorizontal: 12,
    paddingVertical: 6,
  },

  search: {
    backgroundColor: "#1e293b",
    padding: 12,
    borderRadius: 10,
    color: "#fff",
    marginBottom: 15,
  },

  card: {
    backgroundColor: "#1e293b",
    borderRadius: 14,
    padding: 12,
    marginBottom: 15,
  },

  image: { width: "100%", height: 150, borderRadius: 10 },

  bestTag: {
    position: "absolute",
    right: 10,
    top: 10,
    backgroundColor: "#f97316",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },

  bestText: { color: "#fff", fontSize: 12, fontWeight: "bold" },

  title: { color: "#fff", fontSize: 16, fontWeight: "bold", marginTop: 8 },
  qty: { color: "#cbd5f5", marginTop: 3 },

  condition: { marginTop: 3, fontWeight: "600" },
  green: { color: "#22c55e" },
  yellow: { color: "#facc15" },

  location: { color: "#93c5fd", marginTop: 4 },
  price: { color: "#22c55e", fontSize: 18, fontWeight: "bold", marginTop: 4 },

  row: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-between",
  },

  detailsBtn: {
    backgroundColor: "#2563eb",
    padding: 10,
    borderRadius: 8,
    width: "48%",
    alignItems: "center",
  },

  contactBtn: {
    backgroundColor: "#16a34a",
    padding: 10,
    borderRadius: 8,
    width: "48%",
    alignItems: "center",
  },

  btnText: { color: "#fff", fontWeight: "bold" },
});
