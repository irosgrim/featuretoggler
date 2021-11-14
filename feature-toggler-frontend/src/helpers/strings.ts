export const partialStringMatch = (searchString: string) => {
    const regexp = new RegExp(searchString, 'i');
    return (str: string): boolean => {
        return regexp.test(str);
    }
}