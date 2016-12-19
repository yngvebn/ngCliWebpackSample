export class NotificationPreference {
    static none = 'none';
    static onlyEmail = 'onlyEmail';
    static onlySms = 'onlySms';
    static emailAndSms = 'emailAndSms';

    public static get(wantsEmail: boolean, wantsSms: boolean) {
        if (wantsEmail && wantsSms) return NotificationPreference.emailAndSms;
        if (wantsEmail) return NotificationPreference.onlyEmail;
        if (wantsSms) return NotificationPreference.onlySms;

        return NotificationPreference.none;
    }
}