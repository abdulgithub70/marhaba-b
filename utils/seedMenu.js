// One-time helper: seed MenuItem collection from the frontend's static menu data.
// Run with: npm run seed:menu
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const MenuItem = require("../models/MenuItem");

const items = [
  { name: "Peri Peri Paneer Tikka", description: "Char-grilled cottage cheese, smoked peri peri glaze, mint yoghurt.", price: 289, category: "Starters", image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=800", isVeg: true, isPopular: true },
  { name: "Chicken Chilli Dry", description: "Wok-tossed chicken, bell peppers, dark soy, roasted chilli.", price: 320, category: "Chinese", image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=80&w=800", isVeg: false, isPopular: true },
  { name: "Butter Chicken", description: "Slow-simmered tomato gravy, charcoal-smoked chicken, cream.", price: 380, category: "Indian", image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=800", isVeg: false, isPopular: true },
  { name: "Mutton Rezala", description: "Mughlai white gravy, whole spices, slow-braised mutton.", price: 450, category: "Mughlai", image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=800", isVeg: false },
  { name: "Truffle Mushroom Pizza", description: "Wood-fired base, truffle oil, wild mushrooms, mozzarella.", price: 399, category: "Pizza", image: "https://images.unsplash.com/photo-1548365328-9f547fb0953f?q=80&w=800", isVeg: true },
  { name: "Alfredo Pasta", description: "Fettuccine, creamy parmesan sauce, grilled chicken.", price: 340, category: "Pasta", image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?q=80&w=800", isVeg: false },
  { name: "Marhaba Smash Burger", description: "Double patty, smoked cheddar, burnt garlic mayo, brioche.", price: 299, category: "Burgers", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800", isVeg: false, isPopular: true },
  { name: "Grilled Chicken Sandwich", description: "Toasted sourdough, herbed chicken, cheddar, chipotle mayo.", price: 249, category: "Sandwiches", image: "https://images.unsplash.com/photo-1567234669003-dce7a7a88821?q=80&w=800", isVeg: false },
  { name: "Paneer Kathi Roll", description: "Flaky paratha, spiced paneer, onions, mint chutney.", price: 199, category: "Rolls", image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?q=80&w=800", isVeg: true },
  { name: "Marhaba Special Biryani", description: "Dum-cooked basmati, saffron, slow-cooked mutton, fried onions.", price: 420, category: "Biryani", image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=800", isVeg: false, isPopular: true },
  { name: "Barbecue Platter", description: "Tandoori chicken, seekh kebab, galouti, mint chutney.", price: 550, category: "Barbecue", image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800", isVeg: false, isPopular: true },
  { name: "Baklava Trio", description: "Pistachio, walnut and almond baklava, rose syrup.", price: 220, category: "Desserts", image: "https://images.unsplash.com/photo-1519676867240-f03562e64548?q=80&w=800", isVeg: true },
  { name: "Blue Lagoon Mocktail", description: "Blue curacao syrup, lemon, soda, mint.", price: 180, category: "Mocktails", image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?q=80&w=800", isVeg: true },
  { name: "Hazelnut Cold Coffee", description: "Double espresso, hazelnut syrup, whipped cream.", price: 190, category: "Cold Coffee", image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=800", isVeg: true },
  { name: "Kashmiri Kahwa", description: "Green tea, saffron, cardamom, almond slivers.", price: 150, category: "Tea", image: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?q=80&w=800", isVeg: true },
  { name: "Fresh Watermelon Juice", description: "Chilled, seasonal, no added sugar.", price: 140, category: "Fresh Juices", image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?q=80&w=800", isVeg: true },
  { name: "Oreo Milkshake", description: "Crushed Oreo, vanilla ice cream, chocolate drizzle.", price: 210, category: "Milkshakes", image: "https://images.unsplash.com/photo-1541636848-5f66f8e2e6b6?q=80&w=800", isVeg: true },
  { name: "Soft Drinks", description: "Coke, Sprite, Fanta, Soda - served chilled.", price: 80, category: "Soft Drinks", image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?q=80&w=800", isVeg: true },
];

(async () => {
  await connectDB();
  const existingCount = await MenuItem.countDocuments();
  if (existingCount > 0) {
    console.log(`MenuItem collection already has ${existingCount} items. Skipping seed (delete them first if you want to reseed).`);
  } else {
    await MenuItem.insertMany(items);
    console.log(`Seeded ${items.length} menu items.`);
  }
  await mongoose.connection.close();
  process.exit(0);
})();
