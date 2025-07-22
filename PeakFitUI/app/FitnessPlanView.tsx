import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';

export default function FitnessPlanView() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Image source={require('@/assets/images/PeakFit Logo.png')} style={styles.logoImage} />
        <View style={{ flex: 1 }} />
        <TouchableOpacity style={styles.settingsButton}>
          <Feather name="settings" size={28} color="#fff" />
        </TouchableOpacity>
      </View>
      {/* Header Spacer */}
      <View style={styles.headerSpacer} />
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Feather name="chevron-left" size={32} color={Colors.light.accent} />
        </TouchableOpacity>
        <View style={styles.headerCenterRow}>
          <Feather name="calendar" size={36} color={Colors.light.accent} style={{ marginRight: 10 }} />
          <Text style={styles.headerTitle}>Fitness Plan</Text>
        </View>
      </View>
      {/* Main Content */}
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.planSection}>
          <Text style={styles.planTitle}>Upper/Lower Split (4 days/week)</Text>
          <Text style={styles.planSubtitle}>Day 1: Upper Day A (Chest & Back Bias)</Text>
          <View style={styles.workoutBlock}>
            <Text style={styles.workoutTitle}>Bench Press</Text>
            <Text style={styles.workoutDetail}>4 sets x 6 reps @ 3 RIR, 3 min rest, 75kg</Text>
          </View>
          <View style={styles.workoutBlock}>
            <Text style={styles.workoutTitle}>Barbell Row</Text>
            <Text style={styles.workoutDetail}>4 sets x 8 reps @ 2 RIR, 3 min rest, 60kg</Text>
          </View>
          <View style={styles.workoutBlock}>
            <Text style={styles.workoutTitle}>Incline Dumbbell Press</Text>
            <Text style={styles.workoutDetail}>3 sets x 10 reps @ 2 RIR, 2 min rest, 22kg</Text>
          </View>
          <View style={styles.workoutBlock}>
            <Text style={styles.workoutTitle}>Lat Pulldown</Text>
            <Text style={styles.workoutDetail}>3 sets x 12 reps @ 1 RIR, 2 min rest, 50kg</Text>
          </View>
          <Text style={styles.planSubtitle}>Day 2: Lower Day A (Quads Bias)</Text>
          <View style={styles.workoutBlock}>
            <Text style={styles.workoutTitle}>Back Squat</Text>
            <Text style={styles.workoutDetail}>4 sets x 6 reps @ 3 RIR, 3 min rest, 90kg</Text>
          </View>
          <View style={styles.workoutBlock}>
            <Text style={styles.workoutTitle}>Leg Press</Text>
            <Text style={styles.workoutDetail}>3 sets x 10 reps @ 2 RIR, 2 min rest, 180kg</Text>
          </View>
          <View style={styles.workoutBlock}>
            <Text style={styles.workoutTitle}>Leg Extension</Text>
            <Text style={styles.workoutDetail}>3 sets x 12 reps @ 1 RIR, 1.5 min rest, 45kg</Text>
          </View>
          <Text style={styles.planSubtitle}>Day 3: Upper Day B (Arms Focus)</Text>
          <View style={styles.workoutBlock}>
            <Text style={styles.workoutTitle}>Overhead Press</Text>
            <Text style={styles.workoutDetail}>4 sets x 8 reps @ 2 RIR, 2 min rest, 40kg</Text>
          </View>
          <View style={styles.workoutBlock}>
            <Text style={styles.workoutTitle}>Pull Up</Text>
            <Text style={styles.workoutDetail}>3 sets x 8 reps @ 1 RIR, 2 min rest, bodyweight</Text>
          </View>
          <View style={styles.workoutBlock}>
            <Text style={styles.workoutTitle}>Dumbbell Curl</Text>
            <Text style={styles.workoutDetail}>3 sets x 12 reps @ 2 RIR, 1.5 min rest, 12kg</Text>
          </View>
          <View style={styles.workoutBlock}>
            <Text style={styles.workoutTitle}>Triceps Pushdown</Text>
            <Text style={styles.workoutDetail}>3 sets x 12 reps @ 2 RIR, 1.5 min rest, 30kg</Text>
          </View>
          <Text style={styles.planSubtitle}>Day 4: Lower Day B (Hams & Glutes Bias)</Text>
          <View style={styles.workoutBlock}>
            <Text style={styles.workoutTitle}>Romanian Deadlift</Text>
            <Text style={styles.workoutDetail}>4 sets x 8 reps @ 2 RIR, 3 min rest, 80kg</Text>
          </View>
          <View style={styles.workoutBlock}>
            <Text style={styles.workoutTitle}>Leg Curl</Text>
            <Text style={styles.workoutDetail}>3 sets x 12 reps @ 1 RIR, 1.5 min rest, 35kg</Text>
          </View>
          <View style={styles.workoutBlock}>
            <Text style={styles.workoutTitle}>Glute Bridge</Text>
            <Text style={styles.workoutDetail}>3 sets x 10 reps @ 2 RIR, 2 min rest, 60kg</Text>
          </View>
        </View>
        <View style={styles.buttonColumn}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Start a Workout Session</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButtonSecondary}>
            <Text style={styles.actionButtonTextSecondary}>Update Progress</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.metallicDarkGrey,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 40,
    marginBottom: 0,
    paddingHorizontal: 16,
    paddingVertical: 10,
    minHeight: 80,
    backgroundColor: '#343A40',
    borderBottomWidth: 2,
    borderBottomColor: Colors.light.accent,
  },
  logoImage: {
    width: 80,
    height: 55,
    borderRadius: 16,
    resizeMode: 'cover',
    borderWidth: 1,
    borderColor: Colors.light.accent,
    backgroundColor: '#23272A',
  },
  headerSpacer: {
    height: 32,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  backButton: {
    padding: 4,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: 'transparent',
  },
  headerCenterRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 40,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.light.accent,
    fontFamily: 'SpaceMono',
    letterSpacing: 1,
    marginTop: 2,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 48,
    alignItems: 'center',
  },
  planSection: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1.5,
    borderColor: '#343A40',
    shadowColor: Colors.light.accent,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 1,
  },
  planTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.light.accent,
    fontFamily: 'SpaceMono',
    marginBottom: 12,
    textAlign: 'center',
  },
  planSubtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#23272A',
    fontFamily: 'SpaceMono',
    marginTop: 18,
    marginBottom: 6,
  },
  workoutBlock: {
    marginBottom: 8,
    marginLeft: 8,
  },
  workoutTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: Colors.light.accent,
    fontFamily: 'SpaceMono',
  },
  workoutDetail: {
    fontSize: 14,
    color: '#23272A',
    fontFamily: 'SpaceMono',
    marginLeft: 8,
    opacity: 0.85,
  },
  buttonColumn: {
    flexDirection: 'column',
    width: '100%',
    marginTop: 16,
    marginBottom: 24,
    gap: 16,
    alignItems: 'center',
  },
  actionButton: {
    backgroundColor: Colors.light.accent,
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: 'center',
    width: '100%',
    borderWidth: 2,
    borderColor: '#343A40',
    shadowColor: Colors.light.accent,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 2,
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'SpaceMono',
    letterSpacing: 1,
  },
  actionButtonSecondary: {
    backgroundColor: Colors.light.accent,
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: 'center',
    width: '100%',
    borderWidth: 2,
    borderColor: '#343A40',
    shadowColor: Colors.light.accent,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 1,
  },
  actionButtonTextSecondary: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'SpaceMono',
    letterSpacing: 1,
  },
  settingsButton: {
    padding: 8,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 