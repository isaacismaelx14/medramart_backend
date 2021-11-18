import bcrypt from "bcrypt";

export const EncryptPassword = async (password: string) =>
    await bcrypt.hash(password, 10);
  
export const DecryptPassword = async (password: string, hash: string) =>
    await bcrypt.compare(password, hash);
