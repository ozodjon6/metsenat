export const statusSponsors = (status: string) => {
    if (status === 'Yangi') {
        return 'new-text'
    } else if (status === 'Moderatsiyada') {
        return 'in-moderation-text'
    } else if (status === 'Bekor qilingan') {
        return 'canceled-text'
    } else {
        return 'confirmed-text'
    }
};