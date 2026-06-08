export interface Product {
  id: string
  name: string
  brand: string
  category: string
  subcategory?: string
  releaseYear?: number
  msrp?: number
}

export const CATEGORIES = ['GPU','CPU','Console','Laptop','Écran','Clavier','Souris','Casque','Manette','Composant','VR','Streaming','Handheld']

export const CATALOG: Product[] = [
  { id: 'rtx-4090', name: 'RTX 4090', brand: 'NVIDIA', category: 'GPU', releaseYear: 2022, msrp: 1599 },
  { id: 'rtx-4080', name: 'RTX 4080', brand: 'NVIDIA', category: 'GPU', releaseYear: 2022, msrp: 1199 },
  { id: 'rtx-4070', name: 'RTX 4070', brand: 'NVIDIA', category: 'GPU', releaseYear: 2023, msrp: 599 },
  { id: 'rtx-4060', name: 'RTX 4060', brand: 'NVIDIA', category: 'GPU', releaseYear: 2023, msrp: 299 },
  { id: 'rx-7900-xtx', name: 'RX 7900 XTX', brand: 'AMD', category: 'GPU', releaseYear: 2022, msrp: 999 },
  { id: 'rx-7800-xt', name: 'RX 7800 XT', brand: 'AMD', category: 'GPU', releaseYear: 2023, msrp: 499 },
  { id: 'ps5', name: 'PlayStation 5', brand: 'Sony', category: 'Console', releaseYear: 2020, msrp: 549 },
  { id: 'ps5-slim', name: 'PlayStation 5 Slim', brand: 'Sony', category: 'Console', releaseYear: 2023, msrp: 449 },
  { id: 'xbox-series-x', name: 'Xbox Series X', brand: 'Microsoft', category: 'Console', releaseYear: 2020, msrp: 499 },
  { id: 'xbox-series-s', name: 'Xbox Series S', brand: 'Microsoft', category: 'Console', releaseYear: 2020, msrp: 299 },
  { id: 'switch-oled', name: 'Nintendo Switch OLED', brand: 'Nintendo', category: 'Console', releaseYear: 2021, msrp: 349 },
  { id: 'steam-deck-oled', name: 'Steam Deck OLED', brand: 'Valve', category: 'Handheld', releaseYear: 2023, msrp: 569 },
  { id: 'rog-ally', name: 'ROG Ally', brand: 'ASUS', category: 'Handheld', releaseYear: 2023, msrp: 699 },
  { id: 'meta-quest-3', name: 'Meta Quest 3', brand: 'Meta', category: 'VR', releaseYear: 2023, msrp: 549 },
  { id: 'psvr2', name: 'PlayStation VR2', brand: 'Sony', category: 'VR', releaseYear: 2023, msrp: 599 },
  { id: 'ryzen-9-7950x', name: 'Ryzen 9 7950X', brand: 'AMD', category: 'CPU', releaseYear: 2022, msrp: 699 },
  { id: 'ryzen-7-7800x3d', name: 'Ryzen 7 7800X3D', brand: 'AMD', category: 'CPU', releaseYear: 2023, msrp: 449 },
  { id: 'i9-13900k', name: 'Core i9-13900K', brand: 'Intel', category: 'CPU', releaseYear: 2022, msrp: 589 },
  { id: 'i7-13700k', name: 'Core i7-13700K', brand: 'Intel', category: 'CPU', releaseYear: 2022, msrp: 409 },
]

export function searchCatalog(query: string): Product[] {
  const q = query.toLowerCase()
  return CATALOG.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.brand.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q)
  )
}

export function getByCategory(category: string): Product[] {
  return CATALOG.filter(p => p.category === category)
}