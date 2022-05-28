
import {
    FlatList,
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Pressable,
    ScrollView,
  } from "react-native";
  import { Transaction } from "../components/Transaction";
  
  export default function Home({ navigation }) {
    const balance = "999,99";
  
    const addTransaction = () => {
      console.log("toto");
      navigation.navigate('Transaction');
    };
  
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.balanceContainer}>
          <Text style={styles.balance}>{balance} €</Text>
        </View>
        <View style={styles.btnContainer}>
          <Pressable
            style={[{ backgroundColor: "#e5e5e5" }, styles.transaction]}
            onPress={() => {
              addTransaction();
            }}
          >
            <Text style={styles.txtTransaction}>transaction</Text>
          </Pressable>
        </View>
        <ScrollView style={styles.list}>
          <Transaction />
          <Transaction />
          <Transaction />
          <Transaction />
          <Transaction />
          <Transaction />
          <Transaction />
          <Transaction />
          <Transaction />
          <Transaction />
          <Transaction />
          <Transaction />
          <Transaction />
          <Transaction />
          <Transaction />
          <Transaction />
          <Transaction />
          <Transaction />
        </ScrollView>
      </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#F2F2F2",
      alignItems: "center",
    },
  
    balanceContainer: {
      justifyContent: "center",
      alignItems: "center",
      width: 380,
      height: 200,
      backgroundColor: "#0093FE",
      borderColor: "white",
      borderWidth: 2,
      borderRadius: 35,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.45,
      shadowRadius: 6.27,
      elevation: 10,
      marginBottom: -26,
    },
  
    balance: {
      color: "#fff",
      fontSize: 40,
      fontWeight: "bold",
    },
  
    btnContainer: {
      width: 300,
      height: "auto",
      alignItems: "center",
      marginBottom: 30,
    },
  
    transaction: {
      height: 50,
      width: 200,
      justifyContent: "center",
      alignItems: "center",
      borderColor: "white",
      borderWidth: 2,
      borderRadius: 16,
  
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.45,
      shadowRadius: 6.27,
      elevation: 10,
    },
  
    txtTransaction: {
      color: "#000",
      fontWeight: "bold",
      fontSize: 20,
    },
  
    list: {
      height: "auto",
      width: "auto",
      paddingRight: 5,
    },
  });
  