import bcrypt from 'bcryptjs';

export const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
};

export const verifyPassword = async (password, hash) => {
    return await bcrypt.compare(password, hash)
};