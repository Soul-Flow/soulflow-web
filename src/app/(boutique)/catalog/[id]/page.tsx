import { FlowerDetails } from "@/components/flower-details";

type ProductPageProps = {
	params: Promise<{ id: string }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
	const { id } = await params;
	return <FlowerDetails productId={id} />;
}
