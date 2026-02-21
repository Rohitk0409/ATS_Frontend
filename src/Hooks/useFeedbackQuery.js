import { useQuery } from "@tanstack/react-query";
import api from "./api";

const fetchFeedbacks = async () => {
  const { data } = await api.get("/v1/feedback");
  return data.data; // adjust according to your backend
};

export const useFeedbackQuery = () => {
  return useQuery({
    queryKey: ["feedbacks"],
    queryFn: fetchFeedbacks,
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
};
