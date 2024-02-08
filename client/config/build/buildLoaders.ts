import webpack from 'webpack'
import { BuildOptions } from './types/config'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

/**
 * webpack.RuleSetRule[] - особый тип для типизации лоадеров webpack
 */

export function buildLoaders({ isDev }: BuildOptions): webpack.RuleSetRule[] {
	const cssLoaders = {
		test: /\.(sa|sc|c)ss$/i,
		use: [
			isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
			{
				loader: 'css-loader',
				options: {
					modules: {
						auto: (resPath: string) =>
							Boolean(resPath.includes('.module.')),
						localIdentName: isDev
							? '[path][name]__[local]--[hash:base64:8]'
							: '[hash:base64:8]',
					},
				},
			},
			'postcss-loader',
			'sass-loader',
		],
	}

	const typecriptLoader = {
		test: /\.tsx?$/,
		use: 'ts-loader',
		exclude: /node_modules/,
	}

	return [typecriptLoader, cssLoaders]
}
