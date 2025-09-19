'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Announcements from "@/components/admin/Announcements";
import BigCalendar from "@/components/admin/BigCalender";
import FormModal from "@/components/admin/FormModal";
import Performance from "@/components/admin/Performance";
import Image from "next/image";
import Link from "next/link";
import { formatCurrency } from '@/lib/currency';
// If you have a real role context, use it; else hardcode for now:
import { role } from "@/lib/data";

export default function SingleCanteenPage() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

  useEffect(() => {
    if (!id) return;
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:5000/api/canteen/${id}`, {
          credentials: 'include',
        });
        const text = await res.text();
        let json;
        try { json = JSON.parse(text); } catch { json = {}; }

        if (!res.ok) {
          if (alive) {
            setErr(json.message || `Failed (${res.status})`);
            setData(null);
          }
          return;
        }
        if (alive) {
          setData(json);
          setErr('');
        }
      } catch (e) {
        if (alive) setErr(e.message || 'Failed to load');
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [id]);

  if (loading) return <div className="p-4">Loading canteen…</div>;
  if (err) return <div className="p-4 text-red-600">Error: {err}</div>;
  if (!data) return <div className="p-4">No data</div>;

  const mgr = data.managerId || {};
  const coords =
    data?.location?.coordinates?.length === 2
      ? `${data.location.coordinates[0].toFixed(5)}, ${data.location.coordinates[1].toFixed(5)}`
      : '—';

  return (
    <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        {/* TOP */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* CANTEEN INFO CARD */}
          <div className="bg-orange-200 py-6 px-4 rounded-md flex-1 flex gap-4">
            <div className="w-1/3">
              <Image
                src={data.photo || "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=1200"}
                alt="Canteen"
                width={144}
                height={144}
                className="w-36 h-36 rounded-full object-cover"
              />
            </div>
            <div className="w-2/3 flex flex-col justify-between gap-4">
              <div className="flex items-center gap-4">
                <h1 className="text-xl font-semibold">{data.name}</h1>
                {role === "admin" && (
                  <FormModal
                    table="canteen"
                    type="update"
                    id={data._id}
                    initialData={data}
                  />
                )}
              </div>

              <p className="text-sm text-gray-600">
                Coordinates: {coords}
              </p>

              <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-medium">
                <div className="flex items-center gap-2">
                  <Image src="/location.png" alt="Location" width={14} height={14} />
                  <span>{coords !== '—' ? coords : 'Location not set'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Image src="/manager2.png" alt="Manager" width={14} height={14} />
                  <span>Manager: {mgr.firstName || mgr.lastName ? `${mgr.firstName ?? ''} ${mgr.lastName ?? ''}`.trim() : '—'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Image src="/email.png" alt="Email" width={14} height={14} />
                  <span>{mgr.email || '—'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* SMALL STAT CARDS */}
          <div className="flex-1 flex gap-4 justify-between flex-wrap">
            <div className="bg-white p-4 rounded-md flex items-center gap-4 w-full md:w-[48%]">
              <Image src="/menu.png" alt="Menu Items" width={32} height={32} />
              <div>
                <h1 className="text-xl font-semibold">{data.productCount ?? 0}</h1>
                <span className="text-sm text-gray-400">Menu Items</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-md flex items-center gap-4 w-full md:w-[48%]">
              <Image src="/orders.png" alt="Ongoing Orders" width={32} height={32} />
              <div>
                <h1 className="text-xl font-semibold">{data.ongoingOrders ?? 0}</h1>
                <span className="text-sm text-gray-400">Ongoing Orders</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-md flex items-center gap-4 w-full md:w-[48%]">
              <Image src="/sales.png" alt="Completed Orders" width={32} height={32} />
              <div>
                <h1 className="text-xl font-semibold">{data.completedOrders ?? 0}</h1>
                <span className="text-sm text-gray-400">Completed Orders</span>
              </div>
            </div>

            {/* You can add sales if your Order has totals and you aggregate it */}
                {/* <div className="bg-white p-4 rounded-md flex items-center gap-4 w-full md:w-[48%]">
              <Image src="/sales.png" alt="Daily Sales" width={32} height={32} />
              <div>
                <h1 className="text-xl font-semibold">{formatCurrency(data.dailySales ?? 0)}</h1>
                <span className="text-sm text-gray-400">Daily Sales</span>
              </div>
            </div> */}
          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-4 bg-white rounded-md p-4 h-[800px]">
          <h1>Canteen Schedule</h1>
          <BigCalendar />
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <div className="bg-white p-4 rounded-md">
          <h1 className="text-xl font-semibold">Shortcuts</h1>
          <div className="mt-4 flex gap-4 flex-wrap text-xs text-gray-500">
            <Link className="p-3 rounded-md bg-lamaSkyLight" href={`/menu?canteen=${data._id}`}>
              View Menu
            </Link>
            <Link className="p-3 rounded-md bg-lamaPurpleLight" href={`/orders?canteen=${data._id}`}>
              View Orders
            </Link>
            <Link className="p-3 rounded-md bg-lamaYellowLight" href={`/reports/sales?canteen=${data._id}`}>
              Sales Reports
            </Link>
            <Link className="p-3 rounded-md bg-pink-50" href={`/staff?canteen=${data._id}`}>
              View Staff Members
            </Link>
            <Link className="p-3 rounded-md bg-lamaSkyLight" href={`/maintenance?canteen=${data._id}`}>
              Maintenance Requests
            </Link>
          </div>
        </div>
        <Performance />
        <Announcements />
      </div>
    </div>
  );
}
