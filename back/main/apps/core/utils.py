from pygments import highlight
from pygments.formatters import TerminalFormatter
from pygments.lexers import PostgresLexer
from sqlparse import format
from django.db.models import QuerySet


def print_sql(queryset: QuerySet):
    formatted = format(str(queryset.query), reindent=True)
    print(highlight(formatted, PostgresLexer(), TerminalFormatter()))