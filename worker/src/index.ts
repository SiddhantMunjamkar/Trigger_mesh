import { Kafka, Partitioners } from "kafkajs";
import { PrismaClient } from "@prisma/client";

const TOPIC_NAME = "zap-events";

const kafka = new Kafka({
  clientId: "outbox-processor",
  brokers: ["localhost:9092"],
});

async function main() {
  while (1) {
    //    to push the zapRunoutbox to the the worker for the processing
    const consumer = kafka.consumer({ groupId: "main-worker" });
    await consumer.connect();

    await consumer.subscribe({ topic: TOPIC_NAME, fromBeginning: true });

    await consumer.run({
        autoCommit: false,
      eachMessage: async ({ topic, partition, message }) => {
        console.log({
          partition,
          offset: message.offset,
          value: message.value.toString(),
        });

        await new Promise((r) => setTimeout(r, 5000));
        console.log("Processing done");

        await consumer.commitOffsets([
          {
            topic: TOPIC_NAME,
            partition: partition,
            offset: parseInt(message.offset + 1).toString(),
          },
        ]);
      },
    });
  }
}

main().catch((e) => console.error(`[example/consumer] ${e.message}`, e));
