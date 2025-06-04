import { ReactNode } from "react";
import { CustomLinkProvider } from "@/context/CustomLinkContext";
import { getServerSession } from "next-auth";
import { Providers } from "@/app/Providers";

export default async function PremiumLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession();
  const initialLink = session?.user?.customLink || "";

  return (
    <Providers>
    <CustomLinkProvider initialLink={initialLink}>
      {children}
    </CustomLinkProvider>
    </Providers>
  );
}
