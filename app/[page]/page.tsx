import { notFound } from "next/navigation";
import { InteriorPage } from "@/components/auravita/site";
const titles: Record<string, string> = {
  institucional: "Conheça a Auravita",
  profissionais: "Nossos profissionais",
  contato: "Contato e agendamento",
  privacidade: "Privacidade da demonstração",
};
export function generateStaticParams() {
  return Object.keys(titles).map((page) => ({ page }));
}
export const dynamicParams = false;
export async function generateMetadata({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;
  return { title: titles[page] || "Página não encontrada" };
}
export default async function Page({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;
  if (!titles[page]) notFound();
  return <InteriorPage page={page} />;
}
