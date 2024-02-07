import webpack from 'webpack'

/**
 * webpack.RuleSetRule[] - особый тип для типизации лоадеров webpack
 */

export function buildLoaders(): webpack.RuleSetRule[] {
	const typecriptLoader = {
		test: /\.tsx?$/,
		use: 'ts-loader',
		exclude: /node_modules/,
	}

	return [typecriptLoader]
}
