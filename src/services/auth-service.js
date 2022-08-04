import database from "../database/index.js";
import * as authQuery from "../queries/auth-query.js";

const readUser = async (email) => {
  try {
    const [ user ] = await database.query(authQuery.readQuery, [ email ]);
    return user;
  } catch (err) {
    console.error(err);
    throw Error(err);
  }
};

const createAuth = async (email, password, gender) => {
  try {
    const [ user ] = await database.query(authQuery.createAuthQuery, [ email, password, gender ]);
    return user;
  } catch (err) {
    console.error(err);
    throw Error(err);
  }
};

const createAuthDetail = async (address, userId) => {
  try { 
    const [ user ] = await database.query(authQuery.createAuthDetail, [ address, userId ]);
    return user;
  } catch (err) {
    console.error(err);
    throw Error(err);
  }
};

export {
  readUser,
  createAuth,
  createAuthDetail,
};