import { NextFunction, Request, Response, Router } from "express";
import { createUser, login } from "../controllers/users";
import NotFoundError from "../errors/not-found-error";
import auth from "../middlewares/auth";
import {
  validateAuthentication,
  validateUserBody,
} from "../middlewares/validatons";
import cardRouter from "./cards";
import userRouter from "./users";

const router = Router();
router.get("/crash_test", () => {
  setTimeout(() => {
    throw new Error("Сервер сейчас упадёт");
  }, 0);
});
router.post("/signup", validateUserBody, createUser);
router.post("/signin", validateAuthentication, login);

// все роуты, кроме /signin и /signup, защищены авторизацией;
router.use(auth);
router.use("/users", userRouter);
router.use("/cards", cardRouter);

router.use((req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError("Маршрут не найден"));
});

export default router;
