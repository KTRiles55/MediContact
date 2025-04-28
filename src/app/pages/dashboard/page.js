import DashboardLayout from 'Components/DashboardLayout'; // adjust if needed

function DashboardContent() {
  return <h1>Welcome to MediContact!</h1>;
}

export default function Dashboard() {
  return (
    <DashboardLayout>
      <DashboardContent />
    </DashboardLayout>
  );
}