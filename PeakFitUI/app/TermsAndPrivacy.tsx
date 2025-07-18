import React from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';

export default function TermsAndPrivacyScreen() {
  const router = useRouter();
  return (
    <View style={{ flex: 1, backgroundColor: Colors.light.background }}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Text style={styles.title}>Terms and Conditions</Text>
        <Text style={styles.body}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam massa nisl quis neque. Mauris euismod, nisl eget aliquam ultricies, nunc nisl aliquam nunc, eget aliquam massa nisl quis neque.
        </Text>
        <Text style={styles.title}>Privacy Statement</Text>
        <Text style={styles.body}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam massa nisl quis neque. Mauris euismod, nisl eget aliquam ultricies, nunc nisl aliquam nunc, eget aliquam massa nisl quis neque.
        </Text>
      </ScrollView>
      <TouchableOpacity style={styles.understandButton} onPress={() => router.replace({ pathname: '/SignUp', params: { agreed: 'true' } })}>
        <Text style={styles.understandButtonText}>I UNDERSTAND</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  content: {
    padding: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#23272A',
    marginBottom: 12,
    marginTop: 24,
    fontFamily: 'SpaceMono',
  },
  body: {
    fontSize: 15,
    color: '#7B8A8B',
    marginBottom: 16,
    fontFamily: 'SpaceMono',
  },
  understandButton: {
    backgroundColor: Colors.light.accent,
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 24,
  },
  understandButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'SpaceMono',
    letterSpacing: 1,
  },
}); 