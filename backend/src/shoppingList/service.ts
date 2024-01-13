import db from "../../prisma/db";
import { ShoppingList, ShoppingListItem } from "@prisma/client";
import {
  CreateShoppingList,
  CreateShoppingListItem,
} from "../types/ShoppingList";

const ShoppingListService = {
  async getAll(userId: string): Promise<ShoppingList[]> {
    return db.shoppingList.findMany({
      where: {
        Users: {
          some: {
            id: userId,
          },
        },
      },
      include: {
        items: true,
        Users: true,
      },
    });
  },

  async create(data: CreateShoppingList): Promise<ShoppingList> {
    const { name, userIds, items } = data;
    return db.shoppingList.create({
      data: {
        name,
        Users: {
          connect: userIds.map((userId) => ({ id: userId })),
        },
        items: {
          create: items,
        },
      },
      include: {
        items: true,
        Users: true,
      },
    });
  },

  async getById(id: string): Promise<ShoppingList | null> {
    return db.shoppingList.findUnique({
      where: { id },
      include: {
        items: true,
        Users: true,
      },
    });
  },

  async delete(id: string): Promise<ShoppingList> {
    await db.shoppingListItem.deleteMany({
      where: {
        shoppingListId: id,
      },
    });

    return db.shoppingList.delete({
      where: { id },
    });
  },

  async removeItem(
    shoppingListId: string,
    itemId: string
  ): Promise<ShoppingListItem> {
    return db.shoppingListItem.delete({
      where: {
        id: itemId,
      },
    });
  },
  async addItem(
    shoppingListId: string,
    itemData: CreateShoppingListItem
  ): Promise<ShoppingListItem> {
    return db.shoppingListItem.create({
      data: {
        ...itemData,
        shoppingListId: shoppingListId,
      },
    });
  },

  async updateListItem(
    itemId: string,
    itemData: CreateShoppingListItem
  ): Promise<ShoppingListItem> {
    return db.shoppingListItem.update({
      where: { id: itemId },
      data: itemData,
    });
  },

  async updateList(
    shoppingListId: string,
    listData: { name?: string }
  ): Promise<ShoppingList> {
    if (!shoppingListId) {
      throw new Error("Shopping list ID is required");
    }

    return db.shoppingList.update({
      where: {
        id: shoppingListId, // Stellen Sie sicher, dass shoppingListId definiert ist
      },
      data: listData,
    });
  },

  // Weitere Methoden nach Bedarf...
};

export default ShoppingListService;
