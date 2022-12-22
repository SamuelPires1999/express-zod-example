import { createConfig, z, Routing, defaultEndpointsFactory, createServer } from "express-zod-api";
import dotenv from "dotenv-safe";
dotenv.config();

const config = createConfig({
  server: {
    listen: 3000,
  },
  cors: true,
  logger: { level: "debug", color: true },
});

const primaryEndPoint = defaultEndpointsFactory.build({
  method: "get",
  input: z.object({}),
  output: z.object({
    gretting: z.string(),
  }),
  handler: async () => {
    return {
      gretting: "Hahahaha",
    };
  },
});

const needsInput = defaultEndpointsFactory.build({
  method: "post",
  input: z.object({
    sampleInput: z.string().min(6),
  }),
  output: z.object({
    validation: z.string(),
  }),
  handler: async ({ input, logger }) => {
    logger.info("SUCCESS:", input);
    return {
      validation: "Input successully validated",
    };
  },
});

const dateEndPoint = defaultEndpointsFactory.build({
  method: "post",
  input: z.object({
    name: z.string(),
    birthday: z.dateIn(),
  }),
  output: z.object({
    validation: z.string(),
  }),
  handler: async () => {
    return {
      validation: "date validated successfully",
    };
  },
});

const routes: Routing = {
  api: {
    hello: primaryEndPoint,
    world: needsInput,
    date: dateEndPoint,
  },
};

createServer(config, routes);
