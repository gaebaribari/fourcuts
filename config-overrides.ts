const webpack = require("webpack");
const { override } = require("customize-cra");

module.exports = override((config) => {
	config.resolve.fallback = {
		...config.resolve.fallback,
		util: require.resolve("util/"),
		stream: require.resolve("stream-browserify"),
		zlib: require.resolve("browserify-zlib"),
		assert: require.resolve("assert/"),
		buffer: require.resolve("buffer/"),
	};
	config.plugins.push(
		new webpack.ProvidePlugin({
			process: "process/browser",
			Buffer: ["buffer", "Buffer"],
		})
	);
	return config;
});
