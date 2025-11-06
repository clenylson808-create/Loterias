import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Corretor de Loterias - Resultados Atualizados',
  description: 'Confira os resultados mais recentes de todas as loterias da Caixa Econômica Federal. Mega-Sena, Lotofácil, Quina e muito mais!',
  keywords: 'loteria, mega-sena, lotofácil, quina, resultados, caixa, lotomania, timemania',
  authors: [{ name: 'Corretor de Loterias' }],
  icons: {
    icon: '/favicon.ico',
  },
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#049645',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
      </body>
    </html>
  );
}
