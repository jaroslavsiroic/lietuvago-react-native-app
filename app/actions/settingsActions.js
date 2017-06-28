
function changeMapStyle(style) {
    return {
        type: 'MAP_STYLE_CHANGE',
        payload: style
    };
}

module.exports = {
    changeMapStyle
};