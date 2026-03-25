import express, { type Request, type Response } from "express";
import dotenv from "dotenv";
import postRouter from "./routes/postRouter.js";

// 1. 환경 변수 초기화
dotenv.config();

// 2. Express 앱 생성
const app = express();
const PORT = process.env.PORT || 8000;

// 3. 필수 미들웨어
// JSON 형태의 데이터를 주고받기 위해 꼭 필요합니다.
app.use(express.json());

// 기본 라우트
app.get("/", (req: Request, res: Response) => {
    res.send("🚀 Express 서버가 정상적으로 실행 중입니다!");
});
app.use("/posts", postRouter);

// 5. 서버 실행
app.listen(PORT, () => {
    console.log(`🛡️ Server listening on port: http://localhost:${PORT} 🛡️`);
});
