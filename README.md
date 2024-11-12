# Codeigniter + ReactJS - Delta Global :large_blue_circle::white_circle:

## Objetivos
O objetivo desse desafio técnico é desenvolver um sistema para gerenciar informações de alunos, incluindo nome, email, telefone, endereço e foto.
* 1 - Listar todos os alunos cadastrados
* 2 - Adicionar um novo aluno, informando todos os campos necessários
* 3 - Visualizar os detalhes de um aluno específico
* 4 - Atualizar as informações de um aluno
* 5 - Excluir um aluno do sistema

## Linguagens, frameworks e softwares utilizados 
* Codeigniter 4
* Bootstrap 4
* ReactJS 18.3.1
* NodeJS 18.19.0
* NPM 9.2.0
* Composer 2.7.9
* PHP 8.2.24
* MySQL 8.0.40

## Instruções para execução local
1º Instale o <a href="https://www.php.net/">PHP</a> de acordo com seu sistema operacional e a versão descrita acima
<br>
2º Instale o <a href="https://git-scm.com/">Git</a> de acordo com seu sistema operacional e a versão descrita acima
<br>
3º Instale o <a href="https://getcomposer.org/">Composer</a> de acordo com seu sistema operacional e a versão descrita acima
<br>
4º Instale o <a href="https://www.mysql.com/">MySQL</a> de acordo com seu sistema operacional e a versão descrita acima
<br>
5º No terminal do seu sistema operacional, execute o comando abaixo para clonar o projeto
```
git clone https://github.com/icaro-nog/api-deltaglobal.git (HTTPS)
ou
git clone git@github.com:icaro-nog/api-deltaglobal.git (SSH)
```
6º Na pasta raiz do projeto clonado, para atualizar e instalar as dependências do <b>Composer</b>, execute os comandos abaixo
```
composer update
composer install
```
7º Vá até o arquivo <b>app/Config/Database.php</b> e atualize as credenciais de conexão com o banco de dados, de acordo com o que foi definido na instalação do MySQL
```
public array $default = [
        'DSN'          => '',
        'hostname'     => 'localhost',
        'username'     => '', // USUARIO DEFINIDO
        'password'     => '', // SENHA DEFINIDA
        'database'     => 'deltaglobal',
        'DBDriver'     => 'MySQLi',
        'DBPrefix'     => '',
        'pConnect'     => true,
        'DBDebug'      => true,
        'charset'      => 'utf8mb4',
        'DBCollat'     => 'utf8mb4_general_ci',
        'swapPre'      => '',
        'encrypt'      => false,
        'compress'     => false,
        'strictOn'     => false,
        'failover'     => [],
        'port'         => 3306, // PORTA DEFINIDA
        'numberNative' => false,
        'dateFormat'   => [
            'date'     => 'Y-m-d',
            'datetime' => 'Y-m-d H:i:s',
            'time'     => 'H:i:s',
        ],
    ];
```
8º Ainda na pasta raiz do projeto, execute o comando abaixo para criação do <b>banco de dados</b>
```
php spark db:create deltaglobal
```
9º Agora, execute o comando abaixo para criação das <b>tabelas</b> no banco de dados
```
php spark migrate
```
10º Para servir a aplicação, execute o seguinte comando
```
php spark serve
```
Após isso, a aplicação estará pronta para testagens!

### Para criar um usuário, acesse a rota
```
http://localhost:8080/register 
```

### Após criar o usuário, faça o login
```
http://localhost:8080/login 
```
### Rotas para gerenciamento de informações
* Criação: ``` http://localhost:8080/student/form ```
* Leitura: ``` http://localhost:8080/student ```
* Edição: ``` http://localhost:8080/student/edit ```
* Exclusão: ``` http://localhost:8080/student ```

## Pontuação de melhorias
* Gerar imagem da aplicação em Docker para facilitar a testagem
* Captura de logs para coleta de possíveis erros
* Sanitização dos campos dos formulários
* Ter uma rotina de testes, pode ser utilizado o PHPUnit
* Retorno de avisos ao usuário, caso não seja preenchido algum campo do formulário
* Nos formulários, realizar validação para que apenas sejam enviados arquivos de imagem e com tamanho predefinido
* Paginação da listagem de registros
* Inserir o recurso de desativar um aluno, em alguns contextos isso pode ser útil, ex.: academia.
  Em relação a LGPD, caso as informações sirvam para fins fiscais, é necessário manter os registros no banco de dados por mais tempo para possíveis auditorias.


















