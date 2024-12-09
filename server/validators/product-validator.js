const { z } = require("zod");

const productSchema = z.object({
  title: z
    .string({ required_error: "Product title is required" })
    .trim()
    .min(3, "Title should be at least 3 characters long")
    .max(50, "Title can not be more than 50 characters long"),
  category: z
    .string({ required_error: "Category is required" })
    .trim()
    .min(3, "category name should be at least 3 characters long")
    .max(50, "category name can not be more than 50 characters long"),
    price: z.number({required_error: "Price is required"}).trim().minValue(1, "Price should be greater thhan 0")
});
