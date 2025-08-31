import { products, formatRand } from "../data/products";
import { Star, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useShop } from "../state/shop";

export default function Wishlist() {
    const { wishlist, toggleWishlist } = useShop();
    const favs = products.filter(p => wishlist.includes(p.id));

    return (
        <section className="flex flex-col gap-4 p-4 w-full">
            <span className="text-2xl font-semibold text-[var(--text-color)]">My Wishlist</span>

            <div className="grid grid-cols-4 gap-4">
                {favs.map((p, i) => (
                    <div key={p.id} className={`flex flex-col gap-2 rounded-2xl border h-[480px] bg-white overflow-hidden outline-none ring-0 transition-transform duration-150 ease-out hover:scale-[1.01] fade-in-up fade-delay-${(i%8)+1}`}>
                        <div className="flex flex-col gap-2 p-2">
                            <img src={p.image} alt={p.title} className="w-full h-[280px] object-cover rounded-xl overflow-hidden" />
                            <div className="flex flex-col gap-1 p-2">
                                <Link to={`/products/${p.id}`} className="text-[#525151] font-semibold text-lg">{p.title}</Link>
                                <div className="flex flex-row items-center gap-1 justify-between text-sm text-[var(--text-color)]">
                                    <span className="font-bold text-xl">{formatRand(p.price)}</span>
                                    <div className="flex flex-col items-end gap-1">
                                        <div className="flex flex-row items-center gap-1">
                                            <Star className="w-3 h-3 text-[#ff745e]" />
                                            <span className="text-[#797979] text-xs">{p.rating}</span>
                                        </div>
                                        <span className="text-[#797979] text-xs">{p.reviews}+ Reviews</span>
                                    </div>
                                </div>
                                <span className="text-[#797979] text-xs">{p.location}</span>
                            </div>
                            <button className="text-xs text-[#a33] flex items-center gap-1 self-end pr-2" onClick={() => toggleWishlist(p.id)}><Heart className="w-3 h-3"/> Remove</button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}


