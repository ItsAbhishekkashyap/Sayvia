'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from "next/navigation";
import { Switch } from "@/components/ui/switch";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Check, Crown, Palette, Link2, Zap, Shield, Ban, BarChart } from "lucide-react";
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Footer } from '@/components/Footer';
import { useSession } from 'next-auth/react';
import { useCustomLink } from '@/context/CustomLinkContext';
import { Session } from "next-auth";

import { CustomLinkProvider } from '@/context/CustomLinkContext';






ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const themes = [
    { name: "Ocean", color: "bg-gradient-to-r from-cyan-500 to-blue-600" },
    { name: "Sunset", color: "bg-gradient-to-r from-amber-500 to-pink-500" },
    { name: "Lavender", color: "bg-gradient-to-r from-purple-400 to-pink-400" },
    { name: "Monochrome", color: "bg-gradient-to-r from-gray-300 to-gray-700" },
];
interface PremiumDashboardClientProps {
    session: Session;
  }

export default function PremiumDashboardClient({ session }: PremiumDashboardClientProps) {
    
  
    // const { data: session } = useSession();
    const [theme, setTheme] = useState("Default");

    const [aiReply, setAiReply] = useState(true);
    const [moderation, setModeration] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [showFullReport, setShowFullReport] = useState(false);
    const [isPremium, setIsPremium] = useState<boolean | null>(null);
    const router = useRouter();

    const sessionData = useSession();
    




    const [origin, setOrigin] = useState("");
    const [copied, setCopied] = useState(false);

    const { customLink, setCustomLink } = useCustomLink();

    const [saving, setSaving] = useState(false);

    const isLoading = sessionData.status === "loading";
    const isAuthenticated = sessionData.status === "authenticated";



    useEffect(() => {
        if (typeof window !== "undefined") {
            setOrigin(window.location.origin);
        }
    }, []);

    const copyLink = () => {
        const link = `${origin}/u/${session?.user?.customLink || session?.user?.username}`;
        navigator.clipboard.writeText(link);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };


    useEffect(() => {
        fetch('/api/premium/check-access')
            .then(res => res.json())
            .then(data => {
                setIsPremium(data.isPremium);
                setCustomLink(data.customLink);
            })
            .catch(() => setIsPremium(false));
    }, []);

    const analyticsData = useMemo(() => {
        const days = showFullReport
            ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

        return {
            labels: days,
            datasets: [
                {
                    label: 'Feedback Received',
                    data: days.map(() => Math.floor(Math.random() * (showFullReport ? 50 : 20)) + 5),
                    backgroundColor: showFullReport
                        ? 'rgba(124, 58, 237, 0.7)'
                        : 'rgba(234, 179, 8, 0.7)',
                    borderColor: showFullReport
                        ? 'rgba(124, 58, 237, 1)'
                        : 'rgba(234, 179, 8, 1)',
                    borderWidth: 1,
                },
            ],
        };
    }, [showFullReport]);

    const handleUpgrade = async () => {
        const res = await fetch("/api/premium/upgrade", {
            method: "POST",
        });

        const data = await res.json();

        if (data.success) {
            toast({ title: "Upgraded!", description: "You are now a premium user." });
            setIsPremium(true);
        } else {
            toast({ title: "Error", description: data.error || "Upgrade failed." });
        }
    };

    if (isPremium === null) return <p>Checking access...</p>;

    const handleViewReport = () => {
        setShowFullReport(!showFullReport);
        toast({
            title: showFullReport ? "Showing weekly view" : "Showing full analytics report",
            description: showFullReport ? "Now displaying last 7 days" : "Viewing complete message history",
        });
    };



    const handleSaveLink = async () => {
        if (!customLink) {
            return toast({ title: "Error", description: "Custom link can not be empty" });
        }

        setIsSaving(true);

        const res = await fetch("/api/premium/custom-link", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ customLink }),
        });

        const data = await res.json();
        console.log("Response data:", data); // Add this line

        setIsSaving(false);

        if (!res.ok) {
            return toast({ title: "Error", description: "Something went wrong" });
        }

        toast({ title: "Success", description: "Custom link Saved!" });
    };



    return (
        <>
            {/* // your JSX here... */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="max-w-6xl mx-auto mt-20 p-4 sm:p-6 space-y-8"
            >
                <div className="text-center">
                    <Badge variant="secondary" className="mb-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white">
                        <Crown className="w-4 h-4 mr-1" /> PREMIUM MEMBER
                    </Badge>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        Your Premium Dashboard
                    </h1>
                    <p className="mt-2 text-gray-500">
                        Customize your experience with these exclusive features
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - Basic Features */}
                    <div className="space-y-6 lg:col-span-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Theme Selection Card */}
                            <motion.div whileHover={{ y: -5 }}>
                                <Card className="h-full border border-gray-200/70 hover:border-purple-200 transition-all">
                                    <CardHeader className="flex flex-row items-center space-x-3 space-y-0">
                                        <div className="p-2 rounded-lg bg-purple-100 text-purple-600">
                                            <Palette className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold">Profile Theme</h3>
                                            <p className="text-sm text-gray-500">Make your profile uniquely yours</p>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                            <motion.div
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => setTheme("Default")}
                                                className={`relative rounded-lg p-4 border-2 cursor-pointer transition-all ${theme === "Default" ? "border-purple-500" : "border-gray-200 hover:border-gray-300"}`}
                                            >
                                                <div className="bg-gradient-to-br from-gray-100 to-gray-300 h-12 rounded" />
                                                <p className="mt-2 text-center text-sm">Default</p>
                                                {theme === "Default" && <Check className="w-4 h-4 text-purple-600 absolute top-2 right-2" />}
                                            </motion.div>

                                            {themes.map((t) => (
                                                <motion.div
                                                    key={t.name}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={() => setTheme(t.name)}
                                                    className={`relative rounded-lg p-4 border-2 cursor-pointer transition-all ${theme === t.name ? "border-purple-500" : "border-gray-200 hover:border-gray-300"}`}
                                                >
                                                    <div className={`${t.color} h-12 rounded`} />
                                                    <p className="mt-2 text-center text-sm">{t.name}</p>
                                                    {theme === t.name && <Check className="w-4 h-4 text-purple-600 absolute top-2 right-2" />}
                                                </motion.div>
                                            ))}
                                        </div>
                                    </CardContent>
                                    <CardFooter className="text-xs text-gray-500">
                                        Changes apply to your public profile page
                                    </CardFooter>
                                </Card>
                            </motion.div>

                            {/* Custom Link Card */}
                            <motion.div whileHover={{ y: -5 }}>
                                <Card className="h-full border border-gray-200/70 hover:border-blue-200 transition-all">
                                    <CardHeader className="flex flex-row items-center space-x-3 space-y-0">
                                        <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
                                            <Link2 className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold">Custom Profile Link</h3>
                                            <p className="text-sm text-gray-500">Personalize your Sayvia URL</p>
                                        </div>
                                    </CardHeader>
                                    {/* <CardContent className="space-y-2">
                                    <div className="flex items-center bg-gray-50 px-4 py-3 rounded-lg border border-gray-200">
                                        <span className="text-gray-500">sayvia.com/</span>
                                        <input
                                            type="text"
                                            placeholder={session?.user.username || "yourname"}
                                            value={customLink}
                                            onChange={(e) => setCustomLink(e.target.value)}
                                            className="flex-1 bg-transparent outline-none min-w-0"
                                        />
                                    </div>
                                    <Button
                                        onClick={handleSaveLink}
                                        disabled={isSaving || !isPremium}
                                        className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                                    >
                                        {isPremium ? (isSaving ? 'Saving…' : 'Save Custom Link') : 'Premium Only'}
                                    </Button>

                                    

                                    
                                </CardContent> */}

                                    <CardContent className="space-y-2">
                                        <div className="flex items-center bg-gray-50 px-4 py-3 rounded-lg border border-gray-200">
                                            <span className="text-gray-500">sayvia.com/u/</span>
                                            <input
                                                type="text"
                                                placeholder={session?.user?.username || "yourname"}
                                                value={customLink}
                                                onChange={(e) => setCustomLink(e.target.value)}
                                                readOnly={!isPremium}
                                                className={`flex-1 bg-transparent outline-none min-w-0 ${!isPremium ? "text-gray-400 cursor-not-allowed" : ""
                                                    }`}
                                            />
                                        </div>

                                        <Button
                                            onClick={handleSaveLink}
                                            disabled={!isPremium || isSaving}
                                            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                                        >
                                            {isPremium ? (isSaving ? "Saving..." : "Save Custom Link") : "Premium Only"}
                                        </Button>

                                    </CardContent>

                                    <CardFooter className="text-xs text-gray-500">
                                        Only letters, numbers, and underscores allowed
                                    </CardFooter>
                                </Card>
                            </motion.div>

                            {/* AI Suggestions Card */}
                            <motion.div whileHover={{ y: -5 }}>
                                <Card className="border border-gray-200/70 hover:border-green-200 transition-all">
                                    <CardHeader className="flex flex-row items-center space-x-3 space-y-0">
                                        <div className="p-2 rounded-lg bg-green-100 text-green-600">
                                            <Zap className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold">AI Reply Suggestions</h3>
                                            <p className="text-sm text-gray-500">Enhance feedback quality</p>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <div>
                                                <p className="font-medium">Smart Suggestions</p>
                                                <p className="text-sm text-gray-500">
                                                    {aiReply ? "Enabled" : "Disabled"} - helps senders craft better feedback
                                                </p>
                                            </div>
                                            <Switch
                                                checked={aiReply}
                                                onCheckedChange={() => setAiReply(!aiReply)}
                                                className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-300"
                                            />
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>

                            {/* Moderation Card */}
                            <motion.div whileHover={{ y: -5 }}>
                                <Card className="border border-gray-200/70 hover:border-red-200 transition-all">
                                    <CardHeader className="flex flex-row items-center space-x-3 space-y-0">
                                        <div className="p-2 rounded-lg bg-red-100 text-red-600">
                                            <Shield className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold">Message Moderation</h3>
                                            <p className="text-sm text-gray-500">Keep your feedback clean</p>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <div>
                                                <p className="font-medium">Auto-filter Inappropriate Content</p>
                                                <p className="text-sm text-gray-500">
                                                    {moderation ? "Active" : "Inactive"} - detects and removes harmful messages
                                                </p>
                                            </div>
                                            <Switch
                                                checked={moderation}
                                                onCheckedChange={() => setModeration(!moderation)}
                                                className="data-[state=checked]:bg-red-500 data-[state=unchecked]:bg-gray-300"
                                            />
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </div>

                        {/* Ad-Free Experience Card */}
                        <motion.div whileHover={{ scale: 1.01 }}>
                            <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100">
                                <CardHeader className="flex flex-row items-center space-x-3 space-y-0">
                                    <div className="p-2 rounded-lg bg-purple-100 text-purple-600">
                                        <Ban className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">Ad-Free Experience</h3>
                                        <p className="text-sm text-purple-500">Enjoy Sayvia without interruptions</p>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-purple-100">
                                        <div>
                                            <p className="font-medium text-purple-800">No Ads Anywhere</p>
                                            <p className="text-sm text-purple-600">
                                                Your dashboard and profile are completely ad-free
                                            </p>
                                        </div>
                                        <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                                            Active
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>

                    {/* Right Column - Analytics Feature */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="h-[70vh]"
                    >
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
                            <CardContent className="h-[300px]">
                                <Bar
                                    data={analyticsData}
                                    options={{
                                        responsive: true,
                                        maintainAspectRatio: false,
                                        plugins: {
                                            legend: {
                                                position: 'top',
                                            },
                                            tooltip: {
                                                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                                titleColor: '#fff',
                                                bodyColor: '#fff',
                                            },
                                        },
                                        scales: {
                                            y: {
                                                beginAtZero: true,
                                                grid: {
                                                    color: 'rgba(0, 0, 0, 0.05)',
                                                },
                                            },
                                            x: {
                                                grid: {
                                                    display: false,
                                                },
                                            },
                                        },
                                    }}
                                />
                            </CardContent>
                            <CardFooter className="flex justify-between items-center text-sm text-gray-500">
                                <span>{showFullReport ? "Complete history" : "Last 7 days"}</span>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-amber-600 hover:bg-amber-50"
                                    onClick={handleViewReport}
                                >
                                    {showFullReport ? "Show Weekly View" : "View Full Report"}
                                </Button>
                            </CardFooter>
                        </Card>
                    </motion.div>
                </div>
            </motion.div>
            {/* Footer */}
            <Footer />
        </>
    );
}
