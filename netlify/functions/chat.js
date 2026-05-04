exports.handler = async function (event) {
  console.log("Function called, method:", event.httpMethod);

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  console.log("API Key present:", !!apiKey, "Length:", apiKey ? apiKey.length : 0);

  const SYSTEM_PROMPT = "Eres el asistente virtual de Compraventa de Vehiculos Postigo, un taller y compraventa de vehiculos en Berlanga, Badajoz. Servicios: Reparaciones, Compraventa, Puesta a punto ITV. Direccion: Calle Luengo junto al matadero municipal, Berlanga, Badajoz. Horario: 9:00-15:00 y 16:30-20:30. Vehiculos en venta: Ford Focus Familiar 1.8 Diesel 1500 euros 280000 km. Peugeot 508 2.0 TDI 4999 euros. Peugeot 607 1900 euros 350000 km con asientos calefactables de cuero embrague nuevo y mantenimiento reciente. Responde en espanol, amable y breve como un WhatsApp real, maximo 3-4 lineas.";

  try {
    var body = JSON.parse(event.body);
    console.log("Messages received:", body.messages.length);

    var response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-5",
        max_tokens: 300,
        system: SYSTEM_PROMPT,
        messages: body.messages
      })
    });

    console.log("Anthropic status:", response.status);
    var data = await response.json();
    console.log("Response:", JSON.stringify(data).substring(0, 200));

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    };

  } catch (err) {
    console.log("ERROR:", err.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
