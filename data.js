const PRODUCTS = [
  {
    "id": 1,
    "name": "Kunbi Handloom Saree",
    "category": "Textiles",
    "price": 1299,
    "rating": 4.9,
    "reviews": 86,
    "stock": 8,
    "image": "https://www.indiainch.org/wp-content/uploads/2019/06/8.jpg"
  },
  {
    "id": 2,
    "name": "Kunbi Handloom Stole",
    "category": "Textiles",
    "price": 699,
    "rating": 4.8,
    "reviews": 54,
    "stock": 15,
    "image": "https://media.assettype.com/gomantaktimes/2024-12-14/pkh6ktj3/DSC9356.jpg?auto=format%2Ccompress&w=1024"
  },
  {
    "id": 3,
    "name": "Goan Crochet Doily",
    "category": "Textiles",
    "price": 399,
    "rating": 4.7,
    "reviews": 42,
    "stock": 22,
    "image": "https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=800&q=85"
  },
  {
    "id": 4,
    "name": "Handwoven Coir Table Mat",
    "category": "Textiles",
    "price": 349,
    "rating": 4.8,
    "reviews": 63,
    "stock": 12,
    "image": "https://media.assettype.com/gomantaktimes/2022-05/487af2e0-5d0d-4ce1-9c58-235c1fae695e/skjd.jpg"
  },
  {
    "id": 5,
    "name": "Goan Fibre Shopping Bag",
    "category": "Textiles",
    "price": 499,
    "rating": 4.8,
    "reviews": 71,
    "stock": 19,
    "image": "https://static.boredpanda.com/blog/wp-content/uploads/2015/08/427__880.jpg"
  },
  {
    "id": 6,
    "name": "Traditional Bamboo Winnowing Tray",
    "category": "Textiles",
    "price": 599,
    "rating": 4.9,
    "reviews": 39,
    "stock": 9,
    "image": "https://media.assettype.com/gomantaktimes/2022-05/487af2e0-5d0d-4ce1-9c58-235c1fae695e/skjd.jpg"
  },
  {
    "id": 7,
    "name": "Goan Azulejo Tile Plaque",
    "category": "Pottery",
    "price": 549,
    "rating": 4.9,
    "reviews": 112,
    "stock": 16,
    "image": "https://www.inditales.com/wp-content/uploads/2017/07/azulejos-plates-white-blue.jpg"
  },
  {
    "id": 8,
    "name": "Azulejo Goa Map Plate",
    "category": "Pottery",
    "price": 699,
    "rating": 4.9,
    "reviews": 95,
    "stock": 23,
    "image": "https://www.inditales.com/wp-content/uploads/2017/07/azulejos-plates-white-blue.jpg"
  },
  {
    "id": 9,
    "name": "Blue & White Rooster Plate",
    "category": "Pottery",
    "price": 649,
    "rating": 4.8,
    "reviews": 73,
    "stock": 13,
    "image": "https://goodhomes.wwmindia.com/content/2020/aug/terravida-thumbnail1597231209.jpg"
  },
  {
    "id": 10,
    "name": "Mapusa Terracotta Seahorse",
    "category": "Pottery",
    "price": 399,
    "rating": 4.8,
    "reviews": 61,
    "stock": 20,
    "image": "https://images.squarespace-cdn.com/content/v1/5440d7f5e4b08cdfdca6352a/1729593380534-SYLJ0NV4PUGTF8H6UOGJ/IMG-20240726-WA0065.jpg"
  },
  {
    "id": 11,
    "name": "Goan Terracotta Flower Vase",
    "category": "Pottery",
    "price": 749,
    "rating": 4.7,
    "reviews": 45,
    "stock": 10,
    "image": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/30/62/be/19/caption.jpg?h=1100&s=1&w=1100"
  },
  {
    "id": 12,
    "name": "Traditional Clay Diya Set",
    "category": "Pottery",
    "price": 249,
    "rating": 4.9,
    "reviews": 124,
    "stock": 17,
    "image": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/30/62/be/19/caption.jpg?h=1100&s=1&w=1100"
  },
  {
    "id": 13,
    "name": "Kokum Spice Gift Jar",
    "category": "Spices",
    "price": 249,
    "rating": 4.9,
    "reviews": 151,
    "stock": 24,
    "image": "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=85"
  },
  {
    "id": 14,
    "name": "Goan Curry Masala",
    "category": "Spices",
    "price": 299,
    "rating": 4.8,
    "reviews": 102,
    "stock": 14,
    "image":  "https://goanafoods.com/uploads/catimages/iid3458_698573bfb5813_fish_curry_powder.webp"
  },
  {
    "id": 15,
    "name": "Roasted Goan Chilli Flakes",
    "category": "Spices",
    "price": 179,
    "rating": 4.7,
    "reviews": 68,
    "stock": 21,
    "image": "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=85"
  },
  {
    "id": 16,
    "name": "Coastal Pepper & Sea Salt",
    "category": "Spices",
    "price": 229,
    "rating": 4.8,
    "reviews": 74,
    "stock": 11,
    "image": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=85"
  },
  {
    "id": 17,
    "name": "Kokum & Chilli Masala",
    "category": "Spices",
    "price": 219,
    "rating": 4.8,
    "reviews": 58,
    "stock": 18,
    "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=85"
  },
  {
    "id": 18,
    "name": "Coconut Shell Pendant",
    "category": "Jewellery",
    "price": 399,
    "rating": 4.8,
    "reviews": 87,
    "stock": 8,
    "image": "https://img2.exportersindia.com/product_images/bc-full/2024/2/8444945/coconut-shell-keychain-1708515901-7304650.jpeg"
  },
  {
    "id": 19,
    "name": "Coconut Shell Bangle",
    "category": "Jewellery",
    "price": 349,
    "rating": 4.7,
    "reviews": 52,
    "stock": 15,
    "image": "https://pbs.twimg.com/media/Db9HXvNXcAAyfJE.jpg"
  },
  {
    "id": 20,
    "name": "Sea Shell Charm Necklace",
    "category": "Jewellery",
    "price": 549,
    "rating": 4.8,
    "reviews": 69,
    "stock": 22,
    "image": "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=85"
  },
  {
    "id": 21,
    "name": "Goan Silver Jhumka Pair",
    "category": "Jewellery",
    "price": 599,
    "rating": 4.8,
    "reviews": 89,
    "stock": 12,
    "image": "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=85"
  },
  {
    "id": 22,
    "name": "Parra Coconut Shell Flower Bowl",
    "category": "Home Decor",
    "price": 449,
    "rating": 4.9,
    "reviews": 73,
    "stock": 19,
    "image": "https://www.dsource.in/sites/default/files/resource/intricate-coconut-carving-parra-goa/products/minigallery/14741/13.jpg"
  },
  {
    "id": 23,
    "name": "Goan Coconut Shell Mini Boat",
    "category": "Home Decor",
    "price": 699,
    "rating": 4.8,
    "reviews": 47,
    "stock": 9,
    "image": "https://static.pib.gov.in/WriteReadData/userfiles/image/PIC5%281%29NOGI.jpg"
  },
  {
    "id": 24,
    "name": "Handwoven Goan Cane Basket",
    "category": "Home Decor",
    "price": 549,
    "rating": 4.9,
    "reviews": 82,
    "stock": 16,
    "image": "https://lovetravelguides.com/sites/default/files/cane%201321%20selected%20shot_0.JPG"
  },
  {
    "id": 25,
    "name": "Coconut Shell Decorative Lamp",
    "category": "Home Decor",
    "price": 799,
    "rating": 4.8,
    "reviews": 66,
    "stock": 23,
    "image": "https://static.pib.gov.in/WriteReadData/userfiles/image/PIC5%281%29NOGI.jpg"
  }
];

const COUPONS = {
  WELCOME10: {type:"percent", value:10, min:0, description:"10% off your order"},
  SAVE150: {type:"flat", value:150, min:1000, description:"₹150 off orders ₹1,000+"},
  FREESHIP: {type:"shipping", value:100, min:999, description:"Free delivery on orders ₹999+"},
  B2G1POTTERY: {type:"b2g1", category:"Pottery", description:"Buy 2, get 1 free on Pottery"}
};