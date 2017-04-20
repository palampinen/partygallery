export const getShareUrl = (url) => {
	const urlParts = url.split('/');
	const imageId = urlParts[urlParts.length - 1];

	return 'https://wappu.futurice.com/i/' + imageId;
}