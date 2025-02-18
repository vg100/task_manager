import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated, SafeAreaView } from 'react-native';

const SplashScreen = ({ navigation }) => {
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.8);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 4,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      })
    ]).start();

  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[
        styles.logoContainer,
        { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }
      ]}>
        <View style={styles.logoBackground}>
          <Text style={styles.logoText}>Task</Text>
          <Text style={styles.logoText}>Manager</Text>
        </View>
      </Animated.View>
      
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading Tasks...</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoBackground: {
    backgroundColor: '#2196F3',
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 2,
  },
  logoText: {
    fontSize: 32,
    fontWeight: '800',
    color: 'white',
    textAlign: 'center',
    letterSpacing: 1.2,
  },
  loadingContainer: {
    position: 'absolute',
    bottom: 40,
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
    letterSpacing: 0.5,
  },
});

export default SplashScreen;