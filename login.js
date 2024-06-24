import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import LinkMui from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const defaultTheme = createTheme();

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const loginDTO = {
      email,
      password,
    };

    try {
      const response = await axios.post('http://localhost:80/api/login', loginDTO);
  
      if (response.data) {
        const { token, username } = response.data; // 서버에서 JWT 토큰과 사용자 이름을 반환한다고 가정
        localStorage.setItem('token', token);
        alert('로그인 성공');
        console.log('onLogin called with:', { username, email }); // 여기에 로그 추가
        onLogin(username, email); // 로그인 성공 시 상태 변경
        console.log('onLogin called with:', { username, email });
        navigate('/'); // 로그인 성공 시 홈으로 이동
      } else {
        setError('이메일 또는 비밀번호를 확인하세요.');
      }
    } catch (error) {
      console.error('로그인 실패:', error);
      setError('이메일 또는 비밀번호를 확인하세요.');
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            {/* 아바타 아이콘을 추가할 수 있습니다 */}
          </Avatar>
          <Typography component="h1" variant="h5">
            로그인
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value={rememberMe} color="primary" onChange={() => setRememberMe(!rememberMe)} />}
              label="Remember me"
            />
            {error && (
              <Typography variant="body2" color="error" align="center" sx={{ mt: 1 }}>
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              로그인
            </Button>
            <Grid container spacing={2}>
              <Grid item xs>
                <LinkMui href="#" variant="body2">
                  내 정보 찾기
                </LinkMui>
              </Grid>
              <Grid item xs={6} style={{ textAlign: 'center' }}>
                <Link component={Link} to="/signup" variant="body2">
                  회원가입
                </Link>
              </Grid>
              <Grid item xs>
                <Link component={Link} to="/" variant="body2">
                  홈으로
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
