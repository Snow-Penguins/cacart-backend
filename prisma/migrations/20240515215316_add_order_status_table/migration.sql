-- CreateTable
CREATE TABLE "order_status" (
    "id" SERIAL NOT NULL,
    "status" VARCHAR(50) NOT NULL,

    CONSTRAINT "order_status_pkey" PRIMARY KEY ("id")
);
