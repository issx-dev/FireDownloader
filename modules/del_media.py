import os


def del_old_files(ruta):
    for archivo in os.listdir(ruta):
        print(archivo)
        path_archivo = os.path.join(ruta, archivo)
        if os.path.isfile(path_archivo):
            try:
                os.remove(path_archivo)
                print(f"Eliminado: {archivo}")
            except Exception as e:
                print(f"Error: {e}")