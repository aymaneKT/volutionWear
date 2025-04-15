import {  useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
type NotificationCardType = {
  isNotificationOpen: boolean;
  setNotificationOpen: (value: boolean) => void;
};
export default function NotificationCard(props: NotificationCardType) {
  const { isNotificationOpen, setNotificationOpen } = props;

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Nuovo utente registrato",
      message: "Mario Rossi si è appena registrato alla piattaforma",
      time: "5 minuti fa",
      read: false,
    },
    {
      id: 2,
      title: "Aggiornamento del sistema",
      message: "Il sistema sarà aggiornato alle 03:00 di domani",
      time: "1 ora fa",
      read: false,
    },
    {
      id: 3,
      title: "Nuovo ordine ricevuto",
      message: "È stato effettuato un nuovo ordine #12345",
      time: "3 ore fa",
      read: true,
    },
    {
      id: 1,
      title: "Nuovo utente registrato",
      message: "Mario Rossi si è appena registrato alla piattaforma",
      time: "5 minuti fa",
      read: false,
    },
  ]);
  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map((n) => (n.id == id ? { ...n, read: true } : n))
    );
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
                  !n.read ? "bg-blue-50" : ""
                }`}
                onClick={() => {
                  markAsRead(n.id);
                }}
              >
                <div className="flex flex-col sm:flex-row sm:justify-between">
                  <h2 className="font-semibold">{n.title}</h2>
                  <span className="text-gray-400 text-sm">{n.time}</span>
                </div>
                <p className="text-gray-400 mt-1">{n.message}</p>
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
