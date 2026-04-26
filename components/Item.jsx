'use client';

import {
    Box,
    Typography,
    Card,
    CardMedia,
    Grid,
    Avatar,
    Stack,
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useState, useContext, useEffect } from 'react';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { CartContext } from '../context/CartContext';

const ItemViewer = ({ data, category, color, priceRange }) => {
    const categoriesArray = data?.categories ?? [];

    const filteredCategories = categoriesArray
        .filter((cat) => {
            const matchesCategory = category
                ? cat.name.toLowerCase().includes(category.toLowerCase())
                : true;

            const price = parseFloat(cat.price);
            const matchesPrice =
                !isNaN(price) &&
                (!priceRange ||
                    (price >= priceRange[0] && price <= priceRange[1]));

            return matchesCategory && matchesPrice;
        })
        .map((cat, index) => ({
            ...cat,
            id: cat.id || `${cat.name}-${index}`,
            subcategories:
                cat.subcategories?.filter((sub) => {
                    return color ? sub.color === color : true;
                }) || [],
        }))
        .filter((cat) => cat.subcategories.length > 0);
    console.log('Filtered Categories:', filteredCategories);
    return (
        <Grid container spacing={3}>
            {filteredCategories.length > 0 ? (
                filteredCategories.map((category, index) => {
                    if (category.image_path === '') return null;

                    return (
                        <Grid
                            size={{ xs: 12, sm: 6, md: 4, lg: 4 }}
                            key={index}
                        >
                            <ItemBlock category={category} />
                        </Grid>
                    );
                })
            ) : (
                <p>No categories found matching the filters.</p>
            )}
        </Grid>
    );
};

const ItemBlock = ({ category }) => {
    const isMobile = useMediaQuery('(max-width:600px)');
    const [previewedSubcategory, setPreviewedSubcategory] = useState(null);
    const [previewedSubId, setPreviewedSubId] = useState(null);
    const [isHovered, setIsHovered] = useState(false);
    const [activeImage, setActiveImage] = useState(category.image_path);

    useEffect(() => {
        setActiveImage(category.image_path);
    }, [category.image_path]);

    const [activeSubcategory, setActiveSubcategory] = useState(null);
    const { cart, addToCart, removeFromCart } = useContext(CartContext);

    const isAnySubcategoryInCart = cart.some((item) => item.id === category.id);

    const isActiveSubcategoryInCart = activeSubcategory
        ? cart.some(
              (item) =>
                  item.subcategory?.color === activeSubcategory.color &&
                  item.id === category.id
          )
        : false;

    const handleMouseEnter = (subcategory) => {
        if (subcategory && subcategory.image_path) {
            setActiveImage(subcategory.image_path);
            setActiveSubcategory(subcategory);
        }
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setActiveImage(category.image_path);
        setActiveSubcategory(null);
        setIsHovered(false);
    };

    return (
        <Card
            elevation={0}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                height: '100%',
                gap: 2,
                border: 'none',
                boxShadow: 'none',
            }}
        >
            <Box sx={{ position: 'relative' }}>
                <CardMedia
                    sx={{
                        width: '100%',
                        aspectRatio: '1 / 1',
                        objectFit: 'cover',
                        borderRadius: '8px',
                    }}
                    component='img'
                    image={activeImage}
                    alt={category.name}
                />

                {isHovered && (
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '8px',
                            cursor: 'pointer',
                        }}
                    >
                        {isActiveSubcategoryInCart ? (
                            <RemoveShoppingCartIcon
                                sx={{ color: '#fff', fontSize: 40 }}
                            />
                        ) : (
                            <AddShoppingCartIcon
                                sx={{ color: '#fff', fontSize: 40 }}
                            />
                        )}
                    </Box>
                )}

                {isAnySubcategoryInCart && (
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 10,
                            right: 10,
                            backgroundColor: '#fff',
                            borderRadius: '4px',
                            padding: '4px',
                        }}
                    >
                        <AddShoppingCartIcon
                            sx={{ fontSize: 20, color: '#e53935' }}
                        />
                    </Box>
                )}
            </Box>

            <Box sx={{ color: '#1B2628' }}>
                {activeSubcategory && activeSubcategory.color ? (
                    <Typography
                        sx={{
                            fontFamily: 'Gilroy',
                            fontWeight: 600,
                            fontSize: '15px',
                        }}
                    >
                        {`${category.name} - ${activeSubcategory.color}`}
                    </Typography>
                ) : (
                    <Typography
                        sx={{
                            fontFamily: 'Gilroy',
                            fontWeight: 600,
                            fontSize: '15px',
                        }}
                    >
                        {category.name}
                    </Typography>
                )}
                {activeSubcategory && activeSubcategory.price ? (
                    <Typography
                        sx={{
                            fontFamily: 'Gilroy',
                            fontWeight: 400,
                            fontSize: '15px',
                        }}
                    >
                        {activeSubcategory.price}₽
                    </Typography>
                ) : category.price !== '' ? (
                    <Typography
                        sx={{
                            fontFamily: 'Gilroy',
                            fontWeight: 400,
                            fontSize: '15px',
                        }}
                    >
                        {category.price}₽
                    </Typography>
                ) : null}
            </Box>

            <Stack
                direction='row'
                spacing={2}
                sx={{
                    overflowY: 'hidden',
                    overflowX: 'auto',
                    whiteSpace: 'nowrap',
                    paddingBottom: '8px',
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: 'rgba(73, 106, 110, 0.4)',
                        borderRadius: '4px',
                    },
                    '&::-webkit-scrollbar-track': {
                        backgroundColor: 'rgba(73, 106, 110, 0.2)',
                    },
                    '&::-webkit-scrollbar:horizontal': {
                        display: 'none',
                    },
                }}
            >
                {category.subcategories?.map((sub, idx) => {
                    const isSubcategoryInCart = cart.some(
                        (item) =>
                            item.id === category.id &&
                            item.subcategory?.color === sub.color
                    );

                    return (
                        <Avatar
                            key={idx}
                            src={sub.image_path}
                            alt={sub.name}
                            sx={{
                                cursor: 'pointer',
                                transition: 'transform 0.2s ease-in-out',
                                '&:hover': {
                                    transform: 'scale(1.1)',
                                },
                            }}
                            onMouseEnter={() => handleMouseEnter(sub)}
                            onMouseLeave={handleMouseLeave}
                            onClick={(e) => {
                                e.stopPropagation();
                                const subId = sub.id || sub.color;
                                const isSameAsPreviewed =
                                    previewedSubId === subId;
                                if (isMobile) {
                                    if (!isSameAsPreviewed) {
                                        setActiveSubcategory(sub);
                                        setPreviewedSubId(subId);
                                    } else {
                                        if (isSubcategoryInCart) {
                                            removeFromCart(
                                                `${category.id}-${subId}`
                                            );
                                        } else {
                                            addToCart({
                                                categoryName: category.name,
                                                id: category.id,
                                                subcategory: sub,
                                                price:
                                                    sub.price || category.price,
                                            });
                                        }
                                    }
                                } else {
                                    if (isSubcategoryInCart) {
                                        removeFromCart(
                                            `${category.id}-${subId}`
                                        );
                                    } else {
                                        addToCart({
                                            categoryName: category.name,
                                            id: category.id,
                                            subcategory: sub,
                                            price: sub.price || category.price,
                                        });
                                    }
                                }
                            }}
                        />
                    );
                })}
            </Stack>
        </Card>
    );
};

export default ItemViewer;
