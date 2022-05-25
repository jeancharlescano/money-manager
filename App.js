import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, Text, View, SafeAreaView, Pressable } from "react-native";
import dayjs from "dayjs";

export default function App() {
  const balance = "999,99";
  const transaction = {
    date: dayjs(),
    price: null,
    description: "",
    paymentType: "",
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.balanceContainer}>
        <Text style={styles.balance}>{balance} €</Text>
      </View>
      <View style={styles.btnContainer}>
        <Pressable
          style={[{ backgroundColor: "#FF0000" }, styles.transaction]}
          onPress={({ pressed }) => {
            console.log("toto");
          }}
        >
          <Text style={styles.txtTransaction}>payer</Text>
        </Pressable>
        <Pressable style={[{ backgroundColor: "#00FF47" }, styles.transaction]}>
          <Text style={styles.txtTransaction}>recevoir</Text>
        </Pressable>
      </View>
      <Text style={styles.btn}>
        Open up App.js to start working on your app!
      </Text>
      <StatusBar style="auto" />
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
    display: "flex",
    flexDirection: "row",
    width: 300,
    height: "auto",
    justifyContent: "space-between",
    marginBottom: 9,
  },

  transaction: {
    height: 50,
    width: 100,
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
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
});
