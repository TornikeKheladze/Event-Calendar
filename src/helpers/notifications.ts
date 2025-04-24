import notifee, {
  AndroidImportance,
  RepeatFrequency,
  TimestampTrigger,
  TriggerType,
} from "@notifee/react-native";
import { Event } from "../types/types";

const NOTIFICATION_CHANNEL_ID = "event_reminders";

async function setupNotificationChannel() {
  await notifee.createChannel({
    id: NOTIFICATION_CHANNEL_ID,
    name: "Event Reminders",
    importance: AndroidImportance.HIGH,
  });
}

export async function scheduleEventNotification(event: Event) {
  await setupNotificationChannel();

  const triggerTime = new Date(event.startDate);
  triggerTime.setMinutes(triggerTime.getMinutes() - 2);

  const notificationId = `event-${event.id}`;

  await notifee.requestPermission();
  const notificationConfig = {
    id: notificationId,
    title: event.name,
    body: `At ${event.address}`,
    data: {
      event: JSON.stringify({
        ...event,
        startDate: event.startDate.toISOString(),
        endDate: event.endDate.toISOString(),
      }),
    },
    android: {
      channelId: NOTIFICATION_CHANNEL_ID,
      pressAction: {
        id: "default",
      },
    },
  };
  const trigger: TimestampTrigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: triggerTime.getTime(),
    repeatFrequency:
      event.repeatType === "day"
        ? RepeatFrequency.DAILY
        : event.repeatType === "week"
        ? RepeatFrequency.WEEKLY
        : undefined,
  };

  await notifee.createTriggerNotification(notificationConfig, trigger);

  return notificationId;
}

export const getScheduledNotifications: () => Promise<Event[]> = async () => {
  const notifications = (await notifee.getTriggerNotifications()).map((n) => {
    const data = (n.notification.data?.event as string) || "{}";
    return JSON.parse(data);
  });
  console.log("Scheduled Notifications:", notifications);
  return notifications;
};

export const deleteAllEventNotifications = async () => {
  try {
    const notifications = await getScheduledNotifications();

    const eventIds = notifications.map((notif) => notif.id!);

    await notifee.cancelTriggerNotifications();

    console.log(`Deleted ${eventIds.length} event notifications`);
    return { success: true, count: eventIds.length };
  } catch (error) {
    console.error("Failed to delete events:", error);
    return { success: false, error };
  }
};

export const checkEventOverlap = (events: Event[], event: Event) => {
  return events.some((e) => {
    const existingStart = new Date(e.startDate).getTime();
    const existingEnd = new Date(e.endDate).getTime();
    const newStart = new Date(event.startDate).getTime();
    const newEnd = new Date(event.endDate).getTime();

    console.log(
      new Date(e.startDate).toString(),
      new Date(e.endDate).toString()
    );
    console.log(
      new Date(event.startDate).toString(),
      new Date(event.endDate).toString()
    );

    return (
      (newStart >= existingStart && newStart < existingEnd) ||
      (newEnd > existingStart && newEnd <= existingEnd) ||
      (newStart <= existingStart && newEnd >= existingEnd)
    );
  });
};
