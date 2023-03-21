export function generateProgressPercentage(money: number, goal: number) {
    const percentage = Math.round((money / goal) * 100)

    return percentage;
}