import product1 from "../../assets/livestock/product1.png";
import product2 from "../../assets/livestock/product2.png";
import product3 from "../../assets/livestock/product3.png";
import product4 from "../../assets/livestock/product4.png";

import product1_ from "../../assets/fresh_produce/product1_.png";
import product2_ from "../../assets/fresh_produce/product2_.png";
import product3_ from "../../assets/fresh_produce/product3_.png";
import product4_ from "../../assets/fresh_produce/product4_.png";

import farmer1 from "../../assets/farmers/farmer1_.png";
import farmer2 from "../../assets/farmers/farmer2_.png";


export type Product = {
    id: string;
    title: string;
    category: "livestock" | "produce" | "fashion" | "furniture" | "art";
    image: string;
    price: number; // cents or rands? Use rands as integer for display
    rating: number; // 0 - 5
    reviews: number;
    location: string;
};

export type ScheduledLiveSession = {
    id: string;
    title: string;
    category: "live";
    image: string;
    location: string;
    time: string;
};

const locations = [
    "Mahikeng, Mmabatho unit 5",
    "Mahikeng, Mmabatho unit 7",
    "Mahikeng, CBD",
    "Lichtenburg, Central",
    "Rustenburg, Tlhabane",
    "Mahikeng, Unit 3",
];

const randomBetween = (min: number, max: number) => Math.random() * (max - min) + min;

const generateRating = () => Math.round(randomBetween(3.5, 5.0) * 10) / 10; // one decimal
const generateReviews = () => Math.floor(randomBetween(50, 1200));
const randomLocation = () => locations[Math.floor(Math.random() * locations.length)];

// Generate once at module load for session-stable values
export const products: Product[] = [
    // Livestock 1..4
    { id: "1", title: "Cow", category: "livestock", image: product1, price: 18500, rating: generateRating(), reviews: generateReviews(), location: randomLocation() },
    { id: "2", title: "Sheep", category: "livestock", image: product2, price: 2500, rating: generateRating(), reviews: generateReviews(), location: randomLocation() },
    { id: "3", title: "Chicken", category: "livestock", image: product3, price: 120, rating: generateRating(), reviews: generateReviews(), location: randomLocation() },
    { id: "4", title: "Chickens", category: "livestock", image: product4, price: 600, rating: generateRating(), reviews: generateReviews(), location: randomLocation() },
    // Fresh produce 101..104
    { id: "101", title: "Cabbage", category: "produce", image: product1_, price: 25, rating: generateRating(), reviews: generateReviews(), location: randomLocation() },
    { id: "102", title: "Potatoes", category: "produce", image: product2_, price: 60, rating: generateRating(), reviews: generateReviews(), location: randomLocation() },
    { id: "103", title: "Green Hubbard", category: "produce", image: product3_, price: 45, rating: generateRating(), reviews: generateReviews(), location: randomLocation() },
    { id: "104", title: "Bananas", category: "produce", image: product4_, price: 35, rating: generateRating(), reviews: generateReviews(), location: randomLocation() },
    // Fashion 201..204 (external images)
    { id: "201", title: "Local Designer Dress", category: "fashion", image: "https://rightland.co.za/wp-content/uploads/2021/01/the-house-of-diva-ankara-maxi-dress-0990.jpg", price: 450, rating: generateRating(), reviews: generateReviews(), location: randomLocation() },
    { id: "202", title: "Handmade Shirt", category: "fashion", image: "https://oldschool.co.za/cdn/shop/files/kaizer-chiefs-ss-knitted-jersey-ivory-921375.jpg?v=1746301789&width=2000", price: 300, rating: generateRating(), reviews: generateReviews(), location: randomLocation() },
    { id: "203", title: "Beaded Jacket", category: "fashion", image: "https://zaniafrica.co/wp-content/uploads/2024/05/ndeb11.webp", price: 1200, rating: generateRating(), reviews: generateReviews(), location: randomLocation() },
    { id: "204", title: "Traditional Wear", category: "fashion", image: "https://media.istockphoto.com/id/515277289/photo/young-african-woman-in-traditional-clothes.jpg?s=612x612&w=0&k=20&c=gxp9xHQ_v2XcWJcuyAAEz4gCrxrGpns82a_LZMiOx4k=", price: 1500, rating: generateRating(), reviews: generateReviews(), location: randomLocation() },
    // Furniture 301..304
    { id: "301", title: "Handcrafted Coffee Table", category: "furniture", image: "https://www.furnitureliquidation.co.za/wp-content/uploads/2022/06/CAS003-Satao-Round-Coffee-Table-.jpg", price: 2500, rating: generateRating(), reviews: generateReviews(), location: randomLocation() },
    { id: "302", title: "Solid Wood Chair", category: "furniture", image: "https://thestreets.co.za/wp-content/uploads/2023/09/Idili-Dining-Chair-dark-oil2.jpg", price: 600, rating: generateRating(), reviews: generateReviews(), location: randomLocation() },
    { id: "303", title: "Wall Shelf", category: "furniture", image: "https://cdn11.bigcommerce.com/s-mpvsefvrp3/images/stencil/1280x1280/products/347/867/Wall_Mounted_Shelving__92185.1738605054.jpg?c=1", price: 850, rating: generateRating(), reviews: generateReviews(), location: randomLocation() },
    { id: "304", title: "Dining Table", category: "furniture", image: "https://homewood.co.za/wp-content/uploads/2020/04/DSC_0095-scaled.jpg", price: 5500, rating: generateRating(), reviews: generateReviews(), location: randomLocation() },
    // Art 401..404
    { id: "401", title: "Acrylic Painting", category: "art", image: "https://art-online.co.za/wp-content/uploads/2022/04/a29833_800x528_.jpg", price: 1800, rating: generateRating(), reviews: generateReviews(), location: randomLocation() },
    { id: "402", title: "Beaded Artwork", category: "art", image: "https://media.istockphoto.com/id/621834314/photo/beaded-giraffe.jpg?s=612x612&w=0&k=20&c=grVanX0ltdyXCRRt0y2RHLjO7hqbmMglOgZLKDDmv2Q=", price: 700, rating: generateRating(), reviews: generateReviews(), location: randomLocation() },
    { id: "403", title: "Clay Sculpture", category: "art", image: "https://i0.wp.com/sundayworld.co.za/wp-content/uploads/2022/10/P18-mabasa-art-jpg.webp?resize=696%2C462&ssl=1", price: 2200, rating: generateRating(), reviews: generateReviews(), location: randomLocation() },
    { id: "404", title: "Photography Print", category: "art", image: "https://source.unsplash.com/600x600/?photography,print", price: 450, rating: generateRating(), reviews: generateReviews(), location: randomLocation() },
];

export const scheduledLiveSessions: ScheduledLiveSession[] = [
    { id: "501", title: "Ntate Moloto's Monthly Sheep Sale", category: "live", image: farmer1, location: "Mahikeng, Unit 8", time: "10:00"  },
    { id: "502", title: "Bongani's Cow Auction", category: "live", image: farmer2, location: "Mahikeng, Unit 8", time: "10:00" },
];

export const getProductById = (id: string): Product | undefined => {
    return products.find(p => p.id === id);
}

export const formatRand = (value: number): string => {
    const s = Math.round(value).toString();
    return "R" + s.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export const getFallbackImage = (category: Product["category"], id: string): string => {
    return `https://picsum.photos/seed/${category}-${id}/600/600`;
}

// Deterministic per-product video sources for previews/details
const productVideoSources: string[] = [
    "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    "https://media.w3.org/2010/05/bunny/trailer.mp4",
    "https://media.w3.org/2010/05/sintel/trailer.mp4",
    "https://media.w3.org/2010/05/video/movie_300.mp4",
    "https://media.w3.org/2010/05/bunny/movie.mp4",
    "https://media.w3.org/2010/05/sintel/trailer.mp4#t=0.1",
];

export const getProductVideoSrc = (id: string): string => {
    // Simple hash based on id
    let hash = 0;
    for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
    const idx = hash % productVideoSources.length;
    return productVideoSources[idx];
}


