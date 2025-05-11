import os
import logging


def del_old_files(filepath, filename:str):
    file_path = os.path.join(filepath, filename)
    if os.path.isfile(file_path):
        try:
            os.remove(file_path)
            logging.info(f"Eliminado: {filename}")
        except Exception as e:
            logging.error(f"Error: {e}")
        return
    
    logging.info(f"La ruta {file_path} no ha podido ser localizada")
