import { z } from "zod";

const reviewSchema = z.object({
  rating: z.number().min(0).max(5),
  comment: z.string(),
  userName: z.string()
});

 const roomValidationSchema = z.object({
  room_name: z.string().min(3, "Room name is required"),
  description: z.string(),
  price: z.number().nonnegative("Price must be a non-negative number"),
  available_seat: z.number().int().nonnegative("Seats must be a non-negative integer"),
  review: reviewSchema.optional(),
  images: z.array(z.string())
});

export const roomValidation = {
    roomValidationSchema
}