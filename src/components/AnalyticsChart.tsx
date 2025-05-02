// components/AnalyticsChart.tsx

import React, { useMemo, useEffect, useState } from 'react';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { format, isSameMonth, isSameDay, subDays, isAfter } from 'date-fns';

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

type Message = {
  _id: string;
  content: string;
  createdAt: string; 
}

// interface Props {
//   messages: Message[];
//   showFullReport: boolean; // false => last 7 days, true => full year
// }

export default function AnalyticsChart() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);
    const [showFullReport, setShowFullReport] = useState(false);
  
    useEffect(() => {
      const fetchMessages = async () => {
        try {
          const res = await fetch('/api/messages');
          const data = await res.json();
          setMessages(data.messages || []);
        } catch (err) {
          console.error('Failed to fetch messages:', err);
        } finally {
          setLoading(false);
        }
      };
  
      fetchMessages();
    }, []);
  
    const chartData = useMemo(() => {
      const now = new Date();
      const labels = showFullReport
        ? Array.from({ length: 12 }, (_, i) =>
            new Date(0, i).toLocaleString('default', { month: 'short' })
          )
        : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
      const frequencyMap: Record<string, number> = {};
  
      messages.forEach((msg) => {
        const date = new Date(msg.createdAt);
        const label = showFullReport
          ? labels[date.getMonth()]
          : labels[date.getDay()];
        frequencyMap[label] = (frequencyMap[label] || 0) + 1;
      });
  
      const counts = labels.map((label) => frequencyMap[label] || 0);
  
      return {
        labels,
        datasets: [
          {
            label: 'Feedback Count',
            data: counts,
            backgroundColor: 'rgba(124, 58, 237, 0.7)',
            borderColor: 'rgba(124, 58, 237, 1)',
            borderWidth: 1,
          },
        ],
      };
    }, [messages, showFullReport]);
  
    return (
      <div className="p-4">
        <div className="flex justify-between mb-2">
          <h2 className="text-lg font-semibold">Feedback Analytics</h2>
          <button
            onClick={() => setShowFullReport(!showFullReport)}
            className="bg-purple-600 text-white px-3 py-1 rounded"
          >
            {showFullReport ? 'Weekly' : 'Monthly'}
          </button>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Bar data={chartData} />
        )}
      </div>
    );
  }
