// RegisterScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigation } from "@react-navigation/native";

export default function RegisterScreen() {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Please enter all fields.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await updateProfile(user, { displayName: name });

      console.log("Registered User:", user);

      navigation.replace("Home");
    } catch (error) {
      Alert.alert("❌ Registration Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require("../assets/images/nirmansutra-logo.jpg")} 
        style={styles.logo}
      />

      {/* App Name */}
      <Text style={styles.appName}>NirmanSutra</Text>
      <Text style={styles.tagline}>Let's Build Together!</Text>

      {/* Full Name */}
      <View style={styles.inputContainer}>
        <Icon name="account" size={22} color="#aaa" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="#aaa"
          value={name}
          onChangeText={setName}
        />
      </View>

      {/* Email */}
      <View style={styles.inputContainer}>
        <Icon name="email" size={22} color="#aaa" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      {/* Password */}
      <View style={styles.inputContainer}>
        <Icon name="lock" size={22} color="#aaa" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Create Password"
          placeholderTextColor="#aaa"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      {/* Confirm Password */}
      <View style={styles.inputContainer}>
        <Icon name="lock-check" size={22} color="#aaa" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#aaa"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
      </View>

      {/* Register Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleRegister}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Register</Text>
        )}
      </TouchableOpacity>

      {/* Login Redirect */}
      <Text style={styles.loginText}>
        Already have an account?{" "}
        <Text
          style={styles.loginLink}
          onPress={() => navigation.navigate("Login")}
        >
          Log in
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#000" },
  logo: { width: 120, height: 120, alignSelf: "center", marginBottom: 20, resizeMode: "contain" },
  appName: { fontSize: 28, fontWeight: "bold", color: "#f5b84f", textAlign: "center" },
  tagline: { fontSize: 16, color: "#fff", textAlign: "center", marginBottom: 20 },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1e1e1e",
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  icon: { marginRight: 8 },
  input: { flex: 1, color: "#fff", paddingVertical: 12 },

  button: { backgroundColor: "#f5b84f", padding: 15, borderRadius: 8, alignItems: "center", marginTop: 10 },
  buttonText: { color: "#000", fontSize: 18, fontWeight: "bold" },
  loginText: { color: "#fff", textAlign: "center", marginTop: 20 },
  loginLink: { color: "#f5b84f", fontWeight: "bold" },
});
