import express from "express";
import { PrismaClient } from '@prisma/client';


const app = express();
app.use(express.json());

const client = new PrismaClient();

const port = 3000;

app.post("/hooks/catch/:userId/:zapId", async (req, res) => {
  const userId = req.params.userId;
  const zapId = req.params.zapId;
  const body = req.body;

  //   store in db a new trigger

  client.$transaction(async (tx) => {
    const run = await tx.zapRun.create({
      data: {
        zapId: zapId,
        metadata: body,
      },
    });
    await tx.zapRunOutbox.create({
      data: {
        zapRunId: run.id,
      },
    });
  });

  res.status(200).json({
    message: "successfully updated the id ",
  });
  // push it on to a queue (kafka,redis)
});

app.listen(3000);
