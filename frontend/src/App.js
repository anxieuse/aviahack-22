import './App.css';
import { Link } from "react-router-dom";
import MainPage from './screens/MainPage';
import RegStack from './components/navigation/navigation';
import {FiMenu} from 'react-icons/fi';
import {TfiClose} from 'react-icons/tfi';
import {useState} from "react";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

function App() {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className="App">
            <header className={'App-header'}>
                <nav>
                    <Button
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                        style={{color: '#faac02'}}
                    >
                        Меню
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <Link style={{textDecoration: 'none', color: '#000000'}} to={'/'}><MenuItem onClick={handleClose} >Панель управления</MenuItem></Link>
                        <Link style={{textDecoration: 'none', color: '#000000'}} to={'/statistic'}><MenuItem onClick={handleClose} href={'/statistic'}>Статистика</MenuItem></Link>
                        <MenuItem onClick={handleClose}>Профиль</MenuItem>
                        <MenuItem onClick={handleClose}>Выйти</MenuItem>
                    </Menu>
                </nav>
            </header>
            <RegStack />
        </div>
    );
}

export default App;
