// ============================================================
// ZTRACE — CATALOGUE COMPLET DES PRODUITS
// ============================================================

export interface ProductEntry {
  id: string
  name: string
  brand: string
  category: string
  subcategory?: string
  basePrice: number
  demand: number // 0-100
}

export const CATALOG: Record<string, ProductEntry[]> = {

  // ══════════════════════════════════════════
  // CARTES GRAPHIQUES
  // ══════════════════════════════════════════
  'Cartes graphiques NVIDIA': [
    { id: 'rtx-5090', name: 'RTX 5090', brand: 'NVIDIA', category: 'Carte graphique', basePrice: 2200, demand: 90 },
    { id: 'rtx-5080', name: 'RTX 5080', brand: 'NVIDIA', category: 'Carte graphique', basePrice: 1400, demand: 85 },
    { id: 'rtx-5070ti', name: 'RTX 5070 Ti', brand: 'NVIDIA', category: 'Carte graphique', basePrice: 950, demand: 82 },
    { id: 'rtx-5070', name: 'RTX 5070', brand: 'NVIDIA', category: 'Carte graphique', basePrice: 700, demand: 80 },
    { id: 'rtx-5060ti', name: 'RTX 5060 Ti', brand: 'NVIDIA', category: 'Carte graphique', basePrice: 480, demand: 75 },
    { id: 'rtx-4090', name: 'RTX 4090', brand: 'NVIDIA', category: 'Carte graphique', basePrice: 1400, demand: 78 },
    { id: 'rtx-4080s', name: 'RTX 4080 Super', brand: 'NVIDIA', category: 'Carte graphique', basePrice: 750, demand: 74 },
    { id: 'rtx-4080', name: 'RTX 4080', brand: 'NVIDIA', category: 'Carte graphique', basePrice: 700, demand: 72 },
    { id: 'rtx-4070tis', name: 'RTX 4070 Ti Super', brand: 'NVIDIA', category: 'Carte graphique', basePrice: 580, demand: 76 },
    { id: 'rtx-4070ti', name: 'RTX 4070 Ti', brand: 'NVIDIA', category: 'Carte graphique', basePrice: 520, demand: 74 },
    { id: 'rtx-4070s', name: 'RTX 4070 Super', brand: 'NVIDIA', category: 'Carte graphique', basePrice: 480, demand: 78 },
    { id: 'rtx-4070', name: 'RTX 4070', brand: 'NVIDIA', category: 'Carte graphique', basePrice: 420, demand: 82 },
    { id: 'rtx-4060ti', name: 'RTX 4060 Ti', brand: 'NVIDIA', category: 'Carte graphique', basePrice: 320, demand: 70 },
    { id: 'rtx-4060', name: 'RTX 4060', brand: 'NVIDIA', category: 'Carte graphique', basePrice: 260, demand: 68 },
    { id: 'rtx-3090ti', name: 'RTX 3090 Ti', brand: 'NVIDIA', category: 'Carte graphique', basePrice: 700, demand: 55 },
    { id: 'rtx-3090', name: 'RTX 3090', brand: 'NVIDIA', category: 'Carte graphique', basePrice: 580, demand: 57 },
    { id: 'rtx-3080ti', name: 'RTX 3080 Ti', brand: 'NVIDIA', category: 'Carte graphique', basePrice: 450, demand: 58 },
    { id: 'rtx-3080-12g', name: 'RTX 3080 12GB', brand: 'NVIDIA', category: 'Carte graphique', basePrice: 380, demand: 56 },
    { id: 'rtx-3080', name: 'RTX 3080', brand: 'NVIDIA', category: 'Carte graphique', basePrice: 340, demand: 58 },
    { id: 'rtx-3070ti', name: 'RTX 3070 Ti', brand: 'NVIDIA', category: 'Carte graphique', basePrice: 260, demand: 55 },
    { id: 'rtx-3070', name: 'RTX 3070', brand: 'NVIDIA', category: 'Carte graphique', basePrice: 230, demand: 57 },
    { id: 'rtx-3060ti', name: 'RTX 3060 Ti', brand: 'NVIDIA', category: 'Carte graphique', basePrice: 190, demand: 60 },
    { id: 'rtx-3060', name: 'RTX 3060', brand: 'NVIDIA', category: 'Carte graphique', basePrice: 160, demand: 62 },
    { id: 'rtx-3050', name: 'RTX 3050', brand: 'NVIDIA', category: 'Carte graphique', basePrice: 120, demand: 55 },
    { id: 'gtx-1080ti', name: 'GTX 1080 Ti', brand: 'NVIDIA', category: 'Carte graphique', basePrice: 120, demand: 40 },
    { id: 'gtx-1080', name: 'GTX 1080', brand: 'NVIDIA', category: 'Carte graphique', basePrice: 80, demand: 35 },
    { id: 'gtx-1070ti', name: 'GTX 1070 Ti', brand: 'NVIDIA', category: 'Carte graphique', basePrice: 65, demand: 30 },
    { id: 'gtx-1070', name: 'GTX 1070', brand: 'NVIDIA', category: 'Carte graphique', basePrice: 55, demand: 28 },
    { id: 'gtx-1660s', name: 'GTX 1660 Super', brand: 'NVIDIA', category: 'Carte graphique', basePrice: 95, demand: 45 },
    { id: 'gtx-1660', name: 'GTX 1660', brand: 'NVIDIA', category: 'Carte graphique', basePrice: 75, demand: 40 },
  ],

  'Cartes graphiques AMD': [
    { id: 'rx-9070xt', name: 'RX 9070 XT', brand: 'AMD', category: 'Carte graphique', basePrice: 650, demand: 80 },
    { id: 'rx-9070', name: 'RX 9070', brand: 'AMD', category: 'Carte graphique', basePrice: 520, demand: 77 },
    { id: 'rx-7900xtx', name: 'RX 7900 XTX', brand: 'AMD', category: 'Carte graphique', basePrice: 750, demand: 70 },
    { id: 'rx-7900xt', name: 'RX 7900 XT', brand: 'AMD', category: 'Carte graphique', basePrice: 560, demand: 65 },
    { id: 'rx-7800xt', name: 'RX 7800 XT', brand: 'AMD', category: 'Carte graphique', basePrice: 380, demand: 68 },
    { id: 'rx-7700xt', name: 'RX 7700 XT', brand: 'AMD', category: 'Carte graphique', basePrice: 300, demand: 65 },
    { id: 'rx-7600xt', name: 'RX 7600 XT', brand: 'AMD', category: 'Carte graphique', basePrice: 240, demand: 62 },
    { id: 'rx-7600', name: 'RX 7600', brand: 'AMD', category: 'Carte graphique', basePrice: 200, demand: 60 },
    { id: 'rx-6950xt', name: 'RX 6950 XT', brand: 'AMD', category: 'Carte graphique', basePrice: 380, demand: 55 },
    { id: 'rx-6900xt', name: 'RX 6900 XT', brand: 'AMD', category: 'Carte graphique', basePrice: 300, demand: 52 },
    { id: 'rx-6800xt', name: 'RX 6800 XT', brand: 'AMD', category: 'Carte graphique', basePrice: 260, demand: 53 },
    { id: 'rx-6700xt', name: 'RX 6700 XT', brand: 'AMD', category: 'Carte graphique', basePrice: 180, demand: 55 },
    { id: 'rx-6600xt', name: 'RX 6600 XT', brand: 'AMD', category: 'Carte graphique', basePrice: 140, demand: 52 },
  ],

  'Cartes graphiques Intel': [
    { id: 'arc-b580', name: 'Arc B580', brand: 'Intel', category: 'Carte graphique', basePrice: 220, demand: 60 },
    { id: 'arc-b770', name: 'Arc B770', brand: 'Intel', category: 'Carte graphique', basePrice: 300, demand: 58 },
    { id: 'arc-a770', name: 'Arc A770', brand: 'Intel', category: 'Carte graphique', basePrice: 180, demand: 50 },
    { id: 'arc-a750', name: 'Arc A750', brand: 'Intel', category: 'Carte graphique', basePrice: 140, demand: 45 },
  ],

  // ══════════════════════════════════════════
  // PROCESSEURS
  // ══════════════════════════════════════════
  'Processeurs Intel': [
    { id: 'i9-14900k', name: 'Core i9-14900K', brand: 'Intel', category: 'Processeur', basePrice: 380, demand: 68 },
    { id: 'i9-14900kf', name: 'Core i9-14900KF', brand: 'Intel', category: 'Processeur', basePrice: 340, demand: 67 },
    { id: 'i7-14700k', name: 'Core i7-14700K', brand: 'Intel', category: 'Processeur', basePrice: 280, demand: 72 },
    { id: 'i7-14700kf', name: 'Core i7-14700KF', brand: 'Intel', category: 'Processeur', basePrice: 250, demand: 71 },
    { id: 'i5-14600k', name: 'Core i5-14600K', brand: 'Intel', category: 'Processeur', basePrice: 200, demand: 75 },
    { id: 'i5-14600kf', name: 'Core i5-14600KF', brand: 'Intel', category: 'Processeur', basePrice: 180, demand: 74 },
    { id: 'i9-13900k', name: 'Core i9-13900K', brand: 'Intel', category: 'Processeur', basePrice: 320, demand: 62 },
    { id: 'i7-13700k', name: 'Core i7-13700K', brand: 'Intel', category: 'Processeur', basePrice: 240, demand: 65 },
    { id: 'i5-13600k', name: 'Core i5-13600K', brand: 'Intel', category: 'Processeur', basePrice: 175, demand: 68 },
    { id: 'i9-12900k', name: 'Core i9-12900K', brand: 'Intel', category: 'Processeur', basePrice: 220, demand: 55 },
    { id: 'i7-12700k', name: 'Core i7-12700K', brand: 'Intel', category: 'Processeur', basePrice: 160, demand: 57 },
    { id: 'i5-12600k', name: 'Core i5-12600K', brand: 'Intel', category: 'Processeur', basePrice: 130, demand: 60 },
  ],

  'Processeurs AMD': [
    { id: 'r9-9950x', name: 'Ryzen 9 9950X', brand: 'AMD', category: 'Processeur', basePrice: 550, demand: 72 },
    { id: 'r9-9900x', name: 'Ryzen 9 9900X', brand: 'AMD', category: 'Processeur', basePrice: 420, demand: 70 },
    { id: 'r7-9700x', name: 'Ryzen 7 9700X', brand: 'AMD', category: 'Processeur', basePrice: 300, demand: 74 },
    { id: 'r5-9600x', name: 'Ryzen 5 9600X', brand: 'AMD', category: 'Processeur', basePrice: 220, demand: 76 },
    { id: 'r9-7950x', name: 'Ryzen 9 7950X', brand: 'AMD', category: 'Processeur', basePrice: 380, demand: 68 },
    { id: 'r9-7900x', name: 'Ryzen 9 7900X', brand: 'AMD', category: 'Processeur', basePrice: 280, demand: 67 },
    { id: 'r7-7800x3d', name: 'Ryzen 7 7800X3D', brand: 'AMD', category: 'Processeur', basePrice: 350, demand: 88 },
    { id: 'r7-7700x', name: 'Ryzen 7 7700X', brand: 'AMD', category: 'Processeur', basePrice: 220, demand: 71 },
    { id: 'r5-7600x', name: 'Ryzen 5 7600X', brand: 'AMD', category: 'Processeur', basePrice: 170, demand: 73 },
    { id: 'r5-7600', name: 'Ryzen 5 7600', brand: 'AMD', category: 'Processeur', basePrice: 150, demand: 74 },
    { id: 'r9-5950x', name: 'Ryzen 9 5950X', brand: 'AMD', category: 'Processeur', basePrice: 280, demand: 60 },
    { id: 'r9-5900x', name: 'Ryzen 9 5900X', brand: 'AMD', category: 'Processeur', basePrice: 200, demand: 62 },
    { id: 'r7-5800x3d', name: 'Ryzen 7 5800X3D', brand: 'AMD', category: 'Processeur', basePrice: 220, demand: 72 },
    { id: 'r7-5800x', name: 'Ryzen 7 5800X', brand: 'AMD', category: 'Processeur', basePrice: 140, demand: 60 },
    { id: 'r5-5600x', name: 'Ryzen 5 5600X', brand: 'AMD', category: 'Processeur', basePrice: 100, demand: 65 },
    { id: 'r5-5600', name: 'Ryzen 5 5600', brand: 'AMD', category: 'Processeur', basePrice: 85, demand: 67 },
  ],

  // ══════════════════════════════════════════
  // CONSOLES
  // ══════════════════════════════════════════
  'PlayStation': [
    { id: 'ps5-pro', name: 'PlayStation 5 Pro', brand: 'Sony', category: 'Console', basePrice: 550, demand: 88 },
    { id: 'ps5-slim-disc', name: 'PlayStation 5 Slim (avec lecteur)', brand: 'Sony', category: 'Console', basePrice: 380, demand: 85 },
    { id: 'ps5-slim-digital', name: 'PlayStation 5 Slim (Digital)', brand: 'Sony', category: 'Console', basePrice: 330, demand: 82 },
    { id: 'ps5', name: 'PlayStation 5 (1ère gen)', brand: 'Sony', category: 'Console', basePrice: 320, demand: 80 },
    { id: 'ps4-pro', name: 'PlayStation 4 Pro', brand: 'Sony', category: 'Console', basePrice: 150, demand: 55 },
    { id: 'ps4-slim', name: 'PlayStation 4 Slim', brand: 'Sony', category: 'Console', basePrice: 110, demand: 50 },
    { id: 'ps4', name: 'PlayStation 4', brand: 'Sony', category: 'Console', basePrice: 90, demand: 45 },
    { id: 'ps3', name: 'PlayStation 3', brand: 'Sony', category: 'Console', basePrice: 50, demand: 35 },
    { id: 'psvita', name: 'PS Vita', brand: 'Sony', category: 'Console', basePrice: 80, demand: 40 },
    { id: 'psp', name: 'PSP', brand: 'Sony', category: 'Console', basePrice: 55, demand: 38 },
  ],

  'Xbox': [
    { id: 'xbox-series-x', name: 'Xbox Series X', brand: 'Microsoft', category: 'Console', basePrice: 300, demand: 58 },
    { id: 'xbox-series-s', name: 'Xbox Series S', brand: 'Microsoft', category: 'Console', basePrice: 180, demand: 55 },
    { id: 'xbox-one-x', name: 'Xbox One X', brand: 'Microsoft', category: 'Console', basePrice: 110, demand: 42 },
    { id: 'xbox-one-s', name: 'Xbox One S', brand: 'Microsoft', category: 'Console', basePrice: 75, demand: 38 },
    { id: 'xbox-one', name: 'Xbox One', brand: 'Microsoft', category: 'Console', basePrice: 60, demand: 32 },
    { id: 'xbox-360', name: 'Xbox 360', brand: 'Microsoft', category: 'Console', basePrice: 40, demand: 30 },
  ],

  'Nintendo': [
    { id: 'switch-2', name: 'Nintendo Switch 2', brand: 'Nintendo', category: 'Console', basePrice: 420, demand: 95 },
    { id: 'switch-oled', name: 'Nintendo Switch OLED', brand: 'Nintendo', category: 'Console', basePrice: 230, demand: 80 },
    { id: 'switch-v2', name: 'Nintendo Switch V2', brand: 'Nintendo', category: 'Console', basePrice: 180, demand: 72 },
    { id: 'switch-lite', name: 'Nintendo Switch Lite', brand: 'Nintendo', category: 'Console', basePrice: 130, demand: 65 },
    { id: 'wii-u', name: 'Wii U', brand: 'Nintendo', category: 'Console', basePrice: 80, demand: 40 },
    { id: 'wii', name: 'Wii', brand: 'Nintendo', category: 'Console', basePrice: 45, demand: 38 },
    { id: '3ds-xl', name: 'Nintendo 3DS XL', brand: 'Nintendo', category: 'Console', basePrice: 85, demand: 45 },
    { id: '3ds', name: 'Nintendo 3DS', brand: 'Nintendo', category: 'Console', basePrice: 65, demand: 42 },
    { id: 'ds-lite', name: 'Nintendo DS Lite', brand: 'Nintendo', category: 'Console', basePrice: 50, demand: 40 },
    { id: 'gameboy-advance', name: 'Game Boy Advance SP', brand: 'Nintendo', category: 'Console', basePrice: 70, demand: 55 },
  ],

  'Steam Deck & Handhelds': [
    { id: 'steam-deck-oled-1tb', name: 'Steam Deck OLED 1TB', brand: 'Valve', category: 'Console portable', basePrice: 600, demand: 85 },
    { id: 'steam-deck-oled-512', name: 'Steam Deck OLED 512GB', brand: 'Valve', category: 'Console portable', basePrice: 500, demand: 83 },
    { id: 'steam-deck-512', name: 'Steam Deck LCD 512GB', brand: 'Valve', category: 'Console portable', basePrice: 350, demand: 75 },
    { id: 'steam-deck-256', name: 'Steam Deck LCD 256GB', brand: 'Valve', category: 'Console portable', basePrice: 300, demand: 73 },
    { id: 'rog-ally-x', name: 'ROG Ally X', brand: 'ASUS', category: 'Console portable', basePrice: 700, demand: 78 },
    { id: 'rog-ally', name: 'ROG Ally', brand: 'ASUS', category: 'Console portable', basePrice: 480, demand: 72 },
    { id: 'legion-go', name: 'Lenovo Legion Go', brand: 'Lenovo', category: 'Console portable', basePrice: 550, demand: 70 },
    { id: 'ayaneo-2s', name: 'AYANEO 2S', brand: 'AYANEO', category: 'Console portable', basePrice: 750, demand: 60 },
  ],

  // ══════════════════════════════════════════
  // PC GAMING COMPLETS
  // ══════════════════════════════════════════
  'PC Gaming': [
    { id: 'pc-entry', name: 'PC Gaming Entrée de gamme (RTX 4060 / R5)', brand: 'Custom', category: 'PC Gaming', basePrice: 700, demand: 65 },
    { id: 'pc-mid', name: 'PC Gaming Milieu de gamme (RTX 4070 / i7)', brand: 'Custom', category: 'PC Gaming', basePrice: 1200, demand: 70 },
    { id: 'pc-high', name: 'PC Gaming Haut de gamme (RTX 4080 / i9)', brand: 'Custom', category: 'PC Gaming', basePrice: 2000, demand: 62 },
    { id: 'pc-ultra', name: 'PC Gaming Ultra (RTX 4090 / i9)', brand: 'Custom', category: 'PC Gaming', basePrice: 3000, demand: 55 },
  ],

  // ══════════════════════════════════════════
  // LAPTOPS GAMING
  // ══════════════════════════════════════════
  'Laptops Gaming': [
    { id: 'rog-zephyrus-g16', name: 'ASUS ROG Zephyrus G16', brand: 'ASUS', category: 'Laptop Gaming', basePrice: 1400, demand: 75 },
    { id: 'rog-strix-scar', name: 'ASUS ROG Strix SCAR 18', brand: 'ASUS', category: 'Laptop Gaming', basePrice: 2200, demand: 68 },
    { id: 'msi-raider', name: 'MSI Raider GE78', brand: 'MSI', category: 'Laptop Gaming', basePrice: 2000, demand: 65 },
    { id: 'msi-titan', name: 'MSI Titan GT77', brand: 'MSI', category: 'Laptop Gaming', basePrice: 2800, demand: 58 },
    { id: 'razer-blade-16', name: 'Razer Blade 16', brand: 'Razer', category: 'Laptop Gaming', basePrice: 2500, demand: 70 },
    { id: 'razer-blade-15', name: 'Razer Blade 15', brand: 'Razer', category: 'Laptop Gaming', basePrice: 1800, demand: 68 },
    { id: 'legion-7i', name: 'Lenovo Legion 7i', brand: 'Lenovo', category: 'Laptop Gaming', basePrice: 1500, demand: 72 },
    { id: 'legion-5i', name: 'Lenovo Legion 5i', brand: 'Lenovo', category: 'Laptop Gaming', basePrice: 900, demand: 74 },
    { id: 'alienware-m18', name: 'Alienware m18 R2', brand: 'Dell', category: 'Laptop Gaming', basePrice: 2500, demand: 60 },
    { id: 'alienware-x16', name: 'Alienware x16 R2', brand: 'Dell', category: 'Laptop Gaming', basePrice: 2200, demand: 62 },
    { id: 'acer-predator', name: 'Acer Predator Helios 18', brand: 'Acer', category: 'Laptop Gaming', basePrice: 1600, demand: 66 },
    { id: 'hp-omen-16', name: 'HP Omen 16', brand: 'HP', category: 'Laptop Gaming', basePrice: 1100, demand: 68 },
  ],

  // ══════════════════════════════════════════
  // ÉCRANS
  // ══════════════════════════════════════════
  'Écrans Gaming': [
    { id: 'lg-oled-27', name: 'LG OLED 27" 240Hz', brand: 'LG', category: 'Écran', basePrice: 700, demand: 80 },
    { id: 'lg-oled-32', name: 'LG OLED 32" 240Hz', brand: 'LG', category: 'Écran', basePrice: 900, demand: 78 },
    { id: 'samsung-odyssey-g9', name: 'Samsung Odyssey G9 49"', brand: 'Samsung', category: 'Écran', basePrice: 800, demand: 72 },
    { id: 'samsung-odyssey-g7', name: 'Samsung Odyssey G7 27"', brand: 'Samsung', category: 'Écran', basePrice: 380, demand: 68 },
    { id: 'asus-rog-pg32ucdm', name: 'ASUS ROG Swift OLED 32"', brand: 'ASUS', category: 'Écran', basePrice: 850, demand: 75 },
    { id: 'asus-rog-pg27aqdm', name: 'ASUS ROG Swift OLED 27"', brand: 'ASUS', category: 'Écran', basePrice: 650, demand: 74 },
    { id: 'aoc-cu34g3s', name: 'AOC CU34G3S 34" Ultrawide', brand: 'AOC', category: 'Écran', basePrice: 320, demand: 65 },
    { id: 'msi-mag274qrf', name: 'MSI MAG 274QRF-QD 27"', brand: 'MSI', category: 'Écran', basePrice: 300, demand: 67 },
    { id: 'benq-mobiuz-ex2710u', name: 'BenQ MOBIUZ EX2710U 27"', brand: 'BenQ', category: 'Écran', basePrice: 450, demand: 65 },
    { id: 'alienware-aw3225qf', name: 'Alienware AW3225QF 32" OLED', brand: 'Dell', category: 'Écran', basePrice: 850, demand: 73 },
  ],

  // ══════════════════════════════════════════
  // PÉRIPHÉRIQUES — CLAVIERS
  // ══════════════════════════════════════════
  'Claviers Gaming': [
    { id: 'wooting-60he', name: 'Wooting 60HE', brand: 'Wooting', category: 'Clavier', basePrice: 160, demand: 85 },
    { id: 'wooting-two-he', name: 'Wooting Two HE', brand: 'Wooting', category: 'Clavier', basePrice: 180, demand: 83 },
    { id: 'razer-huntsman-v3', name: 'Razer Huntsman V3 Pro', brand: 'Razer', category: 'Clavier', basePrice: 200, demand: 72 },
    { id: 'corsair-k100', name: 'Corsair K100 RGB', brand: 'Corsair', category: 'Clavier', basePrice: 160, demand: 65 },
    { id: 'steelseries-apex-pro', name: 'SteelSeries Apex Pro TKL', brand: 'SteelSeries', category: 'Clavier', basePrice: 170, demand: 70 },
    { id: 'logitech-g915', name: 'Logitech G915 TKL', brand: 'Logitech', category: 'Clavier', basePrice: 150, demand: 68 },
    { id: 'asus-rog-azoth', name: 'ASUS ROG Azoth', brand: 'ASUS', category: 'Clavier', basePrice: 220, demand: 75 },
    { id: 'ducky-one3', name: 'Ducky One 3 TKL', brand: 'Ducky', category: 'Clavier', basePrice: 110, demand: 65 },
    { id: 'keychron-q1', name: 'Keychron Q1 Pro', brand: 'Keychron', category: 'Clavier', basePrice: 150, demand: 70 },
    { id: 'keychron-k2', name: 'Keychron K2 Pro', brand: 'Keychron', category: 'Clavier', basePrice: 90, demand: 67 },
  ],

  // ══════════════════════════════════════════
  // PÉRIPHÉRIQUES — SOURIS
  // ══════════════════════════════════════════
  'Souris Gaming': [
    { id: 'logitech-g-pro-x2', name: 'Logitech G Pro X2 Superlight', brand: 'Logitech', category: 'Souris', basePrice: 130, demand: 80 },
    { id: 'logitech-g-pro-superlight', name: 'Logitech G Pro Superlight', brand: 'Logitech', category: 'Souris', basePrice: 100, demand: 78 },
    { id: 'razer-deathadder-v3', name: 'Razer DeathAdder V3 Pro', brand: 'Razer', category: 'Souris', basePrice: 130, demand: 75 },
    { id: 'razer-viper-v3', name: 'Razer Viper V3 Pro', brand: 'Razer', category: 'Souris', basePrice: 140, demand: 78 },
    { id: 'pulsar-x2', name: 'Pulsar X2 V2', brand: 'Pulsar', category: 'Souris', basePrice: 90, demand: 72 },
    { id: 'finalmouse-ultralight', name: 'Finalmouse Ultralight X', brand: 'Finalmouse', category: 'Souris', basePrice: 180, demand: 70 },
    { id: 'zowie-ec2', name: 'Zowie EC2-CW', brand: 'Zowie', category: 'Souris', basePrice: 100, demand: 70 },
    { id: 'steelseries-prime', name: 'SteelSeries Prime+', brand: 'SteelSeries', category: 'Souris', basePrice: 80, demand: 65 },
    { id: 'corsair-m75', name: 'Corsair M75', brand: 'Corsair', category: 'Souris', basePrice: 90, demand: 65 },
    { id: 'asus-rog-harpe-ace', name: 'ASUS ROG Harpe Ace', brand: 'ASUS', category: 'Souris', basePrice: 110, demand: 68 },
  ],

  // ══════════════════════════════════════════
  // CASQUES
  // ══════════════════════════════════════════
  'Casques Gaming': [
    { id: 'steelseries-arctis-nova-pro', name: 'SteelSeries Arctis Nova Pro Wireless', brand: 'SteelSeries', category: 'Casque', basePrice: 280, demand: 75 },
    { id: 'razer-blackshark-v2-pro', name: 'Razer BlackShark V2 Pro', brand: 'Razer', category: 'Casque', basePrice: 180, demand: 72 },
    { id: 'logitech-g-pro-x2-headset', name: 'Logitech G Pro X 2 Lightspeed', brand: 'Logitech', category: 'Casque', basePrice: 200, demand: 74 },
    { id: 'hyperx-cloud-alpha', name: 'HyperX Cloud Alpha Wireless', brand: 'HyperX', category: 'Casque', basePrice: 150, demand: 70 },
    { id: 'astro-a50', name: 'Astro A50 X', brand: 'Astro', category: 'Casque', basePrice: 280, demand: 68 },
    { id: 'sony-inzone-h9', name: 'Sony INZONE H9', brand: 'Sony', category: 'Casque', basePrice: 220, demand: 70 },
    { id: 'asus-rog-delta-s', name: 'ASUS ROG Delta S Wireless', brand: 'ASUS', category: 'Casque', basePrice: 180, demand: 65 },
    { id: 'corsair-hs80', name: 'Corsair HS80 Max Wireless', brand: 'Corsair', category: 'Casque', basePrice: 160, demand: 67 },
  ],

  // ══════════════════════════════════════════
  // MANETTES
  // ══════════════════════════════════════════
  'Manettes': [
    { id: 'ps5-dualsense-edge', name: 'DualSense Edge', brand: 'Sony', category: 'Manette', basePrice: 160, demand: 75 },
    { id: 'ps5-dualsense', name: 'DualSense PS5', brand: 'Sony', category: 'Manette', basePrice: 60, demand: 70 },
    { id: 'xbox-elite-s2', name: 'Xbox Elite Series 2', brand: 'Microsoft', category: 'Manette', basePrice: 130, demand: 72 },
    { id: 'xbox-wireless', name: 'Manette Xbox Wireless', brand: 'Microsoft', category: 'Manette', basePrice: 45, demand: 65 },
    { id: 'razer-wolverine-v3', name: 'Razer Wolverine V3 Pro', brand: 'Razer', category: 'Manette', basePrice: 180, demand: 68 },
    { id: 'scuf-reflex-pro', name: 'SCUF Reflex Pro', brand: 'SCUF', category: 'Manette', basePrice: 160, demand: 65 },
    { id: 'thrustmaster-t248', name: 'Thrustmaster T248', brand: 'Thrustmaster', category: 'Manette', basePrice: 200, demand: 60 },
    { id: 'logitech-g923', name: 'Logitech G923 (Volant)', brand: 'Logitech', category: 'Manette', basePrice: 280, demand: 62 },
    { id: 'fanatec-csl-dd', name: 'Fanatec CSL DD', brand: 'Fanatec', category: 'Manette', basePrice: 350, demand: 65 },
  ],

  // ══════════════════════════════════════════
  // COMPOSANTS PC
  // ══════════════════════════════════════════
  'RAM': [
    { id: 'ddr5-32gb-6000', name: 'RAM DDR5 32GB 6000MHz', brand: 'Générique', category: 'RAM', basePrice: 80, demand: 70 },
    { id: 'ddr5-64gb-6000', name: 'RAM DDR5 64GB 6000MHz', brand: 'Générique', category: 'RAM', basePrice: 150, demand: 65 },
    { id: 'ddr4-32gb-3600', name: 'RAM DDR4 32GB 3600MHz', brand: 'Générique', category: 'RAM', basePrice: 55, demand: 68 },
    { id: 'ddr4-16gb-3600', name: 'RAM DDR4 16GB 3600MHz', brand: 'Générique', category: 'RAM', basePrice: 30, demand: 65 },
    { id: 'corsair-dominator-ddr5', name: 'Corsair Dominator DDR5 32GB', brand: 'Corsair', category: 'RAM', basePrice: 110, demand: 68 },
    { id: 'gskill-trident-ddr5', name: 'G.Skill Trident Z5 DDR5 32GB', brand: 'G.Skill', category: 'RAM', basePrice: 100, demand: 67 },
  ],

  'Stockage SSD': [
    { id: 'samsung-990-pro-2tb', name: 'Samsung 990 Pro 2TB NVMe', brand: 'Samsung', category: 'SSD', basePrice: 130, demand: 78 },
    { id: 'samsung-990-pro-1tb', name: 'Samsung 990 Pro 1TB NVMe', brand: 'Samsung', category: 'SSD', basePrice: 80, demand: 76 },
    { id: 'wd-black-sn850x-2tb', name: 'WD Black SN850X 2TB NVMe', brand: 'WD', category: 'SSD', basePrice: 120, demand: 75 },
    { id: 'seagate-firecuda-530', name: 'Seagate FireCuda 530 2TB', brand: 'Seagate', category: 'SSD', basePrice: 110, demand: 70 },
    { id: 'crucial-t705-2tb', name: 'Crucial T705 2TB NVMe', brand: 'Crucial', category: 'SSD', basePrice: 115, demand: 72 },
    { id: 'samsung-870-evo-1tb', name: 'Samsung 870 EVO 1TB SATA', brand: 'Samsung', category: 'SSD', basePrice: 60, demand: 65 },
  ],

  'Cartes mères': [
    { id: 'asus-rog-maximus-z790', name: 'ASUS ROG Maximus Z790 Hero', brand: 'ASUS', category: 'Carte mère', basePrice: 550, demand: 60 },
    { id: 'asus-rog-strix-z790', name: 'ASUS ROG Strix Z790-F', brand: 'ASUS', category: 'Carte mère', basePrice: 380, demand: 65 },
    { id: 'msi-meg-z790-ace', name: 'MSI MEG Z790 ACE', brand: 'MSI', category: 'Carte mère', basePrice: 500, demand: 58 },
    { id: 'gigabyte-z790-aorus', name: 'Gigabyte Z790 AORUS Master', brand: 'Gigabyte', category: 'Carte mère', basePrice: 420, demand: 60 },
    { id: 'asus-rog-strix-x670e', name: 'ASUS ROG Strix X670E-F', brand: 'ASUS', category: 'Carte mère', basePrice: 320, demand: 63 },
    { id: 'msi-meg-x670e-ace', name: 'MSI MEG X670E ACE', brand: 'MSI', category: 'Carte mère', basePrice: 450, demand: 58 },
  ],

  'Refroidissement': [
    { id: 'noctua-nh-d15', name: 'Noctua NH-D15', brand: 'Noctua', category: 'Ventirad', basePrice: 90, demand: 72 },
    { id: 'be-quiet-dark-rock-pro-5', name: 'Be Quiet Dark Rock Pro 5', brand: 'Be Quiet', category: 'Ventirad', basePrice: 80, demand: 70 },
    { id: 'corsair-h150i-elite', name: 'Corsair iCUE H150i Elite', brand: 'Corsair', category: 'AIO', basePrice: 140, demand: 68 },
    { id: 'nzxt-kraken-360', name: 'NZXT Kraken 360', brand: 'NZXT', category: 'AIO', basePrice: 150, demand: 68 },
    { id: 'arctic-liquid-freezer-360', name: 'Arctic Liquid Freezer III 360', brand: 'Arctic', category: 'AIO', basePrice: 120, demand: 72 },
    { id: 'ek-nucleus-360', name: 'EK Nucleus AIO CR360', brand: 'EK', category: 'AIO', basePrice: 160, demand: 65 },
  ],

  'Alimentations': [
    { id: 'corsair-rm1000x', name: 'Corsair RM1000x 1000W 80+ Gold', brand: 'Corsair', category: 'Alimentation', basePrice: 150, demand: 65 },
    { id: 'seasonic-vertex-1000', name: 'Seasonic VERTEX GX-1000', brand: 'Seasonic', category: 'Alimentation', basePrice: 180, demand: 67 },
    { id: 'be-quiet-straight-power-1000', name: 'Be Quiet Straight Power 12 1000W', brand: 'Be Quiet', category: 'Alimentation', basePrice: 160, demand: 66 },
    { id: 'evga-supernova-1000', name: 'EVGA SuperNOVA 1000 G6', brand: 'EVGA', category: 'Alimentation', basePrice: 130, demand: 62 },
  ],

  // ══════════════════════════════════════════
  // AUDIO
  // ══════════════════════════════════════════
  'Écouteurs Gaming': [
    { id: 'razer-hammerhead-pro-hf', name: 'Razer Hammerhead Pro HyperFocus', brand: 'Razer', category: 'Écouteurs', basePrice: 120, demand: 65 },
    { id: 'steelseries-tusq', name: 'SteelSeries TUSQ', brand: 'SteelSeries', category: 'Écouteurs', basePrice: 40, demand: 55 },
    { id: 'hyperx-cloud-earbuds-2', name: 'HyperX Cloud Earbuds II', brand: 'HyperX', category: 'Écouteurs', basePrice: 45, demand: 55 },
  ],

  // ══════════════════════════════════════════
  // STREAMING / CRÉATION DE CONTENU
  // ══════════════════════════════════════════
  'Streaming & Capture': [
    { id: 'elgato-4k60-pro-mk2', name: 'Elgato 4K60 Pro MK.2', brand: 'Elgato', category: 'Carte de capture', basePrice: 180, demand: 68 },
    { id: 'elgato-hd60-x', name: 'Elgato HD60 X', brand: 'Elgato', category: 'Carte de capture', basePrice: 120, demand: 65 },
    { id: 'avermedia-live-gamer-4k', name: 'AVerMedia Live Gamer 4K', brand: 'AVerMedia', category: 'Carte de capture', basePrice: 160, demand: 62 },
    { id: 'elgato-stream-deck-xl', name: 'Elgato Stream Deck XL', brand: 'Elgato', category: 'Stream Deck', basePrice: 180, demand: 72 },
    { id: 'elgato-stream-deck-mk2', name: 'Elgato Stream Deck MK.2', brand: 'Elgato', category: 'Stream Deck', basePrice: 120, demand: 70 },
    { id: 'elgato-stream-deck-mini', name: 'Elgato Stream Deck Mini', brand: 'Elgato', category: 'Stream Deck', basePrice: 65, demand: 65 },
    { id: 'shure-sm7b', name: 'Shure SM7B', brand: 'Shure', category: 'Microphone', basePrice: 280, demand: 75 },
    { id: 'rode-nt-usb-mini', name: 'Rode NT-USB Mini', brand: 'Rode', category: 'Microphone', basePrice: 80, demand: 68 },
    { id: 'hyperx-quadcast-s', name: 'HyperX QuadCast S', brand: 'HyperX', category: 'Microphone', basePrice: 100, demand: 67 },
    { id: 'blue-yeti-x', name: 'Blue Yeti X', brand: 'Blue', category: 'Microphone', basePrice: 100, demand: 65 },
  ],

  // ══════════════════════════════════════════
  // VR
  // ══════════════════════════════════════════
  'Réalité virtuelle': [
    { id: 'meta-quest-3', name: 'Meta Quest 3 512GB', brand: 'Meta', category: 'VR', basePrice: 500, demand: 78 },
    { id: 'meta-quest-3-128', name: 'Meta Quest 3 128GB', brand: 'Meta', category: 'VR', basePrice: 400, demand: 76 },
    { id: 'meta-quest-3s', name: 'Meta Quest 3S', brand: 'Meta', category: 'VR', basePrice: 300, demand: 74 },
    { id: 'meta-quest-2', name: 'Meta Quest 2 256GB', brand: 'Meta', category: 'VR', basePrice: 200, demand: 62 },
    { id: 'valve-index', name: 'Valve Index (kit complet)', brand: 'Valve', category: 'VR', basePrice: 700, demand: 60 },
    { id: 'pico-4', name: 'Pico 4 256GB', brand: 'Pico', category: 'VR', basePrice: 280, demand: 58 },
    { id: 'sony-psvr2', name: 'Sony PlayStation VR2', brand: 'Sony', category: 'VR', basePrice: 350, demand: 62 },
  ],

  // ══════════════════════════════════════════
  // SMARTPHONES GAMING
  // ══════════════════════════════════════════
  'Smartphones Gaming': [
    { id: 'rog-phone-8-pro', name: 'ASUS ROG Phone 8 Pro', brand: 'ASUS', category: 'Smartphone Gaming', basePrice: 700, demand: 65 },
    { id: 'rog-phone-8', name: 'ASUS ROG Phone 8', brand: 'ASUS', category: 'Smartphone Gaming', basePrice: 550, demand: 62 },
    { id: 'redmagic-9-pro', name: 'RedMagic 9 Pro', brand: 'ZTE', category: 'Smartphone Gaming', basePrice: 550, demand: 60 },
    { id: 'black-shark-5-pro', name: 'Black Shark 5 Pro', brand: 'Xiaomi', category: 'Smartphone Gaming', basePrice: 400, demand: 55 },
  ],
}

// ── Flat list for search ──
export const ALL_PRODUCTS: ProductEntry[] = Object.values(CATALOG).flat()

// ── Categories list ──
export const CATEGORIES = Object.keys(CATALOG)

// ── Search function ──
export function searchProducts(query: string): ProductEntry[] {
  if (!query || query.length < 2) return []
  const q = query.toLowerCase()
  return ALL_PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.brand.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q)
  ).slice(0, 20)
}
