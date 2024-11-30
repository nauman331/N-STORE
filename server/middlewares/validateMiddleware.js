
const validate = (schema) => async (req, res, next) => {
    try {
        const parseBody = await schema.parseAsync(req.body);
        req.body = parseBody;
        next();
    } catch (err) {
        return res.status(400).json({msg: "Fill the inputs properly", err})
    }
}


module.exports = validate;