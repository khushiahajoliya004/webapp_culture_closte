import { PrismaClient } from "@prisma/client";
import { PrismaD1 } from "@prisma/adapter-d1";

let _instance: PrismaClient | undefined;

function getD1Binding(): D1Database | undefined {
  const ctx = (globalThis as Record<symbol, { env?: Record<string, unknown> }>)[
    Symbol.for("__cloudflare-context__")
  ];
  return ctx?.env?.DB as D1Database | undefined;
}

function createPrismaClient(): PrismaClient {
  const db = getD1Binding();
  if (db) {
    const adapter = new PrismaD1(db);
    return new PrismaClient({ adapter });
  }

  // Local development fallback (no Cloudflare context)
  return new PrismaClient({ log: ["query", "error", "warn"] });
}

export const prisma: PrismaClient = new Proxy({} as PrismaClient, {
  get(_, prop: string | symbol) {
    if (!_instance) {
      _instance = createPrismaClient();
    }
    const value = (_instance as unknown as Record<string | symbol, unknown>)[prop];
    if (value === undefined) return undefined;
    return typeof value === "function" ? (value as Function).bind(_instance) : value;
  },
});
