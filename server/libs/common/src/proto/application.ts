/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "notification";

/** The request message containing the users id. */
export interface User {
  id: number;
}

export interface SendNotificationRequest {
  title: string;
  content: string;
  link: string;
  users: User[];
}

/** The response message containing the greetings */
export interface SendNotificationResponse {
}

export const NOTIFICATION_PACKAGE_NAME = "notification";

/** The job application service definition. */

export interface NotificationServiceClient {
  sendNotification(request: SendNotificationRequest): Observable<SendNotificationResponse>;
}

/** The job application service definition. */

export interface NotificationServiceController {
  sendNotification(
    request: SendNotificationRequest,
  ): Promise<SendNotificationResponse> | Observable<SendNotificationResponse> | SendNotificationResponse;
}

export function NotificationServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["sendNotification"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("NotificationService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("NotificationService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const NOTIFICATION_SERVICE_NAME = "NotificationService";