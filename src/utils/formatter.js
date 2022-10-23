// формат под денежные еденицы РФ
export function priceFormatter(element) {
    return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
        maximumFractionDigits: 0,
    }).format(element)
}