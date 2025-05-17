import { PrismaClient } from "@prisma/client";
import { Kafka } from "kafkajs";

const client = new PrismaClient();
const TOPIC_NAME = "zap-events";

const kafka = new Kafka({
  clientId: "outbox-processor",
  brokers: ["localhost:9092"],
});

async function main() {
  const producer = kafka.producer();
  await producer.connect();

  //   running the infinite loop to get the data from the db and push it to the kafka queue
  while (1) {
    const pendingRows = await client.zapRunOutbox.findMany({
      where: {},
      take: 10,
    });
    // sending the data to the kafka queue
    producer.send({
      topic: TOPIC_NAME,
      messages: pendingRows.map((row) => ({
        value: row.zapRunId,
      })),
    });
    //  deleting the dat from the db after sending it to the kafka queue
    await client.zapRunOutbox.deleteMany({
      where: {
        id: {
          in: pendingRows.map((row) => row.id),
        },
      },
    });
  }
}

main()