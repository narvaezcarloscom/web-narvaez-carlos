// src/app/services/[id]/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{ maxWidth: 800, margin: "2rem auto" }}>
      <h1>Servicio no encontrado</h1>
      <p>El recurso solicitado no existe.</p>
      <Link href="/services">← Volver a servicios</Link>
    </div>
  );
}