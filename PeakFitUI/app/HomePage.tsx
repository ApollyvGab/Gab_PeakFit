import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Feather } from '@expo/vector-icons';
type FeatherIconName = keyof typeof Feather.glyphMap;

const tabs: { key: string; label: string; icon: FeatherIconName }[] = [
  { key: 'fitness', label: 'My Fitness', icon: 'activity' },
  { key: 'trainer', label: 'My Trainer', icon: 'user-check' },
  { key: 'inbox', label: 'Inbox', icon: 'mail' },
  { key: 'profile', label: 'Profile', icon: 'user' },
];

export default function HomePage() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState('fitness');
  const [hasFitnessPlan, setHasFitnessPlan] = useState(false);
  const [loadingInbox, setLoadingInbox] = useState(true);
  const [openMessage, setOpenMessage] = useState<null | 'welcome' | 'plan'>(null);
  const [readMessages, setReadMessages] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    if (params.tab && typeof params.tab === 'string') {
      setActiveTab(params.tab);
    }
  }, [params.tab]);

  useEffect(() => {
    AsyncStorage.getItem('hasFitnessPlan').then(val => {
      setHasFitnessPlan(val === 'true');
      setLoadingInbox(false);
    });
  }, []);

  // Load readMessages from AsyncStorage on mount
  useEffect(() => {
    AsyncStorage.getItem('readMessages').then(val => {
      if (val) {
        try {
          setReadMessages(JSON.parse(val));
        } catch {}
      }
    });
  }, []);

  // Save readMessages to AsyncStorage whenever it changes
  useEffect(() => {
    AsyncStorage.setItem('readMessages', JSON.stringify(readMessages));
  }, [readMessages]);

  return (
    <View style={styles.container}>
      {/* Top Bar with Logo */}
      <View style={styles.topBar}>
        <Image source={require('@/assets/images/PeakFit Logo.png')} style={styles.logoImage} />
        <View style={{ flex: 1 }} />
        <TouchableOpacity style={styles.settingsButton}>
          <Feather name="settings" size={28} color="#fff" />
        </TouchableOpacity>
      </View>
      {/* Main Content with dark background */}
      <View style={styles.mainArea}>
        <View style={styles.content}>
            {activeTab === 'inbox' ? (
              <View style={styles.inboxContainer}>
                {openMessage === null ? (
                  <>
                    <Text style={[styles.pageTitle, styles.inboxTitleTop]}>Inbox</Text>
                    {loadingInbox ? (
                      <Text style={styles.inboxPreview}>Loading...</Text>
                    ) : (
                      <>
                        {hasFitnessPlan && (
                          <TouchableOpacity
                            style={styles.inboxItem}
                            activeOpacity={0.8}
                            onPress={() => {
                              setOpenMessage('plan');
                              setReadMessages(prev => ({ ...prev, plan: true }));
                            }}
                          >
                            <View style={styles.inboxRow}>
                              <View style={[styles.unreadDot, readMessages['plan'] ? styles.readDot : styles.unreadDotActive]} />
                              <Text style={[styles.inboxTitle, !readMessages['plan'] && styles.inboxTitleUnread]}>Sample Fitness Plan</Text>
                            </View>
                            <Text style={styles.inboxDate}>Received: June 1, 2024, 10:30 AM</Text>
                            <Text style={styles.inboxPreview}>Here is your personalized fitness plan.</Text>
                          </TouchableOpacity>
                        )}
                        <TouchableOpacity
                          style={styles.inboxItem}
                          activeOpacity={0.8}
                          onPress={() => {
                            setOpenMessage('welcome');
                            setReadMessages(prev => ({ ...prev, welcome: true }));
                          }}
                        >
                          <View style={styles.inboxRow}>
                            <View style={[styles.unreadDot, readMessages['welcome'] ? styles.readDot : styles.unreadDotActive]} />
                            <Text style={[styles.inboxTitle, !readMessages['welcome'] && styles.inboxTitleUnread]}>Welcome to PeakFit</Text>
                          </View>
                          <Text style={styles.inboxDate}>Received: June 1, 2024, 09:00 AM</Text>
                          <Text style={styles.inboxPreview}>We're excited to have you on board! Start your fitness journey...</Text>
                        </TouchableOpacity>
                      </>
                    )}
                  </>
                ) : (
                  <View style={styles.messageView}>
                    <View style={styles.messageHeader}>
                      <TouchableOpacity style={styles.messageBackBtn} onPress={() => setOpenMessage(null)}>
                        <Feather name="chevron-left" size={28} color={Colors.light.accent} />
                      </TouchableOpacity>
                      <Text style={styles.messageTitle}>
                        {openMessage === 'plan' ? 'Sample Fitness Plan' : 'Welcome to PeakFit'}
                      </Text>
                    </View>
                    <View style={styles.messageContent}>
                      {openMessage === 'plan' ? (
                        <>
                          <Text style={styles.inboxDate}>Received: June 1, 2024, 10:30 AM</Text>
                          <Text style={styles.messageBody}>Here is your personalized fitness plan. You can view it on your My Fitness Page.</Text>
                        </>
                      ) : (
                        <>
                          <Text style={styles.inboxDate}>Received: June 1, 2024, 09:00 AM</Text>
                          <Text style={styles.messageBody}>We're excited to have you on board! Start your fitness journey with personalized plans and support from our team. If you have any questions, feel free to reach out. Welcome to the PeakFit family!</Text>
                        </>
                      )}
                    </View>
                  </View>
                )}
              </View>
            ) : (
              <>
                <Text style={styles.pageTitle}>{tabs.find(t => t.key === activeTab)?.label}</Text>
                <View style={styles.tabContent}>
                  {activeTab === 'fitness' && !hasFitnessPlan ? (
                    <>
                      <Text style={styles.tabText}>Nothing here for now</Text>
                      <TouchableOpacity style={styles.createButton} onPress={() => router.push('/CreateFitnessPlan')}>
                        <Text style={styles.createButtonText}>Create Fitness Plan</Text>
                      </TouchableOpacity>
                    </>
                  ) : null}
                  {activeTab === 'fitness' && hasFitnessPlan ? (
                    <View style={styles.fitnessDashboard}>
                      <TouchableOpacity style={styles.fitnessCard} activeOpacity={0.85} onPress={() => router.push('/FitnessPlanView')}>
                        <Feather name="calendar" size={32} color={Colors.light.accent} style={{ marginRight: 12 }} />
                        <View>
                          <Text style={styles.fitnessCardTitle}>Fitness Plan</Text>
                          <Text style={styles.fitnessCardDesc}>View your Fitness Plan</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.fitnessCard} activeOpacity={0.85}>
                        <Feather name="activity" size={32} color={Colors.light.accent} style={{ marginRight: 12 }} />
                        <View>
                          <Text style={styles.fitnessCardTitle}>Start Workout Session</Text>
                          <Text style={styles.fitnessCardDesc}>Start and Log your gym session</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.fitnessCard} activeOpacity={0.85}>
                        <Feather name="bar-chart-2" size={32} color={Colors.light.accent} style={{ marginRight: 12 }} />
                        <View>
                          <Text style={styles.fitnessCardTitle}>Fitness Stats</Text>
                          <Text style={styles.fitnessCardDesc}>View your Fitness Stats</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.fitnessCard} activeOpacity={0.85}>
                        <Feather name="clipboard" size={32} color={Colors.light.accent} style={{ marginRight: 12 }} />
                        <View>
                          <Text style={styles.fitnessCardTitle}>Update Progress</Text>
                          <Text style={styles.fitnessCardDesc}>
                            {`Upgrade your Fitness Progress
for Tracking`}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  ) : null}
                </View>
              </>
            )}
          </View>
      </View>
      {/* Bottom Tab Bar */}
      <View style={styles.tabBar}>
        {tabs.map(tab => {
          // Determine if this is the Inbox tab and if there are unread messages
          let showBadge = false;
          if (tab.key === 'inbox') {
            showBadge = !readMessages['welcome'] || (hasFitnessPlan && !readMessages['plan']);
          }
          return (
            <TouchableOpacity
              key={tab.key}
              style={[styles.tabButton, activeTab === tab.key && styles.tabButtonActive]}
              onPress={() => setActiveTab(tab.key)}
            >
              <View style={{ position: 'relative', alignItems: 'center' }}>
                <Feather
                  name={tab.icon}
                  size={24}
                  color={activeTab === tab.key ? '#fff' : '#BFC5CA'}
                  style={{ marginBottom: 4 }}
                />
                {showBadge && (
                  <View style={styles.tabBadge} />
                )}
              </View>
              <Text style={[styles.tabLabel, activeTab === tab.key && styles.tabLabelActive]}>{tab.label}</Text>
            </TouchableOpacity>
          );
        })}
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
    justifyContent: 'flex-start',
    marginTop: 40,
    marginBottom: 0,
    paddingHorizontal: 16,
    paddingVertical: 10, // increase vertical coverage
    minHeight: 80, // ensure minimum height
    backgroundColor: '#343A40', // match CreateFitnessPlan and bottom tab bar
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
    backgroundColor: '#23272A', // subtle bg for contrast if needed
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
    backgroundColor: '#343A40', // match CreateFitnessPlan top bar
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
    backgroundColor: 'rgba(255,255,255,0.08)', // subtle highlight on dark bg
  },
  tabLabel: {
    color: '#BFC5CA', // muted light gray for inactive
    fontFamily: 'SpaceMono',
    fontSize: 14,
    fontWeight: 'bold',
  },
  tabLabelActive: {
    color: '#fff', // white for active
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
  settingsButton: {
    padding: 8,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inboxItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginVertical: 12,
    alignItems: 'flex-start',
    width: 300,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#343A40',
  },
  inboxTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.accent,
    marginBottom: 6,
    fontFamily: 'SpaceMono',
  },
  inboxDate: {
    fontSize: 14,
    color: '#7B8A8B',
    fontFamily: 'SpaceMono',
  },
  inboxPreview: {
    fontSize: 15,
    color: '#23272A',
    fontFamily: 'SpaceMono',
    marginTop: 2,
  },
  inboxContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 0,
  },
  inboxTitleTop: {
    marginTop: 24,
  },
  messageView: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 56,
  },
  messageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    width: '90%',
    position: 'relative',
    justifyContent: 'center',
  },
  messageBackBtn: {
    position: 'absolute',
    left: 0,
    padding: 4,
    borderRadius: 20,
    zIndex: 1,
  },
  messageTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.light.accent,
    fontFamily: 'SpaceMono',
    textAlign: 'center',
    flex: 1,
  },
  messageContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: 300,
    borderWidth: 1,
    borderColor: '#343A40',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  messageBody: {
    fontSize: 16,
    color: '#23272A',
    fontFamily: 'SpaceMono',
    marginTop: 8,
  },
  inboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  unreadDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: '#D3D4DB', // default gray
  },
  unreadDotActive: {
    backgroundColor: Colors.light.accent,
  },
  readDot: {
    backgroundColor: '#D3D4DB',
  },
  inboxTitleUnread: {
    fontWeight: 'bold',
    color: Colors.light.accent,
  },
  tabBadge: {
    position: 'absolute',
    top: -2,
    right: -8,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#C0392B', // red badge
    borderWidth: 2,
    borderColor: '#343A40',
    zIndex: 2,
  },
  fitnessDashboard: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  fitnessCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6FAF1',
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: Colors.light.accent,
    paddingVertical: 18,
    paddingHorizontal: 20,
    marginVertical: 12,
    width: 320,
    shadowColor: Colors.light.accent,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 1,
  },
  fitnessCardTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: Colors.light.accent,
    fontFamily: 'SpaceMono',
    marginBottom: 2,
  },
  fitnessCardDesc: {
    fontSize: 15,
    color: '#23272A',
    fontFamily: 'SpaceMono',
    opacity: 0.8,
  },
});   