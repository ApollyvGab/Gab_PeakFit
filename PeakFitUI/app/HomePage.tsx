import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
type FeatherIconName = keyof typeof Feather.glyphMap;

const tabs: { key: string; label: string; icon: FeatherIconName }[] = [
  { key: 'fitness', label: 'My Fitness', icon: 'activity' },
  { key: 'trainer', label: 'My Trainer', icon: 'user-check' },
  { key: 'inbox', label: 'Inbox', icon: 'mail' },
  { key: 'profile', label: 'Profile', icon: 'user' },
];

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('fitness');
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Top Bar with Logo */}
      <View style={styles.topBar}>
        <View style={{ flex: 1 }} />
        <Image source={require('@/assets/images/PeakFit Logo.png')} style={styles.logoImage} />
      </View>
      <View style={styles.topDivider} />
      {/* Main Content with dark background */}
      <View style={styles.mainArea}>
        <View style={styles.content}>
          <Text style={styles.pageTitle}>{tabs.find(t => t.key === activeTab)?.label}</Text>
          <View style={styles.tabContent}>
            {activeTab === 'fitness' ? (
              <>
                <Text style={styles.tabText}>Nothing here for now</Text>
                <TouchableOpacity style={styles.createButton} onPress={() => router.push('/CreateFitnessPlan')}>
                  <Text style={styles.createButtonText}>Create Fitness Plan</Text>
                </TouchableOpacity>
              </>
            ) : null}
          </View>
        </View>
      </View>
      {/* Bottom Tab Bar */}
      <View style={styles.tabBar}>
        {tabs.map(tab => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tabButton, activeTab === tab.key && styles.tabButtonActive]}
            onPress={() => setActiveTab(tab.key)}
          >
            <Feather
              name={tab.icon}
              size={24}
              color={activeTab === tab.key ? '#fff' : Colors.light.accent}
              style={{ marginBottom: 4 }}
            />
            <Text style={[styles.tabLabel, activeTab === tab.key && styles.tabLabelActive]}>{tab.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 40,
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  logoImage: {
    width: 64,
    height: 48,
    borderRadius: 16,
    resizeMode: 'cover',
    borderWidth: 1,
    borderColor: Colors.light.accent,
  },
  mainArea: {
    flex: 1,
    backgroundColor: Colors.light.metallicDarkGrey,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#23272A',
    fontFamily: 'SpaceMono',
    marginBottom: 16,
  },
  tabContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    fontSize: 16,
    color: '#7B8A8B',
    fontFamily: 'SpaceMono',
  },
  tabBar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: Colors.light.accent,
    backgroundColor: Colors.light.background,
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 8,
  },
  tabButtonActive: {
    backgroundColor: '#F8EAEA',
  },
  tabLabel: {
    color: Colors.light.accent,
    fontFamily: 'SpaceMono',
    fontSize: 14,
    fontWeight: 'bold',
  },
  tabLabelActive: {
    color: '#fff',
    backgroundColor: Colors.light.accent,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },
  topDivider: {
    height: 2,
    backgroundColor: Colors.light.accent,
    width: '100%',
    alignSelf: 'center',
    marginBottom: 0,
  },
  createButton: {
    marginTop: 24,
    backgroundColor: Colors.light.accent,
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 32,
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
    fontSize: 16,
    fontFamily: 'SpaceMono',
    letterSpacing: 1,
  },
}); 