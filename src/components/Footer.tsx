import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import IconIon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../context/ThemeContext';
import { useNavigation } from '@react-navigation/native';

const Footer = () => {
  const { isDarkTheme } = useTheme();
  const navigation = useNavigation();

  const bgColor = isDarkTheme ? '#1a1a1a' : '#e0e0e0';
  const activeColor = '#ffd700';
  const inactiveColor = isDarkTheme ? '#fff' : '#000';

  return (
    <View style={[styles.footer, { backgroundColor: bgColor }]}>
      <FooterItem
        label="Home"
        icon="home"
        color={activeColor}
        onPress={() => navigation.navigate('Home')}
      />
      <FooterItem
        label="Explore"
        icon="search"
        color={inactiveColor}
        onPress={() => navigation.navigate('Explore')} // Make sure this screen exists
      />
      <FooterItem
        label="Profile"
        icon="person-outline"
        color={inactiveColor}
        onPress={() => navigation.navigate('Profile')} // Make sure this screen exists
      />
    </View>
  );
};

const FooterItem = ({ label, icon, color, onPress }) => (
  <TouchableOpacity style={styles.item} onPress={onPress}>
    <IconIon name={icon} size={22} color={color} />
    <Text style={[styles.label, { color }]}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  footer: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 0.5,
    borderColor: '#444',
    marginTop: 320,
  },
  item: {
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    marginTop: 2,
  },
});

export default Footer;
