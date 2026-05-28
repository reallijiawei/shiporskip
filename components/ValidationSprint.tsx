import { ValidationSprintDay } from '@/types/report';
import { Calendar } from 'lucide-react';

interface ValidationSprintProps {
  sprint: ValidationSprintDay[];
}

export default function ValidationSprint({ sprint }: ValidationSprintProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6">
      <div className="flex items-center gap-2">
        <Calendar className="h-5 w-5 text-gray-500" />
        <h3 className="text-lg font-semibold text-gray-900">7-Day Validation Sprint</h3>
      </div>
      <div className="mt-4 overflow-hidden rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                Day
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                Task
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                Deliverable
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {sprint.map((day) => (
              <tr key={day.day}>
                <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-900">
                  Day {day.day}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">{day.task}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{day.deliverable}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
