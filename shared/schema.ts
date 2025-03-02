import { pgTable, text, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const chords = pgTable("chords", {
  id: serial("id").primaryKey(),
  root: text("root").notNull(),
  type: text("type").notNull(),
  combinations: text("combinations").array().notNull()
});

export const insertChordSchema = createInsertSchema(chords).pick({
  root: true,
  type: true,
  combinations: true
});

export type InsertChord = z.infer<typeof insertChordSchema>;
export type Chord = typeof chords.$inferSelect;
