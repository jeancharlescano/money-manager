import { useFocusEffect } from "@react-navigation/native";
import React, { useState, useCallback } from "react";
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
import { getTx } from "../utilities/transaction";
import { db } from "../config/database";

export const Home = ({ navigation }) => {
  const [operations, setOperations] = useState([]);
  const [balance, setBalance] = useState();
  let incrBalance = 0;

  const goToAddTransaction = () => {
    console.log("travelling");
    navigation.navigate("Transaction");
  };

  const init = async () => {
    const datas = await getTx();

    for (const data of datas) {
      console.log(data.amount);
      data.tx_type === 0
        ? (incrBalance = incrBalance - data.amount)
        : (incrBalance = incrBalance + data.amount);
    }

    console.log(
      "🚀 ~ file: Home.js ~ line 33 ~ init ~ incrBalance",
      incrBalance
    );
    setOperations(datas);
    setBalance(incrBalance);
  };

  const deleteTx = () => {
    db.transaction((tx) => {
      tx.executeSql("DELETE FROM transactions"),
        (req, res) => {
          const results = res.rows;
          setOperations(results);
          console.log(operations);
        },
        (error) => console.log(error);
    });
  };

  useFocusEffect(
    useCallback(() => {
      init();
      // deleteTx();
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.balanceContainer}>
        <Text style={styles.balance}>{balance} €</Text>
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
        {operations.map((operation) => (
          <Transaction transaction={operation} />
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
