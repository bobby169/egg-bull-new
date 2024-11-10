import { QueueOptions, Queue as BullQueue } from "bull";

interface IBullConfig extends QueueOptions {
  name?: string;
}

declare module "egg" {
  interface EggAppConfig {
    bull: {
      client?: IBullConfig;
      clients?: {
        [key: string]: IBullConfig;
      };
      default?: IBullConfig;
    };
  }

  export interface Application {
    queue: Record<string, any>;
    bull: {
      get(name: string): BullQueue;
    };
  }
}

export { BullQueue as Queue };