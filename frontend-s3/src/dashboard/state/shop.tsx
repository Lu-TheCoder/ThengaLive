import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { Product } from "../data/products";
import { getProductById } from "../data/products";

type CartItem = { id: string; quantity: number };

type ShopState = {
    cart: CartItem[];
    wishlist: string[];
    addToCart: (id: string, quantity?: number) => void;
    removeFromCart: (id: string) => void;
    setCartQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    addToWishlist: (id: string) => void;
    removeFromWishlist: (id: string) => void;
    toggleWishlist: (id: string) => void;
    isInWishlist: (id: string) => boolean;
    isInCart: (id: string) => boolean;
    getCartProducts: () => Array<{ product: Product; quantity: number }>;
    getCartTotal: () => number;
    checkout: () => Promise<{ success: boolean; orderId?: string }>;
};

const ShopContext = createContext<ShopState | null>(null);

const CART_KEY = "tl_cart_v1";
const WISHLIST_KEY = "tl_wishlist_v1";

export function ShopProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>(() => {
        try {
            const raw = localStorage.getItem(CART_KEY);
            return raw ? JSON.parse(raw) : [];
        } catch {
            return [];
        }
    });

    const [wishlist, setWishlist] = useState<string[]>(() => {
        try {
            const raw = localStorage.getItem(WISHLIST_KEY);
            return raw ? JSON.parse(raw) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
    }, [wishlist]);

    const addToCart = useCallback((id: string, quantity: number = 1) => {
        setCart((prev) => {
            const existing = prev.find((c) => c.id === id);
            if (existing) {
                return prev.map((c) => (c.id === id ? { ...c, quantity: c.quantity + quantity } : c));
            }
            return [...prev, { id, quantity }];
        });
    }, []);

    const removeFromCart = useCallback((id: string) => {
        setCart((prev) => prev.filter((c) => c.id !== id));
    }, []);

    const setCartQuantity = useCallback((id: string, quantity: number) => {
        const q = Math.max(1, Math.floor(quantity));
        setCart((prev) => {
            const exists = prev.some((c) => c.id === id);
            return exists ? prev.map((c) => (c.id === id ? { ...c, quantity: q } : c)) : [...prev, { id, quantity: q }];
        });
    }, []);

    const clearCart = useCallback(() => setCart([]), []);

    const addToWishlist = useCallback((id: string) => {
        setWishlist((prev) => (prev.includes(id) ? prev : [...prev, id]));
    }, []);

    const removeFromWishlist = useCallback((id: string) => {
        setWishlist((prev) => prev.filter((w) => w !== id));
    }, []);

    const toggleWishlist = useCallback((id: string) => {
        setWishlist((prev) => (prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id]));
    }, []);

    const isInWishlist = useCallback((id: string) => wishlist.includes(id), [wishlist]);
    const isInCart = useCallback((id: string) => cart.some((c) => c.id === id), [cart]);

    const getCartProducts = useCallback(() => {
        return cart
            .map(({ id, quantity }) => {
                const product = getProductById(id);
                if (!product) return null;
                return { product, quantity };
            })
            .filter(Boolean) as Array<{ product: Product; quantity: number }>;
    }, [cart]);

    const getCartTotal = useCallback(() => {
        return getCartProducts().reduce((sum, { product, quantity }) => sum + product.price * quantity, 0);
    }, [getCartProducts]);

    const checkout = useCallback(async () => {
        // Simulate API call
        await new Promise((r) => setTimeout(r, 1200));
        const orderId = Math.random().toString(36).slice(2, 10).toUpperCase();
        clearCart();
        return { success: true, orderId };
    }, [clearCart]);

    const value: ShopState = useMemo(
        () => ({
            cart,
            wishlist,
            addToCart,
            removeFromCart,
            setCartQuantity,
            clearCart,
            addToWishlist,
            removeFromWishlist,
            toggleWishlist,
            isInWishlist,
            isInCart,
            getCartProducts,
            getCartTotal,
            checkout,
        }),
        [cart, wishlist, addToCart, removeFromCart, clearCart, addToWishlist, removeFromWishlist, toggleWishlist, isInWishlist, isInCart, getCartProducts, getCartTotal, checkout]
    );

    return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
    const ctx = useContext(ShopContext);
    if (!ctx) throw new Error("useShop must be used within ShopProvider");
    return ctx;
}


