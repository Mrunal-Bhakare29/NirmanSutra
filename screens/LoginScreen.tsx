import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithCredential, fetchSignInMethodsForEmail } from 'firebase/auth';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: '1016404772952-caiujp2q02amdi8evqstvgtqql132vmk.apps.googleusercontent.com',
});

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Email/Password Login
  const handleLogin = async () => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.replace('Home');
    } catch (error) {
      let message = error.message;
      if (error.code === 'auth/user-not-found') {
        message = 'No user found with this email.';
      } else if (error.code === 'auth/wrong-password') {
        message = 'Incorrect password.';
      }
      Alert.alert('Login Error', message);
    } finally {
      setLoading(false);
    }
  };

  // Google Sign-In
  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await GoogleSignin.hasPlayServices();
      const { idToken, user } = await GoogleSignin.signIn();

      const googleCredential = GoogleAuthProvider.credential(idToken);

      // Check if email already exists with another method
      const signInMethods = await fetchSignInMethodsForEmail(auth, user.email);
      if (signInMethods.length > 0 && !signInMethods.includes('google.com')) {
        Alert.alert(
          'Login Error',
          'This email is already registered using a different sign-in method (e.g. email/password). Please log in using that method.'
        );
      } else {
        await signInWithCredential(auth, googleCredential);
        navigation.replace('Home');
      }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled
      } else {
        Alert.alert('Google Sign-In Error', error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.welcome}>Welcome back to</Text>
      <Image source={require('../assets/images/nirmansutra-logo.jpg')} style={styles.logo} />
      <Text style={styles.title}>NirmanSutra</Text>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Icon name="email" size={22} color="#bfa76a" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#bfa76a"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <Icon name="lock-outline" size={22} color="#bfa76a" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#bfa76a"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Icon name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={22} color="#bfa76a" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.forgot}>
        <Text style={styles.forgotText}>Forgot password?</Text>
      </TouchableOpacity>

      {/* Log in Button */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#181b23" />
        ) : (
          <Text style={styles.loginButtonText}>Log in</Text>
        )}
      </TouchableOpacity>

      {/* OR Divider */}
      <View style={styles.orContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>OR</Text>
        <View style={styles.line} />
      </View>
      {/* Register Link */}
      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>New here? Create account: </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.registerLink}>Register</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181b23',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  welcome: {
    color: '#bfa76a',
    fontSize: 20,
    marginBottom: 8,
    marginTop: 16,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  title: {
    color: '#f5d488',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#232634',
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 12,
    width: '100%',
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    color: '#fff',
    height: 48,
    fontSize: 16,
  },
  forgot: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotText: {
    color: '#bfa76a',
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: '#f5d488',
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    paddingVertical: 14,
    marginBottom: 16,
  },
  loginButtonText: {
    color: '#181b23',
    fontSize: 18,
    fontWeight: 'bold',
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#232634',
  },
  orText: {
    color: '#bfa76a',
    marginHorizontal: 8,
    fontSize: 14,
  },
  
  registerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  registerText: {
    color: '#bfa76a',
    fontSize: 14,
  },
  registerLink: {
    color: '#f5d488',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default LoginScreen;
