import express from "express";

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

    if (!email || !password) {
        return res.status(400).json({ message: "이메일과 비밀번호를 모두 입력해주세요." });
    }

    const user = mockUsers.find(u => u.email === email);
    if (!user) {
        return res.status(404).json({ message: "가입되지 않은 이메일입니다." });
    }

    if (user.password !== password) {
        return res.status(401).json({ message: "비밀번호가 일치하지 않습니다. " });
    }

    res.status(200).json({
        message: `${user.name}님 환영합니다!`,
        data: {
            id: user.id,
            email: user.email,
            name: user.name,
        },
    });
});

export default router;
