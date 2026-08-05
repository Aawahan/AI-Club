import React, { useState } from "react";
import { Modal } from "../common/Modal";
import { useAuth } from "../../context/AuthContext";
import { useSound } from "../../context/SoundContext";
import { User, Lock, Mail, ArrowRight, Hash, BookOpen } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { login, registerUser } = useAuth();
  const { playClick, playSuccess } = useSound();
  const [mode, setMode] = useState<"login" | "register" | "forgot">("login");
  const [role, setRole] = useState<"student" | "admin">("student");

  // Form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [branch, setBranch] = useState("Computer Science & Engineering");
  const [major, setMajor] = useState("Computer Science & AI");
  const [gradYear, setGradYear] = useState("2027");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playSuccess();

    if (mode === "login") {
      login(email || "student@gla.ac.in", role);
    } else if (mode === "register") {
      registerUser({
        email: email || "alex.rivera@gmail.com",
        name: name || "Alex Rivera",
        role: "student", // Registration is strictly for students (admin removed from register)
        rollNo: rollNo || "2215000189",
        branch: branch || "Computer Science & Engineering",
        major: branch || major,
        gradYear,
      });
    } else {
      alert("Password reset dispatch sent to email!");
    }

    onClose();
  };

  const handleGoogleLogin = () => {
    playSuccess();
    login("alex.rivera@gmail.com", role);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="AUTHENTICATION // SYNAPSE PORTAL" maxWidth="md">
      <div className="space-y-6 font-mono text-xs">
        {/* Mode Selector Tabs */}
        <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
          <button
            onClick={() => {
              playClick();
              setMode("login");
            }}
            className={`flex-1 py-2 rounded-lg font-bold transition-all ${
              mode === "login" ? "bg-white text-black" : "text-gray-400 hover:text-white"
            }`}
          >
            LOGIN
          </button>
          <button
            onClick={() => {
              playClick();
              setMode("register");
              setRole("student"); // Ensure role is student when registering
            }}
            className={`flex-1 py-2 rounded-lg font-bold transition-all ${
              mode === "register" ? "bg-white text-black" : "text-gray-400 hover:text-white"
            }`}
          >
            REGISTER
          </button>
        </div>

        {/* Role Demo Toggle - Only available for Login testing */}
        {mode === "login" && (
          <div className="flex items-center justify-between bg-black/60 p-3 rounded-xl border border-white/10">
            <span className="text-gray-400 text-[10px]">LOGIN AS ROLE:</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  playClick();
                  setRole("student");
                }}
                className={`px-3 py-1 rounded-md text-[10px] font-bold ${
                  role === "student" ? "bg-white text-black" : "bg-white/10 text-gray-400"
                }`}
              >
                STUDENT
              </button>
              <button
                type="button"
                onClick={() => {
                  playClick();
                  setRole("admin");
                }}
                className={`px-3 py-1 rounded-md text-[10px] font-bold ${
                  role === "admin" ? "bg-white text-black" : "bg-white/10 text-gray-400"
                }`}
              >
                ADMIN
              </button>
            </div>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "register" && (
            <div className="space-y-1">
              <label className="text-gray-400 text-[10px] uppercase">FULL NAME</label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-500 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Rivera"
                  className="w-full bg-white/5 border border-white/15 focus:border-white rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-gray-600 focus:outline-none"
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-gray-400 text-[10px] uppercase">
              {mode === "register" ? "EMAIL ADDRESS (PERSONAL / NORMAL EMAIL)" : "EMAIL ADDRESS"}
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-500 absolute left-3.5 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={mode === "register" ? "student@gmail.com" : "student@gla.ac.in"}
                className="w-full bg-white/5 border border-white/15 focus:border-white rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-gray-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-gray-400 text-[10px] uppercase">PASSWORD</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-500 absolute left-3.5 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-white/5 border border-white/15 focus:border-white rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-gray-600 focus:outline-none"
              />
            </div>
          </div>

          {mode === "register" && (
            <>
              {/* Roll Number & Branch */}
              <div className="space-y-1">
                <label className="text-gray-400 text-[10px] uppercase">UNIVERSITY ROLL NO</label>
                <div className="relative">
                  <Hash className="w-4 h-4 text-gray-500 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={rollNo}
                    onChange={(e) => setRollNo(e.target.value)}
                    placeholder="e.g. 2215000189"
                    className="w-full bg-white/5 border border-white/15 focus:border-white rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-gray-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-gray-400 text-[10px] uppercase">BRANCH / DEPARTMENT</label>
                <div className="relative">
                  <BookOpen className="w-4 h-4 text-gray-500 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    placeholder="e.g. Computer Science & Engineering (B.Tech CSE)"
                    className="w-full bg-white/5 border border-white/15 focus:border-white rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-gray-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-gray-400 text-[10px] uppercase">SPECIALIZATION / MAJOR</label>
                  <input
                    type="text"
                    value={major}
                    onChange={(e) => setMajor(e.target.value)}
                    placeholder="AI & Data Science"
                    className="w-full bg-white/5 border border-white/15 focus:border-white rounded-xl px-3 py-2 text-white placeholder-gray-600"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-gray-400 text-[10px] uppercase">GRAD YEAR</label>
                  <input
                    type="text"
                    value={gradYear}
                    onChange={(e) => setGradYear(e.target.value)}
                    placeholder="2027"
                    className="w-full bg-white/5 border border-white/15 focus:border-white rounded-xl px-3 py-2 text-white placeholder-gray-600"
                  />
                </div>
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-white text-black font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors shadow-lg"
          >
            <span>{mode === "login" ? "AUTHENTICATE & ENTER" : "CREATE SYNAPSE ACCOUNT"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Divider */}
        <div className="relative text-center my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10" />
          </div>
          <span className="relative bg-black px-2 text-[10px] text-gray-500 uppercase">
            OR CONTINUOUS AUTHENTICATION
          </span>
        </div>

        {/* Google SSO */}
        <button
          onClick={handleGoogleLogin}
          className="w-full py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866.549 3.921 1.453l2.814-2.814C17.503 2.988 15.139 2 12.545 2 7.021 2 2.545 6.477 2.545 12s4.476 10 10 10c5.523 0 10-4.477 10-10 0-.67-.069-1.325-.195-1.956h-9.805z"
            />
          </svg>
          <span>LOG IN WITH GOOGLE SSO</span>
        </button>
      </div>
    </Modal>
  );
};
