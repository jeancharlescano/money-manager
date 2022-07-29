import React, { useEffect, useState } from "react";

import {
  FlatList,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  ScrollView,
  Dimensions,
} from "react-native";

import { Transaction } from "../components/Transaction";
import { db } from "../config/database";
import { getTx } from "../utilities/transaction";

export const Home = ({ navigation }) => {
  let data = [];
  const balance = "999,99";
  const [operations, setOperations] = useState([]);

  const init = async () => {
    data = await getTx();
    console.log("🚀 ~ file: Home.js ~ line 25 ~ init ~ data", data);
  };

  const loadTransaction = () => {
    return data.map((operation) => <Transaction name={operation} />);
    // let result;

    // for (const transaction of data) {
    //   result = <Transaction name={transaction} />;
    //   return result;
    // }
  };

  useEffect(() => {
    init();
  }, []);

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

  const goToAddTransaction = () => {
    console.log("travelling");
    navigation.navigate("Transaction");
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
            goToAddTransaction();
          }}
        >
          <Text style={styles.txtTransaction}>transaction</Text>
        </Pressable>
      </View>
      <ScrollView style={styles.list}>{loadTransaction()}</ScrollView>
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
