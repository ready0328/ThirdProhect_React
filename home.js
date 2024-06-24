import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();

function Home({ isLoggedIn, username, onLogout }) {
  console.log('Home component props:', { isLoggedIn, username }); // 여기에 로그 추가

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
            MiniMinder 홈
          </Typography>
          {isLoggedIn && (
            <Typography variant="h6" sx={{ mt: 2, mb: 2 }}>
              {username}님 반갑습니다.
            </Typography>
          )}
          <Box sx={{ mt: 3 }}>
            {!isLoggedIn ? (
              <>
                <Button
                  component={Link}
                  to="/login"
                  fullWidth
                  variant="contained"
                  sx={{ mb: 2 }}
                >
                  로그인
                </Button>
                <Button
                  component={Link}
                  to="/signup"
                  fullWidth
                  variant="contained"
                  sx={{ mb: 2 }}
                >
                  회원가입
                </Button>
              </>
            ) : (
              <Button
                onClick={onLogout}
                fullWidth
                variant="contained"
                sx={{ mb: 2 }}
              >
                로그아웃
              </Button>
            )}
            <Button
              component={Link}
              to="/miniminder"
              fullWidth
              variant="contained"
              sx={{ mb: 2 }}
            >
              캘린더 만들기
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Home;
