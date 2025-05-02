import { ReactNode } from "react";
import { CustomLinkProvider } from "@/context/CustomLinkContext";
import { getServerSession } from "next-auth";

export default async function PremiumLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession();
  const initialLink = session?.user?.customLink || "";

  return (
    <CustomLinkProvider initialLink={initialLink}>
      {children}
    </CustomLinkProvider>
  );
}
