import { notFound } from "next/navigation";
import { specialties } from "@/lib/auravita-data";
import { SpecialtyPage } from "@/components/auravita/site";
export function generateStaticParams() {
  return specialties.map(({ slug }) => ({ slug }));
}
export const dynamicParams = false;
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = specialties.find((s) => s.slug === slug);
  return {
    title: item?.name || "Especialidade",
    description: item?.description,
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = specialties.find((s) => s.slug === slug);
  if (!item) notFound();
  return <SpecialtyPage item={item} />;
}
