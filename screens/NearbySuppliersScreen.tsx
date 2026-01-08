// NearbySuppliersScreen.js
import React, { useEffect, useState } from 'react';
import {
  View, Text, FlatList, ActivityIndicator, StyleSheet,
  PermissionsAndroid, Platform, TouchableOpacity, Image
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Geolocation from 'react-native-geolocation-service';
import { useRoute, useNavigation } from '@react-navigation/native';
import IconIon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Rating } from 'react-native-ratings';

const NearbySuppliersScreen = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const route = useRoute();
  const navigation = useNavigation();
  const { query, useLocation } = route.params || {};
  const [expandedId, setExpandedId] = useState(null);
  const [userRatings, setUserRatings] = useState({});

  const requestLocationPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }
      return true;
    } catch (err) {
      console.warn('Permission error:', err);
      return false;
    }
  };

  const getDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const fetchSuppliers = async () => {
    setLoading(true);
    setError('');
    try {
      let currentLat = null;
      let currentLon = null;

      if (useLocation) {
        const hasPermission = await requestLocationPermission();
        if (!hasPermission) {
          setError('Location permission denied.');
          setLoading(false);
          return;
        }

        const location = await new Promise((resolve, reject) => {
          Geolocation.getCurrentPosition(
            (pos) => resolve(pos),
            (err) => reject(err),
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
          );
        });

        currentLat = location.coords.latitude;
        currentLon = location.coords.longitude;
      }

      const snapshot = await firestore().collection('suppliers').get();
      const results = [];

      snapshot.forEach((doc) => {
        const data = doc.data();
        const matchesQuery =
          query &&
          data.location_name &&
          data.location_name.toLowerCase().includes(query.trim().toLowerCase());

        if (useLocation && currentLat !== null && currentLon !== null) {
          if (data.location?.latitude && data.location?.longitude) {
            const distance = getDistance(
              currentLat,
              currentLon,
              data.location.latitude,
              data.location.longitude
            );
            results.push({ ...data, id: doc.id, distance });
          }
        } else if (matchesQuery || !query) {
          results.push({ ...data, id: doc.id, distance: null });
        }
      });

      results.sort((a, b) => (b.avgRating || 0) - (a.avgRating || 0));
      setSuppliers(results);
      if (results.length === 0) setError('No suppliers found.');
    } catch (err) {
      console.error('Location or Fetch Error:', err);
      setError('Failed to load suppliers. Try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuppliers();
    AsyncStorage.getItem('ratedShops').then((data) => {
      if (data) setUserRatings(JSON.parse(data));
    });
  }, []);

  const rateShop = async (shopId, stars) => {
    if (userRatings[shopId]) return;
    try {
      const shopRef = firestore().collection('suppliers').doc(shopId);
      await firestore().runTransaction(async (transaction) => {
        const doc = await transaction.get(shopRef);
        const data = doc.data();
        const newTotal = (data.totalRating || 0) + stars;
        const newCount = (data.ratingCount || 0) + 1;
        const newAvg = newTotal / newCount;
        transaction.update(shopRef, {
          totalRating: newTotal,
          ratingCount: newCount,
          avgRating: newAvg,
        });
      });
      const updatedRatings = { ...userRatings, [shopId]: stars };
      setUserRatings(updatedRatings);
      await AsyncStorage.setItem('ratedShops', JSON.stringify(updatedRatings));
      fetchSuppliers();
    } catch (error) {
      console.error('Rating error:', error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#121212' }}>
      {/* Header (same style as LabourRatesScreen) */}
      <View style={styles.header}>
        <Text style={styles.logo}>🏢</Text>
        <Text style={styles.title}>Nearby Suppliers</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#fbbf24" style={{ marginTop: 20 }} />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <FlatList
          contentContainerStyle={{ padding: 16, paddingBottom: 80 }}
          data={suppliers}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.name}>🏪 {item.shopName}</Text>
              <Text style={styles.details}>📍 {item.address}</Text>
              <Text style={styles.details}>📞 {item.contact}</Text>
              {item.distance !== null && (
                <Text style={styles.details}>📏 {item.distance.toFixed(1)} km away</Text>
              )}
              <View style={{ marginTop: 6, alignItems: 'center' }}>
                <Rating
                  type="star"
                  readonly
                  startingValue={item.avgRating || 0}
                  imageSize={20}
                  tintColor="#1e1e1e"
                  ratingBackgroundColor="#444"
                />
                <Text style={{ color: '#ccc', fontSize: 12 }}>
                  {item.avgRating?.toFixed(1) || '0.0'} / 5
                </Text>
              </View>
              {expandedId === item.id && (
                <>
                  <Text style={styles.materials}>
                    {item.materials?.map((m) => `${getIconForMaterial(m)} ${m}`).join('  ')}
                  </Text>
                  {!userRatings[item.id] && (
                    <Rating
                      type="star"
                      startingValue={0}
                      imageSize={28}
                      onFinishRating={(rating) => rateShop(item.id, Math.round(rating))}
                      style={{ marginTop: 10 }}
                      tintColor="#1e1e1e"
                      ratingBackgroundColor="#333"
                    />
                  )}
                  {userRatings[item.id] && (
                    <Text style={styles.details}>You rated: {userRatings[item.id]}⭐</Text>
                  )}
                </>
              )}
              <TouchableOpacity
                style={styles.button}
                onPress={() => setExpandedId(expandedId === item.id ? null : item.id)}
              >
                <Text style={styles.buttonText}>
                  {expandedId === item.id ? 'Hide Materials' : 'View More'}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      {/* Footer (same style as LabourRatesScreen) */}
      <View style={styles.footer}>
        <FooterIcon label="Home" icon="home" onPress={() => navigation.navigate('Home')} />
        <FooterIcon label="Profile" icon="person-outline" onPress={() => navigation.navigate('UserProfile')} />
      </View>
    </View>
  );
};

const getIconForMaterial = (material) => {
  const name = material.toLowerCase();
  if (name.includes('cement')) return '🧱';
  if (name.includes('sand')) return '🏖️';
  if (name.includes('steel')) return '🔩';
  if (name.includes('brick')) return '🧱';
  if (name.includes('tiles')) return '🪵';
  if (name.includes('granite')) return '🪨';
  if (name.includes('wood')) return '🪵';
  if (name.includes('paint')) return '🎨';
  if (name.includes('pipe')) return '🚰';
  if (name.includes('glass')) return '🧊';
  return '📦';
};

const FooterIcon = ({ label, icon, active, onPress }) => (
  <TouchableOpacity style={{ alignItems: 'center' }} onPress={onPress}>
    <IconIon name={icon} size={24} color={active ? '#fbbf24' : '#ccc'} />
    <Text style={{ color: active ? '#fbbf24' : '#ccc', fontSize: 12 }}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#1e1e1e',
  },
  logo: {
    fontSize: 28,
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  card: {
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  name: { fontSize: 18, fontWeight: 'bold', color: '#dfc205ff' },
  details: { color: '#ccc', fontSize: 14, marginTop: 4 },
  materials: { color: '#ddd', fontSize: 14, marginTop: 10 },
  button: {
    backgroundColor: '#f7d171ff', marginTop: 10, padding: 10, borderRadius: 8,
  },
  buttonText: {
    textAlign: 'center', fontWeight: 'bold', color: '#1e1e1e',
  },
  error: { color: 'red', textAlign: 'center', marginTop: 20 },
  footer: {
    position: 'absolute',
    bottom: 0,
    height: 60,
    backgroundColor: '#1e1e1e',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

export default NearbySuppliersScreen;
