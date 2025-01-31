import { jsonifyError, XTransfer, XTransferStatus, RouterBalance } from "@connext/nxtp-utils";
import { Pool } from "pg";

import { getContext } from "../../shared";

import {
  getLatestNonce,
  getTransfersByStatus,
  saveTransfers,
  saveRouterBalances,
  getLatestExecuteTimestamp,
  getLatestReconcileTimestamp,
} from "./client";

export type Database = {
  saveTransfers: (xtransfers: XTransfer[], _pool?: Pool) => Promise<void>;
  getLatestNonce: (domain: string, _pool?: Pool) => Promise<number>;
  getTransfersByStatus: (
    status: XTransferStatus,
    limit: number,
    offset?: number,
    orderDirection?: "ASC" | "DESC",
    _pool?: Pool,
  ) => Promise<XTransfer[]>;
  saveRouterBalances: (routerBalances: RouterBalance[], _pool?: Pool) => Promise<void>;
  getLatestExecuteTimestamp: (domain: string, _pool?: Pool) => Promise<number>;
  getLatestReconcileTimestamp: (domain: string, _pool?: Pool) => Promise<number>;
};

export let pool: Pool;

export const getDatabase = async (): Promise<Database> => {
  const { config, logger } = getContext();
  pool = new Pool({ connectionString: config.database.url });
  pool.on("error", (err: Error) => logger.error("Database error", undefined, undefined, jsonifyError(err))); // don't let a pg restart kill your app

  try {
    await pool.query("SELECT NOW()");
  } catch (e: unknown) {
    logger.error("Database connection error", undefined, undefined, jsonifyError(e as Error));
    throw new Error("Database connection error");
  }

  return {
    getLatestNonce,
    saveTransfers,
    getTransfersByStatus,
    saveRouterBalances,
    getLatestExecuteTimestamp,
    getLatestReconcileTimestamp,
  };
};
