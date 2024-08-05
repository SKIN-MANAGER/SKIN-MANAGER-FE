import React, { useState } from 'react'
import { useRouter } from 'next/router'
import {
    Container,
    TextField,
    Button,
    Typography,
    Box,
    CssBaseline,
} from '@mui/material'
import axios from 'axios'

const Login = () => {
    const BASE = '/api/login'
    const [id, setId] = useState('')
    const [pwd, setPwd] = useState('')
    const [error, setError] = useState('')
    const router = useRouter()

    const handleSubmit = async (event: React.FormEvent) => {
        try {
            event.preventDefault()
            setError('')

            // 간단한 유효성 검사 예시
            if (!id || !pwd) {
                setError('이메일과 비밀번호를 입력해주세요.')
                return
            }

            const response = await axios.post(BASE, { id, pwd }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            // 로그인 처리 예시
            if (response.status === 200) {
                router.push('/');
            } else {
                setError('이메일 또는 비밀번호가 잘못되었습니다.');
            }
        } catch (err) {
            setError('로그인 중 오류가 발생했습니다.')
            console.error("login.tsx : ", err)
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    로그인
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="이메일 주소"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="비밀번호"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={pwd}
                        onChange={(e) => setPwd(e.target.value)}
                    />
                    {error && (
                        <Typography color="error" variant="body2">
                            {error}
                        </Typography>
                    )}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        로그인
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default Login;
