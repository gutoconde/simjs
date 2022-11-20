# SIM API

## Informações Gerais

SIM API é uma biblioteca com serviço de consulta para atender o aplicativo SIM - Simulador de Verba de Gabinete.

Ele utiliza informações coletadas a partir dos Dados Abertos da Câmara dos Deputados.

Diariamente são atualizadas informações sobre servidores e gabinetes referentes a cargos ocupados e lotações.

gutoconde
@github/gutoconde

# Instalação e execução do projeto :

Após fazer checkout do projeto, execute o comando a seguir no diretório simjs/api para baixar as suas dependências :

```
> npm install
```

Para executar o projeto, execute o comando abaixo, também no diretório simjs/api :

```
> npm run start
```

# Implantação do projeto na AWS

Para implantar o projeto na AWS, antes de executar o comando de deploy, é necessário instalar a ferramenta `serverless` da AWS e setar as seguintes variáveis de ambiente:

- AWS_ACCESS_KEY_ID
- AWS_SECRET_ACCESS_KEY

Para executar o deploy na AWS, execute o comando abaixo, a partir do diretório simjs/api:

```
> sls deploy
```

