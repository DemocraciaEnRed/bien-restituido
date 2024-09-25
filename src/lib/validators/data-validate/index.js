import { ZodError } from "zod";

export const dataValidate = (schema) => (
    req,
    res,
    next,
) => {
    const data = req.data;
    const validation = schema.safeParse(data);
    if (!validation.success) {
        const error = formatErrors(validation.error)
        return res.status(400).send({ message: error });
    }
    return next();
}

export const paramsValidate = (schema) => (
    req,
    res,
    next,
) => {
    const data = req.params;
    const validation = schema.safeParse(data);
    if (!validation.success) {
        const error = formatErrors(validation.error)
        return res.status(400).send({ message: error });
    }
    return next();
}

export const queryValidate = (schema) => (
    req,
    res,
    next,
) => {
    const data = req.query;
    const validation = schema.safeParse(data);

    if (!validation.success) {
        const error = formatErrors(validation.error)
        return res.status(400).send({ message: error });
    }
    return next();
}

const formatErrors = (errors) => {
    return errors.errors.map(error => {
        const path = error.path.join(".");
        return `${path}: ${error.message}`;
    }).join("\n");
};


export const formDataValidate = (data, schema) => {
    const validation = schema.safeParse(data);
    if (!validation.success) {
        throw { message: validation.error.flatten().fieldErrors }
    }
}