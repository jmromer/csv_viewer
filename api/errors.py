class CsvViewerError(Exception):
    """Parent class for app-specific exceptions."""


class AttachmentError(CsvViewerError):
    """Attachment size and type errors."""


class AlreadyExistsError(CsvViewerError):
    """Raise if a time entry report has already been saved."""
