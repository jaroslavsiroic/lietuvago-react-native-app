
function loadingStart(text) {
    return {
        type: 'LOADING_START',
        text: text
    };
}

function loadingEnd() {
    return {
        type: 'LOADING_END'
    };
}

module.exports = {
    loadingStart,
    loadingEnd
}