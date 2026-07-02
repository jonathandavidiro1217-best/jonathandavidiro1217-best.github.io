import fs from "fs";
import "dotenv/config"; // Carga la API key desde el archivo .env

async function generarReadme() {
  try {
    console.log("Leyendo los archivos de tu proyecto...");

    // Leemos tu código
    const html = fs.readFileSync("index.html", "utf8");
    const css = fs.existsSync("style.css")
      ? fs.readFileSync("style.css", "utf8")
      : "";
    const js = fs.existsSync("script.js")
      ? fs.readFileSync("script.js", "utf8")
      : "";

    console.log("Conectando con Gemini (vía OpenRouter)...");

    // Hacemos una petición HTTP directa a OpenRouter
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash", // Llamamos a Gemini 2.5 Flash
          messages: [
            {
              role: "user",
              content: `Actúa como un desarrollador experto. Analiza el siguiente código de mi proyecto escolar y genera un archivo README.md profesional y atractivo para GitHub. 
            Incluye secciones como: Nombre del proyecto con un emoji, Descripción clara, Características principales (features), Tecnologías utilizadas (HTML, CSS, JS), Instrucciones de instalación/uso, y deja una sección para 'Credenciales de prueba' si notas que hay un sistema de login.

            Aquí está mi código:
            --- HTML ---
            ${html}
            --- CSS ---
            ${css}
            --- JAVASCRIPT ---
            ${js}`,
            },
          ],
        }),
      },
    );

    const data = await response.json();

    // Extraemos el texto que nos devolvió la IA
    const resultadoMarkdown = data.choices[0].message.content;

    // Guardamos el archivo
    fs.writeFileSync("README.md", resultadoMarkdown);
    console.log(
      "¡Listo! Tu archivo README.md ha sido generado con éxito saltando el bloqueo regional.",
    );
  } catch (error) {
    console.error("Hubo un error al generar el README:", error);
  }
}

generarReadme();
