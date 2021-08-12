import type * as CSSUtil from './css-util'
import type * as Default from './default'
import type * as StyledComponent from './styled-component'
import type * as ThemeUtil from './theme'
import type * as Util from './util'

/** Stitches interface. */
export default interface Stitches<
	Prefix extends string = Default.Prefix,
	Media = Default.Media,
	Theme = {},
	ThemeMap = Default.ThemeMap,
	Utils = {},
	CSS extends { [prelude: string]: unknown } = CSSUtil.CSS<Media, Theme, ThemeMap, Utils>
> {
	config: {
		prefix: Prefix
		media: Media
		theme: Theme
		themeMap: ThemeMap
		utils: Utils
	},
	prefix: Prefix
	/** The **prefix** property defined.
	 *
	 * [Read Documentation](https://stitches.dev/docs/variants)
	 */
	globalCss: {
		(style: {
			[prelude: string]: CSS
		}): {
			(): string
		}
	},
	keyframes: {
		(style: {
			[offset: string]: CSS
		}): {
			(): string
			name: string
		}
	},
	createTheme: {
		<
			Argument0 extends (
				| string
				| (
					{
						[Scale in keyof Theme]?: {
							[Token in keyof Theme[Scale]]?: boolean | number | string
						}
					} & {
						[scale in string]: {
							[token in number | string]: boolean | number | string
						}
					}
				)
			),
			Argument1 extends (
				| string
				| (
					{
						[Scale in keyof Theme]?: {
							[Token in keyof Theme[Scale]]?: boolean | number | string
						}
					} & {
						[scale in string]: {
							[token in number | string]: boolean | number | string
						}
					}
				)
			)
		>(
			nameOrScalesArg0: Argument0,
			nameOrScalesArg1?: Argument1
		):
			& string
			& {
				className: string
				selector: string
			}
			& (
				Argument0 extends {}
					? ThemeTokens<Argument0, Prefix>
				: Argument1 extends {}
					? ThemeTokens<Argument1, Prefix>
				: {}
			)
	}
	theme: string & {
		[Scale in keyof Theme]: {
			[Token in keyof Theme[Scale]]: ThemeUtil.Token<
				Extract<Token, string | number>,
				string,
				Extract<Scale, string | void>,
				Extract<Prefix, string | void>
			>
		}
	}
	reset: {
		(): void
	}
	getCssText: {
		(): string
	},
	css: {
		<
			Composers extends (
				| string
				| React.ExoticComponent<any>
				| React.JSXElementConstructor<any>
				| Util.Function
				| { [name: string]: unknown }
			)[]
		>(
			...composers: {
				[K in keyof Composers]: (
					Composers[K] extends string
						? Composers[K]
					: Composers[K] extends React.ExoticComponent<any>
						? Composers[K]
					: Composers[K] extends React.JSXElementConstructor<any>
						? Composers[K]
					: Composers[K] extends Util.Function
						? Composers[K]
					: CSSUtil.CSS<Media, Theme, ThemeMap, Utils, true>  & (
							& {
								/** The **variants** property sets variants.
								 *
								 * [Read Documentation](https://stitches.dev/docs/variants)
								 */
								variants?: {
									[name: string]: {
										[pair in number | string]: CSS
									}
								}
								/** Compound variants. */
								compoundVariants?: (
									& (
										'variants' extends keyof Composers[K]
											? {
												[Name in keyof Composers[K]['variants']]?: Util.Widen<keyof Composers[K]['variants'][Name]> | Util.String
											} & Util.WideObject
										: Util.WideObject
									)
									& {
										css: CSS
									}
								)[]
								defaultVariants?: (
									'variants' extends keyof Composers[K]
										? {
											[Name in keyof Composers[K]['variants']]?: Util.Widen<keyof Composers[K]['variants'][Name]> | Util.String
										}
									: Util.WideObject
								)
							}
			
						) & {[K2 in keyof Composers[K]]:K2 extends 'variants' | 'defaultVariants' | 'compoundVariants' ? unknown : K2 extends keyof CSS ? CSS[K2] : unknown}
				)
			}
		): StyledComponent.CssComponent<
			StyledComponent.StyledComponentType<Composers>,
			StyledComponent.StyledComponentProps<Composers>,
			Media,
			CSS
		>
	},
	styled: {
		<
			Type extends (
				| string
				| React.ExoticComponent<any>
				| React.JSXElementConstructor<any>
				| Util.Function
			),
			Composers extends (
				| string
				| React.ExoticComponent<any>
				| React.JSXElementConstructor<any>
				| Util.Function
				| { [name: string]: unknown }
			)[]
		>(
			type: Type,
			...composers: {
				[K in keyof Composers]: (
					Composers[K] extends string
						? Composers[K]
					: Composers[K] extends React.ExoticComponent<any>
						? Composers[K]
					: Composers[K] extends React.JSXElementConstructor<any>
						? Composers[K]
					: Composers[K] extends Util.Function
						? Composers[K]
					: CSSUtil.CSS<Media, Theme, ThemeMap, Utils, true>  & (
							& {
								/** The **variants** property sets variants.
								 *
								 * [Read Documentation](https://stitches.dev/docs/variants)
								 */
								variants?: {
									[name: string]: {
										[pair in number | string]: CSS
									}
								}
								/** Compound variants. */
								compoundVariants?: (
									& (
										'variants' extends keyof Composers[K]
											? {
												[Name in keyof Composers[K]['variants']]?: Util.Widen<keyof Composers[K]['variants'][Name]> | Util.String
											} & Util.WideObject
										: Util.WideObject
									)
									& {
										css: CSS
									}
								)[]
								defaultVariants?: (
									'variants' extends keyof Composers[K]
										? {
											[Name in keyof Composers[K]['variants']]?: Util.Widen<keyof Composers[K]['variants'][Name]> | Util.String
										}
									: Util.WideObject
								)
							}
						) & {[K2 in keyof Composers[K]]:K2 extends 'variants' | 'defaultVariants' | 'compoundVariants' ? unknown : K2 extends keyof CSS ? CSS[K2] : unknown}				
				)
			}
		): StyledComponent.StyledComponent<
			Type,
			StyledComponent.StyledComponentProps<Composers>,
			Media,
			CSS
		>
	}
}

type ThemeTokens<Values, Prefix> = {
	[Scale in keyof Values]: {
		[Token in keyof Values[Scale]]: ThemeUtil.Token<
			Extract<Token, number | string>,
			Values[Scale][Token],
			Extract<Scale, string | void>,
			Extract<Prefix, string | void>
		>
	}
}
