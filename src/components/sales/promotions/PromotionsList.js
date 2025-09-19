import React from 'react';
import {
  EditIcon,
  TrashIcon,
  PauseIcon,
  PlayIcon,
  ChevronRightIcon,
} from 'lucide-react';

const promotions = [
  {
    id: 1,
    name: 'Happy Hour - 50% Off',
    status: 'active',
    startDate: '2023-05-10',
    endDate: '2023-05-17',
    target: 'All customers',
    redemptions: 126,
    views: 430,
    conversionRate: '29.3%',
  },
  {
    id: 2,
    name: 'Breakfast Bundle',
    status: 'active',
    startDate: '2023-05-01',
    endDate: '2023-05-31',
    target: 'Morning customers',
    redemptions: 84,
    views: 215,
    conversionRate: '39.1%',
  },
  {
    id: 3,
    name: 'Student Discount',
    status: 'scheduled',
    startDate: '2023-05-20',
    endDate: '2023-06-20',
    target: 'Students',
    redemptions: 0,
    views: 0,
    conversionRate: '0%',
  },
  {
    id: 4,
    name: 'Coffee & Pastry',
    status: 'ended',
    startDate: '2023-04-15',
    endDate: '2023-05-05',
    target: 'All customers',
    redemptions: 215,
    views: 580,
    conversionRate: '37.1%',
  },
  {
    id: 5,
    name: 'Loyalty Member Special',
    status: 'active',
    startDate: '2023-05-05',
    endDate: '2023-06-05',
    target: 'Loyalty members',
    redemptions: 62,
    views: 145,
    conversionRate: '42.8%',
  },
];

const formatDate = (date) =>
  new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

const PromotionsList = () => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {['Name', 'Status', 'Date Range', 'Target', 'Performance', 'Actions'].map(
                (heading) => (
                  <th
                    key={heading}
                    scope="col"
                    className={`px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider ${
                      heading === 'Actions' ? 'text-right' : 'text-left'
                    }`}
                  >
                    {heading}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {promotions.map((promo) => (
              <tr
                key={promo.id}
                className="hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                  {promo.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 inline-flex text-xs font-semibold rounded-full ${
                      promo.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : promo.status === 'scheduled'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {promo.status.charAt(0).toUpperCase() + promo.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(promo.startDate)} - {formatDate(promo.endDate)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {promo.target}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {promo.redemptions} redemptions
                  </div>
                  <div className="text-sm text-gray-500">
                    {promo.conversionRate} conversion
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-2">
                    {promo.status === 'active' && (
                      <button className="p-1 text-yellow-600 hover:text-yellow-900">
                        <PauseIcon size={18} />
                      </button>
                    )}
                    {promo.status === 'scheduled' && (
                      <button className="p-1 text-green-600 hover:text-green-900">
                        <PlayIcon size={18} />
                      </button>
                    )}
                    <button className="p-1 text-blue-600 hover:text-blue-900">
                      <EditIcon size={18} />
                    </button>
                    <button className="p-1 text-red-600 hover:text-red-900">
                      <TrashIcon size={18} />
                    </button>
                    <button className="p-1 text-gray-600 hover:text-gray-900">
                      <ChevronRightIcon size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PromotionsList;
