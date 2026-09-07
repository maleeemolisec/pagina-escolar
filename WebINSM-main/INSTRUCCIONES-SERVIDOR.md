# 📧 Instrucciones para el Sistema de Contacto

## ¿Qué se hizo?

Se creó un servidor Python (Flask) que reemplaza el servicio anterior de Formspree. Ahora:

1. El formulario de contacto envía datos a un servidor local
2. El servidor recibe el mensaje y lo envía por correo a través de Gmail
3. Todo funciona sin necesidad de reCAPTCHA ni servicios externos

---

## 📋 Cómo usar

### **Paso 1: Iniciar el servidor** (IMPORTANTE)

Cada vez que quieras probar el formulario, debes ejecutar el servidor:

```powershell
cd "c:\Users\Usuario\Desktop\pagina-escolar\WebINSM-main"
python server.py
```

**Verás esto cuando funcione:**
```
🚀 Servidor Flask iniciado en http://localhost:5000
📧 Los correos se enviarán a: malenamolina.sec@institutolamerced.edu.ar
 * Running on http://127.0.0.1:5000
```

### **Paso 2: Abrir la página en el navegador**

Una vez que el servidor está corriendo, abre:
- **Desktop:** `http://localhost:8000/Contacto.html` (si usas Live Server)
- **Celular:** Asegúrate que esté en la misma red WiFi y accede desde la IP de tu PC

### **Paso 3: Rellenar el formulario de contacto**

- Nombre y Apellido
- Correo de Contacto
- Asunto
- Mensaje

Luego haz clic en "Enviar Mensaje"

### **Paso 4: Verificar el envío**

- Si todo funcionó: Verás el mensaje "¡Gracias! Tu mensaje ha sido enviado con éxito."
- Si hay error: Lee el mensaje de error que aparece

---

## ⚙️ Detalles Técnicos

**Archivo del servidor:** `server.py`

**Archivo actualizado:** `Contacto.html` (líneas del script de formulario)

**Correo remitente:** malenamoli2020@gmail.com
**Correo destinatario:** malenamolina.sec@institutolamerced.edu.ar

---

## 🔧 Para detener el servidor

En la terminal donde corre el servidor, presiona: **CTRL + C**

---

## ⚠️ Posibles errores y soluciones

### Error: "No module named 'flask_cors'"
```powershell
python -m pip install flask-cors
```

### Error: "Conexión rechazada" (Connection refused)
- El servidor no está iniciado. Ejecuta `python server.py`

### Error de Gmail: "Error de autenticación"
- Verifica que la contraseña de aplicación sea correcta
- Revisa que esté habilitada la autenticación de doble factor en Gmail

### El correo no llega a institutolamerced.edu.ar
- Revisa la carpeta de spam
- Verifica que el correo de destino sea correcto

---

## 📌 Resumen

| Componente | Valor |
|-----------|-------|
| Puerto servidor | 5000 |
| Protocolo | HTTP |
| Remitente | malenamoli2020@gmail.com |
| Destinatario | malenamolina.sec@institutolamerced.edu.ar |
| Estado | ✅ Operativo |

