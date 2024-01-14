-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "paypal" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "wgid" TEXT,
    CONSTRAINT "User_wgid_fkey" FOREIGN KEY ("wgid") REFERENCES "Wg" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Chat" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "wgid" TEXT NOT NULL,
    CONSTRAINT "Chat_wgid_fkey" FOREIGN KEY ("wgid") REFERENCES "Wg" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "text" TEXT NOT NULL,
    "time" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userid" TEXT NOT NULL,
    "chatid" TEXT,
    CONSTRAINT "Message_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Message_chatid_fkey" FOREIGN KEY ("chatid") REFERENCES "Chat" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Todo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "frequenz" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "UserTodo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userid" TEXT NOT NULL,
    "todoid" TEXT NOT NULL,
    "nextTurn" DATETIME NOT NULL,
    CONSTRAINT "UserTodo_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserTodo_todoid_fkey" FOREIGN KEY ("todoid") REFERENCES "Todo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Wg" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "rules" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ShoppingList" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ShoppingListItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" REAL,
    "shoppingListId" TEXT NOT NULL,
    CONSTRAINT "ShoppingListItem_shoppingListId_fkey" FOREIGN KEY ("shoppingListId") REFERENCES "ShoppingList" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_ShoppingListToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_ShoppingListToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "ShoppingList" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ShoppingListToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Chat_id_key" ON "Chat"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Message_id_key" ON "Message"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Todo_id_key" ON "Todo"("id");

-- CreateIndex
CREATE UNIQUE INDEX "UserTodo_id_key" ON "UserTodo"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Wg_id_key" ON "Wg"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ShoppingList_id_key" ON "ShoppingList"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ShoppingListItem_id_key" ON "ShoppingListItem"("id");

-- CreateIndex
CREATE UNIQUE INDEX "_ShoppingListToUser_AB_unique" ON "_ShoppingListToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ShoppingListToUser_B_index" ON "_ShoppingListToUser"("B");
