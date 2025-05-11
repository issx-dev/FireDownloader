FROM python:3.12.3-slim

# Establecer directorio de trabajo
WORKDIR /app

# Copiar e instalar dependencias
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiar todo el contenido del proyecto
COPY . .

# Exponer el puerto (coincide con el que usará Flask)
EXPOSE 5000

# Ejecutar la app
CMD ["python", "app.py"]
