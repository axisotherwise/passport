const readQuery = `
  SELECT 
    email, password
  FROM user
  WHERE email = ?
`;

const createAuthQuery = `
  INSERT INTO 
    user
    (email, password, gender_flag)
  VALUES
    (?, ?, ?)
`;

const createAuthDetail = `
  INSERT INTO
    user_detail
    (address, fk_user_id)
  VALUES  
    (?, ?)
`;


export {
  readQuery,
  createAuthQuery,
  createAuthDetail,
};