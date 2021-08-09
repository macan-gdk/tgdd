
export const LOAD_COMMENT_FOR_PRODUCT = 'LOAD_COMMENT_FOR_PRODUCT';
export const CREATE_COMMENT = 'CREATE_COMMENT';

export const loadCommentForProductAction = payload => ({
	type: LOAD_COMMENT_FOR_PRODUCT,
	payload
})

export const createCommentAction = payload => ({
	type: CREATE_COMMENT,
	payload
})