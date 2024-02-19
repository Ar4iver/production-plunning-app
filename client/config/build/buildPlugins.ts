import path from 'path'
import webpack from 'webpack'
import HTMLWebpackPlugin from 'html-webpack-plugin'
import { BuildOptions } from './types/config'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import OptimizeCssAssetsPlugin from 'css-minimizer-webpack-plugin'
import { json } from 'stream/consumers'

/**
 * webpack.WebpackPluginInstance[] - особый тип для типизации плагинов webpack
 */

export function buildPlugins({
	paths,
	isDev,
	apiUrl,
}: BuildOptions): webpack.WebpackPluginInstance[] {
	return [
		new webpack.ProgressPlugin(),
		new HTMLWebpackPlugin({
			template: paths.html,
		}),
		new MiniCssExtractPlugin({
			filename: 'css/[name].[contenthash:8].css',
		}),
		new OptimizeCssAssetsPlugin(),
		new webpack.DefinePlugin({
			__IS_DEV__: JSON.stringify(isDev),
			__API__: JSON.stringify(apiUrl),
		}),
	]
}
