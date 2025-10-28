import { geistMono, inter, satoshi } from "@/styles/fonts";
import "@/styles/globals.css";
import { cn, constructMetadata } from "@dub/utils";
import Script from "next/script";
import RootProviders from "./providers";

export const metadata = constructMetadata();

// Affiliate Banner Component
function AffiliateBanner() {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      backgroundColor: '#2563eb',
      color: 'white',
      padding: '12px 20px',
      textAlign: 'center',
      zIndex: 9999,
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <a 
        href="https://pplx.ai/sujalkalsa24069" 
        target="_blank" 
        rel="noopener noreferrer"
        style={{
          color: 'white',
          textDecoration: 'none',
          fontWeight: '500',
          fontSize: '14px',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        <span>🎉</span>
        <span>Try Perplexity AI - The Future of Search</span>
        <span style={{ 
          backgroundColor: 'rgba(255,255,255,0.2)', 
          padding: '4px 12px', 
          borderRadius: '4px',
          fontSize: '12px'
        }}>Learn More →</span>
      </a>
    </div>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(satoshi.variable, inter.variable, geistMono.variable)}
    >
      <body style={{ paddingTop: '48px' }}>
        <AffiliateBanner />
        <RootProviders>
          {children}
        </RootProviders>
        <Script id="set-theme" strategy="beforeInteractive">
          {`
          (() => {
            // Only run on referrals embed page for now
            if (window.location.pathname !== '/embed/referrals') return;
            const urlParams = new URLSearchParams(window.location.search);
            const theme = urlParams.get('theme');
            if (theme === 'dark' || (theme === 'system' && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
              document.body.classList.add("dark");
            } else {
              document.body.classList.remove("dark");
            }
          })();
        `}
        </Script>
      </body>
    </html>
  );
}
