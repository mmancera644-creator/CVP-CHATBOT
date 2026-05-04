exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const SYSTEM_PROMPT = `Eres el asistente virtual de Compraventa de Vehículos Postigo, un taller y compraventa de vehículos ubicado en Berlanga, Badajoz.

INFORMACIÓN DEL NEGOCIO:
- Nombre: Compraventa de Vehículos Postigo
- Servicios: Reparaciones de vehículos, Compraventa de vehículos, Puesta a punto para ITV
- Dirección: Calle Luengo, junto al matadero municipal, Berlanga, Badajoz
- Horario: Mañanas de 9:00 a 15:00 y tardes de 16:30 a 20:30

VEHÍCULOS EN VENTA:
1. Ford Focus Familiar 1.8 Diesel - 1.500€ - 280.000 km
2. Peugeot 508 2.0 TDI - 4.999€
3. Peugeot 607 - 1.900€ - 350.000 km - Asientos calefactables de cuero, embrague recién cambiado, mantenimiento reciente

INSTRUCCIONES:
- Responde siempre en español de forma amable, breve y directa, como un WhatsApp real.
- Si preguntan por precio, km o detalles de un vehículo, dáselos de forma clara.
- Si quieren venir o ver un coche, indícales el horario y la dirección.
- Si la pregunta no está relacionada con el negocio, redirige amablemente.
- Usa emojis con moderación para hacer los mensajes más cálidos.
- Máximo 3-4 líneas por respuesta.`;

  try {
    const { messages } = JSON.parse(event.body);

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 300,
        system: SYSTEM_PROMPT,
        messages,
      }),
    });

    const data = await response.json();
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
