import { Router } from "express";
import { authMiddleware } from "./middleware";
import { ZapCreateSchema } from "../types";
import { prismaClient } from "../db";

const router = Router();

router.post("/", authMiddleware, async (req, res) => {
  // @ts-ignore
  const id = req.id;
  const body = req.body;
  const parsedData = ZapCreateSchema.safeParse(body);

  if (!parsedData.success) {
    res.status(411).json({ message: "Incorrect inputs" });
    return;
  }

  await prismaClient.$transaction(async (tx) => {
    const zap = await tx.zap.create({
      data: {
        userId: id,
        triggerId: "",
        Action: {
          create: parsedData.data.actions.map((x, index) => ({
            actionId: x.availableActionId,
            sortingOrder: index,
          })),
        },
      },
    });

    const trigger = await tx.trigger.create({
      data: {
        triggerId: parsedData.data.availableTriggerId,
        zapId: zap.id,
      },
    });
    await tx.zap.update({
      where: {
        id: zap.id,
      },
      data: {
        triggerId: trigger.id,
      },
    });
  });
});

router.get("/", authMiddleware, async (req, res) => {
  // @ts-ignore
  const id = req.id;
  const zaps = await prismaClient.zap.findMany({
    where: {
      userId: id,
    },
    include: {
      Action: {
        include: {
          type: true,
        },
      },
      trigger: {
        include: {
          type: true,
        },
      },
    },
  });
  console.log(zaps);
  res.json({ Zaps: zaps });
  return;
});

router.get("/:zapId", authMiddleware, async (req, res) => {
  // @ts-ignore
  const id = req.id;
  const zapId = req.params.zapId;

  const zap = await prismaClient.zap.findFirst({
    where: {
      id: zapId,
      userId: id,
    },
    include: {
      Action: {
        include: {
          type: true,
        },
      },
      trigger: {
        include: {
          type: true,
        },
      },
    },
  });

  console.log("zap handler");
  res.json({ zap });
  return;
});
export const zapRouter = router;
