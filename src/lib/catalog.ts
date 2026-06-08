export interface Product {
  id: string
  name: string
  brand: string
  category: string
  subcategory?: string
  releaseYear?: number
  msrp?: number
}

export type ProductEntry = Product

export const CATEGORIES = [
  'GPU', 'CPU', 'Console', 'Laptop', 'Écran',
  'Clavier', 'Souris', 'Casque', 'Manette',
  'Composant', 'VR', 'Streaming', 'Handheld', 'Smartphone'
]

export const CATALOG: Product[] = [
  { id: 'rtx-4090', name: 'RTX 4090', brand: 'NVIDIA', category: 'GPU', releaseYear: 2022, msrp: 1599 },
  { id: 'rtx-4080-super', name: 'RTX 4080 Super', brand: 'NVIDIA', category: 'GPU', releaseYear: 2024, msrp: 999 },
  { id: 'rtx-4080', name: 'RTX 4080', brand: 'NVIDIA', category: 'GPU', releaseYear: 2022, msrp: 1199 },
  { id: 'rtx-4070-ti-super', name: 'RTX 4070 Ti Super', brand: 'NVIDIA', category: 'GPU', releaseYear: 2024, msrp: 799 },
  { id: 'rtx-4070-ti', name: 'RTX 4070 Ti', brand: 'NVIDIA', category: 'GPU', releaseYear: 2023, msrp: 799 },
  { id: 'rtx-4070-super', name: 'RTX 4070 Super', brand: 'NVIDIA', category: 'GPU', releaseYear: 2024, msrp: 599 },
  { id: 'rtx-4070', name: 'RTX 4070', brand: 'NVIDIA', category: 'GPU', releaseYear: 2023, msrp: 599 },
  { id: 'rtx-4060-ti', name: 'RTX 4060 Ti', brand: 'NVIDIA', category: 'GPU', releaseYear: 2023, msrp: 399 },
  { id: 'rtx-4060', name: 'RTX 4060', brand: 'NVIDIA', category: 'GPU', releaseYear: 2023, msrp: 299 },
  { id: 'rtx-3090', name: 'RTX 3090', brand: 'NVIDIA', category: 'GPU', releaseYear: 2020, msrp: 1499 },
  { id: 'rtx-3080', name: 'RTX 3080', brand: 'NVIDIA', category: 'GPU', releaseYear: 2020, msrp: 699 },
  { id: 'rtx-3070', name: 'RTX 3070', brand: 'NVIDIA', category: 'GPU', releaseYear: 2020, msrp: 499 },
  { id: 'rtx-3060', name: 'RTX 3060', brand: 'NVIDIA', category: 'GPU', releaseYear: 2021, msrp: 329 },
  { id: 'rx-7900-xtx', name: 'RX 7900 XTX', brand: 'AMD', category: 'GPU', releaseYear: 2022, msrp: 999 },
  { id: 'rx-7900-xt', name: 'RX 7900 XT', brand: 'AMD', category: 'GPU', releaseYear: 2022, msrp: 899 },
  { id: 'rx-7800-xt', name: 'RX 7800 XT', brand: 'AMD', category: 'GPU', releaseYear: 2023, msrp: 499 },
  { id: 'rx-7700-xt', name: 'RX 7700 XT', brand: 'AMD', category: 'GPU', releaseYear: 2023, msrp: 449 },
  { id: 'rx-7600', name: 'RX 7600', brand: 'AMD', category: 'GPU', releaseYear: 2023, msrp: 269 },
  { id: 'rx-6900-xt', name: 'RX 6900 XT', brand: 'AMD', category: 'GPU', releaseYear: 2020, msrp: 999 },
  { id: 'rx-6800-xt', name: 'RX 6800 XT', brand: 'AMD', category: 'GPU', releaseYear: 2020, msrp: 649 },
  { id: 'rx-6700-xt', name: 'RX 6700 XT', brand: 'AMD', category: 'GPU', releaseYear: 2021, msrp: 479 },
  { id: 'arc-a770', name: 'Arc A770', brand: 'Intel', category: 'GPU', releaseYear: 2022, msrp: 349 },
  { id: 'i9-14900k', name: 'Core i9-14900K', brand: 'Intel', category: 'CPU', releaseYear: 2023, msrp: 589 },
  { id: 'i9-13900k', name: 'Core i9-13900K', brand: 'Intel', category: 'CPU', releaseYear: 2022, msrp: 589 },
  { id: 'i7-14700k', name: 'Core i7-14700K', brand: 'Intel', category: 'CPU', releaseYear: 2023, msrp: 409 },
  { id: 'i7-13700k', name: 'Core i7-13700K', brand: 'Intel', category: 'CPU', releaseYear: 2022, msrp: 409 },
  { id: 'i5-14600k', name: 'Core i5-14600K', brand: 'Intel', category: 'CPU', releaseYear: 2023, msrp: 319 },
  { id: 'i5-13600k', name: 'Core i5-13600K', brand: 'Intel', category: 'CPU', releaseYear: 2022, msrp: 319 },
  { id: 'ryzen-9-7950x3d', name: 'Ryzen 9 7950X3D', brand: 'AMD', category: 'CPU', releaseYear: 2023, msrp: 699 },
  { id: 'ryzen-9-7950x', name: 'Ryzen 9 7950X', brand: 'AMD', category: 'CPU', releaseYear: 2022, msrp: 699 },
  { id: 'ryzen-9-7900x', name: 'Ryzen 9 7900X', brand: 'AMD', category: 'CPU', releaseYear: 2022, msrp: 549 },
  { id: 'ryzen-7-7800x3d', name: 'Ryzen 7 7800X3D', brand: 'AMD', category: 'CPU', releaseYear: 2023, msrp: 449 },
  { id: 'ryzen-7-7700x', name: 'Ryzen 7 7700X', brand: 'AMD', category: 'CPU', releaseYear: 2022, msrp: 399 },
  { id: 'ryzen-5-7600x', name: 'Ryzen 5 7600X', brand: 'AMD', category: 'CPU', releaseYear: 2022, msrp: 299 },
  { id: 'ryzen-9-5900x', name: 'Ryzen 9 5900X', brand: 'AMD', category: 'CPU', releaseYear: 2020, msrp: 549 },
  { id: 'ryzen-7-5800x3d', name: 'Ryzen 7 5800X3D', brand: 'AMD', category: 'CPU', releaseYear: 2022, msrp: 449 },
  { id: 'ryzen-5-5600x', name: 'Ryzen 5 5600X', brand: 'AMD', category: 'CPU', releaseYear: 2020, msrp: 299 },
  { id: 'ps5', name: 'PlayStation 5', brand: 'Sony', category: 'Console', releaseYear: 2020, msrp: 549 },
  { id: 'ps5-slim', name: 'PlayStation 5 Slim', brand: 'Sony', category: 'Console', releaseYear: 2023, msrp: 449 },
  { id: 'ps5-digital', name: 'PS5 Digital Edition', brand: 'Sony', category: 'Console', releaseYear: 2020, msrp: 449 },
  { id: 'ps4-pro', name: 'PlayStation 4 Pro', brand: 'Sony', category: 'Console', releaseYear: 2016, msrp: 399 },
  { id: 'xbox-series-x', name: 'Xbox Series X', brand: 'Microsoft', category: 'Console', releaseYear: 2020, msrp: 499 },
  { id: 'xbox-series-s', name: 'Xbox Series S', brand: 'Microsoft', category: 'Console', releaseYear: 2020, msrp: 299 },
  { id: 'switch-oled', name: 'Nintendo Switch OLED', brand: 'Nintendo', category: 'Console', releaseYear: 2021, msrp: 349 },
  { id: 'switch-v2', name: 'Nintendo Switch V2', brand: 'Nintendo', category: 'Console', releaseYear: 2019, msrp: 299 },
  { id: 'switch-lite', name: 'Nintendo Switch Lite', brand: 'Nintendo', category: 'Console', releaseYear: 2019, msrp: 219 },
  { id: 'steam-deck-oled-1tb', name: 'Steam Deck OLED 1To', brand: 'Valve', category: 'Handheld', releaseYear: 2023, msrp: 679 },
  { id: 'steam-deck-oled-512', name: 'Steam Deck OLED 512Go', brand: 'Valve', category: 'Handheld', releaseYear: 2023, msrp: 569 },
  { id: 'steam-deck-512', name: 'Steam Deck 512Go', brand: 'Valve', category: 'Handheld', releaseYear: 2022, msrp: 449 },
  { id: 'rog-ally-x', name: 'ROG Ally X', brand: 'ASUS', category: 'Handheld', releaseYear: 2024, msrp: 899 },
  { id: 'rog-ally', name: 'ROG Ally', brand: 'ASUS', category: 'Handheld', releaseYear: 2023, msrp: 699 },
  { id: 'legion-go', name: 'Legion Go', brand: 'Lenovo', category: 'Handheld', releaseYear: 2023, msrp: 699 },
  { id: 'meta-quest-3-512', name: 'Meta Quest 3 512Go', brand: 'Meta', category: 'VR', releaseYear: 2023, msrp: 649 },
  { id: 'meta-quest-3-128', name: 'Meta Quest 3 128Go', brand: 'Meta', category: 'VR', releaseYear: 2023, msrp: 549 },
  { id: 'meta-quest-2', name: 'Meta Quest 2 256Go', brand: 'Meta', category: 'VR', releaseYear: 2021, msrp: 349 },
  { id: 'psvr2', name: 'PlayStation VR2', brand: 'Sony', category: 'VR', releaseYear: 2023, msrp: 599 },
  { id: 'valve-index', name: 'Valve Index', brand: 'Valve', category: 'VR', releaseYear: 2019, msrp: 999 },
  { id: 'rog-zephyrus-g16', name: 'ROG Zephyrus G16 2024', brand: 'ASUS', category: 'Laptop', releaseYear: 2024, msrp: 2499 },
  { id: 'rog-zephyrus-g14', name: 'ROG Zephyrus G14 2024', brand: 'ASUS', category: 'Laptop', releaseYear: 2024, msrp: 1799 },
  { id: 'rog-strix-scar-18', name: 'ROG Strix SCAR 18', brand: 'ASUS', category: 'Laptop', releaseYear: 2024, msrp: 3499 },
  { id: 'razer-blade-16', name: 'Razer Blade 16', brand: 'Razer', category: 'Laptop', releaseYear: 2024, msrp: 3499 },
  { id: 'razer-blade-15', name: 'Razer Blade 15', brand: 'Razer', category: 'Laptop', releaseYear: 2024, msrp: 2799 },
  { id: 'legion-7i-gen9', name: 'Legion 7i Gen 9', brand: 'Lenovo', category: 'Laptop', releaseYear: 2024, msrp: 2499 },
  { id: 'legion-5-pro', name: 'Legion 5 Pro Gen 9', brand: 'Lenovo', category: 'Laptop', releaseYear: 2024, msrp: 1599 },
  { id: 'alienware-m18-r2', name: 'Alienware m18 R2', brand: 'Dell', category: 'Laptop', releaseYear: 2024, msrp: 3499 },
  { id: 'lg-27gp950', name: 'LG UltraGear 27GP950', brand: 'LG', category: 'Écran', releaseYear: 2021, msrp: 799 },
  { id: 'lg-27gr95qe', name: 'LG UltraGear 27GR95QE OLED', brand: 'LG', category: 'Écran', releaseYear: 2022, msrp: 999 },
  { id: 'asus-pg27aqdm', name: 'ROG Swift PG27AQDM', brand: 'ASUS', category: 'Écran', releaseYear: 2022, msrp: 899 },
  { id: 'samsung-odyssey-g9', name: 'Odyssey OLED G9', brand: 'Samsung', category: 'Écran', releaseYear: 2023, msrp: 1499 },
  { id: 'acer-predator-x27u', name: 'Predator X27U', brand: 'Acer', category: 'Écran', releaseYear: 2023, msrp: 799 },
  { id: 'wooting-60he', name: 'Wooting 60HE', brand: 'Wooting', category: 'Clavier', releaseYear: 2022, msrp: 175 },
  { id: 'wooting-two-he', name: 'Wooting Two HE', brand: 'Wooting', category: 'Clavier', releaseYear: 2022, msrp: 175 },
  { id: 'rog-azoth', name: 'ROG Azoth', brand: 'ASUS', category: 'Clavier', releaseYear: 2023, msrp: 249 },
  { id: 'corsair-k100', name: 'K100 RGB', brand: 'Corsair', category: 'Clavier', releaseYear: 2021, msrp: 229 },
  { id: 'steelseries-apex-pro', name: 'Apex Pro TKL', brand: 'SteelSeries', category: 'Clavier', releaseYear: 2023, msrp: 229 },
  { id: 'logitech-g915-tkl', name: 'G915 TKL', brand: 'Logitech', category: 'Clavier', releaseYear: 2020, msrp: 219 },
  { id: 'razer-huntsman-v3', name: 'Huntsman V3 Pro', brand: 'Razer', category: 'Clavier', releaseYear: 2023, msrp: 249 },
  { id: 'keychron-q1-pro', name: 'Keychron Q1 Pro', brand: 'Keychron', category: 'Clavier', releaseYear: 2023, msrp: 199 },
  { id: 'ducky-one-3', name: 'Ducky One 3', brand: 'Ducky', category: 'Clavier', releaseYear: 2021, msrp: 129 },
  { id: 'logitech-gpx2', name: 'G Pro X Superlight 2', brand: 'Logitech', category: 'Souris', releaseYear: 2023, msrp: 159 },
  { id: 'logitech-gpx2-dex', name: 'G Pro X Superlight 2 DEX', brand: 'Logitech', category: 'Souris', releaseYear: 2024, msrp: 189 },
  { id: 'razer-deathadder-v3', name: 'DeathAdder V3', brand: 'Razer', category: 'Souris', releaseYear: 2022, msrp: 99 },
  { id: 'razer-viper-v3', name: 'Viper V3 HyperSpeed', brand: 'Razer', category: 'Souris', releaseYear: 2024, msrp: 79 },
  { id: 'pulsar-x2-v2', name: 'Pulsar X2 V2', brand: 'Pulsar', category: 'Souris', releaseYear: 2023, msrp: 89 },
  { id: 'asus-rog-harpe', name: 'ROG Harpe Ace', brand: 'ASUS', category: 'Souris', releaseYear: 2023, msrp: 119 },
  { id: 'endgame-xm2we', name: 'XM2we', brand: 'EndGame Gear', category: 'Souris', releaseYear: 2022, msrp: 79 },
  { id: 'corsair-m75-air', name: 'M75 Air', brand: 'Corsair', category: 'Souris', releaseYear: 2024, msrp: 109 },
  { id: 'sony-wh1000xm5', name: 'WH-1000XM5', brand: 'Sony', category: 'Casque', releaseYear: 2022, msrp: 349 },
  { id: 'sony-wh1000xm4', name: 'WH-1000XM4', brand: 'Sony', category: 'Casque', releaseYear: 2020, msrp: 349 },
  { id: 'airpods-pro-2', name: 'AirPods Pro 2', brand: 'Apple', category: 'Casque', releaseYear: 2022, msrp: 279 },
  { id: 'airpods-max', name: 'AirPods Max', brand: 'Apple', category: 'Casque', releaseYear: 2020, msrp: 629 },
  { id: 'steelseries-nova-pro', name: 'Arctis Nova Pro Wireless', brand: 'SteelSeries', category: 'Casque', releaseYear: 2022, msrp: 349 },
  { id: 'steelseries-nova-7', name: 'Arctis Nova 7', brand: 'SteelSeries', category: 'Casque', releaseYear: 2022, msrp: 179 },
  { id: 'logitech-gpx2-headset', name: 'G Pro X 2 Lightspeed', brand: 'Logitech', category: 'Casque', releaseYear: 2023, msrp: 199 },
  { id: 'hyperx-cloud-alpha', name: 'Cloud Alpha Wireless', brand: 'HyperX', category: 'Casque', releaseYear: 2022, msrp: 199 },
  { id: 'sennheiser-hd600', name: 'HD 600', brand: 'Sennheiser', category: 'Casque', releaseYear: 2019, msrp: 299 },
  { id: 'dualsense-edge', name: 'DualSense Edge', brand: 'Sony', category: 'Manette', releaseYear: 2023, msrp: 239 },
  { id: 'dualsense', name: 'DualSense', brand: 'Sony', category: 'Manette', releaseYear: 2020, msrp: 79 },
  { id: 'xbox-elite-2', name: 'Xbox Elite Series 2', brand: 'Microsoft', category: 'Manette', releaseYear: 2019, msrp: 179 },
  { id: 'xbox-controller', name: 'Manette Xbox Series', brand: 'Microsoft', category: 'Manette', releaseYear: 2020, msrp: 59 },
  { id: 'nacon-revolution-5', name: 'Revolution 5 Pro', brand: 'Nacon', category: 'Manette', releaseYear: 2023, msrp: 199 },
  { id: 'scuf-reflex-pro', name: 'SCUF Reflex Pro', brand: 'SCUF', category: 'Manette', releaseYear: 2021, msrp: 199 },
  { id: 'samsung-990-pro-2tb', name: 'SSD 990 Pro 2To', brand: 'Samsung', category: 'Composant', subcategory: 'SSD', releaseYear: 2022, msrp: 229 },
  { id: 'samsung-990-pro-1tb', name: 'SSD 990 Pro 1To', brand: 'Samsung', category: 'Composant', subcategory: 'SSD', releaseYear: 2022, msrp: 129 },
  { id: 'wd-sn850x-2tb', name: 'WD Black SN850X 2To', brand: 'WD', category: 'Composant', subcategory: 'SSD', releaseYear: 2022, msrp: 199 },
  { id: 'corsair-32gb-ddr5', name: 'Vengeance 32Go DDR5-6000', brand: 'Corsair', category: 'Composant', subcategory: 'RAM', releaseYear: 2022, msrp: 149 },
  { id: 'gskill-32gb-ddr5', name: 'Trident Z5 32Go DDR5-6000', brand: 'G.Skill', category: 'Composant', subcategory: 'RAM', releaseYear: 2022, msrp: 169 },
  { id: 'noctua-nh-d15', name: 'NH-D15', brand: 'Noctua', category: 'Composant', subcategory: 'Refroidissement', releaseYear: 2020, msrp: 99 },
  { id: 'corsair-h150i', name: 'H150i Elite LCD XT', brand: 'Corsair', category: 'Composant', subcategory: 'Refroidissement', releaseYear: 2023, msrp: 269 },
  { id: 'corsair-hx1000i', name: 'HX1000i 1000W', brand: 'Corsair', category: 'Composant', subcategory: 'Alimentation', releaseYear: 2022, msrp: 299 },
  { id: 'elgato-4k60-pro', name: '4K60 Pro MK.2', brand: 'Elgato', category: 'Streaming', releaseYear: 2022, msrp: 249 },
  { id: 'elgato-hd60-x', name: 'HD60 X', brand: 'Elgato', category: 'Streaming', releaseYear: 2022, msrp: 149 },
  { id: 'elgato-stream-deck-xl', name: 'Stream Deck XL', brand: 'Elgato', category: 'Streaming', releaseYear: 2021, msrp: 249 },
  { id: 'elgato-stream-deck-mk2', name: 'Stream Deck MK.2', brand: 'Elgato', category: 'Streaming', releaseYear: 2021, msrp: 149 },
  { id: 'shure-sm7b', name: 'SM7B', brand: 'Shure', category: 'Streaming', releaseYear: 2019, msrp: 399 },
  { id: 'blue-yeti-x', name: 'Yeti X', brand: 'Blue', category: 'Streaming', releaseYear: 2019, msrp: 169 },
  { id: 'rode-nt-usb-mini', name: 'NT-USB Mini', brand: 'Rode', category: 'Streaming', releaseYear: 2021, msrp: 99 },
  { id: 'rog-phone-8-pro', name: 'ROG Phone 8 Pro', brand: 'ASUS', category: 'Smartphone', releaseYear: 2024, msrp: 1199 },
  { id: 'redmagic-9-pro', name: 'RedMagic 9 Pro', brand: 'Nubia', category: 'Smartphone', releaseYear: 2024, msrp: 849 },
]

export function searchCatalog(query: string): Product[] {
  const q = query.toLowerCase().trim()
  if (!q) return CATALOG
  return CATALOG.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.brand.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q) ||
    (p.subcategory?.toLowerCase().includes(q) ?? false)
  )
}

export const searchProducts = searchCatalog

export function getByCategory(category: string): Product[] {
  return CATALOG.filter(p => p.category === category)
}

export function getProductById(id: string): Product | undefined {
  return CATALOG.find(p => p.id === id)
}