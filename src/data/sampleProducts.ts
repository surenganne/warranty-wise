import { Product } from '../types/product';

export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "MacBook Pro",
    category: "Electronics",
    manufacturer: "Apple",
    model: "M1 Pro 14-inch",
    imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1000&q=80",
    purchaseDate: "2023-01-15",
    warrantyPeriod: 1,
    warrantyUnit: "years",
    status: "active",
    daysRemaining: 200,
    progressPercentage: 75,
    serviceHistory: [
      {
        id: 1,
        date: "2023-06-15",
        type: "maintenance",
        description: "System diagnostics and cleaning",
        cost: 89.99,
        provider: "Apple Store",
        nextServiceDue: "2023-12-15"
      }
    ]
  },
  {
    id: 2,
    name: "Coffee Maker",
    category: "Appliances",
    manufacturer: "Breville",
    model: "BES920XL",
    imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1000&q=80",
    purchaseDate: "2022-06-10",
    warrantyPeriod: 2,
    warrantyUnit: "years",
    status: "active",
    daysRemaining: 300,
    progressPercentage: 60,
    serviceHistory: []
  },
  {
    id: 3,
    name: "Smart TV",
    category: "Electronics",
    manufacturer: "Samsung",
    model: "QN65Q80B",
    imageUrl: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=1000&q=80",
    purchaseDate: "2022-12-25",
    warrantyPeriod: 2,
    warrantyUnit: "years",
    status: "active",
    daysRemaining: 450,
    progressPercentage: 40,
    serviceHistory: []
  },
  {
    id: 4,
    name: "Ergonomic Office Chair",
    category: "Furniture",
    manufacturer: "Herman Miller",
    model: "Aeron",
    imageUrl: "https://images.unsplash.com/photo-1541558869434-2840d308329a?auto=format&fit=crop&w=1000&q=80",
    purchaseDate: "2021-08-15",
    warrantyPeriod: 12,
    warrantyUnit: "years",
    status: "active",
    daysRemaining: 3500,
    progressPercentage: 20,
    serviceHistory: []
  },
  {
    id: 5,
    name: "Refrigerator",
    category: "Appliances",
    manufacturer: "LG",
    model: "LFXS26973S",
    imageUrl: "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?auto=format&fit=crop&w=1000&q=80",
    purchaseDate: "2022-03-20",
    warrantyPeriod: 1,
    warrantyUnit: "years",
    status: "expired",
    daysRemaining: -15,
    progressPercentage: 100,
    serviceHistory: [
      {
        id: 1,
        date: "2022-09-20",
        type: "maintenance",
        description: "Filter replacement and cleaning",
        cost: 49.99,
        provider: "LG Service Center"
      }
    ]
  },
  {
    id: 6,
    name: "Electric Car",
    category: "Automotive",
    manufacturer: "Tesla",
    model: "Model 3",
    imageUrl: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1000&q=80",
    purchaseDate: "2023-01-01",
    warrantyPeriod: 4,
    warrantyUnit: "years",
    status: "active",
    daysRemaining: 1260,
    progressPercentage: 15,
    serviceHistory: []
  },
  {
    id: 7,
    name: "Power Drill",
    category: "Tools",
    manufacturer: "DeWalt",
    model: "DCD777C2",
    imageUrl: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=1000&q=80",
    purchaseDate: "2023-02-15",
    warrantyPeriod: 3,
    warrantyUnit: "years",
    status: "active",
    daysRemaining: 880,
    progressPercentage: 25,
    serviceHistory: []
  },
  {
    id: 8,
    name: "Gaming Console",
    category: "Electronics",
    manufacturer: "Sony",
    model: "PlayStation 5",
    imageUrl: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=1000&q=80",
    purchaseDate: "2022-11-30",
    warrantyPeriod: 1,
    warrantyUnit: "years",
    status: "expiring",
    daysRemaining: 25,
    progressPercentage: 90,
    serviceHistory: []
  },
  {
    id: 9,
    name: "Washing Machine",
    category: "Appliances",
    manufacturer: "Whirlpool",
    model: "WFW9620HC",
    imageUrl: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=1000&q=80",
    purchaseDate: "2022-05-10",
    warrantyPeriod: 1,
    warrantyUnit: "years",
    status: "expired",
    daysRemaining: -45,
    progressPercentage: 100,
    serviceHistory: [
      {
        id: 1,
        date: "2022-11-10",
        type: "repair",
        description: "Motor replacement under warranty",
        cost: 0,
        provider: "Whirlpool Service"
      }
    ]
  },
  {
    id: 10,
    name: "Standing Desk",
    category: "Furniture",
    manufacturer: "Fully",
    model: "Jarvis Bamboo",
    imageUrl: "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&w=1000&q=80",
    purchaseDate: "2023-03-01",
    warrantyPeriod: 15,
    warrantyUnit: "years",
    status: "active",
    daysRemaining: 5400,
    progressPercentage: 5,
    serviceHistory: []
  },
  {
    id: 11,
    name: "Robot Vacuum",
    category: "Appliances",
    manufacturer: "iRobot",
    model: "Roomba j7+",
    imageUrl: "https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=1000&q=80",
    purchaseDate: "2023-01-15",
    warrantyPeriod: 2,
    warrantyUnit: "years",
    status: "active",
    daysRemaining: 560,
    progressPercentage: 30,
    serviceHistory: []
  },
  {
    id: 12,
    name: "Air Purifier",
    category: "Appliances",
    manufacturer: "Dyson",
    model: "HP07",
    imageUrl: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=1000&q=80",
    purchaseDate: "2022-08-20",
    warrantyPeriod: 2,
    warrantyUnit: "years",
    status: "active",
    daysRemaining: 420,
    progressPercentage: 45,
    serviceHistory: [
      {
        id: 1,
        date: "2023-02-20",
        type: "maintenance",
        description: "Filter replacement",
        cost: 29.99,
        provider: "Dyson Service Center"
      }
    ]
  }
];