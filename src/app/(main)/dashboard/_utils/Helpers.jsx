import { CheckCircle, Clock } from "lucide-react";

export const getStatusBadge = (status) => {
    return status === "paid" ? (
        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
            <CheckCircle className="w-3 h-3" />
            Paid
        </span>
    ) : (
        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400">
            <Clock className="w-3 h-3" />
            Remaining
        </span>
    );
};