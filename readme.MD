# GoStack - GoBarber (back-end)

Essa aplicação que foi desenvolvida no bootcamp GoStack, consiste em uma aplicação para prestadores de serviços de barbearia, que permite o manuseio de agendamentos de prestadores de serviços.

## Requisitos

- Yarn (v. 1.22.4)
- Node.js (v. 12.16.)

## Instruções

Inicialmente, clone o repositório em algum diretório:
```bash
git clone https://github.com/adrianoapj/gostack-gobarber.git
cd gostack-gobarber
```

Se você desejar simplesmente rodar o projeto em ambiente de desenvolvimento, execute o comando abaixo:
```bash
yarn dev:server
```

Ou se você desejar construir uma build, execute o comando abaixo:
```bash
yarn build
```
O projeto será construído dentro de uma pasta com o nome `dist`.

## Rotas

Agora serão listadas as rotas da aplicação e suas respectivas funcionalidades.

### Agendamentos (/appointments)

`GET /appointments`: lista os agendamentos cadastrados.

`POST /appointments`: cria um novo agendamento, recebendo os seguintes parâmetros:

- `provider_id`: ID do prestador de serviços que prestará o serviço.
- `date`: data em que se pretende agendar o serviço.

Obs: os agendamentos só podem ser realizados de hora em hora, e o prestador de serviço precisa estar cadastrado na aplicação.

### Usuários (/users)

`POST /users`: cria um novo usuário recebendo os seguintes parâmetros:

- `name`: nome do usuário.
- `email`: endereço de e-mail do usuário.
- `password`: senha do usuário.

Obs: não podem existir dois usuários com o mesmo e-mail na aplicação.

`PATCH /users/avatar`: adiciona/modifica o avatar de um usuário recebendo o seguinte parâmetro:

- `file`: Arquivo de imagem que será o avatar do usuário.

Obs: essa rota excepcionalmente exige o envio de dados através de um formulário MULTIPART ao invés de JSON.

### Sessões (/sessions):

`POST /sessions`: realiza a autenticação de um usuário, recebendo os seguintes parâmetros:

- `email`: e-mail do usuário a ser autenticado.
- `password`: senha do usuário a ser autenticado.


Nota: todas as rotas de agendamentos, e a rota de atualização de avatar são autenticadas e precisam receber um header `Authorization` com um `bearer token` recebido na autenticação.

## Considerações finais

Esse projeto foi feito com base nas aulas do Bootcamp GoStack da Rocketseat.
