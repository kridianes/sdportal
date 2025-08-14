import { PacklistService, PacklistItem, Season } from './types';

export class MockPacklistService implements PacklistService {
  private categories: string[] = [
    'Essentials',
    'Clothing',
    'Toiletries',
    'Electronics',
    'Health',
    'Documents',
    'Miscellaneous',
  ];
  
  private baseItems: Record<string, string[]> = {
    Essentials: [
      'Passport',
      'Wallet',
      'Phone',
      'Phone charger',
      'Travel insurance details',
      'Credit/debit cards',
      'Local currency',
      'House keys',
    ],
    Clothing: [
      'Underwear',
      'Socks',
      'T-shirts',
      'Pants/trousers',
      'Sleepwear',
      'Comfortable walking shoes',
    ],
    Toiletries: [
      'Toothbrush',
      'Toothpaste',
      'Shampoo',
      'Conditioner',
      'Body wash',
      'Deodorant',
      'Hairbrush/comb',
      'Skincare products',
    ],
    Electronics: [
      'Camera',
      'Camera charger',
      'Power adapter',
      'Headphones',
      'E-reader/books',
    ],
    Health: [
      'Prescription medications',
      'Pain relievers',
      'Band-aids',
      'Hand sanitizer',
      'Insect repellent',
    ],
    Documents: [
      'Boarding passes',
      'Hotel reservations',
      'Travel itinerary',
      'Driver\'s license',
      'Emergency contacts',
    ],
    Miscellaneous: [
      'Sunglasses',
      'Travel pillow',
      'Reusable water bottle',
      'Snacks',
      'Travel guide',
    ],
  };
  
  private seasonalItems: Record<Season, Record<string, string[]>> = {
    winter: {
      Clothing: [
        'Winter coat',
        'Sweaters',
        'Thermal underwear',
        'Gloves',
        'Scarf',
        'Hat',
        'Warm socks',
        'Boots',
      ],
      Health: ['Lip balm', 'Moisturizer'],
      Miscellaneous: ['Umbrella', 'Hand warmers'],
    },
    spring: {
      Clothing: [
        'Light jacket',
        'Cardigan/sweater',
        'Long-sleeve shirts',
        'Waterproof jacket',
      ],
      Miscellaneous: ['Umbrella', 'Allergy medication'],
    },
    summer: {
      Clothing: [
        'Shorts',
        'Sandals',
        'Swimwear',
        'Hat/cap',
        'Light dresses',
        'Sunglasses',
      ],
      Health: ['Sunscreen', 'After-sun lotion', 'Aloe vera gel'],
      Miscellaneous: ['Beach towel', 'Flip flops'],
    },
    fall: {
      Clothing: [
        'Light jacket',
        'Sweaters',
        'Long-sleeve shirts',
        'Waterproof jacket',
        'Scarf',
      ],
      Miscellaneous: ['Umbrella'],
    },
  };
  
  private destinationSpecificItems: Record<string, Record<string, string[]>> = {
    beach: {
      Clothing: ['Swimwear', 'Beach cover-up', 'Flip flops', 'Hat/cap'],
      Health: ['Sunscreen', 'After-sun lotion', 'Aloe vera gel'],
      Miscellaneous: ['Beach towel', 'Beach bag', 'Snorkeling gear'],
    },
    city: {
      Clothing: ['Smart casual outfits', 'Comfortable walking shoes'],
      Miscellaneous: ['City map', 'Day bag/backpack', 'Guidebook'],
    },
    mountain: {
      Clothing: ['Hiking boots', 'Hiking socks', 'Layers', 'Waterproof jacket'],
      Health: ['First aid kit', 'Blister plasters'],
      Miscellaneous: ['Hiking poles', 'Daypack', 'Water bottle', 'Trail maps'],
    },
    tropical: {
      Clothing: ['Lightweight clothing', 'Swimwear', 'Hat/cap'],
      Health: ['Insect repellent', 'Sunscreen', 'After-sun lotion'],
      Miscellaneous: ['Mosquito net', 'Waterproof bag'],
    },
  };
  
  async generateByDestination(
    destination: string,
    days: number,
    season?: Season
  ): Promise<PacklistItem[]> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    const packingList: PacklistItem[] = [];
    
    // Add base items
    for (const category in this.baseItems) {
      for (const item of this.baseItems[category]) {
        packingList.push({
          text: item,
          category,
        });
      }
    }
    
    // Add seasonal items if season is provided
    if (season) {
      for (const category in this.seasonalItems[season]) {
        for (const item of this.seasonalItems[season][category]) {
          packingList.push({
            text: item,
            category,
          });
        }
      }
    }
    
    // Add destination-specific items based on destination keywords
    const destinationLower = destination.toLowerCase();
    
    if (
      destinationLower.includes('beach') ||
      destinationLower.includes('bali') ||
      destinationLower.includes('hawaii') ||
      destinationLower.includes('cancun')
    ) {
      this.addDestinationItems(packingList, 'beach');
    }
    
    if (
      destinationLower.includes('city') ||
      destinationLower.includes('new york') ||
      destinationLower.includes('tokyo') ||
      destinationLower.includes('paris') ||
      destinationLower.includes('london') ||
      destinationLower.includes('barcelona')
    ) {
      this.addDestinationItems(packingList, 'city');
    }
    
    if (
      destinationLower.includes('mountain') ||
      destinationLower.includes('alps') ||
      destinationLower.includes('hiking') ||
      destinationLower.includes('trek')
    ) {
      this.addDestinationItems(packingList, 'mountain');
    }
    
    if (
      destinationLower.includes('tropical') ||
      destinationLower.includes('jungle') ||
      destinationLower.includes('caribbean') ||
      destinationLower.includes('thailand') ||
      destinationLower.includes('bali')
    ) {
      this.addDestinationItems(packingList, 'tropical');
    }
    
    // Adjust clothing quantities based on trip length
    const clothingItems = packingList.filter(item => item.category === 'Clothing');
    for (const item of clothingItems) {
      if (
        item.text.includes('Underwear') ||
        item.text.includes('Socks') ||
        item.text.includes('T-shirts')
      ) {
        // Adjust the text to include the quantity
        const quantity = Math.min(days + 2, 14); // Pack for days + 2 extra, max 14
        item.text = `${item.text} (${quantity})`;
      }
    }
    
    return packingList;
  }
  
  getCategories(): string[] {
    return this.categories;
  }
  
  private addDestinationItems(packingList: PacklistItem[], destinationType: string): void {
    const items = this.destinationSpecificItems[destinationType];
    
    for (const category in items) {
      for (const item of items[category]) {
        // Check if the item is already in the list
        const exists = packingList.some(
          existingItem => existingItem.text === item && existingItem.category === category
        );
        
        if (!exists) {
          packingList.push({
            text: item,
            category,
          });
        }
      }
    }
  }
}

