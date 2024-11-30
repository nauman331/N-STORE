const { z } = require("zod");

const signupSchema = z.object({
    username: z.string({ required_error: "Name is required" }).trim().min(3, 'username must be atleast 3 characters long').max(50, 'username cannot be more than 50 character long'),
    email: z.string({ required_error: "Email is required" })
        .email('Invalid Email')
        .refine((val) => /@/.test(val), 'Not a valid email address'),
    password: z.string({ required_error: "Password is required" }).trim().min(6, 'Password must be atleast 6 characters long').max(50, 'Password cannot be more than 50 character long'),
    phone: z.string({ required_error: "Phone number is required" }).trim().min(10, "Phone must be atleast 10 characters long").max(25, "Phone cannot be more than 25 character long"),
});

module.exports = signupSchema;
