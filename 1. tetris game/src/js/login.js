/**
 * Load saved name from Local Storage
 */
function init() {
    name = localStorage["tetris.username"];
    if (name && name !== 'undefined') {
        document.getElementsByName("username")[0].value = localStorage["tetris.username"];
    }
}

/**
 * Store new name to the Local Storage
 * @param {string} newName - new name to be saved
 */
function storeName(newName) {
    localStorage["tetris.username"] = newName;
}

/**
 * Get saved name from the Local Storage
 */
function getName() {
    return localStorage["tetris.username"];
}