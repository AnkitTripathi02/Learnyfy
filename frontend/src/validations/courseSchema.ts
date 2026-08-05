import { z } from "zod";

export const courseSchema = z.object({
    title: z.string().min(3, "Title is required"),

    slug: z.string().min(3, "Slug is required"),

    short_description: z
        .string()
        .min(5, "Short Description is required"),

    description: z
        .string()
        .min(10, "Description is required"),

    category: z.string().min(2),

    level: z.string().min(2),

    language: z.string().min(2),

    duration: z.string().min(2),

    instructor: z.string().min(2),

    price: z.coerce
        .number()
        .min(0, "Price must be greater than 0"),

    thumbnail: z.string().optional(),

    is_published: z.boolean(),
});

export type CourseFormData = z.infer<typeof courseSchema>;