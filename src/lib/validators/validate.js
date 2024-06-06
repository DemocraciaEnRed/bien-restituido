import { check, validationResult } from 'express-validator'
import { messages } from '../../app/api/_lib/utils/messages';

export default (req, res, next) => {
    const results = validationResult(req);
    // console.dir(results)
    if (!results.isEmpty()) {
        const errors = results.errors.map(err => {
            return {
                field: err.path,
                // Note: don't send the value, sensitive data could be leaked
                // value: err.value,
                message: err.msg
            }
        });
        return res.status(422).json({ message: messages.validationError.defaultMessage, errors: errors });
    }

    next();
};