// screens/HomeList.js (assuming this is your Home screen component)
import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';

const HomeList = ({ navigation }) => {
  const [users, setUsers] = useState([]);

  // Function to fetch users
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://192.168.0.104:3000/users'); // Use your server's IP
      setUsers(response.data);
    } catch (error) {
      console.error('Axios Error:', error);
    }
  };

  // Fetch users on component mount and whenever the screen is focused
  useEffect(() => {
    fetchUsers(); // Fetch users on component mount
  }, []);

  // Use useFocusEffect to refetch users whenever the screen gains focus
  useFocusEffect(
    React.useCallback(() => {
      fetchUsers(); // Fetch users whenever screen gains focus
    }, [])
  );

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://192.168.0.104:3000/user/${id}`); // Use your server's IP
      fetchUsers(); // After deletion, fetch updated user list
    } catch (error) {
      console.error('Axios Error:', error);
    }
  };

  return (
    <View>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name} - {item.email}</Text>
            <Button title="Delete" onPress={() => deleteUser(item.id)} />
            {/* Optional: Add update button */}
            <Button title="Update" onPress={() => navigation.navigate('UpdateUser', { user: item })} />
          </View>
        )}
      />
    </View>
  );
};

export default HomeList;
