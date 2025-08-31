import { ArrowRight, CloudAlert, FileText, ScanQrCode, Star, TrendingUp, TvMinimalPlay } from "lucide-react";
import { Link } from "react-router-dom";
import { products, formatRand, getFallbackImage } from "../data/products";

export default function Home() {
    const trending = [...products].sort((a, b) => b.rating - a.rating).slice(0, 2);
    return (
        <>
            {/* POPULAR PRODUCT REVIEW LIVESTREAM */}
            <section className="flex flex-row items-center h-[350px] p-4">
                <div className="flex flex-col gap-2  flex-1 pr-4 h-full">
                    <div className="flex flex-row items-center gap-2">
                        <TvMinimalPlay className="w-5 h-5 text-[#ff8484]" />
                        <span className="text-md text-[#6d6d6d]">Trending Live Product</span>
                    </div>
                    <div className="flex rounded-sm bg-[#d7d7d7] w-full h-full items-center justify-center">
                        <div className="flex flex-col items-center gap-2">
                            <CloudAlert className="w-5 h-5 text-[#535353]" />
                            <span className="text-sm text-[#535353]">No Live Stream Currently Available</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2  w-full h-full flex-1">
                    <div className="flex flex-row items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-[#ff8484]" />
                        <span className="text-md text-[#6d6d6d] ">Currently Trending Product in Your Area</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 h-full">
                        {trending.slice(0, 2).map((p) => (
                            <Link key={p.id} to={`/products/${p.id}`} className="flex flex-col gap-2 rounded-2xl h-full bg-white  border-2 border-[#ececec] overflow-hidden outline-none focus:outline-none focus-visible:outline-none ring-0 focus:ring-0 transition-transform duration-150 ease-out hover:scale-[1.01]">
                                <div className="flex flex-col gap-2 p-2">
                                    <img src={p.image} alt={p.title} className="w-full h-[140px] object-cover rounded-xl overflow-hidden" onError={(e) => { (e.currentTarget as HTMLImageElement).src = getFallbackImage(p.category, p.id); }} />
                                    <div className="flex flex-col gap-1 p-1">
                                        <span className="text-[#525151] font-semibold text-sm">{p.title}</span>
                                        <div className="flex flex-row items-center gap-1 justify-between text-xs text-[var(--text-color)]">
                                            <span className="font-bold text-base">{formatRand(p.price)}</span>
                                            <div className="flex flex-row items-center gap-1">
                                                <Star className="w-3 h-3 text-[#ff745e]" />
                                                <span className="text-[#797979] text-[10px]">{p.rating}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <span className="text-[#797979] text-xs">{p.location}</span>
                                    <div className="flex flex-row items-center justify-between gap-1 bg-[#ffda6a] px-4 py-2 rounded-xl">
                                        <span className="text-xs text-[#313131]">View Product</span>
                                        <ArrowRight className="w-3 h-3 text-[#454545]" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* NEW CATEGORIES: Fashion */}
            <section className="flex flex-col gap-2 py-4 bg-[#efefef] rounded-tr-4xl rounded-tl-4xl">
                <div className="flex flex-col gap-4 px-4">
                    <div className="flex flex-row items-center justify-between">
                        <span className="text-2xl font-semibold text-[var(--text-color)] ">Local Fashion</span>
                        <Link to="/category/fashion" className="flex flex-row items-center gap-1 cursor-pointer group">
                            <span className="text-sm text-[var(--text-color)] group-hover:text-[#ffb78b] transition-all duration-100">View All</span>
                            <ArrowRight className="w-5 h-5 text-[var(--text-color)] group-hover:text-[#ffb78b] transition-all duration-100" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-4 gap-4">
                        {products.filter(p => p.category === "fashion").slice(0,4).map(p => (
                            <Link key={p.id} to={`/products/${p.id}`} className="flex flex-col gap-2 rounded-2xl  h-[430px] bg-white overflow-hidden outline-none focus:outline-none focus-visible:outline-none ring-0 focus:ring-0 transition-transform duration-150 ease-out hover:scale-[1.01]">
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
                </div>
            </section>

            {/* NEW CATEGORIES: Furniture */}
            <section className="flex flex-col gap-2 py-4 bg-[#efefef]">
                <div className="flex flex-col gap-4 px-4">
                    <div className="flex flex-row items-center justify-between">
                        <span className="text-2xl font-semibold text-[var(--text-color)] ">Local Furniture</span>
                        <Link to="/category/furniture" className="flex flex-row items-center gap-1 cursor-pointer group">
                            <span className="text-sm text-[var(--text-color)] group-hover:text-[#ffb78b] transition-all duration-100">View All</span>
                            <ArrowRight className="w-5 h-5 text-[var(--text-color)] group-hover:text-[#ffb78b] transition-all duration-100" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-4 gap-4">
                        {products.filter(p => p.category === "furniture").slice(0,4).map(p => (
                            <Link key={p.id} to={`/products/${p.id}`} className="flex flex-col gap-2 rounded-2xl  h-[430px] bg-white overflow-hidden outline-none focus:outline-none focus-visible:outline-none ring-0 focus:ring-0 transition-transform duration-150 ease-out hover:scale-[1.01]">
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
                </div>
            </section>

            {/* NEW CATEGORIES: Artworks */}
            <section className="flex flex-col gap-2 py-4 bg-[#efefef]">
                <div className="flex flex-col gap-4 px-4">
                    <div className="flex flex-row items-center justify-between">
                        <span className="text-2xl font-semibold text-[var(--text-color)] ">Local Artworks</span>
                        <Link to="/category/art" className="flex flex-row items-center gap-1 cursor-pointer group">
                            <span className="text-sm text-[var(--text-color)] group-hover:text-[#ffb78b] transition-all duration-100">View All</span>
                            <ArrowRight className="w-5 h-5 text-[var(--text-color)] group-hover:text-[#ffb78b] transition-all duration-100" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-4 gap-4">
                        {products.filter(p => p.category === "art").slice(0,4).map(p => (
                            <Link key={p.id} to={`/products/${p.id}`} className="flex flex-col gap-2 rounded-2xl  h-[430px] bg-white overflow-hidden outline-none focus:outline-none focus-visible:outline-none ring-0 focus:ring-0 transition-transform duration-150 ease-out hover:scale-[1.01]">
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
                </div>
            </section>

            {/* Hubs */}
            <section className="flex flex-col gap-2 bg-[#efefef]">
                <div className="flex flex-col gap-2 p-6 border-b border-[#d1d1d1] items-center">
                    <span className="text-2xl font-semibold text-[var(--text-color)] ">Live Markets</span>
                    <span className="text-sm text-[#686868] ">Explore the latest live markets and auctions</span>
                    <div className="flex flex-row gap-2">
                        <div className="flex flex-row items-center gap-2 bg-[#191919] px-4 py-1 rounded-full">
                            <FileText className="w-4 h-4 text-[#ff8484]" />
                            <span className="text-sm text-[#ededed] ">Live Reviews</span>
                        </div>
                        <div className="flex flex-row items-center gap-2 bg-[#191919] px-4 py-1 rounded-full">
                            <TvMinimalPlay className="w-4 h-4 text-[#ff8484]" />
                            <span className="text-sm text-[#ededed] ">Live Auctions</span>
                        </div>
                    </div>
                </div>
            </section>

            <section className="flex flex-col gap-2 py-4 bg-[#efefef]">
                <div className="flex flex-col gap-4 px-4">
                    <div className="flex flex-row items-center justify-between">
                        <span className="text-2xl font-semibold text-[var(--text-color)] ">Explore New Products</span>
                    </div>

                    {/* PROODUCTS GRID */}
                    <div className="flex flex-row items-center justify-between">
                        <div className="flex flex-row items-center gap-1">
                            <ScanQrCode className="w-5 h-5 text-[var(--text-color)]" />
                            <span className="text-sm uppercase text-[var(--text-color)] ">Livestock</span>
                            <span className="text-sm uppercase text-[#797979] ">Nearby</span>
                        </div>

                        <Link to="/category/livestock" className="flex flex-row items-center gap-1 cursor-pointer group">
                            <span className="text-sm text-[var(--text-color)] group-hover:text-[#ffb78b] transition-all duration-100">View All</span>
                            <ArrowRight className="w-5 h-5 text-[var(--text-color)] group-hover:text-[#ffb78b] transition-all duration-100" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-4 gap-4">
                        {products.filter(p => p.category === "livestock").map(p => (
                            <Link key={p.id} to={`/products/${p.id}`} className="flex flex-col gap-2 rounded-2xl  h-[430px] bg-white overflow-hidden outline-none focus:outline-none focus-visible:outline-none ring-0 focus:ring-0 transition-transform duration-150 ease-out hover:scale-[1.01]">
                                <div className="flex flex-col gap-2 p-2">
                                    <img src={p.image} alt={p.title} className="w-full h-[280px] object-cover rounded-xl overflow-hidden" />
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
                </div>

                <div className="flex flex-col gap-4 px-4 mt-10">
                    {/* PROODUCTS GRID */}
                    <div className="flex flex-row items-center justify-between">
                        <div className="flex flex-row items-center gap-1">
                            <ScanQrCode className="w-5 h-5 text-[var(--text-color)]" />
                            <span className="text-sm uppercase text-[var(--text-color)] ">Fresh Produce</span>
                            <span className="text-sm uppercase text-[#797979] ">Nearby</span>
                        </div>

                        <Link to="/category/produce" className="flex flex-row items-center gap-1 cursor-pointer group">
                            <span className="text-sm text-[var(--text-color)] group-hover:text-[#ffb78b] transition-all duration-100">View All</span>
                            <ArrowRight className="w-5 h-5 text-[var(--text-color)] group-hover:text-[#ffb78b] transition-all duration-100" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-4 gap-4">
                        {products.filter(p => p.category === "produce").map(p => (
                            <Link key={p.id} to={`/products/${p.id}`} className="flex flex-col gap-2 rounded-2xl h-[430px] bg-white overflow-hidden outline-none focus:outline-none focus-visible:outline-none ring-0 focus:ring-0">
                                <div className="flex flex-col gap-2 p-2">
                                    <img src={p.image} alt={p.title} className="w-full h-[280px] object-cover rounded-xl overflow-hidden" />
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
                </div>
            </section>
        </>
    );
}


