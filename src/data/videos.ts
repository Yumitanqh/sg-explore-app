export interface VideoEssay {
  id: string;
  title: string;
  creatorName: string;
  creatorHandle: string;
  creatorAvatar: string;
  thumbnail: string;
  duration: string;
  views: string;
  category: string;
  summary: string;
  embedUrl: string;
  keyTimestamps: { time: string; label: string }[];
}

export const VIDEO_ESSAYS: VideoEssay[] = [
  {
    id: 'gardens-by-the-bay-deep-dive',
    title: 'The Engineering of Eternity: Inside Singapore’s Cloud Mountain',
    creatorName: 'Julian Tan',
    creatorHandle: '@botanicalvoyage.sg',
    creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80',
    thumbnail: '/src/assets/images/cloud_forest_canopy_1794291675284.jpg',
    duration: '14:28',
    views: '184K views',
    category: 'Architecture & Botany',
    summary: 'A cinematic expedition exploring how British architectural vision and Singaporean horticulturists created the world’s largest column-free glass greenhouse.',
    embedUrl: 'https://www.youtube.com/embed/S_qs38iM43w',
    keyTimestamps: [
      { time: '01:15', label: 'Biomimicry & Shading Frits' },
      { time: '05:40', label: 'The 35m Mountain Microclimate' },
      { time: '09:20', label: 'Secret Epiphytes & Carnivorous Flora' },
      { time: '12:50', label: 'Supertree Exhaust Synergies' }
    ]
  },
  {
    id: 'peranakan-shophouse-architecture',
    title: 'Painted Stories: Decoding the Pastel Shophouses of Katong',
    creatorName: 'Evelyn Lee',
    creatorHandle: '@heritage.archives',
    creatorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80',
    thumbnail: '/src/assets/images/heritage_shophouses_1794291676090.jpg',
    duration: '11:45',
    views: '92K views',
    category: 'Heritage & Design',
    summary: 'Unpacking the hybrid architectural language of Chinese Baroque shophouses, French tiles, and Malay timber carvings in Joo Chiat.',
    embedUrl: 'https://www.youtube.com/embed/rRkJb4l1U9s',
    keyTimestamps: [
      { time: '00:45', label: '1920s Ceramic Tile Imports' },
      { time: '04:10', label: 'Five-Foot Ways & Tropical Rain Shelter' },
      { time: '07:35', label: 'Family Crests & Mythological Bas-Reliefs' }
    ]
  },
  {
    id: 'singapore-michelin-hawker-culture',
    title: 'Wok Hei & Morning Kopi: Singapore’s Intangible UNESCO Heritage',
    creatorName: 'Chef Marcus Khoo',
    creatorHandle: '@singapore.palate',
    creatorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80',
    thumbnail: '/src/assets/images/singapore_gastronomy_1794291676869.jpg',
    duration: '18:12',
    views: '320K views',
    category: 'Gastronomy & Culture',
    summary: 'From pre-dawn bone broths to generational spice pastes: a sensory document on Singapore’s beloved hawker masters.',
    embedUrl: 'https://www.youtube.com/embed/3vK59pLq6eE',
    keyTimestamps: [
      { time: '02:00', label: 'The Art of Hainanese Chicken Poaching' },
      { time: '06:45', label: 'Nanyang Robusta Kopi Roasting' },
      { time: '11:30', label: 'Laksa Rempah Pounding at Sunrise' },
      { time: '15:10', label: 'The Preservation of Hawker Stalls' }
    ]
  },
  {
    id: 'supertree-light-and-nightlife',
    title: 'Twilight Symphony: The Rhapsody of Marina Bay',
    creatorName: 'Clara Chia',
    creatorHandle: '@twilight.curator',
    creatorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80',
    thumbnail: '/src/assets/images/supertree_twilight_1794291676270.jpg',
    duration: '09:50',
    views: '145K views',
    category: 'Nightlife & Acoustics',
    summary: 'Behind the sound engineering and botanical lighting choreography that turns the Supertrees into a nightly symphonic theatre.',
    embedUrl: 'https://www.youtube.com/embed/5cZqK1_f5l4',
    keyTimestamps: [
      { time: '01:10', label: 'Orchestrating 68 Speakers in the Trees' },
      { time: '04:20', label: 'Color Theory in Tropical Foliage' },
      { time: '07:45', label: 'Best Acoustic Viewing Positions' }
    ]
  }
];
