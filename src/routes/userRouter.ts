import express from "express";
import path from "path";

const router = express.Router();

const mockUsers = [
    { id: 1, email: "admin@test.com", password: "password123", name: "관리자" },
    { id: 2, email: "user@test.com", password: "1234", name: "일반유저" },
];

router.post("/login", (req, res) => {
    // 1. 요청 데이터 추출
    // 2. 요청 데이터 유효성 검사
    // 3. mockUsers 중 입력된 email을 가진 계정이 있는지 검색
    // 4. 입력된 비밀번호와 일치하는지 확인
    const { email, password } = req.body;
    const successPagePath = path.join(process.cwd(), "public", "result.html");
    const failPagePath = path.join(process.cwd(), "public", "fail.html");

    if (!email || !password) {
        return res.sendFile(failPagePath);
    }

    const user = mockUsers.find(u => u.email === email);
    if (!user) {
        return res.sendFile(failPagePath);
    }

    if (user.password !== password) {
        return res.sendFile(failPagePath);
    }

    res.sendFile(successPagePath);
});

export default router;
