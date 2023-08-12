DROP DATABASE IF EXISTS DNSServer;
CREATE DATABASE DNSServer;
USE DNSServer;
CREATE TABLE RootServer(
	DomainExtension varchar(255),
	TLDServer varchar(255)
);