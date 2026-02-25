import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Rating } from 'react-native-ratings';

const SupplierDetailsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { supplier } = route.params || {};

  // Static Materials (for now)
  const materials = [
    { name: 'UltraTech Cement', price: '₹ 380 / Bag', stock: 'In Stock', updated: 'Just now' },
    { name: 'ACC Cement', price: '₹ 375 / Bag', stock: 'In Stock', updated: '10 min ago' },
    { name: 'Ambuja Cement', price: '₹ 372 / Bag', stock: 'Low Stock', updated: '30 min ago' },
    { name: 'TMT Steel Bars 8mm', price: '₹ 52 / Kg', stock: 'In Stock', updated: '1 hr ago' },
    { name: 'TMT Steel Bars 10mm', price: '₹ 54 / Kg', stock: 'In Stock', updated: '2 hr ago' },
    { name: 'AAC Blocks', price: '₹ 45 / Piece', stock: 'In Stock', updated: '1 day ago' },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: '#121212' }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Supplier Details</Text>
        </View>

        {/* Supplier Info */}
        <View style={styles.profileCard}>
          <Text style={styles.shopName}>🏪 {supplier?.shopName || 'Sharma Traders'}</Text>
          <Text style={styles.info}>📍 {supplier?.address || 'Karol Bagh, Delhi'}</Text>
          <Text style={styles.info}>📞 {supplier?.contact || '9876543210'}</Text>

          <View style={{ marginTop: 8 }}>
            <Rating
              type="star"
              readonly
              startingValue={supplier?.avgRating || 4.2}
              imageSize={20}
              tintColor="#1e1e1e"
            />
            <Text style={{ color: '#ccc', fontSize: 12 }}>
              {(supplier?.avgRating || 4.2).toFixed(1)} / 5
            </Text>
          </View>
        </View>

        {/* My Materials Section */}
        <Text style={styles.sectionTitle}>My Materials</Text>

        {materials.map((item, index) => (
          <View key={index} style={styles.card}>
            <View style={{ flex: 1 }}>
              <Text style={styles.materialName}>{item.name}</Text>
              <Text style={styles.price}>{item.price}</Text>
              <Text style={styles.updated}>Last Updated: {item.updated}</Text>
            </View>

            <View
              style={[
                styles.stockBadge,
                item.stock === 'Low Stock'
                  ? styles.lowStock
                  : styles.inStock,
              ]}
            >
              <Text style={styles.stockText}>{item.stock}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={{ color: '#1e1e1e', fontWeight: 'bold' }}>
          Back
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SupplierDetailsScreen;

const styles = StyleSheet.create({
  header: {
    padding: 16,
    backgroundColor: '#1e1e1e',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  profileCard: {
    backgroundColor: '#1e1e1e',
    margin: 16,
    padding: 16,
    borderRadius: 12,
  },
  shopName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fbbf24',
  },
  info: {
    color: '#ccc',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginHorizontal: 16,
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#1e1e1e',
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  materialName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  price: {
    fontSize: 14,
    color: '#ccc',
    marginTop: 4,
  },
  updated: {
    fontSize: 12,
    color: '#777',
    marginTop: 4,
  },
  stockBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  inStock: {
    backgroundColor: '#16a34a',
  },
  lowStock: {
    backgroundColor: '#f59e0b',
  },
  stockText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: '#fbbf24',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 30,
  },
});
