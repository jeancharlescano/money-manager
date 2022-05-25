import { StyleSheet, Text, View, SafeAreaView } from "react-native";

export const Home = () => {
  return <SafeAreaView style={styles.container}>Home</SafeAreaView>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});
