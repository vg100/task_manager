import React, { useState, useEffect } from 'react';
import { 
  SafeAreaView, 
  FlatList, 
  Text, 
  TouchableOpacity, 
  RefreshControl, 
  StyleSheet, 
  View, 
  ActivityIndicator 
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AuthRepo } from '../services/authRepository';
import { TaskRepo } from '../services/taskRepository';


const HomeScreen = ({ navigation }) => {
    const dispatch = useDispatch()
    const { task } = useSelector((state) => state.task || {});
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {
        setLoading(true);
        await dispatch(TaskRepo.gettask());
        setLoading(false);
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await dispatch(TaskRepo.gettask());
        setRefreshing(false);
    };

    const handleLogout = async () => {
        dispatch(AuthRepo.logout())
    };

    const TaskCard = ({ item }) => (
        <TouchableOpacity
            style={styles.taskCard}
            onPress={() => navigation.navigate('taskDetail', { task: item })}
        >
            <View style={styles.taskHeader}>
                <Text style={styles.taskTitle}>{item.title}</Text>
                <View style={[styles.statusIndicator]} />
            </View>
            <Text style={styles.taskDescription} numberOfLines={2}>{item.description}</Text>
          
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>My Tasks</Text>
                <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                    <Text>Logout</Text>
                </TouchableOpacity>
            </View>

            {loading ? (
                <ActivityIndicator size="large" color="#2196F3" style={styles.loader} />
            ) : (
                <FlatList
                    data={task}
                    keyExtractor={(item) => item?._id?.toString()}
                    refreshControl={
                        <RefreshControl 
                            refreshing={refreshing} 
                            onRefresh={onRefresh}
                            tintColor="#2196F3"
                        />
                    }
                    renderItem={({ item }) => <TaskCard item={item} />}
                    ListEmptyComponent={
                        <View style={styles.emptyState}>
                            {/* <Icon name="assignment" size={64} color="#999" /> */}
                            <Text style={styles.emptyText}>No tasks found</Text>
                        </View>
                    }
                    contentContainerStyle={styles.listContent}
                />
            )}

            <TouchableOpacity 
                style={styles.fab}
                onPress={() => navigation.navigate('addTask')}
            >
                <Text>Add Task</Text>
                {/* <Icon name="add" size={28} color="white" /> */}
            </TouchableOpacity>
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
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: '#333',
    },
    logoutButton: {
        padding: 8,
    },
    listContent: {
        padding: 16,
    },
    taskCard: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    taskHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    taskTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        flex: 1,
    },
    statusIndicator: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginLeft: 8,
    },
    taskDescription: {
        fontSize: 14,
        color: '#666',
        marginBottom: 12,
        lineHeight: 20,
    },
    taskFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dueDate: {
        fontSize: 12,
        color: '#999',
    },
    fab: {
        position: 'absolute',
        bottom: 24,
        right: 24,
        backgroundColor: '#2196F3',
        width: 80,
        height: 50,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
    },
    emptyText: {
        fontSize: 16,
        color: '#999',
        marginTop: 16,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default HomeScreen;