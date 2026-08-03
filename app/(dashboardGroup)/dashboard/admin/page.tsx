import { cookies } from "next/headers";
import { Building2, HandCoins, MessageSquareMore, UserSquare } from "lucide-react";
import { getRentalRequestsAction, getRentalRequestsActionAdmin } from "../landlord/_actions/rentalRequestAction";
import { GetAllUsersAction } from "./_actions/userActions";


const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

const AdminDashboard = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  let usersCount = 0;
  let propertyCount = 0;
  let activeRequestCount = 0;
  let totalEarnings = 0;

  try {
    const usersData = await GetAllUsersAction();

    const users = Array.isArray(usersData?.data) ? usersData.data : [];
    usersCount = users.length;
  } catch {
    usersCount = 0;
  }
  try {
    const propertiesRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/admin/properties`,
      {
        cache: "no-store",
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          Cookie: cookieStore.toString(),
        },
      }
    );

    const propertiesData = await propertiesRes.json();
    const properties = Array.isArray(propertiesData?.data) ? propertiesData.data : [];
    propertyCount = properties.length;
  } catch {
    propertyCount = 0;
  }

  try {
    const requestsResult = await getRentalRequestsActionAdmin();
    const requests = Array.isArray(requestsResult?.data) ? requestsResult.data : [];

    activeRequestCount = requests.filter((request: any) => {
      const status = request?.status?.toUpperCase();
      return status === "PENDING" || status === "APPROVED";
    }).length;

    totalEarnings = requests.reduce((sum: number, request: any) => {
      const status = request?.status?.toUpperCase();
      if (status === "APPROVED" || status === "ACTIVE" || status === "COMPLETED") {
        return sum + Number(request?.property?.rentAmount || 0);
      }
      return sum;
    }, 0);
  } catch {
    activeRequestCount = 0;
    totalEarnings = 0;
  }

  const stats = [
    {
      title: "Total Users",
      value: usersCount.toString(),
      description: "Users currently managed by you",
      icon: UserSquare,
      accent: "from-green-500 to-emerald-500",
    },
    {
      title: "Total Properties",
      value: propertyCount.toString(),
      description: "Homes currently managed by you",
      icon: Building2,
      accent: "from-[#00C194] to-emerald-500",
    },
    {
      title: "Active Requests",
      value: activeRequestCount.toString(),
      description: "Pending and approved tenant requests",
      icon: MessageSquareMore,
      accent: "from-blue-500 to-indigo-500",
    },
   
  ];

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-2 py-4 md:px-4 lg:px-6">
      <div className="rounded-2xl border border-border bg-linear-to-br from-background via-card to-muted/40 p-6 shadow-sm">
        <p className="text-sm font-medium text-[#00C194]">Admin Dashboard</p>
        <h1 className="mt-2 text-2xl font-semibold text-foreground">Welcome back, here’s a quick overview</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Track your listings, rental requests, and earnings in one place.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-2xl border border-border bg-card p-5 shadow-sm transition hover:-translate-y-1"
            >
              <div className={`inline-flex rounded-xl bg-linear-to-r ${stat.accent} p-3 text-white`}>
                <Icon className="h-5 w-5" />
              </div>
              <p className="mt-4 text-sm font-medium text-muted-foreground">{stat.title}</p>
              <p className="mt-2 text-3xl font-semibold text-foreground">{stat.value}</p>
              <p className="mt-2 text-sm text-muted-foreground">{stat.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminDashboard;