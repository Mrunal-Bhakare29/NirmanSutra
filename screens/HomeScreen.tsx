import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import IconFA from 'react-native-vector-icons/FontAwesome5';
import IconIon from 'react-native-vector-icons/Ionicons';
import IconMat from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../ThemeContext';

const HomeScreen = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>

      {/* Top Header */}
      <View style={[styles.topHeader, { backgroundColor: theme.card }]}>
        <Image
          source={require('../assets/images/nirmansutra-logo.jpg')}
          style={styles.headerLogo}
        />
        <Text style={[styles.headerTitle, { color: theme.text }]}>
          NirmanSutra
        </Text>
      </View>

      {/* Welcome Text */}
      <Text style={[styles.welcome, { color: theme.text }]}>
        Welcome to NirmanSutra
      </Text>

      {/* Category Buttons Grid */}
      <View style={styles.categoryGrid}>
        <CategoryButton
          icon={<IconMat name="map" size={35} color="#ffd666" />}
          label="SSRRates"
          onPress={() => navigation.navigate('SSRRates')}
        />

        <CategoryButton
          icon={<IconFA name="calculator" size={30} color="#ffd666" />}
          label="Brandwise Rates"
          onPress={() => navigation.navigate("BrandWiseMaterial")}
        />

        <CategoryButton
          icon={<IconIon name="location-sharp" size={35} color="#ffd666" />}
          label="Nearby Suppliers"
          onPress={() => navigation.navigate('SearchSupplier')}
        />

        <CategoryButton
          icon={<IconMat name="public" size={35} color="#ffd666" />}
          label="State Wise SSR"
          onPress={() => navigation.navigate('StateSSR')}
        />

        <CategoryButton
          icon={<IconIon name="chatbubble-ellipses" size={35} color="#ffd666" />}
          label="Chatbot"
          onPress={() => navigation.navigate('ChatbotScreen')}
        />

        <CategoryButton
          icon={<IconIon name="calculator" size={35} color="#ffd666" />}
          label="Calculation"
          onPress={() => navigation.navigate('CalculationScreen')}
        />

        <CategoryButton
          icon={<IconIon name="storefront" size={35} color="#ffd666" />}
          label="Market Place"
          onPress={() => navigation.navigate('ExcessMarketplaceScreen')}
        />

        <CategoryButton
          icon={<IconIon name="people" size={35} color="#ffd666" />}
          label="Labour Community"
          onPress={() => navigation.navigate('LabourCommunity')}
        />

        <CategoryButton
          icon={<IconIon name="business" size={35} color="#ffd666" />}
          label="Supplier Panel"
          onPress={() => navigation.navigate('SupplierPanelScreen')}
        />
      </View>

      {/* Bottom Navigation */}
      <View style={[styles.bottomNav, { backgroundColor: theme.card }]}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <NavItem
            label="Home"
            icon={<IconIon name="home" size={25} color="#FBC02D" />}
            active
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('SearchMaterial')}>
          <NavItem
            label="Search"
            icon={<IconIon name="search" size={25} color="white" />}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('UserProfile')}>
          <NavItem
            label="Profile"
            icon={<IconIon name="person-outline" size={25} color="white" />}
          />
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
    <Text style={[styles.navLabel, active && { color: '#ffd700' }]}>
      {label}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 80,
  },

  /* Header */
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft:20,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 5,
  },

  headerLogo: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginRight: 10,
  },

  headerTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    marginRight:50,
  },

  welcome: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 10,
  },

  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingBottom: 100,
  },

  categoryButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    backgroundColor: '#1a1a1a',
    borderRadius: 15,
    width: '30%',
    height: 120,
    marginBottom: 20,
  },

  categoryLabel: {
    color: 'wheat',
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },

  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
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
