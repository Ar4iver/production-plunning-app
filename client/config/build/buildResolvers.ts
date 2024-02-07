import { ResolveOptions } from 'webpack'

/**
 * ResolveOptions - тип для reolvers webpack
 *
 */

export function buildResolvers(): ResolveOptions {
	return {
		extensions: ['.tsx', '.ts', '.js'],
	}
}
