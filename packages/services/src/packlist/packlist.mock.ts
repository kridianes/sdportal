import { v4 as uuidv4 } from 'uuid';
import { PackingItem } from '@travel-planner/domain';
import { PacklistService, Season } from './packlist.interface';

/**
 * Mock implementation of the PacklistService
 */
export class MockPacklistService implements PacklistService {
  /**
   * Generate a packing list based on destination, days, and season
   */
  async generatePackingList(
    destination: string,
    days: number,
    season: Season
  ): Promise<PackingItem[]> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const packingList: PackingItem[] = [];
    
    // Add essential items (always included)
    const essentials = this.getEssentialItems();
    packingList.push(...essentials);
    
    // Add clothing items based on season
    const clothingItems = this.getClothingItems(season, days);
    packingList.push(...clothingItems);
    
    // Add destination-specific items
    const destinationItems = this.getDestinationSpecificItems(destination);
    packingList.push(...destinationItems);
    
    // Add toiletries
    const toiletries = this.getToiletryItems();
    packingList.push(...toiletries);
    
    // Add electronics
    const electronics = this.getElectronicsItems();
    packingList.push(...electronics);
    
    return packingList;
  }
  
  /**
   * Create a packing item
   */
  private createPackingItem(text: string, category: string): PackingItem {
    return {
      id: uuidv4(),
      text,
      done: false,
      category,
    };
  }
  
  /**
   * Get essential items
   */
  private getEssentialItems(): PackingItem[] {
    return [
      this.createPackingItem('Passport', 'Documents'),
      this.createPackingItem('Travel insurance', 'Documents'),
      this.createPackingItem('Flight tickets', 'Documents'),
      this.createPackingItem('Hotel reservations', 'Documents'),
      this.createPackingItem('Credit cards', 'Documents'),
      this.createPackingItem('Cash', 'Documents'),
      this.createPackingItem('Driver\'s license', 'Documents'),
      this.createPackingItem('Travel adapter', 'Electronics'),
      this.createPackingItem('Medications', 'Health'),
      this.createPackingItem('First aid kit', 'Health'),
    ];
  }
  
  /**
   * Get clothing items based on season and trip length
   */
  private getClothingItems(season: Season, days: number): PackingItem[] {
    const items: PackingItem[] = [];
    
    // Basic clothing items (adjusted for trip length)
    const tShirtCount = Math.min(days, 7);
    const underwearCount = Math.min(days + 2, 9);
    const sockCount = Math.min(days + 2, 9);
    
    items.push(this.createPackingItem(`T-shirts (${tShirtCount})`, 'Clothing'));
    items.push(this.createPackingItem(`Underwear (${underwearCount})`, 'Clothing'));
    items.push(this.createPackingItem(`Socks (${sockCount})`, 'Clothing'));
    items.push(this.createPackingItem('Comfortable walking shoes', 'Clothing'));
    
    // Season-specific clothing
    switch (season) {
      case Season.SUMMER:
        items.push(this.createPackingItem('Shorts (3)', 'Clothing'));
        items.push(this.createPackingItem('Swimwear', 'Clothing'));
        items.push(this.createPackingItem('Sunglasses', 'Accessories'));
        items.push(this.createPackingItem('Sun hat', 'Accessories'));
        items.push(this.createPackingItem('Sandals', 'Clothing'));
        items.push(this.createPackingItem('Light jacket', 'Clothing'));
        break;
        
      case Season.WINTER:
        items.push(this.createPackingItem('Warm coat', 'Clothing'));
        items.push(this.createPackingItem('Sweaters (3)', 'Clothing'));
        items.push(this.createPackingItem('Thermal underwear', 'Clothing'));
        items.push(this.createPackingItem('Gloves', 'Accessories'));
        items.push(this.createPackingItem('Scarf', 'Accessories'));
        items.push(this.createPackingItem('Winter hat', 'Accessories'));
        items.push(this.createPackingItem('Warm socks', 'Clothing'));
        items.push(this.createPackingItem('Waterproof boots', 'Clothing'));
        break;
        
      case Season.SPRING:
      case Season.FALL:
        items.push(this.createPackingItem('Light sweaters (2)', 'Clothing'));
        items.push(this.createPackingItem('Jeans/pants (2)', 'Clothing'));
        items.push(this.createPackingItem('Light jacket', 'Clothing'));
        items.push(this.createPackingItem('Scarf', 'Accessories'));
        items.push(this.createPackingItem('Umbrella', 'Accessories'));
        break;
    }
    
    return items;
  }
  
  /**
   * Get destination-specific items
   */
  private getDestinationSpecificItems(destination: string): PackingItem[] {
    const items: PackingItem[] = [];
    const lowerDestination = destination.toLowerCase();
    
    // Beach destinations
    if (
      lowerDestination.includes('beach') ||
      lowerDestination.includes('hawaii') ||
      lowerDestination.includes('bali') ||
      lowerDestination.includes('cancun') ||
      lowerDestination.includes('maldives')
    ) {
      items.push(this.createPackingItem('Swimwear', 'Clothing'));
      items.push(this.createPackingItem('Beach towel', 'Accessories'));
      items.push(this.createPackingItem('Sunscreen', 'Toiletries'));
      items.push(this.createPackingItem('After-sun lotion', 'Toiletries'));
      items.push(this.createPackingItem('Snorkeling gear', 'Activities'));
    }
    
    // City destinations
    if (
      lowerDestination.includes('paris') ||
      lowerDestination.includes('london') ||
      lowerDestination.includes('new york') ||
      lowerDestination.includes('tokyo') ||
      lowerDestination.includes('rome')
    ) {
      items.push(this.createPackingItem('Comfortable walking shoes', 'Clothing'));
      items.push(this.createPackingItem('Day bag/backpack', 'Accessories'));
      items.push(this.createPackingItem('City map', 'Accessories'));
      items.push(this.createPackingItem('Portable charger', 'Electronics'));
    }
    
    // Mountain/hiking destinations
    if (
      lowerDestination.includes('mountain') ||
      lowerDestination.includes('alps') ||
      lowerDestination.includes('hiking') ||
      lowerDestination.includes('trek') ||
      lowerDestination.includes('nepal')
    ) {
      items.push(this.createPackingItem('Hiking boots', 'Clothing'));
      items.push(this.createPackingItem('Hiking socks', 'Clothing'));
      items.push(this.createPackingItem('Backpack', 'Accessories'));
      items.push(this.createPackingItem('Water bottle', 'Accessories'));
      items.push(this.createPackingItem('Hiking poles', 'Activities'));
      items.push(this.createPackingItem('Insect repellent', 'Health'));
    }
    
    return items;
  }
  
  /**
   * Get toiletry items
   */
  private getToiletryItems(): PackingItem[] {
    return [
      this.createPackingItem('Toothbrush', 'Toiletries'),
      this.createPackingItem('Toothpaste', 'Toiletries'),
      this.createPackingItem('Shampoo', 'Toiletries'),
      this.createPackingItem('Conditioner', 'Toiletries'),
      this.createPackingItem('Soap/body wash', 'Toiletries'),
      this.createPackingItem('Deodorant', 'Toiletries'),
      this.createPackingItem('Razor', 'Toiletries'),
      this.createPackingItem('Sunscreen', 'Toiletries'),
      this.createPackingItem('Moisturizer', 'Toiletries'),
      this.createPackingItem('Lip balm', 'Toiletries'),
    ];
  }
  
  /**
   * Get electronics items
   */
  private getElectronicsItems(): PackingItem[] {
    return [
      this.createPackingItem('Smartphone', 'Electronics'),
      this.createPackingItem('Phone charger', 'Electronics'),
      this.createPackingItem('Camera', 'Electronics'),
      this.createPackingItem('Camera charger', 'Electronics'),
      this.createPackingItem('Travel adapter', 'Electronics'),
      this.createPackingItem('Headphones', 'Electronics'),
      this.createPackingItem('Portable charger', 'Electronics'),
    ];
  }
}

