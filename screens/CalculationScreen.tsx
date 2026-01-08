import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  TextInput, ScrollView, Image
} from 'react-native';
import IconIon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../ThemeContext';
import { useNavigation } from '@react-navigation/native';

const CalculationScreen = () => {
  const { theme, themeType } = useTheme();
  const navigation = useNavigation();
  const isDark = themeType === 'dark';

  const [selectedType, setSelectedType] = useState('');
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [heightVal, setHeightVal] = useState('');
  const [thickness, setThickness] = useState('');
  const [floors, setFloors] = useState('1');
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const l = parseFloat(length);
    const w = parseFloat(width);
    const h = parseFloat(heightVal);
    const t = parseFloat(thickness);
    const f = parseInt(floors);

    if (!l || !w || !h || !t || !f || f <= 0) {
      setResult('Please enter valid dimensions.');
      return;
    }

    const wallVolume = 2 * ((l + w) * h * t) * f;
    const floorArea = l * w * f;

    let output = `🏗️ Structure Type: ${selectedType}\n`;
    output += `📐 Wall Volume: ${wallVolume.toFixed(2)} m³\n🧮 Floor Area: ${floorArea.toFixed(2)} m²\n\nEstimated Material Requirements:\n`;
    output += `🧱 Bricks: ${Math.round(wallVolume * 500)} nos\n`;
    output += `🪨 Cement: ${(wallVolume * 7).toFixed(1)} bags\n`;
    output += `⛏️ Sand: ${(wallVolume * 0.45).toFixed(2)} m³\n`;
    output += `🪵 Aggregate: ${(wallVolume * 0.9).toFixed(2)} m³\n`;
    output += `🔩 Steel: ${(wallVolume * 80).toFixed(0)} kg`;

    setResult(output);
  };

  const structureTypes = ['Slab', 'Beam', 'Column', 'Footing', 'Wall', 'Home', 'Road', 'Stairs', 'Tank', 'Other'];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.card }]}>
        <Image source={require('../assets/images/nirmansutra-logo.jpg')} style={styles.logo} />
        <Text style={[styles.titleHeader, { color: theme.text }]}>NirmanSutra</Text>
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={[styles.title, { color: theme.text }]}>Select Structure Type</Text>

        <View style={styles.buttonRow}>
          {structureTypes.map((type) => (
            <TouchableOpacity
              key={type}
              style={[styles.optionButton, selectedType === type && styles.activeOption]}
              onPress={() => setSelectedType(type)}
            >
              <Text style={styles.optionText}>{type}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {selectedType !== '' && (
          <View style={styles.formContainer}>
            <TextInput style={[styles.input, { backgroundColor: theme.card, color: theme.text }]} placeholder="Length (m)" keyboardType="numeric" value={length} onChangeText={setLength} placeholderTextColor="#aaa" />
            <TextInput style={[styles.input, { backgroundColor: theme.card, color: theme.text }]} placeholder="Width (m)" keyboardType="numeric" value={width} onChangeText={setWidth} placeholderTextColor="#aaa" />
            <TextInput style={[styles.input, { backgroundColor: theme.card, color: theme.text }]} placeholder="Height (m)" keyboardType="numeric" value={heightVal} onChangeText={setHeightVal} placeholderTextColor="#aaa" />
            <TextInput style={[styles.input, { backgroundColor: theme.card, color: theme.text }]} placeholder="Wall Thickness (m)" keyboardType="numeric" value={thickness} onChangeText={setThickness} placeholderTextColor="#aaa" />
            <TextInput style={[styles.input, { backgroundColor: theme.card, color: theme.text }]} placeholder="No. of Floors" keyboardType="numeric" value={floors} onChangeText={setFloors} placeholderTextColor="#aaa" />

            <TouchableOpacity style={styles.calcButton} onPress={handleCalculate}>
              <Text style={styles.calcButtonText}>📊 Calculate</Text>
            </TouchableOpacity>

            {result && (
              <View style={[styles.resultBox, { backgroundColor: isDark ? '#1a1a1a' : '#f0f0f0' }]}>
                <Text style={[styles.resultText, { color: theme.text }]}>{result}</Text>
              </View>
            )}
          </View>
        )}
      </ScrollView>

      {/* Footer Navigation */}
      <View style={[styles.bottomNav, { backgroundColor: theme.card }]}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <NavItem
            label="Home"
            icon={<IconIon name="home" size={25} color="#ffd699" />}
            active={false}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <NavItem
            label="Explore"
            icon={<IconIon name="search" size={25} color="#ffd699" />}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('UserProfile')}>
          <NavItem
            label="Profile"
            icon={<IconIon name="person-outline" size={25} color="#ffd699" />}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const NavItem = ({ label, icon, active }) => (
  <View style={styles.navItem}>
    {icon}
    <Text style={[styles.navLabel, active && { color: '#ffd700' }]}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 70,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    justifyContent: 'space-between',
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  titleHeader: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: '#2c2c2c',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    margin: 6,
    minWidth: '40%',
    alignItems: 'center',
  },
  activeOption: {
    borderWidth: 1.5,
    borderColor: '#ffd700',
  },
  optionText: {
    color: '#ffd700',
    fontWeight: 'bold',
  },
  formContainer: {
    marginTop: 10,
  },
  input: {
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
  },
  calcButton: {
    backgroundColor: '#ffd700',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  calcButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  resultBox: {
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
  },
  resultText: {
    fontSize: 14,
    lineHeight: 20,
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
    color: '#ccc',
  },
});

export default CalculationScreen;
