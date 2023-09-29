```mermaid
---
title: "Diagrama de Sequencia: Atualizar Meta"
---
sequenceDiagram
  actor User
  participant WebGUI (NextJS/Client)
  participant Serverless (NextJS/Server)
  participant Database
  
  activate User
  User ->> WebGUI (NextJS/Client): Submete informações <br/> necessárias na página de <br/> Atualizar Meta
  activate WebGUI (NextJS/Client)
  WebGUI (NextJS/Client) ->> Serverless (NextJS/Server): atualizarMeta(dados)
  activate Serverless (NextJS/Server)
  alt Dados Válidos
    Serverless (NextJS/Server) ->> Database: Salva Meta Atualizada
    activate Database
    alt Atualizado
      Database -->> Serverless (NextJS/Server): Query executada<br/> sem erros
      Serverless (NextJS/Server) -->> WebGUI (NextJS/Client): Retorna "success"
      WebGUI (NextJS/Client) -->> User: Alerta de atualização<br/> bem sucedida
    else Não Atualizado
      Database -->> Serverless (NextJS/Server): Query executada<br/> com erros
      Serverless (NextJS/Server) -->> WebGUI (NextJS/Client): Retorna "failure"
      WebGUI (NextJS/Client) -->> User: Alerta de atualização<br/> mal sucedida
    end
    deactivate Database
  else Dados Inválidos
    Serverless (NextJS/Server) -->> WebGUI (NextJS/Client): Retorna "failure"
    WebGUI (NextJS/Client) -->> User: Alerta de atualização<br/> mal sucedida
  end
  deactivate Serverless (NextJS/Server)
  deactivate WebGUI (NextJS/Client)
  deactivate User
```