import dotenv from 'dotenv';

export const readEnviroment = () => {
  if(process.env.NODE_ENV !== 'production') {
    dotenv.config();
  }
};

export const DATABASE_TYPE: string     = process.env.DATABASE_TYPE as string;
export const DATABASE_HOST: string     = process.env.DATABASE_HOST as string;
export const DATABASE_PORT: string     = process.env.DATABASE_PORT as string;
export const DATABASE_USERNAME: string = process.env.DATABASE_USERNAME as string;
export const DATABASE_PASSEORD: string = process.env.DATABASE_PASSEORD as string;
export const DATABASE_DATABASE: string = process.env.DATABASE_DATABASE as string;
