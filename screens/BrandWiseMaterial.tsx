import React, { useState, useEffect } from 'react';
import {
    View, Text, FlatList, TouchableOpacity, Image, TextInput, StyleSheet, ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import Papa from 'papaparse';

const getLogoUrl = (domain: string) => `https://logo.clearbit.com/${domain}`;


const MaterialsScreen = () => {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
    const [search, setSearch] = useState('');
    const [materials, setMaterials] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    const toggleExpand = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    // Fetch CSV from GitHub
    useEffect(() => {
        const fetchCSV = async () => {
            try {
                const response = await fetch(
                    'https://raw.githubusercontent.com/NirmanSutra/nirman-data/main/MaterialsBrandwise.csv'
                );
                const csvText = await response.text();
                const parsed = Papa.parse(csvText, { header: true }).data;

                const grouped = Object.values(
                    parsed.reduce((acc: any, row: any) => {
                        const { Material, Brand, Unit, Price } = row;
                        if (!Material || !Brand) return acc;

                        if (!acc[Material]) {
                            acc[Material] = {
                                name: Material,
                                icon: getIcon(Material),
                                ssrRate: getSSRRate(Material),
                                brands: [],
                            };
                        }

                        acc[Material].brands.push({
                            name: Brand,
                            price: Price,
                            domain: getDomainFromBrand(Brand),
                        });

                        return acc;
                    }, {})
                );

                setMaterials(grouped);
            } catch (error) {
                console.error("CSV Fetch Error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCSV();
    }, []);

    // Helpers
    const getIcon = (material: string) => {
        const m = material.toLowerCase();
        if (m.includes("cement")) return "barrel";
        if (m.includes("steel")) return "cog-outline";
        if (m.includes("paint")) return "brush";
        if (m.includes("pipe")) return "pipe";
        if (m.includes("tile")) return "texture-box";
        if (m.includes("door")) return "door";
        if (m.includes("plywood")) return "table-furniture";
        if (m.includes("glass")) return "window-closed";
        return "cube-outline";
    };

    const getSSRRate = (material: string) => {
        const rates: Record<string, number> = {
            Cement: 320,
            "TMT Steel / Rebars": 55000,
            "Structural Steel": 57000,
            "Ready-Mix Concrete (RMC)": 4700,
            Paints: 260,
        };
        return rates[material] || 100;
    };

    const getDomainFromBrand = (brand: string): string => {
        const domains: Record<string, string> = {
            "UltraTech": "ultratechcement.com",
            "ACC": "acclimited.com",
            "Ambuja": "ambujacement.com",
            "Tata Tiscon": "tatatiscon.in",
            "JSW": "jswsteel.in",
            "SAIL": "sail.co.in",
            "Asian Paints": "asianpaints.com",
            "Berger Paints": "bergerpaints.com",
            "Nerolac": "nerolac.com",
        };
        return domains[brand] || "example.com";
    };

    if (loading) {
        return (
            <View style={{ flex: 1, backgroundColor: "#0A0F1A", justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color="#FFD700" />
                <Text style={{ color: "#FFD700", marginTop: 10 }}>Loading Material Data...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.logo}>🏗️</Text>
                <Text style={styles.title}>Brandwise Materials</Text>
            </View>

            {/* Search */}
            <View style={styles.searchContainer}>
                <Icon name="search" size={20} color="#aaa" />
                <TextInput
                    placeholder="Search Material"
                    placeholderTextColor="#aaa"
                    style={styles.input}
                    value={search}
                    onChangeText={setSearch}
                />
            </View>

            {/* List */}
            <FlatList
                data={materials.filter((m) =>
                    m.name.toLowerCase().includes(search.toLowerCase())
                )}
                keyExtractor={(item) => item.name}
                contentContainerStyle={{ paddingBottom: 80 }}
                renderItem={({ item, index }) => {
                    const isExpanded = expandedIndex === index;

                    return (
                        <View>
                            <TouchableOpacity onPress={() => toggleExpand(index)} style={styles.categoryHeader}>
                                {/* First line: Icon + Material Name */}
                                <View style={styles.categoryTop}>
                                    <MaterialCommunityIcons name={item.icon} size={26} color="#ddd" />
                                    <Text style={styles.categoryText}>{item.name}</Text>
                                </View>

                                {/* Second line: SSR dot + SSR Rate + Price + Arrow */}
                                <View style={styles.categoryBottom}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                                        <Text style={styles.ssrDot}>●</Text>
                                        <Text style={styles.ssrText}>SSR Rate</Text>
                                        <Text style={styles.categoryRate}>₹ {item.ssrRate}</Text>
                                    </View>
                                    <Icon
                                        name={isExpanded ? 'chevron-up' : 'chevron-down'}
                                        size={22}
                                        color="#fff"
                                    />
                                </View>
                            </TouchableOpacity>



                            {isExpanded &&
                                item.brands.map((brand: any) => (
                                    <View key={brand.name} style={styles.card}>
                                        <Image
                                            source={{ uri: getLogoUrl(brand.domain) }}
                                            style={styles.logoImg}
                                        />
                                        <View style={{ flex: 1 }}>
                                            <Text style={styles.brandName}>{brand.name}</Text>
                                            <View style={styles.gradeRow}>
                                                <FontAwesome5 name="cubes" size={14} color="#ccc" />
                                                <Text style={styles.gradeText}>OPC 43 Grade</Text>
                                            </View>
                                            <View style={styles.gradeRow}>
                                                <MaterialCommunityIcons name="leaf" size={14} color="#ccc" />
                                                <Text style={styles.gradeText}>PPC</Text>
                                            </View>
                                        </View>
                                        <Text style={styles.brandPrice}>₹ {brand.price}</Text>
                                    </View>
                                ))}
                        </View>
                    );
                }}
            />

            {/* Footer */}
            <View style={styles.footer}>
                <FooterIcon label="Home" icon="home" onPress={() => navigation.navigate('Home')} />
                <FooterIcon label="Profile" icon="person-outline" onPress={() => navigation.navigate('UserProfile')} />
            </View>
        </View>
    );
};

const FooterIcon = ({ label, icon, onPress }) => (
    <TouchableOpacity style={{ alignItems: 'center' }} onPress={onPress}>
        <Icon name={icon} size={24} color="#ccc" />
        <Text style={{ color: '#ccc', fontSize: 12 }}>{label}</Text>
    </TouchableOpacity>
);

export default MaterialsScreen;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#0A0F1A' },
    header: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#1e1e1e' },
    logo: { fontSize: 28, marginRight: 10 },
    title: { fontSize: 24, fontWeight: 'bold', color: '#fff' },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#333',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 12,
        marginBottom: 20,
        height: 45,
        marginHorizontal: 16,
    },
    input: { color: '#fff', marginLeft: 10, flex: 1 },
    categoryHeader: {
        backgroundColor: '#121829',
        padding: 16,
        borderRadius: 12,
        marginBottom: 10,
        marginHorizontal: 16,
    },
    categoryTop: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    categoryText: { fontSize: 18, fontWeight: 'bold', color: '#fff', marginLeft: 8, flexShrink: 1 },
    categoryBottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    ssrDot: { color: 'yellow', fontSize: 18 },
    ssrText: { color: '#ccc', fontSize: 14 },
    categoryRate: { color: '#FFD700', fontWeight: 'bold', fontSize: 16 },


    card: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: '#121829',
        padding: 14,
        marginBottom: 10,
        borderRadius: 12,
        marginHorizontal: 16,
    },
   logoImg: {
    width: 40,
    height: 40,
    marginRight: 12,
    borderRadius: 8,
    backgroundColor: '#222',
    resizeMode: 'contain', // ensures the logo fits the box
},

    brandName: { fontSize: 16, fontWeight: 'bold', color: '#fff' },
    gradeRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4, gap: 6 },
    gradeText: { color: '#ccc', fontSize: 14, marginLeft: 4 },
    brandPrice: { color: '#FFD700', fontSize: 16, fontWeight: 'bold', marginTop: 4 },
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
