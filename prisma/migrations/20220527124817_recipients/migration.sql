-- CreateTable
CREATE TABLE "notification_recipient" (
    "id" SERIAL NOT NULL,
    "notificationId" INTEGER NOT NULL,
    "token" TEXT NOT NULL,

    CONSTRAINT "notification_recipient_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "notification_recipient" ADD CONSTRAINT "notification_recipient_notificationId_fkey" FOREIGN KEY ("notificationId") REFERENCES "notification"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
