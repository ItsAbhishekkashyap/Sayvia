'use client';

import { useEffect, useState, useMemo } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bar } from 'react-chartjs-2';
import { BarChart } from 'lucide-react';
import { format, subDays, isSameDay } from 'date-fns';
import type { ChartData, ChartOptions } from 'chart.js';

interface Props {
    showFullReport: boolean;
    handleViewReport: () => void;
}

export default function FeedbackAnalyticsChart({ showFullReport, handleViewReport }: Props) {
    const [messages, setMessages] = useState<{ createdAt: string }[]>([]);
    const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
    const [selectedYear, setSelectedYear] = useState<number | null>(null);

    const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const now = new Date();

    useEffect(() => {
        (async () => {
            const res = await fetch('/api/messages');
            const json = await res.json();
            setMessages(json.messages || []);
        })();
    }, []);

    const availableYears = useMemo(() => {
        const years = new Set<number>();
        messages.forEach(m => {
            const y = new Date(m.createdAt).getFullYear();
            years.add(y);
        });
        return Array.from(years).sort((a, b) => b - a); // Latest year first
    }, [messages]);

    const analyticsData: ChartData<'bar'> = useMemo(() => {
        let labels: string[] = [];
        let counts: number[] = [];

        if (showFullReport) {
            const yearToShow = selectedYear ?? now.getFullYear();

            if (selectedMonth !== null) {
                // Daily view for selected month
                const daysInMonth = new Date(yearToShow, selectedMonth + 1, 0).getDate();
                labels = Array.from({ length: daysInMonth }, (_, i) => (i + 1).toString());
                counts = Array.from({ length: daysInMonth }, (_, i) => {
                    return messages.filter(m => {
                        const d = new Date(m.createdAt);
                        return d.getFullYear() === yearToShow &&
                            d.getMonth() === selectedMonth &&
                            d.getDate() === i + 1;
                    }).length;
                });
            } else {
                // Monthly view for selected year
                labels = MONTHS;
                counts = MONTHS.map((_, monthIndex) => {
                    return messages.filter(m => {
                        const d = new Date(m.createdAt);
                        return d.getFullYear() === yearToShow && d.getMonth() === monthIndex;
                    }).length;
                });
            }
        } else {
            // Weekly View
            const last7 = Array.from({ length: 7 }).map((_, i) =>
                subDays(now, 6 - i)
            );
            labels = last7.map((d) => format(d, 'EEE'));
            counts = last7.map((day) =>
                messages.filter((m) => isSameDay(new Date(m.createdAt), day)).length
            );
        }

        return {
            labels,
            datasets: [{
                label: 'Feedback Received',
                data: counts,
                backgroundColor: showFullReport ? 'rgba(124, 58, 237, 0.7)' : 'rgba(234, 179, 8, 0.7)',
                borderColor: showFullReport ? 'rgba(124, 58, 237, 1)' : 'rgba(234, 179, 8, 1)',
                borderWidth: 1,
            }]
        };
    }, [messages, showFullReport, selectedMonth, selectedYear]);

    const chartOptions: ChartOptions<'bar'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'top' },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                titleColor: '#fff',
                bodyColor: '#fff',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: { color: 'rgba(0, 0, 0, 0.05)' },
            },
            x: {
                grid: { display: false },
            },
        },
    };

    const handleReportToggle = () => {
        setSelectedMonth(null);
        setSelectedYear(null);
        handleViewReport();
    };

    const handleExportCSV = () => {
        const csvHeader = ['Label,Count'];
        const csvRows = analyticsData.labels?.map((label, i) => {
            return `"${label}",${analyticsData.datasets[0].data[i]}`;
        }) ?? [];

        const blob = new Blob([csvHeader.concat(csvRows).join('\n')], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'feedback_report.csv';
        a.click();
        URL.revokeObjectURL(url);
    };

    const handlePrintChart = () => {
        const chartCanvas = document.querySelector('canvas');
        if (!chartCanvas) return;
      
        const dataURL = chartCanvas.toDataURL(); // Convert canvas to image
      
        const printWindow = window.open('', 'PrintChart', 'height=600,width=800');
        if (!printWindow) return;
      
        // @ts-ignore: document.write is fine for this use-case
        printWindow.document.write('<html><head><title>Print Feedback Chart</title></head><body>');
        printWindow.document.write('<h2 style="text-align:center;">Feedback Analytics Chart</h2>');
        printWindow.document.write(`<img src="${dataURL}" style="width:100%;max-width:700px;display:block;margin:auto;" />`);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
      
        printWindow.onload = () => {
          printWindow.focus();
          printWindow.print();
          printWindow.close();
        };
      };
      


    return (
        <Card className="border border-gray-200/70 hover:border-amber-200 transition-all h-full">
            <CardHeader className="flex flex-row items-center space-x-3 space-y-0">
                <div className="p-2 rounded-lg bg-amber-100 text-amber-600">
                    <BarChart className="w-5 h-5" />
                </div>
                <div>
                    <h3 className="font-semibold">Message Analytics</h3>
                    <p className="text-sm text-gray-500">Your feedback trends and insights</p>
                </div>
            </CardHeader>

            {showFullReport && (
                <div className="px-6 -mt-2 mb-2 flex gap-4 flex-wrap">
                    <div>
                        <label className="text-sm text-gray-600 mr-2">Year:</label>
                        <select
                            value={selectedYear ?? ''}
                            onChange={(e) => {
                                const val = e.target.value;
                                setSelectedYear(val === '' ? null : Number(val));
                            }}
                            className="border text-sm px-2 py-1 bg-background rounded"
                        >
                            <option value="">Current Year</option>
                            {availableYears.map((y) => (
                                <option key={y} value={y}>{y}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="text-sm text-gray-600 mr-2">Month:</label>
                        <select
                            value={selectedMonth ?? ''}
                            onChange={(e) => {
                                const val = e.target.value;
                                setSelectedMonth(val === '' ? null : Number(val));
                            }}
                            className="border text-sm px-2 py-1 rounded bg-background"
                        >
                            <option value="">All Year</option>
                            {MONTHS.map((m, idx) => (
                                <option key={m} value={idx}>{m}</option>
                            ))}
                        </select>
                    </div>
                </div>
            )}

            <CardContent className="h-[300px]">
                <Bar data={analyticsData} options={chartOptions} />
            </CardContent>

            <CardFooter className="flex justify-between items-center text-sm text-gray-500 flex-wrap gap-2">
                <span>
                    {showFullReport
                        ? selectedMonth !== null
                            ? `Showing ${MONTHS[selectedMonth]} ${selectedYear ?? now.getFullYear()}`
                            : `Showing full year ${selectedYear ?? now.getFullYear()}`
                        : "Last 7 days"}
                </span>

                <div className="flex gap-2 flex-wrap">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-600"
                        onClick={handleExportCSV}
                    >
                        Export CSV
                    </Button>

                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-600"
                        onClick={handlePrintChart}
                    >
                        Print View
                    </Button>

                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-600 "
                        onClick={handleReportToggle}
                    >
                        {showFullReport ? "Show Weekly View" : "View Full Report"}
                    </Button>
                </div>
            </CardFooter>

        </Card>
    );
}



