import React from "react";

type Props = {
    value: number;
    onChange: (next: number) => void;
    min?: number;
    max?: number;
    className?: string;
};

export default function QuantitySelector({ value, onChange, min = 1, max, className }: Props) {
    const clamp = (n: number) => {
        const lower = Math.max(min, n);
        return typeof max === 'number' ? Math.min(max, lower) : lower;
    };

    const dec = () => onChange(clamp(value - 1));
    const inc = () => onChange(clamp(value + 1));

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const n = parseInt(e.target.value || "0", 10);
        if (Number.isNaN(n)) return;
        onChange(clamp(n));
    };

    return (
        <div className={`inline-flex items-stretch border rounded-md overflow-hidden ${className ?? ''}`}>
            <button type="button" aria-label="Decrease quantity" className="px-2 bg-[#f3f3f3] hover:bg-[#e9e9e9]" onClick={dec}>
                −
            </button>
            <input
                type="number"
                className="w-14 text-center outline-none focus:outline-none"
                value={value}
                min={min}
                max={max}
                onChange={handleInput}
            />
            <button type="button" aria-label="Increase quantity" className="px-2 bg-[#f3f3f3] hover:bg-[#e9e9e9]" onClick={inc}>
                +
            </button>
        </div>
    );
}


