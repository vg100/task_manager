import React, { useState } from 'react';
import { 
  SafeAreaView, 
  View, 
  Text, 
  TouchableOpacity, 
  TextInput, 
  StyleSheet, 
  Alert 
} from 'react-native';
import { useDispatch } from 'react-redux';
import { TaskRepo } from '../services/taskRepository';

const TaskDetailsScreen = ({ route, navigation }) => {
  const { task } = route.params;
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const dispatch = useDispatch();

  const handleDelete = () => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          onPress: () => {
            dispatch(TaskRepo.deleteTask(task?._id));
            navigation.goBack();
          },
        },
      ]
    );
  };

  const handleUpdate = () => {
    dispatch(TaskRepo.updateTask({ taskId: task?._id, title, description }));
    setIsEditing(false);
    navigation.goBack();
  };

  if (!task) return null;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Task Details</Text>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.content}>
        {isEditing ? (
          <View style={styles.editContainer}>
            <Text style={styles.inputLabel}>Title</Text>
            <TextInput
              value={title}
              onChangeText={setTitle}
              style={styles.input}
              autoFocus
            />
            
            <Text style={styles.inputLabel}>Description</Text>
            <TextInput
              value={description}
              onChangeText={setDescription}
              multiline
              style={[styles.input, styles.descriptionInput]}
            />
            
            <View style={styles.editButtons}>
              <TouchableOpacity 
                style={styles.cancelButton}
                onPress={() => setIsEditing(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.saveButton}
                onPress={handleUpdate}
              >
                <Text style={styles.saveButtonText}>Save Changes</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.detailsContainer}>
            <View style={styles.detailsCard}>
              <Text style={styles.title}>{task.title}</Text>
              <Text style={styles.description}>{task.description}</Text>
            </View>
            
            <View style={styles.actionButtons}>
              <TouchableOpacity 
                style={styles.editButton}
                onPress={() => setIsEditing(true)}
              >
                <Text style={styles.buttonText}>Edit Task</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.deleteButton}
                onPress={handleDelete}
              >
                <Text style={styles.buttonText}>Delete Task</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
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
  detailsCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  actionButtons: {
    gap: 12,
  },
  editButton: {
    backgroundColor: '#2196F3',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#DC3545',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  editContainer: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  descriptionInput: {
    height: 120,
    textAlignVertical: 'top',
  },
  editButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#EEE',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '500',
  },
  saveButton: {
    flex: 2,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default TaskDetailsScreen;