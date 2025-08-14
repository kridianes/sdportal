import { PlaceDetails } from './types';

// Mock place data for popular attractions
export const mockPlaces: PlaceDetails[] = [
  // Barcelona places
  {
    id: 'place123',
    name: 'Sagrada Familia',
    formattedAddress: 'Carrer de Mallorca, 401, 08013 Barcelona, Spain',
    location: { lat: 41.4036, lng: 2.1744 },
    photos: [
      {
        url: 'https://images.unsplash.com/photo-1583422409516-2895a77efded',
        width: 1200,
        height: 800,
      },
    ],
    rating: 4.8,
    userRatingsTotal: 142567,
    types: ['tourist_attraction', 'church', 'point_of_interest'],
    website: 'https://sagradafamilia.org/',
    phoneNumber: '+34 932 08 04 14',
    openingHours: {
      weekdayText: [
        'Monday: 9:00 AM – 6:00 PM',
        'Tuesday: 9:00 AM – 6:00 PM',
        'Wednesday: 9:00 AM – 6:00 PM',
        'Thursday: 9:00 AM – 6:00 PM',
        'Friday: 9:00 AM – 6:00 PM',
        'Saturday: 9:00 AM – 6:00 PM',
        'Sunday: 9:00 AM – 6:00 PM',
      ],
      isOpen: true,
    },
    priceLevel: 3,
  },
  {
    id: 'place124',
    name: 'La Boqueria Market',
    formattedAddress: 'La Rambla, 91, 08001 Barcelona, Spain',
    location: { lat: 41.3819, lng: 2.1716 },
    photos: [
      {
        url: 'https://images.unsplash.com/photo-1589212987511-4a924cb9d8ac',
        width: 1200,
        height: 800,
      },
    ],
    rating: 4.6,
    userRatingsTotal: 98432,
    types: ['food', 'market', 'point_of_interest'],
    website: 'https://www.boqueria.barcelona/',
    phoneNumber: '+34 933 18 25 84',
    openingHours: {
      weekdayText: [
        'Monday: 8:00 AM – 8:30 PM',
        'Tuesday: 8:00 AM – 8:30 PM',
        'Wednesday: 8:00 AM – 8:30 PM',
        'Thursday: 8:00 AM – 8:30 PM',
        'Friday: 8:00 AM – 8:30 PM',
        'Saturday: 8:00 AM – 8:30 PM',
        'Sunday: Closed',
      ],
      isOpen: true,
    },
    priceLevel: 2,
  },
  {
    id: 'place125',
    name: 'Park Güell',
    formattedAddress: '08024 Barcelona, Spain',
    location: { lat: 41.4145, lng: 2.1527 },
    photos: [
      {
        url: 'https://images.unsplash.com/photo-1583422409516-2895a77efded',
        width: 1200,
        height: 800,
      },
    ],
    rating: 4.7,
    userRatingsTotal: 87654,
    types: ['park', 'tourist_attraction', 'point_of_interest'],
    website: 'https://parkguell.barcelona/',
    phoneNumber: '+34 934 09 18 31',
    openingHours: {
      weekdayText: [
        'Monday: 9:30 AM – 7:30 PM',
        'Tuesday: 9:30 AM – 7:30 PM',
        'Wednesday: 9:30 AM – 7:30 PM',
        'Thursday: 9:30 AM – 7:30 PM',
        'Friday: 9:30 AM – 7:30 PM',
        'Saturday: 9:30 AM – 7:30 PM',
        'Sunday: 9:30 AM – 7:30 PM',
      ],
      isOpen: true,
    },
    priceLevel: 2,
  },
  
  // Tokyo places
  {
    id: 'place223',
    name: 'Tsukiji Fish Market',
    formattedAddress: '4 Chome-16-2 Tsukiji, Chuo City, Tokyo 104-0045, Japan',
    location: { lat: 35.6654, lng: 139.7707 },
    photos: [
      {
        url: 'https://images.unsplash.com/photo-1589212987511-4a924cb9d8ac',
        width: 1200,
        height: 800,
      },
    ],
    rating: 4.5,
    userRatingsTotal: 65432,
    types: ['food', 'market', 'point_of_interest'],
    website: 'https://www.tsukiji.or.jp/',
    phoneNumber: '+81 3-3542-1111',
    openingHours: {
      weekdayText: [
        'Monday: 5:00 AM – 2:00 PM',
        'Tuesday: 5:00 AM – 2:00 PM',
        'Wednesday: 5:00 AM – 2:00 PM',
        'Thursday: 5:00 AM – 2:00 PM',
        'Friday: 5:00 AM – 2:00 PM',
        'Saturday: 5:00 AM – 2:00 PM',
        'Sunday: Closed',
      ],
      isOpen: true,
    },
    priceLevel: 2,
  },
  {
    id: 'place224',
    name: 'Senso-ji Temple',
    formattedAddress: '2 Chome-3-1 Asakusa, Taito City, Tokyo 111-0032, Japan',
    location: { lat: 35.7147, lng: 139.7966 },
    photos: [
      {
        url: 'https://images.unsplash.com/photo-1589212987511-4a924cb9d8ac',
        width: 1200,
        height: 800,
      },
    ],
    rating: 4.7,
    userRatingsTotal: 87654,
    types: ['temple', 'tourist_attraction', 'point_of_interest'],
    website: 'https://www.senso-ji.jp/',
    phoneNumber: '+81 3-3842-0181',
    openingHours: {
      weekdayText: [
        'Monday: 6:00 AM – 5:00 PM',
        'Tuesday: 6:00 AM – 5:00 PM',
        'Wednesday: 6:00 AM – 5:00 PM',
        'Thursday: 6:00 AM – 5:00 PM',
        'Friday: 6:00 AM – 5:00 PM',
        'Saturday: 6:00 AM – 5:00 PM',
        'Sunday: 6:00 AM – 5:00 PM',
      ],
      isOpen: true,
    },
    priceLevel: 0,
  },
  
  // New York places
  {
    id: 'place323',
    name: 'Statue of Liberty',
    formattedAddress: 'New York, NY 10004, United States',
    location: { lat: 40.6892, lng: -74.0445 },
    photos: [
      {
        url: 'https://images.unsplash.com/photo-1589212987511-4a924cb9d8ac',
        width: 1200,
        height: 800,
      },
    ],
    rating: 4.7,
    userRatingsTotal: 123456,
    types: ['tourist_attraction', 'point_of_interest'],
    website: 'https://www.nps.gov/stli/',
    phoneNumber: '+1 212-363-3200',
    openingHours: {
      weekdayText: [
        'Monday: 9:30 AM – 5:00 PM',
        'Tuesday: 9:30 AM – 5:00 PM',
        'Wednesday: 9:30 AM – 5:00 PM',
        'Thursday: 9:30 AM – 5:00 PM',
        'Friday: 9:30 AM – 5:00 PM',
        'Saturday: 9:30 AM – 5:00 PM',
        'Sunday: 9:30 AM – 5:00 PM',
      ],
      isOpen: true,
    },
    priceLevel: 2,
  },
  {
    id: 'place324',
    name: 'Wall Street',
    formattedAddress: 'Wall St, New York, NY 10005, United States',
    location: { lat: 40.7068, lng: -74.0089 },
    photos: [
      {
        url: 'https://images.unsplash.com/photo-1589212987511-4a924cb9d8ac',
        width: 1200,
        height: 800,
      },
    ],
    rating: 4.5,
    userRatingsTotal: 87654,
    types: ['tourist_attraction', 'point_of_interest'],
    website: '',
    phoneNumber: '',
    openingHours: {
      weekdayText: [
        'Monday: Open 24 hours',
        'Tuesday: Open 24 hours',
        'Wednesday: Open 24 hours',
        'Thursday: Open 24 hours',
        'Friday: Open 24 hours',
        'Saturday: Open 24 hours',
        'Sunday: Open 24 hours',
      ],
      isOpen: true,
    },
    priceLevel: 0,
  },
  
  // Add more mock places as needed
];

