'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'Accueil' },
  { href: '/destinations', label: 'Destinations' },
  { href: '/booking', label: 'Réservation' }
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-gold-700/40 bg-black/55 backdrop-blur-md">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <Link href="/" className="font-serif text-xl tracking-[0.15em] text-gold-100">
          TimeTravel Agency
        </Link>
        <ul className="flex items-center gap-2 md:gap-4">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`rounded-full px-4 py-2 text-sm transition duration-300 ${
                    active
                      ? 'bg-gold-500/20 text-gold-100 temporal-glow'
                      : 'text-zinc-300 hover:bg-white/5 hover:text-gold-300'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
