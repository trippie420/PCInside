import type { Product } from '@/lib/types'
export default [
  {
    "id": "cpu-ryzen7-7800x3d",
    "slug": "amd-ryzen-7-7800x3d",
    "title": "AMD Ryzen 7 7800X3D",
    "description": "CPU 8 cœurs / 16 threads avec 3D V-Cache, idéal pour le gaming haute performance.",
    "price": 399.99,
    "brand": "AMD",
    "category": "Processeur",
    "rating": 4.8,
    "image": "/placeholder.svg",
    "inStock": true,
    "specs": {
      "Socket": "AM5",
      "TDP": "120W",
      "Lithographie": "5 nm"
    }
  },
  {
    "id": "cpu-i5-13600k",
    "slug": "intel-core-i5-13600k",
    "title": "Intel Core i5-13600K",
    "description": "CPU hybride 14 cœurs (6P+8E) pour jeux et création.",
    "price": 329.9,
    "brand": "Intel",
    "category": "Processeur",
    "rating": 4.7,
    "image": "/placeholder.svg",
    "inStock": true,
    "specs": {
      "Socket": "LGA1700",
      "TDP": "125W",
      "iGPU": "UHD 770"
    }
  },
  {
    "id": "gpu-rtx4070",
    "slug": "nvidia-geforce-rtx-4070",
    "title": "NVIDIA GeForce RTX 4070 12 Go",
    "description": "Carte graphique Ada Lovelace avec DLSS 3 — 1440p ultra.",
    "price": 579.0,
    "brand": "NVIDIA",
    "category": "Carte graphique",
    "rating": 4.6,
    "image": "/placeholder.svg",
    "inStock": true,
    "specs": {
      "VRAM": "12 Go GDDR6X",
      "TDP": "200W",
      "Ports": "HDMI 2.1, 3×DP"
    }
  },
  {
    "id": "gpu-rx7800xt",
    "slug": "amd-radeon-rx-7800-xt",
    "title": "AMD Radeon RX 7800 XT 16 Go",
    "description": "Excellente performance 1440p, 16 Go de VRAM.",
    "price": 519.0,
    "brand": "AMD",
    "category": "Carte graphique",
    "rating": 4.5,
    "image": "/placeholder.svg",
    "inStock": true,
    "specs": {
      "VRAM": "16 Go GDDR6",
      "TDP": "263W",
      "Ports": "HDMI 2.1, 3×DP"
    }
  },
  {
    "id": "ram-ddr5-32",
    "slug": "corsair-vengeance-ddr5-32go",
    "title": "Corsair Vengeance DDR5 32 Go (2×16) 6000",
    "description": "Kit mémoire DDR5 haute fréquence XMP/EXPO.",
    "price": 129.9,
    "brand": "Corsair",
    "category": "Mémoire",
    "rating": 4.7,
    "image": "/placeholder.svg",
    "inStock": true,
    "specs": {
      "Capacité": "32 Go",
      "Fréquence": "6000 MT/s",
      "CAS": "36"
    }
  },
  {
    "id": "ssd-1tb",
    "slug": "samsung-990-evo-1to",
    "title": "Samsung 990 EVO 1 To NVMe",
    "description": "SSD NVMe rapide pour OS et jeux.",
    "price": 99.9,
    "brand": "Samsung",
    "category": "Stockage",
    "rating": 4.6,
    "image": "/placeholder.svg",
    "inStock": true,
    "specs": {
      "Format": "M.2 2280",
      "Interface": "PCIe 4.0 x4",
      "TBW": "600 TBW"
    }
  },
  {
    "id": "mb-b650",
    "slug": "msi-b650-tomahawk",
    "title": "MSI B650 Tomahawk WiFi",
    "description": "Carte mère AM5 robuste avec Wi-Fi 6E.",
    "price": 219.9,
    "brand": "MSI",
    "category": "Carte mère",
    "rating": 4.5,
    "image": "/placeholder.svg",
    "inStock": true,
    "specs": {
      "Chipset": "B650",
      "Slots M.2": "2",
      "Wi-Fi": "6E"
    }
  },
  {
    "id": "psu-750w",
    "slug": "bequiet-pure-power-12-750w",
    "title": "be quiet! Pure Power 12 750W",
    "description": "Alimentation ATX 3.0 80+ Gold silencieuse.",
    "price": 119.9,
    "brand": "be quiet!",
    "category": "Alimentation",
    "rating": 4.6,
    "image": "/placeholder.svg",
    "inStock": true,
    "specs": {
      "Certification": "80+ Gold",
      "Connecteurs": "2× 8-pin PCIe",
      "ATX": "3.0"
    }
  },
  {
    "id": "case-airflow",
    "slug": "nzxt-h7-flow-noir",
    "title": "NZXT H7 Flow (Noir)",
    "description": "Boîtier moyen tour orienté airflow.",
    "price": 149.9,
    "brand": "NZXT",
    "category": "Boîtier",
    "rating": 4.4,
    "image": "/placeholder.svg",
    "inStock": true,
    "specs": {
      "Format": "ATX",
      "Ventilateurs": "2 inclus",
      "Vitres": "Oui"
    }
  },
  {
    "id": "cooler-air",
    "slug": "noctua-nh-d15",
    "title": "Noctua NH-D15",
    "description": "Refroidissement air emblématique à double tour.",
    "price": 99.9,
    "brand": "Noctua",
    "category": "Refroidissement",
    "rating": 4.9,
    "image": "/placeholder.svg",
    "inStock": true,
    "specs": {
      "Type": "Air",
      "Hauteur": "165 mm",
      "Socket": "AM5/LGA1700"
    }
  },
  {
    "id": "aio-360",
    "slug": "arctic-liquid-freezer-iii-360",
    "title": "Arctic Liquid Freezer III 360",
    "description": "AIO 360 mm performant et silencieux.",
    "price": 129.9,
    "brand": "Arctic",
    "category": "Refroidissement",
    "rating": 4.6,
    "image": "/placeholder.svg",
    "inStock": true,
    "specs": {
      "Radiateur": "360 mm",
      "Pompe": "PWM",
      "Sock.": "AM5/LGA1700"
    }
  },
  {
    "id": "mb-z790",
    "slug": "asus-tuf-gaming-z790-plus-wifi",
    "title": "ASUS TUF Gaming Z790-Plus WiFi",
    "description": "Carte mère LGA1700 premium.",
    "price": 289.9,
    "brand": "ASUS",
    "category": "Carte mère",
    "rating": 4.5,
    "image": "/placeholder.svg",
    "inStock": true,
    "specs": {
      "Chipset": "Z790",
      "Slots M.2": "4",
      "Wi-Fi": "6E"
    }
  },
  {
    "id": "ram-ddr4-16",
    "slug": "gskill-ripjaws-v-16go",
    "title": "G.Skill Ripjaws V 16 Go (2×8) 3200",
    "description": "Kit DDR4 fiable pour plateformes plus anciennes.",
    "price": 49.9,
    "brand": "G.Skill",
    "category": "Mémoire",
    "rating": 4.3,
    "image": "/placeholder.svg",
    "inStock": true,
    "specs": {
      "Capacité": "16 Go",
      "Fréquence": "3200 MT/s",
      "CAS": "16"
    }
  },
  {
    "id": "ssd-2tb",
    "slug": "crucial-p5-plus-2to",
    "title": "Crucial P5 Plus 2 To NVMe",
    "description": "SSD NVMe PCIe 4.0 rapide 2 To.",
    "price": 159.9,
    "brand": "Crucial",
    "category": "Stockage",
    "rating": 4.6,
    "image": "/placeholder.svg",
    "inStock": true,
    "specs": {
      "Format": "M.2 2280",
      "Interface": "PCIe 4.0",
      "TBW": "1200 TBW"
    }
  },
  {
    "id": "gpu-rtx4060ti",
    "slug": "nvidia-geforce-rtx-4060-ti-8g",
    "title": "NVIDIA GeForce RTX 4060 Ti 8 Go",
    "description": "Idéale pour 1080p/1440p avec DLSS 3.",
    "price": 399.0,
    "brand": "NVIDIA",
    "category": "Carte graphique",
    "rating": 4.1,
    "image": "/placeholder.svg",
    "inStock": true,
    "specs": {
      "VRAM": "8 Go GDDR6",
      "TDP": "160W",
      "Ports": "HDMI 2.1, 3×DP"
    }
  },
  {
    "id": "psu-1000w",
    "slug": "corsair-rm1000e",
    "title": "Corsair RM1000e 1000W",
    "description": "Alimentation 80+ Gold puissante et modulaire.",
    "price": 169.9,
    "brand": "Corsair",
    "category": "Alimentation",
    "rating": 4.7,
    "image": "/placeholder.svg",
    "inStock": true,
    "specs": {
      "Certification": "80+ Gold",
      "ATX": "3.0",
      "PCIe": "12VHPWR"
    }
  }
] as Product[]
