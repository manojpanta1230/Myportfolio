import LenisProvider from "@/components/LenisProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getSettings } from "@/app/actions/settings";
import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSettings();

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange={false}
    >
      <LenisProvider>
        <div className="flex flex-col min-h-screen">
          <CustomCursor />
          <Preloader />
          <Navbar />
          <div className="flex-grow">
            {children}
          </div>
          <Footer settings={settings} />
        </div>
      </LenisProvider>
    </ThemeProvider>
  );
}
