import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useTheme } from "../ThemeContext";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../firebaseConfig";
import {
  signOut,
  updateProfile,
  updatePassword,
  onAuthStateChanged,
} from "firebase/auth";

export default function UserProfile() {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState("Profile");
  const [user, setUser] = useState<any>(null);

  // modal controls
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [newName, setNewName] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setNewName(currentUser?.displayName || "");
    });
    return unsubscribe;
  }, []);

  // 🔹 Save updated name
  const handleSaveName = async () => {
    if (!newName) return Alert.alert("Error", "Name cannot be empty");
    try {
      await updateProfile(auth.currentUser!, { displayName: newName });
      Alert.alert("✅ Success", "Profile updated successfully");
      setUser({ ...auth.currentUser, displayName: newName });
      setEditModalVisible(false);
    } catch (err: any) {
      Alert.alert("❌ Error", err.message);
    }
  };

  // 🔹 Save new password
  const handleSavePassword = async () => {
    if (newPassword.length < 6) {
      return Alert.alert("Error", "Password must be at least 6 characters");
    }
    try {
      await updatePassword(auth.currentUser!, newPassword);
      Alert.alert("✅ Success", "Password updated successfully");
      setPasswordModalVisible(false);
      setNewPassword("");
    } catch (err: any) {
      Alert.alert("❌ Error", err.message);
    }
  };

  // 🔹 Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.replace("Login");
    } catch (err: any) {
      Alert.alert("❌ Error", err.message);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.card }]}>
        <Image
          source={require("../assets/images/nirmansutra-logo.jpg")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={[styles.headerText, { color: theme.text }]}>
          Profile
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Profile Pic */}
        <Image
          source={require("../assets/images/nirmansutra-logo.jpg")}
          style={styles.profilePic}
        />

        {/* User Info */}
        <Text style={[styles.name, { color: theme.text }]}>
          {user?.displayName || "Guest User"}
        </Text>
        <Text style={[styles.email, { color: theme.subText }]}>
          {user?.email}
        </Text>

        {/* Options */}
        <View style={[styles.optionCard, { backgroundColor: theme.card }]}>
          <OptionItem
            icon="create-outline"
            label="Edit Profile"
            onPress={() => setEditModalVisible(true)}
          />
          <OptionItem
            icon="lock-closed-outline"
            label="Change Password"
            onPress={() => setPasswordModalVisible(true)}
          />
          <OptionItem
            icon="information-circle-outline"
            label="About App"
            onPress={() =>
              Alert.alert(
                "About NirmanSutra",
                "NirmanSutra helps users with SSR rates, supplier search, material costs, and more."
              )
            }
          />
          <OptionItem icon="log-out-outline" label="Logout" onPress={handleLogout} />
        </View>
      </ScrollView>

      {/* Edit Profile Modal */}
      <Modal visible={editModalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={[styles.modalBox, { backgroundColor: theme.card }]}>
            <Text style={[styles.modalTitle, { color: theme.text }]}>
              Edit Profile
            </Text>
            <TextInput
              style={styles.input}
              value={newName}
              onChangeText={setNewName}
              placeholder="Enter new name"
              placeholderTextColor="#aaa"
            />
            <TouchableOpacity style={styles.button} onPress={handleSaveName}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setEditModalVisible(false)}>
              <Text style={{ color: "red", marginTop: 10 }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Change Password Modal */}
      <Modal visible={passwordModalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={[styles.modalBox, { backgroundColor: theme.card }]}>
            <Text style={[styles.modalTitle, { color: theme.text }]}>
              Change Password
            </Text>
            <TextInput
              style={styles.input}
              value={newPassword}
              onChangeText={setNewPassword}
              placeholder="Enter new password"
              placeholderTextColor="#aaa"
              secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={handleSavePassword}>
              <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setPasswordModalVisible(false)}>
              <Text style={{ color: "red", marginTop: 10 }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Bottom Navigation */}
      <View style={[styles.bottomNav, { backgroundColor: theme.card }]}>
        <NavItem
          label="Home"
          iconName="home"
          active={activeTab === "Home"}
          onPress={() => {
            setActiveTab("Home");
            navigation.navigate("Home");
          }}
        />
        <NavItem
          label="Profile"
          iconName="person-outline"
          active={activeTab === "Profile"}
          onPress={() => setActiveTab("Profile")}
        />
      </View>
    </View>
  );
}

// Option Item
const OptionItem = ({ icon, label, onPress }: { icon: string; label: string; onPress: () => void }) => {
  const { theme } = useTheme();
  return (
    <TouchableOpacity style={styles.option} onPress={onPress}>
      <Icon name={icon} size={20} color="#FBC02D" />
      <Text style={[styles.optionText, { color: theme.text }]}>{label}</Text>
      <Icon name="chevron-forward-outline" size={20} color={theme.subText} />
    </TouchableOpacity>
  );
};

// Bottom Nav
const NavItem = ({ label, iconName, active, onPress }: { label: string; iconName: string; active: boolean; onPress: () => void }) => {
  const { theme } = useTheme();
  const color = active ? theme.accent : theme.subText;
  return (
    <TouchableOpacity style={styles.navItem} onPress={onPress}>
      <Icon name={iconName} size={22} color={color} />
      <Text style={[styles.navLabel, { color }]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingTop: 20, paddingBottom: 10, paddingHorizontal: 16, flexDirection: "row", alignItems: "center" },
  logo: { width: 40, height: 40, marginRight: 10 },
  headerText: { fontSize: 22, fontWeight: "bold" },
  content: { alignItems: "center", padding: 20, paddingBottom: 100 },
  profilePic: { width: 100, height: 100, borderRadius: 60, marginBottom: 16 },
  name: { fontSize: 22, fontWeight: "600" },
  email: { fontSize: 14, marginTop: 4 },
  optionCard: { width: "100%", borderRadius: 12, padding: 12, marginTop: 10 },
  option: { flexDirection: "row", alignItems: "center", paddingVertical: 14, paddingHorizontal: 10, borderBottomWidth: 1, borderBottomColor: "#2e2e2e" },
  optionText: { fontSize: 16, flex: 1, marginLeft: 10 },
  bottomNav: { position: "absolute", bottom: 0, left: 0, right: 0, height: 60, flexDirection: "row", justifyContent: "space-around", alignItems: "center" },
  navItem: { alignItems: "center" },
  navLabel: { fontSize: 12, marginTop: 2 },
  modalContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" },
  modalBox: { width: "85%", borderRadius: 12, padding: 20 },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 15 },
  input: { backgroundColor: "#1e1e1e", color: "#fff", padding: 12, borderRadius: 8, marginBottom: 20 },
  button: { backgroundColor: "#f5b84f", padding: 12, borderRadius: 8, alignItems: "center" },
  buttonText: { color: "#000", fontSize: 16, fontWeight: "bold" },
});
