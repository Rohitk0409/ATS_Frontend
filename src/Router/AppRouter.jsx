import { Route, Routes } from "react-router-dom";

import AboutPage from "../Pages/AboutPage";
import FeedBackPage from "../Pages/FeedBackPage";
import HomePage from "../Pages/HomePage/HomePage";

import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import api from "../Hooks/api";

const AppRouter = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: ["feedbacks"],
      queryFn: async () => {
        const { data } = await api.get("/api/v1/feedback");
        return data.data;
      },
    });
  }, []);
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/feedback" element={<FeedBackPage />} />
    </Routes>
  );
};

export default AppRouter;
