import { Request, Response, NextFunction } from "express";
import service from "./service";
import returnUser from "../middleware/returnUser";

const ShoppingListController = {
  async getAll(request: Request, response: Response) {
    try {
      const user_token = returnUser(request);
      const shoppingLists = await service.getAll(user_token.userid);
      response.json(shoppingLists);
    } catch (error) {
      if (error instanceof Error) {
        response.status(500).json({ error: error.message });
      } else {
        response.status(500).json({ error: "An unknown error occurred" });
      }
    }
  },

  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const { name, items, userIds } = request.body;

      const newShoppingList = await service.create({
        name,
        userIds,
        items,
      });

      response.status(201).json({
        status: "success",
        data: newShoppingList,
      });
    } catch (error) {
      if (error instanceof Error) {
        next(error);
      } else {
        next(new Error("An unknown error occurred"));
      }
    }
  },

  async getOne(request: Request, response: Response) {
    try {
      const shoppingListId = request.params.id;
      const shoppingList = await service.getById(shoppingListId);
      if (!shoppingList) {
        return response.status(404).json({ error: "Shopping list not found" });
      }
      response.json(shoppingList);
    } catch (error) {
      if (error instanceof Error) {
        response.status(500).json({ error: error.message });
      } else {
        response.status(500).json({ error: "An unknown error occurred" });
      }
    }
  },

  async delete(request: Request, response: Response) {
    try {
      const shoppingListId = request.params.id;
      await service.delete(shoppingListId);
      response
        .status(200)
        .json({ message: "Shopping list deleted successfully" });
    } catch (error) {
      if (error instanceof Error) {
        response.status(500).json({ error: error.message });
      } else {
        response.status(500).json({ error: "An unknown error occurred" });
      }
    }
  },

  async removeItem(request: Request, response: Response) {
    try {
      const { shoppingListId, itemId } = request.params;
      await service.removeItem(shoppingListId, itemId);
      response.status(200).json({ message: "Item removed successfully" });
    } catch (error) {
      if (error instanceof Error) {
        response.status(500).json({ error: error.message });
      } else {
        response.status(500).json({ error: "An unknown error occurred" });
      }
    }
  },

  async updateListItem(request: Request, response: Response) {
    try {
      const { itemId } = request.params;
      const itemData = request.body;
      const updatedItem = await service.updateListItem(itemId, itemData);
      response
        .status(200)
        .json({ message: "Item updated successfully", data: updatedItem });
    } catch (error) {
      if (error instanceof Error) {
        response.status(500).json({ error: error.message });
      } else {
        response.status(500).json({ error: "An unknown error occurred" });
      }
    }
  },

  async updateList(request: Request, response: Response) {
    try {
      const shoppingListId = request.params.id;
      const listData = request.body;
      const updatedList = await service.updateList(shoppingListId, listData);
      response
        .status(200)
        .json({ message: "List updated successfully", data: updatedList });
    } catch (error) {
      if (error instanceof Error) {
        response.status(500).json({ error: error.message });
      } else {
        response.status(500).json({ error: "An unknown error occurred" });
      }
    }
  },

  // Weitere Methoden können hier hinzugefügt werden
};

export default ShoppingListController;
