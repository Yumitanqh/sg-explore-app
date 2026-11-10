export interface ItineraryStop {
  id: string;
  time: string;
  duration: string;
  title: string;
  neighborhood: string;
  mrtTip: string;
  highlight: string;
  sensoryFocus: string;
  category: 'nature' | 'heritage' | 'hawker' | 'nightlife' | 'thrills';
  spotId?: string;
  notes?: string;
}

export interface DayItinerary {
  dayNumber: number;
  dayTitle: string;
  theme: string;
  editorialBlurb: string;
  totalDistance: string;
  estimatedWalkingMinutes: number;
  transitSuggestion: string;
  stops: ItineraryStop[];
}

export const CURATED_ITINERARIES: DayItinerary[] = [
  {
    dayNumber: 1,
    dayTitle: 'Day 01 · Modernist Glasshouses & Waterfront Twilight',
    theme: 'Architectural Biomes & Marina Bay Skyline',
    editorialBlurb: 'Trace Singapore’s transformation from equatorial trading outpost to sustainable Garden City, beginning in climate-controlled mountain mist and culminating in glowing twilight Supertrees.',
    totalDistance: '4.8 km',
    estimatedWalkingMinutes: 55,
    transitSuggestion: 'Take Downtown Line (DT16) or Thomson-East Coast Line (TE22) directly into Marina Gardens.',
    stops: [
      {
        id: 'day1-stop-1',
        time: '09:00 AM',
        duration: '2.5 Hours',
        title: 'Cloud Forest & Flower Dome Misting Expedition',
        neighborhood: 'Marina Bay',
        mrtTip: 'TE22 Gardens by the Bay (Exit 1)',
        highlight: '35m interior waterfall, carnivorous pitcher plants, and highland misting',
        sensoryFocus: 'Petrichor air, cool 23°C montane microclimate, blooming orchids',
        category: 'nature',
        spotId: 'cloud-forest-flower-dome'
      },
      {
        id: 'day1-stop-2',
        time: '12:30 PM',
        duration: '1.5 Hours',
        title: 'Waterfront Promenade & Satay by the Bay',
        neighborhood: 'Marina Bay',
        mrtTip: '8 min scenic bayfront timber boardwalk stroll',
        highlight: 'Charcoal-grilled chicken and mutton satay with spiced peanut dip',
        sensoryFocus: 'Smoky charcoal aroma, sea breeze from the Singapore Strait',
        category: 'hawker',
        spotId: 'singapore-gastronomy-trail'
      },
      {
        id: 'day1-stop-3',
        time: '03:30 PM',
        duration: '2 Hours',
        title: 'ArtScience Museum Lotus Pavilion & Digital Flora',
        neighborhood: 'Marina Bay Sands',
        mrtTip: 'DT16 Bayfront (Exit D)',
        highlight: 'Iconic Moshe Safdie lotus architecture & interactive living flora projections',
        sensoryFocus: 'Luminous light sculptures, meditative cascading audio waterwalls',
        category: 'thrills'
      },
      {
        id: 'day1-stop-4',
        time: '07:15 PM',
        duration: '1.5 Hours',
        title: 'Supertree Grove Sunset & Garden Rhapsody',
        neighborhood: 'Marina Bay',
        mrtTip: 'DT16 / TE22 via Dragonfly Bridge',
        highlight: 'Vertical garden light symphony and panoramic OCBC Skyway view',
        sensoryFocus: 'Night-blooming jasmine, cool sea wind, symphonic orchestral crescendos',
        category: 'nightlife',
        spotId: 'supertree-grove-marina-twilight'
      }
    ]
  },
  {
    dayNumber: 2,
    dayTitle: 'Day 02 · Colonial Spice Trails & Peranakan Heritage',
    theme: 'Straits Architecture, Spice Gardens & Michelin Hawkers',
    editorialBlurb: 'Delve into 200 years of botanical commerce and cultural synthesis, from Raffles’ initial spice trials to kaleidoscopic pastel shophouses and historic food stalls.',
    totalDistance: '6.2 km',
    estimatedWalkingMinutes: 70,
    transitSuggestion: 'Utilize the new Thomson-East Coast Line (TE19 to TE26) for seamless cross-island transit.',
    stops: [
      {
        id: 'day2-stop-1',
        time: '08:30 AM',
        duration: '2 Hours',
        title: 'Fort Canning Forbidden Hill & Ancient Spice Walk',
        neighborhood: 'Civic District',
        mrtTip: 'DT20 Fort Canning (Exit B)',
        highlight: 'Ancient royal terraces, 19th-century nutmeg groves, and the iconic Tree Tunnel',
        sensoryFocus: 'Bruised clove foliage, damp centuries-old brick, morning birdsong',
        category: 'heritage',
        spotId: 'fort-canning-spice-garden'
      },
      {
        id: 'day2-stop-2',
        time: '11:15 AM',
        duration: '1.5 Hours',
        title: 'Maxwell Food Centre Hainanese Heritage Feast',
        neighborhood: 'Chinatown',
        mrtTip: 'TE19 Maxwell (Exit 1)',
        highlight: 'Tian Tian Hainanese chicken rice, fragrant ginger chili, and sugarcane lime',
        sensoryFocus: 'Sizzling wok hei, roasted shallot steam, vintage ceramic bowls',
        category: 'hawker',
        spotId: 'singapore-gastronomy-trail'
      },
      {
        id: 'day2-stop-3',
        time: '02:00 PM',
        duration: '2.5 Hours',
        title: 'Joo Chiat Pastel Shophouses & Nonya Beadwork',
        neighborhood: 'Katong & Joo Chiat',
        mrtTip: 'TE26 Marine Parade (Exit 2)',
        highlight: 'Majolica ceramic tiles, Peranakan embroidery boutiques, and Chin Mee Chin bakery',
        sensoryFocus: 'Warm kaya toast, freshly roasted robusta kopi, vanilla pandan',
        category: 'heritage',
        spotId: 'joo-chiat-peranakan-shophouses'
      },
      {
        id: 'day2-stop-4',
        time: '06:30 PM',
        duration: '2 Hours',
        title: 'Atlas Bar Art Deco Cocktail Salon',
        neighborhood: 'Bugis & Kampong Gelam',
        mrtTip: 'DT14 Bugis (Exit F)',
        highlight: '15-meter gilded ceiling, 1,300 rare gins, and bespoke vintage martinis',
        sensoryFocus: 'Juniper botanicals, polished brass, crisp champagne bubbles',
        category: 'nightlife',
        spotId: 'atlas-grand-lobby-bar'
      }
    ]
  },
  {
    dayNumber: 3,
    dayTitle: 'Day 03 · UNESCO Orchids & Canopy Skywalks',
    theme: 'Equatorial Rainforests & Coastal Island Sanctuaries',
    editorialBlurb: 'Escape into pristine equatorial greenery at Singapore’s oldest botanical gardens, followed by elevated canopy boardwalks and sea air.',
    totalDistance: '5.5 km',
    estimatedWalkingMinutes: 65,
    transitSuggestion: 'Circle Line (CC19) to Botanic Gardens, then North-East Line (NE1) to HarbourFront.',
    stops: [
      {
        id: 'day3-stop-1',
        time: '08:00 AM',
        duration: '3 Hours',
        title: 'National Orchid Garden & Primary Rainforest Stroll',
        neighborhood: 'Tanglin & Orchard',
        mrtTip: 'CC19 Botanic Gardens (Exit A)',
        highlight: 'Over 3,000 orchid hybrids, colonial Burkill Hall, and majestic Tembusu trees',
        sensoryFocus: 'Sun-warmed damp leaves, delicate vanilla orchid nectar, cicada songs',
        category: 'nature',
        spotId: 'botanic-gardens-orchid-pavilion'
      },
      {
        id: 'day3-stop-2',
        time: '12:00 PM',
        duration: '1.5 Hours',
        title: 'Dempsey Hill Botanical Greenery Luncheon',
        neighborhood: 'Tanglin',
        mrtTip: 'Short 5 min shuttle or taxi from Botanic Gardens',
        highlight: 'Farm-to-table culinary creations set in conserved British military barracks',
        sensoryFocus: 'Fresh lemongrass infusions, woodfired flatbreads, jungle canopy shade',
        category: 'hawker'
      },
      {
        id: 'day3-stop-3',
        time: '03:30 PM',
        duration: '2.5 Hours',
        title: 'Sentosa Imbiah Coastal Ridge & Fort Siloso Skywalk',
        neighborhood: 'Sentosa',
        mrtTip: 'NE1 HarbourFront (Exit E)',
        highlight: 'Elevated canopy bridge 11 stories above coastal rainforest and coral bays',
        sensoryFocus: 'Maritime salt spray, breezy casuarina tree crowns, sunset sea horizon',
        category: 'thrills',
        spotId: 'sentosa-coastal-rainforest-trail'
      }
    ]
  }
];
