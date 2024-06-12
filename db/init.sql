CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    user_username TEXT NOT NULL UNIQUE,
    user_email TEXT NOT NULL,
    user_dept integer,
    user_password TEXT NOT NULL,
    user_salt TEXT NOT NULL
);

CREATE TABLE departamento (
    dep_id SERIAL PRIMARY KEY,
    dep_nome VARCHAR(80),
    -- dep_ico ?
    dep_sigla VARCHAR(5),
    dep_descricao VARCHAR(255),
    dep_localizacao VARCHAR(30),
    dep_resp integer
);

CREATE TABLE agenda (
    agenda_id SERIAL PRIMARY KEY,
    agenda_tipo_acao integer NOT NULL, -- tipo enumerado descricao -> id
    agenda_dept_id integer NOT NULL,
    agenda_cli_cod integer NOT NULL,
    agenda_criado_em date NOT NULL,
    agenda_alterado_em date NOT NULL,
    agenda_finalizado_em date,
    agenda_criado_por integer NOT NULL,
    agenda_fechado_por integer,
    agenda_descricao text NOT NULL,
    agenda_status integer NOT NULL
);
-- LEMBRAR DE FAZER JOIN COM O ENDEREÇO
CREATE TABLE agenda_resp (
    agenda_responsaveis integer,
    agenda_agenda_id integer
);

CREATE TABLE agenda_obser (
    agenda_observador integer,
    agenda_agenda_id integer
);

CREATE TABLE comentario (
    com_id SERIAL PRIMARY KEY,
    com_agenda_id integer,
    com_user integer,
    com_responsavel integer,
    com_descricao TEXT NOT NULL,
    com_resultado integer -- tipo enumerado 1- OUTRO 2- REAGENDADO 3- REALIZADO
);

CREATE TABLE clientes (
    cli_cod SERIAL PRIMARY KEY,
    cli_doc VARCHAR(14) NOT NULL UNIQUE,
    cli_nome VARCHAR(100) NOT NULL,
    cli_email VARCHAR(50),
    cli_telefone VARCHAR(15),
    cli_status integer --tipo enumerado 1 - ATIVO 2 - INATIVO
);

CREATE TABLE enderecos (
    end_cod SERIAL PRIMARY KEY,
    end_cli_cod integer NOT NULL,
    end_cep VARCHAR(8) NOT NULL,
    end_logradouro VARCHAR(100) NOT NULL,
    end_bairro VARCHAR(100) NOT NULL,
    end_numero VARCHAR(20) NOT NULL,
    end_uf VARCHAR(2) NOT NULL,
    end_complemento VARCHAR(100),
    end_contato VARCHAR(15),
    end_tipo integer NOT NULL, --tipo enumerado 1 - Principal 2 - Entrega
    end_status integer NOT NULL --tipo enumerado 1 - ATIVO 2 - INATIVO
);

CREATE TYPE status_endereco AS ENUM ('ATIVO', 'INATIVO');

CREATE TYPE status_cliente AS ENUM ('ATIVO', 'INATIVO');

CREATE TYPE resultado_comentario AS ENUM ('OUTRO', 'REAGENDADO', 'REALIZADO');

CREATE TYPE status_agenda AS ENUM ('ATIVO', 'INATIVO', 'CONCLUÍDO', 'CANCELADO');

CREATE TYPE tipo_acao_agenda AS ENUM ('TREINAMENTO ONLINE', 'TREINAMENTO PRESENCIAL', 'TESTAR ATIVIDADE', 'IMPORTAÇÃO DE DADOS',
    'CRIAÇÂO DE BASE', 'REUNIÂO', 'SUPORTE DIVERSOS', 'FOLGA PLANTÃO');

CREATE TYPE endereco_tipo AS ENUM ('PRINCIPAL', 'ENTREGA', 'TREINAMENTO');

ALTER TABLE users
ADD CONSTRAINT fk_users_departamento
FOREIGN KEY (user_dept) REFERENCES departamento(dep_id);

ALTER TABLE agenda
ADD CONSTRAINT fk_agenda_user_criado_por
FOREIGN KEY (agenda_criado_por) REFERENCES users(user_id);

ALTER TABLE agenda
ADD CONSTRAINT fk_agenda_user_fechado_por
FOREIGN KEY (agenda_fechado_por) REFERENCES users(user_id);

ALTER TABLE agenda
ADD CONSTRAINT fk_agenda_cliente
FOREIGN KEY (agenda_cli_cod) REFERENCES clientes(cli_cod);

ALTER TABLE agenda
ADD CONSTRAINT fk_agenda_departamento
FOREIGN Key (agenda_dept_id) REFERENCES departamento(dep_id);

ALTER TABLE departamento
ADD CONSTRAINT fk_dep_User_resp
FOREIGN KEY (dep_resp) REFERENCES users(user_id);

ALTER TABLE comentario
ADD CONSTRAINT fk_comentario_agenda
FOREIGN KEY (com_agenda_id) REFERENCES agenda(agenda_id);

ALTER TABLE comentario
ADD CONSTRAINT fk_comentario_resp
FOREIGN KEY (com_responsavel) REFERENCES users(user_id);

ALTER TABLE comentario
ADD CONSTRAINT fk_comentario_user
FOREIGN KEY (com_user) REFERENCES users(user_id);

ALTER TABLE agenda_resp
ADD CONSTRAINT fk_agenda_resp_agenda
FOREIGN KEY (agenda_agenda_id) REFERENCES agenda(agenda_id);

ALTER TABLE agenda_resp
ADD CONSTRAINT fk_agenda_resp_responsaveis
FOREIGN KEY (agenda_responsaveis) REFERENCES users(user_id);

ALTER TABLE agenda_obser
ADD CONSTRAINT fk_agenda_observador_agenda
FOREIGN KEY (agenda_agenda_id) REFERENCES agenda(agenda_id);

ALTER TABLE agenda_obser
ADD CONSTRAINT fk_agenda_observador
FOREIGN KEY (agenda_observador) REFERENCES users(user_id);

ALTER TABLE enderecos
ADD CONSTRAINT fk_enderecos_cliente
FOREIGN KEY (end_cli_cod) REFERENCES clientes(cli_cod);


-- Inserindo dados na tabela departamento
INSERT INTO departamento (dep_nome, dep_sigla, dep_descricao, dep_localizacao)
VALUES
('Recursos Humanos', 'RH', 'Departamento de Recursos Humanos', 'Edifício Central');
INSERT INTO departamento (dep_nome, dep_sigla, dep_descricao, dep_localizacao)
VALUES
('Tecnologia da Informação', 'TI', 'Departamento de TI', 'Edifício Norte');
INSERT INTO departamento (dep_nome, dep_sigla, dep_descricao, dep_localizacao)
VALUES
('Financeiro', 'FIN', 'Departamento Financeiro', 'Edifício Sul');

-- Inserindo dados na tabela users
INSERT INTO users (user_username, user_email, user_dept, user_password, user_salt)
VALUES
('jdoe', 'jdoe@example.com', 1, 'hashedpassword1', 'salt1');
INSERT INTO users (user_username, user_email, user_dept, user_password, user_salt)
VALUES
('asmith', 'asmith@example.com', 2, 'hashedpassword2', 'salt2');
INSERT INTO users (user_username, user_email, user_dept, user_password, user_salt)
VALUES
('bjones', 'bjones@example.com', 3, 'hashedpassword3', 'salt3');

-- Inserindo dados na tabela clientes
INSERT INTO clientes (cli_doc, cli_nome, cli_email, cli_telefone, cli_status)
VALUES
('12345678901', 'Empresa ABC', 'contato@empresaabc.com', '123456789', 1);
INSERT INTO clientes (cli_doc, cli_nome, cli_email, cli_telefone, cli_status)
VALUES
('98765432100', 'Empresa XYZ', 'contato@empresaxyz.com', '987654321', 1);
INSERT INTO clientes (cli_doc, cli_nome, cli_email, cli_telefone, cli_status)
VALUES
('19283746500', 'Empresa QWE', 'contato@empresaQWE.com', '192837465', 2);

-- Inserindo dados na tabela enderecos
INSERT INTO enderecos (end_cli_cod, end_cep, end_logradouro, end_bairro, end_numero, end_uf, end_complemento, end_contato, end_tipo, end_status)
VALUES
(1, '01001000', 'Praça da Sé', 'Sé', '100', 'SP', 'Próximo à catedral', '11999999999', 1, 1);
INSERT INTO enderecos (end_cli_cod, end_cep, end_logradouro, end_bairro, end_numero, end_uf, end_complemento, end_contato, end_tipo, end_status)
VALUES
(2, '20040002', 'Av. Rio Branco', 'Centro', '200', 'RJ', 'Ao lado do Teatro Municipal', '21999999999', 2, 1);
INSERT INTO enderecos (end_cli_cod, end_cep, end_logradouro, end_bairro, end_numero, end_uf, end_complemento, end_contato, end_tipo, end_status)
VALUES
(3, '30140071', 'Av. Afonso Pena', 'Centro', '300', 'MG', 'Em frente ao Parque Municipal', '31999999999', 1, 2);

-- Inserindo dados na tabela agenda
INSERT INTO agenda (agenda_tipo_acao, agenda_dept_id, agenda_cli_cod, agenda_criado_em, agenda_alterado_em, agenda_finalizado_em, agenda_criado_por, agenda_fechado_por, agenda_descricao, agenda_status)
VALUES
(1, 1, 1, '2024-01-01', '2024-01-02', '2024-01-03', 1, 2, 'Treinamento inicial', 1);
INSERT INTO agenda (agenda_tipo_acao, agenda_dept_id, agenda_cli_cod, agenda_criado_em, agenda_alterado_em, agenda_finalizado_em, agenda_criado_por, agenda_fechado_por, agenda_descricao, agenda_status)
VALUES
(2, 2, 2, '2024-01-04', '2024-01-05', '2024-01-06', 2, 3, 'Suporte técnico', 2);
INSERT INTO agenda (agenda_tipo_acao, agenda_dept_id, agenda_cli_cod, agenda_criado_em, agenda_alterado_em, agenda_finalizado_em, agenda_criado_por, agenda_fechado_por, agenda_descricao, agenda_status)
VALUES
(3, 3, 3, '2024-01-07', '2024-01-08', '2024-01-09', 3, 1, 'Reunião de planejamento', 1);

-- Inserindo dados na tabela agenda_resp
INSERT INTO agenda_resp (agenda_responsaveis, agenda_agenda_id)
VALUES
(1, 1);
INSERT INTO agenda_resp (agenda_responsaveis, agenda_agenda_id)
VALUES
(2, 2);
INSERT INTO agenda_resp (agenda_responsaveis, agenda_agenda_id)
VALUES
(3, 3);

-- Inserindo dados na tabela agenda_obser
INSERT INTO agenda_obser (agenda_observador, agenda_agenda_id)
VALUES
(2, 1);
INSERT INTO agenda_obser (agenda_observador, agenda_agenda_id)
VALUES
(3, 2);
INSERT INTO agenda_obser (agenda_observador, agenda_agenda_id)
VALUES
(1, 3);

-- Inserindo dados na tabela comentario
INSERT INTO comentario (com_agenda_id, com_user, com_responsavel, com_descricao, com_resultado)
VALUES
(1, 1, 2, 'Treinamento concluído com sucesso', 3);
INSERT INTO comentario (com_agenda_id, com_user, com_responsavel, com_descricao, com_resultado)
VALUES
(2, 2, 3, 'Suporte técnico realizado', 3);
INSERT INTO comentario (com_agenda_id, com_user, com_responsavel, com_descricao, com_resultado)
VALUES
(3, 3, 1, 'Reunião reagendada', 2);
