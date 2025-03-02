import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);
  
  // No routes needed for this static application
  // Could add routes for saving favorite combinations in the future

  return httpServer;
}
