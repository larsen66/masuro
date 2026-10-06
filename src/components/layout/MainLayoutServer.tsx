import { getCategories } from "@/sanity/lib";
import { MainLayoutClient } from "./MainLayout";

interface MainLayoutProps {
  children: React.ReactNode;
  activeNav?: string;
}

export async function MainLayout({ children, activeNav }: MainLayoutProps) {
  const categories = await getCategories();

  return (
    <MainLayoutClient activeNav={activeNav} categories={categories}>
      {children}
    </MainLayoutClient>
  );
}
