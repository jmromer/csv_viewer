import hashlib


def md5_digest(file_handle, chunk_size=128):
    """Return a hex digest for the given file."""
    md5 = hashlib.md5()
    while chunk := file_handle.read(chunk_size * md5.block_size):
        md5.update(chunk)
    file_handle.seek(0)
    return md5.hexdigest()
