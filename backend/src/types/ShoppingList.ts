import {
  ShoppingList as PrismaShoppingList,
  ShoppingListItem as PrismaShoppingListItem,
  User as PrismaUser,
} from "@prisma/client";

// Erweiterte Typen basierend auf Prisma-Generierten Typen
export type ShoppingList = PrismaShoppingList & {
  items: ShoppingListItem[];
  Users: PrismaUser[];
};

export type ShoppingListItem = PrismaShoppingListItem;

// Typen für das Erstellen von neuen Einträgen
export type CreateShoppingList = {
  name: string;
  userIds: string[];
  items: CreateShoppingListItem[];
};

export type CreateShoppingListItem = {
  name: string;
  quantity: number;
  price?: number; // Optional
};

// Hier können weitere Typen oder Schnittstellen definiert werden
