document.addEventListener("DOMContentLoaded", () => {

    // =========================================================
    // 1. EFECTO MÁQUINA DE ESCRIBIR
    // =========================================================
    const textoNombre = "Jonathan.";
    let letraActual = 0;
    const elementoEscritura = document.getElementById("efecto-escritura");

    function ejecutarEscritura() {
        if (elementoEscritura && letraActual < textoNombre.length) {
            // Añade letra por letra al contenido del span
            elementoEscritura.textContent += textoNombre.charAt(letraActual);
            letraActual++;
            setTimeout(ejecutarEscritura, 150); // Tiempo entre letras
        } else if (elementoEscritura) {
            // Elimina la línea vertical parpadeante cuando termina de escribir
            elementoEscritura.style.borderRight = "none";
        }
    }
    ejecutarEscritura(); // Llama a la función para arrancar el efecto


    // =========================================================
    // 2. MOSTRAR USO DE TECNOLOGÍAS AL HACER CLIC
    // =========================================================
    const botonesTech = document.querySelectorAll(".boton-tech");
    const cajaInfo = document.getElementById("caja-informacion-tech");

    botonesTech.forEach(boton => {
        boton.addEventListener("click", () => {
            // ¡Aquí arreglamos el error! Ahora busca 'data-uso' en tu HTML
            const mensajeUso = boton.getAttribute("data-uso");
            
            if (cajaInfo) {
                // Inyecta el texto combinando el nombre del botón y su uso
                cajaInfo.textContent = `${boton.textContent}: ${mensajeUso}`;
                
                // Le añade la clase CSS para hacer visible la caja
                cajaInfo.classList.add("mostrar-caja-info");
            }
        });
    });


    // =========================================================
    // 3. CAMBIO DE TEMA (CLARO / OSCURO)
    // =========================================================
    const botonCambiarTema = document.getElementById("boton-tema");

    if (botonCambiarTema) {
        botonCambiarTema.addEventListener("click", () => {
            // Añade o quita la clase .modo-claro al body cada vez que haces clic
            document.body.classList.toggle("modo-claro");
            
            // Cambia el emoji dependiendo del modo en el que estés
            if (document.body.classList.contains("modo-claro")) {
                botonCambiarTema.textContent = "☀️";
            } else {
                botonCambiarTema.textContent = "🌙";
            }
        });
    }


    // =========================================================
    // 4. ANIMACIÓN DE DESPLAZAMIENTO (SCROLL)
    // =========================================================
    const elementosAnimados = document.querySelectorAll(".animacion-scroll");

    function revisarScroll() {
        // Define el punto de la pantalla (85% desde arriba) donde se activará la animación
        const puntoDeActivacion = window.innerHeight * 0.85;

        elementosAnimados.forEach(elemento => {
            // Obtiene la distancia desde el elemento hasta la parte superior de la pantalla
            const distanciaElemento = elemento.getBoundingClientRect().top;

            // Si el elemento entra en la zona visible, le añade la clase que lo muestra
            if (distanciaElemento < puntoDeActivacion) {
                elemento.classList.add("mostrar-elemento");
            }
        });
    }

    // Le dice al navegador que ejecute la función cada vez que el usuario mueva el scroll
    window.addEventListener("scroll", revisarScroll);
    
    // Lo ejecuta una vez al principio por si hay elementos que ya se ven arriba
    revisarScroll();

});