export type TabId =
  | "home"
  | "about"
  | "tools"
  | "events"
  | "team"
  | "gallery"
  | "announcements"
  | "resources"
  | "contact";

export interface AITool {
  id: string;
  name: string;
  logo: string;
  category: "LLM" | "Code" | "Media" | "Agent" | "Audio";
  tagline: string;
  description: string;
  features: string[];
  stats: string;
  promptExample: string;
  link: string;
  docsUrl: string;
  color: string;
}

export interface ClubEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: "Keynote" | "Symposium" | "Summit" | "Social" | "Competition";
  seatsLeft: number;
  totalSeats: number;
  description: string;
  speaker: {
    name: string;
    role: string;
    company: string;
    avatar: string;
  };
  tags: string[];
  image: string;
  isFeatured?: boolean;
}

export interface Workshop {
  id: string;
  title: string;
  instructor: string;
  role: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  date: string;
  duration: string;
  prerequisites: string[];
  syllabus: string[];
  registered: number;
  maxSeats: number;
  image: string;
}

export interface HackathonTrack {
  name: string;
  prize: string;
  description: string;
}

export interface Hackathon {
  id: string;
  title: string;
  dates: string;
  prizePool: string;
  tracks: HackathonTrack[];
  status: "Upcoming" | "Live" | "Completed";
  description: string;
  schedule: { time: string; event: string }[];
  sponsors: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  category: "Executive Board" | "Research Lead" | "Tech Lead" | "Operations";
  bio: string;
  image: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
  email: string;
  projects?: string[];
}

export interface Announcement {
  id: string;
  title: string;
  date: string;
  category: "Important" | "Event" | "Workshop" | "General";
  content: string;
  pinned?: boolean;
  priority: "High" | "Normal";
}

export interface Resource {
  id: string;
  title: string;
  type: "pdf" | "ppt" | "video" | "link" | "github" | "paper";
  category: "LLMs" | "Computer Vision" | "Reinforcement Learning" | "Agents" | "Tutorials";
  author: string;
  date: string;
  url: string;
  downloads: number;
  tags: string[];
  size?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: "General" | "Membership" | "Events" | "Grants & Hardware";
}

export interface Certificate {
  id: string;
  title: string;
  issueDate: string;
  code: string;
  type: "Workshop Completion" | "Hackathon Winner" | "Member Certification";
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: "student" | "admin" | "lead";
  memberId: string;
  major: string;
  gradYear: string;
  rollNo?: string;
  branch?: string;
  bio: string;
  xp: number;
  level: number;
  badges: string[];
  registeredEventIds: string[];
  registeredWorkshopIds: string[];
  savedResourceIds: string[];
  certificates: Certificate[];
  attendanceCount: number;
  joinedDate: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: "Hackathons" | "Workshops" | "Guest Talks" | "Projects";
  date: string;
  imageUrl: string;
  caption: string;
}
