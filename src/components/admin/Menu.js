import { role } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

const menuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: "/home.png",
        label: "Home",
        href: "/admin",
        visible: ["admin"],
      },
      {
        icon: "/shop.png",
        label: "Canteens",
        href: "/list/canteens",
        visible: ["admin"],
      },
      {
        icon: "/customer.png",
        label: "Customers",
        href: "/list/students",
        visible: ["admin"],
      },
      {
        icon: "/manager.png",
        label: "Managers",
        href: "/list/managers",
        visible: ["admin"],
      },
      {
        icon: "/delivery.png",
        label: "Delivery Service",
        href: "/list/subjects",
        visible: ["admin"],
      },
      {
        icon: "/payment.png",
        label: "Payments",
        href: "/list/lessons",
        visible: ["admin"],
      },
      {
        icon: "/reviews.png",
        label: "Reviews",
        href: "/list/messages",
        visible: ["admin"],
      },
      {
        icon: "/announcement.png",
        label: "Announcements",
        href: "/list/announcements",
        visible: ["admin"],
      },
      {
        icon: "/menu.png",
        label: "Inventory",
        href: "/admin/inventory",
        visible: ["admin"],
      },
      {
        icon: "/capacity.png",
        label: "Stock Monitoring",
        href: "/admin/inventory-monitoring",
        visible: ["admin"],
      },
      {
        icon: "/finance.png",
        label: "Analytics",
        href: "/admin/analytics",
        visible: ["admin"],
      },
    ],
  },
  {
    title: "OTHER",
    items: [
      {
        icon: "/profile.png",
        label: "Profile",
        href: "/profile",
        visible: ["admin"],
      },
      {
        icon: "/logout.png",
        label: "Logout",
        href: "/logout",
        visible: ["admin"],
      },
    ],
  },
];

const Menu = () => {
  return (
    <div className="mt-4 text-sm">
      {menuItems.map((i) => (
        <div className="flex flex-col gap-2" key={i.title}>
          <span className="hidden lg:block text-gray-400 font-light my-4">
            {i.title}
          </span>
          {i.items.map((item) => {
            if (item.visible.includes(role)) {
              return (
                <Link
                  href={item.href}
                  key={item.label}
                  className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:bg-green-50"
                >
                  <Image src={item.icon} alt="" width={20} height={20} />
                  <span className="hidden lg:block">{item.label}</span>
                </Link>
              );
            }
          })}
        </div>
      ))}
    </div>
  );
};

export default Menu;
