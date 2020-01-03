const errors = [
    'Recurso no disponible.',                                               //0
];

/**
 * 
 * @param {number} index The error index
 * @returns {string} A description of the given error
 */
const getErrorAt = (index) => {
    return errors[index];
};

export { getErrorAt };