import { Notification } from "../blueprints/socketitem.blueprint";
import { checkTokenValidityAndExpiration } from "./token.middleware";

// this middleware handles websocket and is only meant for notifications
export function wsMiddleware(ws: any, req: any) {
    ws.on('message', (data: string) => {
        // if user does not send his db_id , close connection
        if (!req.query.id){
            ws.close(1008, 'Missing identifier');
        }
        let status: boolean = false;
        // check token status
        try {
            status = checkTokenValidityAndExpiration(req.headers['sec-websocket-key'].slice(7));
        } catch (e) {
            ws.close(1008, 'Missing Token');
        }
        if (!status){
            console.log(status);
            ws.close(1008, 'Token expired');
        }
        // if ping from client
        if (req.query.ping){
            // always respond to the ping
            ws.send('__pong__');
            // if first ping sent from client
            if (req.query.ping == 1){
                let notifications: Notification[] = [];
                // search saved notifications
                req.app.locals.notifications.forEach((notif: Notification, i: number) => {
                    if(notif.id_receive == req.query.id){
                        notifications.push(notif);
                        req.app.locals.notifications.splice(i, 1);
                    }
                });
                //if any is found, send all to the user
                if (notifications.length > 0 ){
                    ws.send(JSON.stringify(notifications));
                }
            }
        }else{
            // if it is a user sending a Notification , add notification to global array
            try {
                let notification: Notification = JSON.parse(data);
                req.app.locals.notifications.push(notification);
            } catch (e) {
                ws.send('error')
            }
        }
    });
};