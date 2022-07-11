CREATE DATABASE DNSServer;
USE DNSServer;
CREATE TABLE RootServer(
	DomainExtension varchar(255),
	TLDServer varchar(255)
);
INSERT INTO RootServer(DomainExtension,TLDServer)
VALUES ('com','comTLDServer');
CREATE TABLE comTLDServer(
DomainName varchar(255),
AuthoritativeServer varchar(255)
);
INSERT INTO comTLDServer(DomainName,AuthoritativeServer)
VALUES ('google','1d5920f4b44b27a802bd77c4f0536f5a');
CREATE TABLE 1d5920f4b44b27a802bd77c4f0536f5a(
Subdomain varchar(255),
RecordType varchar(255),
PName varchar(255),
Priority int,
Content varchar(255),
TTL int
);
INSERT INTO 1d5920f4b44b27a802bd77c4f0536f5a (SubDomain, RecordType, PName, Priority, Content,TTL)
VALUES ('www', 'A', '@', '0','8.8.8.8','100');
INSERT INTO comTLDServer(DomainName,AuthoritativeServer)
VALUES ('apple','de24b5571deaea7cf4b2a5c00ef66fb7');
CREATE TABLE de24b5571deaea7cf4b2a5c00ef66fb7(
Subdomain varchar(255),
RecordType varchar(255),
PName varchar(255),
Priority int,
Content varchar(255),
TTL int
);
INSERT INTO de24b5571deaea7cf4b2a5c00ef66fb7 (SubDomain, RecordType, PName, Priority, Content,TTL)
VALUES ('www', 'A', '@', '1','32.34.1.14','100');
INSERT INTO RootServer(DomainExtension,TLDServer)
VALUES ('in','inTLDServer');
CREATE TABLE inTLDServer(
DomainName varchar(255),
AuthoritativeServer varchar(255)
);
INSERT INTO inTLDServer(DomainName,AuthoritativeServer)
VALUES ('apple','4b8ecf8b7886d769891cded475fa915b');
CREATE TABLE 4b8ecf8b7886d769891cded475fa915b(
Subdomain varchar(255),
RecordType varchar(255),
PName varchar(255),
Priority int,
Content varchar(255),
TTL int
);
INSERT INTO 4b8ecf8b7886d769891cded475fa915b (SubDomain, RecordType, PName, Priority, Content,TTL)
VALUES ('www', 'A', '@', '1','54.2.31.134','300');
INSERT INTO comTLDServer(DomainName,AuthoritativeServer)
VALUES ('amazon','a2a8283864386ca04a5694e8b58759e6');
CREATE TABLE a2a8283864386ca04a5694e8b58759e6(
Subdomain varchar(255),
RecordType varchar(255),
PName varchar(255),
Priority int,
Content varchar(255),
TTL int
);
INSERT INTO a2a8283864386ca04a5694e8b58759e6 (SubDomain, RecordType, PName, Priority, Content,TTL)
VALUES ('www', 'A', '@', '0','34.54.31.2','250');
INSERT INTO comTLDServer(DomainName,AuthoritativeServer)
VALUES ('netflix','084b9a35bf7a90ee3b1209295143a160');
CREATE TABLE 084b9a35bf7a90ee3b1209295143a160(
Subdomain varchar(255),
RecordType varchar(255),
PName varchar(255),
Priority int,
Content varchar(255),
TTL int
);
INSERT INTO 084b9a35bf7a90ee3b1209295143a160 (SubDomain, RecordType, PName, Priority, Content,TTL)
VALUES ('www', 'A', '@', '0','65.52.143.76','100');
INSERT INTO comTLDServer(DomainName,AuthoritativeServer)
VALUES ('microsoft','ff5c054c7cd6924c570f944007ccf076');
CREATE TABLE ff5c054c7cd6924c570f944007ccf076(
Subdomain varchar(255),
RecordType varchar(255),
PName varchar(255),
Priority int,
Content varchar(255),
TTL int
);
INSERT INTO ff5c054c7cd6924c570f944007ccf076 (SubDomain, RecordType, PName, Priority, Content,TTL)
VALUES ('www', 'A', '@', '1','54.34.123.45','123');
INSERT INTO inTLDServer(DomainName,AuthoritativeServer)
VALUES ('netflix','1178757ceb94da1b49cce17a5080a4be');
CREATE TABLE 1178757ceb94da1b49cce17a5080a4be(
Subdomain varchar(255),
RecordType varchar(255),
PName varchar(255),
Priority int,
Content varchar(255),
TTL int
);
INSERT INTO 1178757ceb94da1b49cce17a5080a4be (SubDomain, RecordType, PName, Priority, Content,TTL)
VALUES ('www', 'CNAME', '@', '0','123.145.56.33','200');
INSERT INTO inTLDServer(DomainName,AuthoritativeServer)
VALUES ('google','f2cd38c14679e2daccfbfe7b03f4ada6');
CREATE TABLE f2cd38c14679e2daccfbfe7b03f4ada6(
Subdomain varchar(255),
RecordType varchar(255),
PName varchar(255),
Priority int,
Content varchar(255),
TTL int
);
INSERT INTO f2cd38c14679e2daccfbfe7b03f4ada6 (SubDomain, RecordType, PName, Priority, Content,TTL)
VALUES ('www', 'A', '@', '0','78.98.67.123','123');
INSERT INTO 1d5920f4b44b27a802bd77c4f0536f5a (SubDomain, RecordType, PName, Priority, Content,TTL)
VALUES ('meet', 'A', '@', '0','45.83.139.134','200');
INSERT INTO 1d5920f4b44b27a802bd77c4f0536f5a (SubDomain, RecordType, PName, Priority, Content,TTL)
VALUES ('docs', 'A', '@', '0','48.134.54.32','100');
INSERT INTO 1d5920f4b44b27a802bd77c4f0536f5a (SubDomain, RecordType, PName, Priority, Content,TTL)
VALUES ('sheets', 'A', '@', '0','182.48.63.12','200');
INSERT INTO RootServer(DomainExtension,TLDServer)
VALUES ('ac','acTLDServer');
CREATE TABLE acTLDServer(
DomainName varchar(255),
AuthoritativeServer varchar(255)
);
INSERT INTO acTLDServer(DomainName,AuthoritativeServer)
VALUES ('bits-pilani','ba7cb40159e6c905ea7b21e1193a95f4');
CREATE TABLE ba7cb40159e6c905ea7b21e1193a95f4(
Subdomain varchar(255),
RecordType varchar(255),
PName varchar(255),
Priority int,
Content varchar(255),
TTL int
);
INSERT INTO ba7cb40159e6c905ea7b21e1193a95f4 (SubDomain, RecordType, PName, Priority, Content,TTL)
VALUES ('www', 'A', '@', '0','172.22.2.53','100');
