import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
  Image,
  ScrollView,
} from 'react-native';
import { collection, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import IconIon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../ThemeContext';

const StateSSRScreen = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();

  const [ssrLinks, setSsrLinks] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const docRef = doc(collection(db, 'ssr_links'), 'maharashtra');
        const snapshot = await getDoc(docRef);

        if (snapshot.exists()) {
          const data = snapshot.data() as Record<string, string>;
          console.log('Fetched SSR data:', data);
          setSsrLinks(data || {});
        } else {
          console.warn('SSR document does not exist');
          setSsrLinks({});
        }
      } catch (err) {
        console.error('Error fetching SSR links:', err);
        setSsrLinks({});
      } finally {
        setLoading(false);
      }
    };

    fetchLinks();
  }, []);

  const openPDF = (url: string) => {
    Linking.openURL(url).catch((err) =>
      console.error('Failed to open URL:', err)
    );
  };

  if (loading) {
    return (
      <View style={[styles.centered, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color="#ffd700" />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.card }]}>
        <Image
          source={require('../assets/images/nirmansutra-logo.jpg')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={[styles.titleHeader, { color: theme.text }]}>
          NirmanSutra
        </Text>
      </View>

      {/* Title */}
      <Text style={[styles.title, { color: theme.text }]}>
        📂 <Text style={styles.titleText}>Download Maharashtra SSR</Text>
      </Text>

      <ScrollView style={{ flex: 1, marginTop: 20 }}>
        {Object.keys(ssrLinks).length > 0 ? (
          Object.entries(ssrLinks)
            .sort((a, b) => {
              const getStartYear = (key: string) =>
                parseInt(key.match(/\d{4}/)?.[0] || '0', 10);
              return getStartYear(b[0]) - getStartYear(a[0]);
            })
            .map(([year, url]) => (
              <TouchableOpacity
                key={year}
                style={[
                  styles.button,
                  { backgroundColor: theme.card, borderColor: '#fbbf24' },
                ]}
                onPress={() => openPDF(url)}
                activeOpacity={0.7}
              >
                <Text style={[styles.buttonText, { color: theme.text }]}>
                  📁 {year} SSR
                </Text>
              </TouchableOpacity>
            ))
        ) : (
          <Text style={[styles.error, { color: 'red', marginTop: 20 }]}>
            No SSR links available.
          </Text>
        )}
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <FooterIcon
          label="Home"
          icon="home"
          onPress={() => navigation.navigate('Home' as never)}
        />
        <FooterIcon
          label="Profile"
          icon="person-outline"
          onPress={() => navigation.navigate('UserProfile' as never)}
        />
      </View>
    </View>
  );
};

const FooterIcon = ({
  label,
  icon,
  onPress,
}: {
  label: string;
  icon: string;
  onPress: () => void;
}) => (
  <TouchableOpacity style={{ alignItems: 'center' }} onPress={onPress}>
    <IconIon name={icon} size={24} color="#ccc" />
    <Text style={{ color: '#ccc', fontSize: 12 }}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 80,
    paddingTop: 10,
    // paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#1e1e1e',
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  titleHeader: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ffd700',
    paddingBottom: 10,
    marginTop: 50,
  },
  titleText: {
    color: '#fbbf24',
  },
  button: {
    borderRadius: 12,
    marginBottom: 15,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderWidth: 1.2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  error: {
    textAlign: 'center',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 0.5,
    borderTopColor: '#999',
  },
});

export default StateSSRScreen;
