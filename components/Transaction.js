import { StyleSheet, Text, View, Pressable } from "react-native";

export const Transaction = ({ transaction }) => {
  return (
    <View style={styles.transactionListContainer}>
      <Text style={styles.dateTxt}>{transaction.date}</Text>
      <View style={styles.transacDesc}>
        {transaction.is_earning === true ? (
          <>
            <Text style={[styles.priceTxt, { color: "green" }]}>
              {transaction.amount} €
            </Text>
          </>
        ) : (
          <>
            <Text style={[styles.priceTxt, { color: "red" }]}>
              {transaction.amount} €
            </Text>
          </>
        )}
        <Text style={styles.transacTxt}>{transaction.description}</Text>
      </View>
      <Text style={styles.transacType}>{transaction.payment_type}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  transactionListContainer: {
    width: 380,
    height: 70,
    justifyContent: "space-between",
  },

  dateTxt: {
    fontSize: 13,
    fontWeight: "bold",
  },

  transacDesc: {
    flexDirection: "row",
  },

  priceTxt: {
    fontSize: 15,
    fontWeight: "bold",
    paddingLeft: 20,
    paddingRight: 70,
    color: "red",
  },

  transacTxt: {
    fontSize: 11,
    fontWeight: "normal",
  },

  transacType: {
    color: "#5E5E5E",
    fontSize: 11,
    textAlign: "right",
  },
});
