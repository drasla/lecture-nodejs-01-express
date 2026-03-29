import express, { type Request, type Response } from "express";
import dotenv from "dotenv";
import postRouter from "./routes/postRouter";
import userRouter from "./routes/userRouter";
import path from "path";

// 1. 환경 변수 초기화
dotenv.config();

// 2. Express 앱 생성
const app = express();
const PORT = process.env.PORT || 8000;

// 3. 필수 미들웨어
// JSON 형태의 데이터를 주고받기 위해 꼭 필요합니다.
app.use(express.json());

// 4. 정적 파일 제공할 폴더 지정
app.use(express.static(path.join(process.cwd(), "public")));

// 기본 라우트
app.get("/", (req: Request, res: Response) => {
    res.sendFile(path.join(process.cwd(), "public", "index.html"));
});
app.use("/posts", postRouter);
app.use("/users", userRouter);
// 5. 서버 실행
app.listen(PORT, () => {
    console.log(`🛡️ Server listening on port: http://localhost:${PORT} 🛡️`);
});
