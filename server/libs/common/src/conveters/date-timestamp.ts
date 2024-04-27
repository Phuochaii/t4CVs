import { Timestamp } from "google/protobuf/timestamp";

export class DateTimestampConverter {
    static fromTimestamp(timestamp: Timestamp): Date {
        return new Date(timestamp.seconds * 1000 + timestamp.nanos / 1000000);
    }
    static toTimestamp(date: Date): Timestamp {
        const seconds = Math.floor(date.getTime() / 1000);
        const nanos = (date.getTime() % 1000) * 1000000;
        return { seconds, nanos };
    }
}