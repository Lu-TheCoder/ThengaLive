import { Star } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { products, formatRand, getFallbackImage } from "../data/products";

const categoryDisplay: Record<string, string> = {
    livestock: "Livestock",
    produce: "Fresh Produce",
    fashion: "Local Fashion",
    furniture: "Local Furniture",
    art: "Local Artworks",
};

export default function CategoryList() {
    const { categoryId = "livestock" } = useParams();
    const list = products.filter(p => p.category === (categoryId as any));
    const title = categoryDisplay[categoryId] || "Products";

    return (
        <section className="flex flex-col gap-4 p-4 w-full">
            <div className="flex flex-row items-center justify-between">
                <span className="text-2xl font-semibold text-[var(--text-color)]">{title}</span>
                <div className="flex flex-row items-center gap-2 text-sm">
                    <Link to="/category/fashion" className={`px-3 py-1 rounded ${categoryId === 'fashion' ? 'bg-[#343434]' : 'bg-[#efefef]'} text-[var(--text-color)]`}>Fashion</Link>
                    <Link to="/category/furniture" className={`px-3 py-1 rounded ${categoryId === 'furniture' ? 'bg-[#343434]' : 'bg-[#efefef]'} text-[var(--text-color)]`}>Furniture</Link>
                    <Link to="/category/art" className={`px-3 py-1 rounded ${categoryId === 'art' ? 'bg-[#343434]' : 'bg-[#efefef]'} text-[var(--text-color)]`}>Art</Link>
                    <Link to="/category/livestock" className={`px-3 py-1 rounded ${categoryId === 'livestock' ? 'bg-[#343434]' : 'bg-[#efefef]'} text-[var(--text-color)]`}>Livestock</Link>
                    <Link to="/category/produce" className={`px-3 py-1 rounded ${categoryId === 'produce' ? 'bg-[#343434]' : 'bg-[#efefef]'} text-[var(--text-color)]`}>Fresh Produce</Link>
                </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
                {list.map((p, i) => (
                    <Link key={p.id} to={`/products/${p.id}`} className={`flex flex-col gap-2 rounded-2xl border h-[430px] bg-white overflow-hidden outline-none focus:outline-none focus-visible:outline-none ring-0 focus:ring-0 transition-transform duration-150 ease-out hover:scale-[1.01] fade-in-up fade-delay-${(i%8)+1}`}>
                        <div className="flex flex-col gap-2 p-2">
                            <img src={p.image} alt={p.title} className="w-full h-[280px] object-cover rounded-xl overflow-hidden" onError={(e) => { (e.currentTarget as HTMLImageElement).src = getFallbackImage(p.category, p.id); }} />
                            <div className="flex flex-col gap-1 p-2">
                                <span className="text-[#525151] font-semibold text-lg">{p.title}</span>
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
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}


