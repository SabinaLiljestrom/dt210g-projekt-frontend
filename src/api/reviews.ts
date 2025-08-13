import { api } from "./client";
import type { Review } from "../types/Review";

export async function getMyReviews(): Promise<Review[]> {
  return api("/my-reviews"); // kräver token
}

export async function updateReview(id: string, data: { content: string; rating: number }) {
  return api(`/reviews/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function deleteReview(id: string) {
  return api(`/reviews/${id}`, {
    method: "DELETE",
  });
}
