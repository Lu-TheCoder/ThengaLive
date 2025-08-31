import { Heart, ShoppingCart, Tv, UserRound } from "lucide-react";
import { Link, Outlet } from "react-router-dom";

export default function Dashboard() {
    return (
        <main className="w-screen h-screen overflow-hidden">
            <nav className="flex flex-row items-center justify-between border-b border-[#e4e4e4] p-2">
                <div className="flex flex-row items-center gap-1 ">
                    <Tv className="w-5 h-5 text-[var(--text-color)]" />
                    <span className="text-xl text-[var(--text-color)] font-semibold">Thenga</span>
                    <span className="text-xl text-[var(--text-color)] font-light">Live</span>
                </div>
                <div className="flex flex-row items-center gap-2">
                    <Link to="/cart" className="flex flex-row items-center gap-1 hover:bg-[#343434] rounded-sm p-2 group transition-all duration-100 cursor-pointer">
                        <ShoppingCart className="w-5 h-5 text-[var(--text-color)] group-hover:text-[var(--text-color-hover)] transition-all duration-100" />
                    </Link>
                    <Link to="/wishlist" className="flex flex-row items-center gap-1 hover:bg-[#343434] rounded-sm p-2 group transition-all duration-100 cursor-pointer">
                        <Heart className="w-5 h-5 text-[var(--text-color)] group-hover:text-[var(--text-color-hover)] transition-all duration-100" />
                    </Link>
                    <div className="flex flex-row items-center gap-1 hover:bg-[#343434] rounded-sm p-2 group transition-all duration-100 cursor-pointer">
                        <UserRound className="w-5 h-5 text-[var(--text-color)] group-hover:text-[var(--text-color-hover)] transition-all duration-100" />
                    </div>
                </div>
            </nav>

            <section className="flex flex-col w-full h-full overflow-scroll pb-20">
                <Outlet />
            </section>
        </main>
    )
}