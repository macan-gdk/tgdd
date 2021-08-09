
export const LOAD_BESTSELL = 'LOAD_BESTSELL';
export const LOAD_BESTVIEW = 'LOAD_BESTVIEW';

export const loadBestSellAction = (payload) => ({
	type:LOAD_BESTSELL,
	payload
})

export const loadBestViewAction = (payload) => ({
	type:LOAD_BESTVIEW,
	payload
})