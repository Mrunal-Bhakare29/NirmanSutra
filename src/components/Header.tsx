import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const Header = () => {
  const { isDarkTheme } = useTheme();

  return (
    <View style={[styles.header, { backgroundColor: isDarkTheme ? '#1e1e1e' : '#f0f0f0' }]}>
      <Image
        source={require('../../assets/images/nirmansutra-logo.jpg')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={[styles.title, { color: isDarkTheme ? '#fff' : '#000' }]}>
        NirmanSutra
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: 20,
    paddingBottom: 16,
    paddingHorizontal: 5,
    alignItems: 'center',
    flexDirection: 'row',
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
  },
});

export default Header;
