import { TripComment } from "../dtos/tripComment.dto";
import { Comment } from "../types/Trip";

export async function createTripComment(tripComment: TripComment): Promise<Comment> {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_BASEURL}/api/tripComment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tripComment),
    credentials: 'include'
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Creating a trip comment failed: ${errorText}`);
  }

  const createdTripComment: Comment = await response.json();
  return createdTripComment;
}

export async function removeTripComment(tripCommentId: number) {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_BASEURL}/api/tripComment/${tripCommentId}`, {
    method: "DELETE",
    credentials: 'include'
  })

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Deleting trip comment failed: ${errorText}`);
  }
}