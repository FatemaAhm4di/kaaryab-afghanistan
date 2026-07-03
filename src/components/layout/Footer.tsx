import Link from 'next/link';
import {MapPin, Mail} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0a1628] text-white">
      <div className="container-custom pt-14 pb-0">

        {/* Top grid */}
        <div className="grid gap-12 border-b border-white/8 pb-12 md:grid-cols-[2.2fr_1fr_1fr]">

          {/* Brand */}
          <div>
            <div className="mb-4 flex items-center gap-2 text-xl font-bold">
              <span className="h-2 w-2 rounded-full bg-[#088395]" />
              KaarYab
            </div>

            <p className="mb-6 max-w-xs text-sm leading-relaxed text-white/50">
              A free platform connecting Afghan youth to jobs, internships, scholarships, and remote work. Built in Herat, for everyone.
            </p>

            {/* Newsletter */}
            <div className="mb-6 rounded-xl border border-white/8 bg-white/5 p-4">
              <p className="mb-3 text-xs text-white/50">
                Get notified when new opportunities are added
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 rounded-lg border border-white/10 bg-white/7 px-3 py-2 text-xs text-white outline-none placeholder:text-white/30 focus:border-[#09637e]"
                />
                <button className="rounded-lg bg-[#09637e] px-4 py-2 text-xs font-semibold text-white transition hover:opacity-90">
                  Notify me
                </button>
              </div>
            </div>

            {/* Socials */}
            <div className="flex gap-2">
              <a href="https://www.instagram.com/_fatem4_" target="_blank" rel="noreferrer" className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/8 bg-white/6 text-white/60 transition hover:bg-[#09637e] hover:text-white hover:border-[#09637e]">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="https://x.com/_Fatema_Ahmadi_" target="_blank" rel="noreferrer" className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/8 bg-white/6 text-white/60 transition hover:bg-[#09637e] hover:text-white hover:border-[#09637e]">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l16 16M4 20L20 4"/></svg>
              </a>
              <a href="https://github.com/FatemaAhm4di" target="_blank" rel="noreferrer" className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/8 bg-white/6 text-white/60 transition hover:bg-[#09637e] hover:text-white hover:border-[#09637e]">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
              </a>
              <a href="https://linkedin.com/in/ꜰᴀᴛᴇᴍᴀ-ᴀʜᴍᴀᴅɪ-a0a749339" target="_blank" rel="noreferrer" className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/8 bg-white/6 text-white/60 transition hover:bg-[#09637e] hover:text-white hover:border-[#09637e]">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a href="https://t.me/Fatemah_Ahmadi" target="_blank" rel="noreferrer" className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/8 bg-white/6 text-white/60 transition hover:bg-[#09637e] hover:text-white hover:border-[#09637e]">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
              </a>
            </div>
          </div>

          {/* Platform + Company */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/35">Platform</p>
            <div className="flex flex-col gap-2.5">
              <Link href="/opportunities" className="text-sm text-white/60 transition hover:text-white">Opportunities</Link>
              <Link href="/dashboard" className="text-sm text-white/60 transition hover:text-white">Dashboard</Link>
              <Link href="/add-opportunity" className="text-sm text-white/60 transition hover:text-white">Add opportunity</Link>
              <Link href="/saved" className="text-sm text-white/60 transition hover:text-white">Saved</Link>
            </div>

            <p className="mb-4 mt-6 text-xs font-semibold uppercase tracking-widest text-white/35">Company</p>
            <div className="flex flex-col gap-2.5">
              <Link href="/about" className="text-sm text-white/60 transition hover:text-white">About</Link>
              <Link href="/contact" className="text-sm text-white/60 transition hover:text-white">Contact</Link>
            </div>
          </div>

          {/* Categories + Contact */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/35">Categories</p>
            <div className="flex flex-col gap-2.5">
              <Link href="/opportunities" className="text-sm text-white/60 transition hover:text-white">Jobs</Link>
              <Link href="/opportunities" className="text-sm text-white/60 transition hover:text-white">Internships</Link>
              <Link href="/opportunities" className="text-sm text-white/60 transition hover:text-white">Scholarships</Link>
              <Link href="/opportunities" className="text-sm text-white/60 transition hover:text-white">Remote work</Link>
              <Link href="/opportunities" className="text-sm text-white/60 transition hover:text-white">Training</Link>
              <Link href="/opportunities" className="text-sm text-white/60 transition hover:text-white">Volunteer</Link>
            </div>

            <p className="mb-4 mt-6 text-xs font-semibold uppercase tracking-widest text-white/35">Contact</p>
            <div className="flex flex-col gap-2.5">
              <a href="mailto:hello@kaaryab.af" className="flex items-center gap-2 text-sm text-white/60 transition hover:text-white">
                <Mail size={13} className="shrink-0" />
                hello@kaaryab.af
              </a>
              <div className="flex items-center gap-2 text-sm text-white/60">
                <MapPin size={13} className="shrink-0" />
                Herat, Afghanistan
              </div>
            </div>
          </div>

        </div>

        {/* Built with */}
        <div className="flex items-center gap-3 flex-wrap border-b border-white/6 py-4">
          <span className="text-xs font-medium uppercase tracking-widest text-white/30">Built with</span>
          {/* Next.js */}
          <div title="Next.js" className="flex h-7 w-7 items-center justify-center rounded-md border border-white/8 bg-white/5 text-white/50 transition hover:border-white/20 hover:text-white">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.573 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054z"/></svg>
          </div>
          {/* TypeScript */}
          <div title="TypeScript" className="flex h-7 w-7 items-center justify-center rounded-md border border-white/8 bg-white/5 text-white/50 transition hover:border-white/20 hover:text-white">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"/></svg>
          </div>
          {/* Tailwind */}
          <div title="Tailwind CSS" className="flex h-7 w-7 items-center justify-center rounded-md border border-white/8 bg-white/5 text-white/50 transition hover:border-white/20 hover:text-white">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/></svg>
          </div>
          {/* Prisma */}
          <div title="Prisma" className="flex h-7 w-7 items-center justify-center rounded-md border border-white/8 bg-white/5 text-white/50 transition hover:border-white/20 hover:text-white">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M21.807 18.285L13.553.756a1.324 1.324 0 0 0-1.129-.754 1.31 1.31 0 0 0-1.189.656L2.205 15.568a1.307 1.307 0 0 0 .027 1.339l4.24 6.884a1.313 1.313 0 0 0 1.524.531l13.086-4.485a1.308 1.308 0 0 0 .725-1.552zm-1.886.892L9.292 22.56a.43.43 0 0 1-.496-.174l-3.84-6.234a.426.426 0 0 1-.011-.437l7.271-12.68a.435.435 0 0 1 .303-.213.424.424 0 0 1 .379.114l7.943 16.98a.428.428 0 0 1-.92.261z"/></svg>
          </div>
          {/* Supabase */}
          <div title="Supabase" className="flex h-7 w-7 items-center justify-center rounded-md border border-white/8 bg-white/5 text-white/50 transition hover:border-white/20 hover:text-white">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M11.9 1.036c-.015-.986-1.26-1.41-1.874-.637L.764 12.05C.111 12.957.767 14.25 1.9 14.25h9.81l.185 8.715c.015.986 1.26 1.41 1.875.637l9.262-11.652c.653-.907-.003-2.2-1.137-2.2h-9.81L11.9 1.036z"/></svg>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-5">
          <p className="text-xs text-white/30">
            © 2026 KaarYab Afghanistan. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-white/30 transition hover:text-white/60 cursor-pointer">Privacy</span>
            <span className="text-xs text-white/30 transition hover:text-white/60 cursor-pointer">Terms</span>
            <span className="text-xs text-white/30">
              Made with <span className="text-red-400">♥</span> in Herat
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}