export const partialStringMatch = (searchString: string): ((str: string) => boolean) => {
	const regexp = new RegExp(searchString, 'i');
	return (str: string): boolean => {
		return regexp.test(str);
	};
};
