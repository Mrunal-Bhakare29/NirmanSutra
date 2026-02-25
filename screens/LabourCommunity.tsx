import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";

const labourData = [
  {
    id: "1",
    name: "Ramesh Kumar",
    skill: "Mason",
    rate: 150,
    location: "Karol Bagh",
    status: "Available",
    rating: 4.5,
    reviews: 120,
    image: "https://i.pravatar.cc/100?img=1",
  },
  {
    id: "2",
    name: "Arvind Singh",
    skill: "Painter",
    rate: 160,
    location: "Connaught Place",
    status: "Busy",
    rating: 4.8,
    reviews: 95,
    image: "https://i.pravatar.cc/100?img=2",
  },
  {
    id: "3",
    name: "Sunil Yadav",
    skill: "Electrician",
    rate: 140,
    location: "Laxmi Nagar",
    status: "Available",
    rating: 4.2,
    reviews: 80,
    image: "https://i.pravatar.cc/100?img=3",
  },
  {
  id: "4",
  name: "Vikram Patil",
  skill: "Plumber",
  rate: 130,
  location: "Andheri East",
  status: "Available",
  rating: 4.6,
  reviews: 102,
  image: "https://i.pravatar.cc/100?img=4",
},
{
  id: "5",
  name: "Rahul Sharma",
  skill: "Carpenter",
  rate: 170,
  location: "Borivali",
  status: "Busy",
  rating: 4.3,
  reviews: 87,
  image: "https://i.pravatar.cc/100?img=5",
},
{
  id: "6",
  name: "Mahesh Jadhav",
  skill: "Tile Installer",
  rate: 155,
  location: "Thane",
  status: "Available",
  rating: 4.7,
  reviews: 110,
  image: "https://i.pravatar.cc/100?img=6",
},
{
  id: "7",
  name: "Sandeep More",
  skill: "Welder",
  rate: 180,
  location: "Pune Camp",
  status: "Available",
  rating: 4.4,
  reviews: 76,
  image: "https://i.pravatar.cc/100?img=7",
},
{
  id: "8",
  name: "Imran Sheikh",
  skill: "POP Contractor",
  rate: 160,
  location: "Kurla",
  status: "Busy",
  rating: 4.8,
  reviews: 134,
  image: "https://i.pravatar.cc/100?img=8",
},
{
  id: "9",
  name: "Ajay Deshmukh",
  skill: "Steel Fixer",
  rate: 175,
  location: "Dadar",
  status: "Available",
  rating: 4.5,
  reviews: 99,
  image: "https://i.pravatar.cc/100?img=9",
},
{
  id: "10",
  name: "Ganesh Pawar",
  skill: "Helper",
  rate: 90,
  location: "Kolhapur",
  status: "Available",
  rating: 4.1,
  reviews: 60,
  image: "https://i.pravatar.cc/100?img=10",
}

];

const LabourCard = ({ item }) => (
  <View style={styles.card}>
    <Image source={{ uri: item.image }} style={styles.image} />

    <View style={styles.infoContainer}>
      <View style={styles.topRow}>
        <Text style={styles.name}>{item.name}</Text>
        <View
          style={[
            styles.statusBadge,
            item.status === "Available"
              ? styles.availableBadge
              : styles.busyBadge,
          ]}
        >
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>

      <Text style={styles.skill}>{item.skill}</Text>
      <Text style={styles.rate}>₹ {item.rate} / Hour</Text>
      <Text style={styles.location}>📍 {item.location}</Text>

      <Text style={styles.rating}>
        ⭐ {item.rating} ({item.reviews} Reviews)
      </Text>

      <TouchableOpacity
        style={[
          styles.hireButton,
          item.status === "Busy" && styles.disabledButton,
        ]}
        disabled={item.status === "Busy"}
      >
        <Text style={styles.hireText}>Hire Now</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default function LabourScreen() {
  const [searchText, setSearchText] = useState("");

  const filteredLabour = labourData.filter((item) => {
    const text = searchText.toLowerCase();
    return (
      item.name.toLowerCase().includes(text) ||
      item.skill.toLowerCase().includes(text)
    );
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>👷 Labour Community</Text>

      <TextInput
        placeholder="Search by skill or name..."
        placeholderTextColor="#999"
        value={searchText}
        onChangeText={setSearchText}
        style={styles.searchInput}
      />

      <FlatList
        data={filteredLabour}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <LabourCard item={item} />}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No labour found</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 15,
  },

  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFD54F",
    marginBottom: 15,
  },

  searchInput: {
    backgroundColor: "#1E1E1E",
    padding: 12,
    borderRadius: 12,
    marginBottom: 20,
    color: "#fff",
  },

  card: {
    backgroundColor: "#1E1E1E",
    borderRadius: 18,
    padding: 15,
    marginBottom: 15,
    flexDirection: "row",
    shadowColor: "#FFD54F",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },

  image: {
    width: 80,
    height: 80,
    borderRadius: 15,
  },

  infoContainer: {
    flex: 1,
    marginLeft: 12,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },

  skill: {
    color: "#FFD54F",
    fontWeight: "600",
    marginTop: 3,
  },

  rate: {
    fontSize: 15,
    marginTop: 3,
    color: "#fff",
  },

  location: {
    fontSize: 13,
    color: "#aaa",
    marginTop: 3,
  },

  rating: {
    marginTop: 6,
    fontSize: 13,
    color: "#fff",
  },

  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 10,
  },

  availableBadge: {
    backgroundColor: "#2E7D32",
  },

  busyBadge: {
    backgroundColor: "#C62828",
  },

  statusText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },

  hireButton: {
    marginTop: 10,
    backgroundColor: "#FFD54F",
    paddingVertical: 8,
    borderRadius: 12,
    alignItems: "center",
  },

  disabledButton: {
    backgroundColor: "#555",
  },

  hireText: {
    color: "#000",
    fontWeight: "bold",
  },

  emptyText: {
    textAlign: "center",
    marginTop: 50,
    color: "#aaa",
  },
});
