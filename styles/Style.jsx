import React from "react";
import { StyleSheet } from 'react-native';

const s = StyleSheet.create({
    addressField: { 
        height: 50, 
        backgroundColor: '#F1F2F4',
        borderRadius: 8, 
        flex: 1, 
        alignItems: "flex-start", 
        justifyContent: "center", 
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 15,
        fontSize: 18, 
        color: "#626F84",
    },
    filterHorizontal: {
        height: 50, 
        width: 50, 
        marginLeft: 10, 
        backgroundColor: '#F1F2F4',
        borderRadius: 8, 
    },
    button: {
        height: 50, 
        backgroundColor: '#fff', 
        borderRadius: 100,
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center", 
        marginBottom: 10,
        borderColor: "#0D69F2", 
        borderWidth: 1, 
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 15,
        marginRight: 10,
        marginBottom: 10,
    },
    buttonActive: {
        backgroundColor: '#0D69F2'
    },
    buttonText: { 
        fontSize: 18, 
        color: "#2F3441",
    },
    activeButtonText: {
        color: "#fff",
    },
    containerCol: {
        padding: 20, 
        paddingTop: 0, 
        backgroundColor: '#fff',
        display: "flex", 
        flexDirection: 'row',
    },
    rowContainer: {
        padding: 20, 
        paddingTop: 0, 
        backgroundColor: '#fff',
        display: "flex", 
        flexDirection: 'row', 
        flexWrap: 'wrap',
    }, 
    defaultText: {
        fontSize: 18, 
        color: "#2F3441",
    },
    blueText: {
        fontSize: 18, 
        color: "#0D69F2",
    }
});

export default s;