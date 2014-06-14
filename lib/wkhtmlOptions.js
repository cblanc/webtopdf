module.exports = function (options) {
	var parsedOptions = {};
	
	if (options.grayscale) parsedOptions['grayscale'] = true;

	if (options.orientation) parsedOptions['orientation'] = options.orientation.toLowerCase();

	if (options.name && options.name.length > 0) parsedOptions['title'] = options.name;
	
	return parsedOptions;
}