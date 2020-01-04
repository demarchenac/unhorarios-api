const errors = [
    'Recurso no disponible.',                                               //0
    'Campos vacíos.',                                                       //1
    'Campos incompletos.',                                                  //2
    'La longitud del campo ha de ser 7.',                                   //3
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