import { Heart, Pencil, ShoppingCart, Star, X, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById, formatRand, getFallbackImage, getProductVideoSrc } from "../data/products";
import { useShop } from "../state/shop";
import QuantitySelector from "../components/QuantitySelector";
// no-op

export default function ProductDetail() {
    const { id = "1" } = useParams();
    const product = getProductById(id) || getProductById("1")!;
    const { addToCart, toggleWishlist, isInWishlist, isInCart } = useShop();
    const [isLiveFullscreen, setIsLiveFullscreen] = useState(false);
    const [chatInput, setChatInput] = useState("");
    const [showNotifyModal, setShowNotifyModal] = useState(false);
    const videoSrc = getProductVideoSrc(product.id);
    type ChatMsg = { id: string; user: string; text: string };
    const [chatMessages, setChatMessages] = useState<ChatMsg[]>([
        { id: '1', user: 'Thabo', text: 'Kgopela go atametsa khamera mo dinkung.' },
        { id: '2', user: 'Sibongile', text: 'Zibiza malini lezi zimvu?' },
        { id: '3', user: 'Naledi', text: 'Re ka di tsaya leng?' },
    ]);
    const overlayChatRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        (window as any).chtlConfig = { chatbotId: "7818721895" };
        const existing = document.getElementById("chtl-script") as HTMLScriptElement | null;
        if (!existing) {
            const s = document.createElement("script");
            s.id = "chtl-script";
            s.async = true;
            s.type = "text/javascript";
            s.setAttribute("data-id", "7818721895");
            s.src = "https://chatling.ai/js/embed.js";
            document.body.appendChild(s);
        }
    }, []);

    return (
        <>
        <section className="flex flex-col gap-6 p-4 w-full">
            <div className="flex flex-col gap-3">
                <span className="text-xl font-semibold text-[var(--text-color)]">Live Streams</span>
                <div className="flex flex-col gap-3 rounded-xl overflow-hidden bg-[#efefef] border p-4">
                    <div className="flex flex-row items-center justify-between">
                        <span className="text-[var(--text-color)] font-medium">This seller currently has no live streams scheduled.</span>
                    </div>
                    <p className="text-[#6b6b6b] text-sm leading-6">
                        Live streams allow you to see the product up close, ask questions in real-time,
                        and gain certainty about what you are buying before you purchase. Keep an eye on this page
                        or enable notifications so we can alert you whenever the seller goes live.
                    </p>
                    <div className="flex flex-row items-center gap-2">
                        <button className="px-3 py-2 bg-[#343434] text-white rounded text-sm" onClick={() => setShowNotifyModal(true)}>Enable Notifications</button>
                        <button className="px-3 py-2 border border-[#d1d1d1] rounded text-sm text-[#e6e6e6]">Remind Me Later</button>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
                {/* Left: Media */}
                <div className="flex flex-col gap-4">
                    <img src={product.image} alt={product.title} className="w-full h-[420px] object-cover rounded-xl overflow-hidden outline-none ring-0" onError={(e) => { (e.currentTarget as HTMLImageElement).src = getFallbackImage(product.category, product.id); }} />
                </div>

                {/* Right: Details */}
                <div className="flex flex-col gap-3">
                    <span className="text-2xl font-semibold text-[var(--text-color)]">{product.title}</span>
                    <div className="flex flex-row items-center gap-3 text-[var(--text-color)]">
                        <span className="font-bold text-2xl">{formatRand(product.price)}</span>
                        <div className="flex flex-row items-center gap-1">
                            <Star className="w-4 h-4 text-[#ff745e]" />
                            <span className="text-[#797979] text-sm">{product.rating}</span>
                            <span className="text-[#797979] text-sm">({product.reviews} reviews)</span>
                        </div>
                    </div>
                    <span className="text-[#797979] text-sm">{product.location}</span>

                    <div className="flex flex-row items-center gap-3 mt-2">
                        <QuantitySelector value={1} onChange={() => {}} />
                        <button className="px-3 py-2 bg-[#343434] text-white rounded flex items-center gap-2" onClick={() => addToCart(product.id, 1)}>
                            <ShoppingCart className="w-4 h-4" />
                            {isInCart(product.id) ? 'In Cart' : 'Add to Cart'}
                        </button>
                        <button className={`px-3 py-2 border rounded flex items-center gap-2 ${isInWishlist(product.id) ? 'border-[#ff8484] text-[#ff8484]' : 'border-[#d1d1d1] text-[#ffd694]'}`} onClick={() => toggleWishlist(product.id)}>
                            <Heart className="w-4 h-4" />
                            {isInWishlist(product.id) ? 'Wishlisted' : 'Add to Wishlist'}
                        </button>
                    </div>

                    <div className="flex flex-col gap-2 mt-4">
                        <span className="text-lg font-semibold text-[var(--text-color)]">Description</span>
                        <p className="text-[#797979] text-sm leading-6">
                            This is a high-quality, well-cared-for livestock product suitable for breeding and
                            dairy production. Raised on natural pastures and handled with care for optimal health
                            and productivity.
                        </p>
                    </div>
                </div>
                <div className="flex flex-col gap-2 mt-2">
                        <div className="flex flex-row items-center justify-between gap-2">
                            <div className="flex flex-row items-center gap-2">
                                <span className="text-lg font-semibold text-[var(--text-color)]">Reviews</span>
                                <span className="text-[#797979] text-sm">5.0 average rating</span>
                            </div>

                            <div className="px-3 py-1 bg-[#343434] text-xs text-white rounded flex items-center gap-2 cursor-pointer">
                                <Pencil className="w-3 h-3" />
                                <span>Write a Review</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3 bg-white rounded-xl p-3 border">
                            <div className="flex flex-row items-start justify-between">
                                <div className="flex flex-col">
                                    <span className="text-[var(--text-color)] font-medium">Sibongile M.</span>
                                    <span className="text-[#797979] text-xs">Mahikeng</span>
                                </div>
                                <div className="flex flex-row items-center gap-1">
                                    <Star className="w-3 h-3 text-[#ff745e]" />
                                    <span className="text-[#797979] text-xs">5.0</span>
                                </div>
                            </div>
                            <p className="text-[#797979] text-sm">Great condition and friendly seller. Highly recommend.</p>
                        </div>
                        <div className="flex flex-col gap-3 bg-white rounded-xl p-3 border">
                            <div className="flex flex-row items-start justify-between">
                                <div className="flex flex-col">
                                    <span className="text-[var(--text-color)] font-medium">Thabo K.</span>
                                    <span className="text-[#797979] text-xs">Lichtenburg</span>
                                </div>
                                <div className="flex flex-row items-center gap-1">
                                    <Star className="w-3 h-3 text-[#ff745e]" />
                                    <span className="text-[#797979] text-xs">4.0</span>
                                </div>
                            </div>
                            <p className="text-[#797979] text-sm">Exactly as advertised. Would buy again.</p>
                        </div>
                    </div>

                    {/* PLACEHOLDER SECTION */}
                    {/* <div className="flex flex-col gap-2 mt-2 bg-amber-400">
                        <span className="text-lg font-semibold text-[var(--text-color)]">Reviews</span>
                        <div className="flex flex-col gap-3 bg-white rounded-xl p-3 border">
                            <div className="flex flex-row items-start justify-between">
                                <div className="flex flex-col">
                                    <span className="text-[var(--text-color)] font-medium">Sibongile M.</span>
                                    <span className="text-[#797979] text-xs">Mahikeng</span>
                                </div>
                                <div className="flex flex-row items-center gap-1">
                                    <Star className="w-3 h-3 text-[#ff745e]" />
                                    <span className="text-[#797979] text-xs">5.0</span>
                                </div>
                            </div>
                            <p className="text-[#797979] text-sm">Great condition and friendly seller. Highly recommend.</p>
                        </div>
                        <div className="flex flex-col gap-3 bg-white rounded-xl p-3 border">
                            <div className="flex flex-row items-start justify-between">
                                <div className="flex flex-col">
                                    <span className="text-[var(--text-color)] font-medium">Thabo K.</span>
                                    <span className="text-[#797979] text-xs">Lichtenburg</span>
                                </div>
                                <div className="flex flex-row items-center gap-1">
                                    <Star className="w-3 h-3 text-[#ff745e]" />
                                    <span className="text-[#797979] text-xs">4.0</span>
                                </div>
                            </div>
                            <p className="text-[#797979] text-sm">Exactly as advertised. Would buy again.</p>
                        </div>
                    </div> */}
            </div>

            {isLiveFullscreen && (
                <div className="fixed inset-0 z-50 bg-black/90 flex">
                    <div className="relative flex-1 flex items-center justify-center p-4">
                        <video className="w-full h-full object-contain" src={videoSrc} controls autoPlay playsInline loop />
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
                        <form onSubmit={(e) => { e.preventDefault(); const t = chatInput.trim(); if (!t) return; setChatMessages((prev) => [...prev, { id: `${Date.now()}`, user: 'You', text: t }]); setChatInput(""); setTimeout(() => { if (overlayChatRef.current) overlayChatRef.current.scrollTop = overlayChatRef.current.scrollHeight; }, 0); }} className="p-3 border-t border-white/10 flex items-center gap-2">
                            <input value={chatInput} onChange={(e) => setChatInput(e.target.value)} placeholder="Say something..." className="flex-1 bg-white/10 text-white placeholder-white/40 px-3 py-2 rounded outline-none focus:outline-none" />
                            <button type="submit" className="px-3 py-2 bg-[#ff8a65] hover:bg-[#ff7a50] text-white rounded flex items-center gap-1">
                                <Send className="w-4 h-4" />
                                Send
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </section>
        {showNotifyModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                <div className="w-[420px] max-w-[92vw] bg-white rounded-xl shadow-lg border p-4 flex flex-col gap-3">
                    <div className="flex flex-row items-center justify-between">
                        <span className="text-[var(--text-color)] font-semibold">Notifications enabled</span>
                        <button className="p-1 hover:bg-[#efefef] rounded" onClick={() => setShowNotifyModal(false)}>
                            <X className="w-4 h-4 text-[#f7acac]" />
                        </button>
                    </div>
                    <p className="text-[#6b6b6b] text-sm leading-6">
                        We will alert you when this seller starts a live stream for this product or their store.
                        You can disable notifications at any time in your account settings.
                    </p>
                    <div className="flex flex-row items-center justify-end gap-2">
                        <button className="px-3 py-2 border border-[#d1d1d1] rounded text-sm text-[#e6e6e6]" onClick={() => setShowNotifyModal(false)}>Close</button>
                        <button className="px-3 py-2 bg-[#343434] text-white rounded text-sm" onClick={() => setShowNotifyModal(false)}>Okay</button>
                    </div>
                </div>
            </div>
        )}
        </>
    );
}


