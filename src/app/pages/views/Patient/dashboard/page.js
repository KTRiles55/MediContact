import DashboardLayout from 'Components/DashboardLayout'; // adjust if needed

function ClientDashboardContent() {
  return <h1>Welcome to MediContact!</h1>;
}

export default function ClientDashboard() {
  return (
    <DashboardLayout>
      <ClientDashboardContent />
    </DashboardLayout>
  );
}