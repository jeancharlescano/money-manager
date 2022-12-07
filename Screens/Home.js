import { useFocusEffect } from "@react-navigation/native";
import React, { useState, useCallback, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  ScrollView,
  Dimensions,
} from "react-native";

import { Transaction } from "../components/Transaction";
import { getAllTx } from "../utilities/transaction";

export const Home = ({ navigation }) => {
  const [operations, setOperations] = useState([]);
  const [balance, setBalance] = useState();

  const goToAddTransaction = () => {
    navigation.navigate("Transaction");
  };

  const getAllTransactions = async () => {
    const transactions = await getAllTx();
    console.log("🚀 ~ file: Home.js:28 ~ getAllTransactions ~ transactions", transactions);
    let incrBalance = 0;
    for (const transaction of transactions) {
      console.log(transaction.amount);
      transaction.is_earning === false
        ? (incrBalance -= transaction.amount)
        : (incrBalance += transaction.amount);
    }
    setOperations(transactions);
    setBalance(incrBalance);
  };

  useFocusEffect(
    useCallback(() => {
      getAllTransactions();
    }, [])
  );
  // useEffect(() => {
  //   getAllTransactions();
  // }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.balanceContainer}>
        <Text style={styles.balance}>{Number(balance).toFixed(2)} €</Text>
      </View>
      <View style={styles.btnContainer}>
        <Pressable
          style={[{ backgroundColor: "#e5e5e5" }, styles.transaction]}
          onPress={() => {
            goToAddTransaction();
          }}
        >
          <Text style={styles.txtTransaction}>transaction</Text>
        </Pressable>
      </View>
      <ScrollView style={styles.list}>
        {operations.map((operation, key) => (
          <Transaction transaction={operation} key={key} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const size = {
  fullHeight: Dimensions.get("screen").height,
  fullWidth: Dimensions.get("screen").width,
};

const styles = StyleSheet.create({
  container: {
    height: size.fullHeight,
    width: size.fullWidth,
    flex: 1,
    backgroundColor: "#F2F2F2",
    alignItems: "center",
    paddingTop: 10,
  },

  balanceContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: size.fullWidth,
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
