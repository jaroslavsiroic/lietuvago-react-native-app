
function showModal(text) {
    console.log('showModal action!');
    return {
        type: 'SHOW_MODAL',
        text: text
    };
}

function hideModal() {
    return {
        type: 'HIDE_MODAL'
    };
}

module.exports = {
    showModal,
    hideModal
}