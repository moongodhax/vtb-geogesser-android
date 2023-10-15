import React from "react";
import { Text, View } from 'react-native';

export default function HeaderSmall({ children }) {
    return (
        <View style={{ backgroundColor: '#fff' }} >
            <Text style={{ fontSize: 18, color: "#626F84" }}>{ children }</Text>
        </View>
    );
}