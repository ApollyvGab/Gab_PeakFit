import React, { useState, useRef } from 'react';
import { StyleSheet, TouchableOpacity, Dimensions, View, ScrollView, Image, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';

const { width, height } = Dimensions.get('window');
const spartanRed = '#C0392B';
const mintGreen = '#E6FAF1';
const grayText = '#7B8A8B';

export default function HomeScreen() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);
  const images = [
    { key: 'logo', type: 'logo' },
    { key: 'img1', type: 'placeholder' },
    { key: 'img2', type: 'placeholder' },
  ];

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / width);
    setActiveIndex(index);
  };

  return (
    <View style={styles.bgContainer}>
      <View style={styles.centerContent}>
        {/* Swipeable Carousel */}
        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={styles.carousel}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          {images.map((img, idx) => (
            <View key={img.key} style={styles.imageSlide}>
              {img.type === 'logo' ? (
                <View style={styles.logoEllipse}>
                  <Image source={require('@/assets/images/PeakFit Logo.png')} style={styles.logoImage} />
                </View>
              ) : (
                <View style={styles.picturePlaceholder} />
              )}
            </View>
          ))}
        </ScrollView>
        {/* Dots Indicator */}
        <View style={styles.dotsContainer}>
          {images.map((_, idx) => (
            <View
              key={idx}
              style={[styles.dot, activeIndex === idx && styles.activeDot]}
            />
          ))}
        </View>
        {/* Welcome Title and Descriptions */}
        <ThemedText style={styles.welcomeText}>Welcome to PeakFit</ThemedText>
        <ThemedText style={styles.description}>
          Get ready to transform your Fitness Experience with PeakFit’s Personalized Fitness Plans.
        </ThemedText>
        <ThemedText style={styles.description}>
          Discover your peak potential now!
        </ThemedText>
      </View>
      {/* Start Button at Bottom */}
      <TouchableOpacity style={styles.startButton} onPress={() => router.push('/SignUp')}>
        <ThemedText style={styles.startButtonText}>START YOUR FITNESS JOURNEY</ThemedText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bgContainer: {
    flex: 1,
    backgroundColor: Colors.light.background,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  centerContent: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginTop: 40,
    marginBottom: 80,
  },
  carousel: {
    width: width,
    maxHeight: 220,
    marginBottom: 16,
  },
  imageSlide: {
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoEllipse: {
    width: width * 0.7,
    height: 160,
    backgroundColor: '#23272A',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 4,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 2,
    borderColor: Colors.light.accent,
  },
  logoPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#A7A9AC',
  },
  logoImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  picturePlaceholder: {
    width: width * 0.7,
    height: 160,
    borderRadius: 24,
    backgroundColor: '#D9D9D9',
    borderWidth: 2,
    borderColor: Colors.light.accent,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#C8E6D4',
    marginHorizontal: 4,
    opacity: 0.5,
  },
  activeDot: {
    opacity: 1,
    backgroundColor: spartanRed,
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: 'bold',
    fontFamily: 'SpaceMono',
    marginBottom: 12,
    color: '#23272A',
    textAlign: 'center',
    marginTop: 8,
  },
  description: {
    fontSize: 15,
    color: grayText,
    textAlign: 'center',
    marginBottom: 4,
    fontFamily: 'SpaceMono',
    fontWeight: '600',
  },
  startButton: {
    backgroundColor: spartanRed,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    width: '90%',
    maxWidth: 340,
    alignSelf: 'center',
    marginBottom: 32,
    shadowColor: spartanRed,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 2,
  },
  startButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'SpaceMono',
    letterSpacing: 1,
  },
});
