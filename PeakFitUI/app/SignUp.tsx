import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View, Text, Pressable, Image } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';

const EyeIcon = ({ visible }: { visible: boolean }) => (
  <Feather name={visible ? 'eye' : 'eye-off'} size={22} color="#23272A" />
);

export default function SignUpScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [checked, setChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [age, setAge] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const router = useRouter();
  const params = useLocalSearchParams();

  useEffect(() => {
    if (params.agreed === 'true') {
      setChecked(true);
    }
  }, [params.agreed]);

  const isFormComplete = name && age && birthdate && email && password && confirmPassword && checked;

  return (
    <View style={styles.container}>
      {/* Top Bar for Back Button */}
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={() => router.push('/')}
          style={styles.backButton}>
          <Feather name="chevron-left" size={32} color={Colors.light.accent} />
        </TouchableOpacity>
      </View>
      <View style={styles.formContent}>
        {/* Add more space between logo and Sign up text */}
        <View style={{ height: 48 }} />
        {/* Title and Subtitle */}
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Create Account to get started</Text>

        {/* Full Name Field */}
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor={Colors.light.icon}
          value={name}
          onChangeText={setName}
        />
        {/* Age and Birthdate Row */}
        <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginBottom: 8 }}>
          <View style={{ flex: 1, maxWidth: 64, marginRight: 12 }}>
            <Text style={styles.label}>Age</Text>
            <TextInput
              style={[styles.input, { width: '100%', textAlign: 'center' }]}
              placeholder="Age"
              placeholderTextColor={Colors.light.icon}
              value={age}
              onChangeText={setAge}
              keyboardType="numeric"
              maxLength={2}
            />
          </View>
          <View style={{ flex: 2 }}>
            <Text style={styles.label}>Birthdate</Text>
            <TextInput
              style={styles.input}
              placeholder="YYYY-MM-DD"
              placeholderTextColor={Colors.light.icon}
              value={birthdate}
              onChangeText={setBirthdate}
              keyboardType="numbers-and-punctuation"
              maxLength={10}
            />
          </View>
        </View>

        {/* Email Field */}
        <Text style={styles.label}>Email Address</Text>
        <TextInput
          style={styles.input}
          placeholder="name@email.com"
          placeholderTextColor={Colors.light.icon}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {/* Password Fields */}
        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordRow}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Create a password"
            placeholderTextColor={Colors.light.icon}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <Pressable style={styles.iconButton} onPress={() => setShowPassword(!showPassword)}>
            <EyeIcon visible={showPassword} />
          </Pressable>
        </View>
        <View style={styles.passwordRow}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Confirm password"
            placeholderTextColor={Colors.light.icon}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
          />
          <Pressable style={styles.iconButton} onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
            <EyeIcon visible={showConfirmPassword} />
          </Pressable>
        </View>

        {/* Terms and Conditions Checkbox and Text */}
        <View style={styles.checkboxRow}>
          <Pressable style={styles.checkbox} onPress={() => setChecked(!checked)}>
            {checked ? <View style={styles.checkboxChecked} /> : null}
          </Pressable>
          <Text style={styles.termsText}>
            I've read and agree with the
            <Text style={styles.link} onPress={() => router.push('/TermsAndPrivacy')}> Terms and Conditions </Text>
            and the
            <Text style={styles.link} onPress={() => router.push('/TermsAndPrivacy')}> Privacy Policy</Text>.
          </Text>
        </View>
      </View>
      {/* Sign Up Button at Bottom */}
      <TouchableOpacity
        style={[styles.button, checked && isFormComplete ? styles.buttonActive : styles.buttonInactive]}
        disabled={!isFormComplete}
        onPress={() => isFormComplete && router.push('/VerifyEmail')}
      >
        <Text style={checked && isFormComplete ? styles.buttonTextActive : styles.buttonTextInactive}>FINISH SIGN UP</Text>
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
    justifyContent: 'space-between',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 0,
    marginTop: 8,
  },
  backButton: {
    padding: 4,
    borderRadius: 20,
  },
  logoPressable: {
    borderRadius: 32,
  },
  logoPlaceholder: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#A7A9AC',
  },
  logoImage: {
    width: 90,
    height: 64,
    borderRadius: 24,
    resizeMode: 'cover',
    borderWidth: 1,
    borderColor: Colors.light.accent,
  },
  formContent: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#23272A',
    marginBottom: 4,
    fontFamily: 'SpaceMono',
    letterSpacing: 0.5,
    textAlign: 'left',
  },
  subtitle: {
    fontSize: 15,
    color: '#7B8A8B',
    marginBottom: 24,
    fontFamily: 'SpaceMono',
    textAlign: 'left',
  },
  label: {
    fontSize: 15,
    color: '#23272A',
    marginBottom: 6,
    marginTop: 12,
    fontWeight: 'bold',
    fontFamily: 'SpaceMono',
    letterSpacing: 0.2,
  },
  input: {
    width: '100%',
    height: 44,
    backgroundColor: Colors.light.background,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 8,
    color: '#23272A',
    borderWidth: 1.5,
    borderColor: Colors.light.accent,
    fontSize: 16,
    fontFamily: 'SpaceMono',
  },
  passwordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconButton: {
    marginLeft: 8,
    padding: 4,
  },
  icon: {
    fontSize: 22,
    color: '#23272A',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
    flexWrap: 'wrap',
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 1.5,
    borderColor: Colors.light.accent,
    borderRadius: 4,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.light.background,
  },
  checkboxChecked: {
    width: 14,
    height: 14,
    backgroundColor: Colors.light.accent,
    borderRadius: 2,
  },
  termsText: {
    fontSize: 13,
    color: '#7B8A8B',
    fontFamily: 'SpaceMono',
    flex: 1,
    flexWrap: 'wrap',
  },
  link: {
    color: Colors.light.accent,
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
  button: {
    marginTop: 16,
    width: '100%',
    height: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    marginBottom: 8,
  },
  buttonInactive: {
    backgroundColor: '#D3D4DB',
    borderColor: Colors.light.accent,
  },
  buttonActive: {
    backgroundColor: Colors.light.accent,
    borderColor: Colors.light.accent,
  },
  buttonTextInactive: {
    color: Colors.light.accent,
    fontWeight: 'bold',
    fontSize: 18,
    fontFamily: 'SpaceMono',
    letterSpacing: 1,
  },
  buttonTextActive: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    fontFamily: 'SpaceMono',
    letterSpacing: 1,
  },
}); 