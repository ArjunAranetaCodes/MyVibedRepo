import { z } from 'zod';

export const todoSchema = z.object({
  id: z.string(),
  text: z.string().min(1, 'Todo text cannot be empty'),
  completed: z.boolean().default(false),
  createdAt: z.date().default(() => new Date()),
});

export type Todo = z.infer<typeof todoSchema>;

export type TodoFilter = 'all' | 'active' | 'completed'; 