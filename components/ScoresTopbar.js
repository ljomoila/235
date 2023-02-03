import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button, Modal } from 'react-native';

export const getDateStr = (index) => {
  let date = new Date();
  date.setDate(date.getDate() + (index || 0));

  return formatDate(date);
};

const formatDate = (date) => {
  return date.toISOString().split('T')[0];
};

const formReadableDate = (date) => {
  return date;
};

const isToday = (date) => {
  return new Date().toDateString() == date.toDateString();
};

export const ScoresTopbar = ({ currentDateIndex, setDate }) => {
  const [dateIndex, setDateIndex] = useState(currentDateIndex);

  const onButtonPress = (i) => {
    const newIndex = dateIndex + i;
    setDateIndex(newIndex);
    setDate(newIndex);
  };

  return (
    <View
      style={{
        display: 'flex',
        position: 'absolute',
        width: '100%',
        zIndex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5
      }}
    >
      <Button title="Back" onPress={() => onButtonPress(-1)} />
      <Text style={{ color: 'white' }}>{getDateStr(dateIndex)}</Text>
      <Button title="Forward" onPress={() => onButtonPress(1)} />
    </View>
  );
};
