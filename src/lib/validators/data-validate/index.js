export const dataValidate = (schema) => (
    req,
    res,
    next,
) => {
    const data = req.data;
    const validation = schema.safeParse(data);
    if (!validation.success) {
        return res.status(400).send(validation.error.format());
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
        return res.status(400).send(validation.error.format());
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
        return res.status(400).send(validation.error.format());
    }
    return next();
}