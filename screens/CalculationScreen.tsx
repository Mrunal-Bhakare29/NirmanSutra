import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import IconIon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const CalculationScreen = () => {
  const navigation = useNavigation();

  const [selectedType, setSelectedType] = useState('');
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [heightVal, setHeightVal] = useState('');
  const [thickness, setThickness] = useState('');
  const [count, setCount] = useState('1');
  const [result, setResult] = useState<string | null>(null);

  /* 🔹 Structure-wise input config */
  const inputConfig: any = {
    Wall: ['length', 'width', 'height', 'thickness', 'count'],
    Home: ['length', 'width', 'height', 'thickness', 'count'],
    Slab: ['length', 'width', 'thickness', 'count'],
    Beam: ['length', 'width', 'height', 'count'],
    Column: ['length', 'width', 'height', 'count'],
    Footing: ['length', 'width', 'thickness', 'count'],
    Road: ['length', 'width', 'thickness'],
    Stairs: ['length', 'width'],
    Tank: ['length', 'width', 'height', 'thickness'],
  };

  const getCountLabel = () => {
    if (selectedType === 'Beam') return 'No. of Beams';
    if (selectedType === 'Column') return 'No. of Columns';
    if (selectedType === 'Footing') return 'No. of Footings';
    return 'No. of Floors';
  };

  const inputLabels: any = {
    length: 'Length (m)',
    width: 'Width (m)',
    height: 'Height (m)',
    thickness: 'Thickness (m)',
    count: getCountLabel(),
  };

  /* 🔹 Calculation Logic */
  const handleCalculate = () => {
    const l = parseFloat(length);
    const w = parseFloat(width);
    const h = parseFloat(heightVal);
    const t = parseFloat(thickness);
    const c = parseInt(count || '1');

    let volume = 0;
    let cement = 0;
    let sand = 0;
    let aggregate = 0;
    let steel = 0;
    let bricks = 0;

    switch (selectedType) {
      case 'Wall':
      case 'Home':
        volume = 2 * ((l + w) * h * t) * c;
        bricks = volume * 500;
        cement = volume * 7;
        sand = volume * 0.45;
        break;

      case 'Slab':
        volume = l * w * t * c;
        cement = volume * 8;
        sand = volume * 0.4;
        aggregate = volume * 0.8;
        steel = volume * 90;
        break;

      case 'Beam':
        volume = l * w * h * c;
        cement = volume * 8;
        aggregate = volume * 0.8;
        steel = volume * 120;
        break;

      case 'Column':
        volume = l * w * h * c;
        cement = volume * 8.5;
        aggregate = volume * 0.8;
        steel = volume * 150;
        break;

      case 'Footing':
        volume = l * w * t * c;
        cement = volume * 9;
        aggregate = volume * 0.85;
        steel = volume * 80;
        break;

      case 'Road':
        volume = l * w * t;
        aggregate = volume * 1.2;
        break;

      case 'Stairs':
        volume = l * w * 0.25;
        cement = volume * 8;
        aggregate = volume * 0.8;
        steel = volume * 90;
        break;

      case 'Tank':
        volume = (2 * ((l + w) * h * t)) + (l * w * t);
        cement = volume * 9.5;
        aggregate = volume * 0.85;
        steel = volume * 120;
        break;

      default:
        setResult('Calculation not available.');
        return;
    }

    let output = `🏗️ Structure: ${selectedType}\n\n`;
    output += `📦 Volume: ${volume.toFixed(2)} m³\n\n`;
    output += `Estimated Materials:\n`;

    if (bricks) output += `🧱 Bricks: ${Math.round(bricks)} nos\n`;
    if (cement) output += `🪨 Cement: ${cement.toFixed(1)} bags\n`;
    if (sand) output += `⛏️ Sand: ${sand.toFixed(2)} m³\n`;
    if (aggregate) output += `🪵 Aggregate: ${aggregate.toFixed(2)} m³\n`;
    if (steel) output += `🔩 Steel: ${steel.toFixed(0)} kg\n`;

    output += `\n⚠️ Approximate values for preliminary estimation only.`;

    setResult(output);
  };

  const structureTypes = [
    'Wall', 'Home', 'Slab', 'Beam',
    'Column', 'Footing', 'Road',
    'Stairs', 'Tank',
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>📊</Text>
        <Text style={styles.headerTitle}>Cost Calculation</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        <Text style={styles.sectionTitle}>Select Structure Type</Text>

        <View style={styles.typeGrid}>
          {structureTypes.map(type => (
            <TouchableOpacity
              key={type}
              style={[
                styles.typeBtn,
                selectedType === type && styles.typeBtnActive,
              ]}
              onPress={() => {
                setSelectedType(type);
                setResult(null);
              }}
            >
              <Text
                style={[
                  styles.typeText,
                  selectedType === type && { color: '#000' },
                ]}
              >
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {selectedType !== '' && (
          <View style={styles.card}>
            {inputConfig[selectedType]?.map((field: string) => (
              <TextInput
                key={field}
                placeholder={inputLabels[field]}
                placeholderTextColor="#aaa"
                keyboardType="numeric"
                style={styles.input}
                value={
                  field === 'length' ? length :
                  field === 'width' ? width :
                  field === 'height' ? heightVal :
                  field === 'thickness' ? thickness :
                  count
                }
                onChangeText={(text) => {
                  if (field === 'length') setLength(text);
                  if (field === 'width') setWidth(text);
                  if (field === 'height') setHeightVal(text);
                  if (field === 'thickness') setThickness(text);
                  if (field === 'count') setCount(text);
                }}
              />
            ))}

            <TouchableOpacity style={styles.calcBtn} onPress={handleCalculate}>
              <Text style={styles.calcText}>Calculate</Text>
            </TouchableOpacity>
          </View>
        )}

        {result && (
          <View style={styles.resultCard}>
            <Text style={styles.resultText}>{result}</Text>
          </View>
        )}
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <FooterIcon label="Home" icon="home" onPress={() => navigation.navigate('Home')} />
        <FooterIcon label="Profile" icon="person-outline" onPress={() => navigation.navigate('UserProfile')} />
      </View>
    </View>
  );
};

const FooterIcon = ({ label, icon, onPress }: any) => (
  <TouchableOpacity style={{ alignItems: 'center' }} onPress={onPress}>
    <IconIon name={icon} size={24} color="#ccc" />
    <Text style={{ color: '#ccc', fontSize: 12 }}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#1e1e1e',
  },
  logo: { fontSize: 26, marginRight: 10 },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#fff' },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    margin: 16,
  },
  typeGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 10 },
  typeBtn: {
    backgroundColor: '#1e1e1e',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    margin: 6,
  },
  typeBtnActive: { backgroundColor: '#fbbf24' },
  typeText: { color: '#fbbf24', fontWeight: 'bold' },
  card: {
    backgroundColor: '#1e1e1e',
    margin: 16,
    padding: 16,
    borderRadius: 12,
  },
  input: {
    backgroundColor: '#121212',
    color: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  calcBtn: {
    backgroundColor: '#fbbf24',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  calcText: { color: '#000', fontWeight: 'bold', fontSize: 16 },
  resultCard: {
    backgroundColor: '#1e1e1e',
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 12,
  },
  resultText: { color: '#ccc', lineHeight: 20 },
  footer: {
    position: 'absolute',
    bottom: 0,
    height: 70,
    backgroundColor: '#1e1e1e',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

export default CalculationScreen;
