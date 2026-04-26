'use client';

import Image from 'next/image';
import styles from './page.module.css';
import { Sen, Pacifico } from 'next/font/google';
import LogoIcon from '../public/logomark.svg';
import BagIcon from '../public/shopping-bag.svg';
import InstagramIcon from '../public/instagram.svg';
import VkIcon from '../public/vk.svg';
import TelegramIcon from '../public/telegram.svg';
import Filters from '@/components/Filters';
import jsonData from '@/data/info.json';
import ItemViewer from '@/components/Item';
import { useState, useContext } from 'react';
import {
    Typography,
    Box,
    Link,
    IconButton,
    Drawer,
    Button,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    ButtonGroup,
    Divider,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
} from '@mui/material';
import { CartContext } from '../pages/context/CartContext';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import sendOrderToTelegram from '@/pages/api/sendOrderToTelegram';

const sen = Sen({
    subsets: ['latin'],
    weight: ['700'],
});

const pacifico = Pacifico({
    subsets: ['cyrillic'],
    weight: ['400'],
});

export default function Home() {
    const [category, setCategory] = useState('');
    const [color, setColor] = useState('');
    const [priceRange, setPriceRange] = useState([0, 400]);
    const {
        cart,
        open,
        setOpen,
        cartTotal,
        clearCart,
        removeFromCart,
        updateQuantity,
    } = useContext(CartContext);

    const [dialogOpen, setDialogOpen] = useState(false);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    const [openWhoWeAre, setOpenWhoWeAre] = useState(false);
    const [openVacancies, setOpenVacancies] = useState(false);
    const [openReturns, setOpenReturns] = useState(false);
    const [openDelivery, setOpenDelivery] = useState(false);
    const [openContacts, setOpenContacts] = useState(false);

    const handleOrderSubmit = () => {
        if (!name || !phone) {
            alert('Пожалуйста, заполните все поля!');
            return;
        }

        sendOrderToTelegram(cart, cartTotal, name, phone);

        setDialogOpen(false);
        clearCart();
        setName('');
        setPhone('');
        alert('Ваш заказ успешно оформлен!');
    };

    return (
        <>
            <Drawer
                anchor='right'
                open={open}
                onClose={() => setOpen(!open)}
                PaperProps={{
                    sx: {
                        boxSizing: 'border-box',
                        padding: '16px',
                        width: {
                            xs: '100vw',
                            sm: '60vw',
                            md: '40vw',
                            lg: '40vw',
                        },
                        display: 'flex',
                        flexDirection: 'column',
                        maxHeight: '100vh',
                    },
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Typography
                        sx={{
                            fontFamily: 'Gilroy',
                            fontWeight: 700,
                            fontSize: 'clamp(16px, 2vw, 20px)',
                        }}
                    >
                        Корзина
                    </Typography>
                    <IconButton
                        onClick={() => setOpen(false)}
                        sx={{
                            color: '#1B2628',
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </Box>
                {cart.length > 0 ? (
                    <Box
                        sx={{
                            display: 'flex',
                            flexGrow: 1,
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                        }}
                    >
                        <List
                            sx={{
                                overflow: 'auto',
                            }}
                        >
                            {cart.map((item, index) => (
                                <ListItem
                                    key={index}
                                    alignItems='flex-start'
                                    secondaryAction={
                                        <IconButton
                                            edge='end'
                                            onClick={() =>
                                                removeFromCart(item.uniqueId)
                                            }
                                        >
                                            <DeleteOutlineIcon />
                                        </IconButton>
                                    }
                                    sx={{ mb: 1 }}
                                >
                                    <ListItemAvatar>
                                        <Avatar
                                            alt={
                                                item.subcategory
                                                    ? item.subcategory.name
                                                    : item.categoryName
                                            }
                                            src={
                                                item.subcategory
                                                    ? item.subcategory
                                                          .image_path
                                                    : item.image_path
                                            }
                                            variant='rounded'
                                            sx={{
                                                width: 60,
                                                height: 60,
                                                mr: 2,
                                            }}
                                        />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primaryTypographyProps={{
                                            component: 'div',
                                        }}
                                        secondaryTypographyProps={{
                                            component: 'div',
                                        }}
                                        primary={
                                            <Typography
                                                component='span'
                                                sx={{
                                                    fontFamily: 'Gilroy',
                                                    fontWeight: 600,
                                                    fontSize:
                                                        'clamp(14px, 2vw, 16px)',
                                                }}
                                            >
                                                {item.categoryName}{' '}
                                                {item.subcategory && (
                                                    <>
                                                        {' - '}
                                                        {
                                                            item.subcategory
                                                                .color
                                                        }{' '}
                                                    </>
                                                )}
                                            </Typography>
                                        }
                                        secondary={
                                            <Box component='div' sx={{ mt: 1 }}>
                                                <Typography
                                                    component='div'
                                                    sx={{
                                                        fontFamily: 'Gilroy',
                                                        fontSize:
                                                            'clamp(14px, 2vw, 16px)',
                                                    }}
                                                >
                                                    {item.subcategory.price
                                                        ? item.subcategory.price
                                                        : item.price}{' '}
                                                    ₽{' '}
                                                </Typography>
                                                <ButtonGroup
                                                    size='small'
                                                    sx={{ mt: 1 }}
                                                >
                                                    <Button
                                                        onClick={() =>
                                                            updateQuantity(
                                                                item.uniqueId,
                                                                item.quantity -
                                                                    1
                                                            )
                                                        }
                                                        disabled={
                                                            item.quantity <= 1
                                                        }
                                                    >
                                                        <RemoveIcon fontSize='small' />
                                                    </Button>
                                                    <Button disabled>
                                                        {item.quantity}
                                                    </Button>
                                                    <Button
                                                        onClick={() =>
                                                            updateQuantity(
                                                                item.uniqueId,
                                                                item.quantity +
                                                                    1
                                                            )
                                                        }
                                                    >
                                                        <AddIcon fontSize='small' />
                                                    </Button>
                                                </ButtonGroup>
                                            </Box>
                                        }
                                    />
                                </ListItem>
                            ))}
                        </List>

                        <Box>
                            <Divider sx={{ mb: 2 }} />
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontFamily: 'Gilroy',
                                        fontWeight: 600,
                                        marginBottom: '8px',
                                    }}
                                >
                                    Итого:
                                </Typography>
                                <Typography
                                    sx={{
                                        fontFamily: 'Gilroy',
                                        fontWeight: 600,
                                    }}
                                >
                                    {cartTotal}₽
                                </Typography>
                            </Box>
                            <Button
                                variant='contained'
                                fullWidth
                                sx={{
                                    mb: 1,
                                    bgcolor: '#177F8D',
                                    '&:hover': { bgcolor: '#38565A' },
                                    fontFamily: 'Gilroy',
                                    fontWeight: 600,
                                    fontSize: 'clamp(12px, 2vw, 16px)',
                                }}
                                onClick={() => {
                                    setDialogOpen(true);
                                }}
                            >
                                Оформить заказ
                            </Button>
                            <Button
                                variant='outlined'
                                fullWidth
                                onClick={clearCart}
                                sx={{
                                    color: '#177F8D',
                                    borderColor: '#177F8D',
                                    '&:hover': {
                                        borderColor: '#38565A',
                                        bgcolor: 'rgba(73, 106, 110, 0.2)',
                                    },
                                    fontFamily: 'Gilroy',
                                    fontWeight: 600,
                                    fontSize: 'clamp(12px, 2vw, 16px)',
                                }}
                            >
                                Очистить корзину
                            </Button>
                        </Box>
                    </Box>
                ) : (
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '50vh',
                        }}
                    >
                        <ShoppingCartIcon
                            sx={{ fontSize: 60, color: '#9E9E9E', mb: 2 }}
                        />
                        <Typography
                            sx={{
                                fontFamily: 'Gilroy',
                                color: '#9E9E9E',
                                mb: 1,
                            }}
                        >
                            Ваша корзина пуста
                        </Typography>
                        <Typography
                            sx={{
                                fontFamily: 'Gilroy',
                                color: '#9E9E9E',
                                textAlign: 'center',
                            }}
                        >
                            Добавьте товары в корзину, чтобы оформить заказ
                        </Typography>
                        <Button
                            variant='contained'
                            onClick={() => setOpen(!open)}
                            sx={{
                                mt: 3,
                                bgcolor: '#496A6E',
                                '&:hover': { bgcolor: '#38565A' },
                            }}
                        >
                            <Typography
                                sx={{
                                    fontFamily: 'Gilroy',
                                    textAlign: 'center',
                                }}
                            >
                                Продолжить покупки
                            </Typography>
                        </Button>
                    </Box>
                )}
            </Drawer>

            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
                <DialogTitle>
                    <Typography sx={{ fontFamily: 'Gilroy', fontWeight: 600 }}>
                        Введите данные для заказа
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin='dense'
                        label='Имя'
                        type='text'
                        fullWidth
                        variant='outlined'
                        value={name}
                        InputProps={{
                            sx: {
                                fontFamily: 'Gilroy',
                                fontWeight: 500,
                            },
                        }}
                        InputLabelProps={{
                            sx: {
                                fontFamily: 'Gilroy',
                                fontWeight: 500,
                            },
                        }}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        margin='dense'
                        label='Номер телефона'
                        type='tel'
                        fullWidth
                        variant='outlined'
                        value={phone}
                        InputProps={{
                            sx: {
                                fontFamily: 'Gilroy',
                                fontWeight: 500,
                            },
                        }}
                        InputLabelProps={{
                            sx: {
                                fontFamily: 'Gilroy',
                                fontWeight: 500,
                            },
                        }}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialogOpen(false)}>
                        <Typography
                            sx={{ fontFamily: 'Gilroy', fontWeight: 500 }}
                        >
                            Отмена
                        </Typography>
                    </Button>
                    <Button onClick={handleOrderSubmit}>
                        <Typography
                            sx={{ fontFamily: 'Gilroy', fontWeight: 500 }}
                        >
                            Отправить
                        </Typography>
                    </Button>
                </DialogActions>
            </Dialog>

            <div>
                <header
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            gap: '4px',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <LogoIcon />
                        <div
                            style={{
                                color: '#177F8D',
                                fontSize: 'clamp(14px, 2vw, 20px)',
                            }}
                        >
                            <span
                                className={sen.className}
                                style={{ fontWeight: 700 }}
                            >
                                Flowers
                            </span>
                            <span
                                className={sen.className}
                                style={{ fontWeight: 700 }}
                            >
                                {' '}
                                |{' '}
                            </span>
                            <span
                                style={{
                                    fontFamily: 'Gilroy',
                                    fontWeight: 700,
                                }}
                            >
                                Упаковка
                            </span>
                        </div>
                    </div>
                    <IconButton
                        onClick={() => setOpen(!open)}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <BagIcon />
                    </IconButton>
                </header>
                <section
                    style={{
                        marginTop: '10vw',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '48px',
                        justifyContent: 'center',
                    }}
                >
                    <p
                        className={pacifico.className}
                        style={{
                            fontSize: 'clamp(40px, 7vw, 80px)',
                            fontWeight: 400,
                            textAlign: 'center',
                        }}
                    >
                        Мы сделаем ваши
                        <br /> букеты ещё красивее
                    </p>
                    <Image
                        src='/1.png'
                        alt='start'
                        style={{ width: '100%', height: 'auto' }}
                    />
                </section>
                <section style={{ marginTop: '10vh' }}>
                    <Filters
                        category={category}
                        setCategory={setCategory}
                        color={color}
                        setColor={setColor}
                        priceRange={priceRange}
                        setPriceRange={setPriceRange}
                    />
                    <ItemViewer
                        category={category}
                        color={color}
                        priceRange={priceRange}
                        data={jsonData}
                    />
                </section>
                <Box
                    component='footer'
                    sx={{
                        display: 'flex',
                        flexDirection: {
                            xs: 'column',
                            sm: 'row',
                            md: 'row',
                            lg: 'row',
                        },
                        justifyContent: 'space-between',
                        marginTop: '15vh',
                        gap: { xs: '20px' },
                    }}
                >
                    <div>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                marginBottom: '12px',
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    height: '100%',
                                }}
                            >
                                <LogoIcon />
                                <div
                                    style={{
                                        color: '#177F8D',
                                        fontSize: 'clamp(14px, 2vw, 20px)',
                                    }}
                                >
                                    <span
                                        className={sen.className}
                                        style={{ fontWeight: 700 }}
                                    >
                                        Flowers
                                    </span>
                                    <span
                                        className={sen.className}
                                        style={{ fontWeight: 700 }}
                                    >
                                        {' '}
                                        |{' '}
                                    </span>
                                    <span
                                        style={{
                                            fontFamily: 'Gilroy',
                                            fontWeight: 700,
                                        }}
                                    >
                                        Упаковка
                                    </span>
                                </div>
                            </div>
                        </Box>
                        <div
                            style={{
                                display: 'flex',
                                gap: '12px',
                                alignItems: 'space-between',
                            }}
                        >
                            <Box
                                component={Link}
                                href='https://www.instagram.com/flowers_upak.ovka?igsh=bXczdXcydTVia2t3&utm_source=qr'
                                sx={{
                                    color: 'transparent',
                                    '&:hover': {
                                        filter: 'brightness(1.3) saturate(150%)',
                                    },
                                }}
                            >
                                <InstagramIcon
                                    style={{ fill: 'currentColor' }}
                                />
                            </Box>
                            <Box
                                component={Link}
                                href='https://vk.com/club230484001'
                                sx={{
                                    color: 'transparent',
                                    '&:hover': {
                                        filter: 'brightness(1.3) saturate(150%)',
                                    },
                                }}
                            >
                                <VkIcon style={{ fill: 'currentColor' }} />
                            </Box>
                            <Box
                                component={Link}
                                href='https://t.me/flowersupakovka'
                                sx={{
                                    color: 'transparent',
                                    '&:hover': {
                                        filter: 'brightness(1.3) saturate(150%)',
                                    },
                                }}
                            >
                                <TelegramIcon
                                    style={{ fill: 'currentColor' }}
                                />
                            </Box>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '48px' }}>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '8px',
                            }}
                        >
                            <Typography
                                sx={{
                                    lineHeight: '20px',
                                    color: '#1B2628',
                                    fontFamily: 'Gilroy',
                                    fontWeight: 500,
                                    fontSize: 'clamp(12px, 2vw, 18px)',
                                    paddingBottom: '6px',
                                }}
                            >
                                Покупателям
                            </Typography>
                            <Typography
                                sx={{
                                    lineHeight: '20px',
                                    color: '#142B2E9E',
                                    fontFamily: 'Gilroy',
                                    fontWeight: 500,
                                    fontSize: 'clamp(12px, 2vw, 18px)',
                                    opacity: 0.62,
                                    cursor: 'pointer',
                                    '&:hover': { color: '#000000' },
                                }}
                                onClick={() => setOpenReturns(true)}
                            >
                                Бонусная система
                            </Typography>
                            <Typography
                                sx={{
                                    lineHeight: '20px',
                                    color: '#142B2E9E',
                                    fontFamily: 'Gilroy',
                                    fontWeight: 500,
                                    fontSize: 'clamp(12px, 2vw, 18px)',
                                    opacity: 0.62,
                                    cursor: 'pointer',
                                    '&:hover': { color: '#000000' },
                                }}
                                onClick={() => setOpenDelivery(true)}
                            >
                                Доставка
                            </Typography>
                            <Typography
                                sx={{
                                    lineHeight: '20px',
                                    color: '#142B2E9E',
                                    fontFamily: 'Gilroy',
                                    fontWeight: 500,
                                    fontSize: 'clamp(12px, 2vw, 18px)',
                                    opacity: 0.62,
                                    cursor: 'pointer',
                                    '&:hover': { color: '#000000' },
                                }}
                                onClick={() => setOpenContacts(true)}
                            >
                                Контакты
                            </Typography>
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '8px',
                            }}
                        >
                            <Typography
                                sx={{
                                    lineHeight: '20px',
                                    color: '#1B2628',
                                    fontFamily: 'Gilroy',
                                    fontWeight: 500,
                                    fontSize: 'clamp(12px, 2vw, 18px)',
                                    paddingBottom: '6px',
                                }}
                            >
                                О нас
                            </Typography>
                            <Typography
                                sx={{
                                    lineHeight: '20px',
                                    color: '#142B2E9E',
                                    fontFamily: 'Gilroy',
                                    fontWeight: 500,
                                    fontSize: 'clamp(12px, 2vw, 18px)',
                                    opacity: 0.62,
                                    cursor: 'pointer',
                                    '&:hover': { color: '#000000' },
                                }}
                                onClick={() => setOpenWhoWeAre(true)}
                            >
                                Кто мы?
                            </Typography>
                            <Typography
                                sx={{
                                    lineHeight: '20px',
                                    color: '#142B2E9E',
                                    fontFamily: 'Gilroy',
                                    fontWeight: 500,
                                    fontSize: 'clamp(12px, 2vw, 18px)',
                                    opacity: 0.62,
                                    cursor: 'pointer',
                                    '&:hover': { color: '#000000' },
                                }}
                                onClick={() => setOpenVacancies(true)}
                            >
                                Вакансии
                            </Typography>
                        </div>
                    </div>
                </Box>
            </div>

            <Dialog
                open={openWhoWeAre}
                onClose={() => setOpenWhoWeAre(false)}
                sx={{ padding: '1vw' }}
            >
                <DialogTitle>
                    <Typography
                        sx={{
                            fontFamily: 'Gilroy',
                            fontWeight: 700,
                            fontSize: 'clamp(16px, 2vw, 20px)',
                        }}
                    >
                        Кто мы?
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Typography
                        sx={{
                            fontFamily: 'Gilroy',
                            fontWeight: 500,
                            fontSize: 'clamp(12px, 2vw, 16px)',
                            paddingBottom: '16px',
                        }}
                    >
                        Мы — команда профессионалов, которая специализируется на
                        поставке качественных материалов для упаковки цветов.
                        Наша компания создана для того, чтобы помочь флористам,
                        цветочным салонам и дизайнерам создавать незабываемые
                        цветочные композиции, понимая, что красивая упаковка —
                        это финальный штрих, который превращает букет в
                        произведение искусства.
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: 'Gilroy',
                            fontWeight: 500,
                            fontSize: 'clamp(12px, 2vw, 16px)',
                            paddingBottom: '16px',
                        }}
                    >
                        Мы тщательно отбираем каждый материал, работая только с
                        проверенными поставщиками, чтобы наша упаковка была не
                        только красивой, но и надежной. В нашем каталоге
                        представлены сотни видов упаковочных материалов — от
                        классических вариантов до самых модных трендов
                        флористического дизайна. Мы следим за мировыми
                        тенденциями и регулярно обновляем ассортимент, предлагая
                        персональные консультации каждому клиенту.
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: 'Gilroy',
                            fontWeight: 500,
                            fontSize: 'clamp(12px, 2vw, 16px)',
                            paddingBottom: '16px',
                        }}
                    >
                        Мы готовы работать с флористическими салонами,
                        свадебными агентствами, дизайнерами интерьеров и
                        организаторами мероприятий, а также помочь начинающим
                        флористам и всем, кто создает букеты для себя и близких.
                        Каждый заказ для нас — это возможность помочь создать
                        момент радости и красоты в чьей-то жизни, ведь мы знаем,
                        что за каждым букетом стоят важные эмоции и особенные
                        моменты.
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: 'Gilroy',
                            fontSize: 'clamp(12px, 2vw, 16px)',
                            fontWeight: 700,
                        }}
                    >
                        Доверьте нам упаковку ваших цветов — мы поможем сделать
                        каждый букет неповторимым.
                    </Typography>
                </DialogContent>
            </Dialog>

            <Dialog
                open={openVacancies}
                onClose={() => setOpenVacancies(false)}
            >
                <DialogTitle>
                    <Typography
                        sx={{
                            fontFamily: 'Gilroy',
                            fontWeight: 700,
                            fontSize: 'clamp(16px, 2vw, 20px)',
                        }}
                    >
                        Вакансии
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Typography
                        sx={{
                            fontFamily: 'Gilroy',
                            fontWeight: 500,
                            fontSize: 'clamp(12px, 2vw, 16px)',
                            paddingBottom: '16px',
                        }}
                    >
                        Наша команда растет, и мы ищем энтузиастов, которые
                        разделяют нашу любовь к красоте и качеству! Если вы
                        хотите работать в динамично развивающейся компании и
                        помогать создавать прекрасные цветочные композиции,
                        присоединяйтесь к нам.
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: 'Gilroy',
                            fontWeight: 500,
                            fontSize: 'clamp(12px, 2vw, 16px)',
                            paddingBottom: '16px',
                        }}
                    >
                        Сейчас мы ищем на постоянную работу двух специалистов:
                        продавца для работы с клиентами и консультирования по
                        ассортименту упаковочных материалов, а также специалиста
                        по раскладке товара, который будет поддерживать порядок
                        в торговом зале и на складе, обеспечивая удобное
                        размещение продукции.
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: 'Gilroy',
                            fontWeight: 700,
                            fontSize: 'clamp(12px, 2vw, 16px)',
                        }}
                    >
                        По всем вопросам трудоустройства обращайтесь по
                        телефону, указанному в разделе контактов. Будем рады
                        познакомиться с вами!
                    </Typography>
                </DialogContent>
            </Dialog>

            <Dialog open={openReturns} onClose={() => setOpenReturns(false)}>
                <DialogTitle>
                    <Typography
                        sx={{
                            fontFamily: 'Gilroy',
                            fontWeight: 700,
                            fontSize: 'clamp(16px, 2vw, 20px)',
                        }}
                    >
                        Бонусная система
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Typography
                        sx={{
                            fontFamily: 'Gilroy',
                            fontWeight: 500,
                            fontSize: 'clamp(12px, 2vw, 16px)',
                            paddingBottom: '16px',
                        }}
                    >
                        Мы ценим каждого клиента и хотим сделать ваши покупки
                        еще более выгодными! Специально для вас мы разработали
                        простую и понятную бонусную программу.
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: 'Gilroy',
                            fontWeight: 500,
                            fontSize: 'clamp(12px, 2vw, 16px)',
                            paddingBottom: '16px',
                        }}
                    >
                        За каждый рубль, потраченный в нашем магазине, вы
                        получаете 1 бонус на свой личный счет. Накопленные
                        бонусы — это ваша реальная экономия на будущих покупках.
                        Чем больше покупаете, тем больше экономите!
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: 'Gilroy',
                            fontWeight: 500,
                            fontSize: 'clamp(12px, 2vw, 16px)',
                            paddingBottom: '16px',
                        }}
                    >
                        Использовать накопленные бонусы очень просто: вы можете
                        оплатить ими до 30% от стоимости любого заказа, а
                        оставшуюся сумму доплатить деньгами. Это значит, что
                        каждая третья покупка может стать значительно дешевле
                        благодаря вашим накоплениям.
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: 'Gilroy',
                            fontWeight: 700,
                            fontSize: 'clamp(12px, 2vw, 16px)',
                        }}
                    >
                        Начните экономить уже с первой покупки — ваша выгода
                        растет вместе с нами!
                    </Typography>
                </DialogContent>
            </Dialog>

            <Dialog open={openDelivery} onClose={() => setOpenDelivery(false)}>
                <DialogTitle>
                    <Typography
                        sx={{
                            fontFamily: 'Gilroy',
                            fontWeight: 700,
                            fontSize: 'clamp(16px, 2vw, 20px)',
                        }}
                    >
                        Доставка
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Typography
                        sx={{
                            fontFamily: 'Gilroy',
                            fontWeight: 500,
                            fontSize: 'clamp(12px, 2vw, 16px)',
                            paddingBottom: '16px',
                        }}
                    >
                        Мы доставляем упаковочные материалы для цветов быстро и
                        надежно, чтобы ваши заказы всегда приходили в срок и в
                        отличном состоянии.
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: 'Gilroy',
                            fontWeight: 500,
                            fontSize: 'clamp(12px, 2vw, 16px)',
                            paddingBottom: '16px',
                        }}
                    >
                        По Москве и Московской области мы осуществляем доставку
                        через сервис Яндекс.Доставка. Это удобный и быстрый
                        способ получить ваш заказ в удобное время. Курьер
                        привезет товар прямо к вашей двери, а вы сможете
                        отслеживать статус доставки в режиме реального времени.
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: 'Gilroy',
                            fontWeight: 500,
                            fontSize: 'clamp(12px, 2vw, 16px)',
                            paddingBottom: '16px',
                        }}
                    >
                        В другие регионы России мы отправляем заказы надежными
                        транспортными компаниями. Тщательно упаковываем каждый
                        товар, чтобы он добрался до вас в идеальном состоянии.
                        Сроки доставки зависят от региона и выбранной
                        транспортной компании — подробную информацию мы
                        предоставим при оформлении заказа.
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: 'Gilroy',
                            fontWeight: 500,
                            fontSize: 'clamp(12px, 2vw, 16px)',
                            paddingBottom: '16px',
                        }}
                    >
                        Стоимость доставки рассчитывается индивидуально в
                        зависимости от веса, объема заказа и региона доставки.
                        Точную сумму вы узнаете на этапе оформления заказа до
                        его подтверждения.
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: 'Gilroy',
                            fontWeight: 500,
                            fontSize: 'clamp(12px, 2vw, 16px)',
                        }}
                    >
                        Если у вас есть вопросы по доставке или нужна помощь с
                        выбором оптимального способа получения заказа, наши
                        менеджеры всегда готовы помочь. Обращайтесь!
                    </Typography>
                </DialogContent>
            </Dialog>

            <Dialog open={openContacts} onClose={() => setOpenContacts(false)}>
                <DialogTitle>
                    <Typography
                        sx={{
                            fontFamily: 'Gilroy',
                            fontWeight: 700,
                            fontSize: 'clamp(16px, 2vw, 20px)',
                        }}
                    >
                        Контакты
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Typography
                        sx={{
                            fontFamily: 'Gilroy',
                            fontWeight: 500,
                            fontSize: 'clamp(12px, 2vw, 16px)',
                            paddingBottom: '16px',
                        }}
                    >
                        Мы всегда готовы ответить на ваши вопросы и помочь с
                        выбором упаковочных материалов. Свяжитесь с нами удобным
                        для вас способом!
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: 'Gilroy',
                            fontWeight: 700,
                            fontSize: 'clamp(12px, 2vw, 16px)',
                            paddingBottom: '16px',
                        }}
                    >
                        Телефон: 8 (910) 475-44-15. Также вы можете написать по
                        этому номеру на WhatsApp и Telegram
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: 'Gilroy',
                            fontWeight: 500,
                            fontSize: 'clamp(12px, 2vw, 16px)',
                        }}
                    >
                        Обращайтесь в любое удобное время — мы стараемся
                        отвечать максимально быстро!
                    </Typography>
                </DialogContent>
            </Dialog>
        </>
    );
}
