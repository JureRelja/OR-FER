FROM postgres:15-alpine
ENV POSTGRES_PASSWORD=1234
ENV POSTGRES_DB=ORbaza
COPY dbDump.sql /docker-entrypoint-initdb.d/