import ".././globals.css";

export default function Header ({ children }) {
    return (
      <main>
    <header><span style={{fontWeight:'bold'}}>MediContact</span>
      <span style={{fontSize: 36, marginLeft: 0.5 + 'em'}}>Healthcare Booking</span>
      </header>
      {children}
      </main>
    );
}