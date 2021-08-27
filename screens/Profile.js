import React, { Component } from "react";
import { StyleSheet, Text, View, Platform, StatusBar, TouchableOpacity, SafeAreaView, Switch } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

import AppLoading from "expo-app-loading";
import * as Font from "expo-font";

let customFonts = {
  "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf")
};

export default class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      name: "",
      profile_image: "",
      light_theme: true,
      isThemeEnabled: false,
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  fetchUser = async () => {
    var theme, name, image ;
    await firebase.database.ref("/users/" + firebase.auth().currentUser.uid).on("value", function(data){
      theme=data.val().current_theme, 
      name = `${data.val().first_name} ${data.val().last_name}`
      image=data.val().profile_picture
    })
    

    this.setState({
      name:name,
      light_theme: theme === "light" ? true : false,
      profile_image: image,
      isThemeEnabled: theme === "light" ? false : true,
    })
  }

  toggleSwitch = () => {
    const previousState = this.state.isThemeEnabled
    const currentTheme = !this.state.isThemeEnabled ? "dark" : "light"
    var updates = {}
    updates["/user/" + firebase.auth().currentUser.uid + "/current_theme"] = currentTheme
    
    firebase.database().ref().update(updates)
    this.setState({
      isThemeEnabled: !previousState,
      light_theme: previousState
    })
  }

  render(){
    if (!this.state.fontsLoaded) {
      return <AppLoading />;
    } else{
        return(
          <View style={styles.container} >
            <SafeAreaView style={styles.safeArea } />
            
            <View style={styles.appTitle} >
              <Image
              source={require("../assets/logo.png")}
              style={styles.appIcon} />
            </View>
            
            <View style={styles.appTitleTextContainer} >
              <Text style={styles.appTitleText} > Story App </Text>
            </View>

            <View style={styles.screenContainer} >
              <View style={styles.profileContainer} >
                <Image style={styles.profileImg} source={{ uri: this.state.profile_image }} />
                <Text style={styles.nameText} > {this.state.name} </Text>
              </View>
              <View style={styles.themeContainer} >
                    <Text style={styles.themeText} >dark</Text>
                    <Switch
                    style={{transform:[{scaleX: 1.3 },{ scaleY: 1.3 }] }}
                    trackColor={{true: "white", false: "#767577"}}
                    thumbColor={this.state.isThemeEnabled ? "#ee8249" : "#f4f3f4" }
                    ios_backgroundColor="#3e3e3e"
                    value = {this.state.isThemeEnabled}
                    onValueChange={()=>{
                      this.toggleSwitch()
                    }}
                    />
              </View>
            </View>



          </View>
        )
    }
  }
}

const styles = StyleSheet.create({
  safeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
  },
  container: {
    flex: 1,
    backgroundColor: "#15193c"
  },
  appTitle: {
    flex: 0.4,
    justifyContent: "center",
    alignItems: "center"
  },
  appIcon: {
    width: RFValue(130),
    height: RFValue(130),
    resizeMode: "contain"
  },
  appTitleTextContainer: {
    flex: 0.7,
    justifyContent: 'center'
  },
  appTitleText: {
    color: 'white',
    fontSize: RFValue(28),
    fontFamily: 'Bubblegum-Sans'
  },
  screenContainer: {
    flex: 0.85
  },
  profileContainer: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  profileImg: {
    width: RFValue(140),
    height: RFValue(140),
    borderRadius: RFValue(70)
  },
  nameText: {
    color: "white",
    fontSize: RFValue(40),
    fontFamily: "Bubblegum-Sans",
    marginTop: RFValue(10)
  },
  themeContainer: {
    flex: 0.2,
    flexDirection: "row",
    justifyContent: "center",
    marginTop: RFValue(20)
  },
  themeText: {
    color: "white",
    fontSize: RFValue(30),
    fontFamily: "Bubblegum-Sans",
    marginRight: RFValue(15)
  }
})