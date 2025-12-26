import { isOutOfStock } from "@/lib/stock";
import type { Product } from "@/models/Product";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  return (
    <div className="relative">
      <img
        src={product.images[0]}
        className="aspect-square object-cover rounded"
        alt={product.name}
      />

      {isOutOfStock(product.stock) && (
        <span className="absolute top-2 left-2 bg-red-600 text-white px-2 text-xs rounded">
          Out of Stock
        </span>
      )}

      <p className="mt-2">{product.name}</p>
    </div>
  );
}
