## Como rodar o projeto localmente com o Docker
1. Faça um clone deste repositório
```bash
git clone {Url_Repositório}
```
2. É necessário ter o Docker instalado na sua máquina. https://docs.docker.com/get-docker/
3. Dentro da pasta criada, execute os seguintes comandos para iniciar a aplicação com Docker
```bash
docker build -t converter-app .
```
```bash
 docker run -d --rm -p 5173:5173 --name converter-container converter-app
```
4. Após isso, você pode acessar a aplicação através de http://localhost:5173/
5. Para parar o container, execute o comando
```bash
docker stop converter-container
```

## Como rodar o projeto localmente sem o Docker
1. Faça um clone deste repositório
```bash
git clone {Url_Repositório}
```
2. Dentro da pasta criada, instale as dependências do projeto
```bash
npm install
#ou
yarn install
```
3.Inicie o servidor de desenvolvimento
```bash
npm run dev
#ou
yarn dev
```
4. Após isso, você pode acessar a aplicação através de http://localhost:5173/

## Tecnologias utilizadas
-React

-Typescript

-axios

-Chakra-ui

-React-Icons

-Vite

-React-Query

-react-loader-spinner
