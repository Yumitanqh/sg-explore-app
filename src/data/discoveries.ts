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
  heartland: string; // e.g., 'Bedok', 'Tampines', 'Toa Payoh', 'Tiong Bahru', 'Chinatown', etc.
  category: 'hawker' | 'heritage' | 'nature' | 'nightlife' | 'cafe' | 'heartland';
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
  mustTryDishes?: string[];
  isLocalFavorite?: boolean;
}

export const DISCOVERY_SPOTS: DiscoverySpot[] = [
  // --- BEDOK HEARTLAND & POPULAR FOOD PLACES ---
  {
    id: 'bedok-85-fengshan-market',
    title: 'Bedok 85 Fengshan Market & Food Centre',
    neighborhood: 'Bedok',
    heartland: 'Bedok',
    category: 'hawker',
    categoryLabel: 'Hawker & Supper Haven',
    editorialSubtitle: 'Singapore’s undisputed supper temple famed for soupy Bak Chor Mee and sambal stingray',
    description: 'A bustling eastern heartland food sanctuary that comes alive from dusk till past midnight, packing hungry locals for steaming bowls of garlic-pork broth noodles and sizzled banana-leaf seafood.',
    extendedCuratorialStory: 'Bedok 85 is an institution in Singapore food lore. Unlike conventional dry bak chor mee, Bedok 85 pioneered the legendary soupy version—cloudy, rich pork broth laden with tender minced meat and fried pork lard. Complement your noodles with smoky charcoal-grilled sambal stingray from Chan BBQ and crispy oyster omelette under the hum of giant ceiling fans.',
    image: '/src/assets/images/singapore_gastronomy_1794291676869.jpg',
    rating: 4.8,
    reviewsCount: 16840,
    mrt: {
      code: 'EW5',
      line: 'EW',
      lineName: 'East-West Line',
      station: 'Bedok',
      exit: 'Bus 14 / 222 from Bedok Interchange (6 mins)'
    },
    sensory: {
      aroma: 'Aromatic fried pork lard, bubbling garlic bone broth, and smoky grilled chili sambal',
      floraOrAtmosphere: 'Bustling red-tiled heartland food hall, chatter of families and supper night-owls',
      bestTime: '18:30 PM - 00:30 AM (Peak vibrant supper atmosphere)',
      signatureExperience: 'Xing Ji Rou Cuo Mian soup noodles paired with fresh sugar cane lime'
    },
    coordinates: { x: 88, y: 36, lat: 1.3321, lng: 103.9385 },
    priceTier: '$',
    openingHours: '16:00 - 02:00 Daily',
    address: '85 Bedok North Rd, Singapore 460085',
    curatorTip: 'Stalls #01-07 (Xing Ji) and #01-04 (Seng Hiang) serve competing soup bak chor mee styles—order both to compare broth intensity.',
    recommendedDuration: '1.5 Hours',
    mustTryDishes: ['Xing Ji Soupy Bak Chor Mee', 'Chan BBQ Sambal Stingray', 'Chai Chee Pork Porridge', 'Bedok 85 Fried Oyster Omelette'],
    isLocalFavorite: true
  },
  {
    id: 'bedok-interchange-hawker-centre',
    title: 'Bedok Interchange Hawker Centre',
    neighborhood: 'Bedok',
    heartland: 'Bedok',
    category: 'hawker',
    categoryLabel: 'Hawker & Morning Feasts',
    editorialSubtitle: 'Michelin Bib Gourmand Chwee Kueh, caramelized carrot cake, and iconic Malay soto',
    description: 'Located directly above the transit hub, this culinary landmark gathers three generations of master hawkers serving breakfast staples and fiery laksa.',
    extendedCuratorialStory: 'Bedok Interchange is celebrated for Bedok Chwee Kueh—silky steamed rice puddings crowned with savory-sweet braised chai poh (preserved radish) and housemade chili sambal. Follow up with Song Zhou Fried Carrot Cake, famous for its dark, sticky, caramelized sweet soy glaze and charred wok-tossed eggs.',
    image: '/src/assets/images/singapore_gastronomy_1794291676869.jpg',
    rating: 4.7,
    reviewsCount: 12430,
    mrt: {
      code: 'EW5',
      line: 'EW',
      lineName: 'East-West Line',
      station: 'Bedok',
      exit: 'Exit B (Direct sheltered escalator to food hall)'
    },
    sensory: {
      aroma: 'Caramelized sweet dark soy sauce, steaming rice cakes, and spiced lemongrass soto broth',
      floraOrAtmosphere: 'High-ceilinged airy transit food pavilion, friendly neighborhood chatter',
      bestTime: '08:00 - 11:30 AM (Fresh morning batches)',
      signatureExperience: 'Ordering hot Chwee Kueh with chai poh alongside freshly brewed robusta kopi-c'
    },
    coordinates: { x: 85, y: 38, lat: 1.3242, lng: 103.9304 },
    priceTier: '$',
    openingHours: '06:30 - 22:00 Daily',
    address: '208B New Upper Changi Rd, Singapore 462208',
    curatorTip: 'Song Zhou Carrot Cake queue moves briskly; ask for "yuan yang" (half black, half white) if you want both savory garlic and sweet soy styles.',
    recommendedDuration: '1 Hour',
    mustTryDishes: ['Bedok Chwee Kueh', 'Song Zhou Fried Carrot Cake', 'Inspirasi Mee Soto & Soto Ayam', 'Pin Xiang Hainanese Chicken Rice'],
    isLocalFavorite: true
  },
  {
    id: 'percolate-bedok-cafe',
    title: 'Percolate Coffee & Heartland Bakes',
    neighborhood: 'Bedok',
    heartland: 'Bedok',
    category: 'cafe',
    categoryLabel: 'Local Cafes & Bakes',
    editorialSubtitle: 'Artisanal micro-roastery, Earl Grey loaves, and curry egg croissants in a quiet HDB void deck',
    description: 'A trailblazer in Singapore’s third-wave heartland cafe movement, tucked discreetly beneath residential HDB flats in Bedok North.',
    extendedCuratorialStory: 'Established in 2014, Percolate proved that specialty pour-overs and seasonal single-origin coffees belonged right alongside morning kopi stalls in the heartlands. Locals frequent this minimalist enclave for soothing oat flat whites, pandan gula melaka tarts, and comforting sandwiches.',
    image: '/src/assets/images/singapore_gastronomy_1794291676869.jpg',
    rating: 4.8,
    reviewsCount: 3120,
    mrt: {
      code: 'EW5',
      line: 'EW',
      lineName: 'East-West Line',
      station: 'Bedok',
      exit: 'Exit A (8 min stroll through Bedok Town Square)'
    },
    sensory: {
      aroma: 'Freshly ground Ethiopian heirloom beans, toasted sourdough, and vanilla butter',
      floraOrAtmosphere: 'Warm Scandinavian timber, leafy monsteras, gentle acoustic jazz playlist',
      bestTime: '10:00 - 14:00 PM (Relaxed midday reading)',
      signatureExperience: 'Pairing an iced single-origin filter coffee with a warm banana loaf'
    },
    coordinates: { x: 84, y: 35, lat: 1.3289, lng: 103.9328 },
    priceTier: '$$',
    openingHours: '09:00 - 19:00 (Wed-Mon)',
    address: '136 Bedok North Ave 3, #01-152, Singapore 460136',
    curatorTip: 'Try their house-concocted espresso tonic with candied orange zest on a warm afternoon.',
    recommendedDuration: '1 Hour',
    mustTryDishes: ['Single-Origin Pour-Over Coffee', 'Curry Egg Mayo Croissant', 'Earl Grey Chiffon Cake'],
    isLocalFavorite: true
  },
  {
    id: 'bedok-reservoir-floating-deck',
    title: 'Bedok Reservoir & Forest Boardwalk',
    neighborhood: 'Bedok',
    heartland: 'Bedok',
    category: 'nature',
    categoryLabel: 'Heartland Nature & Waterfront',
    editorialSubtitle: '4.3km scenic waterside perimeter, dragon boat racing, and elevated canopy viewing decks',
    description: 'A converted former quarry transformed into a massive freshwater reservoir surrounded by shaded rain trees and native wetland flora.',
    extendedCuratorialStory: 'Beloved by east-side runners and birdwatchers, Bedok Reservoir offers a serene contrast to urban density. The floating timber deck extends right into calm waters where kingfishers, herons, and swallows dip across the surface against an expansive sky.',
    image: '/src/assets/images/cloud_forest_canopy_1794291675284.jpg',
    rating: 4.7,
    reviewsCount: 8900,
    mrt: {
      code: 'DT30',
      line: 'DT',
      lineName: 'Downtown Line',
      station: 'Bedok Reservoir',
      exit: 'Exit A (Direct access to park promenade)'
    },
    sensory: {
      aroma: 'Cool freshwater breezes, damp lakeside reed grass, and blooming yellow flame flowers',
      floraOrAtmosphere: 'Expansive open sky, reflective water basin, giant rain tree canopies',
      bestTime: '07:00 - 09:00 AM or 17:30 - 19:00 PM (Golden hour breezes)',
      signatureExperience: 'Walking the floating wooden boardwalk at sunset as dragon boat crews glide past'
    },
    coordinates: { x: 86, y: 31, lat: 1.3412, lng: 103.9318 },
    priceTier: '$',
    openingHours: 'Open 24 Hours Daily (Park lit till 07:00)',
    address: 'Bedok Reservoir Rd, Singapore 479233',
    curatorTip: 'Visit the WAWA Waterfront Bistro on the north bank for cold local craft beer by the lake.',
    recommendedDuration: '1.5 Hours',
    mustTryDishes: ['Post-run fresh coconut water from the waterside kiosk'],
    isLocalFavorite: true
  },

  // --- TOA PAYOH & CENTRAL HEARTLAND ---
  {
    id: 'toa-payoh-lor-1-food-centre',
    title: 'Toa Payoh Lorong 1 Food Centre & Dragon Playground',
    neighborhood: 'Toa Payoh',
    heartland: 'Toa Payoh',
    category: 'hawker',
    categoryLabel: 'Heartland Heritage & Hawkers',
    editorialSubtitle: 'Michelin Bib Gourmand crispy white carrot cake and Singapore’s pioneer 1970s HDB town',
    description: 'Toa Payoh is Singapore’s earliest planned HDB satellite town, harboring generational hawker royalty and the legendary sand-pit Dragon Playground.',
    extendedCuratorialStory: 'Chey Sua Carrot Cake here has held the Michelin Bib Gourmand crown for years: they pan-fry only white carrot cake until the bottom transforms into an ultra-crisp, golden lace omelette crust while keeping the radish cake melt-in-mouth tender within. Stroll over to Lorong 6 afterward to see the iconic 1979 Dragon mosaic playground.',
    image: '/src/assets/images/heritage_shophouses_1794291676090.jpg',
    rating: 4.8,
    reviewsCount: 9400,
    mrt: {
      code: 'NS19',
      line: 'NS',
      lineName: 'North-South Line',
      station: 'Toa Payoh',
      exit: 'Exit C (5 min walk through town center)'
    },
    sensory: {
      aroma: 'Crispy wok-tossed radish cake, charred garlic cloves, and freshly stewed soy chicken',
      floraOrAtmosphere: 'Retro 1970s brick mosaic architecture, lively senior community chess tables',
      bestTime: '09:00 - 12:00 PM (Chey Sua is open only mornings till sold out)',
      signatureExperience: 'Savoring Chey Sua crispy carrot cake with homemade garlic chili paste'
    },
    coordinates: { x: 46, y: 28, lat: 1.3328, lng: 103.8524 },
    priceTier: '$',
    openingHours: '06:00 - 15:00 (Wed-Sun)',
    address: '127 Lor 1 Toa Payoh, #02-30, Singapore 310127',
    curatorTip: 'Chey Sua queue can reach 45 minutes on weekends; arrive by 8:30 AM on weekdays for quick service.',
    recommendedDuration: '1.5 Hours',
    mustTryDishes: ['Chey Sua Crispy White Carrot Cake', 'De Ji Hong Kong Soy Sauce Chicken', 'Uggli Muffins Baby Muffins'],
    isLocalFavorite: true
  },

  // --- TAMPINES ROUND MARKET ---
  {
    id: 'tampines-round-market-food-centre',
    title: 'Tampines Round Market & Food Centre',
    neighborhood: 'Tampines',
    heartland: 'Tampines',
    category: 'hawker',
    categoryLabel: 'Heartland Food Hub',
    editorialSubtitle: 'Historic 1983 circular food arena packed with famous Sarawak kolo mee and fish soup',
    description: 'An architectural oddity designed in the round, housing over 40 celebrated stalls that feed thousands of eastern residents daily.',
    extendedCuratorialStory: 'Tampines Round Market is famed for stalls with three-decade histories: Yummy Sarawak Kolo Mee serves springy egg noodles tossed in lard and shallot oil with sweet char siew; 137 Lor Mee ladles thick, dark spiced gravy infused with five-spice and black vinegar; and the night turns into a sizzling seafood hotspot.',
    image: '/src/assets/images/singapore_gastronomy_1794291676869.jpg',
    rating: 4.7,
    reviewsCount: 10500,
    mrt: {
      code: 'DT32',
      line: 'DT',
      lineName: 'Downtown Line',
      station: 'Tampines',
      exit: 'Exit B (Transfer to Bus 28 / 292 or 10 min walk)'
    },
    sensory: {
      aroma: 'Aromatic star anise gravy, charred shallot oil, and simmering fresh red snapper broth',
      floraOrAtmosphere: 'Unique circular open-air market, lively market vendors calling fresh catch',
      bestTime: '07:30 - 11:00 AM (Breakfast frenzy)',
      signatureExperience: 'A bowl of springy Sarawak Kolo Mee with extra crispy lard bits'
    },
    coordinates: { x: 92, y: 34, lat: 1.3475, lng: 103.9442 },
    priceTier: '$',
    openingHours: '06:30 - 15:00 Daily',
    address: '137 Tampines St 11, Singapore 521137',
    curatorTip: 'Pair your noodles with deep-fried carrot cake cubes from the corner stall—uniquely crispy on all sides.',
    recommendedDuration: '1 Hour',
    mustTryDishes: ['Yummy Sarawak Kolo Mee', '137 Lor Mee', 'Hai Chang Fish Head Steamboat', 'Teo Kee Mushroom Minced Meat Noodle'],
    isLocalFavorite: true
  },

  // --- OLD AIRPORT ROAD & GEYLANG ---
  {
    id: 'old-airport-road-food-centre',
    title: 'Old Airport Road Food Centre',
    neighborhood: 'Geylang & Mountbatten',
    heartland: 'Old Airport Road',
    category: 'hawker',
    categoryLabel: 'Hawker Royalty',
    editorialSubtitle: 'Singapore’s most decorated hawker fortress: Nam Sing Hokkien Mee & Lao Fu Zi Char Kway Teow',
    description: 'Built on the airfield grounds of the former Kallang Airport, this two-story giant is universally acclaimed among local food connoisseurs.',
    extendedCuratorialStory: 'Old Airport Road is where legendary culinary rivalries play out. Nam Sing Hokkien Fried Mee has been frying yellow noodles and thin bee hoon in prawn and pork bone broth since 1963, using traditional cut red chili rather than sambal to preserve the pure seafood sweetness. Lao Fu Zi Char Kway Teow provides intense wok hei, while 51 Soya Bean serves silky bean curd pudding.',
    image: '/src/assets/images/singapore_gastronomy_1794291676869.jpg',
    rating: 4.8,
    reviewsCount: 24300,
    mrt: {
      code: 'CC7',
      line: 'CC',
      lineName: 'Circle Line',
      station: 'Mountbatten',
      exit: 'Exit B (2 min sheltered walk)'
    },
    sensory: {
      aroma: 'Charred wok hei, rich prawn stock steam, and caramelized lard cracklings',
      floraOrAtmosphere: 'Expansive two-level community food complex, vibrant weekend crowds',
      bestTime: '11:00 AM - 14:00 PM or 18:00 - 20:30 PM',
      signatureExperience: 'Tasting Nam Sing Hokkien Mee followed by fresh Lao Ban chilled beancurd'
    },
    coordinates: { x: 68, y: 44, lat: 1.3082, lng: 103.8858 },
    priceTier: '$',
    openingHours: '06:00 - 23:00 Daily (Stalls vary)',
    address: '51 Old Airport Rd, Singapore 390051',
    curatorTip: 'Order Nam Sing Hokkien Mee first thing upon arrival; you get an estimated queue buzzer that lets you shop for appetizers while it fries.',
    recommendedDuration: '2 Hours',
    mustTryDishes: ['Nam Sing Hokkien Fried Mee', 'Lao Fu Zi Char Kway Teow', 'Roast Paradise Char Siew', 'Dong Ji Fried Kway Teow'],
    isLocalFavorite: true
  },

  // --- TIONG BAHRU HERITAGE & ART DECO ---
  {
    id: 'tiong-bahru-market-food-centre',
    title: 'Tiong Bahru Market & Art Deco Enclave',
    neighborhood: 'Tiong Bahru',
    heartland: 'Tiong Bahru',
    category: 'heartland',
    categoryLabel: 'Heritage Heartlands & Bakes',
    editorialSubtitle: '1930s Streamline Moderne housing, Jian Bo Chwee Kueh, and indie bookstores',
    description: 'Singapore’s first public housing estate, famed for rounded aerodynamic balconies, spiral outdoor staircases, and artisanal cafes.',
    extendedCuratorialStory: 'Tiong Bahru captures Singapore’s golden juxtaposition between nostalgic heritage and contemporary chic. Start on the second floor of Tiong Bahru Market with Jian Bo Chwee Kueh and Loo’s Hainanese Curry Rice, then amble along Yong Siak Street past Tiong Bahru Bakery and independent booksellers.',
    image: '/src/assets/images/heritage_shophouses_1794291676090.jpg',
    rating: 4.8,
    reviewsCount: 18900,
    mrt: {
      code: 'EW17',
      line: 'EW',
      lineName: 'East-West Line',
      station: 'Tiong Bahru',
      exit: 'Exit B (7 min walk along Seng Poh Rd)'
    },
    sensory: {
      aroma: 'Rich Hainanese curry gravy, freshly baked butter croissants, and robust kopi',
      floraOrAtmosphere: 'Streamline Moderne rounded residential facades, shaded banyan courtyards',
      bestTime: '08:30 - 12:00 PM (Morning market life)',
      signatureExperience: 'Ordering Jian Bo Chwee Kueh followed by a kouign-amann pastry at Tiong Bahru Bakery'
    },
    coordinates: { x: 42, y: 56, lat: 1.2858, lng: 103.8322 },
    priceTier: '$$',
    openingHours: '07:00 - 20:00 Daily',
    address: '30 Seng Poh Rd, Singapore 168898',
    curatorTip: 'Explore the conserved air raid shelter on Guan Chuan Street—the only civilian pre-war shelter intact in an HDB estate.',
    recommendedDuration: '2.5 Hours',
    mustTryDishes: ['Jian Bo Chwee Kueh', 'Loo’s Hainanese Curry Rice', 'Hong Heng Fried Sotong Prawn Mee', 'Tiong Bahru Bakery Kouign-Amann'],
    isLocalFavorite: true
  },

  // --- BALESTIER & BOON TONG KEE ---
  {
    id: 'balestier-heritage-food-trail',
    title: 'Balestier Heritage Road & Tau Sar Piah',
    neighborhood: 'Balestier',
    heartland: 'Balestier',
    category: 'heritage',
    categoryLabel: 'Heritage Food Trail',
    editorialSubtitle: 'Original Boon Tong Kee Hainanese chicken rice, herbal Bak Kut Teh, and traditional flaky pastries',
    description: 'A historic corridor steeped in sugar cane and lime plantation history, now famous as Singapore’s 24-hour culinary strip.',
    extendedCuratorialStory: 'Balestier is legendary for Loong Fatt Tau Sar Piah, where bakers have hand-rolled sweet and salty mung bean pastries into flaky, golden pastries since 1948. Directly down the road is the original Boon Tong Kee chicken rice outlet, famous for silky poached chicken dressed with fragrant sesame soy sauce.',
    image: '/src/assets/images/singapore_gastronomy_1794291676869.jpg',
    rating: 4.7,
    reviewsCount: 14200,
    mrt: {
      code: 'NS20',
      line: 'NS',
      lineName: 'North-South Line',
      station: 'Novena',
      exit: 'Exit B (10 min stroll or bus 130/145)'
    },
    sensory: {
      aroma: 'Flaky baked butter pastry crusts, simmered garlic chicken broth, and peppery pork rib soup',
      floraOrAtmosphere: 'Eclectic pre-war shophouses with ornate plaster relief tiles, late-night neon signage',
      bestTime: '11:30 AM (Warm morning pastry bake) or 21:00 PM (Supper bak kut teh)',
      signatureExperience: 'Biting into warm, flaky sweet and salty tau sar piah straight from the baking trays'
    },
    coordinates: { x: 50, y: 34, lat: 1.3218, lng: 103.8519 },
    priceTier: '$$',
    openingHours: '08:00 - 02:00 Daily',
    address: 'Balestier Rd, Singapore 329774',
    curatorTip: 'Buy a box of both sweet and salty tau sar piah at Loong Fatt—the salty version with fried shallots is addictive.',
    recommendedDuration: '1.5 Hours',
    mustTryDishes: ['Loong Fatt Sweet & Salty Tau Sar Piah', 'Boon Tong Kee Hainanese Chicken Rice', 'Founder Bak Kut Teh', 'Whampoa Keng Fishhead Steamboat'],
    isLocalFavorite: true
  },

  // --- BOTANICAL & CULTURE ICONS (MARINA BAY, ORCHARD, KATONG) ---
  {
    id: 'cloud-forest-flower-dome',
    title: 'Cloud Forest & Supertree Conservatory',
    neighborhood: 'Marina Bay',
    heartland: 'Marina Bay',
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
    recommendedDuration: '2.5 Hours',
    mustTryDishes: ['Artisanal botanical ice cream at Conservatory Cafe'],
    isLocalFavorite: false
  },
  {
    id: 'joo-chiat-peranakan-shophouses',
    title: 'Koon Seng Road Peranakan Enclave',
    neighborhood: 'Katong & Joo Chiat',
    heartland: 'Katong',
    category: 'heritage',
    categoryLabel: 'Heritage & Shophouses',
    editorialSubtitle: 'Ceramic pastel facades, Corinthian pilasters, and 328 Katong Laksa',
    description: 'Iconic 1920s heritage shophouses adorned with handcrafted Majolica glazed tiles, intricate fretwork, and world-renowned spicy coconut noodle bowls.',
    extendedCuratorialStory: 'Koon Seng Road remains one of the finest architectural testaments to the Chinese Baroque style. Built in the late 1920s, these residences fuse classical European neoclassical arches, mythical Chinese dragon corbels, and Malay vernacular eave fretwork. Pair your architectural walk with authentic 328 Katong Laksa, eaten strictly with a porcelain spoon.',
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
      aroma: 'Fragrant pandan, freshly pounded laksa leaves, and brewed robusta kopi',
      floraOrAtmosphere: 'Verdant potted traveler palms, bougainvillea spillways, glazed clay urns',
      bestTime: '08:00 - 10:30 AM (Gentle morning light angles)',
      signatureExperience: 'Pairing architectural strolls with warm Nonya kueh salat at nearby Chin Mee Chin'
    },
    coordinates: { x: 82, y: 44, lat: 1.3128, lng: 103.9019 },
    priceTier: '$',
    openingHours: 'Open 24 Hours (Public residential street)',
    address: 'Koon Seng Rd, Singapore 427011',
    curatorTip: 'Observe the subtle animal motifs in the relief plasterwork: bats for fortune, crabs for scholastic rank.',
    recommendedDuration: '1.5 Hours',
    mustTryDishes: ['328 Katong Laksa (with cockles and otak-otak)', 'Chin Mee Chin Kaya Buns', 'Kim Choo Nonya Rice Dumplings'],
    isLocalFavorite: true
  },
  {
    id: 'singapore-gastronomy-trail',
    title: 'Maxwell & Chinatown Heritage Food Trail',
    neighborhood: 'Chinatown',
    heartland: 'Chinatown',
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
    recommendedDuration: '1.5 Hours',
    mustTryDishes: ['Tian Tian Hainanese Chicken Rice', 'Zhen Zhen Rice Porridge', 'Tong Xin Ju Special Shanghai Tim Sum'],
    isLocalFavorite: true
  },
  {
    id: 'supertree-grove-marina-twilight',
    title: 'Supertree Grove & Garden Rhapsody',
    neighborhood: 'Marina Bay',
    heartland: 'Marina Bay',
    category: 'nightlife',
    categoryLabel: 'Nightlife & Canopy',
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
    recommendedDuration: '2 Hours',
    mustTryDishes: ['Satay by the Bay grilled beef and mutton skewers'],
    isLocalFavorite: false
  },
  {
    id: 'botanic-gardens-orchid-pavilion',
    title: 'National Orchid Garden & Tanglin Gate',
    neighborhood: 'Tanglin & Orchard',
    heartland: 'Tanglin',
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
    recommendedDuration: '3 Hours',
    mustTryDishes: ['Fresh lemongrass iced tea at Halia Restaurant in the ginger garden'],
    isLocalFavorite: true
  },
  {
    id: 'atlas-grand-lobby-bar',
    title: 'Atlas Bar & The Art Deco Gin Tower',
    neighborhood: 'Bugis & Kampong Gelam',
    heartland: 'Bugis',
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
    recommendedDuration: '2 Hours',
    mustTryDishes: ['The Atlas Vintage Martini', 'Lobster Brioche Toast'],
    isLocalFavorite: false
  }
];

export const CATEGORIES = [
  { id: 'all', label: 'All Places' },
  { id: 'hawker', label: 'Hawker & Local Food' },
  { id: 'heartland', label: 'Heartlands & Neighborhoods' },
  { id: 'cafe', label: 'Local Cafes & Bakes' },
  { id: 'heritage', label: 'Heritage & Shophouses' },
  { id: 'nature', label: 'Parks & Reservoirs' },
  { id: 'nightlife', label: 'Nightlife & Supper' }
] as const;

export const NEIGHBORHOODS = [
  'All Singapore Areas',
  'Bedok',
  'Tampines',
  'Toa Payoh',
  'Old Airport Road',
  'Tiong Bahru',
  'Balestier',
  'Katong & Joo Chiat',
  'Chinatown',
  'Bugis & Kampong Gelam',
  'Marina Bay',
  'Tanglin & Orchard'
] as const;
