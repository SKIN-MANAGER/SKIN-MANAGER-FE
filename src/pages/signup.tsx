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

const Signup = () => {
    const BASE = '/api/signup'
    const [id, setId] = useState('')
    const [pwd, setPwd] = useState('')
    const [pwdchk, setPwdChk] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [idError, setIdError] = useState('')
    const [pwdError, setPwdError] = useState('')
    const [pwdChkError, setPwdChkError] = useState('')
    const [nameError, setNameError] = useState('')
    const [phoneError, setPhoneError] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const router = useRouter()

    const signupHandler = async (event: React.FormEvent) => {
        event.preventDefault()
        setIdError('')
        setPwdError('')
        setPwdChkError('')
        setNameError('')
        setPhoneError('')
        setError('')
        setSuccess('')

        let hasError = false

        // 이메일 형식 유효성 검사
        const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!id) {
            setIdError('아이디를 입력해주세요.')
            hasError = true
        } else if (!validEmail.test(id)) {
            setIdError('유효한 이메일 주소를 입력해주세요.')
            hasError = true
        }

        // 비밀번호 복잡성 유효성 검사
        const validPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        if (!pwd) {
            setPwdError('비밀번호를 입력해주세요.')
            hasError = true
        } else if (!validPassword.test(pwd)) {
            setPwdError('비밀번호는 영문 대문자, 소문자, 숫자, 특수문자를 포함해야 하며, 최소 8자 이상이어야 합니다.')
            hasError = true
        }

        if (!pwdchk) {
            setPwdChkError('비밀번호 확인을 입력해주세요.')
            hasError = true
        } else if (pwd !== pwdchk) {
            setPwdChkError('비밀번호가 일치하지 않습니다.')
            hasError = true
        }

        // 이름 유효성 검사
        const validName = /^[가-힣a-zA-Z]{2,}$/
        if (!name) {
            setNameError('이름을 입력해주세요.')
            hasError = true
        } else if (!validName.test(name)) {
            setNameError('이름은 2자 이상이어야 하며, 숫자나 특수 문자를 포함할 수 없습니다.')
            hasError = true
        }

        // 휴대폰 번호 유효성 검사
        const validPhone = /^010\d{7,8}$/
        if (!phone) {
            setPhoneError('휴대폰 번호를 입력해주세요.')
            hasError = true
        } else if (!validPhone.test(phone)) {
            setPhoneError('유효한 휴대폰 번호를 입력해주세요. (010으로 시작, 10~11자리 숫자)')
            hasError = true
        }

        if (hasError) return

        try {
            let firstPhone = ""
            let middlePhone = ""
            let lastPhone = ""
            const role = "USER"
            const email = id;

            if (phone.length === 10) {
                firstPhone = phone.substring(0, 3)
                middlePhone = phone.substring(3, 6)
                lastPhone = phone.substring(6)
            } else {
                firstPhone = phone.substring(0, 3)
                middlePhone = phone.substring(3, 7)
                lastPhone = phone.substring(7)
            }

            const response = await axios.post(BASE, { id, pwd, name, firstPhone, middlePhone, lastPhone, email, role }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (response.status === 200) {
                setSuccess('회원가입에 성공했습니다! 로그인 페이지로 이동합니다.')
                setTimeout(() => {
                    router.push('/login')
                }, 2000)
            } else {
                setError('회원가입 중 오류가 발생했습니다.')
            }
        } catch (err) {
            setError('회원가입 중 오류가 발생했습니다.')
            console.error("signup.tsx : ", err)
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
                    회원가입
                </Typography>
                <Box component="form" onSubmit={signupHandler} noValidate sx={{ mt: 1 }}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="id"
                        label="아이디"
                        type='email'
                        id="id"
                        autoComplete="email"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        error={!!idError} // 에러 발생 시 스타일 적용
                        helperText={idError} // 에러 메시지 표시
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
                        error={!!pwdError}
                        helperText={pwdError}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="passwordCheck"
                        label="비밀번호 확인"
                        type="password"
                        id="passwordCheck"
                        autoComplete="current-passwordCheck"
                        value={pwdchk}
                        onChange={(e) => setPwdChk(e.target.value)}
                        error={!!pwdChkError}
                        helperText={pwdChkError}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="name"
                        label="이름"
                        type="text"
                        id="name"
                        autoComplete="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        error={!!nameError}
                        helperText={nameError}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="phone"
                        label="휴대폰"
                        type="tel"
                        id="phone"
                        autoComplete="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        error={!!phoneError}
                        helperText={phoneError}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        회원가입
                    </Button>
                    {error && (
                        <Typography color="error" variant="body2">
                            {error}
                        </Typography>
                    )}
                    {success && (
                        <Typography color="success" variant="body2">
                            {success}
                        </Typography>
                    )}
                </Box>
            </Box>
        </Container>
    )
}

export default Signup
