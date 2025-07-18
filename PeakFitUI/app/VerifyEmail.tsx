import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';

export default function VerifyEmailScreen() {
  const [code, setCode] = useState('');
  const isCodeComplete = code.length === 6;
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Logo at top right */}
      <View style={styles.topBar}>
        <View style={{ flex: 1 }} />
        <Image source={require('@/assets/images/PeakFit Logo.png')} style={styles.logoImage} />
      </View>
      <Text style={styles.title}>Verify your Email</Text>
      <Text style={styles.subtitle}>Check your email for the verification code</Text>
      <TextInput
        style={styles.codeInput}
        placeholder="Enter Code"
        placeholderTextColor={Colors.light.icon}
        value={code}
        onChangeText={text => setCode(text.replace(/[^0-9]/g, '').slice(0, 6))}
        keyboardType="numeric"
        maxLength={6}
      />
      <TouchableOpacity
        style={[styles.verifyButton, !isCodeComplete && styles.verifyButtonDisabled]}
        disabled={!isCodeComplete}
        onPress={() => isCodeComplete && router.push('/HomePage')}
      >
        <Text style={[styles.verifyButtonText, !isCodeComplete && styles.verifyButtonTextDisabled]}>VERIFY</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    padding: 24,
    paddingTop: 36,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 60,
    marginTop: 8,
  },
  logoImage: {
    width: 90,
    height: 64,
    borderRadius: 24,
    resizeMode: 'cover',
    borderWidth: 1,
    borderColor: Colors.light.accent,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#23272A',
    marginBottom: 12,
    fontFamily: 'SpaceMono',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#7B8A8B',
    marginBottom: 32,
    fontFamily: 'SpaceMono',
    textAlign: 'center',
  },
  codeInput: {
    width: 180,
    height: 48,
    backgroundColor: Colors.light.background,
    borderRadius: 8,
    paddingHorizontal: 12,
    color: '#23272A',
    borderWidth: 1.5,
    borderColor: Colors.light.accent,
    fontSize: 18,
    fontFamily: 'SpaceMono',
    letterSpacing: 6,
    textAlign: 'center',
    alignSelf: 'center',
    marginBottom: 32,
  },
  verifyButton: {
    width: '100%',
    height: 48,
    borderRadius: 8,
    backgroundColor: Colors.light.accent,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0,
  },
  verifyButtonDisabled: {
    backgroundColor: '#D3D4DB',
  },
  verifyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    fontFamily: 'SpaceMono',
    letterSpacing: 1,
  },
  verifyButtonTextDisabled: {
    color: Colors.light.accent,
  },
}); 