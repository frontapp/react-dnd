import * as NativeTypes from '../NativeTypes'
import { getDataFromDataTransfer } from './getDataFromDataTransfer'

export interface NativeItemConfigExposePropreties {
	[property: string]: (
		dataTransfer: DataTransfer,
		matchesTypes: string[],
	) => any
}

export interface NativeItemConfig {
	exposeProperties: NativeItemConfigExposePropreties
	matchesTypes: string[]
}

export const nativeTypesConfig: {
	[key: string]: NativeItemConfig
} = {
	[NativeTypes.FRONT_ATTACHMENT]: {
		exposeProperties: {
			text: (dataTransfer: DataTransfer, matchesTypes: string[]) =>
				getDataFromDataTransfer(dataTransfer, matchesTypes, ''),
		},
		matchesTypes: ['x-front-attachment'],
	},
	[NativeTypes.FILE]: {
		exposeProperties: {
			files: (dataTransfer: DataTransfer) =>
				Array.prototype.slice.call(dataTransfer.files),
			items: (dataTransfer: DataTransfer) => dataTransfer.items,
		},
		matchesTypes: ['Files'],
	},
	[NativeTypes.URL]: {
		exposeProperties: {
			urls: (dataTransfer: DataTransfer, matchesTypes: string[]) =>
				getDataFromDataTransfer(dataTransfer, matchesTypes, '').split('\n'),
		},
		matchesTypes: ['Url', 'text/uri-list'],
	},
	[NativeTypes.TEXT]: {
		exposeProperties: {
			text: (dataTransfer: DataTransfer, matchesTypes: string[]) =>
				getDataFromDataTransfer(dataTransfer, matchesTypes, ''),
		},
		matchesTypes: ['Text', 'text/plain'],
	},
}
