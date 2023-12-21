import 'dotenv/config';

export const isProd = process.env.NODE_ENV === 'production';
export const isDev = !isProd;

enum Keys {}

class Env {
  static load() {
    Object.values(Keys).forEach((key) => {
      if (process.env[key] === undefined) {
        throw new Error(`Missing env key ${key}`);
      }
    });
  }
}

export { Env };
