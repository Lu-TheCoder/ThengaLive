import { formatRand } from "../data/products";
import { Trash2, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useShop } from "../state/shop";
import QuantitySelector from "../components/QuantitySelector";

export default function Cart() {
    const { getCartProducts, getCartTotal, removeFromCart, checkout, setCartQuantity } = useShop();
    const items = getCartProducts();
    const total = getCartTotal();

    return (
        <section className="flex flex-col gap-4 p-4 w-full">
            <span className="text-2xl font-semibold text-[var(--text-color)]">Your Cart</span>

            <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2 flex flex-col gap-3">
                    {items.map(({ product, quantity }) => (
                        <div key={product.id} className="flex flex-row items-center border border-[#eeeeee] gap-3 bg-white rounded-xl p-3">
                            <img src={product.image} alt={product.title} className="w-20 h-20 object-cover rounded-lg" />
                            <div className="flex flex-col flex-1">
                                <Link to={`/products/${product.id}`} className="text-[var(--text-color)] font-medium">{product.title}</Link>
                                <div className="flex items-center gap-2 mt-1">
                                    <QuantitySelector value={quantity} onChange={(q) => setCartQuantity(product.id, q)} />
                                </div>
                            </div>
                            <span className="text-[var(--text-color)] font-semibold">{formatRand(product.price * quantity)}</span>
                            <button className="p-2 hover:bg-[#efefef] rounded" onClick={() => removeFromCart(product.id)}>
                                <Trash2 className="w-4 h-4 text-[#ffadad]" />
                            </button>
                        </div>
                    ))}
                    {items.length === 0 && (
                        <div className="text-[#797979]">Your cart is empty.</div>
                    )}
                </div>
                <div className="col-span-1 flex flex-col gap-3 bg-white border rounded-xl p-4 h-fit">
                    <span className="text-lg font-semibold text-[var(--text-color)]">Summary</span>
                    <div className="flex flex-row items-center justify-between text-[var(--text-color)]">
                        <span>Subtotal</span>
                        <span>{formatRand(total)}</span>
                    </div>
                    <div className="flex flex-row items-center justify-between text-[var(--text-color)]">
                        <span>Delivery</span>
                        <span>{formatRand(0)}</span>
                    </div>
                    <div className="flex flex-row items-center justify-between font-semibold text-[var(--text-color)] border-t pt-2">
                        <span>Total</span>
                        <span>{formatRand(total)}</span>
                    </div>
                    <button className="mt-2 bg-[#343434] text-white py-2 rounded flex items-center justify-center gap-2" onClick={async () => {
                        const res = await checkout();
                        if (res.success) alert(`Order placed! Order ID: ${res.orderId}`);
                    }}>
                        <CheckCircle2 className="w-4 h-4" />
                        Checkout
                    </button>
                </div>
            </div>
        </section>
    );
}


