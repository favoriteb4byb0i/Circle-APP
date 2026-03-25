import { Heart, Camera, Star, MessageCircle, Zap, Calendar, Sparkles, BookOpen } from "lucide-react";
import { C } from "../constants";

export const notifIcon = (t: string) =>
  t === "match" ? Heart : t === "creator" ? Camera : t === "points" ? Star : t === "community" ? BookOpen : t === "challenge" ? Zap : t === "event" ? Calendar : Sparkles;

export const notifColor = (t: string) =>
  t === "match" ? C.coral : t === "creator" ? C.purple : t === "points" ? C.gold : t === "community" ? "#3B6BB5" : t === "challenge" ? "#C4702B" : t === "event" ? "#2D7D6B" : C.sub;

export const topicColor = (t: string) =>
  t === "Beginners" ? "#2D7D6B" : t === "Couples" ? C.coral : t === "Wellness" ? C.purple : t === "Self-Care" ? "#3B6BB5" : t === "Product Deep-Dives" ? "#C4702B" : t === "Products" ? "#C4702B" : t === "Tips" ? "#3B6BB5" : C.sub;

export const contentTypeColor = (t: string) =>
  t === "Tutorial" ? C.purple : t === "Review" ? "#2D7D6B" : t === "Unboxing" ? "#C4702B" : t === "Guide" ? "#3B6BB5" : t === "Expert" ? "#2D7D6B" : t === "Q&A" ? "#3B6BB5" : C.sub;

export const initials = (n: string) =>
  n.split(" ").map(w => w[0]).join("").slice(0, 2);
