import { Guide, createGuide, createDayPlan, createPlanItem } from '@travel-app/domain';

// Create mock day plans for Barcelona
const barcelonaDayPlans = [
  createDayPlan(0, [
    createPlanItem('Sagrada Familia', 'place123', '10:00', '12:00', 'Bring camera and comfortable shoes', 120),
    createPlanItem('Lunch at La Boqueria', 'place124', '12:30', '14:00', 'Try the fresh seafood', 90),
    createPlanItem('Park Güell', 'place125', '15:00', '17:00', 'Book tickets in advance', 120),
  ]),
  createDayPlan(1, [
    createPlanItem('Gothic Quarter', 'place126', '09:30', '12:00', 'Explore the narrow streets', 150),
    createPlanItem('Barcelona Cathedral', 'place127', '12:30', '14:00', '', 90),
    createPlanItem('Picasso Museum', 'place128', '15:00', '17:00', 'Check for special exhibitions', 120),
  ]),
  createDayPlan(2, [
    createPlanItem('Camp Nou Stadium', 'place129', '10:00', '12:30', 'FC Barcelona museum and tour', 150),
    createPlanItem('Montjuïc Hill', 'place130', '14:00', '17:00', 'Visit the Olympic facilities and enjoy the view', 180),
  ]),
];

// Create mock day plans for Tokyo
const tokyoDayPlans = [
  createDayPlan(0, [
    createPlanItem('Tsukiji Fish Market', 'place223', '07:00', '09:00', 'Go early for the best experience', 120),
    createPlanItem('Senso-ji Temple', 'place224', '10:00', '12:00', 'Explore Asakusa area', 120),
    createPlanItem('Tokyo Skytree', 'place225', '14:00', '16:00', 'Book tickets for the observation deck', 120),
  ]),
  createDayPlan(1, [
    createPlanItem('Meiji Shrine', 'place226', '09:00', '11:00', 'Walk through the peaceful forest', 120),
    createPlanItem('Harajuku & Takeshita Street', 'place227', '11:30', '14:00', 'Experience youth culture and fashion', 150),
    createPlanItem('Shibuya Crossing', 'place228', '15:00', '17:00', 'See the famous scramble crossing', 120),
  ]),
  createDayPlan(2, [
    createPlanItem('Ueno Park', 'place229', '09:00', '12:00', 'Visit museums and the zoo', 180),
    createPlanItem('Akihabara', 'place230', '13:30', '16:30', 'Explore electronics and anime shops', 180),
  ]),
];

// Create mock day plans for New York
const newYorkDayPlans = [
  createDayPlan(0, [
    createPlanItem('Statue of Liberty & Ellis Island', 'place323', '09:00', '13:00', 'Book ferry tickets in advance', 240),
    createPlanItem('Wall Street & Financial District', 'place324', '14:00', '16:00', 'See the charging bull statue', 120),
    createPlanItem('One World Observatory', 'place325', '17:00', '19:00', 'Sunset views of the city', 120),
  ]),
  createDayPlan(1, [
    createPlanItem('Central Park', 'place326', '09:00', '11:30', 'Rent bikes to explore', 150),
    createPlanItem('Metropolitan Museum of Art', 'place327', '12:00', '15:00', 'Focus on key exhibitions', 180),
    createPlanItem('Times Square', 'place328', '17:00', '19:00', 'Experience the lights and energy', 120),
  ]),
  createDayPlan(2, [
    createPlanItem('High Line', 'place329', '10:00', '12:00', 'Walk the elevated park', 120),
    createPlanItem('Chelsea Market', 'place330', '12:30', '14:00', 'Lunch and shopping', 90),
    createPlanItem('Empire State Building', 'place331', '16:00', '18:00', 'Classic NYC views', 120),
  ]),
];

// Create mock guides
export const mockGuides: Guide[] = [
  {
    ...createGuide(
      '5 Days in Barcelona',
      'Barcelona, Spain',
      5,
      'Experience the best of Barcelona in 5 days. From Gaudí's masterpieces to delicious tapas, this guide covers all the must-see attractions and hidden gems of the Catalan capital.',
      barcelonaDayPlans,
      ['City', 'Culture', 'Food', 'Architecture'],
      'https://images.unsplash.com/photo-1583422409516-2895a77efded?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      'Travel Expert'
    ),
    rating: 4.8,
    reviews: 124,
  },
  {
    ...createGuide(
      '7 Days in Tokyo',
      'Tokyo, Japan',
      7,
      'Discover the fascinating blend of traditional and ultra-modern in Tokyo. This 7-day itinerary takes you through the city's most iconic neighborhoods, temples, shopping districts, and food scenes.',
      tokyoDayPlans,
      ['City', 'Culture', 'Food', 'Shopping'],
      'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80',
      'Japan Specialist'
    ),
    rating: 4.9,
    reviews: 87,
  },
  {
    ...createGuide(
      'Weekend in New York City',
      'New York, USA',
      3,
      'Make the most of a weekend in the Big Apple with this carefully curated itinerary. Hit the highlights while still having time to soak in the unique atmosphere of different neighborhoods.',
      newYorkDayPlans,
      ['City', 'Culture', 'Food', 'Shopping'],
      'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      'NYC Local'
    ),
    rating: 4.7,
    reviews: 156,
  },
  {
    ...createGuide(
      'Beach Getaway: 4 Days in Bali',
      'Bali, Indonesia',
      4,
      'Escape to paradise with this 4-day Bali itinerary. Relax on pristine beaches, explore ancient temples, and immerse yourself in the island's unique culture and natural beauty.',
      [
        createDayPlan(0, [
          createPlanItem('Kuta Beach', 'place423', '09:00', '12:00', 'Surfing lessons available', 180),
          createPlanItem('Uluwatu Temple', 'place424', '15:00', '18:00', 'Watch the sunset and Kecak dance', 180),
        ]),
        createDayPlan(1, [
          createPlanItem('Ubud Monkey Forest', 'place425', '09:00', '11:00', 'Keep valuables secure from monkeys', 120),
          createPlanItem('Tegallalang Rice Terraces', 'place426', '12:00', '14:00', 'Beautiful photo opportunities', 120),
          createPlanItem('Ubud Market', 'place427', '15:00', '17:00', 'Shop for souvenirs and crafts', 120),
        ]),
      ],
      ['Beach', 'Nature', 'Culture', 'Relaxation'],
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1738&q=80',
      'Island Explorer'
    ),
    rating: 4.6,
    reviews: 92,
  },
  {
    ...createGuide(
      'Adventure in Costa Rica',
      'Costa Rica',
      6,
      'Experience the ultimate adventure in Costa Rica. From zip-lining through cloud forests to spotting wildlife in national parks, this itinerary is perfect for nature lovers and thrill-seekers.',
      [
        createDayPlan(0, [
          createPlanItem('Arenal Volcano National Park', 'place523', '09:00', '14:00', 'Hiking trails with volcano views', 300),
          createPlanItem('La Fortuna Waterfall', 'place524', '15:00', '17:00', 'Swimming opportunity', 120),
        ]),
        createDayPlan(1, [
          createPlanItem('Monteverde Cloud Forest', 'place525', '08:00', '12:00', 'Guided nature walk', 240),
          createPlanItem('Zip-lining Adventure', 'place526', '13:30', '16:30', 'Book in advance', 180),
        ]),
      ],
      ['Adventure', 'Nature', 'Wildlife', 'Eco-tourism'],
      'https://images.unsplash.com/photo-1518182170546-07661fd94144?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80',
      'Adventure Guide'
    ),
    rating: 4.9,
    reviews: 78,
  },
  {
    ...createGuide(
      'Cultural Tour of Rome',
      'Rome, Italy',
      5,
      'Immerse yourself in the rich history and culture of the Eternal City. This 5-day itinerary covers ancient ruins, Renaissance art, Vatican treasures, and authentic Italian cuisine.',
      [
        createDayPlan(0, [
          createPlanItem('Colosseum & Roman Forum', 'place623', '09:00', '13:00', 'Book skip-the-line tickets', 240),
          createPlanItem('Trevi Fountain', 'place624', '15:00', '16:00', 'Throw a coin for good luck', 60),
          createPlanItem('Spanish Steps', 'place625', '16:30', '17:30', 'People watching', 60),
        ]),
        createDayPlan(1, [
          createPlanItem('Vatican Museums & Sistine Chapel', 'place626', '09:00', '13:00', 'Book tickets in advance', 240),
          createPlanItem('St. Peter\'s Basilica', 'place627', '14:00', '16:00', 'Dress code enforced', 120),
          createPlanItem('Castel Sant\'Angelo', 'place628', '16:30', '18:00', 'River views', 90),
        ]),
      ],
      ['City', 'Culture', 'History', 'Food'],
      'https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1996&q=80',
      'History Buff'
    ),
    rating: 4.7,
    reviews: 112,
  },
];

