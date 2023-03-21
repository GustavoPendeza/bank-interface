export function FormatNumber(number: Number) {
    const formattedNumber = number.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')

    return formattedNumber;
}