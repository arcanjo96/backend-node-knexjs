import bcryptjs from 'bcryptjs';

export const hashPassowrd = async (password: string) => {
    return await bcryptjs.hash(password, 10);
}

export const comparePassword = async (password: string, hashedPassword: string) => {
    return await bcryptjs.compare(password, hashedPassword);
}