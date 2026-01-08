import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import IconIon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const DATA = [
  {
    id: "1",
    material: "Cement",
    price: 350,
    shop: "Bombay Enterprises",
    address: "Shivaji Chowk, Kolhapur",
  },
  {
    id: "2",
    material: "Cement",
    price: 320,
    shop: "Associated Cement",
    address: "Station Road, Kolhapur",
  },
];

export default function MaterialSearchScreen() {
  const navigation = useNavigation();
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState(DATA);

  const handleSearch = (text) => {
    setQuery(text);
    if (text.trim() === "") {
      setFiltered(DATA);
    } else {
      setFiltered(
        DATA.filter((item) =>
          item.material.toLowerCase().includes(text.toLowerCase())
        )
      );
    }
  };

  const renderCard = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.material}>
        {item.material} - ₹{item.price}
      </Text>
      <Text style={styles.shop}>{item.shop}</Text>
      <Text style={styles.address}>{item.address}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("ShopPage", { shop: item.shop })}
      >
        <Text style={styles.buttonText}>Visit Shop</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Top Navbar */}
      <View style={styles.header}>
        <IconIon name="search" size={28} color="white" />
        <Text style={styles.headerTitle}>Material Prices</Text>
      </View>

      {/* Search Bar */}
      <TextInput
        style={styles.search}
        placeholder="🔍 Search Material (e.g. Cement)"
        placeholderTextColor="#aaa"
        value={query}
        onChangeText={handleSearch}
      />

      {/* Results */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={renderCard}
        ListEmptyComponent={
          <Text style={styles.noResults}>No materials found</Text>
        }
        contentContainerStyle={{ paddingBottom: 80 }}
      />

      {/* Bottom Navbar */}
      <View style={styles.footer}>
        <FooterIcon
          label="Home"
          icon="home"
          onPress={() => navigation.navigate("Home")}
        />
        <FooterIcon
          label="Search"
          icon="search"
          onPress={() => navigation.navigate("MaterialSearch")}
        />
        <FooterIcon
          label="Profile"
          icon="person-outline"
          onPress={() => navigation.navigate("UserProfile")}
        />
      </View>
    </View>
  );
}

const FooterIcon = ({ label, icon, onPress }) => (
  <TouchableOpacity style={{ alignItems: "center" }} onPress={onPress}>
    <IconIon name={icon} size={24} color="#ccc" />
    <Text style={{ color: "#ccc", fontSize: 12 }}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingHorizontal: 16,
    paddingTop: 0,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#1e1e1e",
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    gap: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
  },
  search: {
    backgroundColor: "#111",
    borderWidth: 1,
    borderColor: "#edc767ff",
    borderRadius: 10,
    padding: 12,
    color: "#fff",
    marginVertical: 16,
  },
  card: {
    backgroundColor: "#1a1a1a",
    padding: 16,
    borderRadius: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#eeebe5ff",
  },
  material: {
    fontSize: 18,
    fontWeight: "600",
    color: "#f2b958ff",
  },
  shop: {
    fontSize: 16,
    color: "#fff",
    marginTop: 4,
  },
  address: {
    fontSize: 14,
    color: "#aaa",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#f2b958ff",
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  noResults: {
    textAlign: "center",
    color: "#aaa",
    marginTop: 20,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    height: 60,
    backgroundColor: "#1e1e1e",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#333",
  },
});
