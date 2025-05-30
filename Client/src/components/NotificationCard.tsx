import axios from "axios";
import { useEffect, useState } from "react";
import { jwtDecode, JwtPayload as BaseJwtPayload } from "jwt-decode";

import { IoMdCloseCircle } from "react-icons/io";
type NotificationCardType = {
  isNotificationOpen: boolean;
  setNotificationOpen: (value: boolean) => void;
  setNotificationLength: (value: number) => void;
};
export type Notification = {
  id: number;
  action: string;
  details: string;
  time: string;
  isRead: boolean;
};
interface JwtPayload extends BaseJwtPayload {
  id?: number;
  is_seller?: boolean | string;
}
export default function NotificationCard(props: NotificationCardType) {
  const { isNotificationOpen, setNotificationOpen } = props;
  const token = localStorage.getItem("token");
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const getNotifications = (userId: number) => {
    axios
      .get(`http://localhost:3000/api/notifications/${userId}`)
      .then((res) => {
        const { data } = res.data;
        setNotifications(
          data.map((n: any) => ({
            id: n.id,
            action: n.action,
            details: n.details,
            time: new Date(n.created_at).toLocaleString("it-IT"),
            isRead: n.isRead,
          }))
        );
        console.log(data);
        // Conta solo le notifiche non lette
        const unreadCount = data.filter((n: any) => !n.isRead).length;
        props.setNotificationLength(unreadCount);
      })
      .catch((err) => {
        console.error("Error fetching notifications:", err);
      });
  };
  useEffect(() => {
    if (token) {
      const decode = jwtDecode<JwtPayload>(token);
      const { id } = decode;
      if (id) getNotifications(id);
    }
  }, []);
  // const [notifications, setNotifications] = useState([
  //   {
  //     id: 1,
  //     title: "Nuovo utente registrato",
  //     message: "Mario Rossi si è appena registrato alla piattaforma",
  //     time: "5 minuti fa",
  //     read: false,
  //   },
  //   {
  //     id: 2,
  //     title: "Aggiornamento del sistema",
  //     message: "Il sistema sarà aggiornato alle 03:00 di domani",
  //     time: "1 ora fa",
  //     read: false,
  //   },
  //   {
  //     id: 3,
  //     title: "Nuovo ordine ricevuto",
  //     message: "È stato effettuato un nuovo ordine #12345",
  //     time: "3 ore fa",
  //     read: true,
  //   },
  //   {
  //     id: 1,
  //     title: "Nuovo utente registrato",
  //     message: "Mario Rossi si è appena registrato alla piattaforma",
  //     time: "5 minuti fa",
  //     read: false,
  //   },
  // ]);
  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map((n) => (n.id == id ? { ...n, isRead: true } : n))
    );
  };
  const markReadenAxios = (actionId: number) => {
    axios
      .put(
        `http://localhost:3000/api/notifications/${actionId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        const unreadCount = notifications.filter(
          (notif) => notif.id !== actionId && !notif.isRead
        ).length;
        props.setNotificationLength(unreadCount);
        console.log("Notification marked as read:", res.data);
      })
      .catch((err) => {
        console.error("Error marking notification as read:", err);
      });
  };
  return (
    <div
      className="fixed inset-0 z-40 bg-black/30 transition-opacity duration-300"
      style={{
        opacity: isNotificationOpen ? "1" : "0",
        pointerEvents: isNotificationOpen ? "auto" : "none",
      }}
      onClick={() => {
        setNotificationOpen(false);
      }}
    >
      <div
        className="fixed z-50 bg-white border-2 shadow-lg p-4 
          top-16 right-4 
          w-full max-w-[95%] md:max-w-[450px] lg:max-w-[600px]
          h-auto max-h-[90vh] overflow-y-auto
          max-[480px]:right-0
          transition-all duration-300 ease-in-out"
        style={{
          transform: isNotificationOpen ? "translateX(0)" : "translateX(-20px)",
          opacity: isNotificationOpen ? 1 : 0,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h1 className="font-medium font-[Poppins] uppercase underline">
            Notifications
          </h1>
          <IoMdCloseCircle
            className="text-red-500 text-xl cursor-pointer hover:text-red-700"
            onClick={() => setNotificationOpen(false)}
          />
        </div>
        <div className="my-2">
          {notifications.length > 0 ? (
            notifications.map((n, i) => (
              <div
                key={i}
                className={`py-4 mb-1 border-b hover:bg-gray-50 cursor-pointer ${
                  !n.isRead ? "bg-blue-50" : ""
                }`}
                onClick={() => {
                  if (!n.isRead) {
                    markAsRead(n.id);
                    markReadenAxios(n.id);
                    props.setNotificationLength(
                      notifications.filter((notif) => !notif.isRead).length
                    );
                  }
                }}
              >
                <div className="flex flex-col sm:flex-row sm:justify-between">
                  <h2 className="font-semibold">{n.action}</h2>
                  <span className="text-gray-400 text-sm">{n.time}</span>
                </div>
                <p className="text-gray-400 mt-1">{n.details}</p>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">
              Nessuna notifica
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
