export const getItem = (key: string): any => {
	try {
		return JSON.parse(localStorage.getItem(key) || '{}');
	} catch (e) {
		console.log('Error getting data');
		return null;
	}
}

export const setItem = (key: string, data: any): void => {
	try {
		localStorage.setItem(key, JSON.stringify(data));
	} catch (e) {
		console.log('Error setting data');
	}
}

export const removeItem = (key: string): void => {
	try {
		localStorage.removeItem(key);
	} catch (e) {
		console.log('Error removing data');
	}
}