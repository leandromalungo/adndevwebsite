"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FadeInProps {
    children: ReactNode;
    delay?: number;
    direction?: "up" | "down" | "left" | "right";
    className?: string;
}

export function FadeIn({ children, delay = 0, direction = "up", className }: FadeInProps) {
    const directions = {
        up: { y: 60, x: 0 },
        down: { y: -60, x: 0 },
        left: { x: 20, y: 0 },
        right: { x: -20, y: 0 },
    };

    return (
        <motion.div
            initial={{ opacity: 0, ...directions[direction] }}
            whileInView={{ opacity: 1, y: 0, x: 0 }}
            viewport={{ once: true, amount: 0.1, margin: "100px 0px" }}
            transition={{ duration: 0.8, delay: delay, ease: [0.25, 1, 0.5, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
