import os
from modules.utils import logger

def del_old_files(filepath, filename:str):
    file_path = os.path.join(filepath, filename)
    if os.path.isfile(file_path):
        try:
            os.remove(file_path)
            logger.info(f"Eliminado: {filename}")
        except Exception as e:
            logger.error(f"Error: {e}")
        return
    
    logger.info(f"La ruta {file_path} no ha podido ser localizada")
