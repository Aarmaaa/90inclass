import React from "react";
import { StyleSheet } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";
import firebase from "firebase";

import Feed from "../screens/Feed";
import CreateStory from "../screens/CreateStory";
const Tab = createMaterialBottomTabNavigator();

export default class BottomTabNavigator extends React.Component {

    constructor(props){
      super(props)
      this.state={
        light_theme: true,
        isUpdated: false
      }
    }

  componentDidMount(){
    var theme;
    firebase.database().ref('/user/'+ firebase.auth().currentUser.uid).on("value", function(data){
      theme = data.val().current_theme
    })

    this.setState({
      light_theme: theme === "light" ? true : false
    })
  }

  changeUpdated = ()=> {
    this.setState({
      isUpdated: true
    })
  }

  removeUpdated = ()=> {
    this.setState({
      isUpdated: false
    })
  }
  //Story did not update
  renderFeed = (props)=> {
    return <Feed setUpdateToFalse={this.removeUpdated} {...props}/>
  }

    //Story did update
    renderStory = (props)=> {
      return <CreateStory setUpdateToTrue={this.changeUpdated} {...props}/>
    }

  render(){
    return (
      <Tab.Navigator
        labeled={false}
        barStyle={styles.bottomTabStyle}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Feed") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Create Story") {
              iconName = focused ? "add-circle" : "add-circle-outline";
            }
            return (
              <Ionicons
                name={iconName}
                size={RFValue(25)}
                color={color}
                style={styles.icons}
              />
            );
          }
        })}
        activeColor={"#ee8249"}
        inactiveColor={"gray"}
      >
        <Tab.Screen name="Feed" component={Feed} options={{unmountOnBlur: true}} />
        <Tab.Screen name="Create Story" component={CreateStory} options={{unmountOnBlur: true}} />
      </Tab.Navigator>
    );
  };
}
const styles = StyleSheet.create({
  bottomTabStyle: {
    backgroundColor: "#2f345d",
    height: "8%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: "hidden",
    position: "absolute"
  },
  icons: {
    width: RFValue(30),
    height: RFValue(30)
  }
});

