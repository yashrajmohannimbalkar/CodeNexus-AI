import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: "primary" | "danger";
}

export function Button({ 
  children, 
  isLoading, 
  variant = "primary", 
  className, 
  ...props 
}: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      disabled={isLoading}
      className={cn(
        "relative px-6 py-3 font-mono font-bold uppercase tracking-wider transition-all duration-300 border-2 rounded-sm outline-none disabled:opacity-50 disabled:cursor-not-allowed",
        // Neon Green Variant
        variant === "primary" && 
          "border-primary text-primary hover:bg-primary/10 shadow-[0_0_10px_rgba(0,255,157,0.3)] hover:shadow-[0_0_20px_rgba(0,255,157,0.6)]",
        // Neon Red Variant
        variant === "danger" && 
          "border-danger text-danger hover:bg-danger/10 shadow-[0_0_10px_rgba(255,0,85,0.3)] hover:shadow-[0_0_20px_rgba(255,0,85,0.6)]",
        className
      )}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>PROCESSING...</span>
        </div>
      ) : (
        children
      )}
    </motion.button>
  );
}