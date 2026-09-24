import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 flex items-center justify-center relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl" />

      <div className="relative text-center animate-fade-in">
        <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-medium mb-6">
          Virtual HR + ATS Platform
        </div>
        <h1 className="text-6xl font-bold text-white mb-3 tracking-tight">
          Salarite
        </h1>
        <p className="text-slate-400 mb-12">
          Assign, track, and manage HR workflows in real time
        </p>

        <div className="flex flex-col gap-4 w-80 mx-auto">
          <Link
            href="/employer"
            className="group bg-white/5 hover:bg-blue-600 border border-white/10 hover:border-blue-500 text-white font-medium py-4 rounded-xl transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-blue-500/25 flex items-center justify-center gap-2"
          >
            🧑‍💼 Employer Dashboard
            <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
          </Link>
          <Link
            href="/hr"
            className="group bg-white/5 hover:bg-emerald-600 border border-white/10 hover:border-emerald-500 text-white font-medium py-4 rounded-xl transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-emerald-500/25 flex items-center justify-center gap-2"
          >
            🧑‍💻 Virtual HR Dashboard
            <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
          </Link>
          <Link
            href="/hr/interview"
            className="group bg-white/5 hover:bg-purple-600 border border-white/10 hover:border-purple-500 text-white font-medium py-4 rounded-xl transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-purple-500/25 flex items-center justify-center gap-2"
          >
            🎥 Schedule Interview
            <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}