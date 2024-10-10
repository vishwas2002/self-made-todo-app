


const { z } = require("zod");

const todoSchema = z.object({
    title: z.string().min(), // Title must be a non-empty string
    description: z.string().min(), // Description must be a non-empty string
});

module.exports = todoSchema; // Export the schema
