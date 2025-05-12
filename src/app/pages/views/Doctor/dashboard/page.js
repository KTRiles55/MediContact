import DashboardLayout from 'Components/DashboardLayout'; // adjust if needed

function DoctorDashboardContent() {
  return (
    <div>
  <h1>Welcome to MediContact!</h1>
  <p>(Doctor view)</p>
  </div>
);
}

export default function DoctorDashboard() {
  return (
    <DashboardLayout>
      <DoctorDashboardContent />
    </DashboardLayout>
  );
}