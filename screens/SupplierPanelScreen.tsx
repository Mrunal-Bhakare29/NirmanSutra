import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from "react-native";

const materials = [
  { id: 1, name: "UltraTech Cement", price: 380, unit: "Bag", stock: "In Stock", time: "Just now" },
  { id: 2, name: "ACC Cement", price: 375, unit: "Bag", stock: "In Stock", time: "10 min ago" },
  { id: 3, name: "Ambuja Cement", price: 372, unit: "Bag", stock: "Low Stock", time: "30 min ago" },
  { id: 4, name: "TMT Steel Bars 8mm", price: 52, unit: "Kg", stock: "In Stock", time: "1 hr ago" },
  { id: 5, name: "TMT Steel Bars 10mm", price: 54, unit: "Kg", stock: "In Stock", time: "2 hr ago" },
  { id: 6, name: "AAC Blocks", price: 45, unit: "Piece", stock: "In Stock", time: "1 day ago" },
  { id: 7, name: "Red Bricks", price: 8, unit: "Piece", stock: "In Stock", time: "Today" },
  { id: 8, name: "River Sand", price: 4200, unit: "Brass", stock: "Low Stock", time: "Today" },
  { id: 9, name: "M-Sand", price: 3800, unit: "Brass", stock: "In Stock", time: "Today" },
  { id: 10, name: "20mm Aggregate", price: 3200, unit: "Brass", stock: "In Stock", time: "Today" },
  { id: 11, name: "Waterproofing Chemical", price: 210, unit: "Litre", stock: "In Stock", time: "Today" },
  { id: 12, name: "CPVC Pipe", price: 180, unit: "Meter", stock: "In Stock", time: "Today" },
  { id: 13, name: "PVC Pipe", price: 120, unit: "Meter", stock: "In Stock", time: "Today" },
  { id: 14, name: "Wall Putty", price: 32, unit: "Kg", stock: "Low Stock", time: "Today" },
  { id: 15, name: "Primer", price: 145, unit: "Litre", stock: "In Stock", time: "Today" },
  { id: 16, name: "Interior Paint", price: 310, unit: "Litre", stock: "In Stock", time: "Today" },
  { id: 17, name: "Exterior Paint", price: 360, unit: "Litre", stock: "In Stock", time: "Today" },
  { id: 18, name: "Plywood 12mm", price: 95, unit: "Sqft", stock: "In Stock", time: "Today" },
];

export default function SupplierDashboard() {
  return (
    <ScrollView style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>Welcome, Patil Traders</Text>
        <Text style={styles.location}>Kolhapur</Text>
      </View>

      {/* SUMMARY CARDS */}
      <View style={styles.summaryRow}>
        <View style={[styles.summaryCard, { backgroundColor: "#1f9d55" }]}>
          <Text style={styles.summaryTitle}>Total Materials</Text>
          <Text style={styles.summaryValue}>{materials.length} Items</Text>
        </View>

        <View style={[styles.summaryCard, { backgroundColor: "#2563eb" }]}>
          <Text style={styles.summaryTitle}>Pending Orders</Text>
          <Text style={styles.summaryValue}>5 Orders</Text>
        </View>
      </View>

      {/* ACTION BUTTONS */}
      <View style={styles.actionRow}>
        <ActionButton title="Add New Material" />
        <ActionButton title="Update Rates" />
      </View>

      <View style={styles.actionRow}>
        <ActionButton title="Manage Stock" />
        <ActionButton title="Order Requests" />
      </View>

      {/* MATERIAL LIST */}
      <Text style={styles.sectionTitle}>My Materials</Text>

      {materials.map(item => (
        <View key={item.id} style={styles.card}>
          <View style={{ flex: 1 }}>
            <Text style={styles.materialName}>{item.name}</Text>
            <Text style={styles.price}>₹ {item.price} / {item.unit}</Text>
            <Text style={styles.time}>Last Updated: {item.time}</Text>
          </View>

          <View style={[
            styles.stockBadge,
            item.stock === "In Stock" ? styles.inStock : styles.lowStock
          ]}>
            <Text style={styles.stockText}>{item.stock}</Text>
          </View>
        </View>
      ))}

      {/* HISTORY */}
      <Text style={styles.sectionTitle}>Price Change History</Text>

      <View style={styles.historyCard}>
        <Text style={styles.historyDate}>Apr 24, 2024</Text>
        <Text style={styles.historyText}>
          Cement price updated from ₹370 → ₹380
        </Text>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const ActionButton = ({ title }) => (
  <TouchableOpacity style={styles.actionBtn}>
    <Text style={styles.actionText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f4f6f8", padding: 15 },

  header: { marginBottom: 20 },
  title: { fontSize: 22, fontWeight: "bold" },
  location: { color: "gray" },

  summaryRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 15 },

  summaryCard: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 5
  },

  summaryTitle: { color: "white", fontSize: 14 },
  summaryValue: { color: "white", fontSize: 20, fontWeight: "bold", marginTop: 5 },

  actionRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },

  actionBtn: {
    flex: 1,
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 5,
    elevation: 2
  },

  actionText: { fontWeight: "bold" },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 15
  },

  card: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
    alignItems: "center"
  },

  materialName: { fontSize: 16, fontWeight: "bold" },
  price: { fontSize: 15, marginTop: 5 },
  time: { color: "gray", marginTop: 5 },

  stockBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8
  },

  inStock: { backgroundColor: "#1f9d55" },
  lowStock: { backgroundColor: "#f59e0b" },
  stockText: { color: "white", fontWeight: "bold" },

  historyCard: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    elevation: 2
  },

  historyDate: { fontWeight: "bold", marginBottom: 5 },
  historyText: { color: "#333" }
});