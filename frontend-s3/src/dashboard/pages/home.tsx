import { ArrowRight, Eye, FileText, ScanQrCode, Star, TrendingUp, TvMinimalPlay, X, Send, Heart, ShoppingCart, CirclePlay } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Product } from "../data/products";
import { useShop } from "../state/shop";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { products, formatRand, getFallbackImage } from "../data/products";

export default function Home() {
    const trending = [...products].sort((a, b) => b.rating - a.rating).slice(0, 2);
    const liveSessions = [...products].sort((a, b) => b.rating - a.rating).slice(2, 4);
    const livePreviewVideos = [
        "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
        "https://media.w3.org/2010/05/bunny/trailer.mp4",
    ];

    const chatUsers = ["Sibongile", "Thabo", "Naledi", "Kamo", "Lerato", "Andile", "Palesa", "Neo"];
    const chatTexts = [
        "Looks amazing!",
        "Is this still available?",
        "What a bargain",
        "Where is pickup?",
        "Love the quality",
        "Shipping time?",
        "Please review the price",
        "I'm interested",
    ];
    type ChatMsg = { id: string; user: string; text: string };
    const [chatMessages, setChatMessages] = useState<ChatMsg[]>(() => (
        Array.from({ length: 6 }).map((_, i) => ({
            id: `${Date.now()}-${i}`,
            user: chatUsers[Math.floor(Math.random() * chatUsers.length)],
            text: chatTexts[Math.floor(Math.random() * chatTexts.length)],
        }))
    ));
    const chatRef = useRef<HTMLDivElement | null>(null);
    const overlayChatRef = useRef<HTMLDivElement | null>(null);
    const controlsRef = useRef<HTMLDivElement | null>(null);
    const [isLiveFullscreen, setIsLiveFullscreen] = useState(false);
    const [chatInput, setChatInput] = useState("");
    const [selectedLiveProduct, setSelectedLiveProduct] = useState<Product | null>(null);
    const [selectedLiveVideoSrc, setSelectedLiveVideoSrc] = useState<string | null>(null);
    const { addToCart, toggleWishlist, isInWishlist } = useShop();
    const navigate = useNavigate();
    const [controlsActive, setControlsActive] = useState(false);

    useEffect(() => {
        const iv = setInterval(() => {
            setChatMessages((prev) => {
                const next: ChatMsg = {
                    id: `${Date.now()}`,
                    user: chatUsers[Math.floor(Math.random() * chatUsers.length)],
                    text: chatTexts[Math.floor(Math.random() * chatTexts.length)],
                };
                const combined = [...prev, next];
                return combined.length > 20 ? combined.slice(combined.length - 20) : combined;
            });
        }, 2200);
        return () => clearInterval(iv);
    }, []);

    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [chatMessages.length]);

    useEffect(() => {
        if (overlayChatRef.current) {
            overlayChatRef.current.scrollTop = overlayChatRef.current.scrollHeight;
        }
    }, [chatMessages.length, isLiveFullscreen]);

    useEffect(() => {
        const original = document.body.style.overflow;
        if (isLiveFullscreen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = original || '';
        }
        return () => { document.body.style.overflow = original; };
    }, [isLiveFullscreen]);

    const handleSendChat = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        const text = chatInput.trim();
        if (!text) return;
        setChatMessages((prev) => {
            const next = [...prev, { id: `${Date.now()}`, user: 'You', text }];
            return next.length > 20 ? next.slice(next.length - 20) : next;
        });
        setChatInput("");
        setTimeout(() => {
            if (overlayChatRef.current) overlayChatRef.current.scrollTop = overlayChatRef.current.scrollHeight;
        }, 0);
    };

    const handleOverlayMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!controlsRef.current) return setControlsActive(false);
        const rect = controlsRef.current.getBoundingClientRect();
        const PADDING = 120; // px proximity threshold
        const nearRect = new DOMRect(
            rect.left - PADDING,
            rect.top - PADDING,
            rect.width + PADDING * 2,
            rect.height + PADDING * 2
        );
        const x = e.clientX;
        const y = e.clientY;
        const isNear = x >= nearRect.left && x <= nearRect.right && y >= nearRect.top && y <= nearRect.bottom;
        setControlsActive(isNear);
    };
    return (
        <>
            {/* POPULAR PRODUCT REVIEW LIVESTREAM */}
            <section className="flex flex-row items-center h-[350px] p-4">
                <div className="flex flex-col gap-2  flex-1 pr-4 h-full">
                    <div className="flex flex-row items-center gap-2">
                        <TvMinimalPlay className="w-5 h-5 text-[#ff8484]" />
                        <span className="text-md text-[#6d6d6d]">Trending Live Product</span>
                    </div>
                    <div className="relative rounded-xl overflow-hidden w-full h-full bg-black">
                        <video
                            className="w-full h-full object-cover"
                            src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
                            controls
                            playsInline
                            autoPlay
                            muted
                            loop
                            onClick={() => { setSelectedLiveProduct(trending[0] ?? null); setSelectedLiveVideoSrc("https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"); setIsLiveFullscreen(true); }}
                            style={{ cursor: 'pointer' }}
                        />
                        <div className="absolute top-2 right-2 bottom-2 w-1/3 min-w-[260px] bg-black/30 backdrop-blur-sm rounded-lg overflow-hidden shadow flex flex-col">
                            <div className="px-3 py-2 text-xs tracking-wide text-[#ededed] bg-black/30">Live Chat</div>
                            <div ref={chatRef} className="flex-1 overflow-y-auto p-2 space-y-2">
                                {chatMessages.map((m) => (
                                    <div key={m.id} className="fade-in-up text-[11px] leading-4">
                                        <span className="font-semibold text-[#ffb78b] mr-1">{m.user}:</span>
                                        <span className="text-[#f1f1f1]">{m.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {isLiveFullscreen && (
                        <div className="fixed inset-0 z-50 bg-black/90 flex" onMouseMove={handleOverlayMouseMove}>
                            <div className="relative flex-1 flex items-center justify-center p-4">
                                <video
                                    className="w-full h-full object-contain"
                                    src={selectedLiveVideoSrc ?? "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"}
                                    controls
                                    autoPlay
                                    playsInline
                                    loop
                                />
                                <div className="absolute top-4 left-4 flex flex-col gap-2">
                                    <span className="text-white text-lg font-semibold drop-shadow">{selectedLiveProduct?.title ?? 'Live Product Review'}</span>
                                </div>
                                {selectedLiveProduct && (
                                    <div ref={controlsRef} className={`absolute bottom-20 right-8 flex flex-row items-center gap-2 transition-opacity duration-150 ${controlsActive ? 'opacity-100' : 'opacity-40'}`}>
                                        <button
                                            className="px-3 py-2 bg-[#343434] text-white rounded flex items-center gap-2"
                                            onClick={() => { addToCart(selectedLiveProduct.id, 1); navigate('/cart'); }}
                                        >
                                            <ShoppingCart className="w-4 h-4" />
                                            Buy Now
                                        </button>
                                        <button
                                            className={`px-3 py-2 border rounded flex items-center gap-2 ${isInWishlist(selectedLiveProduct.id) ? 'border-[#ff8484] text-[#ff8484] bg-black/40' : 'border-white/40 text-white bg-black/30'}`}
                                            onClick={() => toggleWishlist(selectedLiveProduct.id)}
                                        >
                                            <Heart className="w-4 h-4" />
                                            {isInWishlist(selectedLiveProduct.id) ? 'Wishlisted' : 'Add to Wishlist'}
                                        </button>
                                        <button
                                            className="px-3 py-2 border border-white/40 text-white rounded"
                                            onClick={() => navigate(`/products/${selectedLiveProduct.id}`)}
                                        >
                                            View Product
                                        </button>
                                    </div>
                                )}
                                <button className="absolute top-4 right-4 p-2 rounded bg-black/50 hover:bg-black/60" onClick={() => setIsLiveFullscreen(false)}>
                                    <X className="w-5 h-5 text-white" />
                                </button>
                            </div>
                            <div className="w-[380px] max-w-[45vw] bg-black/40 backdrop-blur-md border-l border-white/10 flex flex-col">
                                <div className="px-4 py-3 text-xs tracking-wide text-[#ededed] border-b border-white/10">Live Chat</div>
                                <div ref={overlayChatRef} className="flex-1 overflow-y-auto p-3 space-y-2">
                                    {chatMessages.map((m) => (
                                        <div key={m.id} className="fade-in-up text-[12px] leading-5">
                                            <span className="font-semibold text-[#ffb78b] mr-1">{m.user}:</span>
                                            <span className="text-[#f1f1f1]">{m.text}</span>
                                        </div>
                                    ))}
                                </div>
                                <form onSubmit={handleSendChat} className="p-3 border-t border-white/10 flex items-center gap-2">
                                    <input
                                        value={chatInput}
                                        onChange={(e) => setChatInput(e.target.value)}
                                        placeholder="Say something..."
                                        className="flex-1 bg-white/10 text-white placeholder-white/40 px-3 py-2 rounded outline-none focus:outline-none"
                                    />
                                    <button type="submit" className="px-3 py-2 bg-[#ff8a65] hover:bg-[#ff7a50] text-white rounded flex items-center gap-1">
                                        <Send className="w-4 h-4" />
                                        Send
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
                <div className="flex flex-col gap-2  w-full h-full flex-1">
                    <div className="flex flex-row items-center gap-2">
                        <CirclePlay className="w-5 h-5 text-[#ff8484]" />
                        <span className="text-md text-[#6d6d6d] ">Other Live Sessions</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 h-full">
                        {liveSessions.map((p, i) => (
                            <button key={p.id} onClick={() => { setSelectedLiveProduct(p); setSelectedLiveVideoSrc(livePreviewVideos[i % livePreviewVideos.length]); setIsLiveFullscreen(true); }} className="text-left flex flex-col gap-2 rounded-2xl h-full bg-white border-2 border-[#ececec] overflow-hidden outline-none focus:outline-none focus-visible:outline-none ring-0 focus:ring-0 transition-transform duration-150 ease-out hover:scale-[1.01]">
                                <div className="relative w-full h-[140px]">
                                    <video
                                        className="w-full h-full object-cover rounded-xl overflow-hidden"
                                        src={livePreviewVideos[i % livePreviewVideos.length]}
                                        muted
                                        autoPlay
                                        loop
                                        playsInline
                                    />
                                    <span className="absolute top-2 left-2 text-[10px] px-2 py-[2px] rounded-full bg-[#ff3b30] text-white">LIVE</span>
                                    <span className="absolute top-2 right-2 text-[10px] px-2 py-[2px] rounded-full bg-black/60 text-white flex items-center gap-1">
                                        <Eye className="w-3 h-3" />
                                        {Math.floor(320 + i * 57)}
                                    </span>
                                </div>
                                <div className="flex flex-col gap-1 px-2 pb-2">
                                    <span className="text-[#525151] font-semibold text-sm line-clamp-1">{p.title} - Live Review</span>
                                    <div className="flex flex-row items-center gap-2 text-xs text-[var(--text-color)]">
                                        <span className="text-[#797979]">with {p.location.split(',')[0]}</span>
                                    </div>
                                </div>
                            </button>
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


