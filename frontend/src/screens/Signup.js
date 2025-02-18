import React, { useState } from 'react';
import { 
  SafeAreaView, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet,
  Alert
} from 'react-native';
import { useDispatch } from 'react-redux';
import { AuthRepo } from '../services/authRepository';

const SignupScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    if (!name || !email || !password) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    
    await dispatch(AuthRepo.signup({ name, email, password }));
    Alert.alert('Success', 'Registration successful! Please login.');
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      

      <View style={styles.content}>
      <Text style={styles.headerTitle}>Welcome To task Management</Text>
        <View style={styles.formCard}>
          <Text style={styles.inputLabel}>Full Name</Text>
          <TextInput
            placeholder="Enter your full name"
            placeholderTextColor="#999"
            value={name}
            onChangeText={setName}
            style={styles.input}
            autoCapitalize="words"
          />

          <Text style={styles.inputLabel}>Email Address</Text>
          <TextInput
            placeholder="Enter your email"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <Text style={styles.inputLabel}>Password</Text>
          <TextInput
            placeholder="Create a password"
            placeholderTextColor="#999"
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            secureTextEntry
          />

          <TouchableOpacity 
            style={[styles.submitButton, (!name || !email || !password) && styles.disabledButton]}
            onPress={handleSignup}
            disabled={!name || !email || !password}
          >
            <Text style={styles.submitButtonText}>Sign Up</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => navigation.navigate('Login')}
            style={styles.loginLink}
          >
            <Text style={styles.loginLinkText}>
              Already have an account? <Text style={styles.loginLinkHighlight}>Log in</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    backgroundColor: 'white',
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    color: '#2196F3',
    fontSize: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    margin:10,
    alignSelf:'center'
  },
  headerSpacer: {
    width: 60,
  },
  content: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  formCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#EEE',
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    color: '#333',
  },
  submitButton: {
    backgroundColor: '#2196F3',
    borderRadius: 8,
    padding: 18,
    marginTop: 32,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  disabledButton: {
    backgroundColor: '#9E9E9E',
  },
  loginLink: {
    marginTop: 24,
    alignItems: 'center',
  },
  loginLinkText: {
    color: '#666',
    fontSize: 14,
  },
  loginLinkHighlight: {
    color: '#2196F3',
    fontWeight: '500',
  },
});

export default SignupScreen;