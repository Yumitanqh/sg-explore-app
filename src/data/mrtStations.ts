export interface MrtFoodRec {
  name: string;
  dish: string;
  exit: string;
  priceTier: '$' | '$$' | '$$$';
  customerReview: string;
  rating: number;
}

export interface MrtDoRec {
  name: string;
  experience: string;
  exit: string;
  customerTip: string;
}

export interface MrtStationDetail {
  code: string;
  name: string;
  line: 'NS' | 'EW' | 'DT' | 'TE' | 'NE' | 'CC';
  lineName: string;
  lineColor: string;
  neighborhood: string;
  eatRecommendations: MrtFoodRec[];
  doRecommendations: MrtDoRec[];
  spotIdMatch?: string;
}

export const MRT_STATIONS_DATA: MrtStationDetail[] = [
  // ================= NORTH-SOUTH LINE (NS) =================
  {
    code: 'NS14',
    name: 'Khatib',
    line: 'NS',
    lineName: 'North-South Line',
    lineColor: '#D42E12',
    neighborhood: 'Khatib / Yishun South',
    spotIdMatch: 'khatib-chong-pang-market',
    eatRecommendations: [
      {
        name: 'Chong Pang Nasi Lemak',
        dish: 'Coconut Rice with Crispy Wings, Sambal Chilli & Sunny Egg ($4.50)',
        exit: 'Exit B · 8 min walk along Yishun Ave 2',
        priceTier: '$',
        customerReview: 'Best crispy chicken wings in northern Singapore. The skin stays glass-crisp and the sweet onion sambal is unmatched!',
        rating: 4.8
      },
      {
        name: '928 Yishun Laksa',
        dish: 'Thick Coconut Broth Laksa with Fresh Cockles & Tau Pok ($3.50)',
        exit: 'Exit B · 10 min stroll or Bus 858',
        priceTier: '$',
        customerReview: 'Worth the 25-minute queue. Rich dried shrimp coconut gravy with generous portions of cockles.',
        rating: 4.8
      },
      {
        name: 'Lu Zhou Braised Duck Rice',
        dish: 'Tender Herbal Braised Duck with Braised Tau Kwa & Egg ($4.50)',
        exit: 'Exit B · Chong Pang Food Centre',
        priceTier: '$',
        customerReview: 'The herbal duck gravy has simmered for decades with 20 secret spices. Incredible depth.',
        rating: 4.7
      }
    ],
    doRecommendations: [
      {
        name: 'Adventure HQ @ HomeTeamNS Khatib',
        experience: 'Singapore’s largest 2,800 sqm indoor adventure facility with 14m slides, artificial caving & rollercycle.',
        exit: 'Exit A · 5 min walk directly across Yishun Walk',
        customerTip: 'Wear covered sports shoes and comfortable athletic pants. Advance online booking recommended on weekends.'
      },
      {
        name: 'Lower Seletar Reservoir Park & Heritage Pier',
        experience: 'Scenic sunrise wooden pier over mirror-like waters, kayak rentals, and Family Bay water play.',
        exit: 'Exit A · 6 min peaceful walk along Yishun Ave 1',
        customerTip: 'Visit around 07:00 AM for sunrise mist over the reservoir or 18:00 PM for sunset photography.'
      }
    ]
  },
  {
    code: 'NS12',
    name: 'Canberra',
    line: 'NS',
    lineName: 'North-South Line',
    lineColor: '#D42E12',
    neighborhood: 'Canberra / Sembawang',
    spotIdMatch: 'bukit-canberra-hawker-centre',
    eatRecommendations: [
      {
        name: 'Bukit Canberra Hawker Centre (44 Stalls)',
        dish: 'Ah Huat Bak Kut Teh, Charcoal Hokkien Mee & Herbal Mutton Soup ($5-$7)',
        exit: 'Exit A · 7 min walk through sheltered linkway',
        priceTier: '$',
        customerReview: 'Super breezy high-ceiling dining hall. The herbal bak kut teh is peppery and comforting.',
        rating: 4.7
      },
      {
        name: 'Original Sembawang White Beehoon (Jalan Legundi)',
        dish: 'Signature Seafood White Beehoon simmered in rich egg gravy ($7-$12)',
        exit: 'Exit B · Bus 859 or 12 min walk',
        priceTier: '$$',
        customerReview: 'Rich seafood stock infused with wok hei, fresh squid and sweet prawns. Squeeze the fresh lime on top!',
        rating: 4.7
      }
    ],
    doRecommendations: [
      {
        name: 'Sembawang Hot Spring Park',
        experience: 'Singapore’s only natural geothermal hot spring featuring cascading tiered footbaths & egg-cooking stations.',
        exit: 'Exit B · 12 min walk along Gambas Ave',
        customerTip: 'Bring your own pail, small towel, and fresh eggs from Canberra Plaza supermarket to cook onsen eggs at 70°C.'
      },
      {
        name: 'Canberra Park & Swings Corridor',
        experience: 'Inclusive regional playground with aero-gliders, bell carousels, and the Canberra-Simpang Park Connector.',
        exit: 'Exit A · 5 min walk',
        customerTip: 'Perfect for an evening walk or rental bicycle ride linking north to Sembawang Beach.'
      }
    ]
  },
  {
    code: 'NS16',
    name: 'Ang Mo Kio',
    line: 'NS',
    lineName: 'North-South Line',
    lineColor: '#D42E12',
    neighborhood: 'Ang Mo Kio Central',
    eatRecommendations: [
      {
        name: 'AMK 724 Food Centre',
        dish: 'Xian Long Braised Duck & Xi Xiang Feng Fried Carrot Cake ($4.00)',
        exit: 'Exit B · Direct sheltered walkway',
        priceTier: '$',
        customerReview: 'Classic heartland hawker excellence. Crispy black carrot cake coated in rich sweet dark soy.',
        rating: 4.6
      },
      {
        name: 'Eng Ho Fried Hokkien Prawn Mee',
        dish: 'Wet style Hokkien mee with wild sea prawns and thin bee hoon ($5.00)',
        exit: 'Exit A · 8 min walk to Blk 409 AMK Ave 10',
        priceTier: '$',
        customerReview: 'The prawn broth is simmered for 6 hours. One of the best Hokkien mees in Central Singapore.',
        rating: 4.8
      }
    ],
    doRecommendations: [
      {
        name: 'Bishan-Ang Mo Kio Park & River Plains',
        experience: '62-hectare river valley park where a naturalized concrete canal now flows with otters and freshwater flora.',
        exit: 'Exit B · 10 min walk along AMK Ave 1',
        customerTip: 'Spot the famous Bishan otter family hunting near the lotus ponds around 08:30 AM.'
      }
    ]
  },
  {
    code: 'NS17',
    name: 'Bishan',
    line: 'NS',
    lineName: 'North-South Line (Interchange CC15)',
    lineColor: '#D42E12',
    neighborhood: 'Bishan Central',
    eatRecommendations: [
      {
        name: 'Ming Kee Chicken Rice (Kim San Leng)',
        dish: 'Chilled Hainanese Poached Chicken with jelly-like skin ($4.50)',
        exit: 'Exit D · 4 min walk to Blk 511',
        priceTier: '$',
        customerReview: 'They plunge the cooked chicken into ice water immediately, creating an amazing gelatinous layer under the skin!',
        rating: 4.8
      },
      {
        name: '284 Kway Chap',
        dish: 'Silky rice sheets with braised pork belly, intestines and preserved salted mustard ($6.00)',
        exit: 'Exit C · 6 min walk',
        priceTier: '$',
        customerReview: 'Opens till 2:30 AM! The cleanest and most tender braised offal in the heartlands.',
        rating: 4.7
      }
    ],
    doRecommendations: [
      {
        name: 'Bishan Harmony Park & Skate Facility',
        experience: 'Sprawling concrete bowl park with vibrant youth street culture, bouldering walls and tree-lined jogging loops.',
        exit: 'Exit B · 5 min walk',
        customerTip: 'Rent a city bicycle at Junction 8 to ride directly onto the Kallang River PCN all the way to Marina Bay.'
      }
    ]
  },
  {
    code: 'NS19',
    name: 'Toa Payoh',
    line: 'NS',
    lineName: 'North-South Line',
    lineColor: '#D42E12',
    neighborhood: 'Toa Payoh Heartland',
    spotIdMatch: 'toa-payoh-lorong-1-market',
    eatRecommendations: [
      {
        name: 'Chey Sua Carrot Cake (Michelin Bib Gourmand)',
        dish: 'Crisp Pan-Fried White Carrot Cake bound with beaten egg ($4.00)',
        exit: 'Exit C · 8 min walk to Blk 127 Lorong 1',
        priceTier: '$',
        customerReview: 'Frying sisters make each plate with utmost precision. Crisp on the outside, silky soft on the inside.',
        rating: 4.8
      },
      {
        name: 'Hougang 6 Miles Famous Muah Chee',
        dish: 'Warm hand-pulled glutinous rice dough tossed in fragrant ground peanuts and shallot oil ($3.50)',
        exit: 'Exit A · HDB Hub Gourmet Walk',
        priceTier: '$',
        customerReview: 'Fried shallot oil makes all the difference. Incredibly soft, bouncy, and aromatic.',
        rating: 4.7
      }
    ],
    doRecommendations: [
      {
        name: 'Toa Payoh Town Park & Heritage Observation Tower',
        experience: 'Iconic 1970s dragon playground era park featuring willow trees, stone bridges and a Brutalist lookout tower.',
        exit: 'Exit A · 4 min stroll across pedestrian link',
        customerTip: 'Great nostalgic photography spot showcasing early HDB town planning architecture.'
      }
    ]
  },
  {
    code: 'NS21',
    name: 'Newton',
    line: 'NS',
    lineName: 'North-South Line (Interchange DT11)',
    lineColor: '#D42E12',
    neighborhood: 'Newton / Scotts',
    eatRecommendations: [
      {
        name: 'Newton Food Centre (Famous Hawker Circus)',
        dish: 'BBQ Sambal Stingray, Cereal Prawns & Crispy Oyster Omelette ($12-$20)',
        exit: 'Exit B · 3 min walk via sheltered overhead bridge',
        priceTier: '$$',
        customerReview: 'As seen in Crazy Rich Asians. Stall 27 for satay and Stall 43 for smoky sambal stingray on banana leaf.',
        rating: 4.6
      }
    ],
    doRecommendations: [
      {
        name: 'Emerald Hill Architectural Walk',
        experience: 'Quiet stroll through Chinese Baroque shophouses, heritage bougainvillea, and conserved Straits Chinese mansions.',
        exit: 'Exit A · 12 min walk toward Somerset ridge',
        customerTip: 'Head down in late afternoon before dinner for gorgeous golden-hour facade photos.'
      }
    ]
  },
  {
    code: 'NS22',
    name: 'Orchard',
    line: 'NS',
    lineName: 'North-South Line (Interchange TE14)',
    lineColor: '#D42E12',
    neighborhood: 'Orchard Shopping Boulevard',
    eatRecommendations: [
      {
        name: 'Lucky Plaza Ayam Penyet President',
        dish: 'Smashed Crispy Fried Chicken with fiery Belacan Sambal & Fried Tofu ($7.90)',
        exit: 'Exit D · 3 min walk to Lucky Plaza #03-36',
        priceTier: '$',
        customerReview: 'The crispy batter crumbs and explosive chili will make you sweat in the best way.',
        rating: 4.7
      },
      {
        name: 'Orchard Road Traditional Ice Cream Uncle',
        dish: 'Block ice cream in sweet rainbow bread or crispy wafers (Mint Chip, Yam, Mango) ($1.50)',
        exit: 'Exit D · Pedestrian walkway outside Ngee Ann City',
        priceTier: '$',
        customerReview: 'An iconic Singapore street rite of passage. Refreshing on a hot tropical afternoon.',
        rating: 4.8
      }
    ],
    doRecommendations: [
      {
        name: 'Design Orchard Rooftop Garden & Local Curator Hub',
        experience: 'Discover 100+ home-grown Singaporean designers, artisan fragrances, and open-air terraced timber amphitheater.',
        exit: 'Exit C · 6 min walk',
        customerTip: 'Free public rooftop amphitheater with great views over Orchard boulevard.'
      }
    ]
  },

  // ================= EAST-WEST LINE (EW) =================
  {
    code: 'EW5',
    name: 'Bedok',
    line: 'EW',
    lineName: 'East-West Line',
    lineColor: '#009645',
    neighborhood: 'Bedok Central & 85 Fengshan',
    spotIdMatch: 'bedok-85-fengshan-market',
    eatRecommendations: [
      {
        name: 'Xing Ji Rou Cuo Mian (Bedok 85)',
        dish: 'Soupy Bak Chor Mee with roasted sole fish broth & tender meatballs ($5.00)',
        exit: 'Exit B · Bus 222 (4 stops) to Blk 85',
        priceTier: '$',
        customerReview: 'Unmatched soupy style bak chor mee. Broth simmered with flat sole fish and pork bones till cloudy and sweet.',
        rating: 4.9
      },
      {
        name: 'Bedok Chwee Kueh (Michelin Bib Gourmand)',
        dish: 'Steamed rice flour cakes heaped with sweet-savory chai poh & chili ($2.50 for 4 pcs)',
        exit: 'Exit B · Bedok Interchange Hawker Centre #01-19',
        priceTier: '$',
        customerReview: 'Best chai poh on the island! Generous toppings, hot and tender rice cakes that melt in your mouth.',
        rating: 4.8
      },
      {
        name: 'Percolate Coffee & Bakes',
        dish: 'Artisanal Single-Origin Filter Coffee & Curry Egg Mayo Croissant ($6-$9)',
        exit: 'Exit A · 8 min stroll through Town Square to Blk 136',
        priceTier: '$$',
        customerReview: 'A pioneer of heartland third-wave coffee. Cozy Scandinavian timber interior beneath HDB flats.',
        rating: 4.8
      }
    ],
    doRecommendations: [
      {
        name: 'Bedok Reservoir Floating Timber Boardwalk',
        experience: '4.3km scenic waterfront loop with dragon boat viewing, floating timber observation decks, and water sports.',
        exit: 'Exit B · Bus 69 or 12 min walk toward Bedok Reservoir Rd',
        customerTip: 'Head out onto the floating pier around 18:30 PM for spectacular sunset reflections.'
      },
      {
        name: 'Heartbeat@Bedok Integrated Lifestyle Hub',
        experience: 'Award-winning community hub with sheltered swimming complexes, library, and active sports courts.',
        exit: 'Exit B · 4 min sheltered walk',
        customerTip: 'Visit the open atrium for weekend community exhibitions and farmers markets.'
      }
    ]
  },
  {
    code: 'EW2',
    name: 'Tampines',
    line: 'EW',
    lineName: 'East-West Line (Interchange DT32)',
    lineColor: '#009645',
    neighborhood: 'Tampines Regional Centre',
    eatRecommendations: [
      {
        name: 'Tampines Round Market & Food Centre (Blk 137)',
        dish: 'Song Han Carrot Cake (curry powder style) & Xing Ji Wanton Mee ($4.00)',
        exit: 'Exit B · 8 min walk to famous circular market',
        priceTier: '$',
        customerReview: 'The circular architecture is unique and the black carrot cake with curry powder is iconic.',
        rating: 4.7
      },
      {
        name: 'Al-Azhar Restaurant (24-Hour Supper)',
        dish: 'Roti Prata with Mutton Curry, Murtabak & Teh Tarik ($3-$8)',
        exit: 'Exit A · 5 min walk',
        priceTier: '$',
        customerReview: 'Crispy coin prata and butter chicken made fresh 24 hours a day.',
        rating: 4.6
      }
    ],
    doRecommendations: [
      {
        name: 'Our Tampines Hub (Singapore’s Largest Community Hub)',
        experience: 'FIFA-grade stadium, 5 rooftop swimming pools, 24/7 community spaces, and eco-sustainability rooftop gardens.',
        exit: 'Exit D · 5 min sheltered walk',
        customerTip: 'Catch free weekend evening movies on the giant stadium screen from the bleachers.'
      }
    ]
  },
  {
    code: 'EW12',
    name: 'Bugis',
    line: 'EW',
    lineName: 'East-West Line (Interchange DT14)',
    lineColor: '#009645',
    neighborhood: 'Bugis & Kampong Gelam',
    eatRecommendations: [
      {
        name: 'Hjh Maimunah Restaurant (Michelin Bib Gourmand)',
        dish: 'Nasi Padang with Siput Sedut, Beef Rendang & Sambal Goreng Pengantin ($8-$14)',
        exit: 'Exit B · 6 min walk to Jalan Pisang',
        priceTier: '$$',
        customerReview: 'Traditional Malay cooking at its pinnacle. The beef rendang is slow-braised to melting tenderness.',
        rating: 4.8
      },
      {
        name: 'Albert Centre Market & Food Centre',
        dish: 'Bai Nian Niang Dou Fu (Hakka Yong Tau Foo) & Traditional Dessert Tau Huay ($4-$6)',
        exit: 'Exit C · 4 min walk',
        priceTier: '$',
        customerReview: 'Crispy prawn paste rolls and springy fish noodles in clear, sweet anchovy broth.',
        rating: 4.7
      }
    ],
    doRecommendations: [
      {
        name: 'Sultan Mosque & Arab Street Textile Shophouses',
        experience: 'Majestic golden-domed Sultan Mosque framed by palm trees, artisan perfume shops, and vibrant street murals on Haji Lane.',
        exit: 'Exit B · 7 min walk',
        customerTip: 'Look closely at the base of the gold domes—they are made from glass soy sauce bottles donated by poor devotees.'
      }
    ]
  },
  {
    code: 'EW17',
    name: 'Tiong Bahru',
    line: 'EW',
    lineName: 'East-West Line',
    lineColor: '#009645',
    neighborhood: 'Tiong Bahru Art Deco Enclave',
    spotIdMatch: 'tiong-bahru-bakery-heritage',
    eatRecommendations: [
      {
        name: 'Tiong Bahru Market & Food Centre',
        dish: 'Jian Bo Shui Kueh (Chwee Kueh with toasted sesame chai poh) & Lor Mee ($3-$5)',
        exit: 'Exit B · 7 min walk to 30 Seng Poh Rd',
        priceTier: '$',
        customerReview: 'The original Michelin-recognized chwee kueh stall since 1950. Smooth rice cakes, irresistible fragrant radish.',
        rating: 4.8
      },
      {
        name: 'Tiong Bahru Bakery Flagship',
        dish: 'Original Kouign-Amann with caramelized butter glaze & Almond Croissants ($5-$7)',
        exit: 'Exit B · 8 min stroll down Eng Hoon St',
        priceTier: '$$',
        customerReview: 'The benchmark kouign-amann in Singapore. Multi-layered, flaky, with perfectly salted caramel crunch.',
        rating: 4.7
      }
    ],
    doRecommendations: [
      {
        name: '1930s Streamline Moderne Architecture Trail',
        experience: 'Wander curved balconies, porthole windows, spiral staircases, and air-raid shelter heritage blocks.',
        exit: 'Exit B · Entire Seng Poh & Yong Siak enclave',
        customerTip: 'Visit Woods in the Books on Yong Siak Street for indie graphic novels and local literature.'
      }
    ]
  },
  {
    code: 'EW23',
    name: 'Clementi',
    line: 'EW',
    lineName: 'East-West Line',
    lineColor: '#009645',
    neighborhood: 'Clementi Heartland',
    eatRecommendations: [
      {
        name: 'Clementi 448 Market & Food Centre',
        dish: 'Fried Fish Soup, Boon Kee Duck Rice & Chai Ho Satay ($4-$7)',
        exit: 'Exit A · Direct link next to station',
        priceTier: '$',
        customerReview: 'Chai Ho Satay pork skewers with peanut pineapple sauce for only 50 cents each. Incredible value.',
        rating: 4.7
      }
    ],
    doRecommendations: [
      {
        name: 'Old Jurong Railway Line Dismantled Track Walk',
        experience: 'Historic abandoned railway track through lush secondary jungle, wooden sleepers, and rustic steel bridges.',
        exit: 'Exit B · 12 min walk toward Sunset Way',
        customerTip: 'Wear trail shoes; bring mosquito repellent for this rustic heritage walk.'
      }
    ]
  },

  // ================= DOWNTOWN LINE (DT) =================
  {
    code: 'DT19',
    name: 'Chinatown',
    line: 'DT',
    lineName: 'Downtown Line (Interchange NE4)',
    lineColor: '#005EC4',
    neighborhood: 'Chinatown Historic District',
    spotIdMatch: 'chinatown-complex-liao-fan',
    eatRecommendations: [
      {
        name: 'Chinatown Complex Food Centre (Singapore’s Largest Hawker Hall)',
        dish: 'Liao Fan Soya Sauce Chicken Rice, Zhong Guo La Mian Xiao Long Bao ($4-$8)',
        exit: 'Exit A · 3 min walk to 335 Smith Street',
        priceTier: '$',
        customerReview: 'Over 220 stalls. The xiao long bao are pleated fresh and burst with ginger-pork broth.',
        rating: 4.8
      },
      {
        name: 'Tong Heng Traditional Cantonese Pastries',
        dish: 'Diamond-shaped warm Egg Tarts with wobbly egg custard & flaky crust ($2.40)',
        exit: 'Exit A · 5 min walk to 285 South Bridge Rd',
        priceTier: '$',
        customerReview: 'World-class pastry crust with light, silky, custard that isn’t overly sweet. A century of baking mastery.',
        rating: 4.8
      }
    ],
    doRecommendations: [
      {
        name: 'Buddha Tooth Relic Temple & Museum',
        experience: 'Tang Dynasty-style architectural marvel housing sacred Buddhist relics and quiet rooftop orchid pagoda.',
        exit: 'Exit A · 4 min walk',
        customerTip: 'Cover shoulders and knees upon entering (free shawls provided at temple gate).'
      }
    ]
  },
  {
    code: 'DT16',
    name: 'Bayfront',
    line: 'DT',
    lineName: 'Downtown Line (Interchange CC34)',
    lineColor: '#005EC4',
    neighborhood: 'Marina Bay Waterfront',
    spotIdMatch: 'cloud-forest-flower-dome',
    eatRecommendations: [
      {
        name: 'Satay by the Bay',
        dish: 'Mixed Chicken, Mutton & Beef Satay with peanut gravy & rice cakes ($0.90/stick)',
        exit: 'Exit B · 10 min scenic walk through Gardens',
        priceTier: '$$',
        customerReview: 'Outdoor waterfront dining surrounded by giant rain trees and sea breezes.',
        rating: 4.5
      }
    ],
    doRecommendations: [
      {
        name: 'Cloud Forest & Supertree Observatory',
        experience: '35m indoor mountain waterfall, mist shrouded epiphytic orchids, and twilight Supertree light show.',
        exit: 'Exit B · Direct underground link to Gardens by the Bay',
        customerTip: 'Catch Garden Rhapsody light & sound show at Supertree Grove daily at 19:45 and 20:45 (free admission).'
      }
    ]
  },
  {
    code: 'DT9',
    name: 'Botanic Gardens',
    line: 'DT',
    lineName: 'Downtown Line (Interchange CC19)',
    lineColor: '#005EC4',
    neighborhood: 'Bukit Timah / Tanglin',
    spotIdMatch: 'singapore-botanic-gardens-heritage',
    eatRecommendations: [
      {
        name: 'Adam Food Centre',
        dish: 'Selera Rasa Nasi Lemak (Royal Basmati Rice & Otah) & Bahrakath Mutton Soup ($4-$8)',
        exit: 'Exit A · 3 min walk across pedestrian overhead bridge',
        priceTier: '$',
        customerReview: 'Fluffy basmati rice cooked with coconut milk and pandan leaves. Sultan of Brunei’s favorite nasi lemak.',
        rating: 4.8
      }
    ],
    doRecommendations: [
      {
        name: 'Singapore Botanic Gardens (UNESCO World Heritage Site)',
        experience: '165-year-old tropical botanical garden, National Orchid Garden with 3,000+ species, and primary rainforest trail.',
        exit: 'Exit A · Station exits directly into the Eco Lake gate',
        customerTip: 'Early morning (07:00-09:00 AM) offers cool breezes, black swans on Eco Lake, and free entry to main grounds.'
      }
    ]
  },
  {
    code: 'DT18',
    name: 'Telok Ayer',
    line: 'DT',
    lineName: 'Downtown Line',
    lineColor: '#005EC4',
    neighborhood: 'Telok Ayer Heritage Street',
    eatRecommendations: [
      {
        name: 'Amoy Street Food Centre',
        dish: 'A Noodle Story (Singapore-style Ramen), J2 Crispy Curry Puff ($3-$9)',
        exit: 'Exit A · 2 min walk to 7 Maxwell Rd',
        priceTier: '$',
        customerReview: 'J2 Curry Puff has thousand-layer flaky pastry made fresh right in front of you. Unbelievable curry potato filling.',
        rating: 4.8
      }
    ],
    doRecommendations: [
      {
        name: 'Thian Hock Keng Temple (Singapore’s Oldest Hokkien Temple)',
        experience: '1840 architectural jewel built without a single nail by early maritime Chinese immigrants.',
        exit: 'Exit A · 3 min walk down Telok Ayer St',
        customerTip: 'Look up at the intricate swallowtail roofs and dragon carvings gilded in real gold leaf.'
      }
    ]
  },

  // ================= THOMSON-EAST COAST LINE (TE) =================
  {
    code: 'TE18',
    name: 'Maxwell',
    line: 'TE',
    lineName: 'Thomson-East Coast Line',
    lineColor: '#9D5B25',
    neighborhood: 'Tanjong Pagar / Chinatown',
    eatRecommendations: [
      {
        name: 'Maxwell Food Centre',
        dish: 'Tian Tian Hainanese Chicken Rice, Zhen Zhen Porridge & Fuzhou Oyster Cake ($4-$8)',
        exit: 'Exit 2 · Directly outside station exit',
        priceTier: '$',
        customerReview: 'Tian Tian chicken is poached to silky perfection. Fragrant garlic-chicken broth rice that you can eat on its own.',
        rating: 4.8
      }
    ],
    doRecommendations: [
      {
        name: 'Singapore City Gallery (URA)',
        experience: 'Fascinating 3D scale model of the entire island of Singapore detailing architectural transformation.',
        exit: 'Exit 1 · 2 min walk',
        customerTip: 'Free entry. The interactive spatial city model is captivating for adults and kids alike.'
      }
    ]
  },
  {
    code: 'TE8',
    name: 'Upper Thomson',
    line: 'TE',
    lineName: 'Thomson-East Coast Line',
    lineColor: '#9D5B25',
    neighborhood: 'Upper Thomson Food & Nature Strip',
    eatRecommendations: [
      {
        name: 'The Roti Prata House (Famous Crispy Prata)',
        dish: 'Coin Prata, Cheese & Mushroom Prata with spicy fish curry ($2.50-$6.00)',
        exit: 'Exit 4 · 4 min walk down Upper Thomson Rd',
        priceTier: '$',
        customerReview: 'The crispiest prata in Singapore. Fluffy inside with shattering layers that dip perfectly into fish curry.',
        rating: 4.7
      },
      {
        name: 'Nam Kee Pau',
        dish: 'Handmade giant steamed Big Pau filled with juicy pork and egg ($2.20)',
        exit: 'Exit 3 · 2 min walk',
        priceTier: '$',
        customerReview: 'Tender fluffy bun skin with savory meat broth inside.',
        rating: 4.6
      }
    ],
    doRecommendations: [
      {
        name: 'MacRitchie Reservoir & TreeTop Walk',
        experience: '250m freestanding suspension bridge through the tropical rainforest canopy, wild macaques, and freshwater lakes.',
        exit: 'Exit 1 · Bus 165/166 or 12 min walk to MacRitchie entrance',
        customerTip: 'Start before 08:30 AM to beat midday sun and bring 1.5L of water for the TreeTop Walk loop.'
      }
    ]
  },
  {
    code: 'TE26',
    name: 'Marine Parade',
    line: 'TE',
    lineName: 'Thomson-East Coast Line',
    lineColor: '#9D5B25',
    neighborhood: 'Marine Parade & Katong',
    spotIdMatch: 'joo-chiat-peranakan-shophouses',
    eatRecommendations: [
      {
        name: '328 Katong Laksa',
        dish: 'Spoon-only spicy coconut laksa with thick bee hoon, prawns & cockles ($7.00)',
        exit: 'Exit 1 · 6 min walk to East Coast Rd',
        priceTier: '$',
        customerReview: 'Noodles are pre-cut so you only need a soup spoon. Rich lemongrass coconut gravy with chili sambal.',
        rating: 4.7
      },
      {
        name: 'Chin Mee Chin Confectionery',
        dish: 'Traditional charcoal-toasted round buns with kaya, cold slab butter & soft boiled eggs ($4.50)',
        exit: 'Exit 1 · 8 min stroll down Chapel Rd',
        priceTier: '$',
        customerReview: 'Old school Hainanese bakery with marble tables and fresh egg tarts since 1925.',
        rating: 4.7
      }
    ],
    doRecommendations: [
      {
        name: 'Joo Chiat Pastel Peranakan Shophouses',
        experience: 'Historic ceramic tiled terrace shophouses featuring pastel pink, turquoise, and glazed floral motif facades.',
        exit: 'Exit 1 · 8 min walk down Koon Seng Rd',
        customerTip: 'Best photo lighting is between 09:00 - 11:00 AM when the morning sun illuminates the ceramic tiles.'
      }
    ]
  },

  // ================= NORTH EAST LINE (NE) =================
  {
    code: 'NE1',
    name: 'HarbourFront',
    line: 'NE',
    lineName: 'North East Line (Interchange CC29)',
    lineColor: '#800080',
    neighborhood: 'HarbourFront & Sentosa Gateway',
    eatRecommendations: [
      {
        name: 'Seah Im Food Centre',
        dish: 'Cactus Curry Rice, Dalat Vietnamese Pho & Shi Ji Duck Rice ($4-$7)',
        exit: 'Exit A · 2 min walk across bus interchange',
        priceTier: '$',
        customerReview: 'Massive portions at heartland prices right at the foot of Mount Faber. The crispy pork curry rice is legendary.',
        rating: 4.7
      }
    ],
    doRecommendations: [
      {
        name: 'Mount Faber & Henderson Waves Canopy Walk',
        experience: 'Singapore’s highest pedestrian bridge at 36m above Henderson Road with sculpted wave timber ribs.',
        exit: 'Exit D · Marang Trail staircase climb up Mount Faber',
        customerTip: 'The bridge is illuminated with LED lights from 19:00 to 02:00 daily—magical night skyline view.'
      }
    ]
  },
  {
    code: 'NE7',
    name: 'Little India',
    line: 'NE',
    lineName: 'North East Line (Interchange DT12)',
    lineColor: '#800080',
    neighborhood: 'Little India Historic Enclave',
    eatRecommendations: [
      {
        name: 'Tekka Centre Market & Food Hall',
        dish: 'Allauddin’s Briyani (Mutton Briyani) & Sri Tiffin Stall Crispy Dosai ($4-$8)',
        exit: 'Exit C · Direct sheltered escalator',
        priceTier: '$',
        customerReview: 'Allauddin’s mutton is falling-off-the-bone tender. Served with spicy dhal, hard-boiled egg and cucumber acar.',
        rating: 4.8
      }
    ],
    doRecommendations: [
      {
        name: 'Tan Teng Niah Colorful Villa & Spice Streets',
        experience: 'Last surviving Chinese villa in Little India with 8 rainbow colors, jasmine garland sellers, and temple bells.',
        exit: 'Exit E · 3 min walk to Kerbau Rd',
        customerTip: 'Stop by the traditional garland makers on Campbell Lane for sweet jasmine and marigold scents.'
      }
    ]
  },
  {
    code: 'NE13',
    name: 'Kovan',
    line: 'NE',
    lineName: 'North East Line',
    lineColor: '#800080',
    neighborhood: 'Kovan / Hougang',
    eatRecommendations: [
      {
        name: 'Kovan 209 Market & Food Centre',
        dish: 'Fa Ji Minced Meat Noodles & Yi Liu Xiang Nasi Lemak ($4-$5)',
        exit: 'Exit C · 3 min walk',
        priceTier: '$',
        customerReview: 'Huge portions of springy noodles with braised mushrooms and crispy lard cubes.',
        rating: 4.7
      },
      {
        name: 'Punggol Nasi Lemak (Upper Serangoon)',
        dish: 'Signature Crispy Chicken Wings, spicy Otah & deep fried long beans ($6-$9)',
        exit: 'Exit B · 6 min walk',
        priceTier: '$$',
        customerReview: 'Crispy wings seasoned with garlic ginger batter. Very clean, air-conditioned dining.',
        rating: 4.6
      }
    ],
    doRecommendations: [
      {
        name: 'Hougang Heritage Shophouse & River Connector',
        experience: 'Stroll along the historic Sungei Serangoon canal to Punggol Park with scenic cycling paths.',
        exit: 'Exit B · 10 min walk',
        customerTip: 'Rent a bicycle to cycle from Kovan all the way to Coney Island along the park connector network.'
      }
    ]
  },

  // ================= CIRCLE LINE (CC) =================
  {
    code: 'CC8',
    name: 'Dakota',
    line: 'CC',
    lineName: 'Circle Line',
    lineColor: '#FA9E0D',
    neighborhood: 'Old Airport Road / Kallang',
    spotIdMatch: 'old-airport-road-food-centre',
    eatRecommendations: [
      {
        name: 'Old Airport Road Food Centre (Premier Hawker Mecca)',
        dish: 'Lao Fu Zi Fried Kway Teow, Nam Sing Hokkien Mee & Toa Payoh Rojak ($4-$8)',
        exit: 'Exit B · 4 min walk along Old Airport Rd',
        priceTier: '$',
        customerReview: 'The gold standard of hawker food centres. Nam Sing thin bee hoon soaked in intense crustacean stock is unmatched.',
        rating: 4.9
      }
    ],
    doRecommendations: [
      {
        name: 'Dakota Crescent Conserved Heritage Estate',
        experience: 'One of Singapore’s oldest public housing estates (1958) featuring modernist curved staircases and classic dove playground.',
        exit: 'Exit A · 2 min walk',
        customerTip: 'A peaceful, leafy step back in time. Great for quiet architectural photography.'
      }
    ]
  },
  {
    code: 'CC21',
    name: 'Holland Village',
    line: 'CC',
    lineName: 'Circle Line',
    lineColor: '#FA9E0D',
    neighborhood: 'Holland Village Lifestyle Precinct',
    eatRecommendations: [
      {
        name: 'Holland Village Market & Food Centre',
        dish: 'Holland V Fried Rice, Lor Mee & 363 Katong Laksa ($4-$7)',
        exit: 'Exit B · 2 min walk',
        priceTier: '$',
        customerReview: 'Great mix of affordable heartland hawker breakfasts and trendy craft beer evening spots.',
        rating: 4.6
      }
    ],
    doRecommendations: [
      {
        name: 'Lorong Mambong Evening Al-Fresco Street',
        experience: 'Pedestrianized evening street lined with open-air cafes, wine bars, live acoustic music, and dessert parlors.',
        exit: 'Exit A · 2 min walk',
        customerTip: 'Visit 2am:dessertbar by Janice Wong for innovative modern chocolate artistry and dessert pairings.'
      }
    ]
  }
];

export const MRT_LINES = [
  { id: 'all', label: 'All MRT Lines' },
  { id: 'NS', label: 'North-South Line (Red)', color: '#D42E12' },
  { id: 'EW', label: 'East-West Line (Green)', color: '#009645' },
  { id: 'DT', label: 'Downtown Line (Blue)', color: '#005EC4' },
  { id: 'TE', label: 'Thomson-East Coast (Brown)', color: '#9D5B25' },
  { id: 'NE', label: 'North East Line (Purple)', color: '#800080' },
  { id: 'CC', label: 'Circle Line (Orange)', color: '#FA9E0D' }
] as const;
