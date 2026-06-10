import { products } from "@/lib/data";
import ProductClient from "@/components/ui/product-client";

type Props = {
  params: {
    id: string;
  };
};

export default function ProductPage({ params }: Props) {
  const productId = Number(params.id);

  const product = products.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="h-[60vh] flex items-center justify-center text-red-500 text-xl">
        Product not found
      </div>
    );
  }

  return <ProductClient product={product} />;
}