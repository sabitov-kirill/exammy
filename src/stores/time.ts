// Saitov Kirill, 6/4/2022

export class Time {
    public seconds: number;
    public minutes: number;

    public addSeconds(seconds: number) {
        let newSeconds = seconds + this.seconds;
        if (newSeconds >= 60) {
            this.seconds = newSeconds % 60;
            this.minutes += Math.floor(newSeconds / 60);
        } else {
            this.seconds = newSeconds;
        }
    }

    public static makeString(time: Time) { return `
        ${time.minutes.toLocaleString('en-US', {
            minimumIntegerDigits: 2
        })}:${time.seconds.toLocaleString('en-US', {
            minimumIntegerDigits: 2
        })}
    `}

    public static makeInt(time: Time) { return (
        time.minutes * 60 + time.seconds
    )}

    constructor(initialSeconds: number = 0, initialMinutes: number = 0) {
        this.seconds = initialSeconds;
        this.minutes = initialMinutes;
    }
}