import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, StyleSheet, Image, Text, TextInput, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';

// Eye icon component for password visibility toggle
const EyeIcon = ({ visible }: { visible: boolean }) => (
  <Feather name={visible ? 'eye' : 'eye-off'} size={22} color="#23272A" />
);

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.logoWrap}>
        <Image source={require('@/assets/images/PeakFit Logo.png')} style={styles.logoImage} />
      </View>
      <Text style={styles.welcome}>Welcome!</Text>

      {/* Email Form */}
      <TextInput
        style={[styles.input, styles.inputFixedWidth]}
        placeholder="Email Address"
        placeholderTextColor={Colors.light.icon}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Password Form */}
      <View style={styles.passwordRow}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="Password"
          placeholderTextColor={Colors.light.icon}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          autoCapitalize="none"
        />
        <TouchableOpacity onPress={() => setShowPassword(v => !v)} style={styles.iconButton}>
          <EyeIcon visible={showPassword} />
        </TouchableOpacity>
      </View>
      {/* Forgot Password Link */}
      <TouchableOpacity style={styles.forgotButton}>
        <Text style={styles.forgotText}>Forgot password?</Text>
      </TouchableOpacity>
      {/* Log In Button */}
      <TouchableOpacity
        style={[styles.loginButton, !(email && password) && styles.loginButtonDisabled]}
        disabled={!(email && password)}
        onPress={async () => {
          await AsyncStorage.setItem('hasFitnessPlan', 'true');
          router.push('/HomePage');
        }}
      >
        <Text style={[styles.loginButtonText, !(email && password) && styles.loginButtonTextDisabled]}>LOG IN</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.metallicDarkGrey,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 100,
  },
  logoImage: {
    width: 320,
    height: 220,
    resizeMode: 'cover',
    borderRadius: 48,
    borderWidth: 1.5,
    borderColor: Colors.light.accent,
    backgroundColor: '#fff',
    shadowColor: Colors.light.accent,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 12,
    elevation: 2,
  },
  welcome: {
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'SpaceMono',
    color: '#23272A',
    marginTop: 36,
    marginBottom: 18,
    alignSelf: 'flex-start',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 320,
    paddingLeft: 0,
  },
  inputBox: {
    width: 320,
    borderWidth: 2,
    borderColor: Colors.light.accent,
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    shadowColor: Colors.light.accent,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 1,
  },
  input: {
    width: '100%',
    height: 44,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 20,
    color: '#23272A',
    borderWidth: 1.5,
    borderColor: Colors.light.accent,
    fontSize: 16,
    fontFamily: 'SpaceMono',
  },
  eyeButton: {
    padding: 8,
  },
  passwordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    width: 320,
  },
  iconButton: {
    marginLeft: 8,
    padding: 4,
  },
  inputFixedWidth: {
    width: 320,
    alignSelf: 'center',
  },
  forgotButton: {
    alignSelf: 'flex-end',
    marginRight: 24,
    marginBottom: 8,
  },
  forgotText: {
    color: Colors.light.accent,
    fontSize: 14,
    fontFamily: 'SpaceMono',
    textDecorationLine: 'underline',
  },
  loginButton: {
    width: 320,
    backgroundColor: Colors.light.accent,
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 8,
    shadowColor: Colors.light.accent,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 2,
  },
  loginButtonDisabled: {
    backgroundColor: '#D3D4DB',
    borderWidth: 2,
    borderColor: Colors.light.accent,
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'SpaceMono',
    letterSpacing: 1,
  },
  loginButtonTextDisabled: {
    color: Colors.light.accent,
  },
}); 