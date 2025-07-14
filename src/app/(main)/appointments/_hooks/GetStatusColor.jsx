export const getStatusColor = (status) => {
    switch (status) {
      case "paid":
        return "from-green-500 to-emerald-600";
      case "partial":
        return "from-yellow-500 to-orange-600";
      default:
        return "from-gray-500 to-slate-600";
    }
  };