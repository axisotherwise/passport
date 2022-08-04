import database from "../database/index.js";
import * as t from "../queries/transaction-query.js";

const transaction = async () => {
  await database.query(t.transaction);
};

const commit = async () => {
  await database.query(t.commit);
};

const rollback = async () => {
  await database.query(t.rollback);
};

export {
  transaction,
  commit,
  rollback,
};