'use client';
import { motion } from "framer-motion";
import Image from "next/image";

const LoadingSpinner = () => {
    return (
        <div className="fixed inset-0 bg-white/90 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="flex flex-col items-center gap-6">
                <div className="relative">
                    {/* Logo container */}
                    <motion.div
                        className="relative z-10"
                        animate={{
                            scale: [1, 1.1, 1],
                            opacity: [1, 0.8, 1]
                        }}
                        transition={{   
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <Image
                            src="/assets/logo/logo_growx.png" // Đảm bảo thêm logo vào thư mục public/assets
                            alt="GrowX Logo"
                            width={80}
                            height={80}
                            className="rounded-2xl"
                        />
                    </motion.div>

                    {/* Ripple effects */}
                    <motion.div
                        className="absolute inset-0 rounded-2xl"
                        style={{
                            background: 'linear-gradient(90deg, #2563eb 0%, #60a5fa 100%)',
                            padding: '2px'
                        }}
                        initial={{ opacity: 1, scale: 1 }}
                        animate={{
                            opacity: 0,
                            scale: 1.5
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeOut"
                        }}
                    >
                        <div className="w-full h-full bg-white rounded-2xl" />
                    </motion.div>
                    <motion.div
                        className="absolute inset-0 rounded-2xl"
                        style={{
                            background: 'linear-gradient(90deg, #3b82f6 0%, #93c5fd 100%)',
                            padding: '2px'
                        }}
                        initial={{ opacity: 1, scale: 1 }}
                        animate={{
                            opacity: 0,
                            scale: 1.5
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeOut",
                            delay: 0.5
                        }}
                    >
                        <div className="w-full h-full bg-white rounded-2xl" />
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default LoadingSpinner; 