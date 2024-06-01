const { check, validationResult } = require('express-validator');
const db = require('../configs/pg')

const validUFs = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];

const validateEndereco = [
    check('end_cli_cod')
        .notEmpty().withMessage('Código do cliente é obrigatório.')
        .isInt().withMessage('Código do cliente deve ser um número inteiro.')
        .custom(async (value) => {
            const result = await db.query('SELECT 1 FROM clientes WHERE cli_cod = $1', [value]);
            if (result.rowCount === 0) {
                throw new Error('Cliente não registrado.');
            }
            return true;
        }),
    check('end_cep')
        .isLength({ min: 8, max: 8 }).withMessage('CEP deve ter 8 caracteres.')
        .matches(/^[0-9]{8}$/).withMessage('CEP deve conter apenas números.'),
    check('end_logradouro')
        .notEmpty().withMessage('Logradouro é obrigatório.')
        .isLength({ max: 100 }).withMessage('Logradouro deve ter no máximo 100 caracteres.'),
    check('end_bairro')
        .notEmpty().withMessage('Bairro é obrigatório.')
        .isLength({ max: 100 }).withMessage('Bairro deve ter no máximo 100 caracteres.'),
    check('end_numero')
        .notEmpty().withMessage('Número é obrigatório.')
        .isLength({ max: 20 }).withMessage('Número deve ter no máximo 20 caracteres.'),
    check('end_uf')
        .isLength({ min: 2, max: 2 }).withMessage('UF deve ter 2 caracteres.')
        .isIn(validUFs).withMessage('UF deve ser uma unidade federativa válida do Brasil.'),
    check('end_complemento')
        .optional()
        .isLength({ max: 100 }).withMessage('Complemento deve ter no máximo 100 caracteres.'),
    check('end_contato')
        .optional()
        .isLength({ max: 15 }).withMessage('Contato deve ter no máximo 15 caracteres.'),
    check('end_tipo')
        .isInt({min: 1, max: 2}).withMessage('Tipo do endereço deve ser 1 (PRINCIPAL) 2 (ENTREGA).'),
    check('end_status')
        .isInt({ min: 1, max: 2 }).withMessage('Status deve ser 1 (ATIVO) ou 2 (INATIVO).'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = validateEndereco;