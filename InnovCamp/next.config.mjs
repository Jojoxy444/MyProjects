import dotenv from "dotenv";

dotenv.config();

export default {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        dns: false,
      };
    }

    return config;
  },
  env: {
    ADDRESS: process.env.ADDRESS,
    PASSWORD: process.env.PASSWORD,
  },
};
