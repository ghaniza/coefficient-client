const dateToTimespan = (date?: Date, ref = new Date()) => {
    if (!date) return '';

    const diff = (new Date(ref).getTime() - new Date(date).getTime()) / 1000;

    if (diff < 60) {
        return `a few secs ago`;
    }
    if (diff < 3_600) {
        const minutes = Math.floor(diff / 60);
        return `${minutes} min${minutes > 1 ? 's' : ''} ago`;
    }
    if (diff < 86_400) {
        const hours = Math.floor(diff / 3_600);
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    }
    if (diff < 86_400 * 7) {
        const days = Math.floor(diff / 86_400);
        return `${days} day${days > 1 ? 's' : ''} ago`;
    }

    const options: any = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    return new Date(date).toLocaleDateString(undefined, options);
};

export default dateToTimespan;
