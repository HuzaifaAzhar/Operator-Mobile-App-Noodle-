// screens/UpdateUserScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import axios from 'axios';

const UpdateUserScreen = ({ route, navigation }) => {
  const { user } = route.params;
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const updateUser = async () => {
    try {
      await axios.put(`http://192.168.0.104:3000/user/${user.id}`, { name, email });
      navigation.navigate('HomeList');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <Text>Name</Text>
      <TextInput value={name} onChangeText={setName} />
      <Text>Email</Text>
      <TextInput value={email} onChangeText={setEmail} />
      <Button title="Update User" onPress={updateUser} />
    </View>
  );
};

export default UpdateUserScreen;
