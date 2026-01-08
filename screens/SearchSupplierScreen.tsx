import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Keyboard,
} from 'react-native';
import IconIon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';

const LOCATIONS = [
  'Shivaji Park', 'Nehru Nagar', 'Gandhi Nagar', 'Mangalwar Peth', 'Kasaba Bawada',
  'Uttareshwar Peth', 'Tarabai Park', 'Rajarampuri', 'Laxmipuri', 'Shahupuri',
  'New Shahupuri', 'Line Bazaar', 'Shivaji Udyamnagar', 'Shahuwadi', 'Karveer',
  'Ichalkaranji', 'Gadhinglaj', 'Ajara', 'Chandgad', 'Hatkanangale', 'Radhanagari',
  'Bhudargad', 'Kagal', 'Panhala'
];

const FooterIcon = ({ label, icon, active, onPress }) => (
  <TouchableOpacity style={{ alignItems: 'center' }} onPress={onPress}>
    <IconIon name={icon} size={24} color={active ? '#fbbf24' : '#ccc'} />
    <Text style={{ color: active ? '#fbbf24' : '#ccc', fontSize: 12 }}>{label}</Text>
  </TouchableOpacity>
);

const SearchSuppliersScreen = () => {
  const [query, setQuery] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    loadHistory();
  }, []);

  useEffect(() => {
    const trimmed = query.trim().toLowerCase();
    if (trimmed) {
      const matches = LOCATIONS.filter(loc =>
        loc.toLowerCase().includes(trimmed)
      );
      setFilteredSuggestions(matches);
    } else {
      setFilteredSuggestions([]);
    }
  }, [query]);

  const storeSearchHistory = async (item: string) => {
    try {
      const updated = [item, ...history.filter(h => h !== item)].slice(0, 5);
      await AsyncStorage.setItem('search_history', JSON.stringify(updated));
      setHistory(updated);
    } catch (err) {
      console.error('Error storing search history', err);
    }
  };

  const loadHistory = async () => {
    try {
      const saved = await AsyncStorage.getItem('search_history');
      if (saved) setHistory(JSON.parse(saved));
    } catch (err) {
      console.error('Error loading history', err);
    }
  };

  const clearHistory = async () => {
    try {
      await AsyncStorage.removeItem('search_history');
      setHistory([]);
    } catch (err) {
      console.error('Error clearing history', err);
    }
  };

  const handleSearch = (term: string) => {
    const trimmed = term.trim();
    if (trimmed) {
      storeSearchHistory(trimmed);
      navigation.navigate('NearbySuppliers', { query: trimmed });
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#121212' }}>

      {/* Header (same style as LabourRatesScreen) */}
      <View style={styles.header}>
        <Text style={styles.logo}>🏗️</Text>
        <Text style={styles.title}>Search Suppliers</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchRow}>
        <TextInput
          placeholder="Search area or material"
          placeholderTextColor="#999"
          style={styles.searchInput}
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={() => {
            handleSearch(query);
            Keyboard.dismiss();
          }}
        />
        <TouchableOpacity style={styles.searchBtn} onPress={() => handleSearch(query)}>
          <Text style={{ color: '#000', fontWeight: 'bold' }}>Search</Text>
        </TouchableOpacity>
      </View>

      {/* Use My Location */}
      <TouchableOpacity
        style={styles.useLocation}
        onPress={() => navigation.navigate('NearbySuppliers', { useLocation: true })}
      >
        <Text style={styles.useLocationText}>📍 Use my location</Text>
      </TouchableOpacity>

      {/* Suggestions & History */}
      <ScrollView style={{ paddingHorizontal: 16 }}>
        {filteredSuggestions.length > 0 && (
          <>
            <Text style={styles.sectionLabel}>Suggestions</Text>
            {filteredSuggestions.map((item, idx) => (
              <TouchableOpacity key={idx} onPress={() => handleSearch(item)}>
                <Text style={styles.suggestion}>{item}</Text>
              </TouchableOpacity>
            ))}
          </>
        )}

        {history.length > 0 && (
          <>
            <View style={styles.historyHeader}>
              <Text style={styles.sectionLabel}>Recent Searches</Text>
              <TouchableOpacity onPress={clearHistory}>
                <Text style={styles.clearText}>Clear</Text>
              </TouchableOpacity>
            </View>
            {history.map((item, idx) => (
              <TouchableOpacity key={idx} onPress={() => handleSearch(item)}>
                <Text style={styles.suggestion}>{item}</Text>
              </TouchableOpacity>
            ))}
          </>
        )}
      </ScrollView>

      {/* Footer (same as LabourRatesScreen) */}
      <View style={styles.footer}>
        <FooterIcon
          label="Home"
          icon="home"
          active={route.name === 'Home'}
          onPress={() => navigation.navigate('Home')}
        />
        <FooterIcon
          label="Profile"
          icon="person-outline"
          active={route.name === 'UserProfile'}
          onPress={() => navigation.navigate('UserProfile')}
        />
      </View>
    </View>
  );
};

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
  searchRow: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    color: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    marginRight: 8,
  },
  searchBtn: {
    backgroundColor: '#fbbf24',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  useLocation: {
    padding: 16,
    marginHorizontal: 16,
    backgroundColor: '#1e1e1e',
    borderRadius: 10,
    marginBottom: 8,
  },
  useLocationText: {
    color: '#f87171',
    fontWeight: 'bold',
    fontSize: 16,
  },
  sectionLabel: {
    color: '#fbbf24',
    fontSize: 16,
    fontWeight: '600',
  },
  suggestion: {
    color: '#e5e5e5',
    backgroundColor: '#2a2a2a',
    padding: 10,
    borderRadius: 8,
    marginBottom: 6,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 18,
    marginBottom: 10,
  },
  clearText: {
    color: '#f87171',
    fontSize: 14,
    fontWeight: 'bold',
  },
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

export default SearchSuppliersScreen;
