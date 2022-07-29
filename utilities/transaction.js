import { db } from "../config/database";

export const getTx = () => {
  let result;
  return new Promise((resolve, reject) => {
    try {
      db.transaction((tx) => {
        tx.executeSql(
          `SELECT amount, type, description, date FROM transactions ORDER BY id DESC`,
          [],
          (sqlTx, { rows }) => {
            result = JSON.stringify(rows._array);
            console.log(
              "🚀 ~ file: transaction.js ~ line 12 ~ db.transaction ~ result",
              result
            );
            resolve(result);
          }
        );
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
  // return result;
};
