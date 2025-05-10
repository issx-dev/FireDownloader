import os
import time

def del_old_files(ruta, minutos=5):
    ahora = time.time()
    for archivo in os.listdir(ruta):
        print(archivo)
        path_archivo = os.path.join(ruta, archivo)
        if os.path.isfile(path_archivo):
            edad = ahora - os.path.getmtime(path_archivo)
            if edad > minutos * 60:
                try:
                    os.remove(path_archivo)
                    print(f"Eliminado: {archivo}")
                except Exception as e:
                    print(f"Error: {e}")
