import { Inter } from "next/font/google";
import "./globals.css";
import EnvironmentSwitcher from "@/components/key-management/EnvironmentSwitcher";
import { MainNav } from "./components/MainNav";
import GraphQLClientProvider from "@/components/providers/GraphQLClientProvider";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import { cn } from "@/lib/utils";
import { ApiKeyProvider } from "@/components/providers/ApiKeyProvider";
import { LocaleProvider } from "@/components/providers/LocaleProvider";
import { SystemLangageSwitcher } from "../components/locale/SystemLangageSwitcher";
import { ContentWrapper } from "./components/ContentWrapper";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { XeTooltip } from "@/components/helpers/Tooltip";
import { DarkModeToggle } from "./components/DarkModeToggle";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

if (process.env.NODE_ENV !== "production") {
  // Adds messages only in a dev environment
  loadDevMessages();
  loadErrorMessages();
}

export const metadata: Metadata = {
  title: "Sitecore XE Browser",
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en" className={cn(inter.className, "h-full", "m-0")}>
      <body className={cn(inter.className, "h-full", "m-0")}>
        <div className="flex flex-col h-full">
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <ApiKeyProvider>
              <GraphQLClientProvider>
                <LocaleProvider>
                  <div className="border-b flex-initial flex items-center">
                    <div className="flex h-16 items-center px-4">
                      <EnvironmentSwitcher />
                      <MainNav className="mx-6" />
                    </div>
                    <div className="ml-auto flex items-center space-x-4">
                      <span>System locales</span>
                      <XeTooltip>
                        <p>
                          The locales that are used for query the Sitecore
                          tree.
                        </p>
                        <p>
                          {
                            `If an item isn't in one of these locales, it won't show up on the tree.  
                            Try to select the fewest number of locales possible, because queries will be made against 
                            every selected locale to ensure we aren't missing items.`
                          }
                        </p>
                      </XeTooltip>

                      <SystemLangageSwitcher />

                      <DarkModeToggle />
                    </div>
                  </div>
                  <div className="space-y-4 p-8 pt-6 flex flex-col flex-auto overflow-y-auto">
                    <ContentWrapper>{children}</ContentWrapper>
                  </div>
                  <footer className=" flex-initial basis-1">Footer</footer>
                </LocaleProvider>
              </GraphQLClientProvider>
            </ApiKeyProvider>
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
