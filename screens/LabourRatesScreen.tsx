import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
import IconIon from 'react-native-vector-icons/Ionicons';
import Papa from 'papaparse';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native'; // ✅ Added

const csvURL =
    'https://raw.githubusercontent.com/NirmanSutra/nirman-data/main/LABOUR-RATES.csv';

const LabourRatesScreen = () => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const navigation = useNavigation(); // ✅ Added

    useEffect(() => {
        fetchCSV();
    }, []);

    const fetchCSV = async () => {
        try {
            const response = await axios.get(csvURL);
            Papa.parse(response.data, {
                header: true,
                skipEmptyLines: true,
                transformHeader: (header) => header.trim(),
                transform: (value) => value.trim(),
                complete: (results: any) => {
                    setData(results.data);
                    setLoading(false);
                },
            });
        } catch (error) {
            console.error('Error fetching Labour CSV:', error);
            setLoading(false);
        }
    };

    const filteredData = data.filter(item =>
        item['Description of Labour']?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <View style={{ flex: 1, backgroundColor: '#121212' }}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.logo}>👷</Text>
                <Text style={styles.title}>Labour Rates</Text>
            </View>

            {/* Search Bar */}
            <View style={styles.searchRow}>
                <TextInput
                    placeholder="Search Labour Type"
                    placeholderTextColor="#aaa"
                    style={styles.searchInput}
                    value={search}
                    onChangeText={setSearch}
                />
                <TouchableOpacity style={styles.sortBtn}>
                    <Text style={styles.sortText}>Sort</Text>
                </TouchableOpacity>
            </View>

            {loading ? (
                <ActivityIndicator size="large" color="#fbbf24" style={{ marginTop: 50 }} />
            ) : (
                <FlatList
                    data={filteredData}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={{ paddingBottom: 80 }}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <Text style={styles.name}>{item['Description of Labour']}</Text>

                            <View style={styles.rowBetween}>
                                <Text style={styles.labelText}>Unit: {item['Unit'] || '—'}</Text>
                                <Text style={styles.labelText}>SSR Rate</Text>
                            </View>

                            <View style={styles.rowBetween}>
                                <Text style={styles.labelText}></Text>
                                <Text style={styles.rate}>₹ {item['Rate'] || '—'}</Text>
                            </View>
                        </View>
                    )}
                />
            )}

            {/* Footer */}
            <View style={styles.footer}>
                <FooterIcon label="Home" icon="home" onPress={() => navigation.navigate('Home')} />
                <FooterIcon label="Profile" icon="person-outline" onPress={() => navigation.navigate('UserProfile')} />
            </View>
        </View>
    );
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
    searchRow: {
        flexDirection: 'row',
        padding: 16,
        gap: 10,
    },
    searchInput: {
        flex: 1,
        backgroundColor: '#1e1e1e',
        color: '#fff',
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 8,
    },
    sortBtn: {
        backgroundColor: '#fbbf24',
        paddingHorizontal: 16,
        justifyContent: 'center',
        borderRadius: 8,
    },
    sortText: {
        fontWeight: 'bold',
        color: '#000',
    },
    card: {
        backgroundColor: '#1e1e1e',
        marginHorizontal: 16,
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
    },
    name: {
        fontWeight: 'bold',
        color: '#fbbf24',
        fontSize: 18,
        marginBottom: 8,
    },
    rowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 2,
    },
    labelText: {
        color: '#ccc',
        fontSize: 14,
    },
    rate: {
        fontSize: 16,
        color: '#fbbf24',
        fontWeight: 'bold',
    },
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

export default LabourRatesScreen;
