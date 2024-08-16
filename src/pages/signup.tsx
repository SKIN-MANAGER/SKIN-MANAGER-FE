import React, { useState, useEffect } from 'react'
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
    const BASE_SIGNUP = '/api/signup'
    const BASE_CHECK_ID = '/api/id/duplicate/check'
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
    const [isIdChecking, setIsIdChecking] = useState(false)
    const [isTouched, setIsTouched] = useState({
        id: false,
        pwd: false,
        pwdchk: false,
        name: false,
        phone: false,
    })
    const router = useRouter()

    // 아이디 중복 체크 및 유효성 검사
    useEffect(() => {
        const checkDuplicateId = async () => {
            if (id === '') {
                setIdError('아이디를 입력해주세요.')
                return
            }
            const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if (!validEmail.test(id)) {
                setIdError('유효한 이메일 주소를 입력해주세요.')
                return
            }

            try {
                setIsIdChecking(true)
                const response = await axios.post(BASE_CHECK_ID, { id })

                if (response.data.result.duplicate) {
                    setIdError('이미 존재하는 아이디입니다.')
                } else {
                    setIdError('')
                }
            } catch (err) {
                console.error('중복 검사 중 오류가 발생했습니다:', err)
                setIdError('아이디 중복 검사를 수행하는 중 오류가 발생했습니다.')
            } finally {
                setIsIdChecking(false)
            }
        }

        if (isTouched.id) {
            checkDuplicateId()
        }
    }, [id, isTouched.id])

    // 비밀번호 유효성 검사
    useEffect(() => {
        const validPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        if (pwd === '') {
            setPwdError('비밀번호를 입력해주세요.')
        } else if (!validPassword.test(pwd)) {
            setPwdError('비밀번호는 영문 대문자, 소문자, 숫자, 특수문자를 포함해야 하며, 최소 8자 이상이어야 합니다.')
        } else {
            setPwdError('')
        }
    }, [pwd, isTouched.pwd])

    // 비밀번호 확인 유효성 검사
    useEffect(() => {
        if (pwdchk === '') {
            setPwdChkError('비밀번호 확인을 입력해주세요.')
        } else if (pwd !== pwdchk) {
            setPwdChkError('비밀번호가 일치하지 않습니다.')
        } else {
            setPwdChkError('')
        }
    }, [pwdchk, pwd, isTouched.pwdchk])

    // 이름 유효성 검사
    useEffect(() => {
        const validName = /^[가-힣a-zA-Z]{2,}$/
        if (name === '') {
            setNameError('이름을 입력해주세요.')
        } else if (!validName.test(name)) {
            setNameError('이름은 2자 이상이어야 하며, 숫자나 특수 문자를 포함할 수 없습니다.')
        } else {
            setNameError('')
        }
    }, [name, isTouched.name])

    // 휴대폰 번호 유효성 검사
    useEffect(() => {
        const validPhone = /^010\d{7,8}$/
        if (phone === '') {
            setPhoneError('휴대폰 번호를 입력해주세요.')
        } else if (!validPhone.test(phone)) {
            setPhoneError('유효한 휴대폰 번호를 입력해주세요. (010으로 시작, 10~11자리 숫자)')
        } else {
            setPhoneError('')
        }
    }, [phone, isTouched.phone])

    const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>, field: keyof typeof isTouched) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setter(e.target.value)
        setIsTouched((prev) => ({
            ...prev,
            [field]: true,
        }))
    }

    const signupHandler = async (event: React.FormEvent) => {
        event.preventDefault()
        setError('')
        setSuccess('')

        // 중복 체크 중에는 회원가입 진행하지 않음
        if (isIdChecking) {
            setError('아이디 중복 검사가 완료될 때까지 기다려 주세요.')
            return
        }

        if (idError || pwdError || pwdChkError || nameError || phoneError) {
            setError('입력한 정보를 확인해주세요.')
            return
        }

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

            const response = await axios.post(BASE_SIGNUP, { id, pwd, name, firstPhone, middlePhone, lastPhone, email, role }, {
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
                        onChange={handleInputChange(setId, 'id')}
                        error={!!idError && isTouched.id}
                        helperText={isTouched.id && idError}
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
                        onChange={handleInputChange(setPwd, 'pwd')}
                        error={!!pwdError && isTouched.pwd}
                        helperText={isTouched.pwd && pwdError}
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
                        onChange={handleInputChange(setPwdChk, 'pwdchk')}
                        error={!!pwdChkError && isTouched.pwdchk}
                        helperText={isTouched.pwdchk && pwdChkError}
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
                        onChange={handleInputChange(setName, 'name')}
                        error={!!nameError && isTouched.name}
                        helperText={isTouched.name && nameError}
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
                        onChange={handleInputChange(setPhone, 'phone')}
                        error={!!phoneError && isTouched.phone}
                        helperText={isTouched.phone && phoneError}
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
