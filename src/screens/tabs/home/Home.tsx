import { Dimensions, Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'

const { height, width } = Dimensions.get("window");

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />

      <Text>Name</Text>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    backgroundColor: "red",
    paddingTop: Platform.OS === "android" ? height * 0.035 : null,
    paddingHorizontal: width * 0.035
  }
})