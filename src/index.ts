import express, { type Request, type Response } from "express";
import dotenv from "dotenv";

// 1. 환경 변수 초기화
dotenv.config();

// 2. Express 앱 생성
const app = express();
const PORT = process.env.PORT || 8000;

// 3. 필수 미들웨어
// JSON 형태의 데이터를 주고받기 위해 꼭 필요합니다.
app.use(express.json());

// 실제 데이터를 저장하기 위한 데이터베이스가 없으므로, 임시 데이터 저장 변수 이용
const mockPosts = [
    { id: 1, title: "첫 번째 택배", content: "무사히 도착했습니다." },
    { id: 2, title: "두 번째 택배", content: "파손 주의해주세요!" },
    { id: 3, title: "세 번째 택배", content: "문 앞에 두고 가주세요." },
];

// 기본 라우트
app.get("/", (req: Request, res: Response) => {
    res.send("🚀 Express 서버가 정상적으로 실행 중입니다!");
});

app.get("/posts", (req: Request, res: Response) => {
    // 일꾼이 창고(mockPosts)에서 전체 목록을 가져와서 새 박스(res.json)에 담아 보냅니다.
    res.json({
        success: true,
        data: mockPosts,
    });
});

app.get("/posts/:id", (req: Request, res: Response) => {
    // 1. 송장(req)에서 바코드 번호(id)를 읽어옵니다. (req.params 사용)
    const targetId = Number(req.params.id);

    // 2. 창고(mockPosts)에서 해당 번호와 일치하는 물건을 찾습니다.
    const foundPost = mockPosts.find(post => post.id === targetId);

    // 3. 물건이 창고에 없다면? 고객에게 없다고 알려줍니다.
    if (!foundPost) {
        // return을 써줘야 여기서 함수(일꾼의 작업)가 끝납니다.
        return res.status(404).json({
            success: false,
            message: "요청하신 물건(게시글)을 찾을 수 없습니다.",
        });
    }

    // 4. 물건을 찾았다면? 새 박스에 담아서 보냅니다.
    res.json({
        success: true,
        data: foundPost,
    });
});

// 5. 서버 실행
app.listen(PORT, () => {
    console.log(`🛡️ Server listening on port: http://localhost:${PORT} 🛡️`);
});