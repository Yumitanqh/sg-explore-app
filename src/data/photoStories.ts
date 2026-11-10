export interface PhotoItem {
  url: string;
  caption: string;
  location: string;
  tag: string;
}

export interface CuratedReview {
  author: string;
  avatar?: string;
  rating: number;
  date: string;
  quote: string;
  verifiedTip: string;
  dishOrActivity: string;
}

export interface PhotoStory {
  id: string;
  title: string;
  neighborhood: string;
  activityOrTheme: string;
  photographer: string;
  coverImage: string;
  gallery: PhotoItem[];
  summary: string;
  spotId: string;
  reviews: CuratedReview[];
}

export const PHOTO_STORIES: PhotoStory[] = [
  {
    id: 'khatib-chong-pang-story',
    title: 'The Sizzle of Chong Pang: Nightlife in the Northern Heartland',
    neighborhood: 'Khatib',
    activityOrTheme: 'Midnight Supper & Heritage Nasi Lemak',
    photographer: 'Darren Teo · Singapore Street Lens',
    coverImage: '/src/assets/images/singapore_gastronomy_1794291676869.jpg',
    spotId: 'khatib-chong-pang-market',
    summary: 'From 5 PM till 2 AM, the neon lights of Chong Pang draw hundreds from Khatib MRT for steaming coconut rice, golden chicken wings, and Lu Zhou herbal duck broth.',
    gallery: [
      {
        url: '/src/assets/images/singapore_gastronomy_1794291676869.jpg',
        caption: 'Freshly fried chicken wings glazed with turmeric and garlic at Chong Pang Nasi Lemak.',
        location: 'Chong Pang Food Centre, Khatib',
        tag: 'Gastronomy'
      },
      {
        url: '/src/assets/images/heritage_shophouses_1794291676090.jpg',
        caption: 'Generational diners gathering under the high open-air ceiling fans as evening arrives.',
        location: 'Yishun Ring Road Promenade',
        tag: 'Atmosphere'
      },
      {
        url: '/src/assets/images/cloud_forest_canopy_1794291675284.jpg',
        caption: 'The nearby serene water trails of Lower Seletar Reservoir just two bus stops away.',
        location: 'Lower Seletar Heritage Pier, Khatib',
        tag: 'Activities'
      }
    ],
    reviews: [
      {
        author: 'Daryl Goh (Local Khatib Resident)',
        rating: 5,
        date: '2 days ago',
        quote: 'The chicken wings are iconic. Crispy skin with zero greasiness, and the sweet onion sambal is addictive.',
        verifiedTip: 'Ask for half-and-half chili if you like extra heat on your otah.',
        dishOrActivity: 'Chong Pang Nasi Lemak with 2 Wings'
      },
      {
        author: 'Cheryl Wee',
        rating: 5,
        date: 'Last weekend',
        quote: 'Lu Zhou duck rice has the best herbal gravy in northern Singapore. The duck meat is braised so tender it falls off the bone.',
        verifiedTip: 'Arrive before 12:30 PM for lunch duck rice before the set runs out.',
        dishOrActivity: 'Lu Zhou Braised Duck Rice'
      }
    ]
  },
  {
    id: 'canberra-hot-springs-story',
    title: 'Steam & Cascades: The Geothermal Rituals of Canberra',
    neighborhood: 'Canberra',
    activityOrTheme: 'Natural Mineral Baths & Egg Cooking',
    photographer: 'Evelyn Lin · Heritage Documentation',
    coverImage: '/src/assets/images/cloud_forest_canopy_1794291675284.jpg',
    spotId: 'sembawang-hot-spring-canberra',
    summary: 'A tranquil rustic haven near Canberra MRT where 70°C subterranean geothermal mineral water flows into tiered footbaths and public onsen egg cooking stations.',
    gallery: [
      {
        url: '/src/assets/images/cloud_forest_canopy_1794291675284.jpg',
        caption: 'The tiered cascading footbath where spring water cools to a soothing 40°C among ginger plants.',
        location: 'Sembawang Hot Spring Park, Canberra',
        tag: 'Wellness & Nature'
      },
      {
        url: '/src/assets/images/heritage_shophouses_1794291676090.jpg',
        caption: 'The egg-cooking collection station where locals boil fresh eggs in wooden buckets.',
        location: 'Central Geothermal Wellhead',
        tag: 'Activities'
      },
      {
        url: '/src/assets/images/singapore_gastronomy_1794291676869.jpg',
        caption: 'The original Jalan Legundi White Restaurant white beehoon, an easy 8-minute walk from Canberra MRT.',
        location: 'Jalan Legundi, Canberra',
        tag: 'Gastronomy'
      }
    ],
    reviews: [
      {
        author: 'Vivian & Jason',
        rating: 5,
        date: '3 days ago',
        quote: 'Soaking your feet in the warm mineral water at 7:30 AM with the morning breeze is pure therapy.',
        verifiedTip: 'Bring your own wooden pail and eggs from Canberra Plaza supermarket. 11 minutes gives the perfect runny yolk.',
        dishOrActivity: 'Thermal Foot Soak & Onsen Egg Breakfast'
      },
      {
        author: 'Marcus Teo',
        rating: 5,
        date: '1 week ago',
        quote: 'Combine the hot spring visit with lunch at Bukit Canberra Hawker Centre—it’s just down the road and super breezy.',
        verifiedTip: 'Try Pang’s Hakka Noodles at Bukit Canberra afterwards.',
        dishOrActivity: 'Canberra Morning Exploration Trail'
      }
    ]
  },
  {
    id: 'bedok-85-supper-story',
    title: 'Midnight in Bedok: The Legend of Soupy Bak Chor Mee',
    neighborhood: 'Bedok',
    activityOrTheme: 'Eastern Supper Feasts & Hawker Culture',
    photographer: 'Marcus Khoo · Gastronomic Chronicles',
    coverImage: '/src/assets/images/singapore_gastronomy_1794291676869.jpg',
    spotId: 'bedok-85-fengshan-market',
    summary: 'Bedok 85 pioneered Singapore’s soupy bak chor mee. Join hundreds of supper-goers as clattering porcelain spoons and sizzling sambal stingray light up the night.',
    gallery: [
      {
        url: '/src/assets/images/singapore_gastronomy_1794291676869.jpg',
        caption: 'Xing Ji’s steaming bowl of minced pork soup noodles loaded with crispy lard cubes.',
        location: 'Bedok 85 Fengshan Market',
        tag: 'Gastronomy'
      },
      {
        url: '/src/assets/images/heritage_shophouses_1794291676090.jpg',
        caption: 'The vibrant outdoor dining square under the stars as supper hours peak.',
        location: 'Bedok North Avenue 4',
        tag: 'Atmosphere'
      },
      {
        url: '/src/assets/images/cloud_forest_canopy_1794291675284.jpg',
        caption: 'Bedok Reservoir’s peaceful morning waters, the perfect post-supper weekend stroll.',
        location: 'Bedok Reservoir Park',
        tag: 'Activities'
      }
    ],
    reviews: [
      {
        author: 'Melvin Chew (KF Seetoh Food Guide)',
        rating: 5,
        date: '4 days ago',
        quote: 'The pork bone broth is simmered for hours until it turns cloudy and rich. The pork meatballs are hand-rolled and springy.',
        verifiedTip: 'Order a plate of Chan BBQ sambal stingray to share while waiting for the noodles.',
        dishOrActivity: 'Bak Chor Mee Soup + Sambal Stingray'
      },
      {
        author: 'Rachel Tan',
        rating: 5,
        date: 'Last week',
        quote: 'A must-visit for anyone who loves authentic Singapore supper culture. The atmosphere is electric!',
        verifiedTip: 'Visit between 9 PM and 11 PM for prime vibrant atmosphere.',
        dishOrActivity: 'Bedok 85 Night Supper'
      }
    ]
  },
  {
    id: 'cloud-forest-biodome-story',
    title: 'The Mountain in Glass: Flora of the Misty Canopy',
    neighborhood: 'Marina Bay',
    activityOrTheme: 'Botanical Conservation & Epiphytic Gardens',
    photographer: 'Julian Tan · Architectural Botany',
    coverImage: '/src/assets/images/cloud_forest_canopy_1794291675284.jpg',
    spotId: 'cloud-forest-flower-dome',
    summary: 'Step inside the misty 35-meter mountain replicating equatorial highland biomes, cloaked in over 70,000 carnivorous pitcher plants, ferns, and rare orchids.',
    gallery: [
      {
        url: '/src/assets/images/cloud_forest_canopy_1794291675284.jpg',
        caption: 'The dramatic cascading waterfall and suspended Cloud Walk walkway enveloped in mist.',
        location: 'Cloud Forest Dome, Marina Bay',
        tag: 'Canopy Walk'
      },
      {
        url: '/src/assets/images/supertree_twilight_1794291676270.jpg',
        caption: 'Twilight over Supertree Grove as the evening light symphony begins.',
        location: 'Gardens by the Bay',
        tag: 'Sunset View'
      }
    ],
    reviews: [
      {
        author: 'Dr. Catherine Ross',
        rating: 5,
        date: '2 days ago',
        quote: 'The misting sequence is breathtaking. The temperature drops to a crisp 23°C and you feel transported to a high-altitude cloud mountain.',
        verifiedTip: 'Time your arrival for 10 AM, 12 PM, or 4 PM to witness the full misting sequence.',
        dishOrActivity: 'Highland Cloud Walk'
      }
    ]
  }
];
