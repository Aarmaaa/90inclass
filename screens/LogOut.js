import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity } from "react-native"
import firebase from 'firebase'

export default class LogOut extends React.Component{

    componentDidMount(){
        firebase.auth().signOut()
    }

    render(){
        return(
            <View>
                <Text> Log Out </Text>
            </View>
        )
    }
}