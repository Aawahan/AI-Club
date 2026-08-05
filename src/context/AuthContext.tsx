import React, { createContext, useContext, useState, useEffect } from "react";
import { UserProfile, ClubEvent, Workshop, Resource } from "../types";
import { MOCK_USER, EVENTS_DATA, WORKSHOPS_DATA, RESOURCES_DATA } from "../data/clubData";
import confetti from "canvas-confetti";

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, role?: "student" | "admin") => void;
  registerUser: (data: Partial<UserProfile>) => void;
  logout: () => void;
  toggleRoleDemo: () => void;
  registerForEvent: (eventId: string) => boolean;
  cancelEventRegistration: (eventId: string) => void;
  registerForWorkshop: (workshopId: string) => boolean;
  toggleSaveResource: (resourceId: string) => void;
  updateProfile: (updated: Partial<UserProfile>) => void;
  eventsList: ClubEvent[];
  workshopsList: Workshop[];
  resourcesList: Resource[];
  addNewEvent: (event: ClubEvent) => void;
  addNewAnnouncement: (announcement: any) => void;
  addNewResource: (resource: Resource) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: MOCK_USER,
  isAuthenticated: true,
  isAdmin: false,
  login: () => {},
  registerUser: () => {},
  logout: () => {},
  toggleRoleDemo: () => {},
  registerForEvent: () => false,
  cancelEventRegistration: () => {},
  registerForWorkshop: () => false,
  toggleSaveResource: () => {},
  updateProfile: () => {},
  eventsList: [],
  workshopsList: [],
  resourcesList: [],
  addNewEvent: () => {},
  addNewAnnouncement: () => {},
  addNewResource: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem("aura_user");
    return saved ? JSON.parse(saved) : MOCK_USER;
  });

  const [eventsList, setEventsList] = useState<ClubEvent[]>(() => {
    const saved = localStorage.getItem("aura_events");
    return saved ? JSON.parse(saved) : EVENTS_DATA;
  });

  const [workshopsList, setWorkshopsList] = useState<Workshop[]>(() => {
    const saved = localStorage.getItem("aura_workshops");
    return saved ? JSON.parse(saved) : WORKSHOPS_DATA;
  });

  const [resourcesList, setResourcesList] = useState<Resource[]>(() => {
    const saved = localStorage.getItem("aura_resources");
    return saved ? JSON.parse(saved) : RESOURCES_DATA;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("aura_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("aura_user");
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem("aura_events", JSON.stringify(eventsList));
  }, [eventsList]);

  useEffect(() => {
    localStorage.setItem("aura_workshops", JSON.stringify(workshopsList));
  }, [workshopsList]);

  useEffect(() => {
    localStorage.setItem("aura_resources", JSON.stringify(resourcesList));
  }, [resourcesList]);

  const isAuthenticated = !!user;
  const isAdmin = user?.role === "admin";

  const login = (email: string, role: "student" | "admin" = "student") => {
    const newUser: UserProfile = {
      ...MOCK_USER,
      email,
      name: email.split("@")[0].replace(".", " ").toUpperCase(),
      role,
      memberId: `AURA-${Math.floor(1000 + Math.random() * 9000)}`,
    };
    setUser(newUser);
  };

  const registerUser = (data: Partial<UserProfile>) => {
    const newUser: UserProfile = {
      ...MOCK_USER,
      ...data,
      id: `user-${Date.now()}`,
      memberId: `AURA-${Math.floor(1000 + Math.random() * 9000)}`,
      role: data.role || "student",
      xp: 200,
      level: 1,
      badges: ["New Member", "Early Pioneer"],
    };
    setUser(newUser);
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
  };

  const logout = () => {
    setUser(null);
  };

  const toggleRoleDemo = () => {
    if (!user) return;
    const nextRole = user.role === "admin" ? "student" : "admin";
    setUser({ ...user, role: nextRole });
  };

  const registerForEvent = (eventId: string): boolean => {
    if (!user) return false;
    if (user.registeredEventIds.includes(eventId)) return true;

    // Update event seat count
    setEventsList((prev) =>
      prev.map((evt) =>
        evt.id === eventId
          ? { ...evt, seatsLeft: Math.max(0, evt.seatsLeft - 1) }
          : evt
      )
    );

    const updatedEvents = [...user.registeredEventIds, eventId];
    const newXp = user.xp + 150;
    const newLevel = Math.floor(newXp / 400) + 1;

    setUser({
      ...user,
      registeredEventIds: updatedEvents,
      xp: newXp,
      level: newLevel,
      attendanceCount: user.attendanceCount + 1,
    });

    confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
    return true;
  };

  const cancelEventRegistration = (eventId: string) => {
    if (!user) return;
    setEventsList((prev) =>
      prev.map((evt) =>
        evt.id === eventId ? { ...evt, seatsLeft: evt.seatsLeft + 1 } : evt
      )
    );
    setUser({
      ...user,
      registeredEventIds: user.registeredEventIds.filter((id) => id !== eventId),
    });
  };

  const registerForWorkshop = (workshopId: string): boolean => {
    if (!user) return false;
    if (user.registeredWorkshopIds.includes(workshopId)) return true;

    setWorkshopsList((prev) =>
      prev.map((ws) =>
        ws.id === workshopId ? { ...ws, registered: ws.registered + 1 } : ws
      )
    );

    setUser({
      ...user,
      registeredWorkshopIds: [...user.registeredWorkshopIds, workshopId],
      xp: user.xp + 100,
    });

    confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    return true;
  };

  const toggleSaveResource = (resourceId: string) => {
    if (!user) return;
    const saved = user.savedResourceIds.includes(resourceId);
    const updated = saved
      ? user.savedResourceIds.filter((id) => id !== resourceId)
      : [...user.savedResourceIds, resourceId];

    setUser({ ...user, savedResourceIds: updated });
  };

  const updateProfile = (updated: Partial<UserProfile>) => {
    if (!user) return;
    setUser({ ...user, ...updated });
  };

  const addNewEvent = (event: ClubEvent) => {
    setEventsList((prev) => [event, ...prev]);
  };

  const addNewAnnouncement = (announcement: any) => {
    // Stored in localStorage or state
  };

  const addNewResource = (resource: Resource) => {
    setResourcesList((prev) => [resource, ...prev]);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isAdmin,
        login,
        registerUser,
        logout,
        toggleRoleDemo,
        registerForEvent,
        cancelEventRegistration,
        registerForWorkshop,
        toggleSaveResource,
        updateProfile,
        eventsList,
        workshopsList,
        resourcesList,
        addNewEvent,
        addNewAnnouncement,
        addNewResource,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
