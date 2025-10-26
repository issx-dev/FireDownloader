import os
from modules.utils import logger
import threading

def del_old_files(filepath, filename:str, timeout:int = 0):
    
    file_path = os.path.join(filepath, filename)

    def _remove_file():
        if os.path.isfile(file_path):
            try:
                os.remove(file_path)
                logger.info(f"Eliminado: {filename}")
            except Exception as e:
                logger.error(f"Error eliminando {filename}: {e}")
        else:
            logger.info(f"La ruta {file_path} no ha podido ser localizada")

    # Si timeout > 0, programamos el borrado asincrónicamente para no bloquear la petición
    if isinstance(timeout, (int, float)) and timeout > 0:
        logger.info(f"Programado eliminar {filename} en {timeout} segundos")
        t = threading.Timer(timeout, _remove_file)
        t.daemon = True
        t.start()
    else:
        _remove_file()
