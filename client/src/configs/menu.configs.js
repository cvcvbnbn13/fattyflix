import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import SlideshowOutlinedIcon from '@mui/icons-material/SlideshowOutlined'
import LiveTvOutlinedIcon from '@mui/icons-material/LiveTvOutlined'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined'
import LockResetOutlinedIcon from '@mui/icons-material/LockResetOutlined'

const main = [
  {
    display: '首頁',
    path: '/',
    icon: <HomeOutlinedIcon />,
    state: 'home',
  },
  {
    display: '電影',
    path: '/movie',
    icon: <SlideshowOutlinedIcon />,
    state: 'movie',
  },
  {
    display: '節目',
    path: '/tv',
    icon: <LiveTvOutlinedIcon />,
    state: 'tv',
  },
  {
    display: '搜尋',
    path: '/search',
    icon: <SearchOutlinedIcon />,
    state: 'search',
  },
]

const user = [
  {
    display: '我的片單',
    path: '/favorites',
    icon: <FavoriteBorderOutlinedIcon />,
    state: 'favorite',
  },
  {
    display: '已發表的評論',
    path: '/reviews',
    icon: <RateReviewOutlinedIcon />,
    state: 'reviews',
  },
  {
    display: '更改密碼',
    path: '/password-update',
    icon: <LockResetOutlinedIcon />,
    state: 'password.update',
  },
]

const menuConfigs = { main, user }

export default menuConfigs
