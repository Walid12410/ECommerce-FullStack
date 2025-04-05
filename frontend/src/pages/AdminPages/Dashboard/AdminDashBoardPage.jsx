import { Bar, Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
} from 'chart.js';
import Header from "../../../admin-components/Header";

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    PointElement
);

const AdminDashBoardPage = () => {
    // Sample data for charts (to be replaced with real data)
    const salesData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Monthly Sales',
                data: [65, 59, 80, 81, 56, 55],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const offersData = {
        labels: ['Active', 'Expired', 'Upcoming'],
        datasets: [
            {
                label: 'Offers Status',
                data: [12, 19, 3],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    // Sample data for latest users (to be replaced with real data)
    const latestUsers = [
        { id: 1, name: 'John Doe', email: 'john@example.com', date: '2024-03-15' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', date: '2024-03-14' },
        { id: 3, name: 'Mike Johnson', email: 'mike@example.com', date: '2024-03-13' },
        { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', date: '2024-03-12' },
        { id: 5, name: 'Tom Brown', email: 'tom@example.com', date: '2024-03-11' },
    ];

    // Sample data for latest products (to be replaced with real data)
    const latestProducts = [
        { id: 1, name: 'Product A', price: '$99.99', date: '2024-03-15' },
        { id: 2, name: 'Product B', price: '$149.99', date: '2024-03-14' },
        { id: 3, name: 'Product C', price: '$199.99', date: '2024-03-13' },
        { id: 4, name: 'Product D', price: '$79.99', date: '2024-03-12' },
        { id: 5, name: 'Product E', price: '$129.99', date: '2024-03-11' },
    ];

    return (
        <div className="min-h-screen bg-base-200">
            <Header />
            <div className="p-6">
                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="stats shadow">
                        <div className="stat">
                            <div className="stat-title">Total Sales</div>
                            <div className="stat-value">$31K</div>
                        </div>
                    </div>
                    <div className="stats shadow">
                        <div className="stat">
                            <div className="stat-title">Total Users</div>
                            <div className="stat-value">2,300</div>
                        </div>
                    </div>
                    <div className="stats shadow">
                        <div className="stat">
                            <div className="stat-title">Total Products</div>
                            <div className="stat-value">450</div>
                        </div>
                    </div>
                    <div className="stats shadow">
                        <div className="stat">
                            <div className="stat-title">Active Offers</div>
                            <div className="stat-value">12</div>
                        </div>
                    </div>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-base-100 p-6 rounded-lg shadow-lg">
                        <h3 className="text-lg font-semibold mb-4">Sales Overview</h3>
                        <Line data={salesData} />
                    </div>
                    <div className="bg-base-100 p-6 rounded-lg shadow-lg">
                        <h3 className="text-lg font-semibold mb-4">Offers Status</h3>
                        <Bar data={offersData} />
                    </div>
                </div>

                {/* Latest Users and Products */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Latest Users */}
                    <div className="bg-base-100 p-6 rounded-lg shadow-lg">
                        <h3 className="text-lg font-semibold mb-4">Latest Users</h3>
                        <div className="overflow-x-auto">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {latestUsers.map((user) => (
                                        <tr key={user.id}>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{new Date(user.date).toLocaleDateString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Latest Products */}
                    <div className="bg-base-100 p-6 rounded-lg shadow-lg">
                        <h3 className="text-lg font-semibold mb-4">Latest Products</h3>
                        <div className="overflow-x-auto">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th>Date Added</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {latestProducts.map((product) => (
                                        <tr key={product.id}>
                                            <td>{product.name}</td>
                                            <td>{product.price}</td>
                                            <td>{new Date(product.date).toLocaleDateString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashBoardPage; 