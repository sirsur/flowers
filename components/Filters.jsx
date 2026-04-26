'use client';

import React, { useState } from 'react';
import {
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Slider,
    Button,
    Menu,
    Typography,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const categories = [
    'Бумага',
    'Пленка',
    'Инструменты',
    'Лента',
    'Крафт',
    'Тишью',
];
const colors = [
    'Красный',
    'Зеленый',
    'Синий',
    'Желтый',
    'Черный',
    'Белый',
    'Розовый',
    'Cерый',
    'Фиолетовый',
    'Оранжевый',
    'Коричневый',
    'Бирюзовый',
];

const Filters = ({
    category,
    setCategory,
    color,
    setColor,
    priceRange,
    setPriceRange,
}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '12px',
                marginBottom: '10vw',
                alignItems: 'stretch',
            }}
        >
            <FormControl
                sx={{
                    width: { xs: '100%', sm: '30%', md: '45%' },
                }}
            >
                <InputLabel
                    sx={{
                        fontFamily: 'Gilroy',
                        fontWeight: 500,
                        color: '#1B2628',
                    }}
                >
                    Категория
                </InputLabel>
                <Select
                    value={category}
                    label='Категория'
                    onChange={(e) => setCategory(e.target.value)}
                    IconComponent={KeyboardArrowDownIcon}
                    sx={{
                        '& .MuiSelect-icon': {
                            color: '#1B2628',
                        },

                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'rgba(73, 106, 110, 0.2)',
                            borderWidth: '1.5px',
                            borderRadius: '8px',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'rgba(73, 106, 110, 1)',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'rgba(73, 106, 110, 1)',
                        },
                    }}
                >
                    <MenuItem value=''>
                        <Typography
                            sx={{
                                fontFamily: 'Gilroy',
                                fontWeight: 500,
                                color: '#1B2628',
                            }}
                        >
                            Сброс
                        </Typography>
                    </MenuItem>
                    {categories.map((item) => (
                        <MenuItem key={item} value={item}>
                            <Typography
                                sx={{ fontFamily: 'Gilroy', fontWeight: 500 }}
                            >
                                {item}
                            </Typography>
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Box
                sx={{
                    width: { xs: '100%', sm: '30%', md: '45%' },
                }}
            >
                <Button
                    sx={{
                        border: '1.5px solid rgba(73, 106, 110, 0.2)',
                        borderRadius: '8px',
                        color: '#1B2628',
                        width: '100%',
                        justifyContent: 'space-between',
                        height: '100%',
                        padding: '10px 16px',
                        '&:hover': {
                            border: '1.5px solid rgba(73, 106, 110, 1)',
                            backgroundColor: 'transparent',
                        },
                        '&:focus': {
                            border: '1.5px solid rgba(73, 106, 110, 1)',
                            backgroundColor: 'transparent',
                            outline: 'none',
                        },
                        '& .MuiButton-endIcon': {
                            marginRight: '-12px',
                            transition: 'transform 0.3s ease',
                            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                        },
                    }}
                    onClick={handleClick}
                    endIcon={
                        <Box
                            sx={{
                                width: '20px',
                                height: '20px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <KeyboardArrowDownIcon
                                sx={{
                                    fontSize: '25px',
                                }}
                            />
                        </Box>
                    }
                >
                    <Typography
                        sx={{
                            fontFamily: 'Gilroy',
                            fontSize: '15px',
                            fontWeight: 500,
                            textTransform: 'none',
                        }}
                    >
                        {priceRange[0]}₽ — {priceRange[1]}₽
                    </Typography>
                </Button>
                <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                    <Box
                        sx={{
                            px: '14px',
                            py: '8px',
                            width: 200,
                            borderRadius: '4px',
                        }}
                    >
                        <Typography
                            sx={{ fontFamily: 'Gilroy', fontWeight: 500 }}
                        >
                            Диапазон цены
                        </Typography>
                        <Slider
                            value={priceRange}
                            onChange={(_, newValue) => setPriceRange(newValue)}
                            valueLabelDisplay='auto'
                            min={0}
                            max={5000}
                        />
                        <Typography
                            sx={{ fontFamily: 'Gilroy', fontWeight: 500 }}
                        >
                            {priceRange[0]}₽ — {priceRange[1]}₽
                        </Typography>
                        <Button
                            onClick={() => setPriceRange([0, 400])}
                            sx={{
                                marginTop: '8px',
                                minWidth: 'auto',
                                padding: '4px 8px',
                                fontFamily: 'Gilroy',
                                fontWeight: 500,
                                fontSize: '12px',
                                color: '#1B2628',
                                border: '1px solid rgba(73, 106, 110, 0.2)',
                                borderRadius: '4px',
                                '&:hover': {
                                    borderColor: 'rgba(73, 106, 110, 1)',
                                    backgroundColor: 'rgba(73, 106, 110, 0.1)',
                                },
                            }}
                        >
                            Сброс
                        </Button>
                    </Box>
                </Menu>
            </Box>

            <FormControl
                sx={{
                    width: { xs: '100%', sm: '30%', md: '45%' },
                }}
            >
                <InputLabel
                    sx={{
                        fontFamily: 'Gilroy',
                        fontWeight: 500,
                        color: '#1B2628',
                    }}
                >
                    Цвет
                </InputLabel>
                <Select
                    value={color}
                    label='Цвет'
                    onChange={(e) => setColor(e.target.value)}
                    IconComponent={KeyboardArrowDownIcon}
                    sx={{
                        '& .MuiSelect-icon': {
                            color: '#1B2628',
                        },

                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'rgba(73, 106, 110, 0.2)',
                            borderWidth: '1.5px',
                            borderRadius: '8px',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'rgba(73, 106, 110, 1)',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'rgba(73, 106, 110, 1)',
                        },
                    }}
                >
                    <MenuItem value=''>
                        <Typography
                            sx={{
                                fontFamily: 'Gilroy',
                                fontWeight: 500,
                                color: '#1B2628',
                            }}
                        >
                            Сброс
                        </Typography>
                    </MenuItem>

                    {colors.map((item) => (
                        <MenuItem key={item} value={item}>
                            <Typography
                                sx={{ fontFamily: 'Gilroy', fontWeight: 500 }}
                            >
                                {item}
                            </Typography>
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
};

export default Filters;
