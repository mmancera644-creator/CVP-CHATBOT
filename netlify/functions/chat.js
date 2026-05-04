exports.handler = async function (event) {
  console.log("Function called, method:", event.httpMethod);

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  console.log("API Key present:", !!apiKey, "Length:", apiKey ? apiKey.length : 0);

  const SYSTEM_PROMPT = `Eres el asistente virtual de Compraventa de Vehículos Postigo, un taller y compraventa de vehículos ubicado en Berlanga, Badajoz.

INFORMACIÓN DEL NEGOCIO:
- Nombre: Compraventa de Vehículos Postigo
- Servicios: Reparaciones de vehículos, Compraventa de vehículos, Puesta a punto para ITV
- Dirección: Calle Luengo, junto al matadero municipal, Berlanga, Badajoz
- Horario: Mañanas de 9:00 a 15:00 y tardes de 16:30 a 20:30

VEHÍCULOS EN VENTA:
1. Ford Focus Familiar 1.8 Diesel - 1.500€ - 280.000 km
2. Peugeot 508 2.0 TDI - 4.999€
3. Peugeot 607 - 1.900€ - 350.000 km - Asi
