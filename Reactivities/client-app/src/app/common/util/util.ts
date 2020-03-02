export const combineDateAndTime = (date: Date, time: Date): Date => {
    const timeString = time.getHours().toString().padStart(2, '0') + ':' + time.getMinutes().toString().padStart(2, '0') + ':00';
    const dateString = date.getFullYear() + ' ' + date.getMonth().toString().padStart(2, '0') + ' ' + date.getDate().toString().padStart(2, '0');
    return new Date(dateString + ' ' + timeString);
};