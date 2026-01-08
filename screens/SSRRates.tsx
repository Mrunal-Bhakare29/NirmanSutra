import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Switch,
} from 'react-native';
import IconFA from 'react-native-vector-icons/FontAwesome5';
import IconIon from 'react-native-vector-icons/Ionicons';
import IconMat from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../ThemeContext'; // ✅ import global theme hook

const HomeScreen = () => {
  const navigation = useNavigation();
  const { theme, themeType, toggleTheme } = useTheme(); // ✅ use context

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Logo Image */}
      <Image
        source={require('../assets/images/nirmansutra-logo.jpg')}
        style={styles.logoImage}
      />
      <Text style={[styles.logo, { color: theme.text }]}>NirmanSutra</Text>
      <Text style={[styles.welcome, { color: theme.text }]}>
        Welcome to NirmanSutra
      </Text>

      {/* Category Buttons Grid */}
      <View style={styles.categoryGrid}>
        <CategoryButton
          icon={<IconFA name="cubes" size={35} color="#ffd666" />}
          label="Materials"
          onPress={() => navigation.navigate('MaterialPrice')}
        />
        <CategoryButton
          icon={<IconFA name="hard-hat" size={35} color="#ffd666" />}
          label="Labor Rates"
          onPress={() => navigation.navigate('LabourRates')}
        />
        <CategoryButton
          icon={<IconFA name="tractor" size={30} color="#ffd666" />}
          label="Machinery"
          onPress={() => navigation.navigate('MachineryRates')}
        />
        
      </View>

      {/* Bottom Navigation */}
        <View style={[styles.bottomNav, { backgroundColor: theme.card }]}>
        <NavItem label="Home" icon={<IconIon name="home" size={25} color="#FBC02D" />} active />
        <TouchableOpacity onPress={() => navigation.navigate('UserProfile')}>
          <NavItem
            label="Profile"
            icon={<IconIon name="person-outline" size={25} color="white" />} active={undefined} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const CategoryButton = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.categoryButton} onPress={onPress}>
    {icon}
    <Text style={styles.categoryLabel}>{label}</Text>
  </TouchableOpacity>
);

const NavItem = ({ label, icon, active }) => (
  <View style={styles.navItem}>
    {icon}
    <Text style={[styles.navLabel, active && { color: '#ffd700' }]}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 80,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 10,
  },
  toggleLabel: {
    marginRight: 10,
    fontSize: 14,
  },
  logoImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 10,
  },
  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  welcome: {
    fontSize: 20,
    marginVertical: 10,
    textAlign: 'center',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    marginTop: 20,
  },
  categoryButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    width: '47%',
    height: 120,
    marginBottom: 20,
  },
  categoryLabel: {
    color: 'wheat',
    fontSize: 20,
    marginTop: 10,
    textAlign: 'center',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
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
    color: 'white',
  },
});

export default HomeScreen;
