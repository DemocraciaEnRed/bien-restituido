import path from 'path'

/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        config.resolve.alias["handlebars"] = path.resolve("./node_modules/handlebars/dist/handlebars");
        return config;
    },

};

export default nextConfig;
