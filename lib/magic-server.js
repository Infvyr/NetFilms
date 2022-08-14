import { Magic } from '@magic-sdk/admin';

export const magicAdmin = new Magic(process.env.MAGIC_SERVER_SECRET_API_KEY);
