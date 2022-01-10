import { Redis } from 'ioredis';
import { Session } from 'express-session';
import { Request, Response } from "express";

export type MyContext = {
  // em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>;
  req: Request & { session: Session };
  res: Response;
  redis: Redis
};
