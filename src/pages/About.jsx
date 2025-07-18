import Header from "../components/Header";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Github,
  Star,
  GitBranch,
  BadgeCheck,
  ExternalLink,
} from "lucide-react";

const developers = [
  {
    name: "PIXELHIZE",
    avatar: "https://avatars.githubusercontent.com/u/177896483?v=4",
    github: "https://github.com/PIXELHIZE",
    role: "Full‑Stack Engineer",
  },
  {
    name: "riruhyun",
    avatar: "https://avatars.githubusercontent.com/u/74291106?v=4",
    github: "https://github.com/riruhyun",
    role: "Frontend Engineer",
  },
  {
    name: "Woojin Jung",
    avatar: "https://avatars.githubusercontent.com/u/176367965?v=4",
    github: "https://github.com/jungwj0706",
    role: "Frontend Engineer",
  },
  {
    name: "abcdeefa",
    avatar: "https://avatars.githubusercontent.com/u/206953140?v=4",
    github: "https://github.com/abcdeefa",
    role: "Frontend Engineer",
  },
];

const github = {
  owner: "PIXELHIZE",
  repo: "DAYBREAK - 스담",
  url: "https://github.com/PIXELHIZE/daybreak",
};

const libraries = [
  {
    name: "React",
    description: "The library for web and native user interfaces",
    url: "https://react.dev/",
  },
  {
    name: "Tailwind CSS",
    description:
      "Rapidly build modern websites without ever leaving your HTML.",
    url: "https://tailwindcss.com/",
  },
  {
    name: "Motion",
    description:
      "A powerful animation library and developer tools for making beautiful animations.",
    url: "https://motion.dev/",
  },
  {
    name: "React Router",
    description:
      "A user‑obsessed, standards‑focused, multi‑strategy router you can deploy anywhere.",
    url: "https://reactrouter.com/",
  },
  {
    name: "Axios",
    description: "Promise based HTTP client for the browser and node.js",
    url: "https://axios-http.com/",
  },
  {
    name: "Express",
    description: "Fast, unopinionated, minimalist web framework for Node.js",
    url: "https://expressjs.com/",
  },
  {
    name: "SQLite",
    description:
      "SQLite is a C-language library that implements a small, fast, self-contained, high-reliability, full-featured, SQL database engine.",
    url: "https://www.sqlite.org/index.html",
  },
  {
    name: "Particles.js",
    description: "A lightweight JavaScript library for creating particles.",
    url: "https://github.com/vincentgarreau/particles.js/",
  },
];

const license = "GNU General Public License v3.0";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" },
  }),
};

function DeveloperCard({ dev, index }) {
  return (
    <motion.a
      custom={index}
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.05 }}
      href={dev.github}
      target="_blank"
      rel="noreferrer"
      className="flex flex-col items-center gap-2 rounded-2xl bg-[#0d1117] text-white shadow-lg ring-1 ring-white/10 p-4"
    >
      <img
        src={dev.avatar}
        alt={dev.name}
        className="w-16 h-16 rounded-full object-cover ring-2 ring-[#0d1117]"
      />
      <p className="text-sm font-medium text-center leading-tight">
        {dev.name}
      </p>
      {dev.role && (
        <p className="text-xs text-gray-400 text-center">{dev.role}</p>
      )}
    </motion.a>
  );
}

function LibraryCard({ lib, index }) {
  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -4 }}
      className="rounded-2xl bg-white/5 text-white p-4 flex flex-col gap-2"
    >
      <div className="flex items-center gap-2">
        <p className="font-semibold text-sm">{lib.name}</p>
        <a
          href={lib.url}
          target="_blank"
          rel="noreferrer"
          className="opacity-60 hover:opacity-100"
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
      <p className="text-xs text-gray-400 leading-snug flex-1">
        {lib.description}
      </p>
    </motion.div>
  );
}

export default function About() {
  const [repoStats, setRepoStats] = useState({ stars: 0, forks: 0 });

  useEffect(() => {
    const controller = new AbortController();

    fetch(`https://api.github.com/repos/PIXELHIZE/daybreak`, {
      signal: controller.signal,
    })
      .then((res) => res.ok && res.json())
      .then((data) => {
        if (data) {
          setRepoStats({
            stars: data.stargazers_count ?? 0,
            forks: data.forks_count ?? 0,
          });
        }
      })
      .catch(() => {});

    return () => controller.abort();
  }, []);

  return (
    <>
      <Header />

      <section className="max-w-4xl mx-auto p-8 space-y-10">
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          whileHover={{ scale: 1.03 }}
        >
          <a
            href={github.url}
            target="_blank"
            rel="noreferrer"
            className="block rounded-2xl bg-[#0d1117] text-white shadow-lg ring-1 ring-white/10 overflow-hidden"
          >
            <div className="flex items-center justify-between p-4">
              <div>
                <p className="text-xs text-gray-400">{github.owner}</p>
                <h2 className="text-lg font-semibold leading-none mt-1">
                  {github.repo}
                </h2>
              </div>
              <Github className="w-6 h-6 opacity-60" />
            </div>

            <div className="flex gap-6 px-6 pb-6 text-sm opacity-80">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4" />
                {repoStats.stars.toLocaleString()}
              </div>
              <div className="flex items-center gap-1">
                <GitBranch className="w-4 h-4" />
                {repoStats.forks.toLocaleString()}
              </div>
              <div className="flex items-center gap-1">
                <BadgeCheck className="w-4 h-4" />
                {license}
              </div>
            </div>
          </a>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {developers.map((dev, idx) => (
            <DeveloperCard key={dev.github} dev={dev} index={idx + 1} />
          ))}
        </div>

        <div className="space-y-4">
          <motion.h3
            custom={developers.length + 1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-lg font-semibold text-white"
          >
            Open‑Source Libraries
          </motion.h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {libraries.map((lib, idx) => (
              <LibraryCard
                key={lib.name}
                lib={lib}
                index={developers.length + 2 + idx}
              />
            ))}
          </div>
        </div>

        <motion.div
          custom={libraries.length + developers.length + 2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          whileHover={{ scale: 1.03 }}
          className="rounded-2xl bg-[#0d1117] text-white shadow-lg ring-1 ring-white/10 flex flex-col items-center justify-center p-6"
        >
          <BadgeCheck className="w-8 h-8 mb-2" />
          <p className="text-lg font-semibold">{license} License</p>
        </motion.div>
      </section>
    </>
  );
}
