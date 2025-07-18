import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function CreateFitnessPlan() {
  const router = useRouter();
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [heightUnit, setHeightUnit] = useState('cm');
  const [weightUnit, setWeightUnit] = useState('kg');
  const [goal, setGoal] = useState('Cut');
  const [activity, setActivity] = useState('Sedentary');
  const [experience, setExperience] = useState('Beginner');
  const [days, setDays] = useState('');
  const [split, setSplit] = useState('No preference');

  return (
    <View style={styles.container}>
      {/* Top space like homepage */}
      <View style={styles.topBarSpace} />
      {/* Back button and title */}
      <View style={styles.headerRow}>
        <View style={styles.topBarBg}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Feather name="chevron-left" size={32} color={Colors.light.accent} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Create Fitness Plan</Text>
        </View>
      </View>
      <Text style={styles.infoText}>Please Fill In the Necessary Information</Text>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Basic Info */}
        <Text style={styles.sectionTitle}>Basic Info</Text>
        <View style={styles.row}>
          <View style={{ flex: 1, marginRight: 8 }}>
            <Text style={styles.label}>Height</Text>
            <View style={styles.unitRow}>
              <TextInput
                style={styles.input}
                placeholder="Height"
                placeholderTextColor={Colors.light.icon}
                value={height}
                onChangeText={setHeight}
                keyboardType="numeric"
              />
              <TouchableOpacity
                style={styles.unitButton}
                onPress={() => setHeightUnit(heightUnit === 'cm' ? 'in' : 'cm')}
              >
                <Text style={styles.unitText}>{heightUnit}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flex: 1, marginLeft: 8 }}>
            <Text style={styles.label}>Weight</Text>
            <View style={styles.unitRow}>
              <TextInput
                style={styles.input}
                placeholder="Weight"
                placeholderTextColor={Colors.light.icon}
                value={weight}
                onChangeText={setWeight}
                keyboardType="numeric"
              />
              <TouchableOpacity
                style={styles.unitButton}
                onPress={() => setWeightUnit(weightUnit === 'kg' ? 'lb' : 'kg')}
              >
                <Text style={styles.unitText}>{weightUnit}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.sectionDivider} />
        {/* Fitness Goal */}
        <Text style={styles.sectionTitle}>Fitness Goal</Text>
        <View style={styles.radioGroup}>
          {['Cut', 'Bulk', 'Maintain'].map(opt => (
            <TouchableOpacity key={opt} style={styles.radioRow} onPress={() => setGoal(opt)}>
              <View style={[styles.radioCircle, goal === opt && styles.radioCircleActive]} />
              <Text style={styles.radioLabel}>{opt}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.sectionDivider} />
        {/* Activity Level */}
        <Text style={styles.sectionTitle}>Activity Level</Text>
        <View style={styles.radioGroup}>
          {[
            'Sedentary (little to no exercise)',
            'Lightly active (light exercise 1–3 days/week)',
            'Moderately active (moderate exercise 3–5 days/week)',
            'Very active (hard exercise 6–7 days/week)',
            'Athlete (twice-a-day training or physical job)',
          ].map(opt => (
            <TouchableOpacity key={opt} style={styles.radioRow} onPress={() => setActivity(opt)}>
              <View style={[styles.radioCircle, activity === opt && styles.radioCircleActive]} />
              <Text style={styles.radioLabel}>{opt}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.sectionDivider} />
        {/* Training Experience */}
        <Text style={styles.sectionTitle}>Training Experience</Text>
        <View style={styles.radioGroup}>
          {[
            'Beginner (0–6 months)',
            'Intermediate (6 months – 2 years)',
            'Advanced (2+ years)',
          ].map(opt => (
            <TouchableOpacity key={opt} style={styles.radioRow} onPress={() => setExperience(opt)}>
              <View style={[styles.radioCircle, experience === opt && styles.radioCircleActive]} />
              <Text style={styles.radioLabel}>{opt}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.sectionDivider} />
        {/* Workout Preferences */}
        <Text style={styles.sectionTitle}>Workout Preferences</Text>
        <Text style={styles.label}>Days Available to train per week</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. 3"
          placeholderTextColor={Colors.light.icon}
          value={days}
          onChangeText={setDays}
          keyboardType="numeric"
        />
        <Text style={styles.label}>Preferred training split (if any)</Text>
        <View style={styles.radioGroup}>
          {[
            'Full-body',
            'Upper/Lower',
            'Push-Pull-Legs',
            'Bro split (chest day, back day, etc.)',
            'No preference / Let the app decide',
          ].map(opt => (
            <TouchableOpacity key={opt} style={styles.radioRow} onPress={() => setSplit(opt)}>
              <View style={[styles.radioCircle, split === opt && styles.radioCircleActive]} />
              <Text style={styles.radioLabel}>{opt}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity style={styles.createButton}>
          <Text style={styles.createButtonText}>Create</Text>
        </TouchableOpacity>
        <View style={{ height: 32 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  topBarSpace: {
    height: 56,
  },
  headerRow: {
    marginBottom: 16,
    paddingHorizontal: 0,
  },
  topBarBg: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#343A40',
    borderRadius: 0,
    paddingHorizontal: 8,
    paddingVertical: 8,
    marginHorizontal: 0,
    width: '100%',
    borderBottomWidth: 2,
    borderBottomColor: Colors.light.accent,
  },
  backButton: {
    padding: 4,
    borderRadius: 20,
    marginRight: 8,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontFamily: 'SpaceMono',
    fontWeight: '900',
    fontSize: 24,
    color: '#fff',
    letterSpacing: 1,
    marginRight: 40,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 48,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.accent,
    marginBottom: 8,
    marginTop: 16,
    fontFamily: 'SpaceMono',
  },
  label: {
    fontSize: 15,
    color: '#23272A',
    marginBottom: 6,
    fontWeight: 'bold',
    fontFamily: 'SpaceMono',
    letterSpacing: 0.2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  unitRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 44,
    backgroundColor: Colors.light.metallicDarkGrey,
    borderRadius: 8,
    paddingHorizontal: 16,
    color: '#23272A',
    borderWidth: 1.5,
    borderColor: Colors.light.accent,
    fontSize: 16,
    fontFamily: 'SpaceMono',
    marginRight: 8,
  },
  unitButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: Colors.light.accent,
    backgroundColor: Colors.light.background,
  },
  unitText: {
    color: Colors.light.accent,
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'SpaceMono',
  },
  radioGroup: {
    marginBottom: 8,
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.light.accent,
    marginRight: 12,
    backgroundColor: Colors.light.metallicDarkGrey,
  },
  radioCircleActive: {
    backgroundColor: Colors.light.accent,
  },
  radioLabel: {
    fontSize: 15,
    color: '#23272A',
    fontFamily: 'SpaceMono',
  },
  createButton: {
    marginTop: 32,
    backgroundColor: Colors.light.accent,
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.light.accent,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 2,
  },
  createButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    fontFamily: 'SpaceMono',
    letterSpacing: 1,
  },
  sectionDivider: {
    height: 2,
    backgroundColor: Colors.light.accent,
    width: '100%',
    marginVertical: 16,
    borderRadius: 1,
    opacity: 0.5,
  },
  infoText: {
    textAlign: 'center',
    color: '#23272A',
    fontFamily: 'SpaceMono',
    fontSize: 16,
    marginBottom: 6,
    marginTop: 8,
    fontStyle: 'italic',
    fontWeight: '600',
  },
}); 