import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

export default function SellMaterialScreen({ navigation }) {
    const [activeTab, setActiveTab] = useState("sell");

  return (
    <ScrollView style={styles.container}>
      {/* Navbar */}
      <View style={styles.tabs}>
        <TouchableOpacity
          onPress={() => {
            setActiveTab("ExcessMarketplaceScreen");
            navigation.navigate("ExcessMarketplaceScreen");
          }}
        >
          <Text style={styles.tab}>Buy Material</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.activeTab}>Sell Material</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setActiveTab("my");
            navigation.navigate("MyListing");
          }}
        >
          <Text style={styles.tab}>My Listings</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.header}>Sell Excess Material</Text>

      <TextInput style={styles.input} placeholder="Material Name" placeholderTextColor="#888" />
      <TextInput style={styles.input} placeholder="Brand" placeholderTextColor="#888" />
      <TextInput style={styles.input} placeholder="Quantity" placeholderTextColor="#888" />
      <TextInput style={styles.input} placeholder="Unit" placeholderTextColor="#888" />
      <TextInput style={styles.input} placeholder="Expected Price" placeholderTextColor="#888" />
      <TextInput style={styles.input} placeholder="Condition" placeholderTextColor="#888" />
      <TextInput style={styles.input} placeholder="Location" placeholderTextColor="#888" />

      <TouchableOpacity style={styles.submitBtn}>
        <Text style={styles.submitText}>Submit Listing</Text>
      </TouchableOpacity>
    </ScrollView>
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
