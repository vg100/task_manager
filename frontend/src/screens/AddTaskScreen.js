import React, { useState } from 'react';
import { 
  SafeAreaView, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet 
} from 'react-native';
import { useDispatch } from 'react-redux';
import { TaskRepo } from '../services/taskRepository';

const AddTaskScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(TaskRepo.createTask({ title, description }));
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Task</Text>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.content}>
        <View style={styles.formCard}>
          <Text style={styles.inputLabel}>Task Title</Text>
          <TextInput
            placeholder="Enter task title"
            placeholderTextColor="#999"
            value={title}
            onChangeText={setTitle}
            style={styles.input}
            autoFocus
          />

          <Text style={styles.inputLabel}>Description</Text>
          <TextInput
            placeholder="Enter task description"
            placeholderTextColor="#999"
            value={description}
            onChangeText={setDescription}
            multiline
            style={[styles.input, styles.descriptionInput]}
          />

          <TouchableOpacity 
            style={styles.submitButton}
            onPress={handleSubmit}
            disabled={!title.trim()}
          >
            <Text style={styles.submitButtonText}>Create Task</Text>
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
  },
  headerSpacer: {
    width: 60,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  formCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
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
    marginTop: 12,
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
  descriptionInput: {
    height: 120,
    textAlignVertical: 'top',
    lineHeight: 24,
  },
  submitButton: {
    backgroundColor: '#2196F3',
    borderRadius: 8,
    padding: 18,
    marginTop: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AddTaskScreen;