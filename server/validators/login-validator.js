const { z } = require("zod");

const loginSchema = z.object({
    email: z.string({ required_error: "Email is required" })
        .email('Invalid Email')
        .refine((val) => /@/.test(val), 'Not a valid email address'),
    password: z.string({ required_error: "Password is required" }).trim().min(6, 'Password must be atleast 6 characters long').max(50, 'Password cannot be more than 50 character long'),
});

module.exports = loginSchema;
