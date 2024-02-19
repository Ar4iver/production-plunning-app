import { ResolveOptions } from 'webpack'
import { BuildOptions } from './types/config'

/**
 * ResolveOptions - тип для reolvers webpack
 *
 */

export function buildResolvers(options: BuildOptions): ResolveOptions {
	return {
		extensions: ['.tsx', '.ts', '.js'],
		preferAbsolute: true,
		modules: [options.paths.src, 'node_modules'],
		mainFiles: ['index'],
		alias: {
			'': options.paths.src,
		},
	}
}
