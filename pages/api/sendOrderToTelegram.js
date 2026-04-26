const sendOrderToTelegram = async (cart, total, name, phone) => {
    const botToken = process.env.BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    const apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

    const message = `
    🛒 Новый заказ:
    ${cart
        .map(
            (item, index) =>
                `${index + 1}. ${item.categoryName}${
                    item.subcategory ? ` (${item.subcategory.color})` : ''
                } - ${item.quantity} шт. - ${item.price}₽`
        )
        .join('\n')}

    📦 Имя: ${name}
    📞 Телефон: ${phone}
    
    💰 Итого: ${total}₽
    `;

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
            }),
        });

        if (!response.ok) {
            throw new Error('Ошибка при отправке заказа в Telegram');
        }

        console.log('Заказ успешно отправлен в Telegram');
    } catch (error) {
        console.error('Ошибка отправки заказа:', error);
    }
};

export default sendOrderToTelegram;
