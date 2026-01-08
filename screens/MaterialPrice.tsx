import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import IconIon from 'react-native-vector-icons/Ionicons';
import Papa from 'papaparse';
import { useNavigation } from '@react-navigation/native';

interface Material {
  Description: string;
  Unit: string;
  'Rate (Excl. GST)': string;
}

const NavItem = ({
  label,
  iconName,
  active,
  onPress,
}: {
  label: string;
  iconName: string;
  active: boolean;
  onPress: () => void;
}) => {
  const color = active ? '#ffd700' : '#888';
  return (
    <TouchableOpacity style={styles.navItem} onPress={onPress}>
      <IconIon name={iconName} size={22} color={color} />
      <Text style={[styles.navLabel, { color }]}>{label}</Text>
    </TouchableOpacity>
  );
};

export default function MaterialPrice() {
  const [searchText, setSearchText] = useState('');
  const [activeTab, setActiveTab] = useState('Home');
  const [materials, setMaterials] = useState<Material[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    const loadCSV = async () => {
      try {
        // 🔹 Fetch CSV from GitHub repo (raw link)
        const response = await fetch(
          'https://raw.githubusercontent.com/NirmanSutra/nirman-data/main/materials.csv'
        );
        const csv = await response.text();

        const parsed = Papa.parse<Material>(csv, {
          header: true,
          skipEmptyLines: true,
        });

        setMaterials(parsed.data);
      } catch (err) {
        console.error('Error fetching CSV from GitHub:', err);
      }
    };

    loadCSV();
  }, []);

  const filteredMaterials = materials.filter((m) =>
    m.Description.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#121212' }}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require('../assets/images/nirmansutra-logo.jpg')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.headerText}>Material Rates</Text>
      </View>

      {/* Search & Filter Row */}
      <View style={styles.searchRow}>
        <TextInput
          placeholder="Search Materials"
          placeholderTextColor="#999"
          style={styles.searchInput}
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Filter</Text>
        </TouchableOpacity>
      </View>

      {/* Material Cards */}
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        {filteredMaterials.map((material, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.materialName}>{material.Description}</Text>
            <Text style={styles.quantity}>Unit: {material.Unit}</Text>
            <View style={styles.rateRow}>
              <Text style={styles.label}>SSR Rate</Text>
              <Text style={styles.value}>₹ {material['Rate (Excl. GST)']}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <NavItem
          label="Home"
          iconName="home"
          active={activeTab === 'Home'}
          onPress={() => {
            setActiveTab('Home');
            navigation.navigate('Home' as never);
          }}
        />
        <NavItem
          label="Profile"
          iconName="person-outline"
          active={activeTab === 'Profile'}
          onPress={() => {
            setActiveTab('Profile');
            navigation.navigate('UserProfile' as never);
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 20,
    paddingLeft: 20,
    paddingBottom: 16,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#1e1e1e',
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#F5F5DC',
  },
  searchRow: {
    flexDirection: 'row',
    margin: 16,
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    color: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 8,
  },
  filterButton: {
    backgroundColor: '#fbbf24',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  filterText: {
    color: '#000',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
  },
  materialName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fbbf24',
  },
  quantity: {
    color: '#d1d5db',
    marginBottom: 8,
  },
  rateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2,
  },
  label: {
    color: '#d1d5db',
  },
  value: {
    color: '#fbbf24',
    fontWeight: '600',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: '#1e1e1e',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  navItem: {
    alignItems: 'center',
  },
  navLabel: {
    fontSize: 12,
    marginTop: 2,
  },
});
