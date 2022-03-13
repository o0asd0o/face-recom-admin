import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import SettingsIcon from '@mui/icons-material/Settings';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link, ListItemIcon } from '@mui/material';
import { Link as RouteLink } from "react-router-dom";
import { Help, Logout, AddBusiness } from '@mui/icons-material';
import { signOut } from 'providers/firebase';
import { useHomeNavigation } from 'context/navigationContext';
import { pages } from 'constants/constants';

const HeaderNav: React.FC = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const { handleNavigation, selectedPageIndex } = useHomeNavigation();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorElUser(event.currentTarget);

  const handleCloseNavMenu = () => setAnchorElNav(null);

  const handleCloseUserMenu = (index?: number) => {
    setAnchorElUser(null);
    if (index !== undefined) {
      handleNavigate("/dashboard", 3)
    }
  };

  const handleNavigate = React.useCallback((page, index) => {
    setAnchorElNav(null);
    handleNavigation(page, index);
  }, [handleNavigation])

  return (
    <AppBar position="static" color="secondary">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            onClick={() => handleNavigate('/dashboard', 0)}
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, cursor: "pointer"}}
          >
             Food&nbsp;<span style={{ color: "#81c784" }}>Findr</span>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map(({ title, page }, index) => (
                <MenuItem
                  key={page}
                  onClick={() => handleNavigate(page, index)}
                  sx={{
                    backgroundColor: selectedPageIndex === index ? "rgba(255,255,255,0.15)" : "",
                    '&:hover': {
                      backgroundColor: selectedPageIndex === index ? "rgba(255,255,255,0.15)" : ""
                    }
                  }}
                >
                  <Typography textAlign="center">{title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            onClick={() => handleNavigate('/dashboard', 0)}
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, cursor: "pointer" }}
          >
            asdasd
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, alignItems: "center" }}>
            {pages.map(({ title, page }, index) => (
              <Button
                key={page}
                onClick={() => handleNavigate(page, index)}
                sx={{
                  my: 0,
                  height: "69px",
                  color: 'white',
                  display: 'block',
                  borderRadius: '0px',
                  px: 1.5,
                  backgroundColor: selectedPageIndex === index ? "rgba(255,255,255,0.15)" : "",
                  '&:hover': {
                      backgroundColor: selectedPageIndex === index ? "rgba(255,255,255,0.15)" : ""
                  }
                }}
              >
                {title}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <SettingsIcon style={{ fill: "#fff" }} />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorElUser}
              id="account-menu"
              open={Boolean(anchorElUser)}
              onClose={() => handleCloseUserMenu()}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  '&:before': { 
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem onClick={() => {
                handleCloseUserMenu()
                handleNavigate("/add-cafe", 3);
              }}>
                <RouteLink to="/add-cafe" style={{ color: "#315052", textDecoration: "none", display: "flex",  alignItems: "center" }}>
                  <ListItemIcon>
                    <AddBusiness fontSize="small" />
                  </ListItemIcon>
                  Add new Cafe
                </RouteLink>
              </MenuItem>
              <MenuItem onClick={() => handleCloseUserMenu()}>
                <Link
                  href="https://huskee.co/swapsupport/"
                  target="_blank"
                  sx={{
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                  }}>
                  <ListItemIcon>
                    <Help fontSize="small" />
                  </ListItemIcon>
                  Help
                </Link>
              </MenuItem>
              <MenuItem onClick={() => signOut()}>
                <ListItemIcon  sx={{ display: "flex", alignItems: "center" }}>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default HeaderNav;