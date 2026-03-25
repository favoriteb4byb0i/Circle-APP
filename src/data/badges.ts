import { MessageCircle, Share2, Heart, Globe, Flame, UserPlus } from "lucide-react";

export const BADGES = [
  { id: "review", name: "First Voice", icon: MessageCircle, earned: true, hint: null },
  { id: "social", name: "Amplifier", icon: Share2, earned: true, hint: null },
  { id: "couple", name: "Power Couple", icon: Heart, earned: false, hint: "Partner verknüpfen" },
  { id: "explorer", name: "Explorer", icon: Globe, earned: false, hint: "3 Kategorien" },
  { id: "streak", name: "On Fire", icon: Flame, earned: false, hint: "7 Tage aktiv" },
  { id: "referral", name: "Matchmaker", icon: UserPlus, earned: false, hint: "1 Freund einladen" },
];
