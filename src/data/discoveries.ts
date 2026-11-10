export interface MrtStation {
  code: string;
  line: 'DT' | 'TE' | 'NS' | 'EW' | 'CC' | 'NE';
  lineName: string;
  station: string;
  exit: string;
}

export interface SensoryNotes {
  aroma: string;
  floraOrAtmosphere: string;
  bestTime: string;
  signatureExperience: string;
}

export interface DiscoverySpot {
  id: string;
  title: string;
  neighborhood: string;
  category: 'nature' | 'heritage' | 'hawker' | 'nightlife' | 'thrills';
  categoryLabel: string;
  editorialSubtitle: string;
  description: string;
  extendedCuratorialStory: string;
  image: string;
  rating: number;
  reviewsCount: number;
  mrt: MrtStation;
  sensory: SensoryNotes;
  coordinates: { x: number; y: number; lat: number; lng: number };
  priceTier: '$' | '$$' | '$$$' | '$$$$';
  openingHours: string;
  address: string;
  curatorTip: string;
  recommendedDuration: string;
}

export const DISCOVERY_SPOTS: DiscoverySpot[] = [
  {
    id: 'cloud-forest-flower-dome',
    title: 'Cloud Forest & Supertree Conservatory',
    neighborhood: 'Marina Bay',
    category: 'nature',
    categoryLabel: 'Nature & Canopy',
    editorialSubtitle: 'Modernist misty mountain veiled in orchids and 35-meter indoor waterfall',
    description: 'A botanical marvel replicating the cool moist climate of tropical montane regions between 1,000 and 3,000 meters above sea level.',
    extendedCuratorialStory: 'Ascend through five levels of ethereal highland vegetation where pitcher plants, epiphytic ferns, and miniature orchids drape from an artificial limestone karst. As the misting sequence activates, the interior glass ribbing dissolves into a cloud-shrouded amphitheater overlooking the Singapore Strait.',
    image: '/src/assets/images/cloud_forest_canopy_1794291675284.jpg',
    rating: 4.9,
    reviewsCount: 38240,
    mrt: {
      code: 'TE22',
      line: 'TE',
      lineName: 'Thomson-East Coast',
      station: 'Gardens by the Bay',
      exit: 'Exit 1 (Underground link)'
    },
    sensory: {
      aroma: 'Damp petrichor, crushed moss, and highland blooming vanilla orchids',
      floraOrAtmosphere: 'Highland cloud forest biome, giant tree ferns, carnivorous Nepenthes',
      bestTime: '10:00 AM or 17:30 PM (Misting hours)',
      signatureExperience: 'Walking the suspended Cloud Walk bridge through the waterfall mist'
    },
    coordinates: { x: 62, y: 58, lat: 1.2842, lng: 103.8656 },
    priceTier: '$$$',
    openingHours: '09:00 - 21:00 Daily',
    address: '18 Marina Gardens Dr, Singapore 018953',
    curatorTip: 'Visit the Secret Garden at the base right after the misting cycle for quiet reflection without crowds.',
    recommendedDuration: '2.5 Hours'
  },
  {
    id: 'joo-chiat-peranakan-shophouses',
    title: 'Koon Seng Road Peranakan Enclave',
    neighborhood: 'Katong & Joo Chiat',
    category: 'heritage',
    categoryLabel: 'Heritage & Shophouses',
    editorialSubtitle: 'Ceramic pastel facades, Corinthian pilasters, and Straits Chinese heritage',
    description: 'Iconic 1920s heritage shophouses adorned with handcrafted Majolica glazed tiles, intricate fretwork, and pastel hues.',
    extendedCuratorialStory: 'Koon Seng Road remains one of the finest architectural testaments to the Chinese Baroque or Peranakan eclectic style. Built in the late 1920s, these residences fuse classical European neoclassical arches, mythical Chinese dragon corbels, and Malay vernacular eave fretwork into a radiant sunlit tableau.',
    image: '/src/assets/images/heritage_shophouses_1794291676090.jpg',
    rating: 4.8,
    reviewsCount: 14210,
    mrt: {
      code: 'TE26',
      line: 'TE',
      lineName: 'Thomson-East Coast',
      station: 'Marine Parade',
      exit: 'Exit 2 (6 min walk along Joo Chiat)'
    },
    sensory: {
      aroma: 'Fragrant pandan, freshly pounded rempah spices, and brewed robusta kopi',
      floraOrAtmosphere: 'Verdant potted traveler palms, bougainvillea spillways, glazed clay urns',
      bestTime: '08:00 - 10:30 AM (Gentle morning light angles)',
      signatureExperience: 'Pairing architectural strolls with warm Nonya kueh salat at nearby Chin Mee Chin'
    },
    coordinates: { x: 82, y: 44, lat: 1.3128, lng: 103.9019 },
    priceTier: '$',
    openingHours: 'Open 24 Hours (Public residential street)',
    address: 'Koon Seng Rd, Singapore 427011',
    curatorTip: 'Observe the subtle animal motifs in the relief plasterwork: bats for fortune, crabs for scholastic rank.',
    recommendedDuration: '1.5 Hours'
  },
  {
    id: 'singapore-gastronomy-trail',
    title: 'Maxwell & Chinatown Heritage Food Trail',
    neighborhood: 'Chinatown',
    category: 'hawker',
    categoryLabel: 'Hawker & Dining',
    editorialSubtitle: 'Michelin Bib Gourmand Tian Tian chicken rice, silky laksa, and heritage kopi',
    description: 'A culinary sanctuary preserving century-old generational recipes under humming ceiling fans and open-flame woks.',
    extendedCuratorialStory: 'Maxwell Food Centre sits at the crossroads of historic Hokkien and Cantonese migrant corridors. The symphony of clattering porcelain spoons, simmering bone broths, and sizzling wok hei tells the story of Singapore’s cultural synthesis far better than any textbook.',
    image: '/src/assets/images/singapore_gastronomy_1794291676869.jpg',
    rating: 4.9,
    reviewsCount: 29850,
    mrt: {
      code: 'TE19',
      line: 'TE',
      lineName: 'Thomson-East Coast',
      station: 'Maxwell',
      exit: 'Exit 1 (Directly opposite food hall)'
    },
    sensory: {
      aroma: 'Roasted shallot oil, pandan lemongrass broth, and charcoal-toasted sourdough',
      floraOrAtmosphere: 'Bustling covered heritage food hall, vintage ceramic tableware',
      bestTime: '11:15 AM (Before lunch rush lines build)',
      signatureExperience: 'Ordering steamed chicken rice paired with artisanal iced sugarcane lime'
    },
    coordinates: { x: 50, y: 62, lat: 1.2804, lng: 103.8447 },
    priceTier: '$',
    openingHours: '08:00 - 22:00 Daily',
    address: '1 Kadayanallur St, Singapore 069184',
    curatorTip: 'Also seek out the handmade tapioca kueh and Zhen Zhen porridge stalls tucked in the center aisle.',
    recommendedDuration: '1.5 Hours'
  },
  {
    id: 'supertree-grove-marina-twilight',
    title: 'Supertree Grove & Garden Rhapsody',
    neighborhood: 'Marina Bay',
    category: 'nightlife',
    categoryLabel: 'Nightlife & Mixology',
    editorialSubtitle: 'Vertical gardens reaching 50 meters into the twilight sky with light & sound symphony',
    description: 'Twelve colossal vertical botanical towers clad with over 158,000 bromeliads, orchids, and tropical climbing plants.',
    extendedCuratorialStory: 'By dusk, the Supertrees transform into living sculptures of luminescence. Designed to act as environmental engines that collect rainwater and exhaust conservatory air, these iconic structures represent Singapore’s vision of a city thriving inside nature.',
    image: '/src/assets/images/supertree_twilight_1794291676270.jpg',
    rating: 4.9,
    reviewsCount: 51200,
    mrt: {
      code: 'DT16',
      line: 'DT',
      lineName: 'Downtown Line',
      station: 'Bayfront',
      exit: 'Exit B (Dragonfly Bridge walk)'
    },
    sensory: {
      aroma: 'Evening sea breeze mingling with night-blooming jasmine',
      floraOrAtmosphere: 'Towering bromeliad-clad steel canopies, twilight reflections on Dragonfly Lake',
      bestTime: '19:45 PM or 20:45 PM (Garden Rhapsody showtimes)',
      signatureExperience: 'Lying beneath the central Supertree trunk as the symphonic score swells'
    },
    coordinates: { x: 65, y: 56, lat: 1.2818, lng: 103.8636 },
    priceTier: '$$',
    openingHours: '05:00 - 02:00 Daily',
    address: '18 Marina Gardens Dr, Singapore 018953',
    curatorTip: 'The OCBC Skyway suspension bridge offers a breathtaking perspective, but book your slot 48h in advance.',
    recommendedDuration: '2 Hours'
  },
  {
    id: 'botanic-gardens-orchid-pavilion',
    title: 'National Orchid Garden & Tanglin Gate',
    neighborhood: 'Tanglin & Orchard',
    category: 'nature',
    categoryLabel: 'Nature & Canopy',
    editorialSubtitle: 'UNESCO World Heritage botanical grounds with over 3,000 orchid hybrids',
    description: 'Founded in 1859, the gardens feature equatorial rainforests, heritage trees, and the world’s foremost orchid breeding pavilion.',
    extendedCuratorialStory: 'The VIP Orchid Garden commemorates visiting dignitaries with bespoke hybrid blooms, while the Burkill Hall colonial bungalow overlooks the misty mist-house where fragile montane species thrive. It is the only tropical garden inscribed on UNESCO’s World Heritage list.',
    image: '/src/assets/images/cloud_forest_canopy_1794291675284.jpg',
    rating: 4.9,
    reviewsCount: 32600,
    mrt: {
      code: 'CC19',
      line: 'CC',
      lineName: 'Circle Line',
      station: 'Botanic Gardens',
      exit: 'Exit A (Steps to Bukit Timah Gate)'
    },
    sensory: {
      aroma: 'Damp humus, tropical rainfall, and subtle citrus notes of Paphiopedilum orchids',
      floraOrAtmosphere: 'Pristine 160-year-old primary equatorial rain forest, giant Tembusu trees',
      bestTime: '07:30 - 09:30 AM (Cool morning birdsong)',
      signatureExperience: 'Admiring the Papilionanda Miss Joaquim, Singapore’s national flower'
    },
    coordinates: { x: 30, y: 38, lat: 1.3138, lng: 103.8159 },
    priceTier: '$',
    openingHours: '08:30 - 19:00 Daily',
    address: '1 Cluny Rd, Singapore 259569',
    curatorTip: 'Visit the Tan Hoon Siang Mist House for rare and fragile miniature species suspended in cool air.',
    recommendedDuration: '3 Hours'
  },
  {
    id: 'atlas-grand-lobby-bar',
    title: 'Atlas Bar & The Art Deco Gin Tower',
    neighborhood: 'Bugis & Kampong Gelam',
    category: 'nightlife',
    categoryLabel: 'Nightlife & Mixology',
    editorialSubtitle: 'Gilded 1920s Art Deco salon housing the world’s most comprehensive gin repository',
    description: 'A soaring 15-meter gilded ceiling, brass bas-reliefs, and a three-story gin tower holding over 1,300 bottles.',
    extendedCuratorialStory: 'Housed within Parkview Square—often termed Singapore’s Gotham Building—Atlas is a tribute to the gilded age of European grand hotels. Sommelier "gin fairies" were famously hoisted on wires to retrieve rare vintage London dry spirits from the pinnacle.',
    image: '/src/assets/images/supertree_twilight_1794291676270.jpg',
    rating: 4.8,
    reviewsCount: 8400,
    mrt: {
      code: 'DT14',
      line: 'DT',
      lineName: 'Downtown Line',
      station: 'Bugis',
      exit: 'Exit F (2 min walk)'
    },
    sensory: {
      aroma: 'Juniper berries, beeswax wood polish, and champagne citrus effervescence',
      floraOrAtmosphere: 'Polished walnut, green velvet armchairs, gilded frescoes',
      bestTime: '18:00 - 20:30 PM (Aperitivo hour)',
      signatureExperience: 'Sipping the Atlas Vintage Martini stirred with 1930s Seagers gin'
    },
    coordinates: { x: 55, y: 46, lat: 1.3005, lng: 103.8580 },
    priceTier: '$$$$',
    openingHours: '12:00 - 00:00 (Tue-Sat)',
    address: '600 North Bridge Rd, Parkview Square, Singapore 188778',
    curatorTip: 'Smart casual dress code strictly enforced; reserve a corner velvet booth 2 weeks ahead.',
    recommendedDuration: '2 Hours'
  },
  {
    id: 'fort-canning-spice-garden',
    title: 'Fort Canning Park & The Forbidden Hill',
    neighborhood: 'Civic District',
    category: 'heritage',
    categoryLabel: 'Heritage & Shophouses',
    editorialSubtitle: '14th-century royal palace grounds, colonial spice plantations, and the Tree Tunnel',
    description: 'An ancient hill known as Bukit Larangan (Forbidden Hill), where 14th-century Malay kings ruled and Raffles established the first botanical garden in 1822.',
    extendedCuratorialStory: 'Stroll past ancient nutmeg trees, clove shrubs, and sacred archaeological terraces before arriving at the photogenic spiral staircase of the Fort Canning Tree Tunnel, where a canopy of rain trees frames the sky.',
    image: '/src/assets/images/heritage_shophouses_1794291676090.jpg',
    rating: 4.8,
    reviewsCount: 22100,
    mrt: {
      code: 'DT20',
      line: 'DT',
      lineName: 'Downtown Line',
      station: 'Fort Canning',
      exit: 'Exit B (Direct park escalators)'
    },
    sensory: {
      aroma: 'Bruised nutmeg leaves, aromatic cloves, and damp brick mortar',
      floraOrAtmosphere: 'Ancient rain trees draped in creeping ivy, stone archaeological gates',
      bestTime: '08:30 - 10:00 AM (Quiet spiral tree tunnel light)',
      signatureExperience: 'Walking the shaded Sang Nila Utama Garden modeled after 14th-century Javanese royal courtyards'
    },
    coordinates: { x: 48, y: 52, lat: 1.2952, lng: 103.8475 },
    priceTier: '$',
    openingHours: 'Open 24 Hours Daily',
    address: '51 Canning Rise, Singapore 179872',
    curatorTip: 'Enter through the Armenian Street park connector for the calmest ascent.',
    recommendedDuration: '2 Hours'
  },
  {
    id: 'sentosa-coastal-rainforest-trail',
    title: 'Sentosa Imbiah Rainforest & Coastal Trail',
    neighborhood: 'Sentosa',
    category: 'thrills',
    categoryLabel: 'Fun & Thrills',
    editorialSubtitle: 'Elevated canopy skywalk, coastal artillery forts, and turquoise sea panoramas',
    description: 'A dramatic coastal cliff walk and 11-story high Fort Siloso Skywalk offering panoramic vistas over the Singapore Strait.',
    extendedCuratorialStory: 'While Sentosa is renowned for luxury beach clubs and theme parks, its protected western ridge retains untouched coastal rainforest and military heritage dating to the late 19th century. Walking among the tree tops provides breezy respite from city humidity.',
    image: '/src/assets/images/cloud_forest_canopy_1794291675284.jpg',
    rating: 4.7,
    reviewsCount: 16500,
    mrt: {
      code: 'NE1',
      line: 'NE',
      lineName: 'North-East Line',
      station: 'HarbourFront',
      exit: 'Exit E (Transfer to Sentosa Express)'
    },
    sensory: {
      aroma: 'Salty maritime breeze, warm coastal granite, and crushed sea almond foliage',
      floraOrAtmosphere: 'Coastal casuarina pines, giant sea hibiscus, historic artillery ramparts',
      bestTime: '16:30 - 18:30 PM (Cool sea breeze and sunset)',
      signatureExperience: 'Taking the glass-bottomed Fort Siloso Skywalk at tree canopy height'
    },
    coordinates: { x: 38, y: 80, lat: 1.2588, lng: 103.8115 },
    priceTier: '$$',
    openingHours: '09:00 - 18:00 Daily',
    address: 'Sentosa Island, Singapore 099981',
    curatorTip: 'Fort Siloso is free admission and houses fascinating subterranean tunnel exhibitions.',
    recommendedDuration: '2.5 Hours'
  }
];

export const CATEGORIES = [
  { id: 'all', label: 'All Curations' },
  { id: 'nature', label: 'Nature & Canopy' },
  { id: 'heritage', label: 'Heritage & Shophouses' },
  { id: 'hawker', label: 'Hawker & Dining' },
  { id: 'nightlife', label: 'Nightlife & Mixology' },
  { id: 'thrills', label: 'Fun & Thrills' },
] as const;

export const NEIGHBORHOODS = [
  'All Neighborhoods',
  'Marina Bay',
  'Katong & Joo Chiat',
  'Chinatown',
  'Bugis & Kampong Gelam',
  'Civic District',
  'Tanglin & Orchard',
  'Sentosa'
] as const;
